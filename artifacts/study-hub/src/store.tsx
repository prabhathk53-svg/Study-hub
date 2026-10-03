import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type QuizRecord = { date: string; score: number; total: number; answers: number[] };
export type StudyState = {
  version: 2;
  language: 'si' | 'en' | null;
  started: boolean;
  student: { name: string; grade: number };
  bookmarks: string[];
  completed: string[];
  quizRecords: QuizRecord[];
  dailyQuiz: { date: string; answers: number[]; submitted: boolean; score: number | null };
};

const today = () => new Date().toISOString().slice(0, 10);
const freshState = (): StudyState => ({
  version: 2,
  language: null,
  started: false,
  student: { name: '', grade: 10 },
  bookmarks: [],
  completed: [],
  quizRecords: [],
  dailyQuiz: { date: today(), answers: [-1, -1, -1, -1, -1], submitted: false, score: null }
});

function parseState(raw: string | null): StudyState {
  if (!raw) return freshState();
  try {
    const parsed = JSON.parse(raw) as (Partial<Omit<StudyState, 'version'>> & { version?: number }) | null;
    if (!parsed || typeof parsed !== 'object' || (parsed.version !== 1 && parsed.version !== 2)) return freshState();
    const student = parsed.student;
    const daily = parsed.dailyQuiz;
    const records = Array.isArray(parsed.quizRecords) ? parsed.quizRecords : [];
    const savedDate = typeof daily?.date === 'string' ? daily.date : today();
    return {
      version: 2,
      language: parsed.version === 2 && parsed.language === 'si'
        ? 'si'
        : parsed.version === 2 && parsed.language === 'en' ? 'en' : null,
      started: parsed.started === true,
      student: { name: typeof student?.name === 'string' ? student.name.slice(0, 40) : '', grade: [10, 11, 12].includes(Number(student?.grade)) ? Number(student?.grade) : 10 },
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks.filter((x): x is string => typeof x === 'string').slice(0, 200) : [],
      completed: Array.isArray(parsed.completed) ? parsed.completed.filter((x): x is string => typeof x === 'string').slice(0, 200) : [],
      quizRecords: records.filter((x): x is QuizRecord => !!x && typeof x.date === 'string' && Number.isFinite(x.score) && Number.isFinite(x.total) && Array.isArray(x.answers)).slice(-200),
      dailyQuiz: savedDate === today() && daily
        ? { date: savedDate, answers: Array.from({ length: 5 }, (_, index) => Number.isInteger(daily.answers?.[index]) ? Number(daily.answers?.[index]) : -1), submitted: daily.submitted === true, score: Number.isFinite(daily.score) ? Number(daily.score) : null }
        : { date: today(), answers: [-1, -1, -1, -1, -1], submitted: false, score: null }
    };
  } catch {
    return freshState();
  }
}

const STORAGE_KEY = 'study-hub-state-v1';
type StudyContextValue = {
  state: StudyState;
  updateStudent: (name: string, grade: number) => void;
  setLanguage: (language: 'si' | 'en') => void;
  toggleBookmark: (id: string) => void;
  markCompleted: (id: string) => void;
  chooseAnswer: (index: number, choice: number) => void;
  submitQuiz: (answers: number[], score: number, total: number) => void;
  reset: () => void;
};
const StudyContext = createContext<StudyContextValue | null>(null);

export function StudyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StudyState>(() => {
    try { return parseState(localStorage.getItem(STORAGE_KEY)); } catch { return freshState(); }
  });
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Storage may be unavailable; the app remains usable for this session. */ }
  }, [state]);
  const value = useMemo<StudyContextValue>(() => ({
    state,
    setLanguage: language => setState(s => ({ ...s, language })),
    updateStudent: (name, grade) => setState(s => ({ ...s, started: true, student: { name: name.trim().slice(0, 40), grade } })),
    toggleBookmark: id => setState(s => ({ ...s, bookmarks: s.bookmarks.includes(id) ? s.bookmarks.filter(item => item !== id) : [...s.bookmarks, id] })),
    markCompleted: id => setState(s => ({ ...s, completed: s.completed.includes(id) ? s.completed : [...s.completed, id] })),
    chooseAnswer: (index, choice) => setState(s => s.dailyQuiz.submitted ? s : ({ ...s, dailyQuiz: { ...s.dailyQuiz, answers: Object.assign([...s.dailyQuiz.answers], { [index]: choice }) } })),
    submitQuiz: (answers, score, total) => setState(s => {
      if (s.dailyQuiz.submitted) return s;
      const date = today();
      return { ...s, dailyQuiz: { date, answers, submitted: true, score }, quizRecords: [...s.quizRecords, { date, answers, score, total }].slice(-200) };
    }),
    reset: () => setState(freshState())
  }), [state]);
  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) throw new Error('useStudy must be used within StudyProvider');
  return context;
}
import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, useParams, Router as WouterRouter, Link } from 'wouter';
import {
  ArrowLeft, ArrowRight, Award, Bookmark, BookOpen, Check, CheckCircle2, ChevronDown, ChevronRight,
  Clock3, Compass, Flame, FlaskConical, GraduationCap, Home as HomeIcon, Laptop, Library,
  Lightbulb, Search, Sparkles, Star, Target, UserRound, X, Languages, History as HistoryIcon,
  Calculator, type LucideIcon
} from 'lucide-react';
import { dailyQuiz, Lesson, lessons, subjects, type Subject } from './data';
import { StudyProvider, useStudy } from './store';
import { dateLocale, localizedLesson, localizedQuiz, subjectName, tr, type Language } from './localization';

const queryClient = new QueryClient();
const subjectIcons: Record<Subject, LucideIcon> = {
  Mathematics: Calculator, Science: FlaskConical, English: BookOpen, ICT: Laptop, Sinhala: Languages, History: HistoryIcon
};
const subjectPalettes: Record<Subject, string> = {
  Mathematics: 'subject-blue', Science: 'subject-teal', English: 'subject-coral',
  ICT: 'subject-violet', Sinhala: 'subject-gold', History: 'subject-rose'
};
const navItems = [
  { label: 'Home', href: '/home', Icon: HomeIcon },
  { label: 'Subjects', href: '/subjects', Icon: Library },
  { label: 'Quiz', href: '/quiz', Icon: Target },
  { label: 'Bookmarks', href: '/bookmarks', Icon: Bookmark },
  { label: 'Profile', href: '/profile', Icon: UserRound }
];
const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ');
const findLesson = (id: string | undefined) => lessons.find(item => item.id === id);
const slug = (subject: string) => subject.toLowerCase();

function RoutedBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StudyProvider>
        <DocumentLocale />
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </StudyProvider>
    </TooltipProvider>
  </QueryClientProvider>;
}

function DocumentLocale() {
  const { state } = useStudy();
  useEffect(() => { document.documentElement.lang = state.language === 'si' ? 'si-LK' : state.language === 'en' ? 'en-LK' : 'en'; }, [state.language]);
  return null;
}

function Router() {
  const { state } = useStudy();
  if (!state.language) return <Welcome />;
  return <RoutedBoundary><Switch>
    <Route path="/" component={Welcome} />
    <Route path="/home"><Shell><Dashboard /></Shell></Route>
    <Route path="/subjects"><Shell><SubjectsPage /></Shell></Route>
    <Route path="/subjects/:subject"><Shell><SubjectPage /></Shell></Route>
    <Route path="/notes/:noteId"><Shell><ReaderPage /></Shell></Route>
    <Route path="/quiz"><Shell><QuizPage /></Shell></Route>
    <Route path="/bookmarks"><Shell><BookmarksPage /></Shell></Route>
    <Route path="/profile"><Shell><ProfilePage /></Shell></Route>
    <Route component={NotFound} />
  </Switch></RoutedBoundary>;
}

function Welcome() {
  const { state, updateStudent, setLanguage } = useStudy();
  const [, setLocation] = useLocation();
  const [choice, setChoice] = useState<Language | null>(null);
  const [showChooser, setShowChooser] = useState(!state.language);
  const [name, setName] = useState(state.student.name);
  const [grade, setGrade] = useState(String(state.student.grade));
  const language = state.language;
  useEffect(() => { document.documentElement.lang = language === 'si' ? 'si-LK' : 'en-LK'; }, [language]);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!state.started) updateStudent(name || tr('Learner', language), Number(grade));
    setLocation('/home');
  };
  if (showChooser) return <main className="welcome-screen" lang="en">
    <div className="welcome-orbit orbit-one" /><div className="welcome-orbit orbit-two" />
    <section className="welcome-card page-enter language-card">
      <div className="brand-lockup"><span className="brand-mark"><BookOpen size={23} strokeWidth={2.2} /></span><span className="display brand-name">Study Hub</span></div>
      <div className="welcome-art" aria-hidden="true"><div className="art-sheet"><span className="art-line long" /><span className="art-line" /><span className="art-line short" /></div><div className="art-book"><BookOpen size={38} /></div></div>
      <p className="eyebrow welcome-eyebrow">ඔයා කැමති භාෂාව තෝරන්න</p>
      <h1 className="display welcome-title">Choose your language</h1>
      <div className="language-options" role="group" aria-label="Choose your language">
        <button type="button" className={cx('language-choice', choice === 'si' && 'language-choice-selected')} aria-pressed={choice === 'si'} onClick={() => setChoice('si')}>🇱🇰 සිංහල</button>
        <button type="button" className={cx('language-choice', choice === 'en' && 'language-choice-selected')} aria-pressed={choice === 'en'} onClick={() => setChoice('en')}>🇬🇧 English</button>
      </div>
      <button type="button" className="button button-primary welcome-submit" disabled={!choice} onClick={() => { if (choice) { setLanguage(choice); setShowChooser(false); if (!state.started) setLocation('/'); } }}>{choice === 'si' ? 'ඉදිරියට යන්න' : 'Continue' } <ArrowRight size={18} /></button>
      <p className="welcome-footnote"><CheckCircle2 size={15} /> Choose once to continue in that language.</p>
    </section>
  </main>;
  const t = (text: string) => tr(text, language);
  return <main className="welcome-screen">
    <div className="welcome-orbit orbit-one" /><div className="welcome-orbit orbit-two" />
    <section className="welcome-card page-enter">
      <div className="brand-lockup"><span className="brand-mark"><BookOpen size={23} strokeWidth={2.2} /></span><span className="display brand-name">Study Hub</span></div>
      <div className="welcome-art" aria-hidden="true">
        <div className="art-sheet"><span className="art-line long" /><span className="art-line" /><span className="art-line short" /></div>
        <div className="art-book"><BookOpen size={38} /></div><div className="art-star"><Sparkles size={19} /></div>
      </div>
      <p className="eyebrow welcome-eyebrow">{t('YOUR SPACE TO MAKE PROGRESS')}</p>
      <h1 className="display welcome-title">{language === 'si' ? <>{t('Small steps.')}<br /><em>{t('Brighter days.')}</em></> : <>Small steps.<br /><em>Brighter days.</em></>}</h1>
      <p className="welcome-tagline">{t('Learn • Practice • Grow')}</p>
      {!state.started ? <form className="welcome-form" onSubmit={submit}>
        <label className="field-label" htmlFor="student-name">{t('What should we call you?')}</label>
        <input id="student-name" data-testid="input-student-name" className="field" value={name} onChange={event => setName(event.target.value)} placeholder={t('Your first name')} maxLength={40} />
        <label className="field-label" htmlFor="student-grade">{t('Choose your grade')}</label>
        <div className="grade-select-wrap"><select id="student-grade" data-testid="select-student-grade" className="field" value={grade} onChange={event => setGrade(event.target.value)}><option value="10">{t('Grade 10')}</option><option value="11">{t('Grade 11')}</option><option value="12">{t('Grade 12')}</option></select><ChevronDown size={18} /></div>
        <button className="button button-primary welcome-submit" data-testid="button-start-learning" type="submit">{t('Start learning')} <ArrowRight size={18} /></button>
      </form> : <div className="welcome-form">
        <p className="welcome-return">{t('Good to see you again,')} <strong>{state.student.name || t('Learner')}.</strong><br />{t('Your next small win is waiting.')}</p>
        <button className="button button-primary welcome-submit" data-testid="button-continue-home" onClick={() => setLocation('/home')}>{t('Continue to your hub')} <ArrowRight size={18} /></button>
      </div>}
      <p className="welcome-footnote"><CheckCircle2 size={15} /> {t('Your notes and progress stay on this device.')}</p>
    </section>
    <div className="welcome-side-note">{t('A little learning, every day.')}</div>
  </main>;
}

function Shell({ children }: { children: ReactNode }) {
  const { state } = useStudy();
  const [location] = useLocation();
  if (!state.language) return <Welcome />;
  const activePath = location.startsWith('/subjects') ? '/subjects' : location.startsWith('/notes') ? '/subjects' : location;
  const t = (text: string) => tr(text, state.language);
  return <div className="app-shell">
    <header className="topbar">
      <Link href="/home" className="brand-lockup top-brand" aria-label={`Study Hub ${t('Home')}`}><span className="brand-mark"><BookOpen size={20} /></span><span className="display brand-name">Study Hub</span></Link>
      <nav className="desktop-nav" aria-label={t('Main navigation')}>{navItems.map(({ label, href, Icon }) => <Link key={href} href={href} className={cx('nav-link', activePath === href && 'nav-link-active')} data-testid={`nav-${label.toLowerCase()}`}><Icon size={17} /><span>{t(label)}</span></Link>)}</nav>
      <Link href="/profile" className="top-profile" aria-label={t('Open profile')}><Avatar /></Link>
    </header>
    <main className="content-area page-enter">{children}</main>
    <nav className="mobile-nav" aria-label={t('Main navigation')}>{navItems.map(({ label, href, Icon }) => <Link key={href} href={href} aria-label={t(label)} className={cx('mobile-nav-item', activePath === href && 'mobile-nav-active')} data-testid={`mobile-nav-${label.toLowerCase()}`}><Icon size={20} /><span>{t(label)}</span></Link>)}</nav>
  </div>;
}

function Avatar() {
  const { state } = useStudy();
  const initials = (state.student.name || (state.language === 'si' ? 'ශිෂ්‍යයා' : 'S')).split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase();
  return <span className="avatar">{initials}</span>;
}

function PageHeading({ kicker, title, subtitle, action }: { kicker?: string; title: string; subtitle?: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div>{kicker && <p className="eyebrow">{kicker}</p>}<h1 className="display page-title">{title}</h1>{subtitle && <p className="page-subtitle">{subtitle}</p>}</div>{action}</div>;
}

function SectionHeader({ title, action, href }: { title: string; action?: string; href?: string }) {
  return <div className="section-header"><h2 className="display section-title">{title}</h2>{action && href && <Link href={href} className="text-link">{action}<ArrowRight size={15} /></Link>}</div>;
}

function SubjectBadge({ subject }: { subject: Subject }) {
  const Icon = subjectIcons[subject];
  return <span className={cx('subject-icon', subjectPalettes[subject])}><Icon size={19} strokeWidth={2} /></span>;
}

function LessonCard({ lesson, compact = false }: { lesson: Lesson; compact?: boolean }) {
  const { state, toggleBookmark } = useStudy();
  const t = (text: string) => tr(text, state.language);
  lesson = localizedLesson(lesson, state.language);
  const saved = state.bookmarks.includes(lesson.id);
  return <article className={cx('lesson-card', compact && 'lesson-card-compact')} data-testid={`card-lesson-${lesson.id}`}>
    <div className="lesson-card-top"><SubjectBadge subject={lesson.subject} /><span className="grade-chip">{t('Grade ')}{lesson.grade}</span><button className={cx('bookmark-icon', saved && 'bookmark-icon-saved')} aria-label={saved ? `${t('Remove bookmark')} ${lesson.title}` : `${t('Bookmark')} ${lesson.title}`} aria-pressed={saved} data-testid={`button-bookmark-${lesson.id}`} onClick={() => toggleBookmark(lesson.id)}><Bookmark size={17} fill={saved ? 'currentColor' : 'none'} /></button></div>
    <Link href={`/notes/${lesson.id}`} className="lesson-title-link"><h3 className="display lesson-title">{lesson.title}</h3></Link>
    <p className="lesson-summary">{lesson.summary}</p>
    <div className="lesson-card-footer"><span className="lesson-time"><Clock3 size={14} /> {lesson.minutes} {t('min read')}</span><Link href={`/notes/${lesson.id}`} className="read-link">{t('Read lesson')} <ArrowRight size={15} /></Link></div>
  </article>;
}

function SubjectCard({ subject }: { subject: Subject }) {
  const { state } = useStudy();
  const Icon = subjectIcons[subject];
  const count = lessons.filter(lesson => lesson.subject === subject).length;
  const t = (text: string) => tr(text, state.language);
  return <Link href={`/subjects/${slug(subject)}`} className="subject-card" data-testid={`card-subject-${slug(subject)}`}>
    <SubjectBadge subject={subject} /><div className="subject-card-copy"><h3 className="display">{subjectName(subject, state.language)}</h3><p>{count} {t('lessons')} · {t('Grades 10–12')}</p></div><ChevronRight size={18} className="subject-arrow" /><span className="subject-card-accent"><Icon size={54} /></span>
  </Link>;
}

function Dashboard() {
  const { state } = useStudy();
  const t = (text: string) => tr(text, state.language);
  const [search, setSearch] = useState('');
  const name = state.student.name || t('Learner');
  const recentLessons = lessons.filter(lesson => state.completed.includes(lesson.id)).slice(-3).reverse();
  const recommended = lessons.find(lesson => lesson.grade === state.student.grade && !state.completed.includes(lesson.id)) || lessons[0];
  const shownLessons = lessons.map(item => localizedLesson(item, state.language));
  const searched = search.trim() ? shownLessons.filter(item => `${item.title} ${subjectName(item.subject, state.language)} ${item.summary} ${item.sections.map(section => `${section.heading} ${section.body} ${section.key ?? ''}`).join(' ')}`.toLowerCase().includes(search.trim().toLowerCase())).slice(0, 4) : [];
  const completedCount = state.completed.length;
  const average = state.quizRecords.length ? Math.round(state.quizRecords.reduce((n, item) => n + item.score / item.total * 100, 0) / state.quizRecords.length) : 0;
  return <div className="dashboard-page">
    <section className="dashboard-hero">
      <div className="hero-copy"><p className="eyebrow hero-eyebrow">{t('YOUR LEARNING SPACE')}</p><h1 className="display hero-title">{state.language === 'si' ? `${name},` : `Hey, ${name}`}<span className="hero-period">.</span></h1><p className="hero-subtitle">{t('One focused moment can move you forward.')}</p><div className="hero-grade"><GraduationCap size={16} /> {t('Grade ')}{state.student.grade} · {t('your pace, your progress')}</div></div>
      <div className="hero-illustration" aria-hidden="true"><div className="hero-disc" /><div className="hero-book"><BookOpen size={53} /></div><div className="hero-spark spark-a"><Sparkles size={18} /></div><div className="hero-spark spark-b"><Star size={15} /></div><div className="hero-note">{t('keep going')}</div></div>
    </section>
      <div className="dashboard-search-wrap">
      <label className="search-box"><Search size={19} /><input aria-label={t('Search lessons and subjects')} data-testid="input-home-search" value={search} onChange={event => setSearch(event.target.value)} placeholder={t('Find a lesson or subject')} />{search && <button className="clear-search" aria-label={t('Clear search')} onClick={() => setSearch('')}><X size={16} /></button>}</label>
      {search && <div className="search-results" role="region" aria-label={t('Search results')}>{searched.length ? searched.map(lesson => <Link key={lesson.id} href={`/notes/${lesson.id}`} className="search-result"><SubjectBadge subject={lesson.subject} /><span><strong>{lesson.title}</strong><small>{subjectName(lesson.subject, state.language)} · {t('Grade ')}{lesson.grade}</small></span><ArrowRight size={16} /></Link>) : <p className="search-empty">{t('No lessons match')} “{search}”. {t('Try a subject or topic.')}</p>}<Link href="/subjects" className="search-all">{t('Browse all lessons')} <ArrowRight size={14} /></Link></div>}
    </div>
    <section className="stats-strip" aria-label={t('Your learning statistics')}>
      <StatTile Icon={BookOpen} value={`${completedCount}`} label={t('Lessons read')} tint="blue" />
      <StatTile Icon={Target} value={`${state.quizRecords.length}`} label={t('Quizzes tried')} tint="teal" />
      <StatTile Icon={Award} value={state.quizRecords.length ? `${average}%` : '—'} label={t('Quiz average')} tint="gold" />
    </section>
    <section className="daily-feature">
      <div className="daily-copy"><span className="daily-kicker"><Flame size={15} /> {t('A FRESH START, EVERY DAY')}</span><h2 className="display">{t('Five questions.')}<br />{t('A little more confident.')}</h2><p>{t('Take today’s quick mix of questions. See what you know, and learn from every answer.')}</p><Link href="/quiz" className="button button-primary" data-testid="link-daily-quiz">{state.dailyQuiz.submitted ? t('Review today’s quiz') : t('Take today’s quiz')} <ArrowRight size={17} /></Link></div>
      <div className="daily-visual" aria-hidden="true"><div className="quiz-sheet"><div className="quiz-sheet-head"><span /><span /><span /></div><div className="quiz-sheet-title" /><div className="quiz-sheet-option selected"><i /><b /></div><div className="quiz-sheet-option"><i /><b /></div><div className="quiz-sheet-option"><i /><b /></div></div><div className="quiz-stamp"><Check size={22} /></div></div>
    </section>
    <section className="dashboard-section">
      <SectionHeader title={t('Pick up where you left off')} action={t('All subjects')} href="/subjects" />
      {recentLessons.length ? <div className="lesson-grid">{recentLessons.map(item => <LessonCard key={item.id} lesson={item} compact />)}</div> : <div className="composed-empty"><span className="empty-icon"><BookOpen size={22} /></span><div><h3>{t('Your first lesson is a few minutes away.')}</h3><p>{t('Choose a subject and start with one small idea.')}</p></div><Link href={`/notes/${recommended.id}`} className="button button-secondary">{t('Start a lesson')} <ArrowRight size={15} /></Link></div>}
    </section>
    <section className="dashboard-section subject-shortcuts"><SectionHeader title={t('Explore your subjects')} action={t('See all')} href="/subjects" /><div className="subject-shortcut-grid">{subjects.slice(0, 4).map(subject => <SubjectCard key={subject} subject={subject} />)}</div></section>
  </div>;
}

function StatTile({ Icon, value, label, tint }: { Icon: LucideIcon; value: string; label: string; tint: string }) {
  return <div className="stat-tile"><span className={`stat-icon stat-${tint}`}><Icon size={18} /></span><span className="stat-value display">{value}</span><span className="stat-label">{label}</span></div>;
}

function SubjectsPage() {
  const { state } = useStudy();
  const t = (text: string) => tr(text, state.language);
  const [search, setSearch] = useState('');
  const [grade, setGrade] = useState('All');
  const matchingSubjects = subjects.filter(subject => `${subjectName(subject, state.language)} ${subject}`.toLowerCase().includes(search.toLowerCase()));
  const matchingLessons = lessons.map(item => localizedLesson(item, state.language)).filter(lesson => (grade === 'All' || lesson.grade === Number(grade)) && `${lesson.title} ${subjectName(lesson.subject, state.language)} ${lesson.summary} ${lesson.sections.map(section => section.heading + section.body).join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="page-content">
    <PageHeading kicker={t('YOUR LEARNING LIBRARY')} title={t('Subjects')} subtitle={t('Explore clear, focused lessons for every grade.')} />
    <label className="search-box library-search"><Search size={19} /><input value={search} onChange={event => setSearch(event.target.value)} aria-label={t('Search subjects and notes')} data-testid="input-subject-search" placeholder={t('Search subjects, topics, or notes')} />{search && <button className="clear-search" onClick={() => setSearch('')} aria-label={t('Clear search')}><X size={16} /></button>}</label>
    <section className="subjects-overview"><SectionHeader title={t('All subjects')} /><div className="subject-grid">{matchingSubjects.map(subject => <SubjectCard key={subject} subject={subject} />)}{!matchingSubjects.length && <EmptyPanel title={t('No subject found')} text={t('Try Mathematics, Science, English, ICT, Sinhala, or History.')} />}</div></section>
    <section className="library-lessons"><div className="library-toolbar"><div><p className="eyebrow">{t('THE LESSON LIBRARY')}</p><h2 className="display section-title">{t('Find your next idea')}</h2></div><div className="grade-filters" role="group" aria-label={t('Filter lessons by grade')}>{['All', '10', '11', '12'].map(option => <button key={option} className={cx('filter-chip', grade === option && 'filter-active')} onClick={() => setGrade(option)} aria-pressed={grade === option} data-testid={`filter-grade-${option}`}>{option === 'All' ? t('All grades') : `${t('Grade ')}${option}`}</button>)}</div></div>
      <p className="result-count">{matchingLessons.length} {t(matchingLessons.length === 1 ? 'lesson' : 'lessons')} {t('to explore')}</p>
      {matchingLessons.length ? <div className="lesson-grid">{matchingLessons.map(item => <LessonCard key={item.id} lesson={item} />)}</div> : <EmptyPanel title={t('No lessons match those filters')} text={t('Try another topic or choose a different grade.')} />}
    </section>
  </div>;
}

function SubjectPage() {
  const { state } = useStudy();
  const t = (text: string) => tr(text, state.language);
  const params = useParams<{ subject: string }>();
  const [, setLocation] = useLocation();
  const subject = subjects.find(item => slug(item) === (params.subject || '').toLowerCase());
  if (!subject) return <div className="page-content"><PageHeading title={t('Subject not found')} subtitle={t('This subject isn’t in your learning library.')} /><Link href="/subjects" className="button button-secondary"><ArrowLeft size={16} /> {t('Back to subjects')}</Link></div>;
  const subjectLessons = lessons.filter(lesson => lesson.subject === subject);
  return <div className="page-content">
    <button className="back-link" onClick={() => setLocation('/subjects')}><ArrowLeft size={16} /> {t('All subjects')}</button>
    <div className={`subject-hero ${subjectPalettes[subject]}`}><SubjectBadge subject={subject} /><div><p className="eyebrow">{t('YOUR SUBJECT GUIDE')}</p><h1 className="display page-title">{subjectName(subject, state.language)}</h1><p>{subjectLessons.length} {t('lessons across Grades 10, 11 and 12')}</p></div><div className="subject-hero-art" aria-hidden="true"><Compass size={83} /></div></div>
    <section className="grade-groups">{[10, 11, 12].map(level => <div className="grade-group" key={level}><div className="grade-group-head"><div><p className="eyebrow">{t('Grade ')}{level}</p><h2 className="display section-title">{t('Keep building')}</h2></div><span className="grade-count">{t('1 lesson')}</span></div><div className="lesson-grid">{subjectLessons.filter(item => item.grade === level).map(item => <LessonCard key={item.id} lesson={item} />)}</div></div>)}</section>
  </div>;
}

function ReaderPage() {
  const { state, toggleBookmark, markCompleted } = useStudy();
  const params = useParams<{ noteId: string }>();
  const found = findLesson(params.noteId);
  const lesson = found ? localizedLesson(found, state.language) : undefined;
  const t = (text: string) => tr(text, state.language);
  const [, setLocation] = useLocation();
  useEffect(() => { if (lesson) markCompleted(lesson.id); }, [lesson?.id]);
  if (!lesson) return <div className="page-content"><PageHeading title={t('Lesson not found')} subtitle={t('It may have moved. Your library is still here.')} /><Link href="/subjects" className="button button-secondary"><ArrowLeft size={16} /> {t('Browse subjects')}</Link></div>;
  const saved = state.bookmarks.includes(lesson.id);
  const next = lessons.find(item => item.subject === lesson.subject && item.grade > lesson.grade);
  return <article className="reader-page">
    <div className="reader-top"><button className="back-link" onClick={() => setLocation(`/subjects/${slug(lesson.subject)}`)}><ArrowLeft size={16} /> {subjectName(lesson.subject, state.language)}</button><button className={cx('reader-save', saved && 'reader-save-active')} onClick={() => toggleBookmark(lesson.id)} aria-label={saved ? t('Remove bookmark') : t('Save lesson')} aria-pressed={saved} data-testid="button-reader-bookmark"><Bookmark size={17} fill={saved ? 'currentColor' : 'none'} /> <span>{saved ? t('Saved') : t('Save lesson')}</span></button></div>
    <div className="reader-head"><div className="reader-meta"><SubjectBadge subject={lesson.subject} /><span>{subjectName(lesson.subject, state.language)}</span><i>·</i><span>{t('Grade ')}{lesson.grade}</span><i>·</i><span><Clock3 size={14} /> {lesson.minutes} {t('min read')}</span></div><h1 className="display reader-title">{lesson.title}</h1><p className="reader-summary">{lesson.summary}</p><div className="reader-progress-note"><CheckCircle2 size={16} /> {t('Added to your lessons read')}</div></div>
    <div className="reader-layout"><aside className="reader-aside"><div className="aside-card"><span className="aside-number">01</span><h3>{t('Make it yours')}</h3><p>{t('Save this lesson to return whenever you need a quick refresher.')}</p><button onClick={() => toggleBookmark(lesson.id)} className="aside-save">{saved ? t('Remove saved lesson') : t('Add to bookmarks')} <Bookmark size={15} /></button></div><div className="aside-tip"><Lightbulb size={17} /><p>{t('Try explaining one idea from this lesson in your own words.')}</p></div></aside><div className="lesson-body">{lesson.sections.map((section, index) => <section className="lesson-section" key={section.heading}><div className="lesson-section-kicker">0{index + 1} <span /></div><h2 className="display">{section.heading}</h2><p>{section.body}</p>{section.key && <div className="key-takeaway"><Sparkles size={17} /><span>{section.key}</span></div>}</section>)}<div className="lesson-finish"><span className="finish-check"><Check size={20} /></span><div><strong>{t('That’s a solid step forward.')}</strong><p>{t('This lesson is now in your progress.')}</p></div></div>
      <div className="reader-next-row"><Link href="/subjects" className="text-link">{t('Back to subjects')} <ArrowLeft size={15} /></Link>{next && <Link href={`/notes/${next.id}`} className="button button-primary">{t('Next lesson')} <ArrowRight size={16} /></Link>}</div>
    </div></div>
  </article>;
}

function QuizPage() {
  const { state, chooseAnswer, submitQuiz } = useStudy();
  const t = (text: string) => tr(text, state.language);
  const quiz = localizedQuiz(dailyQuiz, state.language);
  const answers = state.dailyQuiz.answers;
  const submitted = state.dailyQuiz.submitted;
  const score = quiz.reduce((sum, item, index) => sum + (answers[index] === item.answer ? 1 : 0), 0);
  const best = state.quizRecords.length ? Math.max(...state.quizRecords.map(item => Math.round((item.score / item.total) * 100))) : null;
  const allAnswered = quiz.every((_, index) => Number.isInteger(answers[index]) && answers[index] >= 0);
  const [showReview, setShowReview] = useState(submitted);
  useEffect(() => { setShowReview(submitted); }, [submitted]);
  return <div className="page-content quiz-page">
    <PageHeading kicker={t('A DAILY MOMENT TO PRACTICE')} title={t('Quick quiz')} subtitle={t('Five questions from across your learning. No pressure—just practice.')} action={<div className="quiz-streak"><Flame size={16} /> {t('Daily practice')}</div>} />
    <div className="quiz-summary-bar"><div><span className="quiz-day-dot" /><span>{new Intl.DateTimeFormat(dateLocale(state.language), { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</span></div><span>{submitted ? `${t('Score')} · ${score} / ${quiz.length}` : t('About 3 minutes')}</span></div>
    {submitted && <div className="result-banner"><span className="result-medal"><Award size={23} /></span><div><p className="eyebrow">{t('TODAY’S RESULT')}</p><h2 className="display">{t(score === quiz.length ? 'Brilliant work.' : score >= 3 ? 'Look how far you’ve come.' : 'Every answer helps you grow.')}</h2><p>{state.language === 'si' ? <>ප්‍රශ්න {quiz.length}න් <strong>{score}කට</strong> නිවැරදිව පිළිතුරු දුන්නා.</> : <>{t('You got')} <strong>{score} {t('out of')} {quiz.length}</strong> {t('correct.')}</>} {best !== null && `${t('Your best score is')} ${best}%.`}</p></div><span className="result-percent display">{Math.round((score / quiz.length) * 100)}<small>%</small></span></div>}
    <div className="quiz-questions">{quiz.map((item, questionIndex) => <section className={cx('question-card', submitted && answers[questionIndex] === item.answer && 'question-correct', submitted && answers[questionIndex] !== item.answer && 'question-missed')} key={item.question}><div className="question-top"><span className="question-index">{t('QUESTION')} {String(questionIndex + 1).padStart(2, '0')}</span>{submitted && <span className={cx('answer-status', answers[questionIndex] === item.answer ? 'answer-good' : 'answer-review')}>{answers[questionIndex] === item.answer ? <><CheckCircle2 size={15} /> {t('Correct')}</> : t('Review this one')}</span>}</div><h2 className="display question-title">{item.question}</h2><div className="answer-options">{item.options.map((option, choiceIndex) => {
      const selected = answers[questionIndex] === choiceIndex;
      const isCorrect = item.answer === choiceIndex;
      return <button key={option} className={cx('answer-option', selected && 'answer-selected', submitted && isCorrect && 'answer-correct', submitted && selected && !isCorrect && 'answer-incorrect')} disabled={submitted} aria-pressed={selected} onClick={() => chooseAnswer(questionIndex, choiceIndex)} data-testid={`quiz-answer-${questionIndex}-${choiceIndex}`}><span className="option-letter">{String.fromCharCode(65 + choiceIndex)}</span><span>{option}</span>{submitted && isCorrect && <CheckCircle2 size={17} className="option-check" />}</button>;
    })}</div>{submitted && showReview && <div className="answer-explanation"><Lightbulb size={17} /><p><strong>{t('Why:')}</strong> {item.explanation}</p></div>}</section>)}</div>
    <div className="quiz-submit-row">{submitted ? <button className="review-toggle" onClick={() => setShowReview(!showReview)}>{showReview ? t('Review explanations above') : t('Show answer review')} <ChevronDown size={16} /></button> : <><span className="quiz-progress">{state.language === 'si' ? <>ප්‍රශ්න {quiz.length}න් {answers.filter(answer => answer >= 0).length}කට පිළිතුරු දී ඇත</> : <>{answers.filter(answer => answer >= 0).length} of {quiz.length} answered</>}</span><button className="button button-primary" disabled={!allAnswered} onClick={() => submitQuiz(answers, score, quiz.length)} data-testid="button-submit-quiz">{t('Check my answers')} <ArrowRight size={16} /></button></>}</div>
  </div>;
}

function BookmarksPage() {
  const { state } = useStudy();
  const t = (text: string) => tr(text, state.language);
  const saved = lessons.filter(lesson => state.bookmarks.includes(lesson.id));
  return <div className="page-content">
    <PageHeading kicker={t('YOUR PERSONAL SHELF')} title={t('Bookmarks')} subtitle={t('The lessons you want to find again, all in one place.')} />
    <div className="bookmark-intro"><span><Bookmark size={19} /></span><div><strong>{saved.length} {t('saved')} {t(saved.length === 1 ? 'lesson' : 'lessons')}</strong><p>{t('Save a useful idea from any lesson and it’ll be here.')}</p></div></div>
    {saved.length ? <div className="lesson-grid bookmark-grid">{saved.map(item => <LessonCard key={item.id} lesson={item} />)}</div> : <div className="empty-library"><div className="empty-illustration"><Bookmark size={30} /></div><p className="eyebrow">{t('A SPACE FOR YOUR FAVORITES')}</p><h2 className="display">{t('Your shelf is ready.')}</h2><p>{t('When a lesson feels worth keeping, tap its bookmark icon. You can return to it here any time.')}</p><Link href="/subjects" className="button button-primary">{t('Explore lessons')} <ArrowRight size={16} /></Link></div>}
  </div>;
}

function ProfilePage() {
  const { state, updateStudent, reset, setLanguage } = useStudy();
  const t = (text: string) => tr(text, state.language);
  const [name, setName] = useState(state.student.name);
  const [grade, setGrade] = useState(String(state.student.grade));
  const [savedMessage, setSavedMessage] = useState(false);
  const average = state.quizRecords.length ? Math.round(state.quizRecords.reduce((n, item) => n + item.score / item.total * 100, 0) / state.quizRecords.length) : null;
  const best = state.quizRecords.length ? Math.max(...state.quizRecords.map(item => Math.round(item.score / item.total * 100))) : null;
  const lastScore = state.quizRecords.at(-1);
  const save = (event: FormEvent) => {
    event.preventDefault();
    updateStudent(name || t('Learner'), Number(grade));
    setSavedMessage(true);
    window.setTimeout(() => setSavedMessage(false), 2400);
  };
  const onReset = () => {
    if (window.confirm(t('Reset your Study Hub profile and all saved progress on this device? This cannot be undone.'))) {
      reset();
      setName('');
      setGrade('10');
    }
  };
  return <div className="page-content profile-page">
    <PageHeading kicker={t('YOUR LEARNING, YOUR WAY')} title={t('Your profile')} subtitle={t('A little snapshot of the progress you’ve made.')} />
    <section className="profile-identity"><Avatar /><div><p className="eyebrow">{t('STUDYING IN')}</p><h2 className="display">{state.student.name || t('Learner')}</h2><p>{t('Grade ')}{state.student.grade} {t('student')}</p></div><span className="profile-identity-mark"><GraduationCap size={29} /></span></section>
    <section className="progress-section"><SectionHeader title={t('Your progress')} /><div className="progress-grid"><ProgressCard Icon={BookOpen} label={t('Lessons read')} value={String(state.completed.length)} helper={t('Every lesson is a new step')} /><ProgressCard Icon={Bookmark} label={t('Saved lessons')} value={String(state.bookmarks.length)} helper={t('Ideas you can revisit')} /><ProgressCard Icon={Target} label={t('Quiz attempts')} value={String(state.quizRecords.length)} helper={lastScore ? `${t('Last score')} · ${lastScore.score}/${lastScore.total}` : t('Your first quiz is waiting')} /><ProgressCard Icon={Award} label={t('Best quiz score')} value={best === null ? '—' : `${best}%`} helper={average === null ? t('Scores show up after a quiz') : `${average}% ${t('average so far')}`} /></div></section>
    <section className="profile-edit"><div className="profile-edit-head"><div><p className="eyebrow">{t('MAKE IT PERSONAL')}</p><h2 className="display section-title">{t('Your details')}</h2></div><span className="local-badge"><CheckCircle2 size={14} /> {t('Saved on this device')}</span></div><form className="profile-form" onSubmit={save}><div className="profile-form-fields"><label><span className="field-label">{t('Your name')}</span><input className="field" maxLength={40} value={name} onChange={event => setName(event.target.value)} aria-label={t('Your name')} data-testid="input-profile-name" /></label><label><span className="field-label">{t('Your grade')}</span><div className="grade-select-wrap"><select className="field" value={grade} onChange={event => setGrade(event.target.value)} aria-label={t('Your grade')} data-testid="select-profile-grade"><option value="10">{t('Grade 10')}</option><option value="11">{t('Grade 11')}</option><option value="12">{t('Grade 12')}</option></select><ChevronDown size={18} /></div></label></div><div className="profile-save-row"><p>{savedMessage ? <span className="save-confirm"><Check size={15} /> {t('Your details are up to date.')}</span> : t('Your grade helps put the right lessons first.')}</p><button className="button button-primary" type="submit" data-testid="button-save-profile">{t('Save changes')}</button></div></form></section>
    <section className="profile-edit language-setting"><div className="profile-edit-head"><div><p className="eyebrow">{t('Language')}</p><h2 className="display section-title">{t('Language')}</h2></div></div><div className="language-options profile-language" role="group" aria-label={t('Language')}><button type="button" className={cx('language-choice', state.language === 'si' && 'language-choice-selected')} aria-pressed={state.language === 'si'} onClick={() => setLanguage('si')}>{state.language === 'si' ? 'සිංහල' : 'Sinhala'}</button><button type="button" className={cx('language-choice', state.language === 'en' && 'language-choice-selected')} aria-pressed={state.language === 'en'} onClick={() => setLanguage('en')}>{state.language === 'si' ? 'ඉංග්‍රීසි' : 'English'}</button></div></section>
    <section className="reset-panel"><div><h3>{t('Start fresh?')}</h3><p>{t('Clear your name, bookmarks, lesson history, and quiz scores from this device.')}</p></div><button className="button button-quiet-danger" onClick={onReset} data-testid="button-reset-progress">{t('Reset progress')}</button></section>
  </div>;
}

function ProgressCard({ Icon, label, value, helper }: { Icon: LucideIcon; label: string; value: string; helper: string }) {
  return <div className="progress-card"><span className="progress-card-icon"><Icon size={19} /></span><p className="progress-card-label">{label}</p><strong className="display progress-value">{value}</strong><p className="progress-helper">{helper}</p></div>;
}

function EmptyPanel({ title, text }: { title: string; text: string }) {
  return <div className="empty-panel"><span className="empty-icon"><Search size={19} /></span><div><strong>{title}</strong><p>{text}</p></div></div>;
}

export default App;
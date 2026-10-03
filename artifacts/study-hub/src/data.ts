export type Subject = 'Mathematics' | 'Science' | 'English' | 'ICT' | 'Sinhala' | 'History';
export type Lesson = { id: string; subject: Subject; grade: number; title: string; summary: string; minutes: number; sections: { heading: string; body: string; key?: string }[] };

export const subjects: Subject[] = ['Mathematics', 'Science', 'English', 'ICT', 'Sinhala', 'History'];
const lessonsBySubject: Record<Subject, { topic: string[]; summary: string[]; sections: { heading: string; body: string; key?: string }[][] }> = {
  Mathematics: {
    topic: ['Linear equations & graphs', 'Quadratic patterns', 'Trigonometry in right triangles'],
    summary: ['Connect equations to straight-line graphs and use gradient to describe change.', 'Factorise quadratic expressions and connect roots to the shape of a graph.', 'Use sine, cosine and tangent to solve practical problems with right triangles.'],
    sections: [
      [{ heading: 'A line tells a story', body: 'A linear relationship changes at a constant rate. In y = mx + c, m is the gradient and c is the y-intercept. The gradient measures how much y changes for each one-unit change in x.', key: 'gradient = change in y ÷ change in x' }, { heading: 'Build the graph', body: 'Choose two x-values, substitute them into the equation, and plot the resulting ordered pairs. A straight edge through the points gives the graph. For y = 2x + 1, the points (0, 1) and (2, 5) are enough to establish the line.' }, { heading: 'Try it yourself', body: 'For y = 3x − 2, identify the gradient and intercept, then calculate the point where x = 2. Check that your point lies on the line.' }],
      [{ heading: 'From a pattern to an equation', body: 'A quadratic expression has a squared variable, such as x² + 5x + 6. Factoring rewrites it as a product: x² + 5x + 6 = (x + 2)(x + 3).', key: 'The zero-product rule: if ab = 0, then a = 0 or b = 0.' }, { heading: 'Find the roots', body: 'Set each factor equal to zero. For (x + 2)(x + 3) = 0, the roots are x = −2 and x = −3. These are the points where the parabola crosses the x-axis.' }, { heading: 'Notice the shape', body: 'The squared term makes the graph curve. A positive coefficient opens the curve upward; a negative coefficient opens it downward. The roots help locate its intersections.' }],
      [{ heading: 'Name the sides', body: 'Start by choosing one acute angle. The hypotenuse is opposite the right angle; the opposite and adjacent sides are named in relation to your chosen angle.', key: 'SOH–CAH–TOA: sin = O/H, cos = A/H, tan = O/A' }, { heading: 'Choose a ratio', body: 'If you know an angle and the adjacent side but need the opposite side, tangent is a direct choice. Rearrange tan θ = opposite ÷ adjacent to find the unknown.' }, { heading: 'Check your answer', body: 'Make a quick sketch, check your calculator is in degree mode, and ask whether the size makes sense. The hypotenuse must always be the longest side.' }]
    ]
  },
  Science: {
    topic: ['Cells: the basic unit of life', 'Forces, motion & energy', 'Chemical reactions and conservation'],
    summary: ['Explore how specialised cell structures work together to keep organisms alive.', 'Describe motion with forces and see how energy moves between forms.', 'Recognise evidence of a chemical reaction and account for every atom.'],
    sections: [
      [{ heading: 'A tiny working system', body: 'Cells are the smallest structures that carry out the processes of life. The cell membrane regulates what enters and leaves, while cytoplasm is where many reactions take place.', key: 'Structure is linked to function.' }, { heading: 'Plant and animal cells', body: 'Both contain a nucleus, cytoplasm and a cell membrane. Plant cells also have a cellulose cell wall, chloroplasts for photosynthesis and a large permanent vacuole.' }, { heading: 'Specialisation', body: 'Cells can develop features suited to their role. A root hair cell has an extended surface area for absorbing water and minerals from soil.' }],
      [{ heading: 'What changes motion?', body: 'A force is a push or a pull. When forces are balanced, an object’s motion does not change. An unbalanced resultant force causes acceleration.', key: 'resultant force = mass × acceleration' }, { heading: 'Energy moves, not vanishes', body: 'Energy may be transferred between stores. A raised object has gravitational potential energy; as it falls, energy transfers to its kinetic store.' }, { heading: 'Use evidence', body: 'Describe the object’s motion, identify the forces acting on it, then explain the energy transfer. Friction often transfers some energy to the thermal store of surroundings.' }],
      [{ heading: 'Clues that a reaction happened', body: 'A colour change, gas bubbles, a temperature shift or a new solid can provide evidence that a chemical reaction has taken place.', key: 'Atoms rearrange; they are not created or destroyed.' }, { heading: 'Represent the change', body: 'A word equation names reactants on the left and products on the right. For example: magnesium + oxygen → magnesium oxide.' }, { heading: 'Keep the count balanced', body: 'Chemical formulae show the types and numbers of atoms. Adjust coefficients in front of formulae until each element has the same atom count on both sides.' }]
    ]
  },
  English: {
    topic: ['Reading for inference', 'Building a persuasive argument', 'Poetry: voice, image & form'],
    summary: ['Read between the lines by combining textual clues with careful interpretation.', 'Shape a clear argument with evidence, counterpoints and deliberate language.', 'Explore how a poet’s choices of voice, imagery and form shape meaning.'],
    sections: [
      [{ heading: 'What is inference?', body: 'Inference is a conclusion supported by clues rather than stated directly. Readers combine evidence in the text with what they already know.', key: 'Claim + precise evidence + explanation = a convincing inference.' }, { heading: 'Zoom in on a clue', body: 'Notice a character’s actions, dialogue and word choice. If a character folds a letter without reading it, that action may suggest avoidance, but context is needed before deciding why.' }, { heading: 'Write your thinking', body: 'Use a short quotation, explain the connotations of one key word, then connect the detail to the wider mood or character. Avoid retelling the whole passage.' }],
      [{ heading: 'Make the claim clear', body: 'A persuasive paragraph begins with a focused position. Each paragraph should develop one reason that supports the overall argument.', key: 'Point → Evidence → Explanation → Link' }, { heading: 'Use evidence with purpose', body: 'A specific example gives a reader something concrete to consider. Explain how it supports your point instead of assuming the connection is obvious.' }, { heading: 'Make room for another view', body: 'Acknowledge a reasonable counterargument and respond to it fairly. This makes the final position more credible, not less confident.' }],
      [{ heading: 'Listen to the speaker', body: 'The speaker is the voice we hear in a poem, not automatically the poet. Look for clues about their attitude, audience and situation.', key: 'Always connect a technique to its effect.' }, { heading: 'Make images precise', body: 'A metaphor describes one thing as another; simile makes a comparison using like or as. Ask what associations the image invites and why that image suits this moment.' }, { heading: 'Read the shape', body: 'Line breaks, stanza length, rhythm and rhyme can control pace or emphasis. Read aloud and notice where the voice pauses or changes direction.' }]
    ]
  },
  ICT: {
    topic: ['Algorithms & flowcharts', 'Networks and data transmission', 'Databases: tables and relationships'],
    summary: ['Turn a problem into precise, ordered steps that a computer can follow.', 'Follow data across a network and compare the roles of key devices.', 'Organise related information and query it accurately with a relational database.'],
    sections: [
      [{ heading: 'Think before you code', body: 'An algorithm is a finite sequence of unambiguous instructions that solves a problem. Write it so each step has one clear interpretation.', key: 'Input → Process → Output' }, { heading: 'Use a decision', body: 'A selection uses a condition to choose between paths. For example, IF score ≥ 50 THEN display “Pass”, ELSE display “Try again”.' }, { heading: 'Trace a solution', body: 'Test the algorithm with a normal input, a boundary value and an unusual input. A trace table records how each variable changes at every step.' }],
      [{ heading: 'A network of connections', body: 'A computer network links devices so they can share data and resources. A local area network covers a limited site; a wide area network spans a larger distance.', key: 'Packets carry pieces of a message across the network.' }, { heading: 'Choose the route', body: 'A router directs packets between networks. A switch forwards data to the correct device within a local network.' }, { heading: 'Protect the journey', body: 'Protocols agree how data is formatted and transmitted. Encryption makes intercepted data difficult to understand without the correct key.' }],
      [{ heading: 'Store information with structure', body: 'A relational database separates information into tables. Each table represents one subject, such as Students or Classes.', key: 'A primary key uniquely identifies each record.' }, { heading: 'Connect tables', body: 'A foreign key refers to a key in another table. This creates a relationship without copying the same details repeatedly.' }, { heading: 'Ask a precise question', body: 'A query selects records that match criteria. For example, filtering Grade = 11 returns only the students whose grade field has that value.' }]
    ]
  },
  Sinhala: {
    topic: ['වාක්‍ය රචනය සහ ව්‍යාකරණය', 'කෙටි කතාවක් විමසා බැලීම', 'කාව්‍ය රසවින්දනය'],
    summary: ['වාක්‍ය ව්‍යුහය සහ නිවැරදි ව්‍යාකරණය භාවිතයෙන් අදහස් පැහැදිලිව ලියන්න.', 'චරිත, සිදුවීම් සහ තේමාව හඳුනාගෙන කෙටි කතාවක අර්ථය විමසන්න.', 'කවියක රූපක, රිද්මය හා හැඟීම් පිළිබඳ සාක්ෂි සමඟ අදහස් දක්වන්න.'],
    sections: [
      [{ heading: 'අදහසක් පැහැදිලිව ලියමු', body: 'වාක්‍යයක් තුළ අදහස සම්පූර්ණ විය යුතුය. කර්තෘ, ක්‍රියාව සහ අදාළ විස්තර නිවැරදි අනුපිළිවෙළින් යෙදීමෙන් පාඨකයාට අදහස පහසුවෙන් තේරුම් ගත හැකිය.', key: 'ලියන විට අක්ෂර වින්‍යාසය සහ විරාම ලකුණු පරීක්ෂා කරන්න.' }, { heading: 'වාක්‍ය සම්බන්ධ කිරීම', body: 'සම්බන්ධක පද භාවිතයෙන් අදහස් අතර හේතුව, විරුද්ධතාව හෝ අනුපිළිවෙළ පෙන්විය හැකිය. එකම වචන නැවත නැවත යෙදීම වෙනුවට සුදුසු පදයක් තෝරන්න.' }, { heading: 'අවසන් පරීක්ෂාව', body: 'ලියූ දෙය ශබ්දයෙන් කියවන්න. දිගු වාක්‍ය කෙටි කරන්න, වැරදි නිවැරදි කරන්න, සහ මාතෘකාවට පිළිතුරු ලැබෙන බව තහවුරු කරන්න.' }],
      [{ heading: 'කතාවේ මූලික අංග', body: 'කෙටි කතාවක චරිත, පසුබිම, ගැටුම සහ සිදුවීම් පෙළ එකිනෙකට බැඳී ඇත. කතාවේ ආරම්භය සහ අවසානය අතර වෙනස සැලකිල්ලෙන් කියවන්න.', key: 'කතාවේ සිදුවීමක් උපුටා දක්වා ඔබේ අදහසට සාක්ෂි දෙන්න.' }, { heading: 'චරිත තේරුම් ගැනීම', body: 'චරිතයක් ගැන කතුවරයා කියන දේ පමණක් නොව, එම චරිතය කරන සහ කියන දේද සලකා බලන්න. වෙනස් වීමක් තිබේ නම් එය ඇති වූ හේතුව සොයන්න.' }, { heading: 'තේමාව හඳුනාගැනීම', body: 'තේමාව යනු කතාවෙන් ඉස්මතු වන පුළුල් අදහසකි. එකම සිදුවීමක් නැවත නැවත බලපාන ආකාරය සහ අවසානය එයට දෙන අර්ථය සම්බන්ධ කරන්න.' }],
      [{ heading: 'කවියේ හඬ අසමු', body: 'කවිය කියන හඬ සහ කවියා එකම පුද්ගලයා විය යුතු නැත. කවියේ කථකයාගේ හැඟීම සහ එය වෙනස් වන තැන් සොයන්න.', key: 'භාෂා උපක්‍රමය + පාඨකයාට ඇති කරන බලපෑම' }, { heading: 'රූපක හා රූප', body: 'රූපකයක් අදහසක් වඩාත් ජීවමාන කරයි. වචනයක් තෝරා එහි අර්ථ සෙවනැලි සහ කවියේ පසුබිම සමඟ ඇති සම්බන්ධය විස්තර කරන්න.' }, { heading: 'රිද්මය සහ විරාමය', body: 'පද පේළි බෙදීම, පුනරාවර්තනය සහ ශබ්ද රටාව කවියේ වේගය පාලනය කරයි. ශබ්දයෙන් කියවා ඒ වෙනස්කම් දැනෙන්නේ කෙසේදැයි සටහන් කරන්න.' }]
    ]
  },
  History: {
    topic: ['Ancient kingdoms of Sri Lanka', 'Trade, travel & cultural exchange', 'Independence and a changing nation'],
    summary: ['Trace how irrigation, leadership and learning shaped early Sri Lankan kingdoms.', 'See how Indian Ocean trade connected communities and moved ideas as well as goods.', 'Connect key events and people in Sri Lanka’s path to independence.'],
    sections: [
      [{ heading: 'Water makes settlement possible', body: 'In the dry zone, reservoirs and canals helped communities store and distribute seasonal rain. Reliable water supported farming and larger settlements.', key: 'Historical explanation connects evidence, causes and consequences.' }, { heading: 'A centre of leadership', body: 'Ancient capitals brought administration, religious life and skilled work together. Inscriptions, buildings and artefacts help historians reconstruct how these centres functioned.' }, { heading: 'Read the evidence carefully', body: 'An archaeological find is evidence, not a complete story. Ask when it was made, who made it and what it can—and cannot—tell us.' }],
      [{ heading: 'An island in a busy sea', body: 'Sri Lanka’s position in the Indian Ocean connected it with ports and trading routes across Asia, Africa and the Middle East.', key: 'Trade moved beliefs, language and technology as well as goods.' }, { heading: 'Ports and exchange', body: 'Ships carried goods such as spices, gems and textiles. Ports were places where merchants, sailors and local communities met.' }, { heading: 'Change and continuity', body: 'Contacts could introduce new ideas while local customs continued. Compare evidence from different periods to identify what changed and what endured.' }],
      [{ heading: 'A movement gathers strength', body: 'During the twentieth century, constitutional reform and political organisations helped expand public participation in Ceylon’s government.', key: 'Independence was a process shaped by many people and events.' }, { heading: 'People and institutions', body: 'Leaders organised campaigns, debated reform and represented different communities. Track the role of institutions as well as individual figures.' }, { heading: 'Build a timeline', body: 'Place events in chronological order, then explain how one development created conditions for another. A timeline shows sequence; a historical argument explains significance.' }]
    ]
  }
};

export const lessons: Lesson[] = subjects.flatMap((subject) =>
  [10, 11, 12].map((grade, index) => ({
    id: `${subject.toLowerCase()}-${grade}`,
    subject,
    grade,
    title: lessonsBySubject[subject].topic[index],
    summary: lessonsBySubject[subject].summary[index],
    minutes: [8, 10, 12][index],
    sections: lessonsBySubject[subject].sections[index]
  }))
);

export type QuizQuestion = { question: string; options: string[]; answer: number; explanation: string };
export const dailyQuiz: QuizQuestion[] = [
  { question: 'In y = 4x + 3, what is the gradient?', options: ['3', '4', 'x', '7'], answer: 1, explanation: 'The coefficient of x is the gradient, so m = 4.' },
  { question: 'Which cell structure controls what enters and leaves?', options: ['Cell membrane', 'Nucleus', 'Cell wall', 'Chloroplast'], answer: 0, explanation: 'The cell membrane regulates movement into and out of the cell.' },
  { question: 'What makes a strong inference?', options: ['A guess without evidence', 'A quote with no explanation', 'A conclusion supported by textual clues', 'A summary of every paragraph'], answer: 2, explanation: 'An inference connects a reasoned conclusion to clues in the text.' },
  { question: 'What does a primary key do in a database?', options: ['Deletes duplicate tables', 'Uniquely identifies a record', 'Encrypts every field', 'Sorts records alphabetically'], answer: 1, explanation: 'A primary key is a unique identifier for each record in its table.' },
  { question: 'What is an important purpose of ancient reservoirs in Sri Lanka?', options: ['To power steam engines', 'To store and distribute water', 'To mark trade borders', 'To protect ports from ships'], answer: 1, explanation: 'Reservoirs stored seasonal rain and helped distribute water to support farming and communities.' }
];
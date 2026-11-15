/* Study tracks.
   This file is the ONLY place that decides what belongs to the Midterm, the Final or the Full course.
   To change the scope next semester, edit the list below and nothing else.

   A track:
     id         short id, saved in localStorage as wdl:track
     label      name on the switch
     examDate   ISO date and time of the exam (Bahrain is +03:00). Leave it out for a track with no exam.
     scopeNote  one line shown on the home page
     chapters   book chapters, shown in the footer
     modules    module ids (see MODULES in js/content.js), or '*' for every module
     lessons    optional single lessons: 'lesson-id' adds one, '-lesson-id' removes one
     exams      mock exam ids ('midterm', 'final'), or '*' for all

   If the final turns out to be cumulative, add the midterm modules to the final track's "modules". */
const TRACKS = {
  semester: '2026-27 Sem 1',
  list: [
    { id: 'mid',
      label: { en: 'Midterm', ar: 'الميد' },
      examDate: '2026-11-12T15:00+03:00',
      scopeNote: { en: 'HTML + CSS + JS (till events)', ar: 'HTML + CSS + JS (لين الـ events)' },
      chapters: { en: 'chapters 3, 4, 5, 7, 8 and 9 (up to events)', ar: 'الفصول 3 و 4 و 5 و 7 و 8 و 9 (لين الـ events)' },
      modules: ['html', 'forms', 'css', 'layout', 'js', 'dom', 'events'],
      exams: ['midterm'] },
    { id: 'final',
      label: { en: 'Final', ar: 'الفاينل' },
      examDate: '2026-12-27T08:30+03:00',
      /* cumulative (confirmed 2026-11-15): the midterm modules are included */
      scopeNote: { en: 'everything: HTML, CSS, JS, plus APIs and async JS, PHP, databases with PDO, state, security, how the web works', ar: 'كل شي: HTML و CSS و JS، وفوقها الـ APIs والـ async JS، و PHP، وقواعد البيانات بـ PDO، والـ state، والـ security، وشلون يشتغل الـ web' },
      chapters: { en: 'chapters 1 to 5, 7 to 10, 12 and 14 to 16', ar: 'الفصول 1 لين 5، و 7 لين 10، و 12، و 14 لين 16' },
      modules: ['web', 'html', 'forms', 'css', 'layout', 'js', 'dom', 'events', 'async', 'php', 'db', 'state', 'security', 'bonus'],
      exams: ['final', 'midterm'] },
    { id: 'all',
      label: { en: 'Full course', ar: 'المادة كاملة' },
      scopeNote: { en: 'Every lesson, in book order', ar: 'كل الدروس، بترتيب الكتاب' },
      chapters: { en: 'chapters 1 to 5, 7 to 10, 12 and 14 to 16', ar: 'الفصول 1 لين 5، و 7 لين 10، و 12، و 14 لين 16' },
      modules: '*', exams: '*' }
  ]
};

/* Helpers. No scope decisions below this line. */
(() => {
  const byId = id => TRACKS.list.find(t => t.id === id);
  const when = t => t.examDate ? Date.parse(t.examDate) : NaN;
  TRACKS.byId = byId;
  /* default: the track whose exam is the nearest in the future; if none, the full course */
  TRACKS.fallback = () => {
    const now = Date.now();
    const next = TRACKS.list.filter(t => when(t) > now).sort((a, b) => when(a) - when(b))[0];
    return next || TRACKS.list.find(t => t.modules === '*') || TRACKS.list[0];
  };
  TRACKS.current = () => byId(U.store.get('track', null)) || TRACKS.fallback();
  TRACKS.pick = id => U.store.set('track', id);
  TRACKS.isFull = t => t.modules === '*';
  TRACKS.hasModule = (t, mid) => t.modules === '*' || t.modules.includes(mid);
  TRACKS.hasLesson = (t, L) => {
    const one = t.lessons || [];
    if (one.includes('-' + L.id)) return false;
    return one.includes(L.id) || TRACKS.hasModule(t, L.module);
  };
  TRACKS.hasExam = (t, id) => t.exams === '*' || (t.exams || []).includes(id);
  /* the exam track a lesson belongs to (used for the "not in this scope" banner) */
  TRACKS.owner = L => TRACKS.list.find(t => t.modules !== '*' && TRACKS.hasLesson(t, L)) || null;
  TRACKS.text = o => o ? (o[I18N.lang()] || o.en) : '';
  TRACKS.date = t => when(t);
})();

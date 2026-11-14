/* UI language: 'en' or 'ar' (Arabic with English technical terms). */
const I18N = (() => {
  let lang = U.store.get('lang', 'en');
  const S = {
    en: {
      navLearn: 'Learn', navPractice: 'Practice', navExam: 'Mock exam', navGuide: 'How to use', brandSub: 'Midterm: HTML · CSS · JS',
      footer: 'Built for ITCS333 Internet Software Development (University of Bahrain). Content follows Connolly & Hoar, Fundamentals of Web Development 3rd ed., chapters 3, 4, 5, 7, 8 and 9 (up to events). Progress is saved in this browser only.',
      heroChip: 'ITCS333 · Midterm: HTML + CSS + JS (till events)', heroTitle: 'Learn web development by writing it.',
      heroLead: 'Twenty-eight short lessons from your first HTML tag to building table rows with JavaScript events. Every lesson ends with code you write and the site checks for you, then a mock midterm marked line by line like the real paper.',
      continue: 'Continue: ', start1: 'Start lesson 1', takeMock: 'Take a mock midterm', lessonsDone: (a, b) => `${a} of ${b} lessons done`,
      qLearnT: 'Learn', qLearnD: '7 modules, 28 lessons, each in 8 steps: Big Picture to Active Recall.',
      qPracT: 'Practice questions', qPracD: n => `${n} MCQs with explanations, many modelled on past ITCS333 exams.`,
      qPuzT: 'Specificity puzzles', qPuzD: '"Which colour wins?" questions like the 2024-25 midterm, explained rule by rule.',
      qRandT: 'Random exam question', qRandD: 'One question from a mock paper, auto-marked with the real mark split.',
      thePath: 'The path', howStudy: 'How to study with this site', nLessons: n => `${n} lessons`,
      lessonsH: 'Lessons', lessonsLead: 'Work through them in order the first time. Each lesson: 8 steps, a live editor, a quick quiz and a coding challenge.',
      quizDone: 'Quiz done', chalDone: 'Challenge ✓',
      lessonOf: (a, b) => `lesson ${a} of ${b}`, prevLesson: '← Previous lesson', nextLessonBtn: 'Next lesson →', jump: 'Jump to a lesson',
      thisLesson: 'This lesson', allChapters: 'All chapters', keysHint: 'Keys: <kbd>←</kbd> <kbd>→</kbd> steps · <kbd>Shift</kbd>+<kbd>←</kbd> <kbd>→</kbd> lessons',
      stepOf: (a, n) => `Step ${a} of 8 · ${n}`, back: '← Back', next: 'Next →', mockArrow: 'Mock exam →',
      tryIt: 'Try it.', examFocusLead: 'How this topic appeared in real ITCS333 exams.', wrong: 'Wrong', right: 'Right',
      recallLead: 'Answer from memory first. Then write the code yourself.', codingChallenge: 'Coding challenge',
      nextLessonBanner: t => 'Next lesson: ' + t, lastLesson: 'That was the last lesson. Time for the mock midterm.', goNext: 'Go to next lesson →', startMock: 'Start mock midterm →',
      reset: 'Reset', run: '▶ Run', result: 'Result', console: 'Console', consoleEmpty: 'Console output appears here',
      check: 'Check my answer', showModel: 'Show model answer', hideModel: 'Hide model answer', checking: 'Checking…', allPassed: 'All checks passed. Challenge complete.',
      correct: 'Correct.', notQuite: 'Not quite.',
      practiceH: 'Practice', ptQuiz: 'Quick quiz', ptPuz: 'Specificity puzzles', ptRand: 'Random exam question', ptChal: 'All coding challenges',
      topic: 'Topic', allTopics: 'All topics', questions: 'Questions', all: 'All', onlyWrong: 'only ones I got wrong', newSet: 'New set',
      noQs: 'No questions here yet. Answer some sets first, then come back to repeat the ones you missed.', scored: (r, t) => `You scored ${r} / ${t}.`, another: 'Another set',
      puzMethod: 'Method: 1) cross out rules that do not match the element, 2) compare specificity (id, class, element), 3) on a tie, the later rule wins. Inline style beats all selectors. The answers here are computed by a real browser.',
      puzzle: n => 'Puzzle ' + n, whatApplied: (prop, label) => `What ${prop === 'color' ? 'color' : 'border'} is applied to ${label}?`,
      rulesSet: 'Rules that set this property:', noMatch: 'does not match this element', puzFoot: 'Among the matching rules, the highest specificity wins; on a tie, the one written last.',
      scenario: 'Scenario', anotherQ: 'Another question', mark: 'Mark my answer', marking: 'Marking…', model: 'Model answer',
      showHtml: 'Show the HTML you are working with (Q1 model answer)', noAuto: 'No autocomplete here on purpose: the real exam is on paper. Write every small line; each is about 1 mark.',
      examEnglish: '',
      chalLead: 'Every lesson ends with a coding challenge. They are also listed here so you can redo them.', done: 'Done ✓', todo: 'To do',
      mockH: 'Mock midterm', mockLead: 'Same structure and marking as the ITCS333 Midterm 2025-26: <strong>Q1 HTML + CSS (21)</strong>, <strong>Q2.A JavaScript (17)</strong>, <strong>Q2.B JavaScript (17)</strong> = 55 marks in 60 minutes. Each attempt uses a different scenario, so you cannot just memorise ids.',
      random: 'Random', timer60: '60-minute timer', startExam: 'Start exam', resume: 'Resume unfinished exam', attempts: 'Your attempts',
      thDate: 'Date', thScenario: 'Scenario', thTotal: 'Total', submit: 'Submit exam', clickAgain: 'Click again to submit', runAll: 'Run my whole page',
      runAllNote: 'Your Q1 page with your Q2.A and Q2.B code together. Try adding rows and calculating. Click a question tab to go back.',
      markingExam: 'Marking your exam…', markingLead: 'Running your code against the marking scheme.', newAttempt: 'New attempt', practiseSingle: 'Practise single questions',
      reviewNote: 'Every ✗ line is a mark lost. Open the model answer under each question and compare line by line, then retry the same part in <a href="#practice-exam">Random exam question</a>.',
      min: 'min', mockTitle: 'Mock midterm',
      hint: 'Hint', hintNext: 'Next step:', hintAllPass: 'Everything already passes. Press Check my answer.', hintLine: 'Next line from the model answer', addLine: 'Add this line to my code',
      lineAdded: 'Added to your code at the cursor. Press Run or Check to see the effect.', hintNoMore: 'Your code already has every line of the model answer. Press Check to see what is still wrong.', hintsUsed: n => `Hints used: ${n}`,
      mcqHint: 'Hint: remove a wrong answer', ptPlay: 'Playground', playLead: 'Free space to write and run your own HTML, CSS and JavaScript. Saved automatically in this browser.', playClear: 'Clear all',
      hideMenu: 'Hide menu', showMenu: 'Show menu', menu: 'Menu', hideShort: 'Hide', resizeMenu: 'Drag to change the menu width (double-click to reset)', fullTip: 'Full screen: editor and result fill the whole screen (Esc to exit)', exitFull: 'Exit full screen (Esc)', layoutTip: 'Switch layout: code beside the result, or code on top with the result below'
    },
    ar: {
      navLearn: 'الدروس', navPractice: 'تدريب', navExam: 'امتحان تجريبي', navGuide: 'طريقة الاستخدام', brandSub: 'الميد: HTML · CSS · JS',
      footer: 'مسوّى لمادة ITCS333 Internet Software Development (جامعة البحرين). المحتوى من كتاب Connolly & Hoar، Fundamentals of Web Development الطبعة الثالثة، الفصول 3 و 4 و 5 و 7 و 8 و 9 (لين الـ events). تقدمك ينحفظ في هالـ browser بس.',
      heroChip: 'ITCS333 · الميد: HTML + CSS + JS (لين الـ events)', heroTitle: 'تعلّم الـ web development وأنت تكتبه بيدك.',
      heroLead: '28 درس قصير، من أول HTML tag لين ما تبني صفوف جدول بـ JavaScript events. كل درس ينتهي بكود تكتبه أنت والموقع يصححه لك، وبعدين امتحان تجريبي يتصحح سطر بسطر مثل الورقة الحقيقية.',
      continue: 'كمّل: ', start1: 'ابدأ الدرس الأول', takeMock: 'ادخل امتحان تجريبي', lessonsDone: (a, b) => `خلصت ${a} من ${b} درس`,
      qLearnT: 'الدروس', qLearnD: '7 أقسام و 28 درس، وكل درس 8 خطوات: من Big Picture لين Active Recall.',
      qPracT: 'أسئلة تدريب', qPracD: n => `${n} سؤال MCQ مع الشرح، وكثير منها على نمط امتحانات ITCS333 القديمة.`,
      qPuzT: 'ألغاز الـ Specificity', qPuzD: 'أسئلة "أي لون يفوز؟" مثل ميد 2024-25، ومشروحة rule بـ rule.',
      qRandT: 'سؤال امتحان عشوائي', qRandD: 'سؤال واحد من ورقة تجريبية، يتصحح تلقائي بنفس توزيع الدرجات الحقيقي.',
      thePath: 'المسار', howStudy: 'شلون تذاكر بهالموقع', nLessons: n => `${n} دروس`,
      lessonsH: 'الدروس', lessonsLead: 'أول مرة امشِ عليها بالترتيب. كل درس فيه 8 خطوات، و editor حي، و quiz سريع، وتحدي كود.',
      quizDone: 'خلصت الأسئلة', chalDone: 'التحدي ✓',
      lessonOf: (a, b) => `الدرس ${a} من ${b}`, prevLesson: 'الدرس السابق →', nextLessonBtn: '← الدرس التالي', jump: 'انتقل لدرس',
      thisLesson: 'هالدرس', allChapters: 'كل الفصول', keysHint: 'الكيبورد: <kbd>←</kbd> <kbd>→</kbd> الخطوات · <kbd>Shift</kbd>+<kbd>←</kbd> <kbd>→</kbd> الدروس',
      stepOf: (a, n) => `الخطوة ${a} من 8 · ${n}`, back: 'رجوع →', next: '← التالي', mockArrow: '← الامتحان التجريبي',
      tryIt: 'جرّب.', examFocusLead: 'شلون جا هالموضوع في امتحانات ITCS333 الحقيقية.', wrong: 'غلط', right: 'صح',
      recallLead: 'جاوب من ذاكرتك أول، وبعدين اكتب الكود بنفسك.', codingChallenge: 'تحدي الكود',
      nextLessonBanner: t => 'الدرس الجاي: ' + t, lastLesson: 'هذا كان آخر درس. الحين وقت الامتحان التجريبي.', goNext: '← روح للدرس الجاي', startMock: '← ابدأ الامتحان التجريبي',
      reset: 'Reset', run: '▶ Run', result: 'النتيجة', console: 'Console', consoleEmpty: 'مخرجات الـ console تطلع هني',
      check: 'صحّح جوابي', showModel: 'اعرض الحل النموذجي', hideModel: 'خبّي الحل النموذجي', checking: 'قاعد أصحّح…', allPassed: 'كل الفحوصات نجحت. خلصت التحدي.',
      correct: 'صح.', notQuite: 'مو بالضبط.',
      practiceH: 'تدريب', ptQuiz: 'Quiz سريع', ptPuz: 'ألغاز الـ Specificity', ptRand: 'سؤال امتحان عشوائي', ptChal: 'كل تحديات الكود',
      topic: 'الموضوع', allTopics: 'كل المواضيع', questions: 'عدد الأسئلة', all: 'الكل', onlyWrong: 'بس اللي غلطت فيها', newSet: 'مجموعة جديدة',
      noQs: 'ما في أسئلة هني للحين. حل كم مجموعة أول، وبعدين ارجع عشان تعيد اللي غلطت فيها.', scored: (r, t) => `درجتك ${r} من ${t}.`, another: 'مجموعة ثانية',
      puzMethod: 'الطريقة: 1) اشطب الـ rules اللي ما تنطبق على العنصر، 2) قارن الـ specificity (id, class, element)، 3) إذا تعادلوا، الـ rule الأخير يفوز. والـ inline style يغلب كل الـ selectors. الأجوبة هني يحسبها browser حقيقي.',
      puzzle: n => 'لغز ' + n, whatApplied: (prop, label) => `أي ${prop === 'color' ? 'لون (color)' : 'border'} ينطبق على ${label}؟`,
      rulesSet: 'الـ rules اللي تحدد هالـ property:', noMatch: 'ما ينطبق على هالعنصر', puzFoot: 'من الـ rules اللي تنطبق، أعلى specificity يفوز، وإذا تعادلوا فاللي مكتوب آخر.',
      scenario: 'السيناريو', anotherQ: 'سؤال ثاني', mark: 'صحّح جوابي', marking: 'قاعد أصحّح…', model: 'الحل النموذجي',
      showHtml: 'اعرض الـ HTML اللي تشتغل عليه (الحل النموذجي لـ Q1)', noAuto: 'ما في autocomplete هني عن قصد، لأن الامتحان الحقيقي على ورق. اكتب كل سطر صغير، كل واحد تقريبًا عليه درجة.',
      examEnglish: 'نص السؤال بالإنجليزي عن قصد، مثل الامتحان الحقيقي.',
      chalLead: 'كل درس ينتهي بتحدي كود. ومجموعة هني كلها عشان تقدر تعيدها.', done: 'خلص ✓', todo: 'باقي',
      mockH: 'امتحان ميد تجريبي', mockLead: 'نفس هيكل وتصحيح ميد ITCS333 لسنة 2025-26: <strong>Q1 HTML + CSS (21)</strong>، و <strong>Q2.A JavaScript (17)</strong>، و <strong>Q2.B JavaScript (17)</strong> = 55 درجة في 60 دقيقة. كل محاولة بسيناريو مختلف، فما ينفع تحفظ الـ ids بس.',
      random: 'عشوائي', timer60: 'مؤقت 60 دقيقة', startExam: 'ابدأ الامتحان', resume: 'كمّل الامتحان اللي ما خلصته', attempts: 'محاولاتك',
      thDate: 'التاريخ', thScenario: 'السيناريو', thTotal: 'المجموع', submit: 'سلّم الامتحان', clickAgain: 'اضغط مرة ثانية عشان تسلّم', runAll: 'شغّل صفحتي كاملة',
      runAllNote: 'صفحة Q1 حقتك مع كود Q2.A و Q2.B مع بعض. جرّب تضيف صفوف وتحسب. اضغط على تاب أي سؤال عشان ترجع.',
      markingExam: 'قاعد أصحّح امتحانك…', markingLead: 'أشغّل الكود حقك على نموذج التصحيح.', newAttempt: 'محاولة جديدة', practiseSingle: 'تدرّب على أسئلة مفردة',
      reviewNote: 'كل سطر عليه ✗ هو درجة راحت. افتح الحل النموذجي تحت كل سؤال وقارن سطر بسطر، وبعدين أعد نفس الجزء في <a href="#practice-exam">سؤال امتحان عشوائي</a>.',
      min: 'دقيقة', mockTitle: 'امتحان تجريبي',
      hint: 'تلميح', hintNext: 'الخطوة الجاية:', hintAllPass: 'كل شي صح. اضغط "صحّح جوابي".', hintLine: 'السطر الجاي من الحل النموذجي', addLine: 'أضف هالسطر للكود حقي',
      lineAdded: 'انضاف للكود حقك مكان المؤشر. اضغط Run أو صحّح جوابي عشان تشوف النتيجة.', hintNoMore: 'الكود حقك فيه كل أسطر الحل النموذجي. اضغط "صحّح جوابي" عشان تشوف وش باقي غلط.', hintsUsed: n => `التلميحات المستخدمة: ${n}`,
      mcqHint: 'تلميح: شيل جواب غلط', ptPlay: 'ساحة الكود', playLead: 'مكان حر تكتب فيه HTML و CSS و JavaScript حقك وتشغّله. ينحفظ تلقائي في هالـ browser.', playClear: 'امسح الكل',
      hideMenu: 'خبّي القائمة', showMenu: 'اعرض القائمة', menu: 'القائمة', hideShort: 'خبّي', resizeMenu: 'اسحب عشان تغيّر عرض القائمة (دبل كلك يرجعها للأصل)', fullTip: 'شاشة كاملة: المحرر والنتيجة ياخذون الشاشة كلها (Esc للخروج)', exitFull: 'اطلع من الشاشة الكاملة (Esc)', layoutTip: 'غيّر الترتيب: الكود جنب النتيجة، أو الكود فوق والنتيجة تحت'
    }
  };
  const MOD_AR = {
    html: { title: 'أساسيات الـ HTML', blurb: 'هيكل الصفحة، والـ head، والنصوص، والروابط، والصور، والقوائم، والـ semantic elements.' },
    forms: { title: 'الجداول والـ forms', blurb: 'الـ thead والـ tbody، والـ rowspan والـ colspan، والـ inputs والـ attributes حقها، والأزرار.' },
    css: { title: 'الـ CSS selectors والـ styling', blurb: 'الـ selectors، والـ combinators، والـ specificity، والـ box model، والوحدات، والألوان.' },
    layout: { title: 'الـ CSS layout', blurb: 'الـ display، والـ positioning، والـ Flexbox، والـ media queries.' },
    js: { title: 'أساسيات الـ JavaScript', blurb: 'الـ variables، والـ types، والشروط، والـ loops، والـ functions، والـ objects، والـ arrays.' },
    dom: { title: 'الـ DOM', blurb: 'تختار العناصر، وتقراها وتغيّرها، وتنشئ عناصر جديدة مثل صفوف الجدول.' },
    events: { title: 'الـ Events', blurb: 'الـ addEventListener، والـ event object، والـ forms، والـ preventDefault، والـ bubbling، والـ delegation.' }
  };
  const STEPS_AR = ['Big Picture · الصورة الكبيرة', 'Simple Explanation · شرح مبسّط', 'Deeper Understanding · فهم أعمق', 'Important Points · نقاط مهمة', 'Exam Focus · تركيز الامتحان', 'Common Mistakes · أغلاط شائعة', 'Mini Summary · ملخص سريع', 'Active Recall · استرجاع نشط'];

  const t = (k, ...a) => { const v = (S[lang] && S[lang][k] !== undefined) ? S[lang][k] : S.en[k]; return typeof v === 'function' ? v(...a) : v; };
  const isAr = () => lang === 'ar';
  const setLang = l => { lang = l; U.store.set('lang', l); apply(); };
  function apply() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
  apply();

  const modTitle = m => isAr() && MOD_AR[m.id] ? MOD_AR[m.id].title : m.title;
  const modBlurb = m => isAr() && MOD_AR[m.id] ? MOD_AR[m.id].blurb : m.blurb;
  const stepName = i => isAr() ? STEPS_AR[i] : STEP_NAMES[i];

  /* Localised lesson: Arabic fields where they exist, English otherwise. */
  function lesson(L) {
    const A = isAr() && typeof LESSONS_AR !== 'undefined' ? LESSONS_AR[L.id] : null;
    if (!A) return L;
    const out = Object.assign({}, L);
    if (A.title) out.title = A.title;
    ['big', 'simple', 'points', 'exam', 'summary'].forEach(k => { if (A[k]) out[k] = A[k]; });
    if (A.deeper && A.deeper.length === L.deeper.length) {
      out.deeper = L.deeper.map((d, i) => {
        const x = A.deeper[i];
        if (x === null || x === undefined) return d;
        if (typeof d === 'string' && typeof x === 'string') return x;
        if (d.try && x && x.task) return { try: Object.assign({}, d.try, { task: x.task }) };
        return d;
      });
    }
    if (A.mistakes) out.mistakes = L.mistakes.map((m, i) => A.mistakes[i] ? Object.assign({}, m, { why: A.mistakes[i] }) : m);
    if (A.recall) out.recall = L.recall.map((r, i) => { const x = A.recall[i]; return x ? Object.assign({}, r, { q: x.q || r.q, o: x.o || r.o, why: x.why || r.why }) : r; });
    if (A.challenge && L.challenge) out.challenge = Object.assign({}, L.challenge, { task: A.challenge });
    out.ar = null; /* the Arabic note box is not needed when everything is Arabic */
    return out;
  }
  function question(q, i) {
    const A = isAr() && typeof QUESTIONS_AR !== 'undefined' ? QUESTIONS_AR[i] : null;
    if (!A) return q;
    return Object.assign({}, q, { q: A.q || q.q, o: A.o || q.o, why: A.why || q.why });
  }
  return { t, isAr, setLang, lang: () => lang, modTitle, modBlurb, stepName, lesson, question };
})();

const GUIDE_AR = `<h1>شلون تستخدم هالموقع</h1>
<p class="muted">مسوّى لأي طالب في ITCS333. محتوى الميد هو <strong>HTML + CSS + JS (till events)</strong>: يعني الفصول 3 و 4 و 5 و 7 و 8، والفصل 9 لين الـ events.</p>
<ol class="guide-steps">
  <li><h3>امشِ على الدروس بالترتيب</h3><p>كل درس فيه 8 خطوات: Big Picture، و Simple Explanation، و Deeper Understanding (مع editor حي)، و Important Points، و Exam Focus، و Common Mistakes، و Mini Summary، و Active Recall. لا تتخطى الـ editor: غيّر الكود واضغط Run.</p></li>
  <li><h3>خلّص كل تحدي كود</h3><p>آخر خطوة في كل درس فيها تحدي، والموقع يصححه سطر بسطر. إذا علقت، اكتب اللي تقدر عليه واضغط "صحّح جوابي"، واقرأ أي سطور ما نجحت قبل ما تفتح الحل النموذجي.</p></li>
  <li><h3>ركّز على نقاط ضعفك</h3><p>استخدم صفحة التدريب: quizzes سريعة حسب الموضوع (فعّل "بس اللي غلطت فيها" عشان تعيد أغلاطك)، وألغاز الـ specificity اللي على نمط امتحان 2024-25.</p></li>
  <li><h3>حل الامتحان التجريبي على ورقة أول</h3><p>الامتحان الحقيقي بخط اليد. اكتب جوابك على ورقة والمؤقت شغّال، وبعدين اكتبه في الامتحان التجريبي وسلّمه. التصحيح على نمط ورقة 2025-26: تقريبًا درجة لكل سطر.</p></li>
  <li><h3>راجع وأعد</h3><p>قارن كل ✗ مع الحل النموذجي، وبعدين أعد نفس الجزء في "سؤال امتحان عشوائي". كل امتحان تجريبي بسيناريو جديد (درجات، سلة مشتريات، مكتبة…)، فأنت تتدرب على النمط مو على الـ ids.</p></li>
</ol>
<h2 style="margin-top:30px">معلومات مفيدة</h2>
<ul>
  <li>تقدمك ينحفظ في هالـ browser بس. لو فتحت من جهاز ثاني، أو فتحه زميلك، يبدأ من الصفر.</li>
  <li>اضغط <kbd>Ctrl</kbd> + <kbd>Enter</kbd> داخل الـ editor عشان تشغّل الكود، و <kbd>Tab</kbd> يسوي مسافة (indent).</li>
  <li>زر English / عربي فوق يغيّر اللغة. في الوضع العربي، المصطلحات التقنية وأسئلة الامتحان تبقى بالإنجليزي، مثل الامتحان الحقيقي.</li>
  <li>المصدر: كتاب Connolly &amp; Hoar، <em>Fundamentals of Web Development</em> الطبعة الثالثة، وامتحانات ITCS333 السابقة.</li>
</ul>`;

/* Lessons, part 2: Layout (Ch7), JavaScript (Ch8), DOM & Events (Ch9, up to events). */

/* =========================== MODULE 4: LAYOUT =========================== */
LESSONS.push({
  id: 'display-position', module: 'layout', title: 'Normal flow, display & positioning',
  big: `Before Flexbox, you need to know how the browser places boxes on its own (normal flow) and how to move them out of it. This explains why a [[<div>]] takes a whole line and a [[<span>]] does not, and how badges and sticky headers are made.`,
  simple: `**Normal flow**: block elements (div, p, h1, section, form, table…) start on a new line and take the full width. Inline elements (span, a, strong, img, input…) sit in the line of text and are only as wide as their content.

You can change this with [[display]]: [[block]], [[inline]], [[inline-block]] (inline, but accepts width and height), [[none]] (hidden, takes no space), [[flex]], [[grid]].

[[position]] moves boxes:
- [[static]] (default): normal flow.
- [[relative]]: moved from its normal spot with top/left; the original space stays.
- [[absolute]]: removed from the flow, placed relative to the **nearest positioned ancestor** (one that is not static).
- [[fixed]]: placed relative to the browser window; stays when you scroll.
- [[sticky]]: normal until you scroll to it, then it sticks.`,
  ar: `<strong>بالعربي:</strong> block ياخذ السطر كامل، و inline يجلس داخل السطر. و absolute يتحرك على حسب أقرب أب عنده position غير static، فعادةً نحط للأب position: relative. و display: none يخفي العنصر ويشيل مكانه بعد.`,
  deeper: [
    { try: { task: 'Change [[.badge]] from absolute to relative, then remove [[position: relative]] from [[.card]]. Where does the badge go each time?', html: `<div class="card">
  Product card
  <span class="badge">NEW</span>
</div>
<p>Text after the card. <span>I am inline</span> and so is <a href="#">this link</a>.</p>`, css: `.card {
  position: relative;
  width: 220px; height: 90px;
  border: 2px solid #2346d8; padding: 10px;
}
.badge {
  position: absolute;
  top: 8px; right: 8px;
  background: crimson; color: white; padding: 2px 6px;
}` } },
    `**Floats** ([[float: left]]) were the old way to put boxes side by side and to wrap text around images. Today Flexbox and Grid do layout; floats are still used for wrapping text around an image.

[[visibility: hidden]] hides an element but **keeps** its space; [[display: none]] removes it completely.`
  ],
  points: [
    'Block: new line, full width. Inline: in the text line, content width.',
    'inline-block: inline but accepts width/height.',
    'display: none removes the element; visibility: hidden keeps its space.',
    'absolute → relative to the nearest positioned ancestor.',
    'fixed → relative to the viewport; sticky → sticks while scrolling.',
    'Use position: relative on the parent to anchor an absolute child.'
  ],
  exam: [
    'MCQ style: "position: absolute is placed relative to…" → the nearest positioned ancestor.',
    '2022-23 midterm: "Box B should be turned off in the mobile view" → [[display: none]] inside a media query.'
  ],
  mistakes: [
    { lang: 'css', wrong: `span { width: 200px; }  /* nothing happens */`, right: `span { display: inline-block; width: 200px; }`, why: 'Inline elements ignore width and height.' },
    { lang: 'css', wrong: `.badge { position: absolute; top: 0; }
/* parent has no position */`, right: `.card { position: relative; }
.badge { position: absolute; top: 0; }`, why: 'Without a positioned parent, the badge is placed relative to the page.' }
  ],
  summary: [
    'Block vs inline is the default flow.',
    'display changes the box type; none hides it completely.',
    'relative = nudge, absolute = place inside a positioned parent, fixed = stick to the window.'
  ],
  recall: [
    { q: 'Which element is block by default?', o: ['[[<span>]]', '[[<a>]]', '[[<div>]]', '[[<strong>]]'], a: 2, why: 'div starts a new line and takes the full width.' },
    { q: 'An absolute element is positioned relative to…', o: ['Its previous sibling', 'The nearest ancestor that is not static', 'Always the body', 'Its first child'], a: 1, why: 'The nearest positioned ancestor (relative, absolute, fixed or sticky).' },
    { q: 'Which hides an element AND removes its space?', o: ['[[visibility: hidden]]', '[[opacity: 0]]', '[[display: none]]', '[[position: static]]'], a: 2, why: 'display: none takes it out of the layout.' }
  ],
  challenge: {
    task: `Place the [[.badge]] in the **top-right corner** of [[.card]] (top 0, right 0) using positioning, and hide [[.old]] completely (no space left).`,
    tabs: ['css', 'html'],
    starter: { html: `<div class="card">Card<span class="badge">NEW</span></div>
<p class="old">Old text</p>
<p id="after">After</p>`, css: `.card { width: 200px; height: 80px; border: 1px solid; }
.badge { background: crimson; color: white; }
` },
    checks: [
      { d: '.card is positioned (relative)', t: (d, w) => w.getComputedStyle(d.querySelector('.card')).position !== 'static' },
      { d: '.badge is absolute', t: (d, w) => w.getComputedStyle(d.querySelector('.badge')).position === 'absolute' },
      { d: '.badge sits in the top-right corner of the card', t: (d) => { const c = d.querySelector('.card').getBoundingClientRect(), b = d.querySelector('.badge').getBoundingClientRect(); return Math.abs(c.right - 1 - b.right) <= 2 && Math.abs(c.top + 1 - b.top) <= 2; } },
      { d: '.old is display: none', t: (d, w) => w.getComputedStyle(d.querySelector('.old')).display === 'none' }
    ],
    solution: { css: `.card { width: 200px; height: 80px; border: 1px solid; position: relative; }
.badge { background: crimson; color: white; position: absolute; top: 0; right: 0; }
.old { display: none; }` }
  }
});

LESSONS.push({
  id: 'flexbox', module: 'layout', title: 'Flexbox',
  big: `Flexbox is the modern way to put boxes in a row or a column, space them out and centre them. It is one-dimensional: it lays items along **one** line (a row or a column). The 2022-23 midterm gave 12 marks for a Flexbox layout.`,
  simple: `Put [[display: flex]] on the **parent** (the container). Its direct children become **flex items** and line up.

Two axes:
- **Main axis**: the direction of [[flex-direction]] ([[row]] = left→right, default; [[column]] = top→bottom).
- **Cross axis**: the other direction.

Container properties:
- [[justify-content]] → along the **main** axis: flex-start, center, flex-end, space-between, space-around, space-evenly.
- [[align-items]] → along the **cross** axis: stretch (default), center, flex-start, flex-end.
- [[flex-wrap: wrap]] lets items go to a new line; [[gap]] adds space between items.

Item properties: [[flex: 1]] (grow to share space), [[order]], [[align-self]].`,
  ar: `<strong>بالعربي:</strong> display: flex نحطها على الأب مو على العيال. justify-content يشتغل على المحور الرئيسي (لو row يعني أفقي)، و align-items على المحور الثاني. ولو غيرت flex-direction لـ column، يتبادلون الأدوار.`,
  deeper: [
    { try: { task: 'Try justify-content: center / space-between / space-around. Then set flex-direction: column on [[.right]] and centre M and N both ways.', html: `<div class="container">
  <div class="box">A</div>
  <div class="box b">B</div>
  <div class="box right">
    <div class="mini">M</div>
    <div class="mini">N</div>
  </div>
</div>`, css: `.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 180px;
  background: #eef1f7;
}
.box { width: 25%; height: 120px; background: #9fb2f5; }
.right { display: flex; }
.mini { background: blue; color: white; width: 50%; margin: 5px 0; }` } },
    `**Centring something both ways** is the classic Flexbox trick:`,
    { code: `.parent {
  display: flex;
  justify-content: center;  /* main axis */
  align-items: center;      /* cross axis */
}`, lang: 'css' },
    `**Grid** (also in Ch7) is two-dimensional: rows **and** columns, e.g. [[display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;]]. Use Flexbox for a line of items, Grid for a full page layout.`
  ],
  points: [
    'display: flex goes on the container.',
    'Only direct children become flex items.',
    'justify-content = main axis, align-items = cross axis.',
    'flex-direction: column swaps the axes.',
    'gap = space between items; flex-wrap: wrap allows new lines.',
    'flex: 1 makes items share the free space.'
  ],
  exam: [
    '2022-23 midterm Q4 (12 marks): container [[display: flex]] (1), boxes A B C in one row with spacing (2.5), M and N in a column centred both ways (2.5), M and N with blue background, 5px top/bottom margin and 50% width (2.5).',
    'Short answer: "Explain the Flexbox model and what you can do with it" → a one-dimensional layout model for distributing space and aligning items in a row or column.'
  ],
  mistakes: [
    { lang: 'css', wrong: `.item { display: flex; justify-content: center; }`, right: `.container { display: flex; justify-content: center; }`, why: 'Flex properties for layout go on the parent.' },
    { lang: 'css', wrong: `/* column direction, wants horizontal centring */
flex-direction: column; justify-content: center;`, right: `flex-direction: column; align-items: center;`, why: 'In a column the main axis is vertical, so horizontal is the cross axis (align-items).' }
  ],
  summary: [
    'Parent: display flex + direction + justify-content + align-items.',
    'Main axis follows flex-direction; the cross axis is the other one.',
    'Centre: justify-content: center + align-items: center.'
  ],
  recall: [
    { q: 'In a [[flex-direction: row]] container, which property centres items horizontally?', o: ['align-items', 'justify-content', 'text-align', 'align-content'], a: 1, why: 'Row → main axis is horizontal → justify-content.' },
    { q: 'Where do you write [[display: flex]]?', o: ['On each item', 'On the parent container', 'On the body only', 'On the first child'], a: 1, why: 'The container becomes a flex container; its children become items.' },
    { q: 'Which value puts the first and last item at the edges with equal space between the rest?', o: ['center', 'space-around', 'space-between', 'flex-end'], a: 2, why: 'space-between pushes items to both ends.' }
  ],
  challenge: {
    task: `In [[.container]]: put A, B, C **in one row**, with **space-between**, and centre them **vertically**. Then make [[.right]] a flex **column** and centre M and N **both horizontally and vertically**.`,
    tabs: ['css', 'html'],
    starter: { html: `<div class="container">
  <div class="box" id="A">A</div>
  <div class="box" id="B">B</div>
  <div class="box right" id="C">
    <div class="mini" id="M">M</div>
    <div class="mini" id="N">N</div>
  </div>
</div>`, css: `.container { height: 200px; background: #eef1f7; }
.box { width: 25%; height: 140px; background: #9fb2f5; }
.mini { background: blue; color: white; width: 50%; }
` },
    checks: [
      { d: '.container is display: flex (row)', t: (d, w) => { const s = w.getComputedStyle(d.querySelector('.container')); return s.display === 'flex' && s.flexDirection === 'row'; } },
      { d: 'space-between on the container', t: (d, w) => w.getComputedStyle(d.querySelector('.container')).justifyContent === 'space-between' },
      { d: 'A, B, C centred vertically', t: (d, w) => w.getComputedStyle(d.querySelector('.container')).alignItems === 'center' },
      { d: '.right is a flex column', t: (d, w) => { const s = w.getComputedStyle(d.getElementById('C')); return s.display === 'flex' && s.flexDirection === 'column'; } },
      { d: 'M and N centred both ways inside .right', t: (d, w) => { const s = w.getComputedStyle(d.getElementById('C')); return s.justifyContent === 'center' && s.alignItems === 'center'; } }
    ],
    solution: { css: `.container {
  height: 200px; background: #eef1f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box { width: 25%; height: 140px; background: #9fb2f5; }
.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mini { background: blue; color: white; width: 50%; }` }
  }
});

LESSONS.push({
  id: 'responsive', module: 'layout', title: 'Responsive design & media queries',
  big: `People open your page on phones, tablets and wide screens. Responsive design means one page that adapts. Two tools do most of the work: the **viewport meta tag** (lesson 1) and **media queries**.`,
  simple: `A media query is an "if" for CSS: [[@media (max-width: 600px) { … }]] means "apply these rules only when the screen is 600px wide or less".

- [[max-width]] → small screens (mobile-last style: write desktop first, then fix for small).
- [[min-width]] → large screens (mobile-first: write mobile first, then add for big).

Inside the media query you write normal rules. Because they come **later** in the file and match, they override the earlier ones.`,
  ar: `<strong>بالعربي:</strong> الـ media query مثل if للـ CSS. max-width: 600px يعني "إذا الشاشة 600 أو أصغر". وداخلها تكتب قواعد عادية، وتغلب القواعد اللي قبلها لأنها مكتوبة بعدها.`,
  deeper: [
    { try: { task: 'Make the preview narrow by shrinking the browser window (or set the query to max-width: 2000px to test). On small screens: hide box B, make A and C 45% wide with 15px rounded corners.', html: `<div class="container">
  <div class="box" id="A">A</div>
  <div class="box" id="B">B</div>
  <div class="box" id="C">C</div>
</div>`, css: `.container { display: flex; justify-content: space-around; }
.box { width: 25%; height: 100px; background: #9fb2f5; }

@media (max-width: 600px) {
  #B { display: none; }
  #A, #C { width: 45%; border-radius: 15px; }
}` } },
    `**Pseudo-class hint from the exam.** The 2022-23 question said "Box B should be turned off (hint: use CSS pseudo class)". With boxes as children of one container, B is the second child: [[.box:nth-child(2) { display: none; }]].`
  ],
  points: [
    '[[@media (max-width: 600px) { … }]] = only on screens ≤ 600px.',
    'min-width for mobile-first, max-width for desktop-first.',
    'Rules inside win because they come later.',
    'Always include the viewport meta tag, or phones zoom out.',
    'Use %, rem and Flexbox so sizes adapt.'
  ],
  exam: [
    '2022-23 Q4 [5]: mobile view → box B hidden with a pseudo-class, boxes A and C 45% wide each with 15px rounded corners (border-radius).'
  ],
  mistakes: [
    { lang: 'css', wrong: `@media max-width: 600px { … }`, right: `@media (max-width: 600px) { … }`, why: 'The condition needs parentheses.' },
    { lang: 'css', wrong: `@media (max-width: 600px) { #B { display: none; } }
#B { display: block; }`, right: `#B { display: block; }
@media (max-width: 600px) { #B { display: none; } }`, why: 'Put media queries after the normal rules, or the normal rule wins on the tie.' }
  ],
  summary: [
    'Viewport meta + media queries = responsive.',
    '@media (max-width: …) for small screens.',
    'Write media queries at the end of the file.'
  ],
  recall: [
    { q: 'Which applies rules only to screens 768px wide or less?', o: ['[[@media (min-width: 768px)]]', '[[@media (max-width: 768px)]]', '[[@screen 768px]]', '[[@media width < 768]]'], a: 1, why: 'max-width = up to that width.' },
    { q: 'Which selects the second .box child of its parent?', o: ['[[.box:second]]', '[[.box:nth-child(2)]]', '[[.box + 2]]', '[[.box[2]]]'], a: 1, why: ':nth-child(2) is a pseudo-class.' }
  ],
  challenge: {
    task: `Add a media query for screens **up to 2000px** (so it is active in this preview): inside it, hide the **second** box using [[:nth-child(2)]], and give the other boxes **45%** width and **15px** border-radius.`,
    tabs: ['css', 'html'],
    starter: { html: `<div class="container">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
</div>`, css: `.container { display: flex; justify-content: space-around; }
.box { width: 25%; height: 100px; background: #9fb2f5; }
` },
    checks: [
      { d: 'Uses @media (max-width: 2000px)', t: (d, w, s) => /@media\s*\(\s*max-width\s*:\s*2000px\s*\)/.test(s.css) },
      { d: 'Uses :nth-child(2)', t: (d, w, s) => /:nth-child\(\s*2\s*\)/.test(s.css) },
      { d: 'Second box is hidden', t: (d, w) => w.getComputedStyle(d.querySelectorAll('.box')[1]).display === 'none' },
      { d: 'Boxes A and C are 45% wide', t: (d, w) => { const c = d.querySelector('.container').clientWidth, a = d.querySelectorAll('.box')[0].getBoundingClientRect().width; return Math.abs(a - c * 0.45) < 3; } },
      { d: 'Boxes A and C have 15px rounded corners', t: (d, w) => w.getComputedStyle(d.querySelectorAll('.box')[2]).borderTopLeftRadius === '15px' }
    ],
    solution: { css: `.container { display: flex; justify-content: space-around; }
.box { width: 25%; height: 100px; background: #9fb2f5; }

@media (max-width: 2000px) {
  .box:nth-child(2) { display: none; }
  .box { width: 45%; border-radius: 15px; }
}` }
  }
});

/* =========================== MODULE 5: JS FUNDAMENTALS =========================== */
LESSONS.push({
  id: 'js-basics', module: 'js', title: 'Variables, types & operators',
  big: `HTML is the structure, CSS the look, JavaScript the **behaviour**. JS runs in the browser and can read and change the page. First you need the language itself: storing values, the types of values, and comparing them.`,
  simple: `**Variables** store values:
- [[const]] → cannot be reassigned. Use it by default.
- [[let]] → can change later (counters, sums).
- [[var]] → the old way; avoid it (function-scoped, confusing).

**Types**: number ([[85]], [[3.5]]), string ([["hello"]]), boolean ([[true]]/[[false]]), [[null]], [[undefined]], objects and arrays.

**Important trap**: values from inputs and from [[textContent]] are always **strings**. [["85" + 5]] gives [["855"]]! Convert first: [[Number("85")]] → 85.

**Comparing**: [[==]] converts types before comparing ([["5" == 5]] is true). [[===]] also checks the type ([["5" === 5]] is false). Prefer [[===]].`,
  ar: `<strong>بالعربي:</strong> كل شي تاخذه من input أو من textContent يجيك string. فلو جمعته على طول بيلزقه بدل ما يجمعه. لازم Number() أول. وهذي بالضبط كانت في امتحان 2025-26: Number(gradeCell.textContent).`,
  deeper: [
    { try: { mode: 'js', task: 'Run it and read the console. Then fix [[total]] so it prints 90, not 855.', js: `const name = "Nezar";
let grade = "85";          // a string, like input.value
console.log(typeof grade); // "string"

let total = grade + 5;
console.log("total =", total);

console.log("5" == 5);   // true  (converts)
console.log("5" === 5);  // false (different types)

// Template literal: backticks and \${ }
console.log(\`Hello \${name}, your grade is \${grade}\`);` } },
    `**Operators**: [[+ - * / %]] (% = remainder), [[++]] adds 1 ([[count++]]), [[+=]] adds to a variable ([[sum += grade]]). Logical: [[&&]] and, [[||]] or, [[!]] not.

**Template literals** use backticks and [[\${ }]] to put values inside a string. The exam's model answer used one: [[\`Average Grade: \${average}\`]].`
  ],
  points: [
    'const by default, let when the value changes, avoid var.',
    'Input values and textContent are strings → Number() before maths.',
    '=== compares value AND type; prefer it over ==.',
    '[[sum += x]] and [[count++]] are the exam patterns.',
    'Template literal: [[\`Text \${value}\`]] with backticks.'
  ],
  exam: [
    '2025-26 Q2.B: [[let sum = 0; let count = 0;]] (1 mark each), [[const grade = Number(gradeCell.textContent);]] (1), [[sum += grade;]] (1), [[count++;]] (1).',
    'Final output line: [[message = \`Average Grade: \${average}\`]].'
  ],
  mistakes: [
    { lang: 'js', wrong: `const sum = 0;
sum += grade;   // TypeError`, right: `let sum = 0;
sum += grade;`, why: 'const cannot be reassigned. Use let for values that change.' },
    { lang: 'js', wrong: `sum += cell.textContent;   // "080" + "90"…`, right: `sum += Number(cell.textContent);`, why: 'textContent is a string, so + joins text.' },
    { lang: 'js', wrong: `console.log('Average: \${avg}');`, right: `console.log(\`Average: \${avg}\`);`, why: 'Only backticks turn ${ } into a value.' }
  ],
  summary: [
    'let/const store values; const cannot be reassigned.',
    'Strings from the page need Number() before maths.',
    'Use === and template literals.'
  ],
  recall: [
    { q: 'What does [["7" + 3]] give?', o: ['10', '"73"', 'NaN', 'Error'], a: 1, why: 'A string plus anything joins as text.' },
    { q: 'What does [["7" === 7]] give?', o: ['true', 'false', 'undefined', 'Error'], a: 1, why: '=== checks the type too: string vs number.' },
    { q: 'Which keyword is right for a sum that grows in a loop?', o: ['const', 'let', 'static', 'final'], a: 1, why: 'The value changes, so let.' }
  ],
  challenge: {
    task: `In the JS tab:
1. Create [[gradeText]] with the string **"88"** (like a value read from an input)
2. Create [[bonus]] with the number **2**
3. Create [[total]] = the **numeric** sum (90)
4. Create [[message]] with a template literal: **Total: 90**
5. [[console.log(message)]]`,
    mode: 'js', tabs: ['js'],
    starter: { js: `` },
    checks: [
      { d: 'gradeText is the string "88"', t: (d, w) => w.__exp && w.__exp.gradeText === '88' },
      { d: 'bonus is the number 2', t: (d, w) => w.__exp && w.__exp.bonus === 2 },
      { d: 'total is the number 90', t: (d, w) => w.__exp && w.__exp.total === 90 },
      { d: 'message is "Total: 90" made with a template literal', t: (d, w, s) => w.__exp && w.__exp.message === 'Total: 90' && /`[^`]*\$\{/.test(s.js) },
      { d: 'message is logged', t: (d, w, s) => /console\.log\(\s*message\s*\)/.test(s.js) }
    ],
    exports: ['gradeText', 'bonus', 'total', 'message'],
    solution: { js: `const gradeText = "88";
const bonus = 2;
const total = Number(gradeText) + bonus;
const message = \`Total: \${total}\`;
console.log(message);` }
  }
});

LESSONS.push({
  id: 'js-control', module: 'js', title: 'Conditions, loops & functions',
  big: `Programs make decisions (if), repeat work (loops) and package steps into reusable pieces (functions). In the exam, both JavaScript questions start with "Write a function named …", and the second one loops over table rows.`,
  simple: `**if / else** runs code only when a condition is true.

**Loops** repeat:
- [[for (let i = 0; i < 5; i++) { … }]] → counts.
- [[for (const item of list) { … }]] → each item of an array or NodeList.
- [[list.forEach(item => { … })]] → same idea with a function.

**Functions** are named blocks of code. They take **parameters** and can [[return]] a value.
- Declaration: [[function add(a, b) { return a + b; }]]
- Arrow function: [[const add = (a, b) => a + b;]]
- Anonymous function (no name), often passed to another function: [[function () { … }]]`,
  ar: `<strong>بالعربي:</strong> الـ function لازم ترجّع النتيجة بـ return إذا السؤال قال "return". في امتحان 2025-26، سطر return newRow كان عليه درجة، و return { sum: sum, count: count } بعد. والـ arrow function نفس الـ function بس مختصرة.`,
  deeper: [
    { try: { mode: 'js', task: 'Run it. Then add an [[else if]] for grades ≥ 80 that returns "B", and test more grades.', js: `function letter(grade) {
  if (grade >= 90) {
    return "A";
  } else {
    return "Other";
  }
}

const grades = [95, 82, 67];

for (let i = 0; i < grades.length; i++) {
  console.log(grades[i], letter(grades[i]));
}

// the same loop with forEach and an arrow function
grades.forEach(g => console.log("forEach:", g));` } },
    `**Returning several values**: return an object. The 2025-26 exam's [[calculateSumAndCount()]] ended with [[return { sum: sum, count: count };]] and the caller used [[stats.sum]] and [[stats.count]].`,
    { code: `function calculateSumAndCount() {
  let sum = 0;
  let count = 0;
  [80, 90, 100].forEach(g => {
    sum += g;
    count++;
  });
  return { sum: sum, count: count };
}

const stats = calculateSumAndCount();
const average = stats.sum / stats.count;   // 90`, lang: 'js' }
  ],
  points: [
    'if / else if / else for decisions.',
    'for (let i…) counts; for…of and forEach go over each item.',
    'A function without return gives undefined.',
    'Arrow: [[(a, b) => a + b]]; one parameter: [[x => x * 2]].',
    'Return an object to give back several values.'
  ],
  exam: [
    '2025-26 Q2.A: [[function createGradeRow() { … return newRow; }]] (the function line and the return line are 1 mark each).',
    '2025-26 Q2.B: [[gradeRows.forEach(row => { … })]] (1 mark), [[return { sum: sum, count: count };]] (1 mark).'
  ],
  mistakes: [
    { lang: 'js', wrong: `function getTotal() {
  let total = 5 + 5;
}
const t = getTotal();   // undefined`, right: `function getTotal() {
  let total = 5 + 5;
  return total;
}`, why: 'Without return, the value stays inside the function.' },
    { lang: 'js', wrong: `for (let i = 0; i <= list.length; i++)`, right: `for (let i = 0; i < list.length; i++)`, why: 'Indexes go from 0 to length − 1.' }
  ],
  summary: [
    'if for decisions, for/forEach for repetition.',
    'Functions take parameters and return a value.',
    'Return an object to give back sum and count together.'
  ],
  recall: [
    { q: 'What does a function return if it has no return statement?', o: ['0', 'null', 'undefined', 'An error'], a: 2, why: 'Functions without return give undefined.' },
    { q: 'Which is a correct arrow function that doubles x?', o: ['[[x -> x * 2]]', '[[(x) => x * 2]]', '[[function => x * 2]]', '[[x => { x * 2 }]]'], a: 1, why: 'The last option has braces but no return, so it gives undefined.' },
    { q: 'A function returns [[{ sum: 270, count: 3 }]] into [[stats]]. How do you get 90?', o: ['[[stats[0] / stats[1]]]', '[[stats.sum / stats.count]]', '[[sum / count]]', '[[stats / 3]]'], a: 1, why: 'Use the object properties.' }
  ],
  challenge: {
    task: `Write a function [[calculateSumAndCount(grades)]] that loops over the array [[grades]] and **returns** an object [[{ sum, count }]]. Then write [[average(grades)]] that uses it and returns sum / count.`,
    mode: 'js', tabs: ['js'],
    starter: { js: `function calculateSumAndCount(grades) {

}

function average(grades) {

}

console.log(average([80, 90, 100]));` },
    exports: ['calculateSumAndCount', 'average'],
    checks: [
      { d: 'calculateSumAndCount is a function', t: (d, w) => w.__exp && typeof w.__exp.calculateSumAndCount === 'function' },
      { d: 'It returns { sum: 270, count: 3 } for [80, 90, 100]', t: (d, w) => { const r = w.__exp.calculateSumAndCount([80, 90, 100]); return r && r.sum === 270 && r.count === 3; } },
      { d: 'It works for an empty array (sum 0, count 0)', t: (d, w) => { const r = w.__exp.calculateSumAndCount([]); return r && r.sum === 0 && r.count === 0; } },
      { d: 'average([80, 90, 100]) returns 90', t: (d, w) => w.__exp.average([80, 90, 100]) === 90 },
      { d: 'average uses calculateSumAndCount', t: (d, w, s) => (s.js.match(/calculateSumAndCount\s*\(/g) || []).length >= 2 }
    ],
    solution: { js: `function calculateSumAndCount(grades) {
  let sum = 0;
  let count = 0;
  grades.forEach(g => {
    sum += g;
    count++;
  });
  return { sum: sum, count: count };
}

function average(grades) {
  const stats = calculateSumAndCount(grades);
  return stats.sum / stats.count;
}

console.log(average([80, 90, 100]));` }
  }
});

LESSONS.push({
  id: 'js-objects', module: 'js', title: 'Objects & arrays',
  big: `Real data comes in groups: a student has an id and a grade; a class has many students. **Objects** group named values, **arrays** hold ordered lists. The DOM itself is made of objects, so this lesson is the bridge to the next module.`,
  simple: `**Array**: an ordered list, index starts at 0.
[[const grades = [80, 90, 100];]] → [[grades[0]]] is 80, [[grades.length]] is 3, [[grades.push(70)]] adds at the end.

**Object**: named properties.
[[const student = { id: "S1", grade: 85 };]] → [[student.id]] or [[student["id"]]], [[student.grade = 90]] changes it.

**Array of objects** is the usual way to store table data:
[[const list = [{ id: "S1", grade: 80 }, { id: "S2", grade: 90 }];]]`,
  ar: `<strong>بالعربي:</strong> الـ array يبدأ من صفر. والـ object فيه key و value، وتوصل للقيمة بالنقطة: student.grade. وكل عنصر في الصفحة (DOM) هو object، عشان كذا نكتب row.children و cell.textContent.`,
  deeper: [
    { try: { mode: 'js', task: 'Add a third student, then print the average using a loop over the array of objects.', js: `const students = [
  { id: "S1", grade: 80 },
  { id: "S2", grade: 95 }
];

console.log(students.length);      // 2
console.log(students[1].id);       // "S2"

students.push({ id: "S3", grade: 70 });

for (const s of students) {
  console.log(\`\${s.id}: \${s.grade}\`);
}` } },
    `Objects can hold functions too (methods): [[const calc = { add(a, b) { return a + b; } };]] → [[calc.add(2, 3)]]. That is exactly what [[document.getElementById(...)]] is: the method getElementById of the object document.`
  ],
  points: [
    'Array index starts at 0; last index = length − 1.',
    'push adds to the end; length is the count.',
    'Object properties: obj.key or obj["key"].',
    'Array of objects = rows of data.',
    'DOM elements are objects with properties (textContent, value, children…).'
  ],
  exam: [
    'Q2.B: [[row.children[1]]] is array-style indexing on an element\'s children (the 2nd cell).',
    'Q2.B returns an object and reads [[stats.sum]] and [[stats.count]].'
  ],
  mistakes: [
    { lang: 'js', wrong: `const cell = row.children[2];   // 2nd cell?`, right: `const cell = row.children[1];   // 2nd cell`, why: 'Indexes start at 0.' },
    { lang: 'js', wrong: `const s = { id = "S1", grade = 85 };`, right: `const s = { id: "S1", grade: 85 };`, why: 'Object properties use a colon.' }
  ],
  summary: [
    'Arrays: ordered, index from 0, length, push.',
    'Objects: named properties with dot notation.',
    'Elements on the page are objects too.'
  ],
  recall: [
    { q: 'For [[const a = [5, 10, 15];]] what is [[a[a.length - 1]]]?', o: ['5', '10', '15', 'undefined'], a: 2, why: 'length − 1 is the last index.' },
    { q: 'How do you read the grade of [[const s = { id: "S1", grade: 85 }]]?', o: ['[[s->grade]]', '[[s.grade]]', '[[s(grade)]]', '[[s[grade]]] without quotes'], a: 1, why: 'Dot notation (or s["grade"]).' }
  ],
  challenge: {
    task: `Create an array [[students]] with three objects [[{ id, grade }]]: S1 = 70, S2 = 85, S3 = 100. Then create [[best]] = the **id** of the student with the highest grade, using a loop (do not hard-code "S3").`,
    mode: 'js', tabs: ['js'],
    starter: { js: `` },
    exports: ['students', 'best'],
    checks: [
      { d: 'students is an array of 3 objects', t: (d, w) => Array.isArray(w.__exp.students) && w.__exp.students.length === 3 },
      { d: 'Each object has id and grade', t: (d, w) => w.__exp.students.every(s => 'id' in s && 'grade' in s) },
      { d: 'best is "S3"', t: (d, w) => w.__exp.best === 'S3' },
      { d: 'Uses a loop', t: (d, w, s) => /for\s*\(|forEach\s*\(/.test(s.js) && !/best\s*=\s*["']S3["']/.test(s.js) }
    ],
    solution: { js: `const students = [
  { id: "S1", grade: 70 },
  { id: "S2", grade: 85 },
  { id: "S3", grade: 100 }
];

let best = students[0].id;
let topGrade = students[0].grade;
for (const s of students) {
  if (s.grade > topGrade) {
    topGrade = s.grade;
    best = s.id;
  }
}
console.log(best);` }
  }
});

/* =========================== MODULE 6: DOM =========================== */
LESSONS.push({
  id: 'dom-select', module: 'dom', title: 'The DOM & selecting elements',
  big: `When the browser loads HTML, it builds a tree of objects called the **DOM** (Document Object Model). JavaScript changes the page by changing this tree. Step one is always the same: **find the element** you want.`,
  simple: `Every element is a **node** in the tree. The whole page is the object [[document]].

Selection methods:
- [[document.getElementById("studentId")]] → one element (or null). No # here!
- [[document.querySelector("#main a")]] → the **first** element matching a CSS selector.
- [[document.querySelectorAll("#gradeTbody tr.data")]] → **all** matches, as a NodeList (works with forEach).
- Older: [[getElementsByClassName("x")]], [[getElementsByTagName("li")]] → live collections.

querySelector uses CSS selectors, so everything from the CSS module works here.`,
  ar: `<strong>بالعربي:</strong> getElementById تكتب الاسم بدون #. بس querySelector و querySelectorAll تكتب CSS selector، يعني فيها # و . عادي. و querySelectorAll ترجّع NodeList، وتقدر تسوي عليها forEach.`,
  deeper: [
    { try: { task: 'Run and read the console. Then select the second li using querySelector and a pseudo-class.', html: `<p id="here">hello <span>there</span></p>
<ul>
  <li>France</li>
  <li>Spain</li>
  <li>Thailand</li>
</ul>
<div id="main">
  <a href="somewhere.html"><img src="" class="thumb" alt="thumb"></a>
</div>`, js: `const node = document.getElementById("here");
console.log(node.textContent);     // "hello there"

const items = document.querySelectorAll("li");
console.log(items.length);         // 3
items.forEach(li => console.log(li.textContent));

const link = document.querySelector("#main a");
console.log(link.getAttribute("href"));

const img = document.querySelector("#main img");
console.log(img.className);        // "thumb"` } },
    `**NodeList vs array.** A NodeList has [[length]], indexes and [[forEach]], but not every array method. To loop you can use [[forEach]] or [[for…of]].

**Family relations** exist ([[parentNode]], [[children]], [[firstChild]], [[nextSibling]]), but the slides warn they are unreliable (whitespace text nodes), so prefer selectors. [[children]] (elements only) is safe and the exam used it: [[row.children[1]]].`
  ],
  points: [
    'getElementById("id") → no #.',
    'querySelector("css") → first match; querySelectorAll → all (NodeList).',
    'NodeList supports forEach and length.',
    'Returns null if nothing matches; then .value or .textContent throws an error.',
    'children = element children only; children[1] = the second one.'
  ],
  exam: [
    '2025-26: [[const studentIdValue = document.getElementById(\'studentId\').value;]] (1 mark).',
    '[[const gradeRows = document.querySelectorAll(\'#gradeTbody tr.data\');]] (1 mark): only rows with class data inside the tbody.',
    'Useful methods listed on the paper: getElementById, getElementsByTagName, children, createElement, appendChild, preventDefault, addEventListener, querySelectorAll, textContent, Number.'
  ],
  mistakes: [
    { lang: 'js', wrong: `document.getElementById("#studentId")`, right: `document.getElementById("studentId")`, why: 'getElementById takes the plain id, without #.' },
    { lang: 'js', wrong: `document.querySelector("gradeTbody")`, right: `document.querySelector("#gradeTbody")`, why: 'querySelector needs a CSS selector: # for an id.' },
    { lang: 'js', wrong: `const rows = document.querySelector("tr.data");
rows.forEach(...)`, right: `const rows = document.querySelectorAll("tr.data");
rows.forEach(...)`, why: 'querySelector returns one element; you need querySelectorAll for a list.' }
  ],
  summary: [
    'The DOM is the page as a tree of objects.',
    'getElementById (no #) or querySelector / querySelectorAll (CSS selectors).',
    'querySelectorAll returns a NodeList you can forEach.'
  ],
  recall: [
    { q: 'Which returns ALL rows with class data inside #gradeTbody?', o: ['[[getElementById("gradeTbody tr.data")]]', '[[querySelector("#gradeTbody tr.data")]]', '[[querySelectorAll("#gradeTbody tr.data")]]', '[[getElementsByClassName("#gradeTbody")]]'], a: 2, why: 'querySelectorAll with a descendant selector.' },
    { q: 'What does getElementById return if no element has that id?', o: ['undefined', 'An empty string', 'null', 'An empty NodeList'], a: 2, why: 'null, so reading .value from it throws an error.' },
    { q: 'For a row [[<tr><td>S1</td><td>85</td></tr>]], which gives the grade cell?', o: ['[[row.children[2]]]', '[[row.children[1]]]', '[[row.child(1)]]', '[[row[1]]]'], a: 1, why: 'children is zero-based.' }
  ],
  challenge: {
    task: `Write JavaScript that:
1. stores the **#studentId** input in [[idInput]] using getElementById
2. stores **all** [[tr.data]] rows inside **#gradeTbody** in [[rows]]
3. stores the **grade cell of the first data row** in [[firstGradeCell]]
4. logs the number of data rows`,
    tabs: ['js', 'html'],
    starter: { html: `<input id="studentId" value="S9">
<table>
  <tbody id="gradeTbody">
    <tr class="data"><td>S1</td><td>80</td></tr>
    <tr class="data"><td>S2</td><td>90</td></tr>
    <tr><td>not data</td><td>0</td></tr>
  </tbody>
</table>`, js: `` },
    exports: ['idInput', 'rows', 'firstGradeCell'],
    checks: [
      { d: 'idInput is the #studentId element', t: (d, w) => w.__exp.idInput === d.getElementById('studentId') },
      { d: 'Uses getElementById for it', t: (d, w, s) => /getElementById\(\s*["']studentId["']\s*\)/.test(s.js) },
      { d: 'rows holds exactly the 2 data rows', t: (d, w) => w.__exp.rows && w.__exp.rows.length === 2 },
      { d: 'firstGradeCell is the cell with 80', t: (d, w) => w.__exp.firstGradeCell && w.__exp.firstGradeCell.textContent === '80' },
      { d: 'Logs the number of rows', t: (d, w, s) => /console\.log\([^)]*length/.test(s.js) }
    ],
    solution: { js: `const idInput = document.getElementById("studentId");
const rows = document.querySelectorAll("#gradeTbody tr.data");
const firstGradeCell = rows[0].children[1];
console.log(rows.length);` }
  }
});

LESSONS.push({
  id: 'dom-change', module: 'dom', title: 'Reading & changing elements',
  big: `Once you have an element, you can read what is in it and change it: its text, its classes, its style, or the value typed in an input. This is how a page "reacts".`,
  simple: `Key properties:
- [[el.textContent]] → the text inside (tags removed). Read **or** set.
- [[el.innerHTML]] → the HTML inside, tags included.
- [[input.value]] → what the user typed in an input/select/textarea (a **string**).
- [[el.classList.add("x")]], [[.remove("x")]], [[.toggle("x")]], [[.contains("x")]] → change classes.
- [[el.className]] → the whole class attribute as text.
- [[el.style.backgroundColor = "yellow"]] → inline style (CSS names in camelCase).
- [[el.id]], [[img.src]], [[a.href]] → attributes as properties.

**textContent vs innerHTML**: the slides say prefer **textContent** for text, because innerHTML with user input can allow **XSS** (someone injects a script).`,
  ar: `<strong>بالعربي:</strong> عشان تكتب كلام في عنصر استعمل textContent. و innerHTML يقرأ ويكتب HTML بالتاقات، بس خطر لو فيه كلام من المستخدم (XSS). و classList.add أفضل من تغيير style مباشرة، لأن الشكل يبقى في ملف الـ CSS.`,
  deeper: [
    { try: { task: 'Type a grade and press the button. Then change the code so grades below 50 get the class **fail** instead of **pass**.', html: `<input id="grade" type="number" value="85">
<button id="show" type="button">Show</button>
<div id="averageContainer" class="average"></div>`, css: `.average { font-weight: bold; padding: 6px; }
.pass { background: lightgreen; }
.fail { background: salmon; }`, js: `const input = document.getElementById("grade");
const box = document.getElementById("averageContainer");

document.getElementById("show").addEventListener("click", function () {
  const g = Number(input.value);
  box.textContent = \`Grade: \${g}\`;
  box.classList.add("pass");
});` } },
    `**innerHTML vs textContent**, from slide 9.13:`,
    { code: `// <p id="here">hello <span>there</span></p>
node.innerHTML;    // 'hello <span>there</span>'
node.textContent;  // 'hello there'

node.textContent = "<b>hi</b>";  // shows the characters <b>hi</b>
node.innerHTML   = "<b>hi</b>";  // shows bold hi`, lang: 'js' }
  ],
  points: [
    'textContent = text only, safe; innerHTML = HTML, XSS risk with user input.',
    'input.value is always a string → Number() for maths.',
    'classList.add/remove/toggle/contains.',
    'style properties are camelCase: backgroundColor, fontWeight.',
    'Prefer changing classes over changing style directly.'
  ],
  exam: [
    '2025-26 Q2.A: [[idCell.textContent = studentIdValue;]] (1 mark), [[newRow.classList.add(\'data\');]] (1 mark).',
    '2025-26 Q2.B: [[averageContainer.textContent = message;]] (1 mark).'
  ],
  mistakes: [
    { lang: 'js', wrong: `const g = document.getElementById("grade").textContent;`, right: `const g = document.getElementById("grade").value;`, why: 'For inputs, what the user typed is in .value.' },
    { lang: 'js', wrong: `row.classList = "data";      // or row.class = "data"`, right: `row.classList.add("data");`, why: 'classList is an object with methods; there is no .class property.' },
    { lang: 'js', wrong: `box.style.background-color = "red";`, right: `box.style.backgroundColor = "red";`, why: 'A dash means minus in JS; use camelCase.' }
  ],
  summary: [
    'Read and write text with textContent; input values with .value.',
    'Change classes with classList; styles with el.style.camelCase.',
    'Avoid innerHTML for user text (XSS).'
  ],
  recall: [
    { q: 'Which property gives what the user typed in an input?', o: ['textContent', 'innerHTML', 'value', 'text'], a: 2, why: 'value.' },
    { q: 'Which adds the class data to newRow?', o: ['[[newRow.class = "data"]]', '[[newRow.classList.add("data")]]', '[[newRow.addClass("data")]]', '[[newRow.className.add("data")]]'], a: 1, why: 'classList.add.' },
    { q: 'Why do the slides prefer textContent over innerHTML for text?', o: ['It is faster to type', 'innerHTML can let attackers inject scripts (XSS)', 'innerHTML does not work in Chrome', 'textContent supports CSS'], a: 1, why: 'XSS risk.' }
  ],
  challenge: {
    task: `When **#calcBtn** is clicked:
- read the number from **#grade**
- write **"Grade: N"** into **#averageContainer** using textContent
- add the class **pass** if N ≥ 50, otherwise add **fail**`,
    tabs: ['js', 'html'],
    starter: { html: `<input id="grade" type="number" value="72">
<button id="calcBtn" type="button">Check</button>
<div id="averageContainer" class="average"></div>`, js: `` },
    test: async (d, w) => {
      const r = {};
      d.getElementById('grade').value = '72'; d.getElementById('calcBtn').click();
      const box = d.getElementById('averageContainer');
      r.text = box.textContent.trim(); r.pass = box.classList.contains('pass');
      box.className = 'average'; d.getElementById('grade').value = '30'; d.getElementById('calcBtn').click();
      r.fail = box.classList.contains('fail'); r.text2 = box.textContent.trim();
      return r;
    },
    checks: [
      { d: 'Shows "Grade: 72"', t: (d, w, s, r) => r.text === 'Grade: 72' },
      { d: 'Adds class pass for 72', t: (d, w, s, r) => r.pass },
      { d: 'Adds class fail for 30', t: (d, w, s, r) => r.fail && r.text2 === 'Grade: 30' },
      { d: 'Uses textContent (not innerHTML)', t: (d, w, s) => /textContent/.test(s.js) && !/innerHTML/.test(s.js) },
      { d: 'Uses classList.add', t: (d, w, s) => /classList\.add/.test(s.js) }
    ],
    solution: { js: `const btn = document.getElementById("calcBtn");
const box = document.getElementById("averageContainer");

btn.addEventListener("click", function () {
  const n = Number(document.getElementById("grade").value);
  box.textContent = \`Grade: \${n}\`;
  if (n >= 50) {
    box.classList.add("pass");
  } else {
    box.classList.add("fail");
  }
});` }
  }
});

LESSONS.push({
  id: 'dom-create', module: 'dom', title: 'Creating elements: building a table row',
  big: `This is the most important lesson for the midterm. Q2.A of the 2025-26 exam (17 marks) is: build a [[<tr>]] with two [[<td>]] cells from the form values, and add it to the table. Every line is one mark.`,
  simple: `Making new elements always follows the same 3 steps:
1. **Create**: [[const cell = document.createElement("td");]] (exists in memory, not on the page yet)
2. **Fill**: [[cell.textContent = "85";]] and maybe [[cell.classList.add("x");]]
3. **Attach**: [[row.appendChild(cell);]] (now it is inside row)

Build from the inside out: cells into the row, then the row into the tbody.

Other manipulation methods from the slides: [[insertBefore]], [[removeChild]], [[replaceChild]], [[createTextNode]], [[insertAdjacentElement]].`,
  ar: `<strong>بالعربي:</strong> ثلاث خطوات: createElement، بعدين textContent، بعدين appendChild. تبني الـ td وتحطه في الـ tr، وبعدين تحط الـ tr في الـ tbody. الدالة في الامتحان ترجّع الـ row بس (return)، والإضافة للجدول تصير في الـ submit listener.`,
  deeper: [
    `The exam's model answer, line by line (each line = 1 mark):`,
    { code: `function createGradeRow() {
  const studentIdValue = document.getElementById('studentId').value;
  const studentGradeValue = document.getElementById('studentGrade').value;

  const newRow = document.createElement('tr');
  newRow.classList.add('data');

  const idCell = document.createElement('td');
  idCell.textContent = studentIdValue;

  const gradeCell = document.createElement('td');
  gradeCell.textContent = studentGradeValue;

  newRow.appendChild(idCell);
  newRow.appendChild(gradeCell);

  return newRow;
}`, lang: 'js' },
    { try: { task: 'Press "Add row" a few times. Then change the code to add a third cell with the text "OK".', html: `<input id="studentId" value="S1">
<input id="studentGrade" type="number" value="85">
<button id="add" type="button">Add row</button>
<table border="1">
  <thead><tr><th>Student ID</th><th>Grade</th></tr></thead>
  <tbody id="gradeTbody"></tbody>
</table>`, js: `function createGradeRow() {
  const newRow = document.createElement('tr');
  newRow.classList.add('data');

  const idCell = document.createElement('td');
  idCell.textContent = document.getElementById('studentId').value;

  const gradeCell = document.createElement('td');
  gradeCell.textContent = document.getElementById('studentGrade').value;

  newRow.appendChild(idCell);
  newRow.appendChild(gradeCell);
  return newRow;
}

document.getElementById('add').addEventListener('click', function () {
  document.getElementById('gradeTbody').appendChild(createGradeRow());
});` } }
  ],
  points: [
    'createElement("tag") creates; nothing shows until you append it.',
    'Fill with textContent (and classList.add for classes).',
    'parent.appendChild(child) adds at the end of parent.',
    'Inside out: td → tr → tbody.',
    'A builder function returns the element; the caller appends it.'
  ],
  exam: [
    '2025-26 Q2.A "createGradeRow" = 11 marks: function line, two .value reads, createElement tr, classList.add, two createElement td, two textContent, the appends, return.',
    'If you forget one line, you lose only that mark. Write every small line, even if you are not sure about the rest.'
  ],
  mistakes: [
    { lang: 'js', wrong: `const row = document.createElement('<tr>');`, right: `const row = document.createElement('tr');`, why: 'The tag name, without angle brackets.' },
    { lang: 'js', wrong: `row.appendChild(idCell, gradeCell);`, right: `row.appendChild(idCell);
row.appendChild(gradeCell);`, why: 'appendChild takes one node. (append() can take several, but use what the exam lists.)' },
    { lang: 'js', wrong: `function createGradeRow() {
  ...
  gradeTbody.appendChild(newRow);
}`, right: `function createGradeRow() {
  ...
  return newRow;
}`, why: 'The question says the function returns the row. Appending happens in the submit listener.' }
  ],
  summary: [
    'createElement → textContent / classList → appendChild.',
    'Build cells into the row, then the row into the tbody.',
    'Return the row from the builder function.'
  ],
  recall: [
    { q: 'After [[const td = document.createElement("td")]], is the cell on the page?', o: ['Yes, at the end of the body', 'Yes, in the first table', 'No, not until it is appended', 'Only after a reload'], a: 2, why: 'It exists in memory until appendChild puts it in the tree.' },
    { q: 'Which line adds the cell to the row?', o: ['[[cell.appendChild(row)]]', '[[row.appendChild(cell)]]', '[[row.add(cell)]]', '[[row.textContent = cell]]'], a: 1, why: 'parent.appendChild(child).' },
    { q: 'What should createGradeRow() end with?', o: ['[[return newRow;]]', '[[return;]]', '[[gradeTbody.appendChild(newRow);]]', '[[console.log(newRow);]]'], a: 0, why: 'It must return the completed row.' }
  ],
  challenge: {
    task: `Write [[createProductRow()]]:
- read **#productName** and **#productPrice** values
- create a [[<tr>]] with class **data**
- create two [[<td>]] cells with those values (textContent)
- append both cells to the row and **return** the row

(The test calls your function and checks what it returns.)`,
    tabs: ['js', 'html'],
    starter: { html: `<input id="productName" value="Laptop">
<input id="productPrice" type="number" value="400">
<table><tbody id="productTbody"></tbody></table>`, js: `function createProductRow() {

}` },
    exports: ['createProductRow'],
    test: async (d, w) => {
      d.getElementById('productName').value = 'Mouse'; d.getElementById('productPrice').value = '12';
      let row = null, err = null;
      try { row = w.__exp.createProductRow(); } catch (e) { err = e.message; }
      return { row, err };
    },
    checks: [
      { d: 'createProductRow is a function', t: (d, w) => typeof w.__exp.createProductRow === 'function' },
      { d: 'Returns a <tr>', t: (d, w, s, r) => r.row && r.row.tagName === 'TR' },
      { d: 'The row has class data', t: (d, w, s, r) => r.row && r.row.classList.contains('data') },
      { d: 'Two <td> cells', t: (d, w, s, r) => r.row && r.row.children.length === 2 && [...r.row.children].every(c => c.tagName === 'TD') },
      { d: 'Cells contain the current input values (Mouse, 12)', t: (d, w, s, r) => r.row && r.row.children[0] && r.row.children[0].textContent === 'Mouse' && r.row.children[1] && r.row.children[1].textContent === '12' },
      { d: 'Uses createElement and appendChild', t: (d, w, s) => /createElement\(\s*["']tr["']\s*\)/.test(s.js) && /appendChild/.test(s.js) },
      { d: 'Does not add the row to the table itself', t: d => d.getElementById('productTbody').children.length === 0 }
    ],
    solution: { js: `function createProductRow() {
  const nameValue = document.getElementById('productName').value;
  const priceValue = document.getElementById('productPrice').value;

  const newRow = document.createElement('tr');
  newRow.classList.add('data');

  const nameCell = document.createElement('td');
  nameCell.textContent = nameValue;

  const priceCell = document.createElement('td');
  priceCell.textContent = priceValue;

  newRow.appendChild(nameCell);
  newRow.appendChild(priceCell);

  return newRow;
}` }
  }
});

/* =========================== MODULE 7: EVENTS =========================== */
LESSONS.push({
  id: 'events-basics', module: 'events', title: 'addEventListener & the event object',
  big: `A page waits for the user to do something: click, type, submit. Each action fires an **event**. You attach a function (the **handler**) to an element, and the browser calls it when that event happens.`,
  simple: `Pattern:
[[element.addEventListener("click", function () { … });]]

- First argument: the event **type** as a string ([["click"]], [["submit"]], [["keydown"]], [["change"]] …), **without** "on".
- Second: the **callback** function. Usually anonymous, or an arrow function. Pass a named function **without** parentheses: [[btn.addEventListener("click", showAverage)]].

The browser passes an **event object** to your function: [[function (e) { … }]]. Useful parts: [[e.target]] (the element that triggered it), [[e.type]], [[e.key]] for keyboard, [[e.preventDefault()]], [[e.stopPropagation()]].`,
  ar: `<strong>بالعربي:</strong> نوع الحدث يتكتب "click" مو "onclick". ولو عندك دالة باسم، تكتب اسمها بدون أقواس، لأن مع الأقواس بتشتغل على طول بدل ما تنتظر الضغطة. والـ e فيه معلومات عن الحدث مثل e.target.`,
  deeper: [
    { try: { task: 'Click the buttons. Then add a listener to the input for "keydown" that logs [[e.key]].', html: `<button id="btn" type="button">Click me</button>
<button id="btn2" type="button">Named handler</button>
<input id="key" placeholder="type here">`, js: `const btn = document.getElementById("btn");

btn.addEventListener("click", function (e) {
  console.log("clicked:", e.target.id, "type:", e.type);
});

function sayHi() {
  console.log("hi from a named function");
}
document.getElementById("btn2").addEventListener("click", sayHi);  // no ()

// arrow version
document.querySelector("#btn").addEventListener("click", () => console.log("arrow listener"));` } },
    `**Several listeners** can be attached to the same element; they all run in order. With the old style [[btn.onclick = …]] only one is kept; the slides use addEventListener.

**Event types** you should know: mouse ([[click]], [[dblclick]], [[mouseover]], [[mouseout]], [[mousedown]], [[mouseup]], [[mousemove]]), keyboard ([[keydown]], [[keyup]]), form ([[submit]], [[change]], [[focus]], [[blur]], [[reset]], [[select]]), frame ([[load]], [[DOMContentLoaded]], [[resize]], [[scroll]]).`
  ],
  points: [
    'addEventListener("type", callback) — type without "on".',
    'Pass a function reference, not a call: handler, not handler().',
    'The event object e has target, type, key, preventDefault, stopPropagation.',
    'Many listeners can be added to one element.',
    'Know the event types: click, mouseover/mouseout, keydown, submit, change, focus, blur, load, DOMContentLoaded.'
  ],
  exam: [
    '2025-26 Q2.B: [[calcAvgBtn.addEventListener(\'click\', function () { … })]] (1 mark) after getting the button with getElementById (1 mark).',
    'Older finals: a game with [[mouseover]] / [[mouseout]] to stop and resume changing images.'
  ],
  mistakes: [
    { lang: 'js', wrong: `btn.addEventListener("onclick", show);`, right: `btn.addEventListener("click", show);`, why: 'The type has no "on" prefix.' },
    { lang: 'js', wrong: `btn.addEventListener("click", show());`, right: `btn.addEventListener("click", show);`, why: 'show() runs immediately and passes its result (undefined).' }
  ],
  summary: [
    'element.addEventListener("click", function (e) { … }).',
    'Function reference, not a call.',
    'e.target = the element that fired the event.'
  ],
  recall: [
    { q: 'Which registers a click handler correctly?', o: ['[[btn.addEventListener("onclick", f)]]', '[[btn.addEventListener("click", f())]]', '[[btn.addEventListener("click", f)]]', '[[btn.listen("click", f)]]'], a: 2, why: 'Type without on, function without ().' },
    { q: 'Which event fires when the mouse moves onto an element?', o: ['mousedown', 'mouseover', 'hover', 'mouseenterclick'], a: 1, why: 'mouseover (and mouseout when it leaves).' },
    { q: 'In a handler, which gives the element that triggered the event?', o: ['[[e.source]]', '[[e.element]]', '[[e.target]]', '[[this.event]]'], a: 2, why: 'e.target.' }
  ],
  challenge: {
    task: `1. When **#counterBtn** is clicked, increase a counter and show **"Clicks: N"** in **#out**.
2. When the mouse goes over **#box**, add class **hot**; when it leaves, remove it.`,
    tabs: ['js', 'html'],
    starter: { html: `<button id="counterBtn" type="button">+1</button>
<div id="out">Clicks: 0</div>
<div id="box" style="padding:20px;border:1px solid">Hover me</div>`, js: `` },
    test: async (d, w) => {
      const b = d.getElementById('counterBtn'); b.click(); b.click(); b.click();
      const box = d.getElementById('box');
      box.dispatchEvent(new w.MouseEvent('mouseover', { bubbles: true }));
      const hotIn = box.classList.contains('hot');
      box.dispatchEvent(new w.MouseEvent('mouseout', { bubbles: true }));
      return { text: d.getElementById('out').textContent.trim(), hotIn, hotOut: box.classList.contains('hot') };
    },
    checks: [
      { d: 'After 3 clicks it shows "Clicks: 3"', t: (d, w, s, r) => r.text === 'Clicks: 3' },
      { d: 'mouseover adds class hot', t: (d, w, s, r) => r.hotIn },
      { d: 'mouseout removes class hot', t: (d, w, s, r) => r.hotIn && !r.hotOut },
      { d: 'Uses addEventListener', t: (d, w, s) => /addEventListener\(\s*["']click["']/.test(s.js) }
    ],
    solution: { js: `let count = 0;
const out = document.getElementById("out");
document.getElementById("counterBtn").addEventListener("click", function () {
  count++;
  out.textContent = \`Clicks: \${count}\`;
});

const box = document.getElementById("box");
box.addEventListener("mouseover", () => box.classList.add("hot"));
box.addEventListener("mouseout", () => box.classList.remove("hot"));` }
  }
});

LESSONS.push({
  id: 'events-forms', module: 'events', title: 'Form events: submit & preventDefault',
  big: `When a form is submitted, the browser normally sends the data and **reloads the page**. In a JavaScript app we want to stay on the page and handle the data ourselves. The tool is [[event.preventDefault()]], and it is worth a mark in the exam.`,
  simple: `Listen to **submit** on the **form** (not click on the button). Why? submit also fires when the user presses Enter, and the browser checks [[required]], [[min]] and [[max]] first: your code only runs if the data is valid.

Pattern:
- get the form
- [[form.addEventListener("submit", function (event) { … })]]
- first line: [[event.preventDefault();]] → no reload
- read values, build, add to the page.

Validation in JS (slide 9.10): check the value, and if it is wrong, call [[e.preventDefault()]] and show a message.`,
  ar: `<strong>بالعربي:</strong> نسمع للـ submit على الفورم نفسه. وأول سطر داخل الدالة event.preventDefault() عشان الصفحة ما تسوي reload وتمسح الجدول. وبعدها نستدعي createGradeRow() ونحط الصف في الـ tbody.`,
  deeper: [
    `The exam's model answer for the listener (6 marks, one per line):`,
    { code: `const gradeForm = document.getElementById('gradeForm');
const gradeTbody = document.getElementById('gradeTbody');

gradeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const newRow = createGradeRow();
  gradeTbody.appendChild(newRow);
});`, lang: 'js' },
    { try: { task: 'Add a few grades. Then remove the [[preventDefault]] line and submit again: read the warning in the console.', html: `<form id="gradeForm">
  <input type="text" id="studentId" placeholder="Student ID" required>
  <input type="number" id="studentGrade" min="0" max="100" placeholder="Grade" required>
  <button id="addGradeBtn" type="submit">Add Grade</button>
</form>
<table border="1">
  <thead><tr><th>Student ID</th><th>Grade</th></tr></thead>
  <tbody id="gradeTbody"></tbody>
</table>`, js: `function createGradeRow() {
  const newRow = document.createElement('tr');
  newRow.classList.add('data');
  const idCell = document.createElement('td');
  idCell.textContent = document.getElementById('studentId').value;
  const gradeCell = document.createElement('td');
  gradeCell.textContent = document.getElementById('studentGrade').value;
  newRow.appendChild(idCell);
  newRow.appendChild(gradeCell);
  return newRow;
}

const gradeForm = document.getElementById('gradeForm');
const gradeTbody = document.getElementById('gradeTbody');

gradeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  gradeTbody.appendChild(createGradeRow());
  gradeForm.reset();   // clears the inputs
});` } },
    `**Empty-field validation** from the slides:`,
    { code: `form.addEventListener("submit", (e) => {
  const fieldValue = document.querySelector("#username").value;
  if (fieldValue == null || fieldValue == "") {
    e.preventDefault();                       // stop submission
    console.log("you must enter a username");
  }
});`, lang: 'js' },
    `Other form events: [[change]] (value changed, e.g. a select or radio), [[focus]] / [[blur]] (entering / leaving a field), [[reset]]. [[form.submit()]] submits from code; [[form.reset()]] clears it.`
  ],
  points: [
    'Listen for submit on the form, not click on the button.',
    'event.preventDefault() stops the reload.',
    'required/min/max are checked before submit fires.',
    'Read values inside the handler (they change each time).',
    'change, focus, blur, reset are the other form events.'
  ],
  exam: [
    '2025-26 Q2.A listener: get the form (1), get the tbody (1), addEventListener("submit", function (event)) (1), event.preventDefault() (1), call createGradeRow() (1), appendChild to the tbody (1).',
    'Short answer style: "Why call preventDefault() in a submit handler?" → to stop the browser sending the form and reloading the page.'
  ],
  mistakes: [
    { lang: 'js', wrong: `addGradeBtn.addEventListener('click', function () {
  gradeTbody.appendChild(createGradeRow());
});`, right: `gradeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  gradeTbody.appendChild(createGradeRow());
});`, why: 'The question asks for a submit listener on the form, with preventDefault.' },
    { lang: 'js', wrong: `gradeForm.addEventListener('submit', function () {
  event.preventDefault();`, right: `gradeForm.addEventListener('submit', function (event) {
  event.preventDefault();`, why: 'Declare the event parameter you use.' }
  ],
  summary: [
    'form.addEventListener("submit", function (event) { event.preventDefault(); … }).',
    'Then build the row and append it to the tbody.',
    'Validation: if the value is wrong, preventDefault and show a message.'
  ],
  recall: [
    { q: 'What does [[event.preventDefault()]] do in a submit handler?', o: ['Clears the form', 'Stops the default action: sending the form and reloading', 'Stops other listeners', 'Validates the inputs'], a: 1, why: 'It cancels the default browser action.' },
    { q: 'Which element should get the submit listener?', o: ['The submit button', 'The form', 'The tbody', 'The document only'], a: 1, why: 'submit fires on the form.' },
    { q: 'The grade input has min="0" max="100" required. The user types 150 and presses Add. What happens?', o: ['Your submit handler runs with 150', 'The browser shows an error and the submit event does not fire', 'The page reloads', 'The value becomes 100'], a: 1, why: 'Built-in validation runs first.' }
  ],
  challenge: {
    task: `Complete the exam listener:
- get **#gradeForm** and **#gradeTbody**
- add a **submit** listener to the form
- prevent the default behaviour
- call [[createGradeRow()]] (already written) and append the row to the tbody`,
    tabs: ['js', 'html'],
    starter: { html: `<form id="gradeForm">
  <input type="text" id="studentId" required>
  <input type="number" id="studentGrade" min="0" max="100" required>
  <button id="addGradeBtn" type="submit">Add Grade</button>
</form>
<table><tbody id="gradeTbody"></tbody></table>`, js: `function createGradeRow() {
  const newRow = document.createElement('tr');
  newRow.classList.add('data');
  const idCell = document.createElement('td');
  idCell.textContent = document.getElementById('studentId').value;
  const gradeCell = document.createElement('td');
  gradeCell.textContent = document.getElementById('studentGrade').value;
  newRow.appendChild(idCell);
  newRow.appendChild(gradeCell);
  return newRow;
}

// write your listener below
` },
    test: async (d, w) => {
      d.getElementById('studentId').value = 'S7'; d.getElementById('studentGrade').value = '77';
      const f = d.getElementById('gradeForm');
      w.__subs = [];
      if (f.requestSubmit) f.requestSubmit(); else d.getElementById('addGradeBtn').click();
      await new Promise(r => setTimeout(r, 20));
      const rows = d.querySelectorAll('#gradeTbody tr');
      return { prevented: w.__subs.length > 0 && w.__subs[0] === true, rows: rows.length, first: rows[0] ? rows[0].textContent : '' };
    },
    checks: [
      { d: 'Gets the form and the tbody', t: (d, w, s) => /gradeForm/.test(s.js.split('// write your listener below')[1] || '') && /gradeTbody/.test(s.js.split('// write your listener below')[1] || '') },
      { d: 'Uses a submit listener on the form', t: (d, w, s) => /addEventListener\(\s*["']submit["']/.test(s.js) },
      { d: 'preventDefault stops the reload', t: (d, w, s, r) => r.prevented },
      { d: 'Submitting adds one row to the tbody', t: (d, w, s, r) => r.rows === 1 && /S7/.test(r.first) },
      { d: 'Calls createGradeRow()', t: (d, w, s) => (s.js.match(/createGradeRow\s*\(/g) || []).length >= 2 }
    ],
    solution: { js: `function createGradeRow() {
  const newRow = document.createElement('tr');
  newRow.classList.add('data');
  const idCell = document.createElement('td');
  idCell.textContent = document.getElementById('studentId').value;
  const gradeCell = document.createElement('td');
  gradeCell.textContent = document.getElementById('studentGrade').value;
  newRow.appendChild(idCell);
  newRow.appendChild(gradeCell);
  return newRow;
}

// write your listener below
const gradeForm = document.getElementById('gradeForm');
const gradeTbody = document.getElementById('gradeTbody');

gradeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const newRow = createGradeRow();
  gradeTbody.appendChild(newRow);
});` }
  }
});

LESSONS.push({
  id: 'events-flow', module: 'events', title: 'Page loading, bubbling & delegation',
  big: `Events do not stay on one element. A click on a button inside a div inside an aside is also a click on the div and the aside. Understanding this **propagation** explains strange bugs, and it enables a powerful trick: **event delegation**. Also: your code must wait for the page to load.`,
  simple: `**Page loading.** You cannot select elements before they exist. Options:
- put the script at the end of the body, or
- wrap the code in [[document.addEventListener("DOMContentLoaded", function () { … })]] → runs when the HTML is parsed (usually what you want), or
- [[window.addEventListener("load", …)]] → waits for images and CSS too (slower).

**Propagation** has two phases:
- **capturing**: from the outermost element (html) down to the target,
- **bubbling**: from the target back up to html. By default, listeners run in the bubbling phase.

[[e.stopPropagation()]] stops the event going further up.

**Delegation**: put one listener on the parent, and check [[e.target]] to see which child was clicked. Works for elements added later too (like new table rows).`,
  ar: `<strong>بالعربي:</strong> الضغطة تطلع من العنصر لفوق (bubbling) لين توصل للـ html. stopPropagation يوقفها. والـ delegation يعني listener واحد على الأب، وتشوف e.target منو انضغط. مفيد للصفوف اللي تنضاف بعدين. وانتبه: nodeName دايمًا حروف كبيرة مثل "IMG" و "TD".`,
  deeper: [
    { try: { task: 'Click the button: read the order in the console. Then uncomment [[e.stopPropagation()]] and click again.', html: `<aside id="cart" style="padding:16px;background:#eef">
  aside
  <div id="item" style="padding:16px;background:#ccf">
    div
    <button id="plus" type="button">+ button</button>
  </div>
</aside>`, js: `document.getElementById("plus").addEventListener("click", function (e) {
  // e.stopPropagation();
  console.log("1. button");
});
document.getElementById("item").addEventListener("click", function () {
  console.log("2. div");
});
document.getElementById("cart").addEventListener("click", function () {
  console.log("3. aside");
});` } },
    `**Delegation** (slide 9.38). One listener on the tbody handles clicks on any row, even rows added later:`,
    { try: { task: 'Click cells to highlight their row. Then add a button that adds a new row: it works without a new listener.', html: `<table border="1">
  <tbody id="gradeTbody">
    <tr class="data"><td>S1</td><td>80</td></tr>
    <tr class="data"><td>S2</td><td>90</td></tr>
  </tbody>
</table>`, css: `.selected { background: gold; }`, js: `const tbody = document.getElementById("gradeTbody");

tbody.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "TD") {   // nodeName is UPPERCASE
    e.target.parentNode.classList.toggle("selected");
  }
});` } },
    `**dataset**: custom [[data-*]] attributes store extra info on an element: [[<tr data-id="5">]] → [[row.dataset.id]] is "5". Handy with delegation.`
  ],
  points: [
    'Script at the end of body, or DOMContentLoaded, so elements exist.',
    'DOMContentLoaded = HTML parsed; load = everything incl. images.',
    'Bubbling: target → parents → html (the default phase).',
    'stopPropagation() stops the bubbling.',
    'Delegation: one listener on the parent + check e.target.',
    'nodeName / tagName are uppercase: "IMG", "TD", "TR".'
  ],
  exam: [
    'Slide question style: "Which event is generally preferred to know the DOM is ready?" → DOMContentLoaded.',
    '"Clicking the + button also triggers the div and aside handlers. Fix it." → e.stopPropagation().',
    'Delegation check: [[if (e.target && e.target.nodeName == "IMG")]].'
  ],
  mistakes: [
    { lang: 'js', wrong: `if (e.target.nodeName == "img")`, right: `if (e.target.nodeName == "IMG")`, why: 'nodeName is always uppercase for HTML elements.' },
    { lang: 'js', wrong: `<head>
  <script src="script.js"></script>  <!-- selects #btn → null -->
</head>`, right: `<script src="script.js"></script>
</body>   <!-- or wrap the code in DOMContentLoaded -->`, why: 'In the head, the body elements do not exist yet.' }
  ],
  summary: [
    'Wait for the DOM: end of body or DOMContentLoaded.',
    'Events bubble up; stopPropagation stops them.',
    'Delegation: one parent listener + e.target.'
  ],
  recall: [
    { q: 'Which event fires when the HTML is parsed, without waiting for images?', o: ['load', 'DOMContentLoaded', 'ready', 'onstart'], a: 1, why: 'DOMContentLoaded.' },
    { q: 'By default, listeners run during which phase?', o: ['Capturing', 'Bubbling', 'Both at once', 'Neither'], a: 1, why: 'Bubbling, unless you ask for capture.' },
    { q: 'In delegation, how do you check a clicked image?', o: ['[[e.target.nodeName == "img"]]', '[[e.target.nodeName == "IMG"]]', '[[e.nodeName == "IMG"]]', '[[e.target == img]]'], a: 1, why: 'nodeName is uppercase.' }
  ],
  challenge: {
    task: `Use **one** listener on **#gradeTbody** (delegation): when the user clicks a **TD**, remove its whole row from the table. Also make clicks on the cells **not** reach the [[document]] listener (stop the propagation).`,
    tabs: ['js', 'html'],
    starter: { html: `<table border="1">
  <tbody id="gradeTbody">
    <tr class="data"><td>S1</td><td>80</td></tr>
    <tr class="data"><td>S2</td><td>90</td></tr>
    <tr class="data"><td>S3</td><td>70</td></tr>
  </tbody>
</table>
<p id="log">document clicks: 0</p>`, js: `let docClicks = 0;
document.addEventListener("click", function () {
  docClicks++;
  document.getElementById("log").textContent = "document clicks: " + docClicks;
});

// your delegated listener here
` },
    test: async (d, w) => {
      const tds = d.querySelectorAll('#gradeTbody td');
      tds[2].click();
      const after = d.querySelectorAll('#gradeTbody tr').length;
      const left = [...d.querySelectorAll('#gradeTbody tr')].map(r => r.children[0].textContent).join(',');
      return { after, left, log: d.getElementById('log').textContent };
    },
    checks: [
      { d: 'Only one listener is added to the tbody (no loop over rows)', t: (d, w, s) => (s.js.match(/addEventListener/g) || []).length === 2 },
      { d: 'Clicking a cell of S2 removes that row', t: (d, w, s, r) => r.after === 2 && r.left === 'S1,S3' },
      { d: 'Checks e.target.nodeName (or tagName) == "TD"', t: (d, w, s) => /(nodeName|tagName)\s*={2,3}\s*["']TD["']/.test(s.js) },
      { d: 'The click does not reach the document listener', t: (d, w, s, r) => /0$/.test(r.log) }
    ],
    solution: { js: `let docClicks = 0;
document.addEventListener("click", function () {
  docClicks++;
  document.getElementById("log").textContent = "document clicks: " + docClicks;
});

// your delegated listener here
document.getElementById("gradeTbody").addEventListener("click", function (e) {
  e.stopPropagation();
  if (e.target && e.target.nodeName == "TD") {
    const row = e.target.parentNode;
    row.parentNode.removeChild(row);
  }
});` }
  }
});

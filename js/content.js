/* Lessons, part 1: HTML (Ch3), Tables & Forms (Ch5), CSS selectors, specificity, box model (Ch4). */
const MODULES = [
  { id: 'web',    num: '00', ch: 'Ch 1–2', lang: 'web', title: 'How the web works',     blurb: 'Client and server, URLs, DNS, and the HTTP request and response.' },
  { id: 'html',   num: '01', ch: 'Ch 3', lang: 'html', title: 'HTML foundations',        blurb: 'Page structure, the head, text, links, images, lists and semantic elements.' },
  { id: 'forms',  num: '02', ch: 'Ch 5', lang: 'html', title: 'Tables & forms',          blurb: 'thead/tbody, rowspan/colspan, inputs and their attributes, buttons.' },
  { id: 'css',    num: '03', ch: 'Ch 4', lang: 'css',  title: 'CSS selectors & styling', blurb: 'Selectors, combinators, specificity, the box model, units and colours.' },
  { id: 'layout', num: '04', ch: 'Ch 7', lang: 'css',  title: 'CSS layout',              blurb: 'Display, positioning, Flexbox and media queries.' },
  { id: 'js',     num: '05', ch: 'Ch 8', lang: 'js',   title: 'JavaScript fundamentals', blurb: 'Variables, types, conditions, loops, functions, objects and arrays.' },
  { id: 'dom',    num: '06', ch: 'Ch 9', lang: 'js',   title: 'The DOM',                 blurb: 'Select elements, read and change them, create new ones like table rows.' },
  { id: 'events', num: '07', ch: 'Ch 9', lang: 'js',   title: 'Events',                  blurb: 'addEventListener, the event object, forms, preventDefault, bubbling and delegation.' },
  { id: 'async',    num: '08', ch: 'Ch 10', lang: 'js',  title: 'APIs & async JavaScript', blurb: 'Callbacks, Promises, fetch, async/await, JSON, and building a table from fetched data.' },
  { id: 'php',      num: '09', ch: 'Ch 12', lang: 'php', title: 'PHP basics',              blurb: 'Syntax, arrays, foreach, functions, strings, preg_match, forms and $_SERVER.' },
  { id: 'db',       num: '10', ch: 'Ch 14', lang: 'db',  title: 'Databases & PDO',         blurb: 'SQL, connecting with PDO, query and fetch, exec, prepared statements, transactions.' },
  { id: 'state',    num: '11', ch: 'Ch 15', lang: 'php', title: 'Managing state',          blurb: 'Why HTTP forgets, cookies, sessions, and caching.' },
  { id: 'security', num: '12', ch: 'Ch 16', lang: 'sec', title: 'Security',                blurb: 'XSS, SQL injection, session hijacking, password hashing, HTTPS and validation.' },
  { id: 'bonus',    num: '13', ch: 'Wk 12–13', lang: 'bonus', title: 'Bonus: Node.js, React, Laravel', blurb: 'In the schedule but not in the chapter list: concepts only, may not be in the exam.' }
];

const STEP_NAMES = ['Big Picture', 'Simple Explanation', 'Deeper Understanding', 'Important Points', 'Exam Focus', 'Common Mistakes', 'Mini Summary', 'Active Recall'];

const LESSONS = [];

/* =========================== MODULE 1: HTML =========================== */
LESSONS.push({
  id: 'html-structure', module: 'html', title: 'Page structure and the <head>',
  big: `Every web page is one HTML document. The browser reads it top to bottom and builds the page from it. Before you can style anything with CSS or make it interactive with JavaScript, the document needs the right skeleton.

In the exam, Question 1 always starts here: the [[<head>]] tags (meta, link) and where the [[<script>]] goes. Each correct line is one mark.`,
  simple: `Think of an HTML page like a letter in an envelope.

- [[<!DOCTYPE html>]] says "this is a modern HTML5 letter".
- [[<html>]] is the envelope that holds everything.
- [[<head>]] is information **about** the page that the user does not read directly: the title in the browser tab, the character set, the viewport setting for phones, and links to CSS files.
- [[<body>]] is the letter itself: everything the user sees.

Tags usually come in pairs: an opening tag [[<p>]] and a closing tag [[</p>]]. Some tags are **void** (no closing tag): [[<meta>]], [[<link>]], [[<img>]], [[<input>]], [[<br>]].`,
  ar: `<strong>بالعربي:</strong> الـ head مثل "بيانات" الصفحة: العنوان اللي في التاب، ونوع الحروف، وإعداد الجوال (viewport)، وربط ملف CSS. والـ body هو اللي يشوفه المستخدم. ملف الجافاسكربت نحطه في آخر الـ body عشان العناصر تكون موجودة قبل ما الكود يشتغل.`,
  deeper: [
    `A complete page looks like this. Read it line by line, then edit it in the live editor below.`,
    { code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Grades</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Grade Tracker</h1>
  <p>Welcome to my page.</p>

  <script src="script.js"></script>
</body>
</html>`, lang: 'html' },
    `- [[<meta charset="UTF-8">]] lets the page show any language, including Arabic.
- [[<meta name="viewport" content="width=device-width, initial-scale=1.0">]] tells phones to use the real screen width and not zoom out. The exam asked for exactly this: "set the viewport's content initial-scale to 1.0".
- [[<link rel="stylesheet" href="styles.css">]] connects an **external** CSS file. Both [[rel]] and [[href]] are needed.
- [[<script src="script.js"></script>]] loads an external JavaScript file. It is **not** a void tag: it needs [[</script>]]. Putting it just before [[</body>]] means all the HTML above it already exists when the code runs.`,
    { try: { task: 'Change the title and the heading, add a second paragraph, then press **Run** (or Ctrl+Enter).', html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Grades</title>
</head>
<body>
  <h1>Grade Tracker</h1>
  <p>Welcome to my page.</p>
</body>
</html>` } }
  ],
  points: [
    'The order is: [[<!DOCTYPE html>]] → [[<html>]] → [[<head>]] → [[<body>]].',
    'Only one [[<head>]] and one [[<body>]] per page.',
    '[[<title>]] goes inside [[<head>]] and shows in the browser tab.',
    'External CSS: [[<link rel="stylesheet" href="file.css">]] in the head.',
    'External JS: [[<script src="file.js"></script>]], usually at the end of the body.',
    'Void elements have no closing tag: meta, link, img, input, br, hr.',
    'Attributes go in the opening tag: [[name="value"]], always quoted.'
  ],
  exam: [
    '2025-26 midterm, Q1: "A [[<meta>]] tag to set the viewport\'s content initial-scale to 1.0" (1 mark) and "A [[<link>]] tag to connect an external stylesheet named styles.css" (1 mark).',
    '"At the end of the [[<body>]] tag, add a [[<script>]] tag to link an external JavaScript file named script.js" (1 mark).',
    '2024-25 midterm: "Include html, head and body tags, set the page title to …". Easy marks: never skip the closing tags.'
  ],
  mistakes: [
    { lang: 'html', wrong: `<script src="script.js">`, right: `<script src="script.js"></script>`, why: 'script is not a void element. Without the closing tag the browser treats everything after it as script.' },
    { lang: 'html', wrong: `<link src="styles.css">`, right: `<link rel="stylesheet" href="styles.css">`, why: 'link uses href (not src) and needs rel="stylesheet".' },
    { lang: 'html', wrong: `<meta viewport="initial-scale=1.0">`, right: `<meta name="viewport" content="initial-scale=1.0">`, why: 'The meta tag uses name and content attributes.' }
  ],
  summary: [
    'head = information about the page (meta, title, link); body = what the user sees.',
    'Viewport: [[<meta name="viewport" content="width=device-width, initial-scale=1.0">]].',
    'CSS with [[<link rel="stylesheet" href>]] in the head; JS with [[<script src></script>]] at the end of the body.'
  ],
  recall: [
    { q: 'Which tag connects an external stylesheet called styles.css?', o: ['[[<style src="styles.css">]]', '[[<link rel="stylesheet" href="styles.css">]]', '[[<css href="styles.css">]]', '[[<script src="styles.css">]]'], a: 1, why: 'External CSS uses link with rel="stylesheet" and href.' },
    { q: 'Where is the usual place for [[<script src="script.js"></script>]] so the HTML elements exist when the code runs?', o: ['First line of the head', 'Right after [[<body>]]', 'Just before [[</body>]]', 'After [[</html>]]'], a: 2, why: 'At the end of the body, all elements above it are already in the DOM.' },
    { q: 'Which of these is a void element (no closing tag)?', o: ['[[<script>]]', '[[<title>]]', '[[<meta>]]', '[[<p>]]'], a: 2, why: 'meta, link, img, input and br have no closing tag.' }
  ],
  challenge: {
    task: `Write a full page (exam style):
- Title: **SERVICES**
- A viewport meta tag with initial-scale 1.0
- A link to **styles.css**
- A [[<h1>]] that says Services
- A script tag linking **script.js** at the end of the body`,
    tabs: ['html'],
    starter: { html: `<!DOCTYPE html>
<html lang="en">
<head>

</head>
<body>

</body>
</html>` },
    checks: [
      { d: 'Page title is SERVICES', t: (doc, w, s) => /<title>\s*SERVICES\s*<\/title>/i.test(s.html) },
      { d: 'Viewport meta with initial-scale=1.0', t: (doc, w, s) => /<meta[^>]*name\s*=\s*["']viewport["'][^>]*content\s*=\s*["'][^"']*initial-scale\s*=\s*1(\.0)?/i.test(s.html) || /<meta[^>]*content\s*=\s*["'][^"']*initial-scale\s*=\s*1(\.0)?[^>]*name\s*=\s*["']viewport["']/i.test(s.html) },
      { d: 'link rel="stylesheet" href="styles.css"', t: (doc, w, s) => /<link(?=[^>]*rel\s*=\s*["']stylesheet["'])(?=[^>]*href\s*=\s*["']styles\.css["'])[^>]*>/i.test(s.html) },
      { d: 'h1 that says Services', t: doc => /services/i.test((doc.querySelector('h1') || {}).textContent || '') },
      { d: 'script src="script.js" with a closing tag, inside the body', t: (doc, w, s) => /<script[^>]*src\s*=\s*["']script\.js["'][^>]*>\s*<\/script>/i.test(s.html) && s.html.search(/<script[^>]*script\.js/i) > s.html.search(/<body/i) }
    ],
    solution: { html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SERVICES</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Services</h1>

  <script src="script.js"></script>
</body>
</html>` }
  }
});

LESSONS.push({
  id: 'html-content', module: 'html', title: 'Text, links, images, lists & semantic elements',
  big: `Inside the body you describe **what each piece of content is**: a heading, a paragraph, a list, an image, a navigation bar, a footer. HTML describes **meaning and structure**; CSS decides how it looks.`,
  simple: `- Headings [[<h1>]] to [[<h6>]]: h1 is the main title, h2 a section, and so on.
- [[<p>]] is a paragraph. [[<strong>]] = important (bold), [[<em>]] = emphasis (italic).
- [[<a href="page.html">]] is a link. [[href]] is where it goes.
- [[<img src="pic.jpg" alt="description" width="100" height="100">]] shows an image. [[alt]] is the text for screen readers.
- Lists: [[<ul>]] = bullet list, [[<ol>]] = numbered list, each item is [[<li>]].
- [[<div>]] and [[<span>]] are generic boxes with no meaning: div is a block, span is inline.

**Semantic elements** are boxes **with** meaning: [[<header>]], [[<nav>]], [[<main>]], [[<section>]], [[<article>]], [[<aside>]], [[<footer>]], [[<figure>]]. They help search engines and screen readers.`,
  ar: `<strong>بالعربي:</strong> الـ semantic elements مثل header و nav و footer نفس الـ div بالشكل، بس لها معنى. والامتحان طلب أشياء مثل: footer فيه class، وجوّاه address فيه id. انتبه للـ id والـ class لأن كل واحد له درجة.`,
  deeper: [
    `**id vs class.** Any element can have them. An [[id]] must be **unique** on the page (one element). A [[class]] can be shared by many elements, and one element can have several classes separated by spaces.`,
    { code: `<header class="navbar">
  <nav id="main-nav">
    <a href="#home">Home</a>
    <a href="#about">About</a>
  </nav>
</header>

<main>
  <section id="intro" class="card highlight">
    <h2>About me</h2>
    <p>I study <strong>Computer Science</strong>.</p>
    <img src="me.jpg" alt="My photo" width="100" height="100">
  </section>

  <ol>
    <li>HTML</li>
    <li>CSS</li>
  </ol>
</main>

<footer class="bottom">
  <address id="contact-info">Sakhir, Bahrain</address>
</footer>`, lang: 'html' },
    { try: { task: 'Add a [[<ul>]] with three courses, and give the section a second class called **wide**. Press Run.', html: `<header class="navbar">
  <nav id="main-nav"><a href="#home">Home</a> | <a href="#about">About</a></nav>
</header>
<main>
  <section id="intro" class="card">
    <h2>About me</h2>
    <p>I study <strong>Computer Science</strong>.</p>
  </section>
</main>
<footer class="bottom">
  <address id="contact-info">Sakhir, Bahrain</address>
</footer>`, css: `.card { border: 2px solid #2346d8; padding: 10px; }
.wide { width: 80%; }
footer { color: gray; }` } }
  ],
  points: [
    'Headings h1–h6 show the structure; use them in order.',
    '[[<a href>]] for links, [[<img src alt>]] for images (img is void).',
    '[[<ul>]] unordered, [[<ol>]] ordered, both contain [[<li>]].',
    'id = unique (one element); class = reusable, can hold several names: [[class="card highlight"]].',
    'Semantic: header, nav, main, section, article, aside, footer, figure, address.',
    'div = block box, span = inline box; neither has meaning.'
  ],
  exam: [
    '2024-25 forms: "Add a header tag inside body with class=navbar. Inside header, add a nav tag with id=main-nav", "Add a footer element with class=bottom and an address tag inside with id=contact-info".',
    '2025-26: "add an empty [[<div>]] with the id averageContainer and class average" (1 mark: both attributes on the same div).',
    'Older exams: "the tag/attribute used to define a numbered list using lower roman" → [[<ol type="i">]].'
  ],
  mistakes: [
    { lang: 'html', wrong: `<div id="box" id="main">`, right: `<div id="main" class="box">`, why: 'An element has only one id. Use class for extra names.' },
    { lang: 'html', wrong: `<div class="card" class="big">`, right: `<div class="card big">`, why: 'Several classes go in ONE class attribute, separated by spaces.' },
    { lang: 'html', wrong: `<img src="pic.jpg"></img>`, right: `<img src="pic.jpg" alt="Picture">`, why: 'img is void (no closing tag) and should have alt text.' }
  ],
  summary: [
    'HTML describes meaning: headings, paragraphs, lists, links, images.',
    'Semantic elements (header, nav, main, footer…) are boxes with meaning.',
    'id is unique, class is reusable; several classes go in one attribute.'
  ],
  recall: [
    { q: 'Which list shows numbers 1, 2, 3?', o: ['[[<ul>]]', '[[<ol>]]', '[[<dl>]]', '[[<li>]]'], a: 1, why: 'ol = ordered list.' },
    { q: 'How do you give one element two classes, card and big?', o: ['[[class="card" class="big"]]', '[[class="card, big"]]', '[[class="card big"]]', '[[class="card.big"]]'], a: 2, why: 'Classes are separated by spaces inside one class attribute.' },
    { q: 'Which element is semantic?', o: ['[[<div>]]', '[[<span>]]', '[[<footer>]]', '[[<b>]]'], a: 2, why: 'footer has a meaning (the bottom of the page or section).' }
  ],
  challenge: {
    task: `Exam style (2024-25, Form B2):
- A [[<header>]] with class **navbar**
- Inside it, a [[<nav>]] with id **main-nav** containing two links
- After the header, a [[<footer>]] with class **bottom** that contains an [[<address>]] with id **contact-info**`,
    tabs: ['html'],
    starter: { html: `<!-- write your body content here -->
` },
    checks: [
      { d: 'header.navbar exists', t: doc => !!doc.querySelector('header.navbar') },
      { d: 'nav#main-nav is inside the header', t: doc => !!doc.querySelector('header.navbar nav#main-nav') },
      { d: 'The nav has at least two links', t: doc => doc.querySelectorAll('nav#main-nav a[href]').length >= 2 },
      { d: 'footer.bottom exists', t: doc => !!doc.querySelector('footer.bottom') },
      { d: 'address#contact-info is inside the footer', t: doc => !!doc.querySelector('footer.bottom address#contact-info') }
    ],
    solution: { html: `<header class="navbar">
  <nav id="main-nav">
    <a href="#home">Home</a>
    <a href="#contact">Contact</a>
  </nav>
</header>

<footer class="bottom">
  <address id="contact-info">University of Bahrain, Sakhir</address>
</footer>` }
  }
});

/* =========================== MODULE 2: TABLES & FORMS =========================== */
LESSONS.push({
  id: 'tables', module: 'forms', title: 'Tables: thead, tbody, rowspan & colspan',
  big: `Tables show data in rows and columns: grades, prices, schedules. In this course tables matter twice: you write them in HTML (Q1), and later your JavaScript **adds rows** to them (Q2). Knowing the structure well makes the JS part easy.`,
  simple: `A table is built **row by row**:
- [[<table>]] holds everything.
- [[<tr>]] = table **row**.
- [[<th>]] = header cell (bold and centred by default).
- [[<td>]] = normal data cell.

Rows can be grouped: [[<thead>]] for the header rows, [[<tbody>]] for the data rows, [[<tfoot>]] for totals. A [[<caption>]] gives the table a title.

To merge cells: [[colspan="2"]] makes a cell **wider** (across 2 columns). [[rowspan="2"]] makes a cell **taller** (down 2 rows).`,
  ar: `<strong>بالعربي:</strong> الجدول يتبنى صف صف (tr)، وكل صف فيه خلايا (td أو th). colspan يدمج خلايا جنب بعض في نفس الصف، و rowspan يدمج خلايا فوق بعض. والـ tbody الفاضي مع id هو المكان اللي الجافاسكربت بتحط فيه الصفوف بعدين.`,
  deeper: [
    `This is the exact table from the 2025-26 midterm: a header row in [[<thead>]] and an **empty** [[<tbody>]] with an id, ready for JavaScript.`,
    { code: `<table id="gradeTable">
  <thead>
    <tr>
      <th>Student ID</th>
      <th>Grade</th>
    </tr>
  </thead>
  <tbody id="gradeTbody">
  </tbody>
</table>`, lang: 'html' },
    `**Merging cells.** When a cell has [[rowspan="2"]], the row below has one **fewer** cell, because that space is already taken. Count the cells of every row; they must add up to the number of columns.`,
    { try: { task: 'Make cell A span 2 rows, and make the bottom cell span 2 columns. Watch how the other rows lose cells.', html: `<table border="1" width="300">
  <tr>
    <td rowspan="2">A</td>
    <th>B</th>
    <th>C</th>
  </tr>
  <tr>
    <td>D</td>
    <td>E</td>
  </tr>
  <tr>
    <td colspan="3">F (full width)</td>
  </tr>
</table>`, css: `td, th { padding: 8px; text-align: center; }
th { background: #e6e6fa; }` } },
    `Old attributes like [[border="1"]] and [[width="300"]] still work, but in the 2024-25 exam the styling was asked in **internal CSS**: [[table { width: 400px; border: 2px solid purple; }]] and [[th, td { padding: 15px; }]].`
  ],
  points: [
    'Structure: table → tr → th/td. Never put text directly inside tr.',
    'th = header cell, td = data cell.',
    'thead, tbody, tfoot group rows; each still contains tr.',
    'colspan = across columns (wider), rowspan = down rows (taller).',
    'With rowspan, the rows below need fewer cells.',
    'Give tbody an id when JavaScript will add rows: [[<tbody id="gradeTbody">]].'
  ],
  exam: [
    '2025-26: "a [[<table>]] with id gradeTable… a [[<thead>]] with a row containing two headers (th)… an empty [[<tbody>]] with the id gradeTbody" = 6 marks.',
    'Older exams: draw this table from a picture using rowspan/colspan (6–8 marks).',
    'MCQ: "The valid tag/attribute used to merge three table cells from different rows" → [[<td rowspan="3">]].'
  ],
  mistakes: [
    { lang: 'html', wrong: `<thead>
  <th>Name</th>
  <th>Email</th>
</thead>`, right: `<thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
  </tr>
</thead>`, why: 'Cells always live inside a tr, even inside thead. The tr is worth a mark.' },
    { lang: 'html', wrong: `<tr colspan="2">`, right: `<td colspan="2">`, why: 'colspan and rowspan go on cells (td/th), never on tr.' }
  ],
  summary: [
    'table → (thead/tbody) → tr → th/td.',
    'colspan = wider, rowspan = taller, on td/th only.',
    'An empty tbody with an id is where JS adds rows later.'
  ],
  recall: [
    { q: 'Which attribute merges a cell across 3 columns of the same row?', o: ['[[rowspan="3"]]', '[[colspan="3"]]', '[[merge="3"]]', '[[span="3"]]'], a: 1, why: 'colspan = columns = horizontal.' },
    { q: 'Which element is the header cell?', o: ['[[<td>]]', '[[<th>]]', '[[<thead>]]', '[[<tr>]]'], a: 1, why: 'th is a cell; thead is a group of rows.' },
    { q: 'A cell in row 1 has [[rowspan="2"]] in a 3-column table. How many cells does row 2 need?', o: ['1', '2', '3', '4'], a: 1, why: 'One column of row 2 is already taken by the tall cell, so 3 − 1 = 2.' }
  ],
  challenge: {
    task: `Build the 2025-26 table:
- [[<table>]] with id **gradeTable**
- a [[<thead>]] with one row and two header cells: **Student ID** and **Grade**
- an empty [[<tbody>]] with id **gradeTbody**`,
    tabs: ['html'],
    starter: { html: `` },
    checks: [
      { d: 'table#gradeTable', t: doc => !!doc.querySelector('table#gradeTable') },
      { d: 'thead with a tr', t: doc => !!doc.querySelector('#gradeTable thead tr') },
      { d: 'Header cell "Student ID"', t: doc => [...doc.querySelectorAll('#gradeTable thead th')].some(th => /student\s*id/i.test(th.textContent)) },
      { d: 'Header cell "Grade"', t: doc => [...doc.querySelectorAll('#gradeTable thead th')].some(th => /^\s*grade\s*$/i.test(th.textContent)) },
      { d: 'Empty tbody#gradeTbody', t: doc => { const b = doc.querySelector('#gradeTable tbody#gradeTbody'); return !!b && b.children.length === 0; } }
    ],
    solution: { html: `<table id="gradeTable">
  <thead>
    <tr>
      <th>Student ID</th>
      <th>Grade</th>
    </tr>
  </thead>
  <tbody id="gradeTbody"></tbody>
</table>` }
  }
});

LESSONS.push({
  id: 'forms', module: 'forms', title: 'Forms, inputs & buttons',
  big: `Forms are how users give data to a page: login, search, adding a grade. The HTML form decides **what** the user can type and **which rules** the browser checks before anything is sent. In Q1 of the exam, the form is the biggest part.`,
  simple: `A form is a box of controls:
- [[<form id="gradeForm">]] holds them. ([[action]] and [[method]] tell where to send data; with JavaScript we usually stop the sending.)
- [[<input>]] is the most common control. Its [[type]] changes it: text, number, email, password, checkbox, radio, date.
- [[<label for="x">]] is the text next to an input; [[for]] matches the input's [[id]].
- [[<select>]] with [[<option>]]s is a drop-down; [[<textarea>]] is multi-line text.
- [[<fieldset>]] groups controls, with a [[<legend>]] title.

Useful attributes: [[id]], [[name]], [[placeholder]], [[value]], [[required]] (cannot be empty), [[min]] and [[max]] (for numbers).`,
  ar: `<strong>بالعربي:</strong> أهم شي في الامتحان الـ attributes: id و required و type="number" و min و max. وفيه نوعين أزرار: type="submit" يرسل الفورم، و type="button" زر عادي ما يرسل شي (نستعمله مع JavaScript click).`,
  deeper: [
    `**Two kinds of buttons.** Inside a form, a [[<button>]] is a **submit** button by default. To make a button that only runs JavaScript (like "Calculate Average"), write [[type="button"]].`,
    { code: `<form id="gradeForm">
  <label for="studentId">Student ID</label>
  <input type="text" id="studentId" required>

  <label for="studentGrade">Grade</label>
  <input type="number" id="studentGrade" min="0" max="100" required>

  <button id="addGradeBtn" type="submit">Add Grade</button>
  <button id="calcAvgBtn" type="button">Calculate Average</button>
</form>`, lang: 'html' },
    `**Built-in validation.** With [[required]], [[min]] and [[max]], the browser refuses to submit wrong values and shows a message. Try it: leave the grade empty, or type 150, and press Add Grade.`,
    { try: { task: 'Submit with an empty grade, then with 150, then with 85. Then add a [[<select>]] for the semester.', html: `<form id="gradeForm">
  <label for="studentId">Student ID</label>
  <input type="text" id="studentId" placeholder="20231234" required>

  <label for="studentGrade">Grade</label>
  <input type="number" id="studentGrade" min="0" max="100" required>

  <button id="addGradeBtn" type="submit">Add Grade</button>
  <button id="calcAvgBtn" type="button">Calculate Average</button>
</form>`, css: `form { display: grid; gap: 6px; max-width: 260px; }
input { padding: 5px 10px; border: 1px solid black; }`, js: `document.getElementById('gradeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('Form is valid, it was submitted');
});` } },
    `Other input types you should recognise: [[email]], [[password]], [[checkbox]], [[radio]] (radios with the same [[name]] form a group, only one can be chosen), [[date]], [[color]], [[range]], [[file]], [[hidden]].`
  ],
  points: [
    'Every control needs an id if JavaScript will read it.',
    '[[type="number" min="0" max="100"]] limits the number.',
    '[[required]] is a boolean attribute: just write it, no value needed.',
    'Button default inside a form is submit. Use [[type="button"]] for JS-only buttons.',
    'label for="id" connects the text to the input.',
    'Radio buttons with the same name are one group.'
  ],
  exam: [
    '2025-26 Q1: input with id studentId and required (1 mark); input id studentGrade, type number, min 0, max 100, required (1 mark).',
    '"A [[<button>]] with an id of addGradeBtn and type=submit" (1) and "a [[<button>]] with id calcAvgBtn and type=button" (1).',
    '2024-25: "Add a form with class contact-form; inside it a fieldset with id user-info".'
  ],
  mistakes: [
    { lang: 'html', wrong: `<input type="number" min=0 max=100 required="no">`, right: `<input type="number" min="0" max="100" required>`, why: 'Quote attribute values. required has no "no" value: if it is there, the field is required.' },
    { lang: 'html', wrong: `<button id="calcAvgBtn">Calculate Average</button>`, right: `<button id="calcAvgBtn" type="button">Calculate Average</button>`, why: 'Without type="button" it submits the form (and reloads the page).' },
    { lang: 'html', wrong: `<input type="text" id="studentId" />Student ID</input>`, right: `<label for="studentId">Student ID</label>
<input type="text" id="studentId">`, why: 'input is void; text next to it goes in a label.' }
  ],
  summary: [
    'form > inputs with id, type and rules (required, min, max).',
    'type="submit" sends the form; type="button" only runs JS.',
    'label for, select/option, textarea, fieldset/legend complete the set.'
  ],
  recall: [
    { q: 'Which input accepts only numbers between 0 and 100 and must be filled?', o: ['[[<input type="text" max="100">]]', '[[<input type="number" min="0" max="100" required>]]', '[[<input number="0-100" required>]]', '[[<input type="range" required>]]'], a: 1, why: 'type number + min + max + required.' },
    { q: 'What does a [[<button>]] inside a form do by default?', o: ['Nothing', 'Submits the form', 'Resets the form', 'Opens a new page'], a: 1, why: 'The default type is submit.' },
    { q: 'Two radio buttons belong to the same group when they share the same…', o: ['id', 'class', 'name', 'value'], a: 2, why: 'Same name = one group, only one can be checked.' }
  ],
  challenge: {
    task: `Write the 2025-26 form:
- [[<form>]] with id **gradeForm**
- text input id **studentId**, required
- number input id **studentGrade**, min **0**, max **100**, required
- button id **addGradeBtn**, type submit, text "Add Grade"
- button id **calcAvgBtn**, type button, text "Calculate Average"`,
    tabs: ['html'],
    starter: { html: `` },
    checks: [
      { d: 'form#gradeForm', t: doc => !!doc.querySelector('form#gradeForm') },
      { d: '#studentId is inside the form and required', t: doc => { const i = doc.querySelector('#gradeForm #studentId'); return !!i && i.required; } },
      { d: '#studentGrade: type number, min 0, max 100, required', t: doc => { const i = doc.querySelector('#gradeForm #studentGrade'); return !!i && i.type === 'number' && i.getAttribute('min') === '0' && i.getAttribute('max') === '100' && i.required; } },
      { d: '#addGradeBtn is a submit button with text "Add Grade"', t: doc => { const b = doc.querySelector('#addGradeBtn'); return !!b && b.type === 'submit' && /add grade/i.test(b.textContent || b.value); } },
      { d: '#calcAvgBtn is type="button" with text "Calculate Average"', t: doc => { const b = doc.querySelector('#calcAvgBtn'); return !!b && b.getAttribute('type') === 'button' && /calculate average/i.test(b.textContent || b.value); } }
    ],
    solution: { html: `<form id="gradeForm">
  <input type="text" id="studentId" required>
  <input type="number" id="studentGrade" min="0" max="100" required>
  <button id="addGradeBtn" type="submit">Add Grade</button>
  <button id="calcAvgBtn" type="button">Calculate Average</button>
</form>` }
  }
});

/* =========================== MODULE 3: CSS =========================== */
LESSONS.push({
  id: 'css-selectors', module: 'css', title: 'Where CSS goes & basic selectors',
  big: `CSS is a list of rules. Each rule says **which elements** (the selector) and **what to change** (declarations). Picking the right elements is the whole skill: the exam gives you a sentence like "all inputs inside a form" and you must write the selector.`,
  simple: `A rule looks like this: [[selector { property: value; }]]

Three places to write CSS:
- **Inline**: [[<p style="color:red">]]. Only that one element.
- **Embedded / internal**: a [[<style>]] block in the head. Only that page.
- **External**: a .css file linked with [[<link>]]. Many pages share it. This is the preferred way.

Basic selectors:
- [[p]] → every p element.
- [[.average]] → every element with class average.
- [[#studentId]] → the element with id studentId.
- [[div.average]] → only **div** elements that have class average (no space!).
- [[h1, h2, h3]] → a group: the same rule for all three.
- [[*]] → every element.`,
  ar: `<strong>بالعربي:</strong> النقطة = class، والشباك # = id. وانتبه: div.average بدون مسافة يعني "div عنده class اسمه average". أما div .average بمسافة يعني "عنصر عنده average داخل div". المسافة تغير المعنى كله.`,
  deeper: [
    `**Attribute selectors** pick elements by an attribute. The exam used [[input[type="number"]]]: every input whose type is number.`,
    { code: `input[type="number"] { color: #ff0000; }   /* number inputs only */
a[href]               { color: green; }     /* links that have an href */
input[required]       { border-color: red; }`, lang: 'css' },
    `**Pseudo-classes** select a state: [[a:hover]] (mouse over), [[a:visited]], [[input:focus]], [[li:first-child]], [[li:nth-child(2)]], [[:not(.x)]]. **Pseudo-elements** select a part: [[p::first-line]], [[::before]], [[::after]].`,
    { try: { task: 'Make every number input red, the div with class average bold with a lightblue background, and links green on hover.', html: `<form>
  <input type="text" value="20231234">
  <input type="number" value="85">
</form>
<div class="average">Average Grade: 85</div>
<p class="average">I am a p with class average (should NOT turn blue)</p>
<a href="#">A link</a>`, css: `input[type="number"] {

}

div.average {

}

a:hover {

}` } }
  ],
  points: [
    'Rule = selector + { property: value; }. Every declaration ends with ;',
    '. = class, # = id, plain word = element.',
    '[[div.average]] (no space) = a div with that class.',
    'Comma = group: [[th, td { … }]].',
    'Attribute selector: [[input[type="number"]]].',
    'External CSS is preferred: one file styles many pages.'
  ],
  exam: [
    '2025-26 Q1 CSS: "selects any [[<div>]] element that has been given the class average… font weight bold and background color lightblue" → [[div.average { font-weight: bold; background-color: lightblue; }]].',
    '"selects all [[<input>]] elements of type=number and makes their color #ff0000" → [[input[type="number"] { color: #ff0000; }]].',
    'MCQ: "The style sheet that changes the appearance of all pages at once" → external.'
  ],
  mistakes: [
    { lang: 'css', wrong: `div .average { font-weight: bold; }`, right: `div.average { font-weight: bold; }`, why: 'With a space it means an .average element INSIDE a div, not the div itself.' },
    { lang: 'css', wrong: `input[type=number] { color: #ff0000 }`, right: `input[type="number"] { color: #ff0000; }`, why: 'It works without quotes, but quotes and the semicolon are the safe exam form.' },
    { lang: 'css', wrong: `.studentId { … }   /* for id="studentId" */`, right: `#studentId { … }`, why: 'An id needs #, a class needs a dot.' }
  ],
  summary: [
    'Inline < embedded < external (external is the professional choice).',
    'element, .class, #id, element.class, group with commas.',
    'Attribute [type="number"], pseudo-class :hover, pseudo-element ::before.'
  ],
  recall: [
    { q: 'Which selector matches only div elements with class average?', o: ['[[div .average]]', '[[div.average]]', '[[.div.average]]', '[[div#average]]'], a: 1, why: 'No space between element and class.' },
    { q: 'Which selector matches inputs whose type is number?', o: ['[[input.number]]', '[[input#number]]', '[[input[type="number"]]]', '[[input:number]]'], a: 2, why: 'Attribute selector in square brackets.' },
    { q: 'Which way of adding CSS can style many pages at once?', o: ['Inline', 'Embedded', 'External', 'All of them'], a: 2, why: 'One external file linked from every page.' }
  ],
  challenge: {
    task: `Write the three exam rules in the CSS tab:
1. [[input]] elements of type number → color **#ff0000**
2. [[div]] elements with class **average** → bold and background **lightblue**
3. All [[th]] and [[td]] → padding **10px** (one rule using a comma)`,
    tabs: ['css', 'html'],
    starter: { html: `<input type="number" value="77">
<input type="text" value="abc">
<div class="average">Average Grade: 85</div>
<table><tr><th>H</th><td>D</td></tr></table>`, css: `` },
    checks: [
      { d: 'Number input text is red (#ff0000)', t: (doc, w) => w.getComputedStyle(doc.querySelector('input[type=number]')).color === 'rgb(255, 0, 0)' },
      { d: 'Text input is NOT red', t: (doc, w) => w.getComputedStyle(doc.querySelector('input[type=text]')).color !== 'rgb(255, 0, 0)' },
      { d: 'div.average is bold', t: (doc, w) => +w.getComputedStyle(doc.querySelector('div.average')).fontWeight >= 700 },
      { d: 'div.average background is lightblue', t: (doc, w) => w.getComputedStyle(doc.querySelector('div.average')).backgroundColor === 'rgb(173, 216, 230)' },
      { d: 'th and td have 10px padding (one grouped rule)', t: (doc, w, s) => ['th', 'td'].every(t => w.getComputedStyle(doc.querySelector(t)).paddingTop === '10px') && /th\s*,\s*td|td\s*,\s*th/.test(s.css) }
    ],
    solution: { css: `input[type="number"] {
  color: #ff0000;
}

div.average {
  font-weight: bold;
  background-color: lightblue;
}

th, td {
  padding: 10px;
}` }
  }
});

LESSONS.push({
  id: 'combinators', module: 'css', title: 'Combinators: space, >, + and ~',
  big: `Combinators select elements by **where they are** compared to other elements: inside, directly inside, right after, or anywhere after. They appear in every recent midterm, both in writing rules ([[form input]]) and in "which colour wins?" puzzles.`,
  simple: `Imagine a family tree.
- **Descendant** [[A B]] (a space): any B **inside** A, at any depth (child, grandchild…).
- **Child** [[A > B]]: B that is a **direct** child of A.
- **Adjacent sibling** [[A + B]]: the B that comes **immediately after** A, with the same parent.
- **General sibling** [[A ~ B]]: **every** B that comes after A, with the same parent.

Siblings only look **forward** (to later elements), never backward.`,
  ar: `<strong>بالعربي:</strong> المسافة = داخل (أي عمق). > = ولد مباشر. + = الأخ اللي بعده على طول. ~ = كل الإخوان اللي بعده. والإخوان لازم يكون لهم نفس الأب، والاختيار دايمًا للي بعد، مو للي قبل.`,
  deeper: [
    `Use the live demo: each rule colours different elements. Change the selectors and predict before you press Run.`,
    { try: { task: 'Predict which paragraphs turn which colour, then Run. Change [[.title + p]] to [[.title ~ p]] and run again.', html: `<div class="card">
  <h2 class="title">Header</h2>
  <p>First paragraph</p>
  <p>Second paragraph</p>
  <section>
    <p>Nested paragraph</p>
  </section>
</div>`, css: `.card p      { background: #ffe8a3; }  /* descendant: all 3 p */
.card > p    { border-left: 4px solid gray; } /* direct children only */
.title + p   { color: red; }               /* only First paragraph */` } },
    `**The 2025-26 exam rule** was a descendant selector: "selects all [[<input>]] elements that are inside a [[<form>]] element".`,
    { code: `form input {
  padding: 5px 10px;          /* 5px top/bottom, 10px left/right */
  border: 1px solid black;
}`, lang: 'css' },
    `**Watch the direction.** [[input + .border]] means "an element with class border right after an input", not the input itself. In a puzzle, the element being styled is always the **last** part of the selector.`
  ],
  points: [
    'Space = descendant (any depth).',
    '> = direct child only.',
    '+ = the very next sibling.',
    '~ = all following siblings.',
    'The styled element is the LAST simple selector in the chain.',
    'Siblings must share the same parent and come after.'
  ],
  exam: [
    '2025-26: "a CSS rule that selects all input elements inside a form… 5px padding top/bottom and 10px left/right, 1px solid black border" (2 marks).',
    '2024-25 (all forms): "What border/color will be applied to …?" with rules like [[.card p]], [[.title + p]], [[p .title]], [[.title ~ p]], [[input > .border]].',
    'See Practice → Specificity puzzles for many more of these.'
  ],
  mistakes: [
    { lang: 'css', wrong: `/* "inputs inside a form" */
form, input { padding: 5px 10px; }`, right: `form input { padding: 5px 10px; }`, why: 'A comma means form AND input separately. A space means input inside form.' },
    { lang: 'css', wrong: `/* thinks this styles the h2 */
.title + p { color: red; }`, right: `/* it styles the p right after .title */
.title + p { color: red; }`, why: 'The last part (p) is what gets styled.' }
  ],
  summary: [
    'A B inside · A > B child · A + B next sibling · A ~ B all next siblings.',
    'The last part of the selector is the element that changes.',
    'Siblings: same parent, only forward.'
  ],
  recall: [
    { q: 'Which selector matches inputs anywhere inside a form?', o: ['[[form > input]]', '[[form input]]', '[[form + input]]', '[[form, input]]'], a: 1, why: 'Space = descendant at any depth.' },
    { q: '[[h2 + p]] selects…', o: ['All p after h2', 'The p immediately after an h2', 'The h2 before a p', 'p inside h2'], a: 1, why: '+ is the adjacent (very next) sibling.' },
    { q: 'In [[.menu a]], which element gets the style?', o: ['.menu', 'a', 'Both', 'Neither'], a: 1, why: 'The last part of the selector is styled.' }
  ],
  challenge: {
    task: `Using combinators only (no new classes in the HTML):
1. All inputs inside the form: padding **5px 10px**, border **1px solid black**
2. Only the **first** [[p]] right after the [[h2]]: color **red**
3. Only [[li]] that are **direct** children of [[ul.menu]]: border-bottom **1px solid gray**`,
    tabs: ['css', 'html'],
    starter: { html: `<form id="gradeForm">
  <input id="a" type="text">
  <div><input id="b" type="number"></div>
</form>
<input id="outside" type="text">
<h2>Title</h2>
<p id="p1">First</p>
<p id="p2">Second</p>
<ul class="menu">
  <li id="l1">Home
    <ul><li id="l2">Nested</li></ul>
  </li>
</ul>`, css: `` },
    checks: [
      { d: 'Both inputs inside the form have padding 5px 10px', t: (d, w) => ['a', 'b'].every(id => { const s = w.getComputedStyle(d.getElementById(id)); return s.paddingTop === '5px' && s.paddingLeft === '10px'; }) },
      { d: 'Inputs inside the form have a 1px solid black border', t: (d, w) => { const s = w.getComputedStyle(d.getElementById('b')); return s.borderTopWidth === '1px' && s.borderTopStyle === 'solid' && s.borderTopColor === 'rgb(0, 0, 0)'; } },
      { d: 'The input outside the form is not changed', t: (d, w) => w.getComputedStyle(d.getElementById('outside')).paddingLeft !== '10px' },
      { d: 'First p after h2 is red, second is not', t: (d, w) => w.getComputedStyle(d.getElementById('p1')).color === 'rgb(255, 0, 0)' && w.getComputedStyle(d.getElementById('p2')).color !== 'rgb(255, 0, 0)' },
      { d: 'Only the direct li of ul.menu has the bottom border', t: (d, w) => w.getComputedStyle(d.getElementById('l1')).borderBottomStyle === 'solid' && w.getComputedStyle(d.getElementById('l2')).borderBottomStyle === 'none' }
    ],
    solution: { css: `form input {
  padding: 5px 10px;
  border: 1px solid black;
}

h2 + p {
  color: red;
}

ul.menu > li {
  border-bottom: 1px solid gray;
}` }
  }
});

LESSONS.push({
  id: 'specificity', module: 'css', title: 'Cascade & specificity: which rule wins?',
  big: `Often two rules target the same element with different values. The browser needs a way to decide. That system is the **cascade**, and its main tool is **specificity**. The 2024-25 midterm had two puzzle questions on exactly this.`,
  simple: `When rules conflict, the browser asks, in order:

1. **Does the rule even match?** A rule that does not select the element does not count. (Most puzzle mistakes are here.)
2. **Which one is more specific?** Count a score of three numbers **(ids, classes, elements)**:
- each [[#id]] → (1,0,0)
- each [[.class]], [[[attribute]]] or [[:pseudo-class]] → (0,1,0)
- each element like [[p]] or [[div]] → (0,0,1)
Compare from left to right: one id beats any number of classes.
3. **Same score?** The rule written **later** wins.

Inline [[style=""]] beats all of these. [[!important]] beats even inline (avoid it).`,
  ar: `<strong>بالعربي:</strong> أول شي تأكد إن القاعدة أصلًا تنطبق على العنصر. بعدين احسب (id, class, element): id أقوى من أي عدد classes. وإذا تعادلوا، اللي مكتوب آخر شي يفوز. معظم الطلاب يغلطون في الخطوة الأولى.`,
  deeper: [
    `**Worked example (2024-25 midterm, Form B2).**`,
    { code: `.card p    { color: gray; }    /* (0,1,1) */
.title + p { color: yellow; }  /* (0,1,1) */
p .title   { color: blue; }    /* (0,1,1) a .title INSIDE a p */
.title ~ p { color: red; }     /* (0,1,1) */
p + .title { color: purple; }  /* (0,1,1) a .title right after a p */`, lang: 'css' },
    { code: `<div class="card">
  <h2 class="title">Header</h2>
  <p>First paragraph</p>
  <p>Second paragraph</p>
</div>`, lang: 'html' },
    `**First paragraph:** matches [[.card p]], [[.title + p]] and [[.title ~ p]]. [[p .title]] and [[p + .title]] style a .title element, so they do not match a p. All three matching rules score (0,1,1), a tie, so the **last** one wins: [[.title ~ p]] → **red**.

**Second paragraph:** matches [[.card p]] and [[.title ~ p]] (not [[+]], it is not right after the h2). Tie again → last → **red**.`,
    { try: { task: 'Add [[#main p { color: green; }]] at the TOP of the CSS. Does it still win? Why?', html: `<div class="card" id="main">
  <h2 class="title">Header</h2>
  <p>First paragraph</p>
  <p>Second paragraph</p>
</div>`, css: `.card p    { color: gray; }
.title + p { color: yellow; }
p .title   { color: blue; }
.title ~ p { color: red; }
p + .title { color: purple; }` } },
    `Answer: yes. [[#main p]] scores (1,0,1). An id beats any number of classes, so its position does not matter.

**Inheritance** is different: some properties like [[color]] and [[font-family]] pass from parent to children when nothing targets the child. Any rule that matches the child beats an inherited value.`
  ],
  points: [
    'Step 1: throw away rules that do not match the element.',
    'Score = (ids, classes/attributes/pseudo-classes, elements).',
    'Compare left to right; one id beats 10 classes.',
    'Tie → the later rule wins.',
    'Inline style beats selectors; !important beats inline.',
    'Inherited values lose to any matching rule.'
  ],
  exam: [
    '2024-25 Form A/C: rules [[.form input]], [[input > .border]], [[input .border]], [[.border ~ input]], [[input + .border]]. Nothing has class border, so only [[.form input]] matches both inputs → 1px solid.',
    '2024-25 Form B: [[.menu a]] (0,1,1) gray, [[div .dropdown]] (0,1,1) yellow, [[a .dropdown]] blue (no match), [[.dropdown ~ a]] (0,1,1) red, [[a + .dropdown]] purple (no match). "Products" has class dropdown → yellow. "Services" comes after .dropdown → red.',
    'Older MCQ: external h3 blue, internal h3 red, inline yellow → yellow (inline wins).'
  ],
  mistakes: [
    { lang: 'css', wrong: `/* "p .title is (0,1,1), it is last, so the p is blue" */`, right: `/* p .title selects a .title INSIDE a p.
   It never matches the p itself. */`, why: 'Check the match first. Specificity only compares rules that match.' },
    { lang: 'css', wrong: `/* "three classes beat one id" */
.a.b.c { color: red; }  #x { color: blue; }`, right: `/* #x (1,0,0) beats .a.b.c (0,3,0) → blue */`, why: 'Compare the id column first.' }
  ],
  summary: [
    'Match first, then specificity (id, class, element), then order.',
    'id > class > element; a tie goes to the later rule.',
    'Inline style beats every selector.'
  ],
  recall: [
    { q: 'Which has the highest specificity?', o: ['[[div p span]]', '[[.box .item]]', '[[#menu a]]', '[[ul li a.link]]'], a: 2, why: '#menu a = (1,0,1); an id beats everything else here.' },
    { q: 'Two matching rules both score (0,1,1). Which wins?', o: ['The first one', 'The last one', 'Neither, the default is used', 'The shorter one'], a: 1, why: 'On a tie, the later rule wins.' },
    { q: 'Does [[input + .border]] style an input?', o: ['Yes, any input', 'Yes, the input before .border', 'No, it styles a .border element that comes right after an input', 'No, it styles nothing'], a: 2, why: 'The last part (.border) is the element being styled.' }
  ],
  challenge: {
    task: `Without changing the HTML, make the paragraph **green** by adding ONE rule at the **top** of the CSS (it must win even though it is first).`,
    tabs: ['css', 'html'],
    starter: { html: `<div id="box" class="card">
  <p class="text">Make me green</p>
</div>`, css: `/* add your rule on the next line */


.card .text { color: red; }
div p.text { color: orange; }` },
    checks: [
      { d: 'The paragraph is green', t: (d, w) => w.getComputedStyle(d.querySelector('p')).color === 'rgb(0, 128, 0)' },
      { d: 'You did not use !important or inline style', t: (d, w, s) => !/!important/.test(s.css) && !/style\s*=/.test(s.html) },
      { d: 'The original red and orange rules are still there', t: (d, w, s) => /\.card\s+\.text\s*\{\s*color:\s*red/.test(s.css) && /div\s+p\.text\s*\{\s*color:\s*orange/.test(s.css) },
      { d: 'Your rule is written before the others', t: (d, w, s) => { const i = s.css.search(/green/); return i > -1 && i < s.css.search(/\.card\s+\.text/); } }
    ],
    solution: { css: `#box p { color: green; }   /* (1,0,1) beats (0,2,0) and (0,1,2) */

.card .text { color: red; }
div p.text { color: orange; }` }
  }
});

LESSONS.push({
  id: 'box-model', module: 'css', title: 'Box model, units, colours & text',
  big: `Every element is a rectangle. CSS controls the space **inside** it, its **border**, and the space **around** it. Add units, colours and text effects, and you can read every MCQ about basic styling in past exams.`,
  simple: `From the inside out:
- **content**: the text or image
- **padding**: space between the content and the border (inside, it shows the background)
- **border**: the line around the box
- **margin**: space outside the border, between boxes

Shorthand order is **clockwise from the top**: [[padding: 5px 10px 15px 20px]] = top right bottom left. With two values, [[padding: 5px 10px]] = top/bottom 5px, left/right 10px.

[[width]] normally sets only the **content** width. With [[box-sizing: border-box]], width includes padding and border, which is much easier.`,
  ar: `<strong>بالعربي:</strong> padding داخل الصندوق (بين الكلام والبوردر)، و margin برّا الصندوق. وفي الاختصار: قيمتين تعني فوق/تحت ثم يمين/يسار. وحدة rem تكبر وتصغر مع إعدادات الخط عند المستخدم، فهي الأفضل للـ accessibility.`,
  deeper: [
    { try: { task: 'Change padding, border and margin and watch the box. Then switch [[box-sizing]] to [[border-box]] and compare the width.', html: `<div class="box">Content</div>
<div class="box">Second box</div>`, css: `.box {
  width: 200px;
  padding: 20px 40px;
  border: 5px solid #2346d8;
  margin: 10px 0;
  background-color: lightblue;
  box-sizing: content-box;   /* try border-box */
}` } },
    `**Units.** [[px]] is fixed. [[%]] is relative to the parent. [[em]] is relative to the element's font size. [[rem]] is relative to the **root** (html) font size, so when a user with weak vision increases the browser font size, rem-based sizes grow too. Exam MCQ: best for accessibility → **rem**. [[vw]]/[[vh]] are % of the viewport.

**Colours.** Names ([[lightblue]]), hex ([[#ff0000]]), [[rgb(255, 0, 0)]], and [[rgba(r, g, b, alpha)]] where alpha goes from 0 (fully transparent) to 1 (solid). Lower alpha = more transparent.`,
    { code: `h1 {
  text-shadow: 20px -20px 5px #af12cd; /* x y blur colour: right 20, UP 20 */
  text-transform: uppercase;          /* capitalize, lowercase */
  letter-spacing: 2px;
  text-decoration: underline;
  font: italic bold 18pt Arial;       /* or font-family / font-size / font-weight */
}
body {
  background-image: url("small.jpg");
  background-repeat: repeat-x;        /* repeat, repeat-y, no-repeat */
  background-position: top;           /* keep the top visible */
}`, lang: 'css' }
  ],
  points: [
    'content → padding → border → margin.',
    'Two-value shorthand: vertical then horizontal. Four values: top right bottom left.',
    'border shorthand: width style colour, e.g. [[1px solid black]].',
    'box-sizing: border-box makes width include padding and border.',
    'rem = accessible font sizes; rgba alpha 0 = invisible, 1 = solid.',
    'text-shadow x y blur colour: negative y = up, positive x = right.'
  ],
  exam: [
    'MCQ: "inner space between the content and border" → padding.',
    'MCQ: "best unit for people with vision impairment" → rem.',
    'MCQ: "shadow positioned top-right of the text" → [[text-shadow: 20px -20px 5px …]].',
    'MCQ: "highest transparent background" → the rgba with the smallest alpha, e.g. [[rgba(22,11,33,0.4)]].',
    'MCQ: "background image repeated horizontally" → [[background-repeat: repeat-x]].'
  ],
  mistakes: [
    { lang: 'css', wrong: `padding: 5px, 10px;`, right: `padding: 5px 10px;`, why: 'Values are separated by spaces, not commas.' },
    { lang: 'css', wrong: `border: 1px black;`, right: `border: 1px solid black;`, why: 'Without a style (solid, dashed…) no border is drawn.' },
    { lang: 'css', wrong: `background-color: rgba(22, 11, 33, transparent);`, right: `background-color: rgba(22, 11, 33, 0.4);`, why: 'Alpha is a number between 0 and 1.' }
  ],
  summary: [
    'Padding inside, margin outside, border between.',
    'Shorthand goes clockwise from the top.',
    'rem for accessibility; rgba alpha controls transparency.'
  ],
  recall: [
    { q: '[[padding: 5px 10px]] means…', o: ['top 5, right 10, bottom 0, left 0', 'top/bottom 5px, left/right 10px', 'left/right 5px, top/bottom 10px', 'all sides 15px'], a: 1, why: 'Two values: vertical, then horizontal.' },
    { q: 'Which background is the most transparent?', o: ['[[rgba(0,0,0,1)]]', '[[rgba(0,0,0,0.8)]]', '[[rgba(0,0,0,0.2)]]', '[[rgb(0,0,0)]]'], a: 2, why: 'The smallest alpha is the most transparent.' },
    { q: 'Space outside the border, between two boxes, is…', o: ['padding', 'margin', 'spacing', 'outline'], a: 1, why: 'margin is outside the border.' }
  ],
  challenge: {
    task: `Style the [[.card]]:
- padding: **15px** top/bottom and **25px** left/right (one line)
- border: **2px solid purple**
- margin-bottom: **20px**
- background: black with **50%** transparency using rgba
- the [[h1]] text in uppercase with a shadow **3px right and 3px up**, blur 2px, colour gray`,
    tabs: ['css', 'html'],
    starter: { html: `<div class="card">
  <h1>Hello</h1>
</div>`, css: `.card {

}

h1 {

}` },
    checks: [
      { d: 'padding 15px 25px', t: (d, w) => { const s = w.getComputedStyle(d.querySelector('.card')); return s.paddingTop === '15px' && s.paddingBottom === '15px' && s.paddingLeft === '25px' && s.paddingRight === '25px'; } },
      { d: 'border 2px solid purple', t: (d, w) => { const s = w.getComputedStyle(d.querySelector('.card')); return s.borderTopWidth === '2px' && s.borderTopStyle === 'solid' && s.borderTopColor === 'rgb(128, 0, 128)'; } },
      { d: 'margin-bottom 20px', t: (d, w) => w.getComputedStyle(d.querySelector('.card')).marginBottom === '20px' },
      { d: 'Background rgba(0, 0, 0, 0.5)', t: (d, w) => w.getComputedStyle(d.querySelector('.card')).backgroundColor.replace(/\s/g, '') === 'rgba(0,0,0,0.5)' },
      { d: 'h1 uppercase', t: (d, w) => w.getComputedStyle(d.querySelector('h1')).textTransform === 'uppercase' },
      { d: 'h1 shadow 3px right, 3px up, 2px blur', t: (d, w) => /3px -3px 2px/.test(w.getComputedStyle(d.querySelector('h1')).textShadow) }
    ],
    solution: { css: `.card {
  padding: 15px 25px;
  border: 2px solid purple;
  margin-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.5);
}

h1 {
  text-transform: uppercase;
  text-shadow: 3px -3px 2px gray;
}` }
  }
});

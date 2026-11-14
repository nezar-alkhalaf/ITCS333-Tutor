/* Mock midterm: same structure and marking as the ITCS333 Midterm 2025-26 (Q1 21, Q2.A 17, Q2.B 17 = 55). */
const SCENARIOS = [
  { key: 'grades', name: 'Grade tracker', form: 'gradeForm', idF: 'studentId', idL: 'Student ID', numF: 'studentGrade', numL: 'Grade', min: 0, max: 100,
    addBtn: 'addGradeBtn', addText: 'Add Grade', calcBtn: 'calcAvgBtn', calcText: 'Calculate Average', table: 'gradeTable', tbody: 'gradeTbody',
    box: 'averageContainer', boxClass: 'average', rowFn: 'createGradeRow', kind: 'average', label: 'Average Grade', numColor: '#ff0000', boxBg: 'lightblue', test: [80, 90, 100] },
  { key: 'shop', name: 'Shopping cart', form: 'cartForm', idF: 'productName', idL: 'Product', numF: 'productPrice', numL: 'Price', min: 0, max: 1000,
    addBtn: 'addItemBtn', addText: 'Add Item', calcBtn: 'calcTotalBtn', calcText: 'Calculate Total', table: 'cartTable', tbody: 'cartTbody',
    box: 'totalContainer', boxClass: 'total', rowFn: 'createItemRow', kind: 'total', label: 'Total Price', numColor: '#0000ff', boxBg: 'lightyellow', test: [120, 45, 300] },
  { key: 'gym', name: 'Gym log', form: 'workoutForm', idF: 'exerciseName', idL: 'Exercise', numF: 'minutes', numL: 'Minutes', min: 1, max: 300,
    addBtn: 'addWorkoutBtn', addText: 'Add Workout', calcBtn: 'calcAvgBtn', calcText: 'Average Minutes', table: 'workoutTable', tbody: 'workoutTbody',
    box: 'resultContainer', boxClass: 'result', rowFn: 'createWorkoutRow', kind: 'average', label: 'Average Minutes', numColor: '#008000', boxBg: 'lightgreen', test: [30, 45, 60] },
  { key: 'library', name: 'Library', form: 'bookForm', idF: 'bookTitle', idL: 'Book Title', numF: 'pages', numL: 'Pages', min: 1, max: 2000,
    addBtn: 'addBookBtn', addText: 'Add Book', calcBtn: 'calcPagesBtn', calcText: 'Average Pages', table: 'bookTable', tbody: 'bookTbody',
    box: 'pagesContainer', boxClass: 'summary', rowFn: 'createBookRow', kind: 'average', label: 'Average Pages', numColor: '#800080', boxBg: 'lavender', test: [200, 350, 500] },
  { key: 'expenses', name: 'Expenses', form: 'expenseForm', idF: 'item', idL: 'Item', numF: 'amount', numL: 'Amount', min: 0, max: 5000,
    addBtn: 'addExpenseBtn', addText: 'Add Expense', calcBtn: 'calcTotalBtn', calcText: 'Total Spent', table: 'expenseTable', tbody: 'expenseTbody',
    box: 'spentContainer', boxClass: 'spent', rowFn: 'createExpenseRow', kind: 'total', label: 'Total Spent', numColor: '#a52a2a', boxBg: 'mistyrose', test: [15, 250, 35] },
  { key: 'temps', name: 'Temperatures', form: 'tempForm', idF: 'city', idL: 'City', numF: 'temp', numL: 'Temperature', min: -50, max: 60,
    addBtn: 'addTempBtn', addText: 'Add Reading', calcBtn: 'calcAvgBtn', calcText: 'Average Temperature', table: 'tempTable', tbody: 'tempTbody',
    box: 'avgTempContainer', boxClass: 'avg', rowFn: 'createTempRow', kind: 'average', label: 'Average Temperature', numColor: '#ff4500', boxBg: 'aliceblue', test: [30, 36, 42] },
  { key: 'football', name: 'Football goals', form: 'playerForm', idF: 'playerName', idL: 'Player', numF: 'goals', numL: 'Goals', min: 0, max: 50,
    addBtn: 'addPlayerBtn', addText: 'Add Player', calcBtn: 'calcGoalsBtn', calcText: 'Total Goals', table: 'playerTable', tbody: 'playerTbody',
    box: 'goalsContainer', boxClass: 'goals', rowFn: 'createPlayerRow', kind: 'total', label: 'Total Goals', numColor: '#006400', boxBg: 'honeydew', test: [12, 7, 3] }
];

const EXAM = (() => {
  const C = x => '[[' + x + ']]';
  /* ---------- Question text (same wording style as the real paper) ---------- */
  function specQ1(s) {
    return `**Q1 · HTML + CSS** (21 marks)

Write the required HTML and CSS code. Add the following in the **head** section:
- A [[<meta>]] tag to set the viewport's content initial-scale to 1.0.
- A [[<link>]] tag to connect an external stylesheet named **styles.css**.

Add the following in the **body** section:
- Create a [[<form>]] with the id **${s.form}**. Inside this form, add:
- An [[<input>]] for the ${s.idL}. It must have an id of **${s.idF}** and be required.
- An [[<input>]] for the ${s.numL}. It must have an id of **${s.numF}**, be of type="number", have a min value of "${s.min}", a max value of "${s.max}", and be required.
- A [[<button>]] with an id of **${s.addBtn}** and type="submit". The button text should be "${s.addText}".
- A [[<button>]] with an id of **${s.calcBtn}** and type="button". The button text should be "${s.calcText}".
- After closing the form, add a [[<table>]] with the id **${s.table}**. It must include a [[<thead>]] with a table row containing two headers (th): "${s.idL}" and "${s.numL}", and an empty [[<tbody>]] with the id **${s.tbody}**.
- After the table, add an empty [[<div>]] with the id **${s.box}** and class **${s.boxClass}**.
- At the end of the body, add a [[<script>]] tag to link an external JavaScript file named **script.js**.

Add the following rules in **styles.css**:
- A rule that selects all [[<input>]] elements that are inside a [[<form>]] element: 5px padding top and bottom, 10px left and right, and a 1px solid black border.
- A rule that selects all [[<input>]] elements of type="number" and makes their color **${s.numColor}**.
- A rule that selects any [[<div>]] element that has the class **${s.boxClass}**: bold font weight and background color **${s.boxBg}**.`;
  }
  function specQ2A(s) {
    return `**Q2.A · JavaScript** (17 marks)

Assume this code is in **script.js** and runs after the HTML (from Q1) has loaded.

**1. Write a function named [[${s.rowFn}()]]**
The function gets the values from **#${s.idF}** and **#${s.numF}**, creates a new table row ([[<tr>]]) with the class **data**, and creates two table cells ([[<td>]]) containing those values. The cells are appended to the row, and the completed row is **returned**.

**2. Add a submit event listener to the form**
Get a reference to **#${s.form}** and add a **submit** event listener to it. The callback must prevent the default form submission, call [[${s.rowFn}()]] to get the new row, and append this row to the table body (**#${s.tbody}**).

Useful: getElementById, createElement, classList, textContent, appendChild, addEventListener, preventDefault.`;
  }
  function specQ2B(s) {
    const what = s.kind === 'average' ? `calculate the average (sum / count), and set the textContent of **#${s.box}** to display it, e.g. "${s.label}: 85.5"` : `and set the textContent of **#${s.box}** to display the total (the sum), e.g. "${s.label}: 465"`;
    return `**Q2.B · JavaScript** (17 marks)

Assume this code is in **script.js** and the table may already contain rows added by Q2.A.

**1. Write a function named [[calculateSumAndCount()]]**
The function selects all **tr.data** rows from **#${s.tbody}**, loops through them to calculate the sum of the ${s.numL.toLowerCase()} values (the second cell of each row) and the total count of rows, and **returns an object** containing this sum and count, e.g. ${C('{ sum: 270, count: 3 }')}.

**2. Add a click event listener to the "${s.calcText}" button**
Get a reference to **#${s.calcBtn}** and add a **click** event listener. The callback must call [[calculateSumAndCount()]], ${what}.

Useful: querySelectorAll, forEach, children, Number, textContent, addEventListener.`;
  }

  /* ---------- Model answers ---------- */
  function modelQ1(s) {
    return { html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <form id="${s.form}">
    <input type="text" id="${s.idF}" required>
    <input type="number" id="${s.numF}" min="${s.min}" max="${s.max}" required>
    <button id="${s.addBtn}" type="submit">${s.addText}</button>
    <button id="${s.calcBtn}" type="button">${s.calcText}</button>
  </form>

  <table id="${s.table}">
    <thead>
      <tr>
        <th>${s.idL}</th>
        <th>${s.numL}</th>
      </tr>
    </thead>
    <tbody id="${s.tbody}">
    </tbody>
  </table>

  <div id="${s.box}" class="${s.boxClass}"></div>

  <script src="script.js"></script>
</body>
</html>`, css: `form input {
  padding: 5px 10px;
  border: 1px solid black;
}

input[type="number"] {
  color: ${s.numColor};
}

div.${s.boxClass} {
  font-weight: bold;
  background-color: ${s.boxBg};
}` };
  }
  const cap = w => w.charAt(0).toUpperCase() + w.slice(1);
  function modelQ2A(s) {
    const a = s.idF + 'Value', b = s.numF + 'Value';
    return { js: `function ${s.rowFn}() {
  const ${a} = document.getElementById('${s.idF}').value;
  const ${b} = document.getElementById('${s.numF}').value;

  const newRow = document.createElement('tr');
  newRow.classList.add('data');

  const firstCell = document.createElement('td');
  firstCell.textContent = ${a};

  const secondCell = document.createElement('td');
  secondCell.textContent = ${b};

  newRow.appendChild(firstCell);
  newRow.appendChild(secondCell);

  return newRow;
}

const ${s.form} = document.getElementById('${s.form}');
const ${s.tbody} = document.getElementById('${s.tbody}');

${s.form}.addEventListener('submit', function (event) {
  event.preventDefault();
  const newRow = ${s.rowFn}();
  ${s.tbody}.appendChild(newRow);
});` };
  }
  function modelQ2B(s) {
    const calc = s.kind === 'average'
      ? `  const average = stats.sum / stats.count;
  ${s.box}.textContent = \`${s.label}: \${average}\`;`
      : `  ${s.box}.textContent = \`${s.label}: \${stats.sum}\`;`;
    return { js: `function calculateSumAndCount() {
  const rows = document.querySelectorAll('#${s.tbody} tr.data');
  let sum = 0;
  let count = 0;

  rows.forEach(row => {
    const cell = row.children[1];
    const value = Number(cell.textContent);
    sum += value;
    count++;
  });

  return { sum: sum, count: count };
}

const ${s.calcBtn} = document.getElementById('${s.calcBtn}');
const ${s.box} = document.getElementById('${s.box}');

${s.calcBtn}.addEventListener('click', function () {
  const stats = calculateSumAndCount();
${calc}
});` };
  }

  /* ---------- Grading helpers ---------- */
  const load = (frame, parts, exports) => {
    const extra = exports && exports.length ? 'window.__exp={};' + exports.map(n => 'try{window.__exp[' + JSON.stringify(n) + ']=' + n + '}catch(e){}').join(';') : '';
    return U.run(parts, frame, null, extra);
  };
  const reId = id => new RegExp('(getElementById\\(\\s*["\'`]' + id + '["\'`]\\s*\\)|querySelector\\(\\s*["\'`]#' + id + '["\'`]\\s*\\))');
  const wait = ms => new Promise(r => setTimeout(r, ms));
  async function safe(fn) { try { return await fn(); } catch (e) { return false; } }

  /* Each grader returns [{d, pts, ok}] */
  async function gradeQ1(s, ans, frame) {
    const html = ans.html || '', css = ans.css || '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const q = sel => doc.querySelector(sel);
    const items = [];
    const add = (d, pts, ok) => items.push({ d, pts, ok: !!ok });
    const meta = [...doc.querySelectorAll('meta')].find(m => (m.getAttribute('name') || '').toLowerCase() === 'viewport');
    add('meta viewport with initial-scale=1.0 in the head', 1, meta && /initial-scale\s*=\s*1(\.0+)?\b/.test(meta.getAttribute('content') || '') && doc.head.contains(meta));
    const link = [...doc.querySelectorAll('link')].find(l => /^styles\.css$/i.test(l.getAttribute('href') || ''));
    add('link rel="stylesheet" href="styles.css"', 1, link && /stylesheet/i.test(link.getAttribute('rel') || '') && doc.head.contains(link));
    const form = q('form#' + s.form);
    add('form with id ' + s.form, 1, form);
    const i1 = form && form.querySelector('#' + s.idF);
    add('input #' + s.idF + ' inside the form, required', 1, i1 && i1.tagName === 'INPUT' && i1.hasAttribute('required'));
    const i2 = form && form.querySelector('#' + s.numF);
    add('input #' + s.numF + ': type="number", min="' + s.min + '", max="' + s.max + '", required', 1, i2 && i2.tagName === 'INPUT' && (i2.getAttribute('type') || '').toLowerCase() === 'number' && i2.getAttribute('min') === String(s.min) && i2.getAttribute('max') === String(s.max) && i2.hasAttribute('required'));
    const b1 = form && form.querySelector('button#' + s.addBtn);
    add('button #' + s.addBtn + ' type="submit", text "' + s.addText + '"', 1, b1 && (b1.getAttribute('type') || 'submit').toLowerCase() === 'submit' && b1.textContent.trim().toLowerCase() === s.addText.toLowerCase());
    const b2 = form && form.querySelector('button#' + s.calcBtn);
    add('button #' + s.calcBtn + ' type="button", text "' + s.calcText + '"', 1, b2 && (b2.getAttribute('type') || '').toLowerCase() === 'button' && b2.textContent.trim().toLowerCase() === s.calcText.toLowerCase());
    const table = q('table#' + s.table);
    add('table with id ' + s.table + ' after the form', 1, table && (!form || (form.compareDocumentPosition(table) & Node.DOCUMENT_POSITION_FOLLOWING) && !form.contains(table)));
    const thead = table && table.querySelector('thead');
    add('thead section', 1, thead);
    const tr = thead && thead.querySelector('tr');
    add('a tr inside the thead', 1, tr);
    const ths = tr ? [...tr.querySelectorAll('th')].map(t => t.textContent.trim().toLowerCase()) : [];
    add('th "' + s.idL + '"', 1, ths.includes(s.idL.toLowerCase()));
    add('th "' + s.numL + '"', 1, ths.includes(s.numL.toLowerCase()));
    const tb = table && table.querySelector('tbody#' + s.tbody);
    add('empty tbody with id ' + s.tbody, 1, tb && tb.children.length === 0 && !/<tbody[^>]*>[^<]*<tr/i.test(html));
    const box = q('div#' + s.box);
    add('empty div with id ' + s.box + ' and class ' + s.boxClass + ' after the table', 1, box && box.classList.contains(s.boxClass) && box.children.length === 0 && box.textContent.trim() === '' && (!table || (table.compareDocumentPosition(box) & Node.DOCUMENT_POSITION_FOLLOWING)));
    const sc = [...doc.querySelectorAll('script')].find(x => /^script\.js$/i.test(x.getAttribute('src') || ''));
    add('script src="script.js" at the end of the body', 1, sc && doc.body.contains(sc) && /<script[^>]*script\.js[^>]*>\s*<\/script>/i.test(html) && [...doc.body.querySelectorAll('*')].pop() === sc);

    /* CSS: load the stylesheet into an iframe and inspect the rules */
    await load(frame, { html: '<!DOCTYPE html><html><head></head><body><p>x</p></body></html>', css });
    const d = frame.contentDocument;
    const r1 = U.findRule(d, ['form input']);
    add('CSS selector: form input', 1, r1);
    add('form input: padding 5px 10px and border 1px solid black', 1, r1 && r1.style.paddingTop === '5px' && r1.style.paddingBottom === '5px' && r1.style.paddingLeft === '10px' && r1.style.paddingRight === '10px' && r1.style.borderTopWidth === '1px' && r1.style.borderTopStyle === 'solid' && U.normColor(d, r1.style.borderTopColor) === U.normColor(d, 'black'));
    const r2 = U.findRule(d, ['input[type="number"]']);
    add('CSS selector: input[type="number"]', 1, r2);
    add('number input color ' + s.numColor, 1, r2 && r2.style.color && U.normColor(d, r2.style.color) === U.normColor(d, s.numColor));
    const r3 = U.findRule(d, ['div.' + s.boxClass]);
    add('CSS selector: div.' + s.boxClass, 1, r3);
    add('div.' + s.boxClass + ': font-weight bold, background-color ' + s.boxBg, 1, r3 && /^(bold|700)$/.test(r3.style.fontWeight) && r3.style.backgroundColor && U.normColor(d, r3.style.backgroundColor) === U.normColor(d, s.boxBg));
    return items;
  }

  async function gradeQ2A(s, ans, frame) {
    const js = ans.js || '', src = U.strip(js);
    const items = [];
    const add = (d, pts, ok) => items.push({ d, pts, ok: !!ok });
    const html = modelQ1(s).html;
    await load(frame, { html, css: '', js }, [s.rowFn]);
    const w = frame.contentWindow, d = frame.contentDocument;
    const fn = w.__exp && w.__exp[s.rowFn];
    add('function ' + s.rowFn + '() is defined', 1, typeof fn === 'function');
    const fnBody = (() => { const i = src.search(new RegExp('(function\\s+' + s.rowFn + '|' + s.rowFn + '\\s*=)')); return i < 0 ? '' : src.slice(i); })();
    add('reads the value of #' + s.idF, 1, reId(s.idF).test(fnBody) && /\.value\b/.test(fnBody));
    add('reads the value of #' + s.numF, 1, reId(s.numF).test(fnBody) && (fnBody.match(/\.value\b/g) || []).length >= 2);
    let row = null;
    if (typeof fn === 'function') {
      d.getElementById(s.idF).value = 'T-17'; d.getElementById(s.numF).value = String(s.test[1]);
      row = await safe(() => fn());
    }
    const isRow = row && row.nodeType === 1;
    add('creates a tr with createElement', 1, isRow && row.tagName === 'TR' && /createElement\(\s*["'`]tr["'`]\s*\)/i.test(src));
    add('adds class "data" to the row', 1, isRow && row.classList.contains('data'));
    const c0 = isRow && row.children[0], c1 = isRow && row.children[1];
    add('creates the first td', 1, c0 && c0.tagName === 'TD');
    add('first cell textContent = the ' + s.idL + ' value', 1, c0 && c0.textContent === 'T-17' && /textContent/.test(src));
    add('creates the second td', 1, c1 && c1.tagName === 'TD');
    add('second cell textContent = the ' + s.numL + ' value', 1, c1 && c1.textContent === String(s.test[1]));
    add('both cells appended to the row (appendChild)', 1, isRow && row.children.length === 2 && /append(Child)?\s*\(/.test(src));
    add('returns the row', 1, isRow && row.tagName === 'TR');
    /* listener */
    const after = src.replace(/function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*?\n\}/, '');
    add('gets a reference to #' + s.form, 1, reId(s.form).test(src));
    add('gets a reference to #' + s.tbody, 1, reId(s.tbody).test(after) || reId(s.tbody).test(src));
    // fresh load for the listener behaviour
    await load(frame, { html, css: '', js }, [s.rowFn]);
    const w2 = frame.contentWindow, d2 = frame.contentDocument;
    d2.getElementById(s.idF).value = 'Z-9'; d2.getElementById(s.numF).value = String(s.test[0]);
    const before = d2.getElementById(s.tbody).querySelectorAll('tr').length;
    w2.__subs = [];
    await safe(() => { const f = d2.getElementById(s.form); f.requestSubmit ? f.requestSubmit() : d2.getElementById(s.addBtn).click(); });
    await wait(20);
    const tb = d2.getElementById(s.tbody);
    const added = tb.querySelectorAll('tr').length - before;
    const prevented = w2.__subs.length > 0 && w2.__subs[0] === true;
    add('adds a submit event listener to the form', 1, /addEventListener\(\s*["'`]submit["'`]/.test(src) && (added > 0 || prevented));
    add('calls event.preventDefault()', 1, prevented);
    add('calls ' + s.rowFn + '() inside the listener', 1, (src.match(new RegExp(s.rowFn + '\\s*\\(', 'g')) || []).length >= 2 && added > 0);
    add('appends the new row to #' + s.tbody, 1, added === 1 && /Z-9/.test(tb.lastElementChild ? tb.lastElementChild.textContent : ''));
    return items;
  }

  async function gradeQ2B(s, ans, frame) {
    const js = ans.js || '', src = U.strip(js);
    const items = [];
    const add = (d, pts, ok) => items.push({ d, pts, ok: !!ok });
    const html = modelQ1(s).html;
    const seed = () => {
      const d = frame.contentDocument, tb = d.getElementById(s.tbody);
      s.test.forEach((v, i) => { const tr = d.createElement('tr'); tr.className = 'data'; tr.innerHTML = '<td>R' + (i + 1) + '</td><td>' + v + '</td>'; tb.appendChild(tr); });
      const junk = d.createElement('tr'); junk.innerHTML = '<td>not data</td><td>999</td>'; tb.appendChild(junk);
    };
    await load(frame, { html, css: '', js }, ['calculateSumAndCount']);
    seed();
    const w = frame.contentWindow;
    const fn = w.__exp && w.__exp.calculateSumAndCount;
    const sum = s.test.reduce((a, b) => a + b, 0), count = s.test.length;
    add('function calculateSumAndCount() is defined', 1, typeof fn === 'function');
    add('selects the rows with querySelectorAll', 1, /querySelectorAll\(/.test(src));
    add('sum starts at 0', 1, /(let|var)\s+\w+\s*=\s*0\b/.test(src));
    add('count starts at 0', 1, (src.match(/(let|var)\s+\w+\s*=\s*0\b/g) || []).length >= 2 || /,\s*\w+\s*=\s*0\b/.test(src));
    add('loops through the rows (forEach / for)', 1, /\.forEach\s*\(|for\s*\(/.test(src));
    add('reads the second cell (children[1])', 1, /children\s*\[\s*1\s*\]|cells\s*\[\s*1\s*\]|td:nth-child\(2\)|lastElementChild/.test(src));
    add('converts with Number() (or parseFloat/parseInt)', 1, /Number\s*\(|parseFloat\s*\(|parseInt\s*\(/.test(src));
    let res = null;
    if (typeof fn === 'function') res = await safe(() => fn());
    const obj = res && typeof res === 'object';
    add('returns an object { sum, count }', 1, obj && 'sum' in res && 'count' in res);
    add('sum is correct (' + sum + ')', 1, obj && res.sum === sum);
    add('count is correct (' + count + ')', 1, obj && res.count === count);
    add('only rows with class data are counted', 1, obj && res.count === count && res.sum === sum);
    /* listener */
    add('gets a reference to #' + s.calcBtn, 1, reId(s.calcBtn).test(src));
    add('gets a reference to #' + s.box, 1, reId(s.box).test(src));
    await load(frame, { html, css: '', js }, ['calculateSumAndCount']);
    seed();
    const d = frame.contentDocument;
    await safe(() => d.getElementById(s.calcBtn).click());
    await wait(10);
    const out = (d.getElementById(s.box).textContent || '').trim();
    const expected = s.kind === 'average' ? sum / count : sum;
    const shown = (out.match(/-?\d+(\.\d+)?/g) || []).map(Number);
    add('adds a click listener that updates the result', 1, /addEventListener\(\s*["'`]click["'`]/.test(src) && out.length > 0);
    add('calls calculateSumAndCount() in the listener', 1, (src.match(/calculateSumAndCount\s*\(/g) || []).length >= 2);
    add('shows the correct ' + (s.kind === 'average' ? 'average (' : 'total (') + expected + ')', 1, shown.some(n => Math.abs(n - expected) < 1e-6));
    add('writes it with textContent', 1, /textContent\s*=/.test(src) && out.length > 0);
    return items;
  }

  const PARTS = [
    { id: 'q1', title: 'Q1 · HTML + CSS', marks: 21, tabs: ['html', 'css'], spec: specQ1, model: modelQ1, grade: gradeQ1 },
    { id: 'q2a', title: 'Q2.A · JavaScript', marks: 17, tabs: ['js'], spec: specQ2A, model: modelQ2A, grade: gradeQ2A },
    { id: 'q2b', title: 'Q2.B · JavaScript', marks: 17, tabs: ['js'], spec: specQ2B, model: modelQ2B, grade: gradeQ2B }
  ];
  return { PARTS, SCENARIOS, starter: { q1: { html: `<!DOCTYPE html>
<html lang="en">
<head>

</head>
<body>

</body>
</html>`, css: `` }, q2a: { js: `` }, q2b: { js: `` } } };
})();

/* Mock final. Four parts, each with several scenarios; code parts run in the PHP runner and are marked line by line
   (1 point per required line, like the midterm). Q4 is two short answers marked by the student against key points.
   FINAL.selfTest(out) checks that every model answer gets full marks and that empty and starter answers get 0. */
const FINAL = (() => {
  const R = String.raw;
  const C = x => '[[' + x + ']]';
  const UOB_SQL = `CREATE TABLE students (id INTEGER PRIMARY KEY, name VARCHAR(50), major VARCHAR(10), gpa DECIMAL(3,2));
INSERT INTO students (name, major, gpa) VALUES ('Ali', 'CS', 3.40), ('Sara', 'CE', 3.90), ('Hassan', 'IS', 2.10), ('Maryam', 'CS', 3.10), ('Omar', 'CS', 3.75), ('Noor', 'IS', 2.95);
CREATE TABLE products (id INTEGER PRIMARY KEY, name VARCHAR(50), category VARCHAR(30), price DECIMAL(6,3), stock INT, rating INT);
INSERT INTO products (name, category, price, stock, rating) VALUES ('Notebook', 'Stationery', 0.750, 120, 4), ('Headphones', 'Electronics', 12.500, 8, 5), ('Pen pack', 'Stationery', 1.200, 0, 3), ('USB cable', 'Electronics', 2.250, 35, 2), ('Backpack', 'Bags', 9.900, 4, 4), ('Calculator', 'Electronics', 6.000, 15, 3);
CREATE TABLE users (id INTEGER PRIMARY KEY, username VARCHAR(30), email VARCHAR(60), major VARCHAR(10));
INSERT INTO users (username, email, major) VALUES ('ali', 'ali@uob.edu.bh', 'CS'), ('sara', 'sara@uob.edu.bh', 'CE'), ('omar', 'omar@uob.edu.bh', 'IS');`;
  const DB = { name: 'uob', user: 'root', pass: '', sql: UOB_SQL };

  /* ---------- helpers ---------- */
  const code = src => U.phpScan(src).filter(p => p.t === 'code').map(p => p.s).join(' ');
  const strs = src => U.phpScan(src).filter(p => p.t === 'str').map(p => p.s).join(' ');
  const tx = (r, sel) => { const e = r && r.doc.querySelector(sel); return e ? e.textContent.replace(/\s+/g, ' ').trim() : null; };
  const all = (r, sel) => r ? [...r.doc.querySelectorAll(sel)].map(e => e.textContent.replace(/\s+/g, ' ').trim()) : [];
  const rows = (r, sel) => r ? [...r.doc.querySelectorAll(sel + ' tr')].filter(tr => tr.querySelector('td')).map(tr => [...tr.cells].map(c => c.textContent.trim())) : [];
  const esc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const clean = rs => rs.every(r => !r.errors.length);
  /* The grader appends a hidden dump of one variable, so the array definition itself can be marked. */
  function withDump(src, v) {
    const parts = U.phpScan(src);
    let open = false; parts.forEach(p => { if (p.t === 'tag') open = p.s !== '?>'; });
    return src + (open ? '\n?>' : '') + '\n<?php echo "<pre id=\'__dump\'>" . htmlspecialchars(json_encode(isset($' + v + ') ? $' + v + ' : null)) . "</pre>"; ?>';
  }
  const dump = r => { try { return JSON.parse(r.doc.getElementById('__dump').textContent); } catch (e) { return undefined; } };

  /* ================= Q1: arrays + if + foreach / preg_match ================= */
  const Q1 = [
    { key: 'books', v: 'books', keys: ['title', 'author', 'year'],
      data: [['Web Design 101', 'Mona', 1999], ['PHP and MySQL 8', 'Yousif', 2021], ['Clean Code', 'Martin', 2008], ['Networks 5', 'Huda', 2016]],
      ifText: R`If the ${C('year')} of the **second** book is greater than 2000, print ${C('<p id="check">Recent</p>')}, otherwise ${C('<p id="check">Old</p>')}.`,
      ifEl: [1, 'year'], ifCode: R`$books[1]["year"] > 2000`, ifTrue: 'Recent', ifFalse: 'Old', expectCheck: 'Recent',
      matchText: R`the **title** of every book whose title **ends with a digit**`, field: 'title', pattern: R`/\d$/`, expect: ['Web Design 101', 'PHP and MySQL 8', 'Networks 5'] },
    { key: 'cars', v: 'cars', keys: ['model', 'brand', 'year'],
      data: [['Sonata3', 'Hyundai', 2018], ['corolla', 'Toyota', 2012], ['X5', 'BMW', 2021], ['Patrol', 'Nissan', 2009]],
      ifText: R`If the ${C('brand')} of the **first** car is "Hyundai", print ${C('<p id="check">Korean</p>')}, otherwise ${C('<p id="check">Other</p>')}.`,
      ifEl: [0, 'brand'], ifCode: R`$cars[0]["brand"] == "Hyundai"`, ifTrue: 'Korean', ifFalse: 'Other', expectCheck: 'Korean',
      matchText: R`the **model** of every car whose model **starts with a capital letter and ends with a digit**`, field: 'model', pattern: R`/^[A-Z].*\d$/`, expect: ['Sonata3', 'X5'] },
    { key: 'students', v: 'students', keys: ['name', 'id', 'grade'],
      data: [['Ali', '202301111', 'A'], ['Sara', '20231234', 'B'], ['Omar', '202299999', 'A'], ['Noor', '2023x0001', 'C']],
      ifText: R`If the ${C('grade')} of the **third** student is "A", print ${C('<p id="check">Excellent</p>')}, otherwise ${C('<p id="check">Keep going</p>')}.`,
      ifEl: [2, 'grade'], ifCode: R`$students[2]["grade"] == "A"`, ifTrue: 'Excellent', ifFalse: 'Keep going', expectCheck: 'Excellent',
      matchText: R`the **name** of every student whose **id is exactly 9 digits**`, field: 'id', show: 'name', pattern: R`/^\d{9}$/`, expect: ['Ali', 'Omar'] },
    { key: 'phones', v: 'phones', keys: ['model', 'price', 'color'],
      data: [['Nova 9', 120, 'black'], ['Galaxy', 250, 'blue'], ['iPhone 15', 400, 'white'], ['pixel', 180, 'grey']],
      ifText: R`If the ${C('price')} of the **first** phone is less than 150, print ${C('<p id="check">Budget</p>')}, otherwise ${C('<p id="check">Premium</p>')}.`,
      ifEl: [0, 'price'], ifCode: R`$phones[0]["price"] < 150`, ifTrue: 'Budget', ifFalse: 'Premium', expectCheck: 'Budget',
      matchText: R`the **model** of every phone whose model **starts with a small (lowercase) letter**`, field: 'model', pattern: R`/^[a-z]/`, expect: ['iPhone 15', 'pixel'] }
  ];
  const phpVal = x => typeof x === 'number' ? String(x) : '"' + x + '"';
  const dataTable = s => '| ' + s.keys.join(' | ') + ' |\n' + s.data.map(r => '- ' + r.map(x => typeof x === 'number' ? x : '"' + x + '"').join(', ')).join('\n');
  function specQ1(s) {
    return `**Q1 · PHP arrays and patterns** (13 marks)

1. Define an array ${C('$' + s.v)} that holds **4** elements. Each element is an **associative array** with the keys ${s.keys.map(k => C(k)).join(', ')}, holding this data, in this order:
${s.data.map((r, i) => '- ' + (i + 1) + ': ' + r.map((x, j) => s.keys[j] + ' = ' + (typeof x === 'number' ? x : '"' + x + '"')).join(', ')).join('\n')}

2. ${s.ifText}

3. Using **foreach** and **preg_match**, print an unordered list ${C('<ul id="matches">')} with one ${C('<li>')} for ${s.matchText}, in the array's order.

4. Count the matching elements with a counter inside the loop, and after the list print ${C('<p id="count">N matched</p>')} (for example "2 matched").`;
  }
  function modelQ1(s) {
    const show = s.show || s.field;
    return { php: `<?php
$${s.v} = [
${s.data.map(r => '  [' + r.map((x, j) => '"' + s.keys[j] + '" => ' + phpVal(x)).join(', ') + '],').join('\n')}
];

if (${s.ifCode}) {
  echo '<p id="check">${s.ifTrue}</p>';
} else {
  echo '<p id="check">${s.ifFalse}</p>';
}

$count = 0;
echo '<ul id="matches">';
foreach ($${s.v} as $item) {
  if (preg_match('${s.pattern}', $item["${s.field}"])) {
    echo "<li>" . $item["${show}"] . "</li>";
    $count++;
  }
}
echo "</ul>";
echo '<p id="count">' . $count . ' matched</p>';
?>` };
  }
  function checksQ1(s) {
    const want = s.data.map(r => { const o = {}; s.keys.forEach((k, j) => o[k] = r[j]); return o; });
    const d = rs => dump(rs[0]);
    const isList = x => Array.isArray(x) && x.length === 4;
    return [
      { d: `${C('$' + s.v)} is an array of 4 elements`, pts: 1, t: rs => isList(d(rs)) },
      { d: `Each element is an associative array with exactly the keys ${s.keys.join(', ')}`, pts: 1, t: rs => isList(d(rs)) && d(rs).every(e => e && typeof e === 'object' && !Array.isArray(e) && Object.keys(e).sort().join() === s.keys.slice().sort().join()) },
      { d: 'The values match the data, in order', pts: 1, t: rs => isList(d(rs)) && d(rs).every((e, i) => s.keys.every(k => String(e[k]) === String(want[i][k]))) },
      { d: `The ${C('if')} tests element ${s.ifEl[0]} (${C('$' + s.v + '[' + s.ifEl[0] + ']["' + s.ifEl[1] + '"]')})`, pts: 1, t: (rs, src) => new RegExp('if\\s*\\([^)]*\\$' + s.v + '\\s*\\[\\s*' + s.ifEl[0] + '\\s*\\]\\s*\\[\\s*[\'"]' + s.ifEl[1] + '[\'"]\\s*\\]').test(src) },
      { d: `${C('#check')} shows "${s.expectCheck}"`, pts: 1, t: rs => tx(rs[0], '#check') === s.expectCheck },
      { d: `Loops with ${C('foreach ($' + s.v + ' as …)')}`, pts: 1, t: (rs, src) => new RegExp('foreach\\s*\\(\\s*\\$' + s.v + '\\s+as\\s').test(code(src)) },
      { d: `Uses ${C('preg_match')}`, pts: 1, t: (rs, src) => /preg_match\s*\(/.test(code(src)) },
      { d: `${C('<ul id="matches">')} holds the ${C('<li>')} items`, pts: 1, t: rs => !!rs[0].doc.querySelector('ul#matches') && all(rs[0], '#matches li').length > 0 },
      { d: `The list is exactly: ${s.expect.join(', ')}`, pts: 2, t: rs => all(rs[0], '#matches li').join('|') === s.expect.join('|') },
      { d: 'A counter is increased inside the loop', pts: 1, t: (rs, src) => /\$\w+\s*(\+\+|\+=\s*1\b)|\+\+\s*\$\w+/.test(code(src)) },
      { d: `${C('#count')} shows "${s.expect.length} matched"`, pts: 1, t: rs => tx(rs[0], '#count') === s.expect.length + ' matched' },
      { d: 'No PHP warnings or errors', pts: 1, t: rs => clean(rs) && !!rs[0].doc.querySelector('#matches') }
    ];
  }

  /* ================= Q2: PDO prepared statement ================= */
  const Q2 = [
    { key: 'login', field: 'email', ph: 'email', table: 'users', col: 'email', fetchVar: 'user', okClass: 'welcome', errClass: 'error',
      okText: 'Welcome USERNAME', okOut: r => 'Welcome ' + r.username, errText: 'Invalid email',
      good: 'sara%40uob.edu.bh', goodOut: 'Welcome sara', bad: 'x%40uob.edu.bh', inj: "x%27+OR+%271%27%3D%271", label: 'Email',
      task: 'a user by **email** from the table ' + C('users') + ' (columns: id, username, email, major)', okHtml: '<div class="welcome">Welcome <?= $user["username"] ?></div>' },
    { key: 'product', field: 'pid', ph: 'id', table: 'products', col: 'id', fetchVar: 'product', okClass: 'product', errClass: 'error',
      okText: 'NAME: PRICE BD', errText: 'No such product',
      good: '2', goodOut: 'Headphones: 12.5 BD', bad: '99', inj: "1+OR+1%3D1", label: 'Product id',
      task: 'a product by **id** from the table ' + C('products') + ' (columns: id, name, category, price, stock, rating)', okHtml: '<div class="product"><?= $product["name"] ?>: <?= $product["price"] ?> BD</div>' },
    { key: 'student', field: 'sid', ph: 'id', table: 'students', col: 'id', fetchVar: 'student', okClass: 'student', errClass: 'error',
      okText: 'NAME (MAJOR)', errText: 'No such student',
      good: '5', goodOut: 'Omar (CS)', bad: '42', inj: "1%27+OR+%271%27%3D%271", label: 'Student id',
      task: 'a student by **id** from the table ' + C('students') + ' (columns: id, name, major, gpa)', okHtml: '<div class="student"><?= $student["name"] ?> (<?= $student["major"] ?>)</div>' }
  ];
  function specQ2(s) {
    return `**Q2 · PDO prepared statement** (10 marks)

The page has a form ${C('<form method="post">')} with an input named ${C(s.field)}. Complete the PHP so that, **when the form is posted**, it reads ${s.task}:

1. Connect with PDO to the MySQL database ${C('uob')} on ${C('localhost')}, user ${C('root')}, empty password.
2. Set the error mode so that errors throw exceptions.
3. Put the database code in a ${C('try')} block; in ${C('catch (PDOException $e)')} print the error message.
4. Prepare the SELECT with the **named placeholder** ${C(':' + s.ph)}.
5. Bind ${C('$_POST["' + s.field + '"]')} to it with **bindParam**, then **execute**.
6. Fetch the row into ${C('$' + s.fetchVar)}.
7. If a row was found print ${C('<div class="' + s.okClass + '">' + s.okText + '</div>')}, otherwise ${C('<div class="' + s.errClass + '">' + s.errText + '</div>')}.`;
  }
  const starterQ2 = s => ({ php: `<form method="post">
  ${s.label}: <input name="${s.field}">
  <button type="submit">Find</button>
</form>
<?php
if (isset($_POST["${s.field}"])) {

}
?>` });
  function modelQ2(s) {
    return { php: `<form method="post">
  ${s.label}: <input name="${s.field}">
  <button type="submit">Find</button>
</form>
<?php
if (isset($_POST["${s.field}"])) {
  try {
    $db = new PDO("mysql:host=localhost;dbname=uob", "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $db->prepare("SELECT * FROM ${s.table} WHERE ${s.col} = :${s.ph}");
    $stmt->bindParam(':${s.ph}', $_POST["${s.field}"]);
    $stmt->execute();
    $${s.fetchVar} = $stmt->fetch();
    if ($${s.fetchVar}) {
      ?>${s.okHtml}<?php
    } else {
      echo '<div class="${s.errClass}">${s.errText}</div>';
    }
  } catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
}
?>` };
  }
  function checksQ2(s) {
    const ok = r => tx(r, 'div.' + s.okClass), err = r => tx(r, 'div.' + s.errClass);
    return [
      { d: R`Connects with ${C('new PDO("mysql:host=localhost;dbname=uob", "root", "")')}`, pts: 1, t: (rs, src) => /new\s+PDO\s*\(\s*["']mysql:host=localhost;\s*dbname=uob(;[^"']*)?["']\s*,\s*["']root["']\s*,\s*(["']{2})\s*\)/.test(src) },
      { d: R`Sets ${C('PDO::ATTR_ERRMODE')} to ${C('PDO::ERRMODE_EXCEPTION')}`, pts: 1, t: (rs, src) => /setAttribute\s*\(\s*PDO::ATTR_ERRMODE\s*,\s*PDO::ERRMODE_EXCEPTION\s*\)/.test(code(src)) },
      { d: R`A ${C('try')} block with ${C('catch (PDOException $e)')}`, pts: 1, t: (rs, src) => /\btry\s*\{/.test(code(src)) && /catch\s*\(\s*PDOException\s+\$\w+\s*\)/.test(code(src)) },
      { d: R`The catch prints ${C('$e->getMessage()')}`, pts: 1, t: (rs, src) => /catch\s*\(\s*PDOException\s+\$(\w+)\s*\)\s*\{[\s\S]*?\$\1\s*->\s*getMessage\s*\(\s*\)/.test(src) },
      { d: `Prepares the SELECT with the placeholder ${C(':' + s.ph)}`, pts: 1, t: (rs, src) => /->\s*prepare\s*\(/.test(code(src)) && new RegExp('SELECT[^"\']*FROM\\s+' + s.table + '[^"\']*WHERE\\s+' + s.col + '\\s*=\\s*:' + s.ph + '\\b', 'i').test(strs(src)) },
      { d: `${C('bindParam(\':' + s.ph + '\', $_POST["' + s.field + '"])')}`, pts: 1, t: (rs, src) => new RegExp('bindParam\\s*\\(\\s*[\'"]:' + s.ph + '[\'"]\\s*,\\s*\\$_POST\\s*\\[\\s*[\'"]' + s.field + '[\'"]\\s*\\]\\s*\\)').test(src) },
      { d: `Calls ${C('execute()')}`, pts: 1, t: (rs, src) => /->\s*execute\s*\(/.test(code(src)) },
      { d: `Fetches the row into ${C('$' + s.fetchVar)}`, pts: 1, t: (rs, src) => new RegExp('\\$' + s.fetchVar + '\\s*=\\s*\\$\\w+\\s*->\\s*fetch\\s*\\(').test(code(src)) },
      { d: `A matching row shows ${C('<div class="' + s.okClass + '">' + s.goodOut + '</div>')}`, pts: 1, t: rs => ok(rs[1]) === s.goodOut },
      { d: `No match, and an injection attempt, show ${C('<div class="' + s.errClass + '">' + s.errText + '</div>')}`, pts: 1, t: rs => err(rs[2]) === s.errText && err(rs[3]) === s.errText && !ok(rs[3]) && clean(rs) }
    ];
  }
  const reqQ2 = s => [{}, { method: 'POST', body: s.field + '=' + s.good }, { method: 'POST', body: s.field + '=' + s.bad }, { method: 'POST', body: s.field + '=' + s.inj }];

  /* ================= Q3: cookies and sessions over several requests ================= */
  const Q3 = [
    { key: 'visits', title: 'Last visit and visit counter',
      spec: () => `**Q3 · Cookies and sessions** (10 marks)

The page is opened several times by the same visitor. ${C('$now')} is given in the starter.

1. Start the session.
2. If ${C('?logout=1')} is in the URL: destroy the session, delete the cookie ${C('lastvisit')}, print ${C('<p id="bye">Bye</p>')} and stop the script.
3. If the cookie ${C('lastvisit')} exists, print ${C('<p id="last">Last visit: VALUE</p>')}; otherwise print ${C('<p id="last">First visit</p>')}.
4. Set the cookie ${C('lastvisit')} to ${C('$now')}, expiring in **3 weeks** (in seconds from now).
5. Count the visits in ${C('$_SESSION["visits"]')} (1 on the first visit, then 2, 3…) and print ${C('<p id="visits">Visit N</p>')}.`,
      starter: () => ({ php: R`<?php
$now = "27/12/2026 08:30";

?>` }),
      model: () => ({ php: R`<?php
$now = "27/12/2026 08:30";
session_start();
if (isset($_GET["logout"])) {
  session_destroy();
  setcookie("lastvisit", "", time() - 3600);
  die('<p id="bye">Bye</p>');
}
if (isset($_COOKIE["lastvisit"])) {
  echo '<p id="last">Last visit: ' . $_COOKIE["lastvisit"] . '</p>';
} else {
  echo '<p id="last">First visit</p>';
}
setcookie("lastvisit", $now, time() + 3 * 7 * 24 * 60 * 60);
if (isset($_SESSION["visits"])) {
  $_SESSION["visits"]++;
} else {
  $_SESSION["visits"] = 1;
}
echo '<p id="visits">Visit ' . $_SESSION["visits"] . '</p>';
?>` }),
      requests: [{}, {}, {}, { query: 'logout=1' }, {}],
      checks: () => {
        const ck = r => r && r.setCookies.find(c => c.name === 'lastvisit');
        return [
          { d: R`Starts the session (${C('session_start()')})`, pts: 1, t: (rs, src) => /session_start\s*\(\s*\)/.test(code(src)) && !!rs[0].doc.querySelector('#visits') },
          { d: R`First visit: ${C('<p id="last">First visit</p>')}`, pts: 1, t: rs => tx(rs[0], '#last') === 'First visit' },
          { d: R`Second visit: "Last visit: 27/12/2026 08:30"`, pts: 1, t: rs => tx(rs[1], '#last') === 'Last visit: 27/12/2026 08:30' },
          { d: R`Sets the cookie ${C('lastvisit')} to ${C('$now')}`, pts: 1, t: rs => { const c = ck(rs[0]); return !!c && c.value === '27/12/2026 08:30'; } },
          { d: 'The cookie expires in 3 weeks (21 days)', pts: 1, t: rs => { const c = ck(rs[0]); return !!c && c.expires && Math.abs((c.expires - Date.now()) / 86400000 - 21) < 0.01; } },
          { d: R`Visits are counted in the session: Visit 1, Visit 2, Visit 3`, pts: 2, t: rs => [0, 1, 2].map(i => tx(rs[i], '#visits')).join() === 'Visit 1,Visit 2,Visit 3' && !!rs[2].session && rs[2].session.visits == 3 },
          { d: R`${C('?logout=1')} prints "Bye" and nothing else, and deletes the cookie`, pts: 2, t: rs => rs[3].text === 'Bye' && !!ck(rs[3]) && ck(rs[3]).deleted },
          { d: 'After logout the visitor starts again (First visit, Visit 1), with no warnings', pts: 1, t: rs => tx(rs[4], '#last') === 'First visit' && tx(rs[4], '#visits') === 'Visit 1' && clean(rs) }
        ];
      } },
    { key: 'marks', title: 'Marks kept in the session',
      spec: () => `**Q3 · Sessions** (10 marks)

Marks are posted one at a time (inputs ${C('course')} and ${C('mark')}) and kept in the session.

1. Start the session.
2. If ${C('?clear=1')} is in the URL, remove ${C('$_SESSION["marks"]')} with ${C('unset')}.
3. If a course and mark are posted, store them as ${C('$_SESSION["marks"][course] = mark')}.
4. If ${C('$_SESSION["marks"]')} does not exist (or is empty), print ${C('<p id="none">No session data</p>')}.
5. Otherwise print ${C('<table id="marks">')} with one row per course (two cells: course, mark), then ${C('<p id="avg">Average: X</p>')} and ${C('<p id="n">N courses</p>')}.`,
      starter: () => ({ php: R`<form method="post">
  Course <input name="course"> Mark <input name="mark"> <button>Add</button>
</form>
<?php

?>` }),
      model: () => ({ php: R`<form method="post">
  Course <input name="course"> Mark <input name="mark"> <button>Add</button>
</form>
<?php
session_start();
if (isset($_GET["clear"])) {
  unset($_SESSION["marks"]);
}
if (isset($_POST["course"]) && isset($_POST["mark"])) {
  $_SESSION["marks"][$_POST["course"]] = $_POST["mark"];
}
if (!isset($_SESSION["marks"]) || count($_SESSION["marks"]) == 0) {
  echo '<p id="none">No session data</p>';
} else {
  echo '<table id="marks" border="1">';
  $sum = 0;
  foreach ($_SESSION["marks"] as $course => $mark) {
    echo "<tr><td>$course</td><td>$mark</td></tr>";
    $sum += $mark;
  }
  echo "</table>";
  echo '<p id="avg">Average: ' . ($sum / count($_SESSION["marks"])) . '</p>';
  echo '<p id="n">' . count($_SESSION["marks"]) . ' courses</p>';
}
?>` }),
      requests: [{}, { method: 'POST', body: 'course=ITCS333&mark=90' }, { method: 'POST', body: 'course=ITCS214&mark=70' }, {}, { query: 'clear=1' }],
      checks: () => [
        { d: R`Starts the session (${C('session_start()')})`, pts: 1, t: (rs, src) => /session_start\s*\(\s*\)/.test(code(src)) && !!rs[1].doc.querySelector('#marks') },
        { d: R`First visit: ${C('<p id="none">No session data</p>')}`, pts: 1, t: rs => tx(rs[0], '#none') === 'No session data' },
        { d: 'The posted mark is stored in the session', pts: 1, t: rs => !!rs[1].session && !!rs[1].session.marks && rs[1].session.marks.ITCS333 == 90 },
        { d: R`After two posts, ${C('#marks')} has 2 rows: ITCS333 90, ITCS214 70`, pts: 2, t: rs => JSON.stringify(rows(rs[2], '#marks')) === JSON.stringify([['ITCS333', '90'], ['ITCS214', '70']]) },
        { d: R`${C('#avg')} shows "Average: 80"`, pts: 1, t: rs => tx(rs[2], '#avg') === 'Average: 80' },
        { d: R`${C('#n')} shows "2 courses"`, pts: 1, t: rs => tx(rs[2], '#n') === '2 courses' },
        { d: 'A plain visit later still shows both marks', pts: 1, t: rs => rows(rs[3], '#marks').length === 2 },
        { d: R`${C('?clear=1')} removes the marks ("No session data"), with no warnings`, pts: 2, t: rs => tx(rs[4], '#none') === 'No session data' && !rs[4].doc.querySelector('#marks') && clean(rs) }
      ] }
  ];

  /* ================= Q4: short answers ================= */
  const Q4_POOL = ['sa-cookies-sessions', 'sa-getpost', 'sa-xss', 'sa-sqli', 'sa-hijack-vs-sqli', 'sa-transactions', 'sa-ajax', 'sa-http', 'sa-passwords', 'sa-https'];

  const PARTS = [
    { id: 'q1', kind: 'php', title: 'Q1 · Arrays & regex', marks: 13, scenarios: Q1, spec: specQ1, starter: () => ({ php: '<?php\n\n?>' }), model: modelQ1, checks: checksQ1, requests: () => [{}], dumpVar: s => s.v },
    { id: 'q2', kind: 'php', title: 'Q2 · PDO', marks: 10, scenarios: Q2, spec: specQ2, starter: starterQ2, model: modelQ2, checks: checksQ2, requests: reqQ2, db: () => DB },
    { id: 'q3', kind: 'php', title: 'Q3 · State', marks: 10, scenarios: Q3, spec: s => s.spec(), starter: s => s.starter(), model: s => s.model(), checks: s => s.checks(), requests: s => s.requests },
    { id: 'q4', kind: 'short', title: 'Q4 · Short answers', marks: 10 }
  ];

  /* grade one code part: [{d, pts, ok}] */
  async function grade(part, s, src) {
    src = src || '';
    const checks = part.checks(s);
    let rs = null;
    if (src.trim()) {
      try {
        const run = part.dumpVar ? withDump(src, part.dumpVar(s)) : src;
        rs = await PHPRUN.play(run, part.requests(s), { db: part.db ? part.db(s) : undefined });
        rs.forEach(r => { r.doc = new DOMParser().parseFromString(r.html, 'text/html'); });
      } catch (e) { rs = null; }
    }
    return checks.map(c => { let ok = false; try { ok = !!rs && !!c.t(rs, src); } catch (e) { ok = false; } return { d: c.d, pts: c.pts, ok }; });
  }
  const shortIds = seed => { const a = Q4_POOL.slice(), out = []; let x = seed; while (out.length < 2) { x = (x * 9301 + 49297) % 233280; out.push(a.splice(x % a.length, 1)[0]); } return out; };

  /* every scenario: model = full marks, empty = 0, starter = 0 */
  async function selfTest(out) {
    for (const part of PARTS.filter(p => p.kind === 'php')) {
      const sum = items => items.reduce((a, c) => a + (c.ok ? c.pts : 0), 0);
      for (const s of part.scenarios) {
        const total = part.checks(s).reduce((a, c) => a + c.pts, 0);
        if (total !== part.marks) out.push('final ' + part.id + ' ' + s.key + ': checks add up to ' + total + ', not ' + part.marks);
        const m = await grade(part, s, part.model(s).php);
        if (sum(m) !== part.marks) out.push('final ' + part.id + ' ' + s.key + ': model ' + sum(m) + '/' + part.marks + ' ; ' + m.filter(c => !c.ok).map(c => c.d).join(' ; '));
        const e = await grade(part, s, '');
        if (sum(e) !== 0) out.push('final ' + part.id + ' ' + s.key + ': empty scores ' + sum(e));
        const st = await grade(part, s, part.starter(s).php);
        if (sum(st) !== 0) out.push('final ' + part.id + ' ' + s.key + ': starter scores ' + sum(st) + ' ; ' + st.filter(c => c.ok).map(c => c.d).join(' ; '));
      }
    }
    if (shortIds(1).some(id => !SHORT.find(x => x.id === id))) out.push('final q4: unknown short-answer id');
  }

  return { PARTS, grade, selfTest, shortIds, DB };
})();

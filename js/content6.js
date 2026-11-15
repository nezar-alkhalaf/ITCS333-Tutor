/* Module 10: Databases & PDO (Ch 14). The sandbox answers new PDO("mysql:...dbname=uob") with a SQLite copy of UOB_DB below,
   reset on every Run. Seed SQL is written so it also reads as normal SQL. */
(() => {
  const R = String.raw;
  const UOB_SQL = `CREATE TABLE students (id INTEGER PRIMARY KEY, name VARCHAR(50), major VARCHAR(10), gpa DECIMAL(3,2));
INSERT INTO students (name, major, gpa) VALUES ('Ali', 'CS', 3.40), ('Sara', 'CE', 3.90), ('Hassan', 'IS', 2.10), ('Maryam', 'CS', 3.10), ('Omar', 'CS', 3.75), ('Noor', 'IS', 2.95);
CREATE TABLE products (id INTEGER PRIMARY KEY, name VARCHAR(50), category VARCHAR(30), price DECIMAL(6,3), stock INT, rating INT);
INSERT INTO products (name, category, price, stock, rating) VALUES ('Notebook', 'Stationery', 0.750, 120, 4), ('Headphones', 'Electronics', 12.500, 8, 5), ('Pen pack', 'Stationery', 1.200, 0, 3), ('USB cable', 'Electronics', 2.250, 35, 2), ('Backpack', 'Bags', 9.900, 4, 4), ('Calculator', 'Electronics', 6.000, 15, 3);
CREATE TABLE users (id INTEGER PRIMARY KEY, username VARCHAR(30), email VARCHAR(60), major VARCHAR(10));
INSERT INTO users (username, email, major) VALUES ('ali', 'ali@uob.edu.bh', 'CS'), ('sara', 'sara@uob.edu.bh', 'CE'), ('omar', 'omar@uob.edu.bh', 'IS');
CREATE TABLE accounts (id INTEGER PRIMARY KEY, owner VARCHAR(30), balance DECIMAL(10,3));
INSERT INTO accounts (owner, balance) VALUES ('Ali', 500.000), ('Sara', 120.000);`;
  const db = { name: 'uob', user: 'root', pass: '', sql: UOB_SQL };
  const CONN = R`<?php
// connection.php: included by every page that needs the database
$db = new PDO("mysql:host=localhost;dbname=uob;charset=utf8", "root", "");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>`;
  const SHOW = R`<?php
// show.php: prints the result of a SELECT as a table with the given id
function show($db, $sql, $id) {
  $rows = $db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
  echo "<table border='1' id='$id'>";
  if (count($rows) > 0) {
    echo "<tr><th>" . implode("</th><th>", array_keys($rows[0])) . "</th></tr>";
  }
  foreach ($rows as $r) {
    echo "<tr><td>" . implode("</td><td>", $r) . "</td></tr>";
  }
  echo "</table><p>" . count($rows) . " row(s)</p>";
}
?>`;
  const files = { 'connection.php': CONN };
  const filesShow = { 'connection.php': CONN, 'show.php': SHOW };

  const clean = rs => rs.every(r => !r.errors.length);
  const tx = (r, sel) => { const e = r && r.doc.querySelector(sel); return e ? e.textContent.replace(/\s+/g, ' ').trim() : null; };
  const all = (r, sel) => r ? [...r.doc.querySelectorAll(sel)].map(e => e.textContent.replace(/\s+/g, ' ').trim()) : [];
  const rows = (r, sel) => r ? [...r.doc.querySelectorAll(sel + ' tr')].filter(tr => tr.querySelector('td')).map(tr => [...tr.cells].map(c => c.textContent.trim())) : [];
  const code = src => U.phpScan(src).filter(p => p.t === 'code').map(p => p.s).join(' ');
  const strs = src => U.phpScan(src).filter(p => p.t === 'str').map(p => p.s).join(' ');

  LESSONS.push({
    id: 'db-sql', module: 'db', title: 'SQL: SELECT, INSERT, UPDATE and DELETE',
    big: R`A website keeps its data (users, products, orders) in a **database**, not in PHP variables that vanish after each request. A **relational** database such as MySQL stores data in **tables** and is controlled with **SQL**. PHP sends SQL to the database and gets rows back.

Every lab in this module has a small database called [[uob]] with four tables: [[students]], [[products]], [[users]] and [[accounts]]. It is reset each time you press Run.`,
    simple: R`A **table** has **columns** (fields) and **rows** (records). Each row has a **primary key**, usually [[id]], that identifies it.

The four statements:
- **Read**: [[SELECT name, gpa FROM students WHERE major = 'CS' ORDER BY gpa DESC;]]
  - [[*]] means all columns. [[WHERE]] filters rows. [[ORDER BY … ASC/DESC]] sorts. [[LIMIT 3]] keeps the first 3.
  - Conditions: [[=]], [[<>]] (not equal), [[<]], [[>=]], [[AND]], [[OR]], [[LIKE 'A%']] (starts with A).
- **Add**: [[INSERT INTO students (name, major, gpa) VALUES ('Fatima', 'CE', 3.6);]]
- **Change**: [[UPDATE students SET gpa = 2.5 WHERE name = 'Hassan';]]
- **Remove**: [[DELETE FROM students WHERE id = 6;]]

Text values go in **single quotes**; numbers do not. **Never forget the WHERE** in UPDATE and DELETE: without it, every row changes.

Counting and maths: [[SELECT COUNT(*) FROM students;]], [[SELECT AVG(gpa) FROM students WHERE major = 'CS';]].`,
    simpler: R`A database table is an Excel sheet that the server can search very fast.

- **SELECT** is "show me these columns, from that sheet, only the rows where…, sorted by…".
- **INSERT** adds a new row at the bottom.
- **UPDATE** changes cells in the rows you choose with WHERE.
- **DELETE** removes the rows you choose with WHERE.

Forgetting WHERE in UPDATE or DELETE is like selecting the whole sheet before pressing Delete.`,
    deeper: [
      { try: { task: R`Edit [[$sql]] and press Run. Try: [[SELECT * FROM products ORDER BY price DESC]], [[SELECT name FROM students WHERE name LIKE 'M%']], [[SELECT major, COUNT(*) FROM students GROUP BY major]].`, php: R`<?php
require 'connection.php';
require 'show.php';     // show($db, $sql, $id) prints a SELECT as a table

$sql = "SELECT name, major, gpa FROM students WHERE gpa >= 3 ORDER BY gpa DESC";
show($db, $sql, "result");
?>`, db, files: filesShow } },
      R`**Changing data.** Run the statements below one by one (the database is reset on every Run). The last line shows the table afterwards.`,
      { try: { task: R`Remove the [[WHERE]] from the UPDATE and run it. Every student now has the same GPA: that is why WHERE matters.`, php: R`<?php
require 'connection.php';
require 'show.php';

$db->exec("INSERT INTO students (name, major, gpa) VALUES ('Fatima', 'CE', 3.6)");
$db->exec("UPDATE students SET gpa = 2.5 WHERE name = 'Hassan'");
$db->exec("DELETE FROM students WHERE id = 6");

show($db, "SELECT * FROM students", "after");
?>`, db, files: filesShow } },
      R`**Creating a table (MySQL).** You will rarely write this in PHP, but you should be able to read it. (The sandbox runs SQLite, which writes [[AUTO_INCREMENT]] differently; your MySQL code stays as below.)`,
      { code: R`CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  major VARCHAR(10),
  gpa DECIMAL(3,2)
);`, lang: 'sql' },
      R`**NoSQL (concept only).** Not every database uses tables. **NoSQL** databases (for example MongoDB) store data as flexible **documents** (JSON-like objects), key–value pairs or graphs. Each document can have different fields, so there is no fixed schema, and they spread easily across many servers. Relational databases are better when data has a fixed structure, relations between tables, and transactions that must be all-or-nothing.`
    ],
    points: [
      'Tables have columns and rows; the primary key (id) identifies a row.',
      'SELECT columns FROM table WHERE … ORDER BY … ASC|DESC.',
      'INSERT INTO t (cols) VALUES (…); UPDATE t SET col = v WHERE …; DELETE FROM t WHERE ….',
      'Text in single quotes, numbers without.',
      'UPDATE or DELETE without WHERE changes every row.',
      'NoSQL: documents / key–value, no fixed schema; relational: tables, SQL, joins, transactions.'
    ],
    exam: [
      R`Write the SQL inside a PHP string: [[$sql = "SELECT * FROM books WHERE year > 2000 ORDER BY title";]]`,
      'MCQ: which statement changes existing rows (UPDATE) or removes them (DELETE).',
      'Short answer: relational vs NoSQL databases (concept level).'
    ],
    mistakes: [
      { lang: 'sql', wrong: R`DELETE FROM students;`, right: R`DELETE FROM students WHERE id = 6;`, why: 'Without WHERE every row is deleted.' },
      { lang: 'sql', wrong: R`SELECT * FROM students WHERE major = CS;`, right: R`SELECT * FROM students WHERE major = 'CS';`, why: 'Text values need single quotes; otherwise CS is read as a column name.' },
      { lang: 'sql', wrong: R`UPDATE students gpa = 3 WHERE id = 1;`, right: R`UPDATE students SET gpa = 3 WHERE id = 1;`, why: 'UPDATE needs SET before the column.' }
    ],
    summary: [
      'SELECT reads, INSERT adds, UPDATE changes, DELETE removes.',
      'WHERE filters; ORDER BY sorts.',
      'NoSQL = flexible documents, no fixed tables.'
    ],
    recall: [
      { q: 'Which statement changes the GPA of an existing student?', o: ['INSERT', 'UPDATE', 'ALTER', 'SELECT'], a: 1, why: 'UPDATE … SET … WHERE … changes existing rows.' },
      { q: R`What does [[ORDER BY gpa DESC]] do?`, o: ['Lowest GPA first', 'Highest GPA first', 'Removes duplicates', 'Filters GPAs'], a: 1, why: 'DESC = descending, from high to low.' },
      { q: R`[[DELETE FROM products;]] What happens?`, o: ['Nothing, WHERE is required', 'Every row is deleted', 'Only the first row is deleted', 'The table is dropped'], a: 1, why: 'Without WHERE the condition is true for every row.' },
      { q: 'Which describes a NoSQL document database?', o: ['Fixed tables joined with keys', 'Flexible JSON-like documents, no fixed schema', 'Only one table', 'It cannot store text'], a: 1, why: 'Document stores keep flexible JSON-like records.' }
    ],
    challenge: {
      task: R`Fill in the five SQL strings. The code below them already runs them and prints the results.
1. [[$q1]]: [[name]] and [[gpa]] of **CS** students, **highest GPA first**.
2. [[$q2]]: [[name]] of students with a GPA **below 3**, ordered by name.
3. [[$insert]]: add [[Fatima]], major [[CE]], GPA [[3.6]].
4. [[$update]]: set Hassan's GPA to [[2.5]].
5. [[$delete]]: delete the student named [[Noor]].`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php
require 'connection.php';
require 'show.php';

$q1 = "";
$q2 = "";
$insert = "";
$update = "";
$delete = "";

// --- do not change below ---
if ($q1) show($db, $q1, "q1");
if ($q2) show($db, $q2, "q2");
foreach ([$insert, $update, $delete] as $s) {
  if ($s) $db->exec($s);
}
show($db, "SELECT name, major, gpa FROM students ORDER BY id", "all");
?>` },
      db, files: filesShow,
      requests: [{}],
      checks: [
        { d: R`[[#q1]]: Omar 3.75, Ali 3.4, Maryam 3.1 (name and gpa only)`, t: rs => JSON.stringify(rows(rs[0], '#q1')) === JSON.stringify([['Omar', '3.75'], ['Ali', '3.4'], ['Maryam', '3.1']]) },
        { d: R`[[#q2]]: Hassan, Noor`, t: rs => JSON.stringify(rows(rs[0], '#q2')) === JSON.stringify([['Hassan'], ['Noor']]) },
        { d: 'Fatima (CE, 3.6) was added', t: rs => rows(rs[0], '#all').some(r => r.join() === 'Fatima,CE,3.6') },
        { d: 'Hassan now has 2.5', t: rs => rows(rs[0], '#all').some(r => r.join() === 'Hassan,IS,2.5') },
        { d: 'Noor was deleted, and nobody else', t: rs => { const a = rows(rs[0], '#all'); return a.length === 6 && !a.some(r => r[0] === 'Noor'); } },
        { d: 'UPDATE and DELETE use WHERE; no SQL errors', t: (rs, src) => /UPDATE[\s\S]*WHERE/i.test(src.match(/\$update\s*=\s*"[^"]*"/) || '') && /DELETE[\s\S]*WHERE/i.test(src.match(/\$delete\s*=\s*"[^"]*"/) || '') && clean(rs) }
      ],
      solution: { php: R`<?php
require 'connection.php';
require 'show.php';

$q1 = "SELECT name, gpa FROM students WHERE major = 'CS' ORDER BY gpa DESC";
$q2 = "SELECT name FROM students WHERE gpa < 3 ORDER BY name";
$insert = "INSERT INTO students (name, major, gpa) VALUES ('Fatima', 'CE', 3.6)";
$update = "UPDATE students SET gpa = 2.5 WHERE name = 'Hassan'";
$delete = "DELETE FROM students WHERE name = 'Noor'";

// --- do not change below ---
if ($q1) show($db, $q1, "q1");
if ($q2) show($db, $q2, "q2");
foreach ([$insert, $update, $delete] as $s) {
  if ($s) $db->exec($s);
}
show($db, "SELECT name, major, gpa FROM students ORDER BY id", "all");
?>` }
    }
  });

  LESSONS.push({
    id: 'db-query', module: 'db', title: 'Connecting with PDO: query, fetch and try/catch',
    big: R`**PDO** (PHP Data Objects) is the standard way for PHP to talk to a database. The same PDO code works with MySQL, SQLite, PostgreSQL and others: only the connection string changes. The exam pattern is always the same: connect inside [[try]], run a query, loop with [[fetch()]], print HTML rows, and handle [[PDOException]] in [[catch]].`,
    simple: R`**1. Connect**
[[$db = new PDO("mysql:host=localhost;dbname=uob", "root", "");]]
- The first argument is the **DSN**: driver ([[mysql:]]), server ([[host=]]) and database ([[dbname=]]).
- Then the username and the password.
- [[$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);]] → every SQL error throws a [[PDOException]] you can catch.
- Real sites put these lines in one file, [[connection.php]], and [[require]] it on every page.

**2. Query and fetch**
- [[$result = $db->query("SELECT * FROM products");]] runs a SELECT and returns a **PDOStatement**.
- [[$row = $result->fetch()]] gives the **next** row as an array, or [[false]] when there are no more. So: [[while ($row = $result->fetch()) { … }]]
- Read columns by name: [[$row["price"]]]. [[fetch(PDO::FETCH_ASSOC)]] gives names only (no number keys).
- [[fetchAll()]] gives all rows at once; [[count($rows)]] counts them.

**3. Catch errors**
[[try { … } catch (PDOException $e) { echo "Error: " . $e->getMessage(); }]]

At the end, [[$db = null;]] closes the connection (PHP also closes it when the script ends).`,
    simpler: R`- [[new PDO(...)]] is dialling the database's phone number (host and database name) and giving your username and password.
- [[query()]] is asking a question in SQL.
- [[fetch()]] is reading the answer **one line at a time**; when there are no more lines it says [[false]], and the [[while]] loop stops.
- [[try / catch]] is "if the call fails (wrong password, wrong table), don't crash: say what went wrong".`,
    deeper: [
      { try: { task: R`Change the password in the connection to [["x"]] and run: the [[catch]] block shows the error. Then change the table name to [[product]] (missing s).`, php: R`<?php
try {
  $db = new PDO("mysql:host=localhost;dbname=uob", "root", "");
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $result = $db->query("SELECT name, price, stock FROM products ORDER BY price");
  echo "<table border='1'><tr><th>Name</th><th>Price</th><th>Stock</th></tr>";
  while ($row = $result->fetch()) {
    echo "<tr><td>" . $row["name"] . "</td><td>" . number_format($row["price"], 3) . "</td><td>" . $row["stock"] . "</td></tr>";
  }
  echo "</table>";
  $db = null;
} catch (PDOException $e) {
  echo "<p>Error: " . $e->getMessage() . "</p>";
}
?>`, db } },
      R`**Styling rows by a condition** and **stars with a for loop** are both classic exam lines. Decide the class in PHP, then print it in the tag.`,
      { try: { task: R`Change the condition so that rows with a price above 5 get the class [[pricey]] (add a CSS rule for it).`, php: R`<style>
  .out { background: #ffd6d6; }
  .low { color: #c00; font-weight: bold; }
</style>
<?php
require('connection.php');
try {
  $result = $db->query("SELECT * FROM products");
  echo "<table border='1'>";
  while ($row = $result->fetch()) {
    $class = ($row["stock"] == 0) ? "out" : "";
    echo "<tr class='$class'>";
    echo "<td>" . $row["name"] . "</td>";
    echo "<td" . ($row["stock"] < 10 ? " class='low'" : "") . ">" . $row["stock"] . "</td>";
    $stars = "";
    for ($i = 1; $i <= $row["rating"]; $i++) {
      $stars .= "★";
    }
    echo "<td>$stars</td></tr>";
  }
  echo "</table>";
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}
?>`, db, files } },
      R`**Counting rows.** After a SELECT, the safe way is [[count($result->fetchAll())]]. ([[$result->rowCount()]] gives the number of rows for SELECT on MySQL, but not on every database; for INSERT, UPDATE and DELETE it is reliable everywhere.)`
    ],
    points: [
      'new PDO("mysql:host=…;dbname=…", user, password) connects.',
      'ERRMODE_EXCEPTION makes SQL errors throw PDOException.',
      'Wrap database code in try / catch (PDOException $e) and print $e->getMessage().',
      'query() runs a SELECT; while ($row = $stmt->fetch()) reads row by row.',
      '$row["column"] reads a value; FETCH_ASSOC returns names only.',
      'require("connection.php") shares one connection file across pages.'
    ],
    exam: [
      R`Full question: [[require('connection.php')]], [[try/catch (PDOException)]], query, a [[fetch()]] loop printing a table, colouring rows or cells by a condition, and stars with a [[for]] loop.`,
      R`MCQ: "PDO supports many databases" (true), and what the DSN contains.`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
$db = new PDO("localhost", "uob", "root", "");`, right: R`<?php
$db = new PDO("mysql:host=localhost;dbname=uob", "root", "");`, why: 'The first argument is one DSN string with the driver, host and database name.' },
      { lang: 'php', wrong: R`<?php
$row = $result->fetch();
while ($row) {
  echo $row["name"];   // never moves to the next row
}`, right: R`<?php
while ($row = $result->fetch()) {
  echo $row["name"];
}`, why: 'fetch() must be called on every loop to move to the next row.' },
      { lang: 'php', wrong: R`<?php
} catch (Exception $e) {
  echo $e->getMessage;`, right: R`<?php
} catch (PDOException $e) {
  echo $e->getMessage();`, why: 'getMessage is a method, so it needs (). Catching PDOException is the expected answer.' }
    ],
    summary: [
      'Connect → query → while fetch → print.',
      'try / catch (PDOException $e).',
      'Classes and stars decided in PHP.'
    ],
    recall: [
      { q: R`What does [[$stmt->fetch()]] return when there are no more rows?`, o: ['null', 'false', 'An empty array', '0'], a: 1, why: 'false ends the while loop.' },
      { q: 'Which attribute makes SQL errors throw exceptions?', o: [R`[[PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION]]`, R`[[PDO::ERRORS, true]]`, R`[[PDO::THROW]]`, R`[[PDO::ATTR_CASE]]`], a: 0, why: 'ERRMODE_EXCEPTION.' },
      { q: R`In [["mysql:host=localhost;dbname=shop"]], what is [[shop]]?`, o: ['The table', 'The database', 'The user', 'The password'], a: 1, why: 'dbname = the database name.' },
      { q: 'Why use PDO instead of a MySQL-only extension?', o: ['It is the only way to run SELECT', 'The same code works with many databases', 'It does not need SQL', 'It is faster than SQL'], a: 1, why: 'PDO is a common interface over many drivers.' }
    ],
    challenge: {
      task: R`Print every product in a [[<table id="products">]], **sorted by name**, one row per product with 4 cells: name, price (3 decimals), stock, and stars ([["★"]] repeated [[rating]] times, built with a [[for]] loop).
- Rows with stock **0** get [[class="out"]].
- The stock **cell** gets [[class="low"]] when stock is below 10.
- Use [[require('connection.php')]] and a [[try / catch (PDOException $e)]] that prints the error message.`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php
require('connection.php');

?>` },
      db, files,
      requests: [{}],
      checks: [
        { d: R`6 rows, sorted by name (Backpack … USB cable)`, t: rs => rows(rs[0], '#products').map(r => r[0]).join() === 'Backpack,Calculator,Headphones,Notebook,Pen pack,USB cable' },
        { d: R`Prices have 3 decimals (Headphones → 12.500)`, t: rs => { const r = rows(rs[0], '#products').find(x => x[0] === 'Headphones'); return r && r[1] === '12.500'; } },
        { d: R`Stars: Headphones ★★★★★, USB cable ★★`, t: rs => { const a = rows(rs[0], '#products'); const f = n => (a.find(x => x[0] === n) || [])[3]; return f('Headphones') === '★★★★★' && f('USB cable') === '★★'; } },
        { d: R`Only the Pen pack row (stock 0) has class "out"`, t: rs => { const t = [...rs[0].doc.querySelectorAll('#products tr')].filter(tr => tr.querySelector('td')); return t.length === 6 && t.filter(tr => tr.classList.contains('out')).map(tr => tr.cells[0].textContent.trim()).join() === 'Pen pack'; } },
        { d: R`Stock cells below 10 have class "low" (Backpack, Headphones, Pen pack)`, t: rs => [...rs[0].doc.querySelectorAll('#products td.low')].map(td => td.parentNode.cells[0].textContent.trim()).sort().join() === 'Backpack,Headphones,Pen pack' },
        { d: R`Uses query + fetch in a loop, a for loop, and catch (PDOException $e); no warnings`, t: (rs, src) => /->\s*query\s*\(/.test(code(src)) && /->\s*fetch(All)?\s*\(/.test(code(src)) && /\bfor\s*\(/.test(code(src)) && /catch\s*\(\s*PDOException\s+\$\w+\s*\)/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<?php
require('connection.php');
try {
  $result = $db->query("SELECT * FROM products ORDER BY name");
  echo '<table id="products" border="1">';
  echo "<tr><th>Name</th><th>Price</th><th>Stock</th><th>Rating</th></tr>";
  while ($row = $result->fetch()) {
    if ($row["stock"] == 0) {
      echo '<tr class="out">';
    } else {
      echo "<tr>";
    }
    echo "<td>" . $row["name"] . "</td>";
    echo "<td>" . number_format($row["price"], 3) . "</td>";
    if ($row["stock"] < 10) {
      echo '<td class="low">' . $row["stock"] . "</td>";
    } else {
      echo "<td>" . $row["stock"] . "</td>";
    }
    $stars = "";
    for ($i = 0; $i < $row["rating"]; $i++) {
      $stars .= "★";
    }
    echo "<td>" . $stars . "</td>";
    echo "</tr>";
  }
  echo "</table>";
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}
?>` }
    }
  });

  LESSONS.push({
    id: 'db-exec', module: 'db', title: 'Changing data with exec() and counting affected rows',
    big: R`[[query()]] is for questions that return rows (SELECT). For statements that **change** data (INSERT, UPDATE, DELETE) PDO has [[exec()]], which returns **how many rows were affected**. Printing that number ("2 rows deleted") is a common exam line.`,
    simple: R`- [[$n = $db->exec("DELETE FROM products WHERE stock = 0");]] → [[$n]] is the number of deleted rows (0 if none matched).
- [[exec]] works for INSERT, UPDATE and DELETE. Use [[query]] for SELECT.
- After an INSERT, [[$db->lastInsertId()]] gives the new row's id.
- [[exec]] returns [[false]] on failure when errors do not throw; with [[ERRMODE_EXCEPTION]] a failure throws instead.

**User input and exec.** exec runs the string exactly as written. Gluing raw user input into it is dangerous (SQL injection, Chapter 16). Here we only use fixed values or a number forced with [[(int)]]. For anything typed by a user, use the **prepared statements** of the next lesson.`,
    simpler: R`[[exec]] is giving the database an order ("delete these", "raise those"), and the database replies with **how many rows it touched**. A reply of 0 is not an error: it just means no row matched your WHERE.`,
    deeper: [
      { try: { task: R`Change the UPDATE to [[stock < 20]] and see the count change. Then delete a product that does not exist ([[id = 99]]).`, php: R`<?php
require 'connection.php';
try {
  $n = $db->exec("UPDATE products SET stock = stock + 10 WHERE stock < 10");
  echo "<p>$n products restocked</p>";

  $n = $db->exec("DELETE FROM products WHERE id = 3");
  echo "<p>$n product deleted</p>";

  $db->exec("INSERT INTO products (name, category, price, stock, rating) VALUES ('Stapler', 'Stationery', 1.5, 20, 4)");
  echo "<p>New product id: " . $db->lastInsertId() . "</p>";

  $all = $db->query("SELECT name, stock FROM products")->fetchAll();
  echo "<p>" . count($all) . " products now</p>";
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}
?>`, db, files } },
      R`**A form that changes data.** The page handles the POST first (change the database), then shows the up-to-date list. Submit the form inside the result twice: the database keeps the change between your requests until you press Run or "New visitor".`
    ],
    points: [
      'exec(sql) runs INSERT / UPDATE / DELETE and returns the number of affected rows.',
      'query(sql) is for SELECT (returns rows).',
      'lastInsertId() returns the id of the row just inserted.',
      '0 affected rows is not an error: nothing matched the WHERE.',
      'Never glue raw user input into exec; use (int) for numbers or prepared statements.'
    ],
    exam: [
      R`Print the count: [[$count = $db->exec("DELETE …"); echo "$count rows deleted";]]`,
      'MCQ: which PDO method returns the number of affected rows for a DELETE.'
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
$rows = $db->exec("SELECT * FROM products");
foreach ($rows as $r) { … }`, right: R`<?php
$result = $db->query("SELECT * FROM products");
foreach ($result as $r) { … }`, why: 'exec returns a number, not rows. Use query for SELECT.' },
      { lang: 'php', wrong: R`<?php
$db->exec("DELETE FROM products WHERE id = " . $_POST["id"]);`, right: R`<?php
$id = (int) $_POST["id"];
$db->exec("DELETE FROM products WHERE id = $id");`, why: 'Raw input in SQL allows injection. (int) forces a plain number; prepared statements are better still.' }
    ],
    summary: [
      'exec → number of affected rows.',
      'query → rows.',
      'lastInsertId after INSERT.'
    ],
    recall: [
      { q: R`What does [[$db->exec("UPDATE products SET price = 1 WHERE id = 50")]] return when no product has id 50?`, o: ['false', '0', 'null', 'An exception'], a: 1, why: 'No row matched, so 0 rows were affected.' },
      { q: 'Which method should run a SELECT?', o: ['exec', 'query', 'commit', 'lastInsertId'], a: 1, why: 'query returns a statement you can fetch rows from.' },
      { q: R`How do you get the id of the row you just inserted?`, o: [R`[[$db->insertId]]`, R`[[$db->lastInsertId()]]`, R`[[$stmt->id()]]`, R`[[$db->exec("ID")]]`], a: 1, why: 'lastInsertId().' }
    ],
    challenge: {
      task: R`A small stock page. Handle the POST **first**, then list the products.
- If [[$_POST["action"]]] is [["restock"]]: add 10 to the stock of every product with stock below 10 using [[exec]], and print [[<p id="msg">N products restocked</p>]].
- If it is [["delete"]]: delete the product whose id is [[$_POST["id"]]] (force it to a number with [[(int)]]), and print [[<p id="msg">N product(s) deleted</p>]], e.g. [["1 product(s) deleted"]] or [["0 product(s) deleted"]].
- Always print [[<ul id="list">]] with one [[<li>]] per product: [["Name (stock)"]], ordered by id.`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<form method="post">
  <button name="action" value="restock">Restock low items</button>
  Id: <input name="id" size="3"> <button name="action" value="delete">Delete</button>
</form>
<?php
require 'connection.php';

?>` },
      db, files,
      requests: [{}, { method: 'POST', body: 'action=restock&id=' }, { method: 'POST', body: 'action=delete&id=3' }, { method: 'POST', body: 'action=delete&id=3' }],
      checks: [
        { d: 'First visit: 6 products and no message', t: rs => all(rs[0], '#list li').length === 6 && all(rs[0], '#list li')[0] === 'Notebook (120)' && !rs[0].doc.querySelector('#msg') },
        { d: R`Restock → "3 products restocked", and Pen pack now shows (10)`, t: rs => tx(rs[1], '#msg') === '3 products restocked' && all(rs[1], '#list li').includes('Pen pack (10)') },
        { d: R`Delete id 3 → "1 product(s) deleted" and 5 products left`, t: rs => tx(rs[2], '#msg') === '1 product(s) deleted' && all(rs[2], '#list li').length === 5 && !all(rs[2], '#list li').some(x => /^Pen pack/.test(x)) },
        { d: R`Delete id 3 again → "0 product(s) deleted"`, t: rs => tx(rs[3], '#msg') === '0 product(s) deleted' && all(rs[3], '#list li').length === 5 },
        { d: R`Uses [[exec]] and [[(int)]]; no warnings`, t: (rs, src) => /->\s*exec\s*\(/.test(code(src)) && /\(\s*int\s*\)|intval\s*\(/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<form method="post">
  <button name="action" value="restock">Restock low items</button>
  Id: <input name="id" size="3"> <button name="action" value="delete">Delete</button>
</form>
<?php
require 'connection.php';
try {
  if (isset($_POST["action"])) {
    if ($_POST["action"] == "restock") {
      $n = $db->exec("UPDATE products SET stock = stock + 10 WHERE stock < 10");
      echo '<p id="msg">' . $n . ' products restocked</p>';
    } elseif ($_POST["action"] == "delete") {
      $id = (int) $_POST["id"];
      $n = $db->exec("DELETE FROM products WHERE id = $id");
      echo '<p id="msg">' . $n . ' product(s) deleted</p>';
    }
  }
  $result = $db->query("SELECT name, stock FROM products ORDER BY id");
  echo '<ul id="list">';
  while ($row = $result->fetch()) {
    echo "<li>" . $row["name"] . " (" . $row["stock"] . ")</li>";
  }
  echo "</ul>";
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}
?>` }
    }
  });

  LESSONS.push({
    id: 'db-prepared', module: 'db', title: 'Prepared statements: prepare, bindParam and execute',
    big: R`Whenever a value in your SQL comes from the user (a login email, a search word, an id), use a **prepared statement**. You send the SQL with **placeholders** first, then the values separately. The database never mixes the values into the SQL code, so input like [[' OR '1'='1]] is treated as plain text. This is the standard defence against **SQL injection**, and the 2024-25 final asked for exactly this code.`,
    simple: R`**Three steps**
1. [[$stmt = $db->prepare("SELECT * FROM users WHERE email = :email");]]: SQL with a **named placeholder** ([[:email]]). No quotes around it.
2. Give the value, one of two ways:
   - [[$stmt->bindParam(':email', $_POST['email']);]] then [[$stmt->execute();]]
   - or in one go: [[$stmt->execute([':email' => $_POST['email']]);]]
3. Read the result: [[$user = $stmt->fetch();]] (one row, or [[false]] if nobody matched), or loop with [[while ($row = $stmt->fetch())]].

**bindParam vs execute([...])**
- [[bindParam]] links a **variable**; its value is read when [[execute()]] runs. Useful in loops: bind once, change the variable, execute again.
- [[bindValue]] copies the value at that moment.
- [[execute([...])]] is the shortest; every value is passed as text.

Placeholders can also be [[?]] with values in order: [[prepare("… WHERE id = ?")]] then [[execute([5])]].

Prepared statements work for INSERT, UPDATE and DELETE too; then [[$stmt->rowCount()]] gives the affected rows.`,
    simpler: R`A prepared statement is a **form with empty boxes**.

- [[prepare]] prints the form: "find the user whose email is [ :email ]".
- [[bindParam]] / [[execute]] writes the user's text **inside the box**.
- Whatever the user writes stays inside the box, even if it looks like SQL. It can never change the form itself.`,
    deeper: [
      { try: { task: R`Submit the form in the result with [[ali@uob.edu.bh]], with an unknown email, and with [[x' OR '1'='1]]. The last one finds nobody: it is just text.`, php: R`<form method="post">
  Email: <input name="email" size="28">
  <button type="submit">Log in</button>
</form>
<?php
if (isset($_POST["email"])) {
  try {
    $db = new PDO("mysql:host=localhost;dbname=uob", "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->bindParam(':email', $_POST['email']);
    $stmt->execute();
    $user = $stmt->fetch();

    if ($user) {
      echo "<div class='welcome'>Welcome " . $user['username'] . " (" . $user['major'] . ")</div>";
    } else {
      echo "<p>No account for that email</p>";
    }
  } catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
}
?>`, req: { method: 'POST', body: 'email=sara%40uob.edu.bh' }, db } },
      R`**Several values and a loop.** [[execute([...])]] with an array, and the same prepared statement reused for many rows.`,
      { try: { task: R`Add a fourth student to [[$new]] and run again.`, php: R`<?php
require 'connection.php';

$stmt = $db->prepare("INSERT INTO students (name, major, gpa) VALUES (:name, :major, :gpa)");
$new = [
  ["Fatima", "CE", 3.6],
  ["Yousif", "CS", 2.8],
  ["Huda",   "IS", 3.3],
];
foreach ($new as $s) {
  $stmt->execute([':name' => $s[0], ':major' => $s[1], ':gpa' => $s[2]]);
}

$find = $db->prepare("SELECT name, gpa FROM students WHERE major = ? AND gpa >= ? ORDER BY gpa DESC");
$find->execute(["CS", 3]);
while ($row = $find->fetch()) {
  echo "<p>" . $row["name"] . ": " . $row["gpa"] . "</p>";
}
?>`, db, files } }
    ],
    points: [
      'prepare(SQL with :name placeholders) → bind values → execute() → fetch().',
      'Placeholders have no quotes: WHERE email = :email.',
      'bindParam binds a variable (read at execute time); execute([":x" => v]) passes values directly.',
      'fetch() returns one row or false: test it with if ($user).',
      'Prepared statements stop SQL injection because values never become SQL code.'
    ],
    exam: [
      R`2024-25 style: [[prepare("SELECT … WHERE email = :email")]], [[bindParam(':email', $_POST['email'])]], [[execute()]], [[$user = $stmt->fetch()]], then [[<div class="welcome">Welcome <?= $user['username'] ?></div>]].`,
      'Short answer: how do prepared statements prevent SQL injection?',
      R`Know both [[bindParam]] and [[execute([...])]] forms.`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
$stmt = $db->prepare("SELECT * FROM users WHERE email = ':email'");`, right: R`<?php
$stmt = $db->prepare("SELECT * FROM users WHERE email = :email");`, why: 'In quotes, :email is just the text ":email", not a placeholder.' },
      { lang: 'php', wrong: R`<?php
$stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
$user = $stmt->fetch();      // execute was never called`, right: R`<?php
$stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
$stmt->execute([':email' => $email]);
$user = $stmt->fetch();`, why: 'prepare only prepares. Nothing runs until execute().' },
      { lang: 'php', wrong: R`<?php
$db->query("SELECT * FROM users WHERE email = '" . $_POST['email'] . "'");`, right: R`<?php
$stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
$stmt->execute([':email' => $_POST['email']]);`, why: 'Gluing input into SQL is exactly what SQL injection exploits.' }
    ],
    summary: [
      'prepare → bindParam / execute([…]) → fetch.',
      ':placeholders without quotes.',
      'The safe way to use user input in SQL.'
    ],
    recall: [
      { q: 'What is the correct order?', o: ['execute, prepare, fetch', 'prepare, execute, fetch', 'fetch, prepare, execute', 'prepare, fetch, execute'], a: 1, why: 'Prepare the SQL, run it with the values, then read the rows.' },
      { q: R`What does [[$stmt->fetch()]] return when no user has that email?`, o: ['An empty string', 'false', 'null', 'An exception'], a: 1, why: 'No row → false, so if ($user) is false.' },
      { q: 'Why do prepared statements stop SQL injection?', o: ['They encrypt the SQL', 'The values are sent separately and never run as SQL', 'They remove quotes from input', 'They only allow numbers'], a: 1, why: 'The SQL is fixed before the values arrive.' },
      { q: R`Which line passes the value directly, without bindParam?`, o: [R`[[$stmt->execute([':id' => 5]);]]`, R`[[$stmt->fetch(5);]]`, R`[[$stmt->prepare(5);]]`, R`[[$db->execute(5);]]`], a: 0, why: 'execute accepts an array of placeholder values.' }
    ],
    challenge: {
      task: R`Write the login check (2024-25 style). When the form is posted:
1. Connect with [[new PDO("mysql:host=localhost;dbname=uob", "root", "")]] inside [[try]].
2. Prepare [[SELECT * FROM users WHERE email = :email]], bind [[$_POST['email']]] with [[bindParam]], execute, and fetch the row into [[$user]].
3. If a user was found print [[<div class="welcome">Welcome USERNAME</div>]], otherwise [[<div class="error">No account for that email</div>]].
4. In [[catch (PDOException $e)]], print the message.`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<form method="post">
  Email: <input name="email">
  <button type="submit">Log in</button>
</form>
<?php
if (isset($_POST['email'])) {

}
?>` },
      db,
      req: { method: 'POST', body: 'email=sara%40uob.edu.bh' },
      requests: [{}, { method: 'POST', body: 'email=sara%40uob.edu.bh' }, { method: 'POST', body: 'email=nobody%40uob.edu.bh' }, { method: 'POST', body: "email=x%27+OR+%271%27%3D%271" }],
      checks: [
        { d: 'First visit: only the form', t: rs => !rs[0].doc.querySelector('.welcome, .error') && !!rs[0].doc.querySelector('input[name=email]') },
        { d: R`sara@uob.edu.bh → "Welcome sara" in [[div.welcome]]`, t: rs => tx(rs[1], 'div.welcome') === 'Welcome sara' },
        { d: R`An unknown email → [[div.error]] "No account for that email"`, t: rs => tx(rs[2], 'div.error') === 'No account for that email' && !rs[2].doc.querySelector('.welcome') },
        { d: R`[[x' OR '1'='1]] does not log anyone in`, t: rs => !rs[3].doc.querySelector('.welcome') && tx(rs[3], 'div.error') === 'No account for that email' },
        { d: R`Uses prepare with [[:email]], bindParam and execute (no input glued into SQL)`, t: (rs, src) => /->\s*prepare\s*\(/.test(code(src)) && /:email/.test(strs(src)) && /bindParam\s*\(\s*['"]:email['"]/.test(src) && /->\s*execute\s*\(/.test(code(src)) && !/\$_POST[^;]*\.\s*["']|["']\s*\.\s*\$_POST/.test(src.split('prepare')[1] || '') },
        { d: R`Has [[catch (PDOException $e)]]; no warnings`, t: (rs, src) => /catch\s*\(\s*PDOException\s+\$\w+\s*\)/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<form method="post">
  Email: <input name="email">
  <button type="submit">Log in</button>
</form>
<?php
if (isset($_POST['email'])) {
  try {
    $db = new PDO("mysql:host=localhost;dbname=uob", "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->bindParam(':email', $_POST['email']);
    $stmt->execute();
    $user = $stmt->fetch();
    if ($user) {
      echo '<div class="welcome">Welcome ' . $user['username'] . '</div>';
    } else {
      echo '<div class="error">No account for that email</div>';
    }
  } catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
}
?>` }
    }
  });

  LESSONS.push({
    id: 'db-transactions', module: 'db', title: 'Transactions: beginTransaction, commit and rollBack',
    big: R`Some jobs need **several** SQL statements that must **all** succeed or **all** be cancelled. The textbook example is a money transfer: take 100 from Ali, give 100 to Sara. If the server fails between the two updates, money disappears. A **transaction** groups the statements so the database applies them together, or not at all.`,
    simple: R`- [[$db->beginTransaction();]] → start. From now on, changes are not final.
- Run your statements ([[exec]], or [[prepare]] + [[execute]], often in a loop).
- [[$db->commit();]] → everything worked: make all the changes permanent.
- [[$db->rollBack();]] → something failed: cancel every change since beginTransaction.

The usual shape:
[[try { $db->beginTransaction(); …statements…; $db->commit(); } catch (Exception $e) { $db->rollBack(); echo "Failed: " . $e->getMessage(); }]]

To cancel for a **business rule** (not enough money, item out of stock), [[throw new Exception("…")]] inside the try: control jumps to catch, which rolls back.

The four promises of a transaction are called **ACID**: Atomic (all or nothing), Consistent, Isolated, Durable.`,
    simpler: R`A transaction is a shopping trolley.

- [[beginTransaction]]: you take a trolley.
- Each statement puts an item in the trolley; nothing is paid yet.
- [[commit]]: you pay, and everything in the trolley is yours.
- [[rollBack]]: you leave the trolley, and every item goes back on the shelf, as if you never came.`,
    deeper: [
      { try: { task: R`Change [[$amount]] to 800 and run: the check throws, and [[rollBack]] cancels the first UPDATE too. Both balances stay as they were.`, php: R`<?php
require 'connection.php';
$amount = 100;

function balances($db) {
  foreach ($db->query("SELECT owner, balance FROM accounts") as $a) {
    echo $a["owner"] . ": " . number_format($a["balance"], 3) . " BD<br>";
  }
}

echo "<h3>Before</h3>";
balances($db);
try {
  $db->beginTransaction();
  $take = $db->prepare("UPDATE accounts SET balance = balance - :amt WHERE id = :id");
  $give = $db->prepare("UPDATE accounts SET balance = balance + :amt WHERE id = :id");
  $take->execute([':amt' => $amount, ':id' => 1]);

  $left = $db->query("SELECT balance FROM accounts WHERE id = 1")->fetchColumn();
  if ($left < 0) {
    throw new Exception("not enough money");
  }
  $give->execute([':amt' => $amount, ':id' => 2]);
  $db->commit();
  echo "<p>Transfer done</p>";
} catch (Exception $e) {
  $db->rollBack();
  echo "<p>Transfer failed: " . $e->getMessage() . "</p>";
}
echo "<h3>After</h3>";
balances($db);
?>`, db, files } },
      R`**Many inserts in one transaction.** Past papers loop over an array (for example the items saved in a session) and insert each one inside a transaction, so a failure halfway leaves nothing half-saved.`,
      { code: R`<?php
$items = [["Pen", 2], ["Book", 1], ["Bag", 1]];
try {
  $db->beginTransaction();
  $stmt = $db->prepare("INSERT INTO orders (item, qty) VALUES (:item, :qty)");
  foreach ($items as $it) {
    $stmt->execute([':item' => $it[0], ':qty' => $it[1]]);
  }
  $db->commit();
  echo count($items) . " items saved";
} catch (PDOException $e) {
  $db->rollBack();
  echo "Nothing saved: " . $e->getMessage();
}
?>`, lang: 'php' }
    ],
    points: [
      'A transaction makes several statements all-or-nothing.',
      'beginTransaction() → statements → commit().',
      'On any error: rollBack() in catch cancels everything since beginTransaction.',
      'throw new Exception(...) inside try to cancel for a business rule.',
      'ACID: Atomic, Consistent, Isolated, Durable.'
    ],
    exam: [
      R`Code: [[beginTransaction]], [[prepare]], [[execute([':x' => …])]] in a loop, [[commit]], and [[rollBack]] in [[catch]].`,
      'Short answer: why use transactions? Explain with the money-transfer example.'
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
$db->beginTransaction();
$db->exec($take);
$db->exec($give);
// commit forgotten`, right: R`<?php
$db->beginTransaction();
$db->exec($take);
$db->exec($give);
$db->commit();`, why: 'Without commit the changes are thrown away when the script ends.' },
      { lang: 'php', wrong: R`<?php
} catch (PDOException $e) {
  $db->commit();
}`, right: R`<?php
} catch (PDOException $e) {
  $db->rollBack();
}`, why: 'After a failure you cancel (rollBack), you do not save.' },
      { lang: 'php', wrong: R`<?php
$db->rollback();   // works in PHP, but write it as in the manual`, right: R`<?php
$db->rollBack();`, why: 'PHP method names are not case-sensitive, but the documented name is rollBack (capital B); use it in the exam.' }
    ],
    summary: [
      'begin → statements → commit.',
      'catch → rollBack.',
      'All or nothing (ACID).'
    ],
    recall: [
      { q: 'Which call makes the changes of a transaction permanent?', o: ['beginTransaction()', 'commit()', 'rollBack()', 'execute()'], a: 1, why: 'commit saves everything since beginTransaction.' },
      { q: 'The second UPDATE of a transfer fails. What should the catch block do?', o: ['commit()', 'rollBack()', 'Nothing', 'Run the first UPDATE again'], a: 1, why: 'rollBack undoes the first UPDATE too.' },
      { q: 'The A in ACID stands for…', o: ['Available', 'Atomic', 'Automatic', 'Accurate'], a: 1, why: 'Atomic: all or nothing.' }
    ],
    challenge: {
      task: R`Write the transfer handler. When the form is posted with [[from]], [[to]] and [[amount]]:
1. Start a transaction.
2. Subtract the amount from account [[from]] and add it to account [[to]], using **prepared statements** with named placeholders.
3. If the sender's balance is now **below 0**, [[throw new Exception("not enough money")]].
4. Commit and print [[<p id="msg">Transfer done</p>]]; in [[catch]], roll back and print [[<p id="msg">Transfer failed: MESSAGE</p>]].
The starter already prints the balances at the end.`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<form method="post">
  From <input name="from" size="2"> to <input name="to" size="2">
  amount <input name="amount" size="6"> <button type="submit">Send</button>
</form>
<?php
require 'connection.php';
if (isset($_POST["amount"])) {

}

// balances (do not change)
echo '<table id="acc" border="1">';
foreach ($db->query("SELECT owner, balance FROM accounts ORDER BY id") as $a) {
  echo "<tr><td>" . $a["owner"] . "</td><td>" . number_format($a["balance"], 3) . "</td></tr>";
}
echo "</table>";
?>` },
      db, files,
      req: { method: 'POST', body: 'from=1&to=2&amount=100' },
      requests: [{ method: 'POST', body: 'from=1&to=2&amount=100' }, { method: 'POST', body: 'from=2&to=1&amount=1000' }, { method: 'POST', body: 'from=2&to=1&amount=20' }],
      checks: [
        { d: R`Ali → Sara 100: "Transfer done", Ali 400.000, Sara 220.000`, t: rs => tx(rs[0], '#msg') === 'Transfer done' && JSON.stringify(rows(rs[0], '#acc')) === JSON.stringify([['Ali', '400.000'], ['Sara', '220.000']]) },
        { d: R`Sara → Ali 1000: "Transfer failed: not enough money"`, t: rs => tx(rs[1], '#msg') === 'Transfer failed: not enough money' },
        { d: '… and both balances are unchanged (rolled back)', t: rs => JSON.stringify(rows(rs[1], '#acc')) === JSON.stringify([['Ali', '400.000'], ['Sara', '220.000']]) },
        { d: R`Sara → Ali 20 afterwards: Ali 420.000, Sara 200.000`, t: rs => tx(rs[2], '#msg') === 'Transfer done' && JSON.stringify(rows(rs[2], '#acc')) === JSON.stringify([['Ali', '420.000'], ['Sara', '200.000']]) },
        { d: 'Uses beginTransaction, commit, rollBack and prepare', t: (rs, src) => /beginTransaction\s*\(/.test(code(src)) && /->\s*commit\s*\(/.test(code(src)) && /->\s*rollBack\s*\(/i.test(code(src)) && /->\s*prepare\s*\(/.test(code(src)) },
        { d: 'No warnings', t: rs => clean(rs) }
      ],
      solution: { php: R`<form method="post">
  From <input name="from" size="2"> to <input name="to" size="2">
  amount <input name="amount" size="6"> <button type="submit">Send</button>
</form>
<?php
require 'connection.php';
if (isset($_POST["amount"])) {
  try {
    $db->beginTransaction();
    $take = $db->prepare("UPDATE accounts SET balance = balance - :amt WHERE id = :id");
    $take->execute([':amt' => $_POST["amount"], ':id' => $_POST["from"]]);
    $give = $db->prepare("UPDATE accounts SET balance = balance + :amt WHERE id = :id");
    $give->execute([':amt' => $_POST["amount"], ':id' => $_POST["to"]]);
    $check = $db->prepare("SELECT balance FROM accounts WHERE id = :id");
    $check->execute([':id' => $_POST["from"]]);
    $row = $check->fetch();
    if ($row["balance"] < 0) {
      throw new Exception("not enough money");
    }
    $db->commit();
    echo '<p id="msg">Transfer done</p>';
  } catch (Exception $e) {
    $db->rollBack();
    echo '<p id="msg">Transfer failed: ' . $e->getMessage() . '</p>';
  }
}

// balances (do not change)
echo '<table id="acc" border="1">';
foreach ($db->query("SELECT owner, balance FROM accounts ORDER BY id") as $a) {
  echo "<tr><td>" . $a["owner"] . "</td><td>" . number_format($a["balance"], 3) . "</td></tr>";
}
echo "</table>";
?>` }
    }
  });

  LESSONS.push({
    id: 'db-grid', module: 'db', title: 'Showing results as a grid (N items per row)',
    big: R`Product pages often show items as cards, **two or three per row**, not one per line. With an HTML table this needs one trick: a **counter** that closes the row and opens a new one every N items. It has appeared in several past finals.`,
    simple: R`The idea, for 3 per row:
1. Before the loop: [[echo "<table><tr>";]] and [[$count = 0;]]
2. In the loop, before printing an item: if [[$count > 0]] and [[$count % 3 == 0]], print [["</tr><tr>"]] (end this row, start the next).
3. Print the item as one [[<td>]], then [[$count++]].
4. After the loop: [[echo "</tr></table>";]]

[[%]] is the remainder: [[$count % 3 == 0]] is true at 0, 3, 6, 9… so a new row starts after every 3 items. Change 3 to any N.

The same counter works with [[<div>]] rows. (With CSS you could also use a grid layout, but the exam asks for the table version.)`,
    simpler: R`It is like putting cups on a shelf that holds three.

You count the cups as you place them. Every time you reach 3, 6, 9… the shelf is full, so you start a new shelf ([["</tr><tr>"]]) before placing the next cup.`,
    deeper: [
      { try: { task: R`Change the 3 to 2, then to 4. Then add [[WHERE category = 'Electronics']] to the query.`, php: R`<style>
  td { border: 1px solid #ccc; padding: 10px; width: 140px; vertical-align: top; }
  .price { color: #2346d8; font-weight: bold; }
</style>
<?php
require 'connection.php';
$result = $db->query("SELECT * FROM products ORDER BY name");
$perRow = 3;
$count = 0;
echo "<table><tr>";
while ($p = $result->fetch()) {
  if ($count > 0 && $count % $perRow == 0) {
    echo "</tr><tr>";
  }
  echo "<td><strong>" . $p["name"] . "</strong><br>" . $p["category"] . "<br><span class='price'>" . number_format($p["price"], 3) . " BD</span></td>";
  $count++;
}
echo "</tr></table>";
?>`, db, files } },
      R`**Another way to write the same test**: print [["<tr>"]] when [[$count % 3 == 0]] and [["</tr>"]] when [[$count % 3 == 2]]. Both are accepted; the important part is that every row has the right number of cells and every [[<tr>]] is closed.`
    ],
    points: [
      'Use a counter starting at 0 and the % (remainder) operator.',
      'When $count > 0 and $count % N == 0, close the row and open a new one.',
      'Open <table><tr> before the loop; close </tr></table> after it.',
      'The last row may have fewer than N cells; that is fine.'
    ],
    exam: [
      R`Grid view: show query results 2 or 3 per row with a counter and [["</tr><tr>"]].`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
while ($p = $result->fetch()) {
  if ($count % 3 == 0) echo "</tr><tr>";   // also fires at 0
  echo "<td>" . $p["name"] . "</td>";
  $count++;
}`, right: R`<?php
while ($p = $result->fetch()) {
  if ($count > 0 && $count % 3 == 0) echo "</tr><tr>";
  echo "<td>" . $p["name"] . "</td>";
  $count++;
}`, why: 'At count 0 the test is already true, which creates an empty first row.' },
      { lang: 'php', wrong: R`<?php
while ($p = $result->fetch()) {
  echo "<td>" . $p["name"] . "</td>";
  if ($count % 3 == 0) echo "</tr><tr>";
}`, right: R`<?php
while ($p = $result->fetch()) {
  echo "<td>" . $p["name"] . "</td>";
  $count++;
  if ($count % 3 == 0) echo "</tr><tr>";
}`, why: 'Without $count++ the counter never moves.' }
    ],
    summary: [
      'Counter + % N.',
      '</tr><tr> between rows.',
      'Open before, close after the loop.'
    ],
    recall: [
      { q: R`With [[if ($count > 0 && $count % 2 == 0) echo "</tr><tr>";]] and 5 items, how many rows?`, o: ['2', '3', '5', '1'], a: 1, why: 'Rows of 2, 2 and 1.' },
      { q: R`What is [[7 % 3]]?`, o: ['2', '1', '0', '2.33'], a: 1, why: '7 = 2 × 3 + 1, so the remainder is 1.' }
    ],
    challenge: {
      task: R`Show all products, **sorted by price (lowest first)**, in [[<table id="grid">]] with **2 products per row**.
Each [[<td>]] contains the name in [[<b>]] and, on the next line, the price with 3 decimals followed by [[" BD"]]. Use [[query]], a [[while ($p = $result->fetch())]] loop and a counter.`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php
require 'connection.php';

?>` },
      db, files,
      requests: [{}],
      checks: [
        { d: R`[[#grid]] has 3 rows`, t: rs => rs[0].doc.querySelectorAll('#grid tr').length === 3 },
        { d: 'Every row has 2 cells', t: rs => { const t = [...rs[0].doc.querySelectorAll('#grid tr')]; return t.length === 3 && t.every(tr => tr.querySelectorAll('td').length === 2); } },
        { d: R`Order by price: Notebook, Pen pack | USB cable, Calculator | Backpack, Headphones`, t: rs => [...rs[0].doc.querySelectorAll('#grid tr')].map(tr => [...tr.querySelectorAll('td b')].map(b => b.textContent.trim()).join(',')).join('|') === 'Notebook,Pen pack|USB cable,Calculator|Backpack,Headphones' },
        { d: R`Each cell shows the price, e.g. "0.750 BD" for Notebook`, t: rs => { const td = rs[0].doc.querySelector('#grid td'); return td && /0\.750 BD/.test(td.textContent); } },
        { d: R`Uses a counter with [[%]] and prints [["</tr><tr>"]]; no warnings`, t: (rs, src) => /%\s*2/.test(code(src)) && /<\/tr>\s*<tr>/.test(strs(src)) && /->\s*fetch\s*\(/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<?php
require 'connection.php';
$result = $db->query("SELECT * FROM products ORDER BY price");
$count = 0;
echo '<table id="grid" border="1"><tr>';
while ($p = $result->fetch()) {
  if ($count > 0 && $count % 2 == 0) {
    echo "</tr><tr>";
  }
  echo "<td><b>" . $p["name"] . "</b><br>" . number_format($p["price"], 3) . " BD</td>";
  $count++;
}
echo "</tr></table>";
?>` }
    }
  });
})();

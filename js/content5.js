/* Module 09: PHP basics (Ch 12). Code runs in the in-browser PHP runner (js/php-runner.js).
   PHP code is written with String.raw (R`...`) so backslashes such as \d and \n stay as typed. */
(() => {
  const R = String.raw;
  /* helpers for PHP checks: rs = results of the requests, in order */
  const clean = rs => rs.every(r => !r.errors.length);
  const tx = (r, sel) => { const e = r && r.doc.querySelector(sel); return e ? e.textContent.replace(/\s+/g, ' ').trim() : null; };
  const all = (r, sel) => r ? [...r.doc.querySelectorAll(sel)].map(e => e.textContent.replace(/\s+/g, ' ').trim()) : [];
  const code = src => U.phpScan(src).filter(p => p.t === 'code').map(p => p.s).join(' ');   /* PHP code only: no strings, comments or HTML */

  LESSONS.push({
    id: 'php-intro', module: 'php', title: 'How PHP works: syntax, echo, variables and strings',
    big: R`Up to now every line of code ran **in the browser**. PHP runs **on the server**. The browser asks for [[page.php]]; the server runs the PHP inside it, and sends back only the **result**: plain HTML. The visitor never sees your PHP code, not even with View Source.

That is why PHP can do what browser JavaScript cannot: read a database, check a password, remember a user between pages.

**In this site**, a real PHP 8.4 runs inside your browser and pretends to be the server. The bar above the result is the **request**: the method, the query string, the POST data and the visitor's IP. Change it and press Run.`,
    simple: R`- PHP code lives between [[<?php]] and [[?>]]. Everything outside the tags is sent as normal HTML.
- Every statement ends with a semicolon [[;]].
- [[echo]] sends text to the page: [[echo "Hello";]]. [[print]] does the same.
- Variables start with [[$]]: [[$name = "Ali";]]. Names are case-sensitive ([[$Name]] is a different variable). No [[let]] or [[const]].
- Types are decided by the value: int [[20]], float [[3.5]], string [["text"]], bool [[true]], array, [[null]]. [[var_dump($x)]] shows the type and value.
- **Strings**: double quotes put variables inside ([["Hi $name"]] → Hi Ali); single quotes do not ([['Hi $name']] → Hi $name).
- **Joining strings uses a dot** [[.]], not [[+]]: [["Hi " . $name]]. [[.=]] adds to the end of a string.
- Comments: [[//]], [[#]] and [[/* … */]].
- [[<?= $name ?>]] is a short way to write [[<?php echo $name; ?>]] inside HTML.`,
    simpler: R`A restaurant.

- The **browser** is the customer. It orders [[menu.php]].
- The **server** is the kitchen, and **PHP is the recipe** the cook follows.
- The customer gets only the **plate** (the HTML), never the recipe.

In the recipe, [[$]] marks an ingredient box ([[$name]]), [[echo]] puts something on the plate, and the dot [[.]] is the glue that sticks two pieces of text together.`,
    deeper: [
      { try: { task: R`Run it, then change [[$name]] and [[$age]]. Open "Show the HTML that the script sent": the PHP code is gone, only its output remains.`, php: R`<h1>My first PHP page</h1>
<?php
$name = "Sara";
$age = 20;
$gpa = 3.75;

echo "<p>Name: " . $name . "</p>";      // joining with a dot
echo "<p>Age next year: " . ($age + 1) . "</p>";
echo "<p>GPA: $gpa</p>";                  // a variable inside double quotes
echo '<p>Single quotes: $gpa</p>';       // printed as it is
?>
<p>This line is plain HTML.</p>` } },
      R`**Numbers and strings.** PHP converts between them when it needs to. [[+]] always does maths; [[.]] always joins text. That is the opposite of JavaScript, where [[+]] does both.`,
      { code: R`<?php
echo "5" + 3;     // 8     (maths: "5" becomes 5)
echo "5" . 3;     // 53    (text: 3 becomes "3")
echo 7 / 2;       // 3.5   (division gives a float when needed)
echo 7 % 2;       // 1     (remainder)
echo "10" == 10;  // 1     (true is printed as 1)
var_dump("10" === 10);   // bool(false): === also compares the type
echo false;       // nothing: false is printed as an empty string
?>`, lang: 'php' },
      R`**PHP inside HTML.** A [[.php]] file is usually an HTML page with small PHP islands in it. [[<?= ?>]] prints one value.`,
      { try: { task: R`Change [[$course]] and the list of [[$topics]]. Then add a third [[<li>]] with [[<?= $topics[2] ?>]].`, php: R`<?php
$course = "ITCS333";
$teacher = "Dr. Ahmed";
$topics = ["PHP", "MySQL", "Sessions"];
?>
<!DOCTYPE html>
<html>
<head><title><?= $course ?></title></head>
<body>
  <h1><?= $course ?> with <?= $teacher ?></h1>
  <ul>
    <li><?= $topics[0] ?></li>
    <li><?= $topics[1] ?></li>
  </ul>
  <p>Generated at <?php echo date("H:i"); ?></p>
</body>
</html>` } }
    ],
    points: [
      'PHP runs on the server; the browser receives only the HTML it outputs.',
      'Code goes between <?php and ?>; every statement ends with ;.',
      'Variables start with $ and are case-sensitive; there is no let/const.',
      'Join strings with . (dot). + is only for numbers.',
      'Double quotes expand variables ("Hi $name"); single quotes do not.',
      '<?= $x ?> is short for <?php echo $x; ?>.'
    ],
    exam: [
      R`Output questions: predict what [[echo "5" . 3;]], [[echo "5" + 3;]] or [[echo 'Hi $x';]] prints.`,
      'Short answer: client-side vs server-side scripting (where the code runs, who can see it, what each can access).',
      'Every PHP code question expects the $ on variables and the ; at the end: each missing one can cost a mark.'
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
echo "Total: " + $total;`, right: R`<?php
echo "Total: " . $total;`, why: 'In PHP + is only arithmetic. Joining text uses the dot.' },
      { lang: 'php', wrong: R`<?php
name = "Ali";
echo name;`, right: R`<?php
$name = "Ali";
echo $name;`, why: 'Every variable needs the $ sign, both when you set it and when you use it.' },
      { lang: 'php', wrong: R`<?php
echo 'Welcome $name';`, right: R`<?php
echo "Welcome $name";`, why: 'Variables are only replaced inside double quotes.' }
    ],
    summary: [
      'Server runs PHP → browser gets HTML.',
      '$variables, ; at the end, echo to output.',
      'Dot joins strings; double quotes expand variables.'
    ],
    recall: [
      { q: R`What does [[echo "4" . 2;]] print?`, o: ['6', '42', '4.2', 'An error'], a: 1, why: 'The dot joins text: "4" and "2" become "42".' },
      { q: R`[[$x = "Ali";]] What does [[echo 'Hi $x';]] print?`, o: ['Hi Ali', 'Hi $x', 'Hi', 'An error'], a: 1, why: 'Single quotes print the text exactly as written.' },
      { q: 'Where does PHP code run?', o: ['In the browser', 'On the web server', 'In the database', 'In the CSS engine'], a: 1, why: 'PHP is server-side; the browser only receives the output.' },
      { q: R`Which line prints the variable [[$total]] inside HTML?`, o: [R`[[<?= total ?>]]`, R`[[<?= $total ?>]]`, R`[[<? echo total ?>]]`, R`[[{{ $total }}]]`], a: 1, why: R`[[<?= $total ?>]] is short for [[<?php echo $total; ?>]].` }
    ],
    challenge: {
      task: R`Using the variables in the starter:
1. Print [[<h1>Welcome Nezar</h1>]], built by joining the text with [[$name]] using the dot.
2. Print a paragraph [[<p id="mark">ITCS333 mark: 87 (Pass)</p>]]. Use [[$course]] and [[$mark]], and an [[if]] that writes [[Pass]] when the mark is 60 or more, otherwise [[Fail]].
3. Print [[<p id="next">Next year: 2027</p>]] using [[$year + 1]].`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php
$name = "Nezar";
$course = "ITCS333";
$mark = 87;
$year = 2026;

?>` },
      requests: [{}],
      checks: [
        { d: R`The page has [[<h1>Welcome Nezar</h1>]]`, t: rs => tx(rs[0], 'h1') === 'Welcome Nezar' },
        { d: R`[[#mark]] says "ITCS333 mark: 87 (Pass)"`, t: rs => tx(rs[0], '#mark') === 'ITCS333 mark: 87 (Pass)' },
        { d: R`[[#next]] says "Next year: 2027"`, t: rs => tx(rs[0], '#next') === 'Next year: 2027' },
        { d: R`Uses the variables and the dot (no hard-coded "Nezar", "ITCS333" or 87 in the echo lines)`, t: (rs, src) => { const rest = src.split(/\$year\s*=\s*2026\s*;/)[1] || ''; return /\$name/.test(rest) && /\$course/.test(rest) && /\$mark/.test(rest) && !/Nezar|ITCS333|\b87\b/.test(rest) && /\$\w+\s*\.|\.\s*\$\w+/.test(rest); } },
        { d: R`Decides Pass / Fail with [[if ($mark >= 60)]]`, t: (rs, src) => /\bif\s*\(\s*\$mark\s*>=\s*60\s*\)/.test(code(src)) },
        { d: 'No PHP warnings or errors', t: rs => clean(rs) }
      ],
      solution: { php: R`<?php
$name = "Nezar";
$course = "ITCS333";
$mark = 87;
$year = 2026;

echo "<h1>Welcome " . $name . "</h1>";
if ($mark >= 60) {
  $result = "Pass";
} else {
  $result = "Fail";
}
echo '<p id="mark">' . $course . " mark: " . $mark . " (" . $result . ")</p>";
echo '<p id="next">Next year: ' . ($year + 1) . "</p>";
?>` }
    }
  });

  LESSONS.push({
    id: 'php-arrays', module: 'php', title: 'Arrays and foreach',
    big: R`Almost every PHP exam question starts with an array: a list of books, cars, students or countries, and a loop that prints them as HTML. PHP has one array type that works both as a numbered list and as a **dictionary** of [[key => value]] pairs.`,
    simple: R`**Indexed array** (numbered from 0):
- [[$marks = [80, 95, 70];]] or the older [[$marks = array(80, 95, 70);]]
- [[$marks[0]]] is 80. [[$marks[] = 60;]] adds to the end. [[count($marks)]] is the length.

**Associative array** (named keys):
- [[$student = ["name" => "Ali", "gpa" => 3.4];]]
- [[$student["name"]]] is "Ali". Add or change: [[$student["major"] = "CS";]]

**foreach** walks through an array:
- [[foreach ($marks as $m) { … }]] → each value
- [[foreach ($student as $key => $value) { … }]] → each key and its value

**Arrays inside arrays** (the exam's favourite):
- A list of records: [[$books = [ ["title" => "PHP", "year" => 2019], ["title" => "SQL", "year" => 2012] ];]] → [[$books[1]["title"]]] is "SQL".
- A key that holds a list: [[$capitals["Bahrain"] = ["Manama", "Asia"];]] → [[$capitals["Bahrain"][0]]] is "Manama".

To look inside any array while testing: [[print_r($arr);]] or [[var_dump($arr);]] (wrap in [[<pre>]] to keep the layout).`,
    simpler: R`- An **indexed array** is a row of numbered lockers, starting at 0.
- An **associative array** is a row of lockers with **name tags** instead of numbers: "name", "gpa".
- A list of records is a **filing cabinet**: each drawer (0, 1, 2…) holds one student's file, and each file has named fields.
- [[foreach]] opens every locker in order and hands you what is inside ([[$value]]) and, if you ask, the tag on the door ([[$key]]).`,
    deeper: [
      { try: { task: R`Add a fourth student to [[$students]] and run again. The table grows by itself because of [[foreach]].`, php: R`<?php
$marks = [80, 95, 70];
$marks[] = 60;                       // add to the end
echo "<p>First mark: " . $marks[0] . ", count: " . count($marks) . "</p>";

$student = ["name" => "Ali", "major" => "CS", "gpa" => 3.4];
foreach ($student as $key => $value) {
  echo "<p>$key: $value</p>";
}

$students = [
  ["name" => "Ali",    "gpa" => 3.4],
  ["name" => "Sara",   "gpa" => 3.9],
  ["name" => "Hassan", "gpa" => 2.1],
];
echo "<table border='1'><tr><th>Name</th><th>GPA</th></tr>";
foreach ($students as $s) {
  echo "<tr><td>" . $s["name"] . "</td><td>" . $s["gpa"] . "</td></tr>";
}
echo "</table>";

echo "<pre>";
print_r($students[1]);
echo "</pre>";
?>` } },
      R`**Looping inside HTML.** Instead of echoing every tag, you can close PHP, write HTML, and open PHP again. The [[foreach (…):]] / [[endforeach;]] form reads well in templates.`,
      { try: { task: R`Add a [[<td>]] for the major to every row (the array already has it).`, php: R`<?php
$books = [
  ["title" => "Learning PHP", "author" => "Sara", "year" => 2019],
  ["title" => "SQL Basics",   "author" => "Omar", "year" => 2012],
  ["title" => "Web Security", "author" => "Mona", "year" => 2022],
];
?>
<table border="1">
  <tr><th>#</th><th>Title</th><th>Year</th></tr>
  <?php foreach ($books as $i => $b): ?>
    <tr>
      <td><?= $i + 1 ?></td>
      <td><?= $b["title"] ?></td>
      <td><?= $b["year"] ?></td>
    </tr>
  <?php endforeach; ?>
</table>` } },
      R`**Nested lists from an array of arrays.** Each key is a country and its value is a small indexed array [capital, continent]. The outer [[foreach]] makes the outer list; inside it you print the inner values.`,
      { code: R`<?php
$places = [
  "Bahrain" => ["Manama", "Asia"],
  "Kenya"   => ["Nairobi", "Africa"],
];
echo "<ul>";
foreach ($places as $country => $info) {
  echo "<li>$country";
  echo "<ul><li>Capital: " . $info[0] . "</li><li>Continent: " . $info[1] . "</li></ul>";
  echo "</li>";
}
echo "</ul>";
?>`, lang: 'php' }
    ],
    points: [
      'Indexed arrays start at 0; $a[] = x appends; count($a) gives the length.',
      'Associative arrays use "key" => value; read with $a["key"].',
      'foreach ($a as $v) gives values; foreach ($a as $k => $v) gives keys and values.',
      'A list of records is an indexed array of associative arrays: $rows[1]["name"].',
      'print_r / var_dump show an array while testing.'
    ],
    exam: [
      'Define an array of associative arrays (3 keys each) and loop over it with foreach.',
      R`Print nested HTML lists from [[$arr[$key] = [value1, value2]]].`,
      R`Know both syntaxes: [[[1, 2]]] and [[array(1, 2)]], and [[array("a" => 1)]].`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
foreach ($students as $key, $value) { }`, right: R`<?php
foreach ($students as $key => $value) { }`, why: 'The key and value are joined with =>, not a comma.' },
      { lang: 'php', wrong: R`<?php
echo $student[name];`, right: R`<?php
echo $student["name"];`, why: 'String keys need quotes. Without them PHP 8 throws an Error (undefined constant).' },
      { lang: 'php', wrong: R`<?php
echo "Count: " . $marks.length;`, right: R`<?php
echo "Count: " . count($marks);`, why: 'Arrays have no .length in PHP. Use count().' }
    ],
    summary: [
      '[…] or array(…); "key" => value for named keys.',
      'foreach ($a as $k => $v).',
      'Records: $rows[i]["field"].'
    ],
    recall: [
      { q: R`[[$a = [5, 8, 2]; $a[] = 7;]] What is [[count($a)]]?`, o: ['3', '4', '7', '22'], a: 1, why: '$a[] = 7 adds a fourth element.' },
      { q: 'Which loop gives you both the key and the value?', o: [R`[[foreach ($a as $v)]]`, R`[[foreach ($a as $k => $v)]]`, R`[[for ($k in $a)]]`, R`[[foreach ($k, $v in $a)]]`], a: 1, why: 'Write key => value after as.' },
      { q: R`[[$cars = [["model" => "Civic", "year" => 2019]];]] How do you print 2019?`, o: [R`[[$cars["year"]]]`, R`[[$cars[0]["year"]]]`, R`[[$cars[1]["year"]]]`, R`[[$cars.year]]`], a: 1, why: 'First pick the record [0], then the field ["year"].' }
    ],
    challenge: {
      task: R`Print the countries in [[$countries]] as nested lists:
[[<ul id="countries">]] with one [[<li>]] per country. Each country's [[<li>]] starts with the country name, then has an inner [[<ul>]] with two items: [["Capital: …"]] and [["Continent: …"]].
Below it, print [[<p id="total">3 countries</p>]] using [[count()]].`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php
$countries = [
  "Bahrain" => ["Manama", "Asia"],
  "Egypt"   => ["Cairo", "Africa"],
  "France"  => ["Paris", "Europe"],
];

?>` },
      requests: [{}],
      checks: [
        { d: R`[[#countries]] has 3 country items`, t: rs => rs[0].doc.querySelectorAll('#countries > li').length === 3 },
        { d: R`Each country item has an inner list with 2 items`, t: rs => { const l = [...rs[0].doc.querySelectorAll('#countries > li')]; return l.length === 3 && l.every(li => li.querySelectorAll(':scope > ul > li').length === 2); } },
        { d: R`Bahrain: "Capital: Manama" and "Continent: Asia"`, t: rs => { const li = rs[0].doc.querySelector('#countries > li'); return li && li.firstChild && li.firstChild.textContent.trim() === 'Bahrain' && all({ doc: li }, 'ul > li').join('|') === 'Capital: Manama|Continent: Asia'; } },
        { d: R`France is last: "Capital: Paris" and "Continent: Europe"`, t: rs => { const l = rs[0].doc.querySelectorAll('#countries > li'); const li = l[2]; return li && /^France/.test(li.textContent.trim()) && all({ doc: li }, 'ul > li').join('|') === 'Capital: Paris|Continent: Europe'; } },
        { d: R`[[#total]] says "3 countries" (using count)`, t: (rs, src) => tx(rs[0], '#total') === '3 countries' && /count\s*\(\s*\$countries\s*\)/.test(code(src)) },
        { d: R`Uses [[foreach (… as $country => $info)]] and no PHP warnings`, t: (rs, src) => /foreach\s*\(\s*\$countries\s+as\s+\$\w+\s*=>\s*\$\w+\s*\)/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<?php
$countries = [
  "Bahrain" => ["Manama", "Asia"],
  "Egypt"   => ["Cairo", "Africa"],
  "France"  => ["Paris", "Europe"],
];

echo '<ul id="countries">';
foreach ($countries as $country => $info) {
  echo "<li>" . $country;
  echo "<ul><li>Capital: " . $info[0] . "</li><li>Continent: " . $info[1] . "</li></ul>";
  echo "</li>";
}
echo "</ul>";
echo '<p id="total">' . count($countries) . " countries</p>";
?>` }
    }
  });

  LESSONS.push({
    id: 'php-functions', module: 'php', title: 'Functions, scope, global and $GLOBALS',
    big: R`Functions in PHP look like JavaScript functions, with one big surprise: a function **cannot see** the variables written outside it. To use an outside variable you must say so with [[global]] or reach it through [[$GLOBALS]]. Both appear regularly in MCQs.`,
    simple: R`- Define: [[function area($w, $h) { return $w * $h; }]]
- Call: [[echo area(3, 4);]] → 12
- Default values: [[function greet($name = "guest") { … }]] → [[greet()]] uses "guest".
- A function without [[return]] gives back [[null]].

**Scope**
- Variables made **inside** a function are **local**: they disappear when it ends.
- Variables made **outside** (global variables) are **not visible** inside a function.
- [[global $rate;]] inside the function → use the outside [[$rate]].
- [[$GLOBALS['rate']]] → the same outside variable, read or changed through the special array of all globals.`,
    simpler: R`A function is a room with the door closed.

- What is made inside the room stays inside.
- What is outside in the hall cannot be seen from inside the room.
- [[global $x;]] is opening a window to the hall and saying "I want **that** $x".
- [[$GLOBALS]] is the building's notice board: anyone in any room can read it or write on it.`,
    deeper: [
      { try: { task: R`Remove the line [[global $discount;]] and run: the warning shows that [[$discount]] does not exist inside the function.`, php: R`<?php
$discount = 0.2;            // a global variable
$visits = 0;

function salePrice($price) {
  global $discount;          // use the outside $discount
  return $price - $price * $discount;
}

function countVisit() {
  $GLOBALS['visits']++;      // change the outside $visits
}

function greet($name = "guest") {
  return "Hello, $name!";
}

echo "<p>" . salePrice(50) . "</p>";   // 40
countVisit();
countVisit();
echo "<p>Visits: $visits</p>";          // 2
echo "<p>" . greet() . " " . greet("Mona") . "</p>";
?>` } },
      R`**Local means local.** A variable with the same name inside a function is a different variable. Changing it does not change the outside one.`,
      { code: R`<?php
$x = 10;
function change() {
  $x = 99;        // a new local $x
}
change();
echo $x;          // 10

function changeGlobal() {
  global $x;
  $x = 99;
}
changeGlobal();
echo $x;          // 99
?>`, lang: 'php' }
    ],
    points: [
      'function name($a, $b = default) { return …; }',
      'Variables inside a function are local; outside variables are invisible there.',
      'global $x; inside a function links to the outside $x.',
      '$GLOBALS["x"] reads or changes the outside $x from anywhere.',
      'Without return a function gives null.'
    ],
    exam: [
      R`MCQ: what is printed when a function uses an outside variable **without** [[global]]? (A warning and an empty value.)`,
      R`MCQ: which two ways give a function access to a global variable ([[global]] and [[$GLOBALS]])?`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
$rate = 0.1;
function tax($p) {
  return $p * $rate;    // $rate is undefined here
}`, right: R`<?php
$rate = 0.1;
function tax($p) {
  global $rate;
  return $p * $rate;
}`, why: 'Outside variables are not visible inside functions unless you use global or $GLOBALS.' },
      { lang: 'php', wrong: R`<?php
$GLOBALS[$total] += 5;`, right: R`<?php
$GLOBALS['total'] += 5;`, why: 'The key of $GLOBALS is the variable name as a string, without the $.' }
    ],
    summary: [
      'Functions: function, parameters, return.',
      'Local by default.',
      'global $x or $GLOBALS["x"] for outside variables.'
    ],
    recall: [
      { q: R`[[$a = 5; function f() { return $a; } echo f();]] What happens?`, o: ['Prints 5', 'Warning: undefined variable, prints nothing', 'Prints 0', 'Prints $a'], a: 1, why: 'Inside f, $a is a new local variable that was never set.' },
      { q: R`Which line makes the outside [[$total]] usable inside a function?`, o: [R`[[use $total;]]`, R`[[global $total;]]`, R`[[extern $total;]]`, R`[[static $total;]]`], a: 1, why: 'global links the name to the global variable.' },
      { q: R`How do you read the global [[$name]] through the superglobal array?`, o: [R`[[$GLOBALS['name']]]`, R`[[$GLOBALS[$name]]]`, R`[[$_GLOBAL['name']]]`, R`[[GLOBALS.name]]`], a: 0, why: 'The key is the variable name without $.' }
    ],
    challenge: {
      task: R`1. Write [[function priceWithTax($price)]] that uses the global [[$taxRate]] (with [[global]]) and returns the price plus tax.
2. Write [[function addToCart($amount)]] that adds [[$amount]] to the global [[$total]] using [[$GLOBALS]].
3. Then print [[<p id="tax">With tax: 110</p>]] using [[priceWithTax(100)]], call [[addToCart(10)]] and [[addToCart(25)]], and print [[<p id="total">Total: 35</p>]].`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php
$taxRate = 0.1;
$total = 0;

?>` },
      requests: [{}],
      checks: [
        { d: R`[[#tax]] says "With tax: 110"`, t: rs => tx(rs[0], '#tax') === 'With tax: 110' },
        { d: R`[[#total]] says "Total: 35"`, t: rs => tx(rs[0], '#total') === 'Total: 35' },
        { d: R`[[priceWithTax]] uses [[global $taxRate]]`, t: (rs, src) => /function\s+priceWithTax\s*\(\s*\$\w+\s*\)/.test(code(src)) && /global\s+\$taxRate/.test(code(src)) },
        { d: R`[[addToCart]] uses [[$GLOBALS['total']]]`, t: (rs, src) => /function\s+addToCart\s*\(/.test(code(src)) && /\$GLOBALS\s*\[\s*['"]total['"]\s*\]/.test(src) },
        { d: 'Calls addToCart(10) and addToCart(25), and no PHP warnings', t: (rs, src) => /addToCart\s*\(\s*10\s*\)/.test(code(src)) && /addToCart\s*\(\s*25\s*\)/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<?php
$taxRate = 0.1;
$total = 0;

function priceWithTax($price) {
  global $taxRate;
  return $price + $price * $taxRate;
}

function addToCart($amount) {
  $GLOBALS['total'] += $amount;
}

echo '<p id="tax">With tax: ' . priceWithTax(100) . '</p>';
addToCart(10);
addToCart(25);
echo '<p id="total">Total: ' . $total . '</p>';
?>` }
    }
  });

  LESSONS.push({
    id: 'php-strings', module: 'php', title: 'String functions: explode, implode, trim, substr and more',
    big: R`Data from forms and files arrives as text: names with extra spaces, values glued together like [["2.5#300"]]. A handful of built-in functions clean, cut and split that text. [[explode]] in particular is in nearly every past paper.`,
    simple: R`- [[trim($s)]] → removes spaces (and new lines) at both ends.
- [[strlen($s)]] → number of characters.
- [[strtoupper($s)]] / [[strtolower($s)]] → all capitals / all small. [[ucfirst($s)]] → capital first letter.
- [[substr($s, start, length)]] → a piece of the string. [[substr("Hello", 1, 3)]] → "ell"; a negative start counts from the end: [[substr("Hello", -2)]] → "lo".
- [[strpos($s, "x")]] → the position of "x", or [[false]] if it is not there. Compare with [[!== false]], because position 0 also looks "false".
- [[str_replace("a", "o", $s)]] → replace every "a" with "o".
- [[explode(",", $s)]] → **split** a string into an array at every comma.
- [[implode(", ", $arr)]] → **join** an array into one string with ", " between the items.
- [[number_format($n, 3)]] → a number with 3 decimals as text: 2.85 → "2.850".`,
    simpler: R`- [[explode]] is a knife: it cuts a string at every separator and gives you the pieces in an array. "2.5#300" cut at "#" gives ["2.5", "300"].
- [[implode]] is glue: it sticks the pieces of an array back into one string, with the separator between them.
- [[trim]] is trimming the crust off both ends of a sandwich.
- [[substr]] is cutting a slice from a given position.`,
    deeper: [
      { try: { task: R`Change the separator in [[explode]] to [["#"]] and give [[$item]] the value [["2.5#300"]]. What are [[$parts[0]]] and [[$parts[1]]] now?`, php: R`<?php
$raw = "   Ali Hassan   ";
$name = trim($raw);
echo "<p>[" . $name . "] has " . strlen($name) . " characters</p>";
echo "<p>" . strtoupper($name) . " / " . strtolower($name) . "</p>";
echo "<p>First 3 letters: " . substr($name, 0, 3) . "</p>";

$item = "Pen,Book,Bag";
$parts = explode(",", $item);
echo "<p>" . count($parts) . " parts, the second is " . $parts[1] . "</p>";
echo "<p>" . implode(" | ", $parts) . "</p>";

if (strpos($name, "Ali") !== false) {
  echo "<p>The name contains Ali</p>";
}
echo "<p>" . str_replace(" ", "_", $name) . "</p>";
echo "<p>" . number_format(2.85, 3) . " BD</p>";
?>` } },
      R`**The exam pattern.** A value carries two facts joined by a symbol, e.g. a checkbox value [["1.250#400"]] (price # calories). [[explode]] splits it, and you add up each part.`,
      { code: R`<?php
$selected = ["1.250#400", "0.800#150"];
$price = 0;
$calories = 0;
foreach ($selected as $v) {
  $p = explode("#", $v);     // ["1.250", "400"]
  $price += $p[0];           // "1.250" is used as a number
  $calories += $p[1];
}
echo "Price: " . number_format($price, 3) . " BD, calories: $calories";
// Price: 2.050 BD, calories: 550
?>`, lang: 'php' }
    ],
    points: [
      'trim removes outer spaces; strlen counts characters.',
      'strtoupper / strtolower / ucfirst change letter case.',
      'substr($s, start, length); a negative start counts from the end.',
      'strpos returns a position or false: test with !== false.',
      'explode(separator, string) → array; implode(separator, array) → string.',
      'number_format($n, decimals) formats a number as text.'
    ],
    exam: [
      R`Split a value like [["price#weight"]] with [[explode('#', $v)]] and keep running totals.`,
      R`MCQ: what [[trim]], [[implode]] or [[substr]] returns for a given input.`,
      R`Remember the argument order: separator **first** in both [[explode]] and [[implode]].`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
$parts = explode($line, ",");`, right: R`<?php
$parts = explode(",", $line);`, why: 'The separator comes first, then the string.' },
      { lang: 'php', wrong: R`<?php
if (strpos($s, "A")) { echo "found"; }`, right: R`<?php
if (strpos($s, "A") !== false) { echo "found"; }`, why: 'When "A" is the first character strpos returns 0, which if() treats as false.' },
      { lang: 'php', wrong: R`<?php
echo implode($names);   // works, but no separator
echo $names;            // prints "Array"`, right: R`<?php
echo implode(", ", $names);`, why: 'Echoing an array prints the word Array with a warning. Join it first.' }
    ],
    summary: [
      'Clean: trim, strtolower, ucfirst.',
      'Cut: substr, strpos.',
      'Split / join: explode / implode.'
    ],
    recall: [
      { q: R`What is [[count(explode("-", "a-b-c-d"))]]?`, o: ['3', '4', '7', '1'], a: 1, why: 'Three separators give four pieces.' },
      { q: R`What does [[implode("+", [1, 2, 3])]] return?`, o: ['6', '"1+2+3"', '[1, 2, 3]', '"123"'], a: 1, why: 'implode joins the items as text with the separator.' },
      { q: R`What is [[substr("ITCS333", 4)]]?`, o: ['"ITCS"', '"333"', '"S333"', '"CS33"'], a: 1, why: 'From position 4 (counting from 0) to the end.' },
      { q: R`What does [[trim("  hi  ")]] return?`, o: ['"hi"', '"  hi"', '"hi  "', '2'], a: 0, why: 'trim removes the spaces at both ends.' }
    ],
    challenge: {
      task: R`[[$line]] holds four names with messy spaces and capitals.
1. Split it into an array at each comma.
2. Clean each name: remove the spaces around it and make it [["Capitalised"]] (first letter capital, the rest small).
3. Print [[<p id="names">Ali | Sara | Hassan | Maryam</p>]] (join with [[" | "]]).
4. Print [[<p id="count">4 names</p>]].
5. Print [[<p id="initials">ASHM</p>]]: the first letter of each clean name.`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php
$line = "  ali , SARA,hassan  ,  mARYAM ";

?>` },
      requests: [{}],
      checks: [
        { d: R`[[#names]] is "Ali | Sara | Hassan | Maryam"`, t: rs => tx(rs[0], '#names') === 'Ali | Sara | Hassan | Maryam' },
        { d: R`[[#count]] is "4 names"`, t: rs => tx(rs[0], '#count') === '4 names' },
        { d: R`[[#initials]] is "ASHM"`, t: rs => tx(rs[0], '#initials') === 'ASHM' },
        { d: R`Uses [[explode]], [[trim]] and [[implode]]`, t: (rs, src) => /explode\s*\(/.test(code(src)) && /trim\s*\(/.test(code(src)) && /implode\s*\(/.test(code(src)) },
        { d: R`Uses [[substr]] for the initials, and no PHP warnings`, t: (rs, src) => /substr\s*\(/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<?php
$line = "  ali , SARA,hassan  ,  mARYAM ";

$parts = explode(",", $line);
$names = [];
$initials = "";
foreach ($parts as $p) {
  $clean = ucfirst(strtolower(trim($p)));
  $names[] = $clean;
  $initials .= substr($clean, 0, 1);
}
echo '<p id="names">' . implode(" | ", $names) . '</p>';
echo '<p id="count">' . count($names) . ' names</p>';
echo '<p id="initials">' . $initials . '</p>';
?>` }
    }
  });

  LESSONS.push({
    id: 'php-regex', module: 'php', title: 'preg_match: checking text with patterns',
    big: R`The newest papers from this course ask you to loop over an array and print only the items that **match a pattern**: names that end with a digit, codes that start with a capital letter, words that contain a vowel. PHP's tool for this is [[preg_match]]. The pattern language is the same regex you met in the JavaScript bonus lesson.`,
    simple: R`[[preg_match('/pattern/', $text)]] returns **1** if the pattern is found in the text, **0** if not.

Write the pattern in **single quotes**, between slashes. After the last slash you can add [[i]] to ignore upper/lower case.

The pieces:
- [[^]] start of the text · [[$]] end of the text
- [[[abc]]] one of these characters · [[[a-z]]] [[[A-Z]]] [[[0-9]]] ranges · [[[^0-9]]] anything except a digit
- [[\d]] a digit · [[\w]] a letter, digit or _ · [[\s]] a space · [[.]] any character
- Quantifiers, after a piece: [[*]] zero or more · [[+]] one or more · [[?]] zero or one · [[{3}]] exactly 3 · [[{2,4}]] 2 to 4

Common checks:
- ends with a digit: [['/\d$/']] · starts with a capital: [['/^[A-Z]/']]
- contains a vowel: [['/[aeiou]/i']] · only letters: [['/^[a-zA-Z]+$/']]
- exactly 3 digits: [['/^\d{3}$/']]`,
    simpler: R`A pattern is a **description** of what the text should look like, and preg_match is the guard who checks it.

- [[^]] means "right at the start", [[$]] means "right at the end".
- [[[A-Z]]] is "any one capital letter", [[\d]] is "any one digit".
- [[+]] is "one or more of that", [[{3}]] is "exactly three of that".

[['/^[A-Z]\d+$/']] reads: "a capital letter at the start, then digits until the end". "B12" passes, "b12" and "B1x" do not.`,
    deeper: [
      { try: { task: R`Add your own words to [[$words]], then change the pattern to [['/^[a-z]/']] (starts with a small letter).`, php: R`<?php
$words = ["Room12", "apple", "B7", "sky", "Echo3", "orange", "TV"];
$pattern = '/\d$/';    // ends with a digit

echo "<h3>Matches $pattern</h3><ul>";
foreach ($words as $w) {
  if (preg_match($pattern, $w)) {
    echo "<li>$w</li>";
  }
}
echo "</ul>";

echo "<p>Has a vowel? ";
echo preg_match('/[aeiou]/i', "sky") ? "yes" : "no";   // no
echo "</p>";
?>` } },
      R`**The exam pattern (2024-25 style).** An array of associative arrays, an [[if]] on one field, and a [[foreach]] with [[preg_match]] on another.`,
      { code: R`<?php
$phones = [
  ["model" => "Nova5",  "year" => 2019, "brand" => "Huawei"],
  ["model" => "Galaxy", "year" => 2021, "brand" => "Samsung"],
  ["model" => "Pixel8", "year" => 2023, "brand" => "Google"],
];

// 1. an if on one element
if ($phones[1]["year"] > 2020) {
  echo "The second phone is recent";
}

// 2. foreach + preg_match: models that end with a digit
foreach ($phones as $p) {
  if (preg_match('/\d$/', $p["model"])) {
    echo "<li>" . $p["model"] . "</li>";    // Nova5, Pixel8
  }
}
?>`, lang: 'php' },
      { try: { task: R`Write a pattern for a university ID: exactly 9 digits, starting with 20. Test it on the list.`, php: R`<?php
$ids = ["202301234", "20231234", "301234567", "2023O1234", "202212345"];
$pattern = '/^20\d{7}$/';
foreach ($ids as $id) {
  $ok = preg_match($pattern, $id) ? "valid" : "not valid";
  echo "<p>$id: $ok</p>";
}
?>` } }
    ],
    points: [
      'preg_match(pattern, text) returns 1 (match) or 0 (no match).',
      'Write patterns as single-quoted strings between / /; add i for case-insensitive.',
      '^ start, $ end; without them the pattern can match anywhere.',
      '\\d digit, [A-Z] capital, [aeiou] vowel, . any character.',
      '* 0+, + 1+, ? 0 or 1, {m,n} between m and n.'
    ],
    exam: [
      'Loop over an array of associative arrays and print the items whose field matches a pattern (ends with a digit, starts with a letter, contains a vowel).',
      R`MCQ on quantifiers: what [[* + ? {m,n}]] mean.`,
      R`Watch the anchors: [['/\d/']] means "contains a digit", [['/\d$/']] means "ends with one".`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
preg_match("^[A-Z]", $name);`, right: R`<?php
preg_match('/^[A-Z]/', $name);`, why: 'The pattern needs delimiters (usually slashes) around it.' },
      { lang: 'php', wrong: R`<?php
if (preg_match('/[0-9]/', $code)) // "ends with a digit"`, right: R`<?php
if (preg_match('/[0-9]$/', $code))`, why: 'Without $ the digit can be anywhere in the text.' },
      { lang: 'php', wrong: R`<?php
preg_match('/^[aeiou]/', "Apple");   // 0`, right: R`<?php
preg_match('/^[aeiou]/i', "Apple");  // 1`, why: 'Patterns are case-sensitive unless you add the i flag.' }
    ],
    summary: [
      'preg_match → 1 or 0.',
      '^ $ anchors, [ ] classes, \\d \\w \\s.',
      '* + ? {m,n} quantifiers; i ignores case.'
    ],
    recall: [
      { q: R`Which pattern matches text that **ends with a digit**?`, o: [R`[['/^\d/']]`, R`[['/\d$/']]`, R`[['/\d+/']]`, R`[['/$\d/']]`], a: 1, why: '\\d then $ = a digit right at the end.' },
      { q: R`What does [[preg_match('/^[A-Z]{2}\d{3}$/', "IT333")]] return?`, o: ['0', '1', 'true', '"IT333"'], a: 1, why: 'Two capitals, then exactly three digits: it matches, so 1.' },
      { q: R`In a regex, [[?]] after a character means…`, o: ['one or more', 'zero or more', 'zero or one', 'any character'], a: 2, why: '? makes the piece optional.' },
      { q: R`Which flag makes [['/[aeiou]/']] also match capital vowels?`, o: ['g', 'm', 'i', 'u'], a: 2, why: 'i = case-insensitive.' }
    ],
    challenge: {
      task: R`Using [[$cars]]:
1. In [[<ul id="recent">]], list the models of cars with **year > 2015**.
2. In [[<ul id="digit">]], list the models that **end with a digit** (use [[preg_match]]).
3. In [[<ul id="both">]], list the models that **start with a capital letter and end with a digit**.
4. Print [[<p id="first">Corolla is old</p>]]: an [[if]] on the first car's year (2015 or earlier → "old", otherwise "new").`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php
$cars = [
  ["model" => "Corolla", "year" => 2012, "color" => "white"],
  ["model" => "Sonata3", "year" => 2018, "color" => "black"],
  ["model" => "x5",      "year" => 2021, "color" => "blue"],
  ["model" => "Accord8", "year" => 2009, "color" => "red"],
  ["model" => "Patrol",  "year" => 2020, "color" => "white"],
  ["model" => "Tucson2", "year" => 2022, "color" => "grey"],
];

?>` },
      requests: [{}],
      checks: [
        { d: R`[[#recent]]: Sonata3, x5, Patrol, Tucson2`, t: rs => all(rs[0], '#recent li').join() === 'Sonata3,x5,Patrol,Tucson2' },
        { d: R`[[#digit]]: Sonata3, x5, Accord8, Tucson2`, t: rs => all(rs[0], '#digit li').join() === 'Sonata3,x5,Accord8,Tucson2' },
        { d: R`[[#both]]: Sonata3, Accord8, Tucson2`, t: rs => all(rs[0], '#both li').join() === 'Sonata3,Accord8,Tucson2' },
        { d: R`[[#first]] says "Corolla is old"`, t: rs => tx(rs[0], '#first') === 'Corolla is old' },
        { d: R`Uses [[foreach]] and [[preg_match]] with [[^]] and [[$]] anchors`, t: (rs, src) => /foreach\s*\(/.test(code(src)) && /preg_match\s*\(/.test(code(src)) && /'\/\^\[A-Z\]/.test(src) && /\\d\$\/'|\[0-9\]\$\/'/.test(src) },
        { d: 'No PHP warnings', t: rs => clean(rs) }
      ],
      solution: { php: R`<?php
$cars = [
  ["model" => "Corolla", "year" => 2012, "color" => "white"],
  ["model" => "Sonata3", "year" => 2018, "color" => "black"],
  ["model" => "x5",      "year" => 2021, "color" => "blue"],
  ["model" => "Accord8", "year" => 2009, "color" => "red"],
  ["model" => "Patrol",  "year" => 2020, "color" => "white"],
  ["model" => "Tucson2", "year" => 2022, "color" => "grey"],
];

echo '<ul id="recent">';
foreach ($cars as $car) {
  if ($car["year"] > 2015) {
    echo "<li>" . $car["model"] . "</li>";
  }
}
echo "</ul>";

echo '<ul id="digit">';
foreach ($cars as $car) {
  if (preg_match('/\d$/', $car["model"])) {
    echo "<li>" . $car["model"] . "</li>";
  }
}
echo "</ul>";

echo '<ul id="both">';
foreach ($cars as $car) {
  if (preg_match('/^[A-Z].*\d$/', $car["model"])) {
    echo "<li>" . $car["model"] . "</li>";
  }
}
echo "</ul>";

if ($cars[0]["year"] <= 2015) {
  echo '<p id="first">' . $cars[0]["model"] . ' is old</p>';
} else {
  echo '<p id="first">' . $cars[0]["model"] . ' is new</p>';
}
?>` }
    }
  });

  LESSONS.push({
    id: 'php-forms', module: 'php', title: 'Forms: $_GET, $_POST, isset and extract',
    big: R`This is where PHP meets the forms you built in the midterm part. When a form is submitted, the browser sends each field's **name** and **value** to the server. PHP puts them in two ready-made arrays: [[$_GET]] and [[$_POST]]. A page can show the form **and** handle it, deciding which to do with [[isset]].

In the lab, submit the form inside the result: the request bar shows what the browser sent.`,
    simple: R`- [[<form method="get">]] → the data goes in the URL ([[page.php?name=Ali&mark=90]]) and arrives in [[$_GET]].
- [[<form method="post">]] → the data goes in the request body and arrives in [[$_POST]].
- The **[[name]]** attribute of each input becomes the **key**: [[<input name="mark">]] → [[$_POST["mark"]]].
- [[action="result.php"]] sends the data to another page; no action means the same page.
- Values always arrive as **strings**.

**Is there data?**
- [[isset($_POST["mark"])]] → true if that field was sent. Check before reading, or you get a warning on the first visit.
- [[empty($x)]] → true if the value is missing, "" or "0".
- A common test for "was the form submitted?": [[if (isset($_POST["submit"]))]] (the submit button has [[name="submit"]]).

**extract($_POST)** turns every key into a variable: [[$_POST["mark"]]] becomes [[$mark]]. Past papers use it; know what it does (and that it can overwrite your own variables).

[[$_REQUEST]] holds GET and POST together.`,
    simpler: R`Submitting a form is like posting a filled-in application to an office.

- [[name]] is the label printed next to each box: "mark", "email".
- With **GET** the answers are written on the outside of the envelope (the URL): anyone can read them.
- With **POST** they are inside the envelope (the request body).
- At the office, PHP opens [[$_GET]] or [[$_POST]] and reads each answer by its label.
- [[isset]] is checking "did they actually fill in this box?" before reading it.`,
    deeper: [
      { try: { task: R`Submit the form in the result with different values, and empty the name. Then change [[method="get"]] and watch the request bar: the data moves into the URL.`, php: R`<form method="post">
  Name: <input name="student"><br>
  Mark: <input name="mark" type="number"><br>
  <button type="submit" name="submit">Send</button>
</form>
<?php
if (isset($_POST["submit"])) {
  $student = trim($_POST["student"]);
  $mark = $_POST["mark"];
  if ($student == "") {
    echo "<p>Please enter a name</p>";
  } else {
    echo "<p>$student got $mark</p>";
  }
}
?>`, req: { method: 'POST', body: 'student=Ali&mark=88&submit=' } } },
      R`**extract.** The same handler, shorter. Each key in [[$_POST]] becomes a variable with that name.`,
      { code: R`<?php
// request body: student=Ali&mark=88&submit=
extract($_POST);          // now $student, $mark and $submit exist
if (isset($submit)) {
  echo "$student got $mark";
}
?>`, lang: 'php' },
      R`**GET for links and searches.** GET data is part of the URL, so a link can carry it: [[<a href="course.php?code=ITCS333">]]. Use GET to read or search; use POST to send or change data, and for passwords.`,
      { try: { task: R`Click the links in the result. Then type [[code=ITCS214]] in the request bar and press Run.`, php: R`<?php
$courses = ["ITCS333" => "Internet Software Development", "ITCS214" => "Data Structures"];
?>
<p><a href="?code=ITCS333">ITCS333</a> · <a href="?code=ITCS214">ITCS214</a> · <a href="?code=XYZ">XYZ</a></p>
<?php
if (isset($_GET["code"])) {
  $code = $_GET["code"];
  if (isset($courses[$code])) {
    echo "<h2>$code: " . $courses[$code] . "</h2>";
  } else {
    echo "<p>Unknown course</p>";
  }
} else {
  echo "<p>Choose a course</p>";
}
?>`, req: { query: 'code=ITCS333' } } }
    ],
    points: [
      'The input name is the key in $_GET / $_POST.',
      'method="get" → $_GET (data in the URL); method="post" → $_POST (data in the body).',
      'Check with isset before reading a field.',
      'Form values are strings; convert or compare carefully.',
      'extract($_POST) creates a variable for each key.'
    ],
    exam: [
      R`Code: a page that shows a form, and on submit reads the fields with [[isset]] (or [[extract]]) and prints a result or an error.`,
      'Short answer: GET vs POST.',
      R`MCQ: which superglobal holds the data of [[<form method="post">]].`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<input id="mark">
<?php echo $_POST["mark"]; ?>`, right: R`<input name="mark">
<?php echo $_POST["mark"]; ?>`, why: 'Only the name attribute is sent to the server. id is for CSS and JavaScript.' },
      { lang: 'php', wrong: R`<?php
echo "Hello " . $_POST["name"];   // warning on the first visit`, right: R`<?php
if (isset($_POST["name"])) {
  echo "Hello " . $_POST["name"];
}`, why: 'On the first visit nothing was submitted, so the key does not exist.' },
      { lang: 'php', wrong: R`<form method="post"> ... </form>
<?php echo $_GET["name"]; ?>`, right: R`<form method="post"> ... </form>
<?php echo $_POST["name"]; ?>`, why: 'The superglobal must match the form method.' }
    ],
    summary: [
      'name="x" → $_GET["x"] or $_POST["x"].',
      'isset before reading.',
      'extract makes variables from the keys.'
    ],
    recall: [
      { q: R`The form has [[method="post"]] and [[<input name="email">]]. How do you read the email?`, o: [R`[[$_POST["email"]]]`, R`[[$_GET["email"]]]`, R`[[$_POST.email]]`, R`[[$email["post"]]]`], a: 0, why: 'POST data is in $_POST, keyed by the input name.' },
      { q: R`What does [[isset($_GET["page"])]] check?`, o: ['That page is a number', 'That a "page" value was sent in the URL', 'That the form is valid', 'That the user is logged in'], a: 1, why: 'isset is true if the key exists (and is not null).' },
      { q: R`After [[extract($_POST)]] with the body [[city=Manama]], which variable exists?`, o: [R`[[$_city]]`, R`[[$city]]`, R`[[$post_city]]`, 'None'], a: 1, why: 'extract makes one variable per key, with the same name.' },
      { q: 'Which method shows the data in the address bar?', o: ['GET', 'POST', 'Both', 'Neither'], a: 0, why: 'GET adds ?name=value to the URL.' }
    ],
    challenge: {
      task: R`Make a page that shows a form ([[method="post"]], inputs named [[student]] and [[mark]], a submit button named [[submit]]) and, when it is submitted, prints a [[<p id="result">]]:
- if the name is empty (after [[trim]]): [["Please enter a name"]]
- otherwise [["Name: grade"]] where the grade is A (90+), B (80+), C (70+), D (60+), F (below 60). Example: [["Sara: A"]].
On the first visit (nothing submitted), there is **no** [[#result]].`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<form method="post">
  Name: <input name="student">
  Mark: <input name="mark" type="number">
  <button type="submit" name="submit">Grade</button>
</form>
<?php

?>` },
      requests: [{}, { method: 'POST', body: 'student=Sara&mark=91&submit=' }, { method: 'POST', body: 'student=++&mark=50&submit=' }, { method: 'POST', body: 'student=Ali&mark=72&submit=' }, { method: 'POST', body: 'student=Omar&mark=59&submit=' }],
      checks: [
        { d: 'First visit: the form is shown and there is no #result', t: rs => !!rs[0].doc.querySelector('form input[name=student]') && !rs[0].doc.querySelector('#result') },
        { d: R`Sara with 91 → "Sara: A"`, t: rs => tx(rs[1], '#result') === 'Sara: A' },
        { d: R`An empty name (spaces only) → "Please enter a name"`, t: rs => tx(rs[2], '#result') === 'Please enter a name' },
        { d: R`Ali with 72 → "Ali: C"`, t: rs => tx(rs[3], '#result') === 'Ali: C' },
        { d: R`Omar with 59 → "Omar: F"`, t: rs => tx(rs[4], '#result') === 'Omar: F' },
        { d: R`Uses [[isset]] and [[$_POST]] (or [[extract]]), with no warnings`, t: (rs, src) => /isset\s*\(/.test(code(src)) && /\$_POST|extract\s*\(/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<form method="post">
  Name: <input name="student">
  Mark: <input name="mark" type="number">
  <button type="submit" name="submit">Grade</button>
</form>
<?php
if (isset($_POST["submit"])) {
  $student = trim($_POST["student"]);
  $mark = $_POST["mark"];
  if ($student == "") {
    echo '<p id="result">Please enter a name</p>';
  } else {
    if ($mark >= 90) $grade = "A";
    elseif ($mark >= 80) $grade = "B";
    elseif ($mark >= 70) $grade = "C";
    elseif ($mark >= 60) $grade = "D";
    else $grade = "F";
    echo '<p id="result">' . $student . ": " . $grade . "</p>";
  }
}
?>` }
    }
  });

  LESSONS.push({
    id: 'php-checkbox', module: 'php', title: 'Checkbox arrays: name="item[]" and running totals',
    big: R`A classic exam question: a list of checkboxes, the user ticks some, and PHP prints the total. The trick is in the name: [[name="item[]"]] with square brackets makes PHP collect **all** ticked values into one array.`,
    simple: R`- Give every checkbox the **same** name ending in [[[]]]: [[<input type="checkbox" name="item[]" value="…">]].
- Only **ticked** boxes are sent. [[$_POST["item"]]] is an array of their values.
- If **nothing** is ticked, the key does not exist at all: test with [[isset($_POST["item"])]] (or [[isset($item)]] after [[extract]]) and show an error message.
- The value often packs several facts with a separator, e.g. [[value="1.250#400"]] = price # calories. Split it with [[explode("#", $v)]].
- Keep running totals: start at 0 before the loop, add inside the loop, print after it.
- [[number_format($total, 3)]] gives 3 decimals (Bahraini dinars use 3).`,
    simpler: R`A café order card with tick boxes.

- All the boxes share one name, [[item[]]]: the [[[]]] means "put every ticked one in the same basket".
- Only what you tick goes into the basket. An empty basket means the key is not there at all, so check with [[isset]] first.
- Each box's value is like a price tag "1.250#400": [[explode]] cuts it into price and calories, and you add them up as you go.`,
    deeper: [
      { try: { task: R`Tick different items in the result and press Order. Then untick everything and press Order again.`, php: R`<form method="post">
  <label><input type="checkbox" name="item[]" value="Latte#1.600#190"> Latte</label><br>
  <label><input type="checkbox" name="item[]" value="Croissant#0.900#230"> Croissant</label><br>
  <label><input type="checkbox" name="item[]" value="Juice#1.250#110"> Juice</label><br>
  <button type="submit" name="order">Order</button>
</form>
<?php
if (isset($_POST["order"])) {
  if (isset($_POST["item"])) {
    $total = 0;
    $calories = 0;
    echo "<ul>";
    foreach ($_POST["item"] as $v) {
      $parts = explode("#", $v);          // [name, price, calories]
      echo "<li>" . $parts[0] . ": " . $parts[1] . " BD</li>";
      $total += $parts[1];
      $calories += $parts[2];
    }
    echo "</ul>";
    echo "<p>Total: " . number_format($total, 3) . " BD, $calories kcal</p>";
  } else {
    echo "<p>No item selected</p>";
  }
}
?>`, req: { method: 'POST', body: 'item[]=Latte%231.600%23190&item[]=Juice%231.250%23110&order=' } } },
      R`**What the browser sends.** Ticking Latte and Juice sends [[item[]=Latte#1.600#190&item[]=Juice#1.250#110]]. PHP sees [[item[]]] twice and builds [[$_POST["item"] = ["Latte#1.600#190", "Juice#1.250#110"]]]. Without the [[[]]] in the name, only the **last** ticked value would survive.`,
      R`**The same with extract.** Past papers often write [[extract($_POST);]] and then test [[if (isset($item))]]. It works the same way: the variable exists only when at least one box was ticked.`
    ],
    points: [
      'Checkboxes that belong together share one name ending in [].',
      '$_POST["item"] is an array of the ticked values only.',
      'Nothing ticked → the key is missing: test with isset and show an error.',
      'Split packed values with explode and add the pieces to totals.',
      'Start totals at 0 before the loop; print after the loop.'
    ],
    exam: [
      R`Full question: checkboxes [[name="x[]"]] with values like [["price#weight"]]; use [[extract]], [[isset]], [[foreach]], [[explode]], keep a total, and print an error when nothing is selected. Marked line by line.`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<input type="checkbox" name="item" value="Pen#0.5">
<input type="checkbox" name="item" value="Book#2">`, right: R`<input type="checkbox" name="item[]" value="Pen#0.5">
<input type="checkbox" name="item[]" value="Book#2">`, why: 'Without [] PHP keeps only the last ticked value, as a string.' },
      { lang: 'php', wrong: R`<?php
foreach ($_POST["item"] as $v) { … }   // warning when nothing is ticked`, right: R`<?php
if (isset($_POST["item"])) {
  foreach ($_POST["item"] as $v) { … }
} else {
  echo "No item selected";
}`, why: 'When no box is ticked the key does not exist.' },
      { lang: 'php', wrong: R`<?php
foreach ($_POST["item"] as $v) {
  $total = 0;
  $total += explode("#", $v)[1];
}`, right: R`<?php
$total = 0;
foreach ($_POST["item"] as $v) {
  $total += explode("#", $v)[1];
}`, why: 'Resetting the total inside the loop throws away the earlier items.' }
    ],
    summary: [
      'name="x[]" → array of ticked values.',
      'isset first; error if nothing is ticked.',
      'explode each value and keep totals.'
    ],
    recall: [
      { q: R`Two boxes named [[c[]]] are ticked. What is [[$_POST["c"]]]?`, o: ['The last value', 'An array of both values', 'A comma-separated string', 'true'], a: 1, why: 'The [] in the name collects every ticked value into an array.' },
      { q: 'No checkbox is ticked. What is in $_POST for them?', o: ['An empty array', 'null', 'Nothing: the key does not exist', '"off"'], a: 2, why: 'Unticked checkboxes are not sent at all.' },
      { q: R`[[explode("#", "0.750#200")[1]]] is…`, o: ['"0.750"', '"200"', '"#"', '950'], a: 1, why: 'Index 1 is the second piece.' }
    ],
    challenge: {
      task: R`The form lists three books. Each value is [["Title#price#weight"]] (price in BD, weight in grams). When the form is submitted:
- If at least one book is ticked: print one [[<li>]] per ticked title inside [[<ul id="chosen">]], then [[<p id="total">Total: X BD, Y g</p>]] with the price to 3 decimals.
- If none is ticked: [[<p id="total">No book selected</p>]].
Use [[extract($_POST)]] (or [[$_POST]]), [[isset]], [[foreach]] and [[explode]].`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<form method="post">
  <label><input type="checkbox" name="book[]" value="PHP Basics#4.500#350"> PHP Basics</label>
  <label><input type="checkbox" name="book[]" value="SQL Guide#3.250#280"> SQL Guide</label>
  <label><input type="checkbox" name="book[]" value="Web Security#6.000#420"> Web Security</label>
  <button type="submit" name="buy">Buy</button>
</form>
<?php

?>` },
      requests: [{ method: 'POST', body: 'book[]=PHP+Basics%234.500%23350&book[]=Web+Security%236.000%23420&buy=' }, { method: 'POST', body: 'buy=' }, { method: 'POST', body: 'book[]=SQL+Guide%233.250%23280&buy=' }],
      checks: [
        { d: R`Two books ticked → [[#chosen]] lists "PHP Basics" and "Web Security"`, t: rs => all(rs[0], '#chosen li').join('|') === 'PHP Basics|Web Security' },
        { d: R`… and [[#total]] says "Total: 10.500 BD, 770 g"`, t: rs => tx(rs[0], '#total') === 'Total: 10.500 BD, 770 g' },
        { d: R`Nothing ticked → "No book selected" and no list`, t: rs => tx(rs[1], '#total') === 'No book selected' && all(rs[1], '#chosen li').length === 0 },
        { d: R`Only SQL Guide → "Total: 3.250 BD, 280 g"`, t: rs => tx(rs[2], '#total') === 'Total: 3.250 BD, 280 g' },
        { d: R`Uses [[isset]], [[foreach]] and [[explode]], with no warnings`, t: (rs, src) => /isset\s*\(/.test(code(src)) && /foreach\s*\(/.test(code(src)) && /explode\s*\(/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<form method="post">
  <label><input type="checkbox" name="book[]" value="PHP Basics#4.500#350"> PHP Basics</label>
  <label><input type="checkbox" name="book[]" value="SQL Guide#3.250#280"> SQL Guide</label>
  <label><input type="checkbox" name="book[]" value="Web Security#6.000#420"> Web Security</label>
  <button type="submit" name="buy">Buy</button>
</form>
<?php
extract($_POST);
if (isset($buy)) {
  if (isset($book)) {
    $price = 0;
    $weight = 0;
    echo '<ul id="chosen">';
    foreach ($book as $b) {
      $parts = explode("#", $b);
      echo "<li>" . $parts[0] . "</li>";
      $price += $parts[1];
      $weight += $parts[2];
    }
    echo "</ul>";
    echo '<p id="total">Total: ' . number_format($price, 3) . " BD, " . $weight . " g</p>";
  } else {
    echo '<p id="total">No book selected</p>';
  }
}
?>` }
    }
  });

  LESSONS.push({
    id: 'php-server', module: 'php', title: '$_SERVER, header() and die()',
    big: R`Every request carries facts about itself: the visitor's IP address, the method, the page asked for, the browser. PHP puts them in [[$_SERVER]]. With [[header("Location: …")]] a page can send the visitor somewhere else, and with [[die()]] it can stop on the spot. Together they make the "IP filter" question from past papers.

In the lab, change the **IP** field in the request bar to pretend to be a different visitor.`,
    simple: R`**$_SERVER** (a few useful keys)
- [[$_SERVER["REMOTE_ADDR"]]] → the visitor's IP address, e.g. "10.0.5.20"
- [[$_SERVER["REQUEST_METHOD"]]] → "GET" or "POST"
- [[$_SERVER["PHP_SELF"]]] → the path of this script, e.g. "/index.php"
- [[$_SERVER["QUERY_STRING"]]] → the part after ? in the URL
- [[$_SERVER["HTTP_USER_AGENT"]]] → which browser sent the request

**header("Location: page.php")** tells the browser "go to page.php instead". It is sent as an HTTP header, so it must come **before any output** (any echo or HTML), or PHP warns "headers already sent".

**die("message")** (same as [[exit("message")]]) prints the message and stops the script. Nothing after it runs. Put it right after a redirect so the rest of the page is never produced.`,
    simpler: R`- [[$_SERVER]] is the information printed on the envelope of the request: where it came from (IP), how it was sent (GET/POST), which page it asked for.
- [[header("Location: …")]] is the receptionist saying "not here, go to that office".
- [[die()]] is closing the shop door immediately: whatever was planned after it never happens.`,
    deeper: [
      { try: { task: R`Change the IP in the request bar to [[192.168.1.7]] and press Run. Then try [[10.0.0.66]].`, php: R`<?php
$ip = $_SERVER["REMOTE_ADDR"];
$parts = explode(".", $ip);          // "10.0.5.20" → ["10", "0", "5", "20"]

if ($ip == "10.0.0.66") {
  die("<h2>This device is blocked</h2>");
}
if ($parts[0] != "10") {
  header("Location: outside.php");    // send outsiders away
  die();
}
?>
<h1>Campus page</h1>
<p>Your IP: <?= $ip ?></p>
<p>Method: <?= $_SERVER["REQUEST_METHOD"] ?></p>
<p>This script: <?= $_SERVER["PHP_SELF"] ?></p>`, req: { ip: '10.0.5.20' } } },
      R`**Headers before output.** A redirect is an HTTP header, and headers travel **before** the page body. Once any output has been sent, it is too late. (Many servers hold back the first few kilobytes of output, which hides this mistake, but the rule still stands and exams test it.)`,
      { code: R`<?php
echo "Checking…";               // output already started
header("Location: login.php");  // Warning: Cannot modify header information - headers already sent
?>

<?php
if (!isset($_GET["id"])) {
  header("Location: list.php"); // first, before any output
  exit;
}
echo "Showing item " . $_GET["id"];
?>`, lang: 'php' },
      R`**What the browser does** with [[Location]]: the server answers with status **302 Found** and the new address; the browser then requests that address by itself. In the lab, the log shows this as "header Location".`
    ],
    points: [
      '$_SERVER["REMOTE_ADDR"] is the visitor IP; explode(".", …) splits it into 4 parts.',
      '$_SERVER also has REQUEST_METHOD, PHP_SELF, QUERY_STRING, HTTP_USER_AGENT.',
      'header("Location: x.php") redirects; it must come before any output.',
      'die() / exit() stops the script; use it after a redirect.',
      'A redirect answers with status 302 and the browser follows it.'
    ],
    exam: [
      R`IP filter: [[explode('.', $_SERVER['REMOTE_ADDR'])]], compare a part, then [[die()]] or [[header('Location: …')]].`,
      R`MCQ: which [[$_SERVER]] key holds the client's IP ([[REMOTE_ADDR]]).`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
header("Location: home.php");
echo "You are being redirected";   // still runs`, right: R`<?php
header("Location: home.php");
exit;`, why: 'header() does not stop the script. Without exit/die the rest of the page still runs.' },
      { lang: 'php', wrong: R`<?php
header("Location = home.php");`, right: R`<?php
header("Location: home.php");`, why: 'An HTTP header is "Name: value" with a colon.' },
      { lang: 'php', wrong: R`<?php
$ip = $_SERVER["REMOTE_IP"];`, right: R`<?php
$ip = $_SERVER["REMOTE_ADDR"];`, why: 'The key is REMOTE_ADDR.' }
    ],
    summary: [
      '$_SERVER["REMOTE_ADDR"] = client IP.',
      'header("Location: …") before any output.',
      'die() / exit stop the script.'
    ],
    recall: [
      { q: R`Which gives the visitor's IP address?`, o: [R`[[$_SERVER['REMOTE_ADDR']]]`, R`[[$_SERVER['SERVER_ADDR']]]`, R`[[$_GET['ip']]]`, R`[[$_SERVER['CLIENT_IP']]]`], a: 0, why: 'REMOTE_ADDR is the address of the client that made the request.' },
      { q: R`What happens to the code after [[die("Stop");]]?`, o: ['It runs normally', 'It never runs', 'It runs after a delay', 'It runs only on POST'], a: 1, why: 'die prints its message and ends the script.' },
      { q: R`Why must [[header("Location: …")]] come before any echo?`, o: ['It is faster', 'Headers are sent before the page body', 'echo deletes headers', 'It does not have to'], a: 1, why: 'Once output starts, the headers have already gone.' }
    ],
    challenge: {
      task: R`Only the campus network (IP addresses starting with [[10.]]) may see this page.
1. Split the visitor's IP from [[$_SERVER]] with [[explode]].
2. If the IP is exactly [["10.0.0.66"]], stop with [[die("Banned")]].
3. Otherwise, if the first part is not [["10"]], redirect to [[denied.php]] with [[header]] and stop with [[die()]].
4. Otherwise print [[<h1>Lab results</h1>]] and [[<p id="ip">Your IP: …</p>]].`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php

?>` },
      req: { ip: '10.0.5.20' },
      requests: [{ ip: '10.0.5.20' }, { ip: '192.168.1.7' }, { ip: '10.0.0.66' }, { ip: '100.2.3.4' }],
      checks: [
        { d: R`10.0.5.20 sees "Lab results" and "Your IP: 10.0.5.20"`, t: rs => tx(rs[0], 'h1') === 'Lab results' && tx(rs[0], '#ip') === 'Your IP: 10.0.5.20' && !rs[0].redirect },
        { d: R`192.168.1.7 is redirected to denied.php`, t: rs => rs[1].redirect === 'denied.php' },
        { d: R`… and the page stops there (no "Lab results")`, t: rs => rs[1].died && !/Lab results/.test(rs[1].html) },
        { d: R`10.0.0.66 gets "Banned" and nothing else`, t: rs => rs[2].text === 'Banned' && !rs[2].redirect },
        { d: R`100.2.3.4 (starts with "100", not "10") is redirected too`, t: rs => rs[3].redirect === 'denied.php' },
        { d: R`Uses [[$_SERVER["REMOTE_ADDR"]]] and [[explode]], with no warnings`, t: (rs, src) => /\$_SERVER\s*\[\s*['"]REMOTE_ADDR['"]\s*\]/.test(src) && /explode\s*\(/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<?php
$ip = $_SERVER["REMOTE_ADDR"];
$parts = explode(".", $ip);
if ($ip == "10.0.0.66") {
  die("Banned");
}
if ($parts[0] != "10") {
  header("Location: denied.php");
  die();
}
?>
<h1>Lab results</h1>
<p id="ip">Your IP: <?= $ip ?></p>` }
    }
  });
})();

/* Module 11: Managing state (Ch 15). Labs use the PHP runner: each Run is a new visitor; submitting a form or
   clicking a link inside the result sends the next request with the same cookies (and session). */
(() => {
  const R = String.raw;
  const clean = rs => rs.every(r => !r.errors.length);
  const tx = (r, sel) => { const e = r && r.doc.querySelector(sel); return e ? e.textContent.replace(/\s+/g, ' ').trim() : null; };
  const rows = (r, sel) => r ? [...r.doc.querySelectorAll(sel + ' tr')].filter(tr => tr.querySelector('td')).map(tr => [...tr.cells].map(c => c.textContent.trim())) : [];
  const code = src => U.phpScan(src).filter(p => p.t === 'code').map(p => p.s).join(' ');
  const set = (r, name) => r && r.setCookies.find(c => c.name === name);
  const days = c => c && c.expires ? (c.expires - Date.now()) / 86400000 : null;
  const STATE_NOTE = R`**In the lab**: Run starts a **new visitor** (no cookies, no session). Clicking a link or submitting a form **inside the result** sends the next request as the **same** visitor, so cookies and the session carry over. The log under the result shows every [[Set-Cookie]], the cookies the browser now holds, and the contents of [[$_SESSION]].`;

  LESSONS.push({
    id: 'state-http', module: 'state', title: 'HTTP forgets: why web apps need state',
    big: R`HTTP is **stateless**: every request is answered on its own, and the server keeps no memory of the previous one. To the server, your second click looks like it came from a stranger. Yet sites remember your cart, your login and your language. This chapter is about how: by sending small pieces of **state** with each request (in the URL, in hidden form fields, in cookies) or by keeping it on the server and giving the browser only a key (sessions).

${STATE_NOTE}`,
    simple: R`Ways to carry information from one request to the next:
- **Query string**: [[page.php?page=3&sort=price]]. Visible in the URL, can be bookmarked and shared. Good for "which page / which item".
- **Hidden form field**: [[<input type="hidden" name="step" value="2">]]. Sent with the form, not shown on the page (but visible in the source, and the user can change it).
- **Cookie**: a small name=value pair the **browser** stores and sends back automatically with every request to that site.
- **Session**: data stored **on the server**; the browser only holds a cookie with the session id ([[PHPSESSID]]).

Everything that comes from the browser (query string, hidden fields, cookies) can be changed by the user, so never trust it for prices, roles or permissions. Check it on the server.`,
    simpler: R`HTTP is a shop assistant with no memory: every time you walk up to the counter, they have never seen you before.

- A **query string** is a note you read out loud each time ("I'm on page 3").
- A **hidden field** is a note folded inside your form.
- A **cookie** is a sticker the shop puts on your bag; you show it every time you come in.
- A **session** is a locker at the shop: your things stay there, and you only carry the **key number** (the session id).`,
    deeper: [
      { try: { task: R`Click Next and Previous inside the result: each click is a new request that carries the page number in the URL. Then type [[page=abc]] or [[page=9]] in the request bar.`, php: R`<?php
$total = 5;
$page = isset($_GET["page"]) ? (int) $_GET["page"] : 1;
if ($page < 1) $page = 1;
if ($page > $total) $page = $total;
?>
<h2>Page <?= $page ?> of <?= $total ?></h2>
<?php if ($page > 1): ?>
  <a href="?page=<?= $page - 1 ?>">Previous</a>
<?php endif; ?>
<?php if ($page < $total): ?>
  <a href="?page=<?= $page + 1 ?>">Next</a>
<?php endif; ?>` } },
      R`**Hidden fields** carry state through a multi-step form. Each step sends the earlier answers back to the server in hidden inputs.`,
      { try: { task: R`Fill in step 1 and continue. In "Show the HTML that the script sent", find the hidden input that carries your name to step 2.`, php: R`<?php
if (!isset($_POST["name"])) { ?>
  <h3>Step 1</h3>
  <form method="post">Name: <input name="name"> <button>Next</button></form>
<?php } elseif (!isset($_POST["major"])) { ?>
  <h3>Step 2</h3>
  <form method="post">
    <input type="hidden" name="name" value="<?= htmlspecialchars($_POST["name"]) ?>">
    Major: <select name="major"><option>CS</option><option>CE</option><option>IS</option></select>
    <button>Finish</button>
  </form>
<?php } else { ?>
  <p>Registered <?= htmlspecialchars($_POST["name"]) ?> in <?= htmlspecialchars($_POST["major"]) ?></p>
<?php } ?>` } }
    ],
    points: [
      'HTTP is stateless: each request is independent.',
      'State can travel in the query string, hidden fields or cookies, or stay on the server in a session.',
      'Query strings are visible and bookmarkable; hidden fields are invisible on the page but not secret.',
      'Anything sent by the browser can be changed by the user: validate it on the server.'
    ],
    exam: [
      'Short answer: what does "HTTP is stateless" mean, and name ways to keep state.',
      'MCQ: which mechanism stores the data on the server (sessions).'
    ],
    mistakes: [
      { lang: 'php', wrong: R`<input type="hidden" name="price" value="9.900">
<?php $total = $_POST["price"] * $qty; ?>`, right: R`<input type="hidden" name="id" value="5">
<?php $price = /* look up product 5 in the database */ 9.900;
$total = $price * $qty; ?>`, why: 'The user can edit a hidden field. Send an id and look the price up on the server.' },
      { lang: 'php', wrong: R`<?php
$page = $_GET["page"];          // missing on the first visit`, right: R`<?php
$page = isset($_GET["page"]) ? (int) $_GET["page"] : 1;`, why: 'Give a default when the value is missing, and force the type.' }
    ],
    summary: [
      'Stateless HTTP: the server forgets.',
      'Client side: URL, hidden fields, cookies.',
      'Server side: sessions.'
    ],
    recall: [
      { q: 'HTTP being "stateless" means…', o: ['It cannot send HTML', 'Each request is handled without memory of earlier ones', 'It cannot use cookies', 'It only works with GET'], a: 1, why: 'The server keeps nothing between requests unless you add a mechanism.' },
      { q: 'Where is session data stored?', o: ['In the URL', 'In the browser', 'On the server', 'In a hidden field'], a: 2, why: 'The browser only keeps the session id.' },
      { q: 'Can a user change the value of a hidden input?', o: ['No, it is hidden', 'Yes, with the developer tools or a crafted request', 'Only with JavaScript disabled', 'Only on GET'], a: 1, why: 'Hidden only means not displayed.' }
    ],
    challenge: {
      task: R`Make a pager for 5 pages, using only the query string.
- [[$page]] comes from [[$_GET["page"]]] as a number; default **1**; anything below 1 becomes 1, above 5 becomes 5.
- Print [[<h2 id="title">Page N of 5</h2>]].
- If N > 1, print [[<a id="prev" href="?page=N-1">Previous</a>]].
- If N < 5, print [[<a id="next" href="?page=N+1">Next</a>]].`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php

?>` },
      requests: [{}, { query: 'page=3' }, { query: 'page=5' }, { query: 'page=abc' }, { query: 'page=9' }],
      checks: [
        { d: R`No page → "Page 1 of 5", a Next link to [[?page=2]], no Previous`, t: rs => tx(rs[0], '#title') === 'Page 1 of 5' && (rs[0].doc.querySelector('#next') || {}).getAttribute && rs[0].doc.querySelector('#next').getAttribute('href') === '?page=2' && !rs[0].doc.querySelector('#prev') },
        { d: R`page=3 → Previous [[?page=2]] and Next [[?page=4]]`, t: rs => tx(rs[1], '#title') === 'Page 3 of 5' && rs[1].doc.querySelector('#prev') && rs[1].doc.querySelector('#prev').getAttribute('href') === '?page=2' && rs[1].doc.querySelector('#next') && rs[1].doc.querySelector('#next').getAttribute('href') === '?page=4' },
        { d: R`page=5 → no Next link`, t: rs => tx(rs[2], '#title') === 'Page 5 of 5' && !rs[2].doc.querySelector('#next') && !!rs[2].doc.querySelector('#prev') },
        { d: R`page=abc → Page 1; page=9 → Page 5`, t: rs => tx(rs[3], '#title') === 'Page 1 of 5' && tx(rs[4], '#title') === 'Page 5 of 5' },
        { d: R`Reads [[$_GET["page"]]] with [[isset]]; no warnings`, t: (rs, src) => /\$_GET\s*\[\s*['"]page['"]\s*\]/.test(src) && /isset\s*\(/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<?php
$page = isset($_GET["page"]) ? (int) $_GET["page"] : 1;
if ($page < 1) $page = 1;
if ($page > 5) $page = 5;
echo '<h2 id="title">Page ' . $page . ' of 5</h2>';
if ($page > 1) {
  echo '<a id="prev" href="?page=' . ($page - 1) . '">Previous</a> ';
}
if ($page < 5) {
  echo '<a id="next" href="?page=' . ($page + 1) . '">Next</a>';
}
?>` }
    }
  });

  LESSONS.push({
    id: 'state-cookies', module: 'state', title: 'Cookies: setcookie and $_COOKIE',
    big: R`A **cookie** is a small piece of text (name = value) that the server asks the browser to keep. From then on, the browser sends it back with **every** request to that site, until it expires. PHP sets cookies with [[setcookie()]] and reads them from [[$_COOKIE]]. Typical uses: "remember me", the last visit time, a preferred language or theme.

${STATE_NOTE}`,
    simple: R`**Set**: [[setcookie("username", "Sara", time() + 7*24*60*60);]]
- name, value, and the **expiry** as a Unix time: [[time()]] (now, in seconds) **plus** how many seconds it should live. 7 days = 7 × 24 × 60 × 60 = 604800 seconds.
- Without an expiry it is a **session cookie**: it disappears when the browser closes.
- Optional extras: path, domain, secure (HTTPS only), **httponly** (JavaScript cannot read it).
- [[setcookie]] sends a header, so call it **before any output**.

**Read**: [[$_COOKIE["username"]]], after checking [[isset($_COOKIE["username"])]].
- A cookie you set now appears in [[$_COOKIE]] only on the **next** request (the browser has to send it back first).

**Delete**: set it again with an expiry in the past: [[setcookie("username", "", time() - 3600);]]

Limits: about 4 KB per cookie; the user can see, edit or delete cookies, so never store passwords or anything you must trust.`,
    simpler: R`A cookie is a **stamp on your hand** at an event.

- [[setcookie]] is the staff stamping you, with an expiry date ("valid for 7 days").
- Every time you walk back in, you show your hand ([[$_COOKIE]]) without being asked.
- Deleting is stamping "expired" over it.
- You can rub the stamp off or draw a fake one, so the event should never trust it for anything important.`,
    deeper: [
      { try: { task: R`Run, then click "Reload" in the result twice: the first visit has no cookie, the second shows the last visit, and the counter grows. Click "Forget me" to delete both cookies.`, php: R`<?php
if (isset($_GET["forget"])) {
  setcookie("lastvisit", "", time() - 3600);
  setcookie("visits", "", time() - 3600);
  echo "<p>Cookies deleted.</p>";
} else {
  if (isset($_COOKIE["lastvisit"])) {
    echo "<p>Welcome back! Your last visit: " . $_COOKIE["lastvisit"] . "</p>";
  } else {
    echo "<p>Welcome, first-time visitor!</p>";
  }
  $visits = isset($_COOKIE["visits"]) ? $_COOKIE["visits"] + 1 : 1;
  echo "<p>Visits: $visits</p>";
  setcookie("lastvisit", date("d/m/Y H:i:s"), time() + 3 * 7 * 24 * 60 * 60);   // 3 weeks
  setcookie("visits", $visits, time() + 3 * 7 * 24 * 60 * 60);
}
?>
<p><a href="?">Reload</a> · <a href="?forget=1">Forget me</a></p>` } },
      R`**Expiry in seconds**: count it out loud in the exam. 1 hour = 60 × 60 = 3600. 1 day = 86400. 1 week = 604800. 3 weeks = 3 × 7 × 24 × 60 × 60 = 1814400. 30 days = 30 × 24 × 60 × 60 = 2592000.`,
      { code: R`<?php
setcookie("lang", "ar", time() + 30 * 24 * 60 * 60);          // 30 days
setcookie("theme", "dark");                                    // session cookie
setcookie("token", $t, time() + 3600, "/", "", true, true);   // 1 hour, path /, secure, httponly
setcookie("lang", "", time() - 3600);                         // delete
?>`, lang: 'php' }
    ],
    points: [
      'setcookie(name, value, time() + seconds) creates a cookie; call it before any output.',
      'No expiry → a session cookie that ends when the browser closes.',
      '$_COOKIE["name"] reads it, but only from the next request on.',
      'Delete with an expiry in the past: setcookie(name, "", time() - 3600).',
      'Cookies live in the browser: small (~4 KB), visible and editable by the user.'
    ],
    exam: [
      R`Pattern: [[setcookie('lastvisit', date(...), 3*7*24*60*60 + time())]], then show the last visit if [[isset($_COOKIE[...])]].`,
      'MCQ: the expiry argument is a time in seconds (time() + seconds).',
      'Short answer: cookies vs sessions (next lesson).'
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
setcookie("user", "Ali", 7);    // expired in 1970`, right: R`<?php
setcookie("user", "Ali", time() + 7 * 24 * 60 * 60);`, why: 'The expiry is an absolute Unix time, so add the seconds to time().' },
      { lang: 'php', wrong: R`<?php
setcookie("user", "Ali", time() + 3600);
echo $_COOKIE["user"];          // not there yet`, right: R`<?php
setcookie("user", "Ali", time() + 3600);
echo "Saved. It will be in \$_COOKIE on your next visit.";`, why: '$_COOKIE holds what the browser sent with this request. The new cookie is sent back on the next one.' },
      { lang: 'php', wrong: R`<html><body>
<?php setcookie("user", "Ali"); ?>`, right: R`<?php setcookie("user", "Ali"); ?>
<html><body>`, why: 'setcookie sends an HTTP header, which must go before any HTML.' }
    ],
    summary: [
      'setcookie(name, value, time() + seconds).',
      '$_COOKIE on the next request.',
      'Delete with a past expiry.'
    ],
    recall: [
      { q: 'Which expiry makes a cookie last 2 days?', o: [R`[[2]]`, R`[[time() + 2]]`, R`[[time() + 2*24*60*60]]`, R`[[2*24*60*60]]`], a: 2, why: 'time() plus 2 days in seconds.' },
      { q: 'How do you delete a cookie?', o: [R`[[unset($_COOKIE["x"])]]`, R`[[setcookie("x", "", time() - 3600)]]`, R`[[cookie_delete("x")]]`, R`[[session_destroy()]]`], a: 1, why: 'A past expiry tells the browser to drop it. unset only changes the PHP array for this request.' },
      { q: R`A page calls [[setcookie("a", "1")]] and then reads [[$_COOKIE["a"]]] on the same request. What does it get?`, o: ['"1"', 'Nothing (not set yet)', 'true', 'An error'], a: 1, why: 'The cookie only comes back with the next request.' },
      { q: 'Where are cookies stored?', o: ['On the server', 'In the browser', 'In the database', 'In the PHP file'], a: 1, why: 'The browser keeps them and sends them back.' }
    ],
    challenge: {
      task: R`A "remember my name" page:
1. If [[?forget=1]] is in the URL: delete the [[username]] cookie and print [[<p id="msg">Forgotten</p>]].
2. Else if the form was posted with a [[name]]: save it in a cookie [[username]] that lasts **7 days**, and print [[<p id="msg">Saved NAME</p>]].
3. Else if the [[username]] cookie exists: print [[<p id="msg">Welcome back, NAME</p>]].
4. Else print [[<p id="msg">Hello, stranger</p>]] and the form ([[method="post"]], an input named [[name]]).`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php

?>` },
      requests: [{}, { method: 'POST', body: 'name=Sara' }, {}, { query: 'forget=1' }, {}],
      checks: [
        { d: R`First visit: "Hello, stranger" and a form with an input named name`, t: rs => tx(rs[0], '#msg') === 'Hello, stranger' && !!rs[0].doc.querySelector('form[method=post] input[name=name]') },
        { d: R`Posting Sara → "Saved Sara" and a [[username]] cookie that lasts 7 days`, t: rs => { const c = set(rs[1], 'username'); return tx(rs[1], '#msg') === 'Saved Sara' && c && c.value === 'Sara' && Math.abs(days(c) - 7) < 0.01; } },
        { d: R`Next visit → "Welcome back, Sara"`, t: rs => tx(rs[2], '#msg') === 'Welcome back, Sara' },
        { d: R`[[?forget=1]] → "Forgotten" and the cookie is deleted`, t: rs => { const c = set(rs[3], 'username'); return tx(rs[3], '#msg') === 'Forgotten' && c && c.deleted && !('username' in rs[3].cookies); } },
        { d: R`After forgetting → "Hello, stranger" again`, t: rs => tx(rs[4], '#msg') === 'Hello, stranger' },
        { d: R`Uses [[setcookie]] and [[$_COOKIE]]; no warnings`, t: (rs, src) => /setcookie\s*\(/.test(code(src)) && /\$_COOKIE/.test(src) && clean(rs) }
      ],
      solution: { php: R`<?php
if (isset($_GET["forget"])) {
  setcookie("username", "", time() - 3600);
  echo '<p id="msg">Forgotten</p>';
} elseif (isset($_POST["name"])) {
  setcookie("username", $_POST["name"], time() + 7 * 24 * 60 * 60);
  echo '<p id="msg">Saved ' . $_POST["name"] . '</p>';
} elseif (isset($_COOKIE["username"])) {
  echo '<p id="msg">Welcome back, ' . $_COOKIE["username"] . '</p>';
} else {
  echo '<p id="msg">Hello, stranger</p>';
  echo '<form method="post"><input name="name"> <button>Remember me</button></form>';
}
?>` }
    }
  });

  LESSONS.push({
    id: 'state-sessions', module: 'state', title: 'Sessions: session_start and $_SESSION',
    big: R`A **session** keeps data **on the server** for one visitor, across many requests. PHP gives the browser a cookie named [[PHPSESSID]] with a random id; on every request PHP uses that id to load the visitor's own [[$_SESSION]] array. Logins, shopping carts and multi-page forms are all built on sessions.

${STATE_NOTE}`,
    simple: R`- [[session_start();]] at the **top** of every page that uses the session (before any output). It creates a new session or loads the existing one.
- [[$_SESSION["user"] = "Sara";]] → store. Any type works, arrays included: [[$_SESSION["cart"]["pen"] = 2;]]
- [[$_SESSION["user"]]] → read on any later request, after [[isset($_SESSION["user"])]].
- [[unset($_SESSION["cart"]);]] → remove one item.
- [[session_destroy();]] → delete the whole session on the server (log out). The current request's [[$_SESSION]] array is still filled until the script ends, so also empty it with [[$_SESSION = [];]] if you print it afterwards.
- [[session_id()]] → the current id.

Sessions end when you destroy them, or after some time without requests (the server's timeout, often 24 minutes).`,
    simpler: R`A session is a **coat check**.

- [[session_start]] is walking up to the counter. The first time, you get a numbered ticket (the [[PHPSESSID]] cookie).
- [[$_SESSION]] is your hanger: you can leave anything there.
- Each visit you show the ticket and get your own hanger back, never someone else's.
- [[session_destroy]] is taking everything and throwing the ticket away.`,
    deeper: [
      { try: { task: R`Add items with the form inside the result. Each request is new, but the cart survives in [[$_SESSION]]. Then click "Empty cart".`, php: R`<?php
session_start();
if (!isset($_SESSION["cart"])) {
  $_SESSION["cart"] = [];
}
if (isset($_POST["item"])) {
  $item = $_POST["item"];
  if (isset($_SESSION["cart"][$item])) {
    $_SESSION["cart"][$item]++;
  } else {
    $_SESSION["cart"][$item] = 1;
  }
}
if (isset($_GET["empty"])) {
  unset($_SESSION["cart"]);
  $_SESSION["cart"] = [];
}
?>
<form method="post">
  <select name="item"><option>Pen</option><option>Notebook</option><option>Bag</option></select>
  <button>Add</button> <a href="?empty=1">Empty cart</a>
</form>
<?php
if (count($_SESSION["cart"]) == 0) {
  echo "<p>The cart is empty</p>";
} else {
  echo "<table border='1'><tr><th>Item</th><th>Qty</th></tr>";
  foreach ($_SESSION["cart"] as $item => $qty) {
    echo "<tr><td>$item</td><td>$qty</td></tr>";
  }
  echo "</table>";
}
?>`, req: {} } },
      R`**Session data as a table (exam pattern).** An associative array of arrays in the session, printed with a nested [[foreach]], with counts and averages, and a message when the session data does not exist.`,
      { code: R`<?php
session_start();
// filled on earlier pages, e.g. $_SESSION["marks"]["Ali"] = [80, 90];
if (!isset($_SESSION["marks"])) {
  echo "No marks in the session";
} else {
  echo "<table border='1'>";
  foreach ($_SESSION["marks"] as $student => $list) {
    echo "<tr><td>$student</td>";
    $sum = 0;
    foreach ($list as $m) {
      echo "<td>$m</td>";
      $sum += $m;
    }
    echo "<td>Average: " . round($sum / count($list), 1) . "</td></tr>";
  }
  echo "</table>";
  echo "<p>" . count($_SESSION["marks"]) . " students</p>";
}
?>`, lang: 'php' }
    ],
    points: [
      'session_start() first, before any output, on every page that uses the session.',
      '$_SESSION is an array kept on the server per visitor; it can hold arrays.',
      'Check with isset before reading; unset removes one key.',
      'session_destroy() ends the session (log out); also empty $_SESSION if you print it afterwards.',
      'The browser only holds the session id in the PHPSESSID cookie.'
    ],
    exam: [
      'Render an associative array stored in $_SESSION as an HTML table with nested foreach, counts and averages; show a message when it does not exist.',
      R`MCQ: what must come first on a page that uses [[$_SESSION]] ([[session_start()]]).`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
$_SESSION["user"] = "Ali";   // session_start() missing
echo $_SESSION["user"];`, right: R`<?php
session_start();
$_SESSION["user"] = "Ali";`, why: 'Without session_start the array is not saved for the next request.' },
      { lang: 'php', wrong: R`<?php
session_start();
echo "Hi " . $_SESSION["user"];   // warning when not logged in`, right: R`<?php
session_start();
if (isset($_SESSION["user"])) {
  echo "Hi " . $_SESSION["user"];
} else {
  echo "Please log in";
}`, why: 'The key exists only after it was set on an earlier request.' },
      { lang: 'php', wrong: R`<?php
session_destroy();     // session_start() missing`, right: R`<?php
session_start();
session_destroy();`, why: 'You can only destroy a session you have started on this request.' }
    ],
    summary: [
      'session_start → $_SESSION[...] → isset.',
      'Data stays on the server, keyed by PHPSESSID.',
      'unset one key; session_destroy all.'
    ],
    recall: [
      { q: 'What must every page that uses $_SESSION call first?', o: ['session_create()', 'session_start()', 'session_open()', 'setcookie()'], a: 1, why: 'session_start loads or creates the session.' },
      { q: 'Which cookie connects a browser to its session?', o: ['SESSION', 'PHPSESSID', 'PHPSESSION', 'SID_TOKEN'], a: 1, why: 'PHP names it PHPSESSID by default.' },
      { q: R`How do you remove only the cart from the session?`, o: [R`[[session_destroy()]]`, R`[[unset($_SESSION["cart"])]]`, R`[[$_SESSION = null]]`, R`[[setcookie("cart", "")]]`], a: 1, why: 'unset removes one key and keeps the rest.' }
    ],
    challenge: {
      task: R`A marks tracker that keeps its data in the session:
1. If the form is posted with [[course]] and [[mark]], store it: [[$_SESSION["marks"][course] = mark]].
2. If [[?clear=1]] is in the URL, destroy the session (and empty [[$_SESSION]]).
3. Then, if there are no marks in the session, print [[<p id="none">No marks yet</p>]]. Otherwise print [[<table id="marks">]] with one row per course (course, mark), and [[<p id="avg">Average: X</p>]] (rounded to 1 decimal).
Keep the starter form.`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php
session_start();

?>
<form method="post">
  Course <input name="course"> Mark <input name="mark" type="number">
  <button>Add</button> <a href="?clear=1">Clear</a>
</form>
<?php

?>` },
      requests: [{}, { method: 'POST', body: 'course=ITCS333&mark=90' }, { method: 'POST', body: 'course=ITCS214&mark=81' }, {}, { query: 'clear=1' }, {}],
      checks: [
        { d: R`First visit: "No marks yet"`, t: rs => tx(rs[0], '#none') === 'No marks yet' && !rs[0].doc.querySelector('#marks') },
        { d: R`After adding ITCS333 = 90: one row and "Average: 90"`, t: rs => JSON.stringify(rows(rs[1], '#marks')) === JSON.stringify([['ITCS333', '90']]) && tx(rs[1], '#avg') === 'Average: 90' },
        { d: R`After adding ITCS214 = 81: two rows and "Average: 85.5"`, t: rs => rows(rs[2], '#marks').length === 2 && tx(rs[2], '#avg') === 'Average: 85.5' },
        { d: 'A plain visit later still shows both marks (kept in the session)', t: rs => JSON.stringify(rows(rs[3], '#marks')) === JSON.stringify([['ITCS333', '90'], ['ITCS214', '81']]) && rs[3].session && rs[3].session.marks },
        { d: R`[[?clear=1]] → "No marks yet", and it stays empty on the next visit`, t: rs => tx(rs[4], '#none') === 'No marks yet' && tx(rs[5], '#none') === 'No marks yet' },
        { d: R`Uses [[$_SESSION]], [[session_destroy]] and [[foreach]]; no warnings`, t: (rs, src) => /\$_SESSION/.test(src) && /session_destroy\s*\(/.test(code(src)) && /foreach\s*\(/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<?php
session_start();
if (isset($_POST["course"]) && isset($_POST["mark"])) {
  $_SESSION["marks"][$_POST["course"]] = $_POST["mark"];
}
if (isset($_GET["clear"])) {
  session_destroy();
  $_SESSION = [];
}
?>
<form method="post">
  Course <input name="course"> Mark <input name="mark" type="number">
  <button>Add</button> <a href="?clear=1">Clear</a>
</form>
<?php
if (!isset($_SESSION["marks"]) || count($_SESSION["marks"]) == 0) {
  echo '<p id="none">No marks yet</p>';
} else {
  echo '<table id="marks" border="1">';
  $sum = 0;
  foreach ($_SESSION["marks"] as $course => $mark) {
    echo "<tr><td>$course</td><td>$mark</td></tr>";
    $sum += $mark;
  }
  echo "</table>";
  echo '<p id="avg">Average: ' . round($sum / count($_SESSION["marks"]), 1) . '</p>';
}
?>` }
    }
  });

  LESSONS.push({
    id: 'state-compare', module: 'state', title: 'Cookies vs sessions, logins, and caching',
    big: R`Cookies and sessions solve the same problem in opposite places: a cookie keeps the data **in the browser**, a session keeps it **on the server** and gives the browser only a key. Comparing them is one of the most frequent short answers in this course. This lesson also shows the standard "protected page" pattern and the idea of **caching**.`,
    simple: R`**Cookies vs sessions**
- **Where**: cookie → browser; session → server (the browser holds only the id cookie).
- **Size**: cookie about 4 KB, text only; session → as much as the server allows, any PHP value.
- **Security**: the user can read and edit cookies; session data cannot be seen or changed by the user (but the session id must be protected, see Chapter 16).
- **Lifetime**: a cookie lives until its expiry (days or months possible); a session ends on destroy, on timeout, or usually when the browser closes.
- **Use**: cookies for preferences and "remember me"; sessions for logins, carts and anything sensitive.

**Protected page pattern**
[[session_start(); if (!isset($_SESSION["user"])) { header("Location: login.php"); exit; }]]

**Caching**: keeping a copy of something so it does not have to be fetched or computed again.
- **Browser cache**: the browser keeps images, CSS and JS; the server controls it with headers such as [[Cache-Control: max-age=86400]] (keep for a day) or [[Cache-Control: no-store]] (never keep).
- **Server-side cache**: the server keeps the result of a slow job (a big query, an API call) for a while and reuses it.
- Benefit: faster pages and less load. Risk: showing **stale** (old) data.`,
    simpler: R`- A **cookie** is a note you carry in your pocket: you can read it, lose it, or rewrite it.
- A **session** is a file the school keeps in its office; you only carry your student number.
- **Caching** is keeping a photocopy of a page you read often, instead of going back to the library every time. Fast, but the copy may be out of date.`,
    deeper: [
      { try: { task: R`Run: you are sent to login.php. Click "Log in as Ali" in the result: now the page greets you on every request. Click "Log out".`, php: R`<?php
session_start();
if (isset($_GET["login"])) {
  $_SESSION["user"] = $_GET["login"];      // a real login checks a password first (Chapter 16)
}
if (isset($_GET["logout"])) {
  session_destroy();
  $_SESSION = [];
}
if (!isset($_SESSION["user"])) {
  header("Location: login.php");
  // the sandbox shows the page instead of following the redirect, so offer a way in:
  echo "<a href='?login=Ali'>Log in as Ali</a>";
  exit;
}
?>
<h2>Dashboard</h2>
<p>Hello <?= $_SESSION["user"] ?></p>
<a href="?">Reload</a> · <a href="?logout=1">Log out</a>` } },
      R`**Cache headers from PHP.** A page can tell the browser how long to keep it. Use [[no-store]] for private pages (account, cart) so a shared computer never shows them again from the cache.`,
      { code: R`<?php
// a public page that changes once a day
header("Cache-Control: public, max-age=86400");

// a private page: never cache
header("Cache-Control: no-store");
?>`, lang: 'php' }
    ],
    points: [
      'Cookie data lives in the browser; session data lives on the server.',
      'Cookies: small, visible and editable by the user, can last long. Sessions: larger, hidden from the user, end on logout or timeout.',
      'Use sessions for logins and carts; cookies for preferences and "remember me".',
      'Protected page: session_start, check isset($_SESSION["user"]), otherwise redirect and exit.',
      'Caching keeps copies (browser or server) for speed; Cache-Control headers control the browser cache.'
    ],
    exam: [
      'Short answer: compare cookies and sessions (where stored, size, security, lifetime, typical use).',
      'Code: a page that redirects to login.php when the session has no user.',
      'Concept: what is caching, and one benefit and one risk.'
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
setcookie("role", "admin");   // "the user is an admin"
if ($_COOKIE["role"] == "admin") { … }`, right: R`<?php
session_start();
$_SESSION["role"] = "admin";  // set only after a real login check
if ($_SESSION["role"] == "admin") { … }`, why: 'A user can edit cookies and make themselves "admin". Keep trusted facts in the session.' },
      { lang: 'php', wrong: R`<?php
if (!isset($_SESSION["user"])) {
  header("Location: login.php");
}
echo "Secret data";`, right: R`<?php
if (!isset($_SESSION["user"])) {
  header("Location: login.php");
  exit;
}
echo "Secret data";`, why: 'Without exit the secret part is still sent before the browser follows the redirect.' }
    ],
    summary: [
      'Cookie = browser; session = server.',
      'Protect pages with session + redirect + exit.',
      'Caching = reuse copies; watch for stale data.'
    ],
    recall: [
      { q: 'Which is safer for storing that a user is logged in?', o: ['A cookie "loggedin=yes"', 'A session variable', 'A hidden field', 'A query string'], a: 1, why: 'The user cannot edit session data.' },
      { q: 'Which can last for months after the browser is closed?', o: ['A session', 'A cookie with a far expiry', 'A hidden field', '$_POST'], a: 1, why: 'Persistent cookies live until their expiry date.' },
      { q: R`What does [[Cache-Control: no-store]] tell the browser?`, o: ['Keep the page for a day', 'Do not keep a copy of the page', 'Delete all cookies', 'Use HTTPS'], a: 1, why: 'no-store forbids caching.' }
    ],
    challenge: {
      task: R`Build a protected page with a session:
1. [[?login=NAME]] stores NAME in [[$_SESSION["user"]]].
2. [[?logout=1]] destroys the session.
3. If there is no user in the session, redirect to [[login.php]] with [[header]] and [[exit]].
4. Otherwise print [[<p id="hello">Hello NAME</p>]].`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php

?>` },
      requests: [{}, { query: 'login=Ali' }, {}, { query: 'logout=1' }, {}],
      checks: [
        { d: R`Not logged in → redirect to login.php, and nothing else is shown`, t: rs => rs[0].redirect === 'login.php' && !rs[0].doc.querySelector('#hello') },
        { d: R`[[?login=Ali]] → "Hello Ali"`, t: rs => tx(rs[1], '#hello') === 'Hello Ali' && !rs[1].redirect },
        { d: R`A later plain visit still says "Hello Ali" (the session remembers)`, t: rs => tx(rs[2], '#hello') === 'Hello Ali' },
        { d: R`[[?logout=1]] → redirected, and the next visit is redirected too`, t: rs => rs[3].redirect === 'login.php' && rs[4].redirect === 'login.php' && !rs[4].doc.querySelector('#hello') },
        { d: R`Uses [[session_start]], [[$_SESSION]], [[header("Location: …")]] and [[exit]] (or die); no warnings`, t: (rs, src) => /session_start\s*\(/.test(code(src)) && /\$_SESSION/.test(src) && /header\s*\(/.test(code(src)) && /\b(exit|die)\b/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<?php
session_start();
if (isset($_GET["login"])) {
  $_SESSION["user"] = $_GET["login"];
}
if (isset($_GET["logout"])) {
  session_destroy();
  $_SESSION = [];
}
if (!isset($_SESSION["user"])) {
  header("Location: login.php");
  exit;
}
echo '<p id="hello">Hello ' . $_SESSION["user"] . '</p>';
?>` }
    }
  });
})();

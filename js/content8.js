/* Module 12: Security (Ch 16). Every attack shown here runs only inside the in-browser sandbox, against its own
   throw-away database, to show why the defence is needed. */
(() => {
  const R = String.raw;
  const SEC_SQL = `CREATE TABLE staff (id INTEGER PRIMARY KEY, username VARCHAR(30), password VARCHAR(255), role VARCHAR(10));
INSERT INTO staff (username, password, role) VALUES ('admin', 'Adm!n2026', 'admin'), ('mona', 'mona123', 'staff');
CREATE TABLE products (id INTEGER PRIMARY KEY, name VARCHAR(50), category VARCHAR(30), price DECIMAL(6,3), hidden INT);
INSERT INTO products (name, category, price, hidden) VALUES ('Notebook', 'Stationery', 0.750, 0), ('Headphones', 'Electronics', 12.500, 0), ('USB cable', 'Electronics', 2.250, 0), ('Staff laptop', 'Internal', 450.000, 1);
CREATE TABLE members (id INTEGER PRIMARY KEY, username VARCHAR(30) UNIQUE, hash VARCHAR(255));
INSERT INTO members (username, hash) VALUES ('ali', '$2y$12$Gc9MbIbZGb2ovlwnQCPINuDvOpUdRymUrDU8jZbZLxjOAYySu9GEi');`;
  const db = { name: 'secure', user: 'root', pass: '', sql: SEC_SQL };
  const CONN = R`<?php
$db = new PDO("mysql:host=localhost;dbname=secure;charset=utf8", "root", "");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>`;
  const files = { 'connection.php': CONN };

  const clean = rs => rs.every(r => !r.errors.length);
  const tx = (r, sel) => { const e = r && r.doc.querySelector(sel); return e ? e.textContent.replace(/\s+/g, ' ').trim() : null; };
  const all = (r, sel) => r ? [...r.doc.querySelectorAll(sel)].map(e => e.textContent.replace(/\s+/g, ' ').trim()) : [];
  const code = src => U.phpScan(src).filter(p => p.t === 'code').map(p => p.s).join(' ');
  const strs = src => U.phpScan(src).filter(p => p.t === 'str').map(p => p.s).join(' ');
  const sid = r => (r.setCookies.find(c => c.name === 'PHPSESSID') || {});
  const SANDBOX = R`**Safe practice.** The attacks in this module run only inside this page's sandbox, against a throw-away database that is reset on every Run. They are shown so you can recognise the mistake and write the fix.`;

  LESSONS.push({
    id: 'sec-xss', module: 'security', title: 'Cross-site scripting (XSS) and htmlspecialchars',
    big: R`**XSS** happens when a page prints text from a user **as HTML**. If that text contains a [[<script>]] tag, the browser runs it, inside **your** site, for every visitor who sees the page. The script can steal session cookies, change the page, or act as the user. The defence is simple and must be automatic: **escape every value when you print it** in HTML.

${SANDBOX}`,
    simple: R`- **Reflected XSS**: the input comes back in the same response, e.g. a search page that prints [[You searched for: <?= $_GET["q"] ?>]].
- **Stored XSS**: the input is saved (a comment, a profile name) and later shown to **other** users. More dangerous.

**The fix: escape output.** [[htmlspecialchars($text)]] turns the HTML special characters into harmless codes:
- [[<]] → [[&lt;]], [[>]] → [[&gt;]], [[&]] → [[&amp;]], [["]] → [[&quot;]], [[']] → [[&#039;]]
The browser then **shows** [[<script>]] as text instead of running it.

Rules:
- Escape when you **print** into HTML, not when you save. Save the original text.
- Escape everything that came from outside: [[$_GET]], [[$_POST]], [[$_COOKIE]], database rows that users wrote.
- [[strip_tags()]] removes tags but is not a full defence; prefer [[htmlspecialchars]].
- In JavaScript, the same idea is [[textContent]] instead of [[innerHTML]].
- Extra protection: a [[HttpOnly]] session cookie cannot be read by injected JavaScript (next lessons).`,
    simpler: R`Imagine a notice board where anyone can pin a note. XSS is someone pinning a note that says "everyone who reads this: hand your wallet to me", and the board **obeys** it.

[[htmlspecialchars]] puts every note behind glass: people can still **read** exactly what was written, but nothing on the note can make the board do anything.`,
    deeper: [
      { try: { task: R`Run it: the search term contains HTML. The first line prints it raw, so the [[<b>]] tag really becomes bold and the [[<img>]] runs its [[onerror]] code, which replaces itself with "[a script ran here]". The second line is escaped. Try other inputs in the request bar.`, php: R`<?php
$q = isset($_GET["q"]) ? $_GET["q"] : "";
?>
<p>Unsafe: You searched for <?= $q ?></p>
<p>Safe: You searched for <?= htmlspecialchars($q) ?></p>`, req: { query: 'q=%3Cb%3Ebold%3C%2Fb%3E+%3Cimg+src%3Dx+onerror%3D%22this.replaceWith%28%27%5Ba+script+ran+here%5D%27%29%22%3E' } } },
      R`**Stored XSS.** A guestbook that saves comments (here, in the session) and shows them to everyone. Post a comment containing [[<i>]] tags or an [[<img onerror=…>]] in the form inside the result, with and without the fix.`,
      { try: { task: R`Post a comment with HTML in it. Then change [[$safe]] to [[false]] and post it again: the HTML is now live on the page.`, php: R`<?php
session_start();
$safe = true;
if (isset($_POST["comment"])) {
  $_SESSION["comments"][] = $_POST["comment"];     // save the original text
}
?>
<form method="post"><input name="comment" size="40"> <button>Post</button></form>
<ul>
<?php
foreach ($_SESSION["comments"] ?? [] as $c) {
  echo "<li>" . ($safe ? htmlspecialchars($c) : $c) . "</li>";   // escape when printing
}
?>
</ul>`, req: { method: 'POST', body: 'comment=Great+course+%3Ci%3Eloved+it%3C%2Fi%3E' } } },
      { code: R`<?php
// a helper many projects define, so escaping is short enough to never skip
function e($text) {
  return htmlspecialchars($text, ENT_QUOTES, "UTF-8");
}
?>
<p>Hello <?= e($_GET["name"] ?? "guest") ?></p>
<input name="city" value="<?= e($_POST["city"] ?? "") ?>">`, lang: 'php' }
    ],
    points: [
      'XSS = user input printed as HTML, so the browser runs it.',
      'Reflected: comes back in the same response; stored: saved and shown to others.',
      'Fix: htmlspecialchars() on every value when printing into HTML.',
      'Store the original; escape on output.',
      'Same idea in JS: textContent, not innerHTML.'
    ],
    exam: [
      'Short answer: what is XSS and how do you prevent it?',
      R`Spot the vulnerable line ([[echo $_GET["name"];]]) and fix it with [[htmlspecialchars]].`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php echo "Welcome " . $_POST["name"]; ?>`, right: R`<?php echo "Welcome " . htmlspecialchars($_POST["name"]); ?>`, why: 'Any input printed into HTML must be escaped.' },
      { lang: 'php', wrong: R`<input value="<?= $city ?>">`, right: R`<input value="<?= htmlspecialchars($city, ENT_QUOTES) ?>">`, why: 'Inside an attribute a quote in the value would close the attribute and let new attributes in.' }
    ],
    summary: [
      'XSS: input runs as code in the page.',
      'htmlspecialchars on output.',
      'Reflected vs stored.'
    ],
    recall: [
      { q: R`What does [[htmlspecialchars("<b>")]] return?`, o: [R`[["<b>"]]`, R`[["&lt;b&gt;"]]`, R`[[""]]`, R`[["b"]]`], a: 1, why: '< and > become &lt; and &gt;, which display as text.' },
      { q: 'Which XSS type saves the attack and shows it to other users?', o: ['Reflected', 'Stored', 'DOM-less', 'Encrypted'], a: 1, why: 'Stored XSS lives in the database or file and hits everyone who views it.' },
      { q: 'When should you escape user text?', o: ['Before saving it', 'When printing it into HTML', 'Only for admins', 'Never with POST'], a: 1, why: 'Escape at output, for the place you print it.' }
    ],
    challenge: {
      task: R`A comment wall that keeps comments in the session. When the form is posted with [[name]] and [[comment]], add both to [[$_SESSION["wall"]]]. Then print every comment as [[<li><b>NAME</b>: COMMENT</li>]] inside [[<ul id="wall">]].
Both values come from users, so the page must **show** any HTML they type as plain text (only your own [[<b>]] around the name is real HTML).`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php
session_start();

?>
<form method="post">
  Name <input name="name"> Comment <input name="comment"> <button>Post</button>
</form>
<?php

?>` },
      requests: [{ method: 'POST', body: 'name=Sara&comment=Great+lesson%21' }, { method: 'POST', body: 'name=%3Ci%3EOmar%3C%2Fi%3E&comment=%3Cscript%3Ealert%281%29%3C%2Fscript%3E' }, { method: 'POST', body: 'name=Mona&comment=a+%3C+b+%26%26+c+%3E+d' }],
      checks: [
        { d: R`A normal comment shows as "Sara: Great lesson!" with the name in [[<b>]]`, t: rs => all(rs[0], '#wall li')[0] === 'Sara: Great lesson!' && tx(rs[0], '#wall li b') === 'Sara' },
        { d: 'Comments are kept: the second post shows 2 items', t: rs => all(rs[1], '#wall li').length === 2 },
        { d: R`[[<script>alert(1)</script>]] appears as text, and no [[<script>]] element is created`, t: rs => !rs[1].doc.querySelector('#wall script') && all(rs[1], '#wall li')[1] === '<i>Omar</i>: <script>alert(1)</script>' },
        { d: R`[[<i>Omar</i>]] in the name does not become italic`, t: rs => !rs[1].doc.querySelector('#wall i') },
        { d: R`[[a < b && c > d]] shows exactly as typed`, t: rs => all(rs[2], '#wall li')[2] === 'Mona: a < b && c > d' },
        { d: R`Uses [[htmlspecialchars]]; no warnings`, t: (rs, src) => /htmlspecialchars\s*\(/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<?php
session_start();
if (isset($_POST["name"]) && isset($_POST["comment"])) {
  $_SESSION["wall"][] = ["name" => $_POST["name"], "comment" => $_POST["comment"]];
}
?>
<form method="post">
  Name <input name="name"> Comment <input name="comment"> <button>Post</button>
</form>
<?php
echo '<ul id="wall">';
if (isset($_SESSION["wall"])) {
  foreach ($_SESSION["wall"] as $c) {
    echo "<li><b>" . htmlspecialchars($c["name"]) . "</b>: " . htmlspecialchars($c["comment"]) . "</li>";
  }
}
echo "</ul>";
?>` }
    }
  });

  LESSONS.push({
    id: 'sec-sqli', module: 'security', title: 'SQL injection and how prepared statements stop it',
    big: R`**SQL injection** happens when user input is glued into an SQL string. The attacker types text that **closes your quote** and adds their own SQL. They can log in without a password, read other tables, or delete data. It has been one of the most damaging web attacks for decades, and it is completely preventable with **prepared statements** (Chapter 14).

${SANDBOX}`,
    simple: R`A vulnerable login:
[[$sql = "SELECT * FROM staff WHERE username = '$u' AND password = '$p'";]]

If the attacker types [[admin' -- ]] as the username, the SQL becomes:
[[SELECT * FROM staff WHERE username = 'admin' -- ' AND password = '…']]
[[--]] starts a comment, so the password check disappears and they are logged in as admin.

With [[' OR '1'='1]] in both boxes, the WHERE is always true and the first row comes back.

**The fix**: never build SQL from input. Use a prepared statement:
[[$stmt = $db->prepare("SELECT * FROM staff WHERE username = :u AND password = :p");]]
[[$stmt->execute([':u' => $u, ':p' => $p]);]]
The input is sent **separately** from the SQL, so it is always treated as a value, never as code.

Also:
- Give the database user only the rights it needs (no DROP for a web page).
- Do not show raw SQL errors to visitors; log them.
- Validate input types (an id must be a number).
- (This demo table stores plain passwords only to show the attack. Real tables store hashes: lesson 4.)`,
    simpler: R`The vulnerable query is like a form letter where you **type the customer's words straight into the sentence**: "Give the customer named ___ their parcel." If the customer writes "Ali, and also give me every parcel in the shop", the clerk reads one long instruction and obeys it.

A prepared statement puts the customer's words in a **separate box** that the clerk only reads as a name.`,
    deeper: [
      { try: { task: R`Run: the injection logs in as admin without the password. Then submit the form in the result with [[' OR '1'='1]] in both boxes. Finally change [[$useSafe]] to [[true]] and try the same inputs.`, php: R`<?php
require 'connection.php';
$useSafe = false;
?>
<form method="post">
  User <input name="u"> Password <input name="p"> <button>Log in</button>
</form>
<?php
if (isset($_POST["u"])) {
  $u = $_POST["u"];
  $p = $_POST["p"];
  if ($useSafe) {
    $stmt = $db->prepare("SELECT * FROM staff WHERE username = :u AND password = :p");
    $stmt->execute([':u' => $u, ':p' => $p]);
  } else {
    $sql = "SELECT * FROM staff WHERE username = '$u' AND password = '$p'";
    echo "<pre>" . htmlspecialchars($sql) . "</pre>";
    $stmt = $db->query($sql);
  }
  $row = $stmt->fetch();
  echo $row ? "<p>Logged in as " . $row["username"] . " (" . $row["role"] . ")</p>" : "<p>Wrong username or password</p>";
}
?>`, req: { method: 'POST', body: "u=admin%27+--+&p=anything" }, db, files } },
      R`**Injection in a search.** A shop hides internal products with [[hidden = 0]]. Glued input can switch that filter off.`,
      { try: { task: R`Search for [[Electronics]], then for [[x' OR '1'='1]]. The internal laptop leaks. Then rewrite the query as a prepared statement.`, php: R`<?php
require 'connection.php';
$cat = $_GET["cat"] ?? "Electronics";
$sql = "SELECT name, price FROM products WHERE hidden = 0 AND category = '$cat'";
echo "<pre>" . htmlspecialchars($sql) . "</pre><ul>";
foreach ($db->query($sql) as $r) {
  echo "<li>" . htmlspecialchars($r["name"]) . " (" . $r["price"] . ")</li>";
}
echo "</ul>";
?>`, req: { query: 'cat=x%27+OR+%271%27%3D%271' }, db, files } }
    ],
    points: [
      'SQL injection = input glued into SQL changes the query itself.',
      R`Classic inputs: [[' OR '1'='1]] and [[admin' -- ]].`,
      'Prepared statements send values separately, so input can never become SQL.',
      'Also: least-privilege database users, hide SQL errors, validate types.'
    ],
    exam: [
      'Short answer: explain SQL injection with an example and how to prevent it (prepared statements).',
      'Short answer: compare session hijacking and SQL injection (what each attacks).',
      'Code: rewrite a vulnerable query with prepare / execute.'
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
$db->query("DELETE FROM posts WHERE id = " . $_GET["id"]);`, right: R`<?php
$stmt = $db->prepare("DELETE FROM posts WHERE id = :id");
$stmt->execute([':id' => $_GET["id"]]);`, why: 'id=1 OR 1=1 would delete every post.' },
      { lang: 'php', wrong: R`<?php
$u = addslashes($_POST["u"]);
$db->query("SELECT * FROM staff WHERE username = '$u'");`, right: R`<?php
$stmt = $db->prepare("SELECT * FROM staff WHERE username = :u");
$stmt->execute([':u' => $_POST["u"]]);`, why: 'Escaping by hand is easy to get wrong; prepared statements are the reliable fix.' }
    ],
    summary: [
      'Never glue input into SQL.',
      'prepare + execute with placeholders.',
      'Least privilege, no raw errors.'
    ],
    recall: [
      { q: R`In [['… WHERE user = '$u' AND pass = '$p']], what does the input [[admin' -- ]] do?`, o: ['Nothing', 'Comments out the password check', 'Deletes the table', 'Encrypts the password'], a: 1, why: '-- starts an SQL comment, removing the rest of the condition.' },
      { q: 'What is the reliable defence against SQL injection?', o: ['Hiding the form', 'Prepared statements with placeholders', 'Using POST instead of GET', 'HTTPS'], a: 1, why: 'Values are sent separately from the SQL code.' },
      { q: 'Does HTTPS stop SQL injection?', o: ['Yes', 'No: it only protects data on the way', 'Only for POST', 'Only on login pages'], a: 1, why: 'HTTPS encrypts the connection; the server still receives the attack text.' }
    ],
    challenge: {
      task: R`The login below is vulnerable. Rewrite it so it uses a **prepared statement** with named placeholders, keeping the same messages:
- correct user and password → [[<p id="msg">Logged in as USERNAME</p>]]
- anything else → [[<p id="msg">Wrong username or password</p>]]
The injection attempts in the checks must all fail.`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php
require 'connection.php';
?>
<form method="post">
  User <input name="u"> Password <input name="p"> <button>Log in</button>
</form>
<?php
if (isset($_POST["u"])) {
  $u = $_POST["u"];
  $p = $_POST["p"];
  $sql = "SELECT * FROM staff WHERE username = '$u' AND password = '$p'";
  $row = $db->query($sql)->fetch();
  if ($row) {
    echo '<p id="msg">Logged in as ' . $row["username"] . '</p>';
  } else {
    echo '<p id="msg">Wrong username or password</p>';
  }
}
?>` },
      db, files,
      req: { method: 'POST', body: 'u=mona&p=mona123' },
      requests: [{ method: 'POST', body: 'u=mona&p=mona123' }, { method: 'POST', body: 'u=mona&p=wrong' }, { method: 'POST', body: 'u=admin%27+--+&p=x' }, { method: 'POST', body: 'u=%27+OR+%271%27%3D%271&p=%27+OR+%271%27%3D%271' }, { method: 'POST', body: "u=O%27Brien&p=x" }],
      checks: [
        { d: R`mona / mona123 → "Logged in as mona"`, t: rs => tx(rs[0], '#msg') === 'Logged in as mona' },
        { d: R`mona / wrong → "Wrong username or password"`, t: rs => tx(rs[1], '#msg') === 'Wrong username or password' },
        { d: R`[[admin' -- ]] does not log in`, t: rs => tx(rs[2], '#msg') === 'Wrong username or password' },
        { d: R`[[' OR '1'='1]] does not log in`, t: rs => tx(rs[3], '#msg') === 'Wrong username or password' },
        { d: R`A name with a quote ([[O'Brien]]) does not cause an SQL error`, t: rs => tx(rs[4], '#msg') === 'Wrong username or password' && !rs[4].errors.length },
        { d: R`Uses prepare with placeholders; no [[$u]] / [[$p]] inside the SQL text`, t: (rs, src) => /->\s*prepare\s*\(/.test(code(src)) && /:\w+/.test(strs(src)) && !/(SELECT|WHERE)[^"]*\$[up]\b/.test(src) && clean(rs) }
      ],
      solution: { php: R`<?php
require 'connection.php';
?>
<form method="post">
  User <input name="u"> Password <input name="p"> <button>Log in</button>
</form>
<?php
if (isset($_POST["u"])) {
  $stmt = $db->prepare("SELECT * FROM staff WHERE username = :u AND password = :p");
  $stmt->execute([':u' => $_POST["u"], ':p' => $_POST["p"]]);
  $row = $stmt->fetch();
  if ($row) {
    echo '<p id="msg">Logged in as ' . htmlspecialchars($row["username"]) . '</p>';
  } else {
    echo '<p id="msg">Wrong username or password</p>';
  }
}
?>` }
    }
  });

  LESSONS.push({
    id: 'sec-sessions', module: 'security', title: 'Session hijacking: HttpOnly, Secure and regenerating the id',
    big: R`A session is only as safe as its id. Whoever presents your [[PHPSESSID]] **is** you, as far as the server knows. **Session hijacking** means stealing that id (through XSS, an unencrypted connection, or a shared computer) and using it. **Session fixation** means tricking you into using an id the attacker already knows. A few settings make both much harder.`,
    simple: R`**Settings for the session cookie** (before [[session_start()]]):
- [[ini_set("session.cookie_httponly", 1);]] → JavaScript **cannot read** the cookie ([[document.cookie]] does not show it), so an XSS script cannot steal it.
- [[ini_set("session.cookie_secure", 1);]] → the cookie is sent **only over HTTPS**, never in plain text.
- [[ini_set("session.use_only_cookies", 1);]] → the id is never accepted from the URL.
- The same in one call: [[session_set_cookie_params(["httponly" => true, "secure" => true, "samesite" => "Strict"]);]]

**After a successful login**: [[session_regenerate_id(true);]] gives the visitor a **new** id and deletes the old session. A fixed or stolen pre-login id becomes useless.

**On logout**: [[session_destroy()]] and clear [[$_SESSION]].

Also: use HTTPS everywhere, expire idle sessions, and (optionally) store the user agent in the session and end the session if it changes.

**Session hijacking vs SQL injection**: hijacking attacks the **identity** (it reuses someone's session id); injection attacks the **database** (it changes your SQL). Different attacks, different defences.`,
    simpler: R`Your session id is a **cloakroom ticket**. Anyone holding it gets your coat.

- **HttpOnly** keeps the ticket in a pocket that scripts on the page cannot reach.
- **Secure** means the ticket only travels in a locked box (HTTPS).
- **Regenerating** after login is swapping your ticket for a fresh one the moment you prove who you are, so an old copy someone saw earlier no longer works.`,
    deeper: [
      { try: { task: R`Run and read the log: the session cookie is marked HttpOnly. Click "Log in" in the result: the log shows a **new** PHPSESSID value. Then try "Log out".`, php: R`<?php
ini_set("session.cookie_httponly", 1);
ini_set("session.use_only_cookies", 1);
session_start();

if (isset($_GET["login"])) {
  // (a real login checks the password first)
  session_regenerate_id(true);           // new id after login
  $_SESSION["user"] = "ali";
}
if (isset($_GET["logout"])) {
  session_destroy();
  $_SESSION = [];
}
echo "<p>Session id: " . substr(session_id(), 0, 8) . "…</p>";
echo isset($_SESSION["user"]) ? "<p>Logged in as " . $_SESSION["user"] . "</p>" : "<p>Not logged in</p>";
?>
<a href="?login=1">Log in</a> · <a href="?">Reload</a> · <a href="?logout=1">Log out</a>`, req: {} } },
      R`**Binding the session to the browser** (an extra check). If a stolen id is used from a different browser, the user-agent string usually differs.`,
      { code: R`<?php
session_start();
if (!isset($_SESSION["agent"])) {
  $_SESSION["agent"] = $_SERVER["HTTP_USER_AGENT"];
} elseif ($_SESSION["agent"] !== $_SERVER["HTTP_USER_AGENT"]) {
  session_destroy();
  die("Session ended for your safety. Please log in again.");
}
?>`, lang: 'php' }
    ],
    points: [
      'Session hijacking = using someone else\'s session id; fixation = forcing a known id on a victim.',
      'session.cookie_httponly stops JavaScript (and XSS) from reading the cookie.',
      'session.cookie_secure sends the cookie only over HTTPS.',
      'session_regenerate_id(true) after login defeats fixation and old stolen ids.',
      'Destroy the session on logout; expire idle sessions.'
    ],
    exam: [
      R`MCQ: which setting stops JavaScript from reading the session cookie ([[session.cookie_httponly]]).`,
      'Short answer: session hijacking vs SQL injection.',
      R`Code: where to call [[session_regenerate_id(true)]] (right after a successful login).`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
session_start();
ini_set("session.cookie_httponly", 1);   // too late`, right: R`<?php
ini_set("session.cookie_httponly", 1);
session_start();`, why: 'Cookie settings must be set before session_start creates the cookie.' },
      { lang: 'php', wrong: R`<?php
if ($passwordOk) {
  $_SESSION["user"] = $name;          // same id as before login
}`, right: R`<?php
if ($passwordOk) {
  session_regenerate_id(true);
  $_SESSION["user"] = $name;
}`, why: 'Keeping the pre-login id allows session fixation.' }
    ],
    summary: [
      'Protect the id: HttpOnly, Secure, HTTPS.',
      'Regenerate the id at login.',
      'Destroy at logout.'
    ],
    recall: [
      { q: R`What does [[session.cookie_httponly = 1]] do?`, o: ['Sends the cookie only over HTTP', 'Hides the cookie from JavaScript', 'Deletes the cookie on logout', 'Encrypts the session data'], a: 1, why: 'HttpOnly cookies are not visible to document.cookie.' },
      { q: R`When should [[session_regenerate_id(true)]] be called?`, o: ['On every page', 'Right after a successful login', 'Before session_start', 'Only on logout'], a: 1, why: 'A new id when the privilege level changes defeats fixation.' },
      { q: 'Session hijacking targets…', o: ['The database structure', 'A user\'s session id', 'The PHP source code', 'The DNS server'], a: 1, why: 'The attacker reuses a valid session id to act as the victim.' }
    ],
    challenge: {
      task: R`Make the session safer:
1. Before the session starts, set [[session.cookie_httponly]] to 1.
2. [[?login=NAME]]: regenerate the session id (deleting the old session), then store NAME in [[$_SESSION["user"]]].
3. [[?logout=1]]: destroy the session.
4. Print [[<p id="who">Logged in as NAME</p>]] or [[<p id="who">Not logged in</p>]].`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php

?>` },
      requests: [{}, { query: 'login=ali' }, {}, { query: 'logout=1' }],
      checks: [
        { d: R`The first visit gets a PHPSESSID cookie marked HttpOnly, and "Not logged in"`, t: rs => sid(rs[0]).httponly === true && tx(rs[0], '#who') === 'Not logged in' },
        { d: R`Logging in sends a **new** PHPSESSID (different value), also HttpOnly`, t: rs => sid(rs[1]).value && sid(rs[1]).value !== sid(rs[0]).value && sid(rs[1]).httponly === true },
        { d: R`… and shows "Logged in as ali" on that and the next request`, t: rs => tx(rs[1], '#who') === 'Logged in as ali' && tx(rs[2], '#who') === 'Logged in as ali' },
        { d: R`[[?logout=1]] → "Not logged in"`, t: rs => tx(rs[3], '#who') === 'Not logged in' },
        { d: R`Uses [[ini_set("session.cookie_httponly", …)]] before [[session_start]], and [[session_regenerate_id(true)]]`, t: (rs, src) => { const c = code(src), i = src.search(/ini_set\s*\(\s*['"]session\.cookie_httponly['"]/), s = src.search(/session_start\s*\(/); return i > -1 && s > i && /session_regenerate_id\s*\(\s*true\s*\)/.test(c) && clean(rs); } }
      ],
      solution: { php: R`<?php
ini_set("session.cookie_httponly", 1);
session_start();
if (isset($_GET["login"])) {
  session_regenerate_id(true);
  $_SESSION["user"] = $_GET["login"];
}
if (isset($_GET["logout"])) {
  session_destroy();
  $_SESSION = [];
}
if (isset($_SESSION["user"])) {
  echo '<p id="who">Logged in as ' . htmlspecialchars($_SESSION["user"]) . '</p>';
} else {
  echo '<p id="who">Not logged in</p>';
}
?>` }
    }
  });

  LESSONS.push({
    id: 'sec-passwords', module: 'security', title: 'Storing passwords: password_hash and password_verify',
    big: R`Databases get leaked. When that happens, plain-text passwords are a disaster, because people reuse them on other sites. So a site never stores the password itself: it stores a **hash**, a one-way scrambled version. At login it hashes the typed password the same way and compares. PHP does all of this, safely, with two functions.`,
    simple: R`- **Register**: [[$hash = password_hash($password, PASSWORD_DEFAULT);]] and store [[$hash]] (about 60 characters, starts with [[$2y$]]).
- **Log in**: fetch the row by **username** (prepared statement), then [[if (password_verify($typed, $row["hash"])) { … }]].
- Never compare with [[==]], never search with [[WHERE password = …]]: the same password gives a **different** hash each time, because a random **salt** is mixed in and stored inside the hash.
- **Slow on purpose**: each hash takes a noticeable moment (about a second in this sandbox), so guessing millions of passwords is impractical.
- Not good enough: plain text, [[md5()]], [[sha1()]]. They are fast and unsalted, so they can be cracked quickly.
- Give the same message for "no such user" and "wrong password", so attackers cannot learn which usernames exist.`,
    simpler: R`A hash is a **meat grinder**: you can turn a steak into mince, but never mince back into a steak.

The site keeps only the mince. When you log in, it grinds what you typed and checks whether the mince matches. A thief who steals the mince still does not know your steak. The random **salt** is a pinch of seasoning that makes two identical steaks give different mince.`,
    deeper: [
      { try: { task: R`Run twice: the hash changes every time, yet [[password_verify]] still matches. Then change the typed password.`, php: R`<?php
$password = "pass1234";
$hash1 = password_hash($password, PASSWORD_DEFAULT);
$hash2 = password_hash($password, PASSWORD_DEFAULT);
echo "<p>$hash1</p><p>$hash2</p>";
echo "<p>Same hash? " . ($hash1 === $hash2 ? "yes" : "no") . "</p>";

$typed = "pass1234";
echo "<p>Verify: " . (password_verify($typed, $hash1) ? "correct" : "wrong") . "</p>";
echo "<p>md5 (do not use): " . md5($password) . "</p>";
?>` } },
      R`**Login against a table of hashes.** The [[members]] table holds the user [[ali]] with a hash of [[pass1234]].`,
      { try: { task: R`Log in as [[ali]] / [[pass1234]] in the result, then with a wrong password, then with an unknown user. The message for the last two is the same on purpose.`, php: R`<?php
require 'connection.php';
?>
<form method="post">User <input name="u"> Password <input name="p" type="password"> <button>Log in</button></form>
<?php
if (isset($_POST["u"])) {
  $stmt = $db->prepare("SELECT * FROM members WHERE username = :u");
  $stmt->execute([':u' => $_POST["u"]]);
  $row = $stmt->fetch();
  if ($row && password_verify($_POST["p"], $row["hash"])) {
    echo "<p>Welcome " . htmlspecialchars($row["username"]) . "</p>";
  } else {
    echo "<p>Wrong username or password</p>";
  }
}
?>`, req: { method: 'POST', body: 'u=ali&p=pass1234' }, db, files } }
    ],
    points: [
      'Never store passwords; store password_hash($p, PASSWORD_DEFAULT).',
      'Check with password_verify($typed, $storedHash), never with ==.',
      'Each hash has its own random salt, so equal passwords give different hashes.',
      'md5 / sha1 are not acceptable for passwords.',
      'Use one message for unknown user and wrong password.'
    ],
    exam: [
      'Short answer: why hash passwords, and why md5 is not enough.',
      R`Code: registration with [[password_hash]] and login with [[password_verify]] (with a prepared SELECT by username).`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<?php
$stmt = $db->prepare("SELECT * FROM members WHERE username = :u AND hash = :h");
$stmt->execute([':u' => $u, ':h' => password_hash($p, PASSWORD_DEFAULT)]);`, right: R`<?php
$stmt = $db->prepare("SELECT * FROM members WHERE username = :u");
$stmt->execute([':u' => $u]);
$row = $stmt->fetch();
$ok = $row && password_verify($p, $row["hash"]);`, why: 'A new hash never equals the stored one (different salt). Fetch by username, then verify.' },
      { lang: 'php', wrong: R`<?php
$db->exec("INSERT INTO members (username, hash) VALUES ('$u', '" . md5($p) . "')");`, right: R`<?php
$stmt = $db->prepare("INSERT INTO members (username, hash) VALUES (:u, :h)");
$stmt->execute([':u' => $u, ':h' => password_hash($p, PASSWORD_DEFAULT)]);`, why: 'md5 is fast and unsalted, and the query was injectable too.' }
    ],
    summary: [
      'password_hash to store.',
      'password_verify to check.',
      'Never plain text, never md5.'
    ],
    recall: [
      { q: 'Which function checks a typed password against a stored hash?', o: ['password_hash', 'password_verify', 'md5', 'hash_equals'], a: 1, why: 'password_verify reads the salt from the hash and compares.' },
      { q: R`Two users choose the same password. Their stored hashes are…`, o: ['identical', 'different, because of the random salt', 'empty', 'the password itself'], a: 1, why: 'A new salt is generated for each hash.' },
      { q: 'Why is a slow hash a good thing for passwords?', o: ['It saves storage', 'It makes guessing many passwords impractical', 'It is easier to read', 'It is required by HTTP'], a: 1, why: 'Attackers can try far fewer guesses per second.' }
    ],
    challenge: {
      task: R`A register / log-in page on the [[members]] table (columns [[username]], [[hash]]). The form posts [[action]] ([["register"]] or [["login"]]), [[u]] and [[p]].
- **register**: insert the user with [[password_hash]] (prepared statement) and print [[<p id="msg">Account created for NAME</p>]].
- **login**: fetch the row by username (prepared), check with [[password_verify]], and print [[<p id="msg">Welcome NAME</p>]] or [[<p id="msg">Wrong username or password</p>]].`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<?php
require 'connection.php';
?>
<form method="post">
  User <input name="u"> Password <input name="p" type="password">
  <button name="action" value="register">Register</button>
  <button name="action" value="login">Log in</button>
</form>
<?php

?>` },
      db, files,
      req: { method: 'POST', body: 'action=login&u=ali&p=pass1234' },
      requests: [{ method: 'POST', body: 'action=register&u=sara&p=secret123' }, { method: 'POST', body: 'action=login&u=sara&p=secret123' }, { method: 'POST', body: 'action=login&u=sara&p=wrong' }, { method: 'POST', body: 'action=login&u=ali&p=pass1234' }, { method: 'POST', body: 'action=login&u=nobody&p=secret123' }],
      checks: [
        { d: R`Register sara → "Account created for sara"`, t: rs => tx(rs[0], '#msg') === 'Account created for sara' },
        { d: R`Log in sara / secret123 → "Welcome sara"`, t: rs => tx(rs[1], '#msg') === 'Welcome sara' },
        { d: R`sara with a wrong password → "Wrong username or password"`, t: rs => tx(rs[2], '#msg') === 'Wrong username or password' },
        { d: R`The existing user ali / pass1234 (stored as a hash) → "Welcome ali"`, t: rs => tx(rs[3], '#msg') === 'Welcome ali' },
        { d: R`An unknown user gets the same "Wrong username or password"`, t: rs => tx(rs[4], '#msg') === 'Wrong username or password' },
        { d: R`Uses [[password_hash]], [[password_verify]] and [[prepare]]; no md5; no warnings`, t: (rs, src) => /password_hash\s*\(/.test(code(src)) && /password_verify\s*\(/.test(code(src)) && /->\s*prepare\s*\(/.test(code(src)) && !/\b(md5|sha1)\s*\(/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<?php
require 'connection.php';
?>
<form method="post">
  User <input name="u"> Password <input name="p" type="password">
  <button name="action" value="register">Register</button>
  <button name="action" value="login">Log in</button>
</form>
<?php
if (isset($_POST["action"])) {
  $u = $_POST["u"];
  $p = $_POST["p"];
  if ($_POST["action"] == "register") {
    $stmt = $db->prepare("INSERT INTO members (username, hash) VALUES (:u, :h)");
    $stmt->execute([':u' => $u, ':h' => password_hash($p, PASSWORD_DEFAULT)]);
    echo '<p id="msg">Account created for ' . htmlspecialchars($u) . '</p>';
  } else {
    $stmt = $db->prepare("SELECT * FROM members WHERE username = :u");
    $stmt->execute([':u' => $u]);
    $row = $stmt->fetch();
    if ($row && password_verify($p, $row["hash"])) {
      echo '<p id="msg">Welcome ' . htmlspecialchars($row["username"]) . '</p>';
    } else {
      echo '<p id="msg">Wrong username or password</p>';
    }
  }
}
?>` }
    }
  });

  LESSONS.push({
    id: 'sec-https-validation', module: 'security', title: 'HTTPS, and validating input on the server',
    big: R`Two last pieces. **HTTPS** protects data **on the way** between the browser and the server. **Validation** decides what the server **accepts**. Client-side checks (HTML [[required]], JavaScript) make forms friendlier, but anyone can skip them, so the server must check everything again.`,
    simple: R`**HTTPS** = HTTP over **TLS**.
- **Encryption**: nobody on the network (public Wi-Fi, the ISP) can read the data: passwords, cookies, form fields.
- **Integrity**: nobody can change the data on the way.
- **Authentication**: the server shows a **certificate** signed by a trusted authority, proving it really is that domain. The padlock in the address bar means the certificate checked out.
- It does **not** stop XSS, SQL injection or weak passwords: those are bugs in the site itself.

**Client-side vs server-side validation**
- Client side (HTML5 attributes [[required]], [[type="email"]], [[min]], [[pattern]], or JavaScript): instant feedback, fewer wasted requests. **Not security**: the user can turn it off or send a request directly.
- Server side (PHP): the real gate. Check every field, every time.

**Useful PHP checks**
- [[trim($x) === ""]] → empty.
- [[filter_var($email, FILTER_VALIDATE_EMAIL)]] → the email, or [[false]].
- [[filter_var($age, FILTER_VALIDATE_INT, ["options" => ["min_range" => 17, "max_range" => 60]])]] → the integer, or [[false]].
- [[is_numeric($x)]], [[strlen($p) >= 8]], [[preg_match('/^\d{9}$/', $id)]].
- Collect the errors in an array, show them all, and only continue when the array is empty.`,
    simpler: R`- **HTTPS** is sending your letter in a **locked steel box** with the company's official seal on it: nobody can read it or swap it on the way, and you know who you are sending it to. But if the company itself is careless with your letter, the box does not help.
- **Client-side validation** is a sign on the door saying "fill in every box". **Server-side validation** is the clerk who actually checks the form before accepting it. Only the clerk counts.`,
    deeper: [
      { try: { task: R`The form in the result has [[required]] and [[type="email"]], but the request bar sends data directly, skipping them. Run it, then submit valid data with the form.`, php: R`<form method="post">
  Email <input name="email" type="email" required>
  Age <input name="age" type="number" min="17" max="60" required>
  <button>Send</button>
</form>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $errors = [];
  $email = trim($_POST["email"] ?? "");
  $age = $_POST["age"] ?? "";
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Email is not valid";
  }
  if (filter_var($age, FILTER_VALIDATE_INT, ["options" => ["min_range" => 17, "max_range" => 60]]) === false) {
    $errors[] = "Age must be a whole number from 17 to 60";
  }
  if (count($errors) > 0) {
    echo "<ul>";
    foreach ($errors as $e) echo "<li>$e</li>";
    echo "</ul>";
  } else {
    echo "<p>Accepted " . htmlspecialchars($email) . "</p>";
  }
}
?>`, req: { method: 'POST', body: 'email=not-an-email&age=200' } } },
      R`**What HTTPS protects, step by step.** The browser connects to [[https://uob.edu.bh]]; the server sends its certificate; the browser checks it against authorities it trusts; both sides agree on a secret key; from then on every request and response, cookies included, is encrypted. That is also why session cookies should be **Secure**: they then never travel without this protection.`
    ],
    points: [
      'HTTPS = HTTP over TLS: encryption, integrity and server authentication (certificate).',
      'HTTPS does not fix XSS, SQL injection or weak passwords.',
      'Client-side validation is for convenience; it can be bypassed.',
      'Server-side validation is required: check every field on every request.',
      'filter_var with FILTER_VALIDATE_EMAIL / FILTER_VALIDATE_INT, trim, strlen, preg_match.'
    ],
    exam: [
      'Short answer: what does HTTPS protect against, and what does it not protect against?',
      'Short answer: why is client-side validation not enough?',
      'Best-practices list: validate input, escape output, prepared statements, hash passwords, HTTPS, secure session cookies.'
    ],
    mistakes: [
      { lang: 'php', wrong: R`<input name="age" type="number" min="17" required>
<?php $age = $_POST["age"];  // trusted because of min/required ?>`, right: R`<?php
$age = filter_var($_POST["age"] ?? "", FILTER_VALIDATE_INT, ["options" => ["min_range" => 17]]);
if ($age === false) { $errors[] = "Age is not valid"; } ?>`, why: 'HTML attributes can be removed or skipped. The server must validate.' },
      { lang: 'php', wrong: R`<?php
if (filter_var($email, FILTER_VALIDATE_EMAIL) == true) { … }`, right: R`<?php
if (filter_var($email, FILTER_VALIDATE_EMAIL) !== false) { … }`, why: 'filter_var returns the value or false. Compare with false, especially for numbers where 0 is a valid result.' }
    ],
    summary: [
      'HTTPS: encrypted, unaltered, right server.',
      'Validate on the server, always.',
      'Client checks are only convenience.'
    ],
    recall: [
      { q: 'What does HTTPS protect?', o: ['The database from SQL injection', 'Data travelling between browser and server', 'The page from XSS', 'Passwords stored in the database'], a: 1, why: 'TLS encrypts and protects data in transit.' },
      { q: 'Why is client-side validation alone not enough?', o: ['It is slow', 'Users can bypass it and send any data', 'It only works in Chrome', 'It cannot check emails'], a: 1, why: 'Requests can be sent without the page, or with checks disabled.' },
      { q: R`What does [[filter_var("ab.com", FILTER_VALIDATE_EMAIL)]] return?`, o: ['"ab.com"', 'false', 'true', '0'], a: 1, why: 'Not a valid email, so false.' },
      { q: 'What does the padlock in the address bar confirm?', o: ['The site has no bugs', 'The connection is encrypted and the certificate is valid for that domain', 'The site is run by the government', 'Passwords are hashed'], a: 1, why: 'It is about the connection and the certificate only.' }
    ],
    challenge: {
      task: R`Validate a registration on the **server**. When the form is posted, collect errors in an array, in this order:
- [["Name is required"]] if the name is empty after [[trim]]
- [["Email is not valid"]] (use [[filter_var]])
- [["Age must be a whole number from 17 to 60"]]
- [["Password must be at least 8 characters"]]
If there are errors, print them as [[<li>]] items in [[<ul id="errors">]]. Otherwise print [[<p id="ok">Registered NAME</p>]] (escaped).`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<form method="post">
  Name <input name="name" required>
  Email <input name="email" type="email" required>
  Age <input name="age" type="number" min="17" max="60" required>
  Password <input name="password" type="password" minlength="8" required>
  <button>Register</button>
</form>
<?php

?>` },
      req: { method: 'POST', body: 'name=&email=x&age=abc&password=123' },
      requests: [{}, { method: 'POST', body: 'name=++&email=x&age=abc&password=123' }, { method: 'POST', body: 'name=Sara&email=sara%40uob.edu.bh&age=16&password=secret123' }, { method: 'POST', body: 'name=Sara&email=sara%40uob.edu.bh&age=20&password=secret123' }, { method: 'POST', body: 'name=%3Cb%3EAli%3C%2Fb%3E&email=ali%40uob.edu.bh&age=60&password=abcdefgh' }],
      checks: [
        { d: 'First visit: only the form, no errors and no success message', t: rs => !rs[0].doc.querySelector('#errors li, #ok') },
        { d: 'All four errors, in order, for empty name, bad email, age "abc" and a short password', t: rs => all(rs[1], '#errors li').join('|') === 'Name is required|Email is not valid|Age must be a whole number from 17 to 60|Password must be at least 8 characters' },
        { d: R`Age 16 → only the age error`, t: rs => all(rs[2], '#errors li').join('|') === 'Age must be a whole number from 17 to 60' && !rs[2].doc.querySelector('#ok') },
        { d: R`Valid data → "Registered Sara"`, t: rs => tx(rs[3], '#ok') === 'Registered Sara' && !rs[3].doc.querySelector('#errors li') },
        { d: R`A name with HTML is shown as text (escaped), age 60 accepted`, t: rs => tx(rs[4], '#ok') === 'Registered <b>Ali</b>' && !rs[4].doc.querySelector('#ok b') },
        { d: R`Uses [[filter_var]] and [[htmlspecialchars]]; no warnings`, t: (rs, src) => /filter_var\s*\(/.test(code(src)) && /htmlspecialchars\s*\(/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<form method="post">
  Name <input name="name" required>
  Email <input name="email" type="email" required>
  Age <input name="age" type="number" min="17" max="60" required>
  Password <input name="password" type="password" minlength="8" required>
  <button>Register</button>
</form>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $errors = [];
  $name = trim($_POST["name"] ?? "");
  $email = trim($_POST["email"] ?? "");
  $age = $_POST["age"] ?? "";
  $password = $_POST["password"] ?? "";
  if ($name === "") {
    $errors[] = "Name is required";
  }
  if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    $errors[] = "Email is not valid";
  }
  if (filter_var($age, FILTER_VALIDATE_INT, ["options" => ["min_range" => 17, "max_range" => 60]]) === false) {
    $errors[] = "Age must be a whole number from 17 to 60";
  }
  if (strlen($password) < 8) {
    $errors[] = "Password must be at least 8 characters";
  }
  if (count($errors) > 0) {
    echo '<ul id="errors">';
    foreach ($errors as $e) {
      echo "<li>$e</li>";
    }
    echo "</ul>";
  } else {
    echo '<p id="ok">Registered ' . htmlspecialchars($name) . '</p>';
  }
}
?>` }
    }
  });
})();

# PLAN-FINAL.md: extend ITCS333 Tutor for the final exam

**Final exam:** Sunday 27 Dec 2026, 08:30–10:30 (Bahrain).
**Course project due:** 10 Dec 2026. Keep the site work light that week.
**Grading weights:** Final 40% · Midterm 25% · Project 20% · Assignments 15%.

## 0. Scope

Source: the course specification (2026-27), section 26.

| Chapter | Topic | Taught (week) |
|---|---|---|
| Ch 10 | JavaScript 3: APIs, `fetch`, Promises, `async/await`, JSON | Wk 7 (25 Oct) |
| Ch 12 | Server-side development 1: PHP | Wk 8 (1 Nov) |
| Ch 14 | Working with databases: SQL, MySQL, **PDO**, (NoSQL: concept only) | Wk 9–10 |
| Ch 15 | Managing state: cookies, sessions, cache | Wk 10–11 |
| Ch 16 | Security: authentication, HTTPS, threats (XSS, SQL injection, session hijacking), best practices | Wk 11 (22 Nov) |
| Ch 1–2 | Intro, how the web works: HTTP, DNS, URL, client/server (not in the midterm) | Wk 1 |

**Excluded:** Ch 17 and Ch 18 (the spec says "not part of the exam material").

**Decided:** the final **is cumulative** (Nezar, 15 Nov 2026). The `final` track in `js/tracks.js` lists the midterm modules too, and offers the mock midterm next to the mock final.

**Node.js, React and Laravel** (weekly schedule, weeks 12–13, not in the chapter list): Nezar says *maybe*. Add them **after** step 6 as short lessons in their own module, every lesson titled "Bonus: may not be in the exam". Keep them out of the mock final.

**Regex** (`preg_match`) appears in the 2024-25 papers by this course's staff, so treat it as **in scope for PHP**. The JS regex lesson stays marked "Bonus".

## 1. What past papers ask (for exercise design)

These are Nezar's own notes. The papers themselves are in the private materials repo; do not copy them.

### Newest format (2024-25, closest to this instructor)
- **PHP:**
  - Define an array of associative arrays (books, cars or students with 3 keys).
  - `if` on one element (year > 2000, grade == "A").
  - `foreach` + `preg_match` to print the matching items (ends with a digit, starts with a letter, contains vowels).
- **PDO:**
  - `new PDO("mysql:host=…;dbname=…", $user, $pass)`.
  - `prepare("SELECT … WHERE email = :email")`, then `bindParam(':email', $_POST['email'])`, `execute()` and `fetch()` into `$user`.
  - Print `<div class="welcome">Welcome <?= $user['username'] ?>…</div>`.
- **CSS:** specificity and combinator puzzles. These already exist on the site.

### Recurring older patterns, marked line by line
1. **Checkbox arrays.** Inputs named `x[]` hold values like `price#weight`. Use `extract($_POST)`, `isset`, `foreach`, `explode('#', $v)`, keep a total, and show an error if nothing is selected.
2. **Cookies.** `setcookie('lastvisit', date(...), 3*7*24*60*60 + time())`, then show the last visit if `isset($_COOKIE[...])`.
3. **Session tables.** An associative array in `$_SESSION` rendered as an HTML table (nested `foreach`, counts, averages). Show a "session doesn't exist" message when missing.
4. **IP filter.** `explode('.', $_SERVER['REMOTE_ADDR'])`, then `die()` or `header('Location: …')`.
5. **Nested HTML lists** from `$arr[$country] = [capital, continent]`.
6. **PDO query to a table.** Wrap in `try/catch (PDOException)` with `require('connection.php')`, loop `fetch()`, colour rows or cells by condition, and draw star ratings with a `for` loop.
7. **PDO `exec`.** Insert or delete from session data and print the affected row count.
8. **Prepared statements + transactions.** `beginTransaction`, `prepare`, `execute([':x' => …])` in a loop, `commit`, and `rollBack` in `catch`.
9. **File upload.** `$_FILES['pic']['type'|'size'|'name'|'tmp_name']`, `file_exists`, `move_uploaded_file`, then INSERT.
10. **Grid view.** Two or three items per row, using a counter to close and reopen `</tr><tr>`.
11. **Short answers:**
    - Cookies vs sessions
    - GET vs POST
    - XSS
    - Session hijacking vs SQL injection
    - Preventing SQL injection (prepared statements)
    - Why use transactions (the money-transfer example)
    - AJAX/fetch: definition, advantages and disadvantages
    - The HTTP request/response anatomy
12. **MCQ favourites:**
    - `session.cookie_httponly`
    - `$_SERVER['REMOTE_ADDR']`
    - `trim`
    - `implode`
    - `global` and `$GLOBALS`
    - cookie expiry in seconds
    - "PDO supports many databases"
    - `$_FILES`
    - regex quantifiers `* + ? {m,n}`

## 2. Key technical decision: run PHP in the browser

Spike this first (step 1). Pick the option that meets all of the following:
- **Hosting:** works on GitHub Pages (static), lazy-loaded only on PHP pages, with a pinned version.
- **PDO:** supports **PDO with SQLite** (`new PDO('sqlite::memory:')`). Same API as MySQL for `prepare/bindParam/execute/fetch/exec/beginTransaction`.
  - Seed each exercise's tables from a small SQL script.
  - The lessons show the `mysql:` DSN as the exam form, and explain that the sandbox uses SQLite with the same PDO calls.
- **Simulated requests:** the runner can set `$_GET`, `$_POST`, `$_SERVER['REMOTE_ADDR']`, `$_COOKIE` and `$_FILES` before running, from a small "fake request" panel (a form preview, or key/value fields).
- **Multi-request state:**
  - Run the same script N times in sequence ("request 1, 2, 3").
  - Persist `$_SESSION` between runs: serialize it at the end, restore it at the start.
  - Persist cookies set with `setcookie()`: capture them, then feed them into `$_COOKIE` on the next run.
  - `header('Location: x')` and `die()` are shown as events in the output panel.
- **Output:** shows both the rendered HTML (in an iframe) and the raw text.

**Candidates:** WordPress Playground's `@php-wasm/web` (needs a bundler, so weigh that), or `php-wasm` by seanmorris (CDN ES module, has a PDO-SQLite build).

**Fallback** if neither works within one session: build the PHP lessons as **"predict the output"** and **"fill the missing line"** exercises with fixed expected outputs, and keep the runner for later.

### Decision (step 1, done): `php-wasm` by seanmorris

- **Runtime:** `php-wasm@0.2.0` + `php-wasm-sqlite@0.2.0` (PHP 8.4), imported as ES modules from jsDelivr with pinned versions. Nothing is downloaded until the first PHP run; `js/php-runner.js` itself is a small plain script. `@php-wasm/web` was rejected because it needs a bundler.
- **Not verified from the build sandbox:** the sandbox blocks jsDelivr, so the runner was tested against the same npm tarballs served locally. Open `#php-lab` on the live site once to confirm the CDN path.
- **`js/php-runner.js` (`PHPRUN`):**
  - `PHPRUN.send(code, req, visitor, {db, files, reseed})` runs one request. `req = {method, query, body, ip, cookies}`; `query` and `body` are url-encoded strings, parsed by PHP's own `parse_str`, so `x[]` arrays work.
  - `PHPRUN.play(code, requests, {db, files})` sends several requests as one new visitor (used for grading).
  - A result has `html`, `text`, `errors` (with line numbers), `setCookies`, `cookies`, `session`, `redirect`, `died`, `status`.
- **What is real and what is simulated:**
  - Real PHP: `$_GET/$_POST/$_COOKIE/$_SERVER`, `setcookie`, `header`, sessions (PHP's own session files, found again through the `PHPSESSID` cookie), PDO.
  - `new PDO("mysql:host=...;dbname=X", user, pass)` is routed to a SQLite file seeded from the exercise's `db: {name, user, pass, sql}`. A wrong database name or password throws a `PDOException` like MySQL would. Seed SQL must be SQLite-compatible.
  - `die()` / `exit` are rewritten to a sandbox function, so cookies and headers can still be reported.
  - Each request runs from scratch (`php.refresh()`), so nothing leaks between requests except cookies, sessions and the database.
- **Limits:** no real file uploads (`move_uploaded_file` cannot work, so pattern 9 is a read-the-code lesson); an infinite loop freezes the tab, like in the JS labs; SQL is SQLite's dialect.
- **UI:** `lab()` has a `php` mode: request bar (method, query string, POST body, IP), rendered page, raw HTML, and a log (errors, `Set-Cookie`, `Location`, `die`, the cookie jar, `$_SESSION`). Submitting a form inside the preview sends the next request.
- **Challenges:** `challenge: { mode: 'php', tabs: ['php'], requests: [...], db?, files?, checks: [{d, t(results, src)}] }`.

**Grading PHP challenges:** run the student's code with 2–3 fake requests. Each check reads the **output DOM** or text (for example "row for Nino is yellow", "total is 3.85", "says No Camera selected when nothing is ticked"). Same `checks[{d, t}]` idea as the JS challenges.

## 3. Steps (in order; commit after each)

0. **"Simpler explanation" toggle (شرح أبسط).**
   - A per-lesson switch that shows an extra `simpler` field (short, everyday analogies, the lecture-notes style).
   - Start with the 8 lessons in `content3.js`; then add it to the other 20.
   - It must be optional, with the default unchanged.
0b. **Study track selector: Midterm / Final / Full course.** Build this before adding any new module, because every later step depends on it.
   - **Why:** each semester the instructor may move topics between the midterm and the final. A student may also just want to study the whole course with no exam in mind. So the exam scope must be **data, not code**.
   - **New file `js/tracks.js`** (loaded right after `i18n.js`). It is the single place that says what belongs to each exam. Changing the scope next semester means editing only this file.
     ```js
     const TRACKS = {
       semester: '2026-27 Sem 1',
       list: [
         { id: 'mid',   label: {en:'Midterm', ar:'الميد'},
           examDate: '2026-11-12T15:00+03:00',
           scopeNote: {en:'Instructor: HTML + CSS + JS (till events)', ar:'...'},
           modules: ['html','forms','css','layout','js','dom','events'],
           exams: ['midterm'] },
         { id: 'final', label: {en:'Final', ar:'الفاينل'},
           examDate: '2026-12-27T08:30+03:00',
           scopeNote: {...},
           modules: ['async','php','db','state','security','web'],
           exams: ['final'] },
         { id: 'all',   label: {en:'Full course', ar:'المادة كاملة'},
           modules: '*', exams: '*' }
       ]
     };
     ```
     - Scope is defined **per module**. If a split ever falls inside a module, a track may also list `lessons: [...]` to add or exclude single lessons.
     - If the final turns out to be cumulative, the `final` track simply lists the midterm modules as well.
   - **Every lesson and question gets a `chapter` tag** (for example `'Ch 9'`), so tracks could also be defined by chapter later.
   - **UI:**
     - A segmented switch **Midterm | Final | Full course** in the top bar, next to the language switch. On phones it moves into the menu.
     - The choice is saved in localStorage as `wdl:track`.
     - The default is the track whose exam date is the nearest in the future; if none, **Full course**.
     - The "Full course" track shows no countdown and no exam framing: just all lessons in book chapter order.
   - **What the track filters:**
     - The Learn list and the lesson prev/next navigation.
     - The question bank and random questions.
     - The challenges list.
     - The mock exam list.
     - The home countdown, the hero chip and the scope note.
     - Progress bars, so progress is shown per track.
   - **Saved progress** is stored per lesson, not per track, so switching tracks never loses anything.
   - **Out-of-track lessons stay reachable** by direct link. They show a small banner: "Not in the Midterm scope: part of the Final".
   - **Guide page:** add a short "How to change the scope next semester" section (edit `js/tracks.js` only).
   - **Checks:** with each track selected, every route opens in both languages with no errors, and the counts of lessons, questions and challenges match `tracks.js`.
1. **PHP runner spike** (section 2). Make a hidden test page `#php-lab`, and record the decision in this file.
2. **Module 08, Ch 10 (APIs & async).**
   - Lessons: callbacks to Promises, `fetch` + `.then`, `async/await` + `try/catch`, JSON APIs, rendering fetched data into a table.
   - The sandbox has no network, so add a **mock fetch** in the runner prelude that serves fixed JSON for `/api/...` URLs, with an optional delay and error.
   - Challenges graded on the resulting DOM.
3. **Module 09, Ch 12 (PHP basics).**
   - Lessons:
     - syntax and `echo`
     - variables and types
     - strings and `.` concatenation
     - arrays (indexed and associative)
     - `foreach ($a as $k => $v)`
     - functions, `global` and `$GLOBALS`
     - `explode`, `implode`, `trim`, `count`, `substr`
     - `preg_match`
     - forms with `$_GET`, `$_POST`, `isset` and `extract`
     - checkbox arrays `x[]`
     - mixing PHP into HTML
     - `$_SERVER` (`REMOTE_ADDR`), `header`, `die`
   - Challenges follow patterns 1, 4 and 5 and the 2024-25 Q2.
4. **Module 10, Ch 14 (databases & PDO).**
   - Lessons: SQL `SELECT/INSERT/UPDATE/DELETE`, `WHERE`, `ORDER BY`; connecting with PDO and `ERRMODE_EXCEPTION`; `try/catch`; `query` + `fetch` loop; `exec` returning the row count; prepared statements with named parameters; `bindParam` vs `execute([...])`; transactions; NoSQL (concept only).
   - Challenges follow patterns 6, 7, 8 and 10 and the 2024-25 Q3.
5. **Module 11, Ch 15 (state).**
   - Lessons: why HTTP is stateless; cookies (`setcookie` with expiry in seconds, `$_COOKIE`, deleting); sessions (`session_start`, `$_SESSION`, `isset`, `unset`, `session_destroy`); cookies vs sessions; a short concept page on caching.
   - Challenges follow patterns 2 and 3, using the multi-request runner.
6. **Module 12, Ch 16 (security).**
   - Lessons: XSS and `htmlspecialchars`; SQL injection, shown with a vulnerable query vs a prepared statement, run in the SQLite sandbox only; session hijacking and the `session.cookie_httponly` / `secure` settings; password hashing (`password_hash` / `password_verify`); HTTPS concepts; input validation on the client vs the server.
   - Keep the demos defensive and inside the sandbox.
7. **Theory page, Ch 1–2.** (Done as module 00, two lessons: `web-basics`, `web-http`. The "read an HTTP request" exercise is the `web-http` challenge; the MCQs go into the step 8 bank.)
   - About 25 MCQs plus a "read an HTTP request" exercise: method, path, host, query string, Content-Type, Content-Length.
8. **Question bank + short answers.**
   - At least 25 MCQs per new module (Arabic too).
   - A new **short-answer** type: the student writes an answer, then compares it with a model answer and a checklist of key points to tick themselves.
9. **Mock Final.**
   - Same engine as the mock midterm (`exam.js`), with new parts: PHP arrays/regex, PDO prepared statement, session/cookie output, and short answers. Several scenarios each.
   - Marking is line by line with the same point style (1 pt per required line).
   - Run every model answer and confirm full marks.
10. **Home and navigation** (most of this is done in step 0b).
    - Final polish of the home page for each track.
    - Update the footer chapters.

## 4. Definition of done (each step)
- Lessons are in EN + AR, aligned, with no console errors in either language.
- Every challenge solution passes, and every mock-exam model answer gets full marks.
- Everything works on a phone-width screen (380px).
- One commit with a clear message; GitHub Pages updates.

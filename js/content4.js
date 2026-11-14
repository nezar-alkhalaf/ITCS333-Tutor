/* Module 08: APIs & async JavaScript (Ch 10). The sandbox has no internet: fetch('/api/...') is answered by the mock API in js/util.js. */
(() => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  /* wait until fn() is truthy (or time runs out); used by the async challenges */
  const until = async (fn, ms = 3000) => { const end = Date.now() + ms; while (Date.now() < end) { try { if (fn()) return true; } catch (e) { /* not yet */ } await sleep(50); } return false; };
  const API = `**The practice API.** This sandbox has no internet, so the lessons use a small pretend server. It answers after about 0.3 s:
- [[GET /api/students]] → a list of 4 students [[{id, name, major, gpa}]]; [[/api/students/2]] → one student (404 if the id does not exist).
- [[GET /api/courses]] → 3 courses [[{code, title, credits}]].
- [[GET /api/weather?city=Manama]] → [[{city, temp, sky}]].
- [[POST /api/students]] with a JSON body → 201 and the saved object with a new id.
- [[/api/error]] → status 500; [[/api/offline]] → the network fails. Add [[?delay=2000]] to any address to make it slower.`;

  LESSONS.push({
    id: 'async-promises', module: 'async', title: 'Synchronous vs asynchronous: callbacks and Promises',
    big: `Some jobs take time: asking a server for data, reading a file, waiting for a timer. If JavaScript stopped and waited, the whole page would freeze. Instead it **starts** the slow job, carries on with the next lines, and deals with the result **later**.

Chapter 10 builds up the tools for "later": first **callbacks**, then **Promises**, then (next lessons) **fetch** and **async/await**.`,
    simple: `**Synchronous** code runs line by line; each line waits for the one before it.
**Asynchronous** code starts something now and finishes it later, without blocking the lines after it.

[[setTimeout(fn, 1000)]] is the simplest async job: "run fn after 1 second". The lines after it run **first**.

**Callback**: a function you hand over so it can be called when the job is done. Many nested callbacks become hard to read ("callback hell").

**Promise**: an object that stands for a result that is not ready yet. It is in one of three states:
- **pending**: still working
- **fulfilled** (resolved): finished with a value
- **rejected**: failed with an error

You react to it with:
- [[.then(value => …)]] → runs when it is fulfilled
- [[.catch(error => …)]] → runs when it is rejected
- [[.finally(() => …)]] → runs in both cases`,
    simpler: `Ordering food at a restaurant.

- **Synchronous**: you stand at the kitchen door and do nothing until your plate is ready.
- **Asynchronous**: you order, sit down, chat, and the waiter brings the plate **when it is ready**.
- A **callback** is telling the waiter "call me when it's ready".
- A **Promise** is the receipt with your order number: right now it is *pending*; later it becomes *fulfilled* (your food) or *rejected* ("sorry, we ran out").
- [[.then]] is what you do when the food comes, [[.catch]] is what you do if it doesn't.`,
    deeper: [
      `Run this and look at the **order** of the lines in the console. The timer line comes last even though it is written second.`,
      { try: { mode: 'js', task: 'Change the delay to 0. Does "B" still come last? (Yes: a timer callback always waits until the current code has finished.)', js: `console.log('A: start');

setTimeout(function () {
  console.log('B: timer finished');
}, 1000);

console.log('C: end of the script');` } },
      `**Making a Promise.** [[new Promise((resolve, reject) => { … })]] gives you two functions: call [[resolve(value)]] for success or [[reject(error)]] for failure.`,
      { code: `function checkGrade(grade) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {            // pretend this takes time
      if (grade >= 60) resolve('Pass');
      else reject(new Error('Fail'));
    }, 500);
  });
}

checkGrade(75)
  .then(function (result) { console.log(result); })        // Pass
  .catch(function (error) { console.log(error.message); }) // (not reached)
  .finally(function () { console.log('done'); });`, lang: 'js' },
      { try: { mode: 'js', task: 'Run it, then change 75 to 40 and run again. Which function runs now?', js: `function checkGrade(grade) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (grade >= 60) resolve('Pass');
      else reject(new Error('Fail'));
    }, 500);
  });
}

const p = checkGrade(75);
console.log(p);   // the Promise itself, still pending

p.then(function (result) { console.log('then:', result); })
 .catch(function (error) { console.log('catch:', error.message); })
 .finally(function () { console.log('finally: always runs'); });` } },
      `**Chaining.** Whatever a [[.then]] callback returns is passed to the next [[.then]]. If it returns another Promise, the chain waits for it. One [[.catch]] at the end catches an error from **any** step above it. This flat chain replaces the "pyramid" of nested callbacks.`,
      { code: `// callbacks inside callbacks: hard to read
getUser(1, function (user) {
  getCourses(user, function (courses) {
    getGrades(courses, function (grades) {
      console.log(grades);
    });
  });
});

// the same steps as a Promise chain
getUser(1)
  .then(user => getCourses(user))
  .then(courses => getGrades(courses))
  .then(grades => console.log(grades))
  .catch(error => console.log(error.message));`, lang: 'js' }
    ],
    points: [
      'Async code starts a job now and handles the result later; the lines after it keep running.',
      'setTimeout callbacks always run after the current script has finished, even with a delay of 0.',
      'A Promise is pending, then either fulfilled (resolve) or rejected (reject). It cannot change again after that.',
      '[[.then]] gets the value, [[.catch]] gets the error, [[.finally]] runs in both cases.',
      'Return a value (or a Promise) from [[.then]] to pass it down the chain; one [[.catch]] at the end handles errors from every step.'
    ],
    exam: [
      'Short answer: explain synchronous vs asynchronous with an example such as [[setTimeout]] or [[fetch]].',
      'Output order questions: lines after a [[setTimeout]] print **before** its callback.',
      'Know the three Promise states and which method handles each.'
    ],
    mistakes: [
      { lang: 'js', wrong: `let result = checkGrade(75);
console.log(result);   // Promise {…}, not "Pass"`, right: `checkGrade(75).then(function (result) {
  console.log(result);   // Pass
});`, why: 'A Promise is not the value itself. Read the value inside .then (or with await, next lessons).' },
      { lang: 'js', wrong: `promise.then(function (x) {
  x * 2;          // nothing is returned
}).then(function (y) {
  console.log(y); // undefined
});`, right: `promise.then(function (x) {
  return x * 2;
}).then(function (y) {
  console.log(y);
});`, why: 'The next .then receives what the previous one returns. Without return it gets undefined.' },
      { lang: 'js', wrong: `setTimeout(showMessage(), 1000);`, right: `setTimeout(showMessage, 1000);`, why: 'Pass the function itself. showMessage() runs it immediately and passes its result instead.' }
    ],
    summary: [
      'Async = start now, finish later, do not block.',
      'Callback → Promise (pending, fulfilled, rejected).',
      '.then for success, .catch for errors, .finally always.'
    ],
    recall: [
      { q: 'What does this print?\n[[console.log(1); setTimeout(() => console.log(2), 0); console.log(3);]]', o: ['1 2 3', '1 3 2', '2 1 3', '3 2 1'], a: 1, why: 'The timer callback waits until the current script ends, so 3 prints before 2.' },
      { q: 'A Promise that failed is…', o: ['pending', 'fulfilled', 'rejected', 'resolved'], a: 2, why: 'reject() moves it to the rejected state; .catch handles it.' },
      { q: 'Which method runs whether the Promise succeeded or failed?', o: ['[[.then]]', '[[.catch]]', '[[.finally]]', '[[.done]]'], a: 2, why: '.finally runs in both cases.' },
      { q: 'Inside [[new Promise((resolve, reject) => {…})]], how do you report success with the value 5?', o: ['[[return 5;]]', '[[resolve(5);]]', '[[then(5);]]', '[[reject(5);]]'], a: 1, why: 'resolve(value) fulfils the Promise with that value.' }
    ],
    challenge: {
      task: `1. Write [[function checkGrade(grade)]] that **returns a Promise**. After 300 ms it resolves with [["Pass"]] when grade >= 60, otherwise it rejects with [[new Error("Fail")]].
2. Call [[checkGrade(75)]] and, in [[.then]], put the result into [[#out]].
3. Call [[checkGrade(40)]] and, in [[.catch]], put the error message into [[#err]].`,
      tabs: ['js'],
      starter: { html: `<p>Result: <span id="out"></span></p>
<p>Error: <span id="err"></span></p>`, js: `function checkGrade(grade) {
  // return a new Promise here
}
` },
      exports: ['checkGrade'],
      test: async (d, w) => {
        const r = {};
        await until(() => d.getElementById('out').textContent && d.getElementById('err').textContent, 2000);
        try { const p = w.__exp.checkGrade(70); r.isPromise = p instanceof w.Promise; r.pass = await p; } catch (e) { r.pass = 'rejected'; }
        try { await w.__exp.checkGrade(30); r.fail = 'resolved'; } catch (e) { r.fail = e && e.message; r.failIsError = e instanceof w.Error; }
        return r;
      },
      checks: [
        { d: 'checkGrade returns a Promise', t: (d, w, s, r) => r.isPromise === true },
        { d: 'checkGrade(70) resolves with "Pass"', t: (d, w, s, r) => r.pass === 'Pass' },
        { d: 'checkGrade(30) rejects with an Error whose message is "Fail"', t: (d, w, s, r) => r.fail === 'Fail' && r.failIsError },
        { d: '#out shows "Pass" (set inside .then)', t: (d, w, s) => d.getElementById('out').textContent.trim() === 'Pass' && /\.then\s*\(/.test(U.strip(s.js)) },
        { d: '#err shows "Fail" (set inside .catch)', t: (d, w, s) => d.getElementById('err').textContent.trim() === 'Fail' && /\.catch\s*\(/.test(U.strip(s.js)) }
      ],
      solution: { js: `function checkGrade(grade) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (grade >= 60) resolve('Pass');
      else reject(new Error('Fail'));
    }, 300);
  });
}

checkGrade(75).then(function (result) {
  document.getElementById('out').textContent = result;
});

checkGrade(40).catch(function (error) {
  document.getElementById('err').textContent = error.message;
});` }
    }
  });

  LESSONS.push({
    id: 'async-fetch', module: 'async', title: 'fetch and .then: getting JSON from an API',
    big: `An **API** (here, a web API) is a URL that returns **data** instead of a web page, usually as JSON. With [[fetch]], your JavaScript asks for that data in the background and updates part of the page, with no reload. This idea is called **AJAX** (Asynchronous JavaScript And XML; today the data is almost always JSON, not XML).

${API}`,
    simple: `[[fetch(url)]] sends an HTTP request and returns a **Promise** of a **Response**.

Reading the data takes **two** steps, both asynchronous:
1. [[fetch('/api/courses')]] → waits for the response to arrive → a Response object.
2. [[response.json()]] → reads the body and parses the JSON → your data (an array or an object).

So the usual pattern has two [[.then]]s and one [[.catch]]:
[[fetch(url).then(response => response.json()).then(data => { … use data … }).catch(error => { … })]]

Useful parts of the Response:
- [[response.status]] → the HTTP status code (200 OK, 404 Not Found, 500 Server Error)
- [[response.ok]] → [[true]] when the status is 200–299
- [[response.json()]] / [[response.text()]] → read the body as JSON / as plain text`,
    simpler: `fetch is ordering online.

1. [[fetch(url)]] places the order. What arrives first is the **parcel** (the Response): you can see the label (status 200 or 404) but not the item yet.
2. [[response.json()]] opens the parcel and takes the item out (your data).

That is why there are two [[.then]]s: one for the parcel arriving, one for opening it. [[.catch]] is for when the delivery fails completely.`,
    deeper: [
      { try: { mode: 'js', task: 'Run it. Then change the URL to [[/api/courses/ITCS214]] (one course, an object) and print [[data.title]].', js: `console.log('1. sending the request');

fetch('/api/courses')
  .then(function (response) {
    console.log('3. response arrived:', response.status, response.ok);
    return response.json();          // returns another Promise
  })
  .then(function (data) {
    console.log('4. data:', data);
    console.log('first course:', data[0].code, '-', data[0].title);
    console.log('number of courses:', data.length);
  })
  .catch(function (error) {
    console.log('failed:', error.message);
  });

console.log('2. this line does not wait for the server');` } },
      `**Putting the data on the page.** Fetched data is ordinary JavaScript: loop over the array and build elements, exactly like the DOM lessons.`,
      { try: { task: 'Change [[city=Manama]] to [[city=Riffa]]. Then try a city that does not exist and look at what [[data]] contains.', html: `<h2>Weather</h2>
<p id="weather">Loading…</p>`, js: `fetch('/api/weather?city=Manama')
  .then(response => response.json())
  .then(data => {
    document.getElementById('weather').textContent =
      data.city + ': ' + data.temp + '°C, ' + data.sky;
  })
  .catch(error => {
    document.getElementById('weather').textContent = 'Could not load the weather.';
  });` } },
      `**A 404 is not an error for fetch.** fetch only rejects when the request cannot be sent at all (no network, bad address). If the server answers with 404 or 500, the Promise still **fulfils**. Check [[response.ok]] yourself and [[throw]] to jump to [[.catch]].`,
      { code: `fetch('/api/students/99')
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);   // goes to .catch
    }
    return response.json();
  })
  .then(student => console.log(student.name))
  .catch(error => console.log('Problem:', error.message));   // Problem: HTTP 404`, lang: 'js' },
      { try: { mode: 'js', task: 'Try [[/api/students/2]], [[/api/students/99]], [[/api/error]] and [[/api/offline]]. Which ones reach .catch without the [[response.ok]] check?', js: `fetch('/api/students/99')
  .then(response => {
    console.log('status', response.status, 'ok', response.ok);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return response.json();
  })
  .then(student => console.log('name:', student.name))
  .catch(error => console.log('catch:', error.message));` } },
      `**AJAX: why and why not** (a common short answer)
- Advantages: only part of the page is updated, so it is faster and uses less data; the page stays usable while waiting; the browser and the server exchange only data (JSON).
- Disadvantages: the Back button and bookmarks may not reflect what the user sees; content loaded later is harder for search engines; it needs JavaScript; there is more code to handle loading and errors.`
    ],
    points: [
      'fetch(url) returns a Promise of a Response; response.json() returns a Promise of the data.',
      'Two .then steps: one for the response, one for the data. Return response.json() from the first.',
      'fetch rejects only on network failure. 404 and 500 still fulfil: check response.ok / response.status.',
      'JSON from an API becomes normal arrays and objects: loop and build DOM elements from them.',
      'AJAX = updating part of a page with data fetched in the background, without reloading.'
    ],
    exam: [
      'Short answer: define AJAX / fetch and give two advantages and two disadvantages.',
      'Code: complete a [[fetch(...).then(...).then(...)]] chain that shows data in an element.',
      'Know what [[response.ok]] and [[response.status]] mean.'
    ],
    mistakes: [
      { lang: 'js', wrong: `fetch('/api/courses')
  .then(response => {
    response.json();      // not returned
  })
  .then(data => console.log(data));   // undefined`, right: `fetch('/api/courses')
  .then(response => response.json())
  .then(data => console.log(data));`, why: 'The second .then only receives the data if the first one returns response.json().' },
      { lang: 'js', wrong: `const data = fetch('/api/courses');
console.log(data[0]);   // undefined: data is a Promise`, right: `fetch('/api/courses')
  .then(r => r.json())
  .then(data => console.log(data[0]));`, why: 'fetch does not return the data directly; it returns a Promise.' },
      { lang: 'js', wrong: `.then(response => response.JSON())`, right: `.then(response => response.json())`, why: 'The method is json() in lower case. JSON (upper case) is the global object with parse and stringify.' }
    ],
    summary: [
      'fetch → Response → response.json() → data.',
      'Check response.ok; fetch only rejects on network errors.',
      'AJAX updates part of the page without a reload.'
    ],
    recall: [
      { q: 'What does [[fetch(url)]] return?', o: ['The JSON data', 'A Promise of a Response', 'A string', 'An XMLHttpRequest'], a: 1, why: 'fetch is asynchronous: it returns a Promise that fulfils with a Response.' },
      { q: 'The server answers 404. What happens to the fetch Promise?', o: ['It is rejected', 'It is fulfilled; response.ok is false', 'It stays pending', 'The page reloads'], a: 1, why: 'fetch only rejects on network failure. Check response.ok.' },
      { q: 'Which line reads a JSON body?', o: ['[[JSON.parse(response)]]', '[[response.json()]]', '[[response.body.json]]', '[[response.data]]'], a: 1, why: 'response.json() reads and parses the body, and returns a Promise.' },
      { q: 'Which is a disadvantage of AJAX?', o: ['The whole page reloads', 'More data is sent', 'The Back button may not match what the user sees', 'It cannot use JSON'], a: 2, why: 'The URL and history do not change when part of the page is updated.' }
    ],
    challenge: {
      task: `Using [[fetch('/api/courses')]] and [[.then]]:
1. Read the JSON (an array of [[{code, title, credits}]]).
2. For each course, add an [[<li>]] to [[#list]] with the text [["CODE: Title"]], e.g. [["ITCS333: Internet Software Development"]].
3. Put the number of courses into [[#count]].
4. Add a [[.catch]] that writes [["Could not load"]] into [[#count]].`,
      tabs: ['js'],
      starter: { html: `<h2>Courses (<span id="count">…</span>)</h2>
<ul id="list"></ul>`, js: `fetch('/api/courses')
` },
      test: async (d) => { await until(() => d.querySelectorAll('#list li').length >= 3); await sleep(50); return {}; },
      checks: [
        { d: 'Uses [[fetch(\'/api/courses\')]] with [[.then]]', t: (d, w, s) => /fetch\s*\(\s*['"`]\/api\/courses['"`]/.test(U.strip(s.js)) && /\.then\s*\(/.test(U.strip(s.js)) && w.__apiLog.some(x => /\/api\/courses$/.test(x.url)) },
        { d: '#list has 3 <li> items', t: d => d.querySelectorAll('#list li').length === 3 },
        { d: 'The first item is "ITCS333: Internet Software Development"', t: d => (d.querySelector('#list li') || {}).textContent === 'ITCS333: Internet Software Development' },
        { d: 'The last item is "ITCS285: Database Management Systems"', t: d => { const l = d.querySelectorAll('#list li'); return l.length && l[l.length - 1].textContent === 'ITCS285: Database Management Systems'; } },
        { d: '#count shows 3', t: d => d.getElementById('count').textContent.trim() === '3' },
        { d: 'Has a .catch that writes "Could not load"', t: (d, w, s) => /\.catch\s*\(/.test(U.strip(s.js)) && /Could not load/.test(s.js) }
      ],
      solution: { js: `fetch('/api/courses')
  .then(function (response) {
    return response.json();
  })
  .then(function (courses) {
    const list = document.getElementById('list');
    for (const course of courses) {
      const li = document.createElement('li');
      li.textContent = course.code + ': ' + course.title;
      list.appendChild(li);
    }
    document.getElementById('count').textContent = courses.length;
  })
  .catch(function (error) {
    document.getElementById('count').textContent = 'Could not load';
  });` }
    }
  });

  LESSONS.push({
    id: 'async-await', module: 'async', title: 'async / await with try / catch',
    big: `[[async]] and [[await]] are a nicer way to write the same Promise code. The code **looks** synchronous (top to bottom, one line after the other) but it still does not freeze the page. Errors are handled with the familiar [[try / catch]] instead of [[.catch]].`,
    simple: `- Put [[async]] before a function: [[async function load() { … }]]. An async function **always returns a Promise**.
- Inside it, [[await]] pauses **that function** until a Promise settles, then gives you its value:
  [[const response = await fetch(url);]]
  [[const data = await response.json();]]
- If the awaited Promise is rejected, [[await]] **throws**. Catch it with [[try { … } catch (error) { … }]].
- [[await]] only works inside an [[async]] function (in normal scripts).

Same job, two styles:
- [[fetch(url).then(r => r.json()).then(data => show(data)).catch(e => …)]]
- [[try { const r = await fetch(url); const data = await r.json(); show(data); } catch (e) { … }]]`,
    simpler: `await is "wait here for this one thing, then carry on", like waiting for the kettle before pouring the tea.

- [[async]] on a function means "this function may wait for things".
- [[await]] waits only inside **that** function; the rest of the page keeps working.
- [[try]] is "try these steps", [[catch]] is "if any step breaks, do this instead".`,
    deeper: [
      { try: { mode: 'js', task: 'Run it. Then change the address to [[/api/students/99]], then to [[/api/offline]], and watch which message appears.', js: `async function loadStudent() {
  try {
    const response = await fetch('/api/students/2');
    if (!response.ok) {
      throw new Error('Not found (HTTP ' + response.status + ')');
    }
    const student = await response.json();
    console.log(student.name + ' studies ' + student.major);
  } catch (error) {
    console.log('Error:', error.message);
  } finally {
    console.log('finished');
  }
}

loadStudent();
console.log('this prints first: loadStudent is still waiting');` } },
      `**An async function returns a Promise.** Whatever you [[return]] inside it becomes the value of that Promise. So another async function can [[await]] it, and normal code can use [[.then]] on it.`,
      { code: `async function getStudent(id) {
  const response = await fetch('/api/students/' + id);
  if (!response.ok) throw new Error('Student not found');
  return await response.json();       // the value of the returned Promise
}

// from another async function
async function show() {
  try {
    const s = await getStudent(1);
    console.log(s.name);
  } catch (e) {
    console.log(e.message);
  }
}

// or with .then
getStudent(1).then(s => console.log(s.gpa));`, lang: 'js' },
      `**In an event listener.** The listener function itself can be async. Read the input, await the data, update the page.`,
      { try: { task: 'Type 1 to 4 and press Find. Then type 7. Why does the error message appear?', html: `<form id="findForm">
  <input id="sid" type="number" placeholder="Student id" required>
  <button type="submit">Find</button>
</form>
<p id="msg"></p>`, js: `document.getElementById('findForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const msg = document.getElementById('msg');
  const id = document.getElementById('sid').value;
  msg.textContent = 'Loading…';
  try {
    const response = await fetch('/api/students/' + id);
    if (!response.ok) throw new Error('No student with id ' + id);
    const s = await response.json();
    msg.textContent = s.name + ' (' + s.major + '), GPA ' + s.gpa;
  } catch (error) {
    msg.textContent = error.message;
  }
});` } },
      `**One after another, or at the same time?** Two [[await]]s in a row wait one after the other. To start several requests together and wait for all of them, use [[Promise.all([...])]].`,
      { code: `// one after the other (about 0.6 s with the practice API)
const a = await (await fetch('/api/students')).json();
const b = await (await fetch('/api/courses')).json();

// at the same time (about 0.3 s)
const [students, courses] = await Promise.all([
  fetch('/api/students').then(r => r.json()),
  fetch('/api/courses').then(r => r.json())
]);`, lang: 'js' }
    ],
    points: [
      'async before a function makes it return a Promise.',
      'await pauses only that async function until the Promise settles, then gives its value.',
      'A rejected Promise makes await throw: wrap the awaits in try / catch.',
      'Still check response.ok: a 404 does not throw by itself.',
      'await is allowed only inside async functions (in ordinary scripts).'
    ],
    exam: [
      'Rewrite a [[.then]] chain with [[async/await]] and [[try/catch]] (or the opposite).',
      'Explain what [[await]] does and why the page does not freeze.',
      'Spot the missing [[async]] keyword when a function uses [[await]].'
    ],
    mistakes: [
      { lang: 'js', wrong: `function load() {
  const r = await fetch('/api/courses');   // SyntaxError
}`, right: `async function load() {
  const r = await fetch('/api/courses');
}`, why: 'await can only be used inside a function marked async.' },
      { lang: 'js', wrong: `const r = await fetch(url);
const data = r.json();       // a Promise, not the data
console.log(data.length);`, right: `const r = await fetch(url);
const data = await r.json();
console.log(data.length);`, why: 'response.json() is also asynchronous, so it needs its own await.' },
      { lang: 'js', wrong: `async function load() {
  const r = await fetch('/api/offline');   // throws, nobody catches it
}`, right: `async function load() {
  try {
    const r = await fetch('/api/offline');
  } catch (e) {
    console.log('Network problem');
  }
}`, why: 'Without try / catch the error becomes an "Uncaught (in promise)" error.' }
    ],
    summary: [
      'async function → returns a Promise.',
      'await → wait for a Promise, get its value.',
      'try / catch handles rejected awaits; check response.ok.'
    ],
    recall: [
      { q: 'What does an [[async]] function always return?', o: ['undefined', 'A Promise', 'The awaited value', 'A Response'], a: 1, why: 'The returned value is wrapped in a Promise.' },
      { q: 'Where can you use [[await]] in a normal script?', o: ['Anywhere', 'Only inside an async function', 'Only inside .then', 'Only inside try'], a: 1, why: 'await needs an async function around it.' },
      { q: 'An awaited fetch fails because the network is down. What happens?', o: ['await returns null', 'await throws, so the catch block runs', 'The page reloads', 'Nothing'], a: 1, why: 'A rejected Promise makes await throw the error.' },
      { q: 'How do you start two fetches together and wait for both?', o: ['[[await fetch(a, b)]]', '[[Promise.all([fetch(a), fetch(b)])]]', '[[fetch(a).fetch(b)]]', '[[async(a, b)]]'], a: 1, why: 'Promise.all waits for every Promise in the array.' }
    ],
    challenge: {
      task: `1. Write [[async function loadStudent(id)]] that fetches [['/api/students/' + id]]. If [[response.ok]] is false, **throw** [[new Error("Student not found")]]. Otherwise return the parsed JSON.
2. When [[#findForm]] is submitted: stop the reload, then **await** [[loadStudent]] with the id from [[#sid]] inside [[try / catch]].
   - Success: [[#msg]] shows [["Name (Major)"]], e.g. [["Sara (CE)"]].
   - Error: [[#msg]] shows the error message.`,
      tabs: ['js'],
      starter: { html: `<form id="findForm">
  <input id="sid" type="number" required>
  <button type="submit">Find</button>
</form>
<p id="msg"></p>`, js: `async function loadStudent(id) {

}

document.getElementById('findForm').addEventListener('submit', async function (event) {

});
` },
      exports: ['loadStudent'],
      test: async (d, w) => {
        const r = {}, msg = () => d.getElementById('msg').textContent.trim();
        const ask = async id => { d.getElementById('msg').textContent = ''; d.getElementById('sid').value = id; d.getElementById('findForm').requestSubmit(); await until(() => msg() && !/loading/i.test(msg()), 2000); return msg(); };
        r.sub0 = w.__subs.length;
        r.two = await ask(2); r.nine = await ask(9);
        r.prevented = w.__subs.length > 0 && w.__subs.every(x => x);
        try { const p = w.__exp.loadStudent(4); r.isPromise = p instanceof w.Promise; r.four = (await p).name; } catch (e) { r.four = 'threw'; }
        try { await w.__exp.loadStudent(99); r.bad = 'no error'; } catch (e) { r.bad = e && e.message; }
        return r;
      },
      checks: [
        { d: 'loadStudent is async and returns the student (id 4 → Maryam)', t: (d, w, s, r) => r.isPromise && r.four === 'Maryam' },
        { d: 'loadStudent(99) throws "Student not found"', t: (d, w, s, r) => r.bad === 'Student not found' },
        { d: 'Uses await and try / catch', t: (d, w, s) => /\bawait\b/.test(U.strip(s.js)) && /\btry\s*\{/.test(U.strip(s.js)) && /\bcatch\s*\(/.test(U.strip(s.js)) },
        { d: 'Submitting id 2 shows "Sara (CE)"', t: (d, w, s, r) => r.two === 'Sara (CE)' },
        { d: 'Submitting id 9 shows "Student not found"', t: (d, w, s, r) => r.nine === 'Student not found' },
        { d: 'The form does not reload (preventDefault)', t: (d, w, s, r) => r.prevented }
      ],
      solution: { js: `async function loadStudent(id) {
  const response = await fetch('/api/students/' + id);
  if (!response.ok) {
    throw new Error('Student not found');
  }
  return await response.json();
}

document.getElementById('findForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const msg = document.getElementById('msg');
  try {
    const s = await loadStudent(document.getElementById('sid').value);
    msg.textContent = s.name + ' (' + s.major + ')';
  } catch (error) {
    msg.textContent = error.message;
  }
});` }
    }
  });

  LESSONS.push({
    id: 'async-post', module: 'async', title: 'Sending JSON: POST requests, headers and status codes',
    big: `Reading data is only half of an API. To **create** something on the server, the browser sends data in the request body, usually as JSON, with the [[POST]] method. fetch takes a second argument, an options object, for this.`,
    simple: `[[fetch(url, options)]]: the options object describes the request.
- [[method: 'POST']] → the HTTP method (GET is the default).
- [[headers: { 'Content-Type': 'application/json' }]] → tells the server the body is JSON.
- [[body: JSON.stringify(obj)]] → the data, turned into a JSON **string** (an object cannot be sent as it is).

The server answers with a status code. The ones to know:
- **200** OK · **201** Created (after a successful POST)
- **400** Bad Request (the data was wrong) · **401** Unauthorized · **403** Forbidden · **404** Not Found
- **500** Internal Server Error

Groups: 2xx success, 3xx redirect, 4xx the **client** made a mistake, 5xx the **server** failed.`,
    simpler: `POST is posting a letter.

- [[method: 'POST']] → "I am sending something", not just asking.
- [[headers]] → what you write on the envelope: "Content-Type: JSON" tells the post office what is inside.
- [[body]] → the letter itself. You must fold the object into text first with [[JSON.stringify]].
- The status code is the reply slip: 201 "received and saved", 400 "your letter was unreadable", 500 "our office is on fire".`,
    deeper: [
      { try: { mode: 'js', task: 'Run it. Then remove [[JSON.stringify]] (send the object itself) and see the 400 answer.', js: `const newStudent = { name: 'Nora', major: 'CS', gpa: 3.6 };

fetch('/api/students', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newStudent)
})
  .then(response => {
    console.log('status:', response.status);   // 201
    return response.json();
  })
  .then(saved => console.log('saved with id', saved.id, saved))
  .catch(error => console.log('Error:', error.message));` } },
      `**From a form to JSON.** Read the inputs, build an object, send it. The same pattern written with async/await:`,
      { try: { task: 'Fill the form and press Save. Look at the console for the request the browser sent.', html: `<form id="addForm">
  <input id="name" placeholder="Name" required>
  <select id="major"><option>CS</option><option>CE</option><option>IS</option></select>
  <input id="gpa" type="number" step="0.01" min="0" max="4" placeholder="GPA" required>
  <button type="submit">Save</button>
</form>
<p id="msg"></p>`, js: `document.getElementById('addForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const student = {
    name: document.getElementById('name').value.trim(),
    major: document.getElementById('major').value,
    gpa: parseFloat(document.getElementById('gpa').value)
  };
  try {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    if (response.status !== 201) throw new Error('Not saved (HTTP ' + response.status + ')');
    const saved = await response.json();
    document.getElementById('msg').textContent = 'Saved ' + saved.name + ' with id ' + saved.id;
  } catch (error) {
    document.getElementById('msg').textContent = error.message;
  }
});` } },
      `**GET vs POST** (asked in nearly every final)
- **GET** puts the data in the URL ([[?name=Ali&age=20]]): visible, bookmarkable, cached, limited length. Use it to **read**.
- **POST** puts the data in the request body: not shown in the URL, no practical size limit, not cached. Use it to **create or change** something, and for passwords. (POST alone is not encryption: only HTTPS protects the data on the way.)`
    ],
    points: [
      'fetch(url, { method, headers, body }) sends any HTTP request.',
      'Send JSON with body: JSON.stringify(obj) and the header Content-Type: application/json.',
      '201 Created is the usual answer to a successful POST; 400 means the data was wrong.',
      '2xx success, 3xx redirect, 4xx client error, 5xx server error.',
      'GET: data in the URL, for reading. POST: data in the body, for creating or changing.'
    ],
    exam: [
      'Short answer: GET vs POST (where the data goes, visibility, caching, size, when to use each).',
      'MCQ: match a status code to its meaning (200, 201, 301, 404, 500).',
      'Code: complete the options object of a POST fetch.'
    ],
    mistakes: [
      { lang: 'js', wrong: `fetch('/api/students', {
  method: 'POST',
  body: { name: 'Nora' }        // an object
});`, right: `fetch('/api/students', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Nora' })
});`, why: 'The body must be a string. JSON.stringify turns the object into JSON text.' },
      { lang: 'js', wrong: `fetch('/api/students', 'POST', data);`, right: `fetch('/api/students', { method: 'POST', body: data });`, why: 'fetch takes only two arguments: the URL and one options object.' }
    ],
    summary: [
      'POST + headers + JSON.stringify(body).',
      '201 Created, 400 Bad Request, 404 Not Found, 500 Server Error.',
      'GET reads (URL), POST writes (body).'
    ],
    recall: [
      { q: 'Which status code means "created" after a POST?', o: ['200', '201', '301', '404'], a: 1, why: '201 Created.' },
      { q: 'Which status group means the **client** sent a bad request?', o: ['2xx', '3xx', '4xx', '5xx'], a: 2, why: '4xx = client error; 5xx = server error.' },
      { q: 'How do you send the object [[s]] as JSON?', o: ['[[body: s]]', '[[body: JSON.parse(s)]]', '[[body: JSON.stringify(s)]]', '[[json: s]]'], a: 2, why: 'The body has to be a JSON string.' },
      { q: 'Where does a GET request carry its data?', o: ['In the body', 'In the URL query string', 'In a cookie only', 'In the status code'], a: 1, why: 'GET data is in the URL after ?.' }
    ],
    challenge: {
      task: `When the button [[#save]] is clicked, send this object to [[/api/students]] with **POST**:
[[{ name: "Nora", major: "CS", gpa: 3.6 }]]
- Use the header [['Content-Type': 'application/json']] and [[JSON.stringify]].
- If the status is 201, show [["Saved with id "]] + the id from the response in [[#msg]] (it will be 5).
- Otherwise show [["Error "]] + the status.`,
      tabs: ['js'],
      starter: { html: `<button id="save" type="button">Save Nora</button>
<p id="msg"></p>`, js: `document.getElementById('save').addEventListener('click', async function () {

});
` },
      test: async (d, w) => { d.getElementById('save').click(); await until(() => d.getElementById('msg').textContent.trim()); return { log: w.__apiLog.slice() }; },
      checks: [
        { d: 'A POST request is sent to /api/students', t: (d, w, s, r) => r.log.some(x => x.method === 'POST' && /\/api\/students$/.test(x.url)) },
        { d: 'The body is the JSON of {name: "Nora", major: "CS", gpa: 3.6}', t: (d, w, s, r) => r.log.some(x => { try { const o = JSON.parse(x.body); return o.name === 'Nora' && o.major === 'CS' && o.gpa === 3.6; } catch (e) { return false; } }) },
        { d: 'The Content-Type header is application/json', t: (d, w, s, r) => r.log.some(x => x.method === 'POST' && /application\/json/i.test(x.headers['content-type'] || '')) },
        { d: '#msg shows "Saved with id 5"', t: d => d.getElementById('msg').textContent.trim() === 'Saved with id 5' },
        { d: 'Checks the status (201) and has an "Error " message for other codes', t: (d, w, s) => /201/.test(U.strip(s.js)) && /['"]Error /.test(s.js) }
      ],
      solution: { js: `document.getElementById('save').addEventListener('click', async function () {
  const msg = document.getElementById('msg');
  const response = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Nora', major: 'CS', gpa: 3.6 })
  });
  if (response.status === 201) {
    const saved = await response.json();
    msg.textContent = 'Saved with id ' + saved.id;
  } else {
    msg.textContent = 'Error ' + response.status;
  }
});` }
    }
  });

  LESSONS.push({
    id: 'async-table', module: 'async', title: 'Rendering fetched data: building a table from an API',
    big: `The most common AJAX task, and a likely exam question: fetch a JSON array and turn it into table rows, with a "loading" message while waiting, an error message if it fails, and a style for rows that meet a condition. It joins this module with the DOM lessons (createElement, appendChild, classList).`,
    simple: `The recipe:
1. Show a status: [["Loading…"]].
2. [[await fetch(url)]], check [[response.ok]], [[await response.json()]] → an array.
3. Clear the old rows: [[tbody.innerHTML = ""]].
4. For each object: create a [[tr]], create one [[td]] per field, set [[textContent]], append the cells to the row and the row to the [[tbody]].
5. Conditional style: [[if (s.gpa < 2.5) tr.classList.add("low");]]
6. Update the status ([["Loaded 4 students"]]). In [[catch]], show an error instead.

Use [[textContent]] (not [[innerHTML]]) for data that comes from a server: it is shown as text, never run as HTML.`,
    simpler: `It is filling an attendance sheet from a list that arrives by phone.

While the call connects you write "Loading…". When the list arrives, you rub out the old sheet, then for every name you draw a new row and write each detail in its own box. If a student is in trouble (low GPA), you mark that row in red. If the call drops, you write "Could not load".`,
    deeper: [
      { try: { task: 'Run it. Then change the condition to [[s.major === "CS"]], and change the URL to [[/api/error]] to see the error path.', html: `<p id="status"></p>
<table border="1">
  <thead><tr><th>Name</th><th>Major</th><th>GPA</th></tr></thead>
  <tbody id="tbody"></tbody>
</table>`, css: `.low { background: #ffd6d6; }
td, th { padding: 4px 10px; }`, js: `async function loadTable() {
  const status = document.getElementById('status');
  const tbody = document.getElementById('tbody');
  status.textContent = 'Loading…';
  try {
    const response = await fetch('/api/students');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const students = await response.json();
    tbody.innerHTML = '';
    for (const s of students) {
      const tr = document.createElement('tr');
      for (const value of [s.name, s.major, s.gpa]) {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      }
      if (s.gpa < 2.5) tr.classList.add('low');
      tbody.appendChild(tr);
    }
    status.textContent = 'Loaded ' + students.length + ' students';
  } catch (error) {
    status.textContent = 'Could not load: ' + error.message;
  }
}

loadTable();` } },
      `**A "Refresh" button and a search box** reuse the same function: call it again from a click listener, or build the URL from an input ([['/api/students/' + id]]). Because the rows are cleared first, refreshing never duplicates them.`,
      `**Why textContent?** If a server sent the name [[<img src=x onerror=alert(1)>]], [[innerHTML]] would create that image and run its code. [[textContent]] shows the characters as plain text. This is the client-side half of the XSS lesson in Chapter 16.`
    ],
    points: [
      'Show a loading message, then replace it with a result or an error.',
      'Clear the tbody before adding rows, so a refresh does not duplicate them.',
      'Build rows with createElement + textContent + appendChild.',
      'Conditional styling: add a class in an if, and style the class in CSS.',
      'Prefer textContent for server data (safe against XSS).'
    ],
    exam: [
      'Code: fetch a JSON list and display it in a table, colouring rows by a condition.',
      'The same "render rows, colour by condition" pattern appears in PHP questions (PDO results), so learn it once.'
    ],
    mistakes: [
      { lang: 'js', wrong: `for (const s of students) {
  tbody.innerHTML += '<tr><td>' + s.name + '</td></tr>';
}`, right: `for (const s of students) {
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.textContent = s.name;
  tr.appendChild(td);
  tbody.appendChild(tr);
}`, why: 'innerHTML with server data can run injected HTML (XSS) and rebuilds the whole tbody each time.' },
      { lang: 'js', wrong: `const students = await response.json();
students.forEach(s => {
  const tr = document.createElement('tr');
  tr.textContent = s.name;   // no cells
  tbody.appendChild(tr);
});`, right: `students.forEach(s => {
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.textContent = s.name;
  tr.appendChild(td);
  tbody.appendChild(tr);
});`, why: 'Text belongs in td cells; a tr should only contain td or th elements.' }
    ],
    summary: [
      'Loading → fetch → json → clear → rows → status.',
      'Conditional rows with classList.add.',
      'textContent for data from a server.'
    ],
    recall: [
      { q: 'Why clear the tbody before adding the fetched rows?', o: ['It is faster', 'So a second load does not duplicate the rows', 'fetch requires it', 'To remove the thead'], a: 1, why: 'Every load adds rows; clearing first keeps one copy.' },
      { q: 'Which is safest for showing a name that came from a server?', o: ['[[td.innerHTML = name]]', '[[td.textContent = name]]', '[[document.write(name)]]', '[[td.outerHTML = name]]'], a: 1, why: 'textContent never interprets the text as HTML.' },
      { q: 'How do you mark rows with a GPA below 2.5?', o: ['[[tr.class = "low"]]', '[[tr.classList.add("low")]]', '[[tr.style = low]]', '[[tr.addClass("low")]]'], a: 1, why: 'classList.add adds a class; the CSS rule for .low does the styling.' }
    ],
    challenge: {
      task: `Write [[async function loadStudents()]] and call it once:
1. Put [["Loading…"]] in [[#status]].
2. Fetch [[/api/students]] and read the JSON.
3. For each student, add a row to [[#tbody]] with three cells: name, major, gpa.
4. Add the class [[low]] to rows where gpa is **below 2.5**.
5. Then set [[#status]] to [["Loaded 4 students"]] (use the array length).
6. If anything fails, set [[#status]] to [["Could not load"]].`,
      tabs: ['js'],
      starter: { html: `<p id="status"></p>
<table border="1">
  <thead><tr><th>Name</th><th>Major</th><th>GPA</th></tr></thead>
  <tbody id="tbody"></tbody>
</table>`, css: `.low { background: #ffd6d6; }`, js: `async function loadStudents() {

}

loadStudents();
` },
      test: async (d) => { const r = { first: d.getElementById('status').textContent.trim() }; await until(() => /Loaded/.test(d.getElementById('status').textContent)); return r; },
      checks: [
        { d: '#status shows "Loading…" while waiting', t: (d, w, s, r) => /^Loading/.test(r.first) },
        { d: '#tbody has 4 rows with 3 cells each', t: d => { const rows = d.querySelectorAll('#tbody tr'); return rows.length === 4 && [...rows].every(x => x.querySelectorAll('td').length === 3); } },
        { d: 'The second row is Sara | CE | 3.9', t: d => { const r = d.querySelectorAll('#tbody tr')[1]; return r && [...r.cells].map(c => c.textContent.trim()).join('|') === 'Sara|CE|3.9'; } },
        { d: 'Only Hassan\'s row (GPA 2.1) has the class "low"', t: d => { const rows = [...d.querySelectorAll('#tbody tr')]; return rows.length === 4 && rows.map(x => x.classList.contains('low')).join() === 'false,false,true,false'; } },
        { d: '#status shows "Loaded 4 students"', t: d => d.getElementById('status').textContent.trim() === 'Loaded 4 students' },
        { d: 'Has a try / catch (or .catch) that writes "Could not load"', t: (d, w, s) => /(\bcatch\s*\()/.test(U.strip(s.js)) && /Could not load/.test(s.js) }
      ],
      solution: { js: `async function loadStudents() {
  const status = document.getElementById('status');
  const tbody = document.getElementById('tbody');
  status.textContent = 'Loading…';
  try {
    const response = await fetch('/api/students');
    const students = await response.json();
    tbody.innerHTML = '';
    for (const s of students) {
      const tr = document.createElement('tr');
      for (const value of [s.name, s.major, s.gpa]) {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      }
      if (s.gpa < 2.5) {
        tr.classList.add('low');
      }
      tbody.appendChild(tr);
    }
    status.textContent = 'Loaded ' + students.length + ' students';
  } catch (error) {
    status.textContent = 'Could not load';
  }
}

loadStudents();` }
    }
  });
})();

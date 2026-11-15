/* Module 13: Bonus (weeks 12–13 of the schedule: Node.js, React, Laravel). Not in the official chapter list,
   so every lesson is labelled "Bonus: may not be in the exam". Concept lessons: code to read, no challenge. */
(() => {
  const R = String.raw;
  const NOTE = R`**Bonus: may not be in the exam.** This topic is in the weekly schedule but not in the chapter list of the course specification. Learn the main ideas; do not spend exam-week time here before the core chapters.`;

  LESSONS.push({
    id: 'bonus-node', module: 'bonus', title: 'Bonus: Node.js and Express (JavaScript on the server)',
    big: R`${NOTE}

Until now JavaScript ran in the browser and PHP ran on the server. **Node.js** runs JavaScript **on the server** too. It uses Chrome's V8 engine plus modules for files, networking and more, and it is the base of many modern back ends and tools (including npm, the package manager).`,
    simple: R`- **Node.js** = a JavaScript runtime outside the browser. No [[document]] or [[window]]; instead modules such as [[fs]] (files) and [[http]] (servers).
- **Event-driven, non-blocking**: one Node process runs an **event loop**. Slow work (reading a file, a database query) is started and handled later by a callback or Promise, so one process can serve many requests at the same time. Compare PHP, where each request runs your script from the top in its own worker.
- **npm** installs packages listed in [[package.json]]: [[npm install express]].
- **Express** is a small web framework: you register **routes** (method + path) and send responses.
- Run a program with [[node server.js]]; the server keeps running and listening on a port.`,
    simpler: R`PHP is a **restaurant where each order gets its own cook** who reads the recipe from the top and leaves when the plate is done.

Node.js is **one very fast waiter** who takes an order, hands it to the kitchen, takes the next order while the first one cooks, and serves each plate as soon as it is ready. Same language you already know, JavaScript, now on the server.`,
    deeper: [
      R`**A tiny API with Express.** The same JSON API that the async lessons used could be written like this:`,
      { code: R`// server.js   (run: npm install express, then node server.js)
const express = require('express');
const app = express();
app.use(express.json());                       // read JSON request bodies

const students = [{ id: 1, name: 'Ali', gpa: 3.4 }, { id: 2, name: 'Sara', gpa: 3.9 }];

app.get('/api/students', (req, res) => {
  res.json(students);                          // 200 + JSON
});

app.get('/api/students/:id', (req, res) => {
  const s = students.find(x => x.id === Number(req.params.id));
  if (!s) return res.status(404).json({ error: 'Not found' });
  res.json(s);
});

app.post('/api/students', (req, res) => {
  const s = { id: students.length + 1, ...req.body };
  students.push(s);
  res.status(201).json(s);                     // 201 Created
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));`, lang: 'js' },
      R`**PHP vs Node.js, in one table of ideas**
- Language: PHP vs JavaScript (same language on both sides with Node).
- Model: a script per request (PHP) vs one long-running process with an event loop (Node).
- Routing: the file path decides the page in plain PHP ([[/login.php]]); in Express you declare routes in code.
- Request data: [[$_GET]] / [[$_POST]] vs [[req.query]] / [[req.body]]; URL parameters with [[req.params]].
- Response: [[echo]] and [[header()]] vs [[res.send()]], [[res.json()]], [[res.status()]].`
    ],
    points: [
      'Node.js runs JavaScript on the server (V8 engine), with no DOM.',
      'Event loop + non-blocking I/O: one process serves many requests.',
      'npm installs packages listed in package.json.',
      'Express routes: app.get / app.post(path, (req, res) => …).',
      'req.params, req.query, req.body; res.json, res.status.'
    ],
    exam: [
      'Bonus: may not be in the exam. If asked, expect a concept MCQ: what Node.js is, or what non-blocking means.'
    ],
    mistakes: [
      { lang: 'js', wrong: R`// in server.js
document.getElementById('x');`, right: R`// server code has no page; it sends responses
res.send('<h1>Hello</h1>');`, why: 'Node.js has no DOM. document and window exist only in the browser.' }
    ],
    summary: [
      'JavaScript on the server.',
      'Event loop, non-blocking.',
      'Express: routes → res.json.'
    ],
    recall: [
      { q: 'What is Node.js?', o: ['A browser', 'A JavaScript runtime that runs outside the browser', 'A CSS framework', 'A database'], a: 1, why: 'It runs JavaScript on servers and computers, built on V8.' },
      { q: 'What does "non-blocking" mean in Node.js?', o: ['It never has errors', 'Slow tasks are started and finished later, so other requests are served meanwhile', 'It blocks all other users', 'It cannot read files'], a: 1, why: 'The event loop keeps serving while I/O is in progress.' },
      { q: R`In Express, where is the value of [[:id]] in [[/api/students/:id]]?`, o: [R`[[req.query.id]]`, R`[[req.params.id]]`, R`[[req.body.id]]`, R`[[$_GET["id"]]]`], a: 1, why: 'Route parameters are in req.params.' }
    ]
  });

  LESSONS.push({
    id: 'bonus-react', module: 'bonus', title: 'Bonus: React (components, props and state)',
    big: R`${NOTE}

In the DOM lessons you changed the page by hand: find an element, create rows, update text. **React** (a JavaScript library) lets you **describe** what the page should look like for the current data, and it updates the DOM for you whenever the data changes.`,
    simple: R`- A **component** is a function that returns what to show, written in **JSX** (HTML-like syntax inside JavaScript): [[function Hello() { return <h1>Hello</h1>; }]]
- **Props** are inputs passed to a component like attributes: [[<Greeting name="Sara" />]] → [[props.name]].
- **State** is data that belongs to a component and can change: [[const [count, setCount] = useState(0);]]. Calling [[setCount(…)]] makes React **re-render** the component.
- React compares the new output with the old one (the **virtual DOM**) and changes only the parts of the real DOM that differ.
- Lists: [[items.map(i => <li key={i.id}>{i.name}</li>)]]; each item needs a unique [[key]].
- Events: [[<button onClick={() => setCount(count + 1)}>]] (camelCase, and a function, not a string).
- Loading data: [[useEffect(() => { fetch(…) … }, [])]] runs after the first render.
- JSX escapes values in [[{ }]] by default, which protects against XSS.`,
    simpler: R`With plain DOM code you are a **painter** who repaints parts of the wall by hand every time something changes.

With React you write a **recipe** for the wall ("for this data, the wall looks like this"). When the data changes, React compares the new picture with the old one and repaints only the bricks that changed.`,
    deeper: [
      R`**A counter and a list.** Read it next to the DOM version you already know: there is no getElementById and no appendChild.`,
      { code: R`import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}

function StudentList() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetch('/api/students').then(r => r.json()).then(data => setStudents(data));
  }, []);                                   // [] = run once, after the first render
  return (
    <ul>
      {students.map(s => <li key={s.id}>{s.name} ({s.gpa})</li>)}
    </ul>
  );
}

function App() {
  return <><Counter /><StudentList /></>;
}`, lang: 'js' },
      R`**Why it is popular**: the UI is split into small reusable components; the page always matches the data (no forgotten updates); and the same ideas work for mobile apps (React Native). The cost: a build step (JSX must be compiled) and more to learn than plain DOM code.`
    ],
    points: [
      'React builds UIs from components (functions that return JSX).',
      'Props: inputs from the parent; state: data owned by the component (useState).',
      'Changing state re-renders; React updates only what changed (virtual DOM).',
      'List items need a unique key; events use camelCase (onClick).',
      'useEffect runs side effects such as fetch after rendering.'
    ],
    exam: [
      'Bonus: may not be in the exam. If asked, expect concepts: component, props vs state, virtual DOM.'
    ],
    mistakes: [
      { lang: 'js', wrong: R`let count = 0;
<button onClick={() => count++}>…</button>   // the page never updates`, right: R`const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>…</button>`, why: 'Only state changes through the setter make React re-render.' },
      { lang: 'js', wrong: R`<button onclick="add()">Add</button>`, right: R`<button onClick={add}>Add</button>`, why: 'In JSX, events are camelCase and receive a function, not a string.' }
    ],
    summary: [
      'Components + JSX.',
      'Props in, state inside.',
      'setState → re-render → minimal DOM changes.'
    ],
    recall: [
      { q: 'What is the difference between props and state?', o: ['There is none', 'Props come from the parent; state is owned and changed by the component', 'State comes from the server; props from CSS', 'Props can change; state cannot'], a: 1, why: 'A component reads props and manages its own state.' },
      { q: R`What happens after [[setCount(5)]]?`, o: ['Nothing until reload', 'React re-renders the component with the new value', 'The page reloads', 'An error'], a: 1, why: 'Updating state triggers a re-render.' },
      { q: 'Why does each list item need a key?', o: ['For CSS', 'So React can tell items apart when the list changes', 'For SEO', 'It does not'], a: 1, why: 'Keys let React match old and new items efficiently.' }
    ]
  });

  LESSONS.push({
    id: 'bonus-laravel', module: 'bonus', title: 'Bonus: Laravel (a PHP framework, MVC)',
    big: R`${NOTE}

Everything in the PHP chapters (forms, PDO, sessions, security) can be done by hand. A **framework** gives you a ready structure and safe defaults for all of it. **Laravel** is the most popular PHP framework, built around the **MVC** pattern.`,
    simple: R`**MVC** splits an application into three parts:
- **Model**: the data and its rules (a class per table). Laravel's **Eloquent** models: [[Student::where('major', 'CS')->get()]] instead of writing SQL.
- **View**: the HTML templates. Laravel's **Blade**: [[{{ $student->name }}]] prints a value **escaped** (protects against XSS).
- **Controller**: receives the request, uses models, and returns a view or JSON.

**Routes** (in [[routes/web.php]]) connect URLs to controllers: [[Route::get('/students', [StudentController::class, 'index']);]]

Other parts you will hear about:
- **Artisan**: the command-line tool ([[php artisan make:controller]], [[php artisan migrate]]).
- **Migrations**: table definitions written in PHP and versioned with the code.
- Security built in: query bindings (no SQL injection), escaped Blade output, **CSRF** tokens in forms ([[@csrf]]), password hashing, sessions.`,
    simpler: R`Plain PHP is **building a house with raw bricks**: you lay every wall and wire yourself.

Laravel is a **house kit**: the rooms (Models, Views, Controllers) are already marked out, the plumbing (routing, database, sessions) and the locks (CSRF, escaping, password hashing) come fitted, and you furnish the rooms with your own features.`,
    deeper: [
      R`**One feature through MVC**: list the CS students.`,
      { code: R`// routes/web.php
Route::get('/students', [StudentController::class, 'index']);

// app/Http/Controllers/StudentController.php
class StudentController extends Controller {
    public function index() {
        $students = Student::where('major', 'CS')->orderBy('gpa', 'desc')->get();   // Model (Eloquent)
        return view('students.index', ['students' => $students]);                    // View
    }
}

// resources/views/students/index.blade.php
<ul>
  @foreach ($students as $s)
    <li>{{ $s->name }}: {{ $s->gpa }}</li>      {{-- {{ }} escapes, like htmlspecialchars --}}
  @endforeach
</ul>

<form method="POST" action="/students">
  @csrf                                          {{-- hidden token against CSRF --}}
  <input name="name"> <button>Add</button>
</form>`, lang: 'php' },
      R`**Plain PHP vs Laravel**: the same ideas you learned (routes = which code runs for a URL, prepared statements, escaping, sessions, password_hash) are still there, only wrapped in conventions. Knowing the plain PHP version is what lets you understand what the framework does for you.`
    ],
    points: [
      'Laravel is a PHP framework based on MVC.',
      'Model (Eloquent) = data; View (Blade) = HTML; Controller = request logic.',
      'Routes map URLs to controller methods.',
      'Blade {{ }} escapes output; @csrf adds a CSRF token; Eloquent uses bindings.',
      'Artisan CLI and migrations manage code and database structure.'
    ],
    exam: [
      'Bonus: may not be in the exam. If asked, expect concepts: what MVC means, or what a framework gives you.'
    ],
    mistakes: [
      { lang: 'php', wrong: R`{!! $comment !!}      {{-- prints raw HTML --}}`, right: R`{{ $comment }}        {{-- escaped --}}`, why: 'The {!! !!} form skips escaping and brings XSS back.' }
    ],
    summary: [
      'Framework = structure + safe defaults.',
      'MVC: Model, View, Controller.',
      'Routes, Eloquent, Blade, Artisan.'
    ],
    recall: [
      { q: 'In MVC, which part holds the HTML templates?', o: ['Model', 'View', 'Controller', 'Route'], a: 1, why: 'Views (Blade in Laravel) produce the HTML.' },
      { q: R`What does Blade's [[{{ $name }}]] do with HTML in $name?`, o: ['Runs it', 'Escapes it', 'Deletes it', 'Saves it'], a: 1, why: 'Double curly braces escape output, like htmlspecialchars.' },
      { q: 'Which part of an MVC app receives the request and chooses what to return?', o: ['Model', 'View', 'Controller', 'Migration'], a: 2, why: 'The controller coordinates models and views.' }
    ]
  });
})();

# ITCS333 Tutor

An interactive study site for **ITCS333 Internet Software Development** at the University of Bahrain.

You learn by writing code. Every lesson has a live editor, and every challenge is checked automatically.

**Live site:** `https://<your-username>.github.io/itcs333-tutor/` (after GitHub Pages is enabled)

## What's inside
- **62 lessons in 14 modules**, each in 8 steps: Big Picture, Simple Explanation (with an optional "simpler explanation"), Deeper Understanding, Important Points, Exam Focus, Common Mistakes, Mini Summary and Active Recall.
- **Study tracks:** Midterm, Final (cumulative) or Full course. The switch at the top filters lessons, questions, challenges and mock exams. The scope lives in one file, `js/tracks.js`.
- **Midterm part:** HTML, CSS and JavaScript up to events (Ch 3, 4, 5, 7, 8 and 9).
- **Final part:** how the web works (Ch 1–2), APIs and async JavaScript (Ch 10), PHP (Ch 12), databases with PDO (Ch 14), cookies and sessions (Ch 15) and security (Ch 16), plus bonus lessons on Node.js, React and Laravel.
- **Real PHP in the browser:** PHP 8.4 with PDO runs inside the page (lazy-loaded). Labs send fake requests with GET/POST data, cookies, sessions, the visitor's IP and file uploads; the exam's `new PDO("mysql:...")` works against a practice database.
- **Coding challenges** checked automatically, with hints, an "add this line" helper and model answers.
- **Practice:**
  - 254-question bank (English and Arabic)
  - Short-answer questions with model answers and key-point checklists
  - CSS specificity puzzles
  - Random exam questions
  - A free playground
- **Mock exams:** a mock midterm in the format of the 2025-26 paper, and a mock final (PHP arrays and regex, PDO, cookies and sessions, short answers), both marked line by line.
- **Language:** English or Arabic (Gulf), with technical terms kept in English.
- **Theme:** light or dark.

Progress is saved in your own browser only (localStorage). Nothing is sent anywhere.

## Run it locally
It is a static site with no build step:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Project layout
| Path | What |
|---|---|
| `index.html` | Page shell and script order |
| `css/app.css` | Design (light/dark, RTL) |
| `js/util.js` | Markdown-lite, syntax highlight, editor, sandboxed runner |
| `js/i18n.js` | UI strings (en/ar) and the merge of Arabic content |
| `js/content*.js` | Lessons (English) |
| `js/content-ar*.js` | Lessons (Arabic) |
| `js/questions*.js` | Question bank and specificity puzzles |
| `js/tracks.js` | Midterm / Final / Full course scope (the only place to change it) |
| `js/php-runner.js` | PHP in the browser (php-wasm, pinned and lazy-loaded) |
| `js/exam.js`, `js/exam-final.js` | Mock midterm and mock final: scenarios, model answers and marking |
| `js/shortanswers.js` | Short-answer questions |
| `js/app.js` | Views, routing, quiz, challenges and lesson layout |

## Sources
Based on Connolly & Hoar, *Fundamentals of Web Development*, 3rd ed., and on the course lecture notes. All explanations, examples and questions are original.

This is an unofficial study aid made by a student, not by the course staff.

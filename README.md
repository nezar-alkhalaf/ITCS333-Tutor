# ITCS333 Tutor

An interactive study site for **ITCS333 Internet Software Development** at the University of Bahrain.

You learn by writing code. Every lesson has a live editor, and every challenge is checked automatically.

**Live site:** `https://<your-username>.github.io/itcs333-tutor/` (after GitHub Pages is enabled)

## What's inside
- **28 lessons in 8 steps each:** Big Picture, Simple Explanation, Deeper Understanding, Important Points, Exam Focus, Common Mistakes, Mini Summary and Active Recall.
- **Midterm material:** HTML, CSS and JavaScript up to events (Ch 3, 4, 5, 7, 8 and 9).
- **Coding challenges** with hints, an "add this line" helper and model answers.
- **Practice:**
  - 99-question bank
  - CSS specificity puzzles
  - Exam-style questions
  - A free playground
- **Mock exam** in the format of the 2025-26 midterm, marked line by line.
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
| `js/exam.js` | Mock exam scenarios, model answers and marking |
| `js/app.js` | Views, routing, quiz, challenges and lesson layout |

## Sources
Based on Connolly & Hoar, *Fundamentals of Web Development*, 3rd ed., and on the course lecture notes. All explanations, examples and questions are original.

This is an unofficial study aid made by a student, not by the course staff.

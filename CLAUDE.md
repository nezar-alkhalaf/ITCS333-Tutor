# CLAUDE.md: ITCS333 Tutor

Read this file first, then `PLAN-FINAL.md` (the current work plan).

## What this is
A public, static study site for **ITCS333 Internet Software Development** (University of Bahrain, Dr. Abdulla Subah, textbook Connolly & Hoar, *Fundamentals of Web Development* 3rd ed.).

The owner is Nezar, a CS student. Classmates use the site too, so content must be correct and must follow the course exactly.

It is hosted on **GitHub Pages** from the `main` branch root. There is no server, no build step, and no framework.

## Hard rules
1. **Stay inside the official scope.** The midterm part covers HTML + CSS + JS up to events and is finished. The final part covers the chapters listed in `PLAN-FINAL.md`. Do not add topics outside the course spec. If something is uncertain, label it "Bonus: may not be in the exam".
   - The split between exams can change each semester. `js/tracks.js` is the **only** place that decides which modules belong to the Midterm, the Final or the Full course. Never hard-code exam scope anywhere else.
2. **Every model answer must be run and must pass its own checks before you commit.** Never write a check by reasoning only; run it.
3. **Never commit course material.** Slides, lecture notes and past exam papers are copyrighted.
   - They live in the separate **private** repo `itcs333-materials`, or in `private/`, which is git-ignored.
   - Use them as reference only.
   - All lesson text, examples and questions in this repo must be original wording.
4. **Bilingual.** Every new lesson or question needs an Arabic version:
   - Gulf Arabic, with technical terms kept in English.
   - Code is never translated.
   - The Arabic must stay aligned item by item with the English (see "Content schema").
5. **Keep it static.** Plain `<script>` files loaded in order from `index.html`, with no bundler.
   - A large runtime (for example php-wasm) must be **lazy-loaded** only on pages that need it.
   - Pin the CDN versions of any such runtime.
6. **Don't break saved progress.**
   - localStorage keys are prefixed `wdl:` (historic name). Keep that prefix.
   - Never rename existing lesson ids.
7. **Commits:** one per finished step, with a clear message. Run the checks below first.

## Architecture (vanilla JS)
| File | Role |
|---|---|
| `index.html` | Shell. Script order matters: util, i18n, tracks, content*, content-ar*, questions*, exam, app |
| `css/app.css` | Design tokens (cobalt accent `#2346D8`), light/dark, RTL, lesson grid with resizable sidebar |
| `js/util.js` | `U.md` (paragraphs, `- ` / `1. ` lists, `[[inline code]]`, `**bold**`), `U.hl` highlight, `U.codeBlock`, `U.editor` (textarea over highlighted pre), `U.run` (sandboxed iframe via srcdoc), `U.hiddenFrame`, `U.store` (localStorage) |
| `js/i18n.js` | UI strings `S.en` / `S.ar`, `I18N.t()`, `I18N.lesson(L)` merges `LESSONS_AR`, `I18N.question(q,i)` merges `QUESTIONS_AR` |
| `js/tracks.js` | `TRACKS`: the Midterm / Final / Full course scope (modules, exam dates, mock exams) and its helpers. `app.js` reads the scope only through `scope()` and `TRACKS.has*` |
| `js/content.js`, `content2.js` | `MODULES`, `STEP_NAMES`, and the first 20 lessons |
| `js/content3.js` | 8 lessons from the lecture notes, spliced into `LESSONS` after given ids |
| `js/content-ar*.js` | `LESSONS_AR[id]` |
| `js/content-simpler.js` | `SIMPLER[id] = {en, ar}` for the first 28 lessons; newer lessons carry `simpler` in the lesson itself |
| `js/questions.js` (+ `questions-ar.js`) | `QUESTIONS` and `PUZZLES`, aligned 1:1 with `QUESTIONS_AR` |
| `js/questions2.js` | Extra questions, each carrying its own `ar` field |
| `js/exam.js` | `SCENARIOS` and `EXAM.PARTS` (spec, model, grade) for the mock midterm |
| `js/php-runner.js` | `PHPRUN`: PHP 8.4 in the browser (php-wasm + PDO SQLite, lazy, pinned). Fake requests, cookies, sessions, `mysql:` DSN mapped to SQLite. See the decision in `PLAN-FINAL.md` section 2 |
| `js/app.js` | Hash router (`#home`, `#learn`, `#lesson-<id>`, `#practice*`, `#exam`, `#guide`, hidden `#php-lab`) and views: `lab()` (web, js and php modes), `quiz()`, `helpPanel()`, `challenge()` |

### Content schema (lesson)
```js
{ id, module, title,
  big, simple,                       // markdown-lite strings
  simpler?,                          // optional "Simpler explanation" (shown on demand on step 2)
  deeper: [ string | {code, lang} | {try: {task, html, css?, js?}} ],
  points: [string], exam: [string],
  mistakes: [{lang, wrong, right, why}],
  summary: [string],
  recall: [{q, o:[...], a, why}],
  challenge: { task, tabs, starter:{html,css?,js?}, checks:[{d, t(doc, win, src, r)}],
               test?: async fn, exports?: [names], solution:{...} } }
```

The Arabic entry `LESSONS_AR[id]` mirrors this shape:
- `deeper`: same length; `null` keeps the English item (used for code); a string replaces text; `{task}` translates a "Try it".
- `mistakes`: an array of `why` strings.
- `recall`: `{q, o?, why}`.
- `challenge`: `{task}`.

## Checks before every commit
- `node --check js/*.js`
- Serve with `python3 -m http.server 8765`, then run a headless browser (Playwright) to:
  - open every route in **both** languages with no console errors;
  - run every challenge's model solution and confirm all checks pass;
  - confirm every mock-exam model answer gets full marks and an empty answer gets 0.
- Check that every `QUESTIONS[i]` has a matching `QUESTIONS_AR[i]`, and every lesson's Arabic `deeper` has the same length as the English one.

## Working style (Karpathy guidelines)
Source: [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) (MIT). The same text is installed as the project skill `.claude/skills/karpathy-guidelines`. Where these conflict with the rules above, the rules above win.

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

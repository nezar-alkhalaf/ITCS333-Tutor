/* Question bank. m = module id. src marks questions modelled on a past ITCS333 exam. */
const QUESTIONS = [
  /* ---------- HTML ---------- */
  { m: 'html', q: 'Which tag sets the text shown in the browser tab?', o: ['[[<head>]]', '[[<title>]]', '[[<meta name="title">]]', '[[<h1>]]'], a: 1, why: 'title lives in the head and is shown in the tab.' },
  { m: 'html', q: 'Which meta tag makes a page use the device width on phones?', o: ['[[<meta charset="viewport">]]', '[[<meta name="viewport" content="width=device-width, initial-scale=1.0">]]', '[[<meta viewport="1.0">]]', '[[<meta name="mobile" content="yes">]]'], a: 1, why: 'name="viewport" with content width=device-width, initial-scale=1.0.', src: 'Midterm 2025-26' },
  { m: 'html', q: 'HTML is best described as…', o: ['A programming language', 'A markup language that describes the structure of content', 'A styling language', 'A database language'], a: 1, why: 'HTML describes structure and meaning; CSS does presentation; JS does behaviour.' },
  { m: 'html', q: 'Which tag/attribute defines a numbered list using lower-case roman numerals?', o: ['[[<ol type="lower-roman">]]', '[[<ol type="i">]]', '[[<ul type="lower-roman">]]', '[[<ul type="i">]]'], a: 1, why: 'The type attribute of ol accepts 1, A, a, I, i.', src: 'Midterm 2018-19' },
  { m: 'html', q: 'Which element is NOT a semantic element?', o: ['[[<nav>]]', '[[<article>]]', '[[<div>]]', '[[<aside>]]'], a: 2, why: 'div has no meaning; it is a generic container.' },
  { m: 'html', q: 'How many elements on a page can share the same id?', o: ['Any number', 'One', 'Two', 'One per section'], a: 1, why: 'An id must be unique in the document.' },
  { m: 'html', q: 'Which tag displays another web page inside your page?', o: ['[[<iframe>]]', '[[<meta>]]', '[[<external>]]', '[[<frameset>]] only'], a: 0, why: 'iframe embeds another page.', src: 'Midterm 2020-21' },
  { m: 'html', q: 'Which HTML5 element is used to draw graphics on the fly with JavaScript?', o: ['[[<svg>]]', '[[<canvas>]]', '[[<paint>]]', '[[<panel>]]'], a: 1, why: 'canvas is drawn with JavaScript; svg is vector markup.', src: 'Midterm 2020-21' },
  { m: 'html', q: 'Which closing is correct for the script tag?', o: ['[[<script src="a.js" />]] is enough', '[[<script src="a.js"></script>]]', 'No closing tag is needed', '[[<script src="a.js"></src>]]'], a: 1, why: 'script is not a void element.' },

  /* ---------- TABLES & FORMS ---------- */
  { m: 'forms', q: 'The valid tag/attribute to merge three table cells from different rows is:', o: ['[[<td rowspan="3">]]', '[[<td colspan="3">]]', '[[<tr rowspan="3">]]', '[[<tr colspan="3">]]'], a: 0, why: 'Different rows = vertical = rowspan, on a cell.', src: 'Midterm 2018-19' },
  { m: 'forms', q: 'The valid tag/attribute to merge three adjacent cells in the same row is:', o: ['[[<td rowspan="3">]]', '[[<td colspan="3">]]', '[[<tr rowspan="3">]]', '[[<tr colspan="3">]]'], a: 1, why: 'Same row = horizontal = colspan.', src: 'Midterm 2018-19' },
  { m: 'forms', q: 'Which element groups the header rows of a table?', o: ['[[<th>]]', '[[<thead>]]', '[[<header>]]', '[[<caption>]]'], a: 1, why: 'thead groups rows; th is a single header cell.' },
  { m: 'forms', q: 'A table has 3 columns. Row 1: one cell with [[rowspan="2"]] and two normal cells. How many td/th does row 2 need?', o: ['1', '2', '3', '0'], a: 1, why: 'The first column of row 2 is taken by the tall cell.' },
  { m: 'forms', q: 'Which input accepts only whole numbers from 0 to 100 and cannot be empty?', o: ['[[<input type="text" pattern="0-100">]]', '[[<input type="number" min="0" max="100" required>]]', '[[<input type="range" max="100">]]', '[[<input number required>]]'], a: 1, why: 'type number with min, max and required.', src: 'Midterm 2025-26' },
  { m: 'forms', q: 'What is the default type of a [[<button>]] inside a form?', o: ['button', 'submit', 'reset', 'none'], a: 1, why: 'It submits unless you write type="button".' },
  { m: 'forms', q: 'Which attribute links a label to its input?', o: ['[[name]] on the label', '[[for]] on the label, matching the input id', '[[id]] on the label', '[[link]]'], a: 1, why: 'label for="studentId" ↔ input id="studentId".' },
  { m: 'forms', q: 'Which pair makes the user choose only ONE option?', o: ['Checkboxes with the same name', 'Radio buttons with the same name', 'Radio buttons with different names', 'Text inputs with the same id'], a: 1, why: 'Radios with the same name form one group.' },
  { m: 'forms', q: 'Which element groups related form controls with a title?', o: ['[[<group>]] + [[<title>]]', '[[<fieldset>]] + [[<legend>]]', '[[<section>]] + [[<h1>]]', '[[<form>]] + [[<label>]]'], a: 1, why: 'fieldset and legend.' },

  /* ---------- CSS ---------- */
  { m: 'css', q: 'Which style sheet lets you change the appearance of ALL pages of a site at once?', o: ['Inline', 'Internal (embedded)', 'External', 'All of the above'], a: 2, why: 'One external file linked by every page.', src: 'Midterm 2015-16' },
  { m: 'css', q: 'External h3 is blue, internal h3 is red, inline h3 is yellow. Which colour is applied?', o: ['Blue', 'Red', 'Yellow', 'Black (conflict)'], a: 2, why: 'Inline style beats embedded and external rules.', src: 'Midterm 2018-19' },
  { m: 'css', q: 'Which selector selects every input inside a form?', o: ['[[form, input]]', '[[form > input]] only', '[[form input]]', '[[form + input]]'], a: 2, why: 'Descendant selector (space) matches at any depth.', src: 'Midterm 2025-26' },
  { m: 'css', q: 'Which rule makes number inputs red?', o: ['[[input.number { color: #ff0000; }]]', '[[input[type="number"] { color: #ff0000; }]]', '[[#number { color: red; }]]', '[[input:number { color: red; }]]'], a: 1, why: 'Attribute selector.', src: 'Midterm 2025-26' },
  { m: 'css', q: 'What does [[div.average]] select?', o: ['Elements with class average inside a div', 'div elements that have class average', 'Every div and every .average', 'A div with id average'], a: 1, why: 'No space = both conditions on the same element.' },
  { m: 'css', q: 'Which selector has the highest specificity?', o: ['[[ul li a]]', '[[.nav .item a]]', '[[#menu a]]', '[[a:hover]]'], a: 2, why: '(1,0,1) beats (0,2,1), (0,1,1) and (0,0,3).' },
  { m: 'css', q: 'Specificity of [[#main .card p]] is…', o: ['(1,1,1)', '(0,2,1)', '(1,0,2)', '(3,0,0)'], a: 0, why: 'One id, one class, one element.' },
  { m: 'css', q: 'In CSS, the inner space between the content and the border of an element is called:', o: ['spacing', 'margin', 'padding', 'border'], a: 2, why: 'padding.', src: 'Midterm 2022-23' },
  { m: 'css', q: 'To make your site more accessible for people with vision impairment, define font sizes using:', o: ['%', 'px', 'cm', 'rem'], a: 3, why: 'rem follows the user\'s root font-size setting.', src: 'Midterm 2022-23' },
  { m: 'css', q: 'Which [[text-shadow]] puts the shadow at the TOP-RIGHT of an h1?', o: ['[[20px -20px 5px #af12cd]]', '[[20px 20px 5px #af12cd]]', '[[-20px 20px 5px #af12cd]]', '[[-20px -20px 5px #af12cd]]'], a: 0, why: 'Positive x = right, negative y = up.', src: 'Midterm 2022-23' },
  { m: 'css', q: 'Which has the most transparent background colour?', o: ['[[rgba(22,11,33,1.0)]]', '[[rgba(22,11,33,0.4)]]', '[[rgb(22,11,33)]]', '[[rgba(22,11,33,0.9)]]'], a: 1, why: 'Smallest alpha = most transparent.', src: 'Midterm 2022-23' },
  { m: 'css', q: 'Which sets a small picture repeated horizontally across the page?', o: ['[[background { url("small.jpg"); repeat-x; }]]', '[[body { background: url("small.jpg"); background-repeat: repeat-x; }]]', '[[body { background: "small.jpg"; background-repeat: repeat-y; }]]', '[[body { background: url("small.jpg"); background-repeat: repeat-y; }]]'], a: 1, why: 'url() + repeat-x.', src: 'Midterm 2018-19' },
  { m: 'css', q: 'You want the TOP of a background image never to be cut. Which property/value?', o: ['[[background-position: top]]', '[[background-position: bottom]]', '[[background-position: center]]', '[[background-position: left]]'], a: 0, why: 'Anchor the image at the top.', src: 'Midterm 2022-23' },
  { m: 'css', q: '[[padding: 5px 10px;]] gives…', o: ['5px on all sides', 'top/bottom 5px, left/right 10px', 'top 5px, left 10px only', 'left/right 5px, top/bottom 10px'], a: 1, why: 'Two values: vertical, horizontal.' },
  { m: 'css', q: 'With [[box-sizing: border-box; width: 200px; padding: 20px; border: 5px solid]], how wide is the box on screen?', o: ['200px', '250px', '240px', '210px'], a: 0, why: 'border-box includes padding and border in the width.' },
  { m: 'css', q: 'Without box-sizing (content-box), [[width: 200px; padding: 20px; border: 5px solid]] gives a total width of…', o: ['200px', '230px', '250px', '240px'], a: 2, why: '200 + 2×20 + 2×5 = 250.' },
  { m: 'css', q: '[[h2 ~ p]] selects…', o: ['The p right after h2', 'Every p after h2 with the same parent', 'Every p before h2', 'p inside h2'], a: 1, why: '~ = general sibling (all following).' },
  { m: 'css', q: 'Which is valid about CSS?', o: ['CSS defines how to display HTML elements', 'External CSS can save a lot of work', 'Multiple styles cascade into one', 'All are valid'], a: 3, why: 'All three are true.', src: 'Midterm 2020-21' },

  /* ---------- LAYOUT ---------- */
  { m: 'layout', q: 'Where do you put [[display: flex]] to line up three boxes in a row?', o: ['On each box', 'On the parent of the boxes', 'On the body', 'On the first box'], a: 1, why: 'The container becomes flex; its children are items.' },
  { m: 'layout', q: 'In a row flex container, which property controls the HORIZONTAL distribution of items?', o: ['align-items', 'justify-content', 'flex-wrap', 'align-self'], a: 1, why: 'Row → main axis horizontal → justify-content.' },
  { m: 'layout', q: 'In a [[flex-direction: column]] container, which property centres items horizontally?', o: ['justify-content: center', 'align-items: center', 'text-align: center', 'margin: center'], a: 1, why: 'Column → horizontal is the cross axis.' },
  { m: 'layout', q: 'The Flexbox model is…', o: ['A 2D grid of rows and columns', 'A one-dimensional layout model to distribute space and align items in a row or column', 'A way to add animations', 'A JavaScript library'], a: 1, why: 'Grid is 2D; Flexbox is 1D.', src: 'Final notes 2021-22' },
  { m: 'layout', q: '[[position: absolute]] places an element relative to…', o: ['The body always', 'Its normal position', 'The nearest positioned (non-static) ancestor', 'The viewport always'], a: 2, why: 'If no ancestor is positioned, it uses the initial containing block.' },
  { m: 'layout', q: 'Which keeps an element in view while the page scrolls, relative to the window?', o: ['relative', 'absolute', 'fixed', 'static'], a: 2, why: 'fixed = relative to the viewport.' },
  { m: 'layout', q: 'Which media query targets screens 600px wide or LESS?', o: ['[[@media (min-width: 600px)]]', '[[@media (max-width: 600px)]]', '[[@media screen > 600px]]', '[[@media (width: 600px+)]]'], a: 1, why: 'max-width = up to.' },
  { m: 'layout', q: 'Which hides an element but KEEPS its space?', o: ['[[display: none]]', '[[visibility: hidden]]', '[[position: absolute]]', '[[float: none]]'], a: 1, why: 'visibility: hidden keeps the box; display: none removes it.' },
  { m: 'layout', q: 'Which is inline by default?', o: ['[[<p>]]', '[[<section>]]', '[[<span>]]', '[[<table>]]'], a: 2, why: 'span is inline.' },

  /* ---------- JS ---------- */
  { m: 'js', q: 'What is printed? [[console.log("5" + 3);]]', o: ['8', '"53"', 'NaN', 'Error'], a: 1, why: 'String + number joins as text.' },
  { m: 'js', q: 'What is printed? [[console.log("5" - 3);]]', o: ['2', '"53"', 'NaN', '"2"'], a: 0, why: 'Minus converts the string to a number. Only + joins strings.' },
  { m: 'js', q: 'What is printed? [[console.log(Number("85") + 5);]]', o: ['"855"', '90', 'NaN', '85'], a: 1, why: 'Number converts first.' },
  { m: 'js', q: 'What is [[10 % 3]]?', o: ['3', '1', '3.33', '0'], a: 1, why: '% is the remainder.' },
  { m: 'js', q: 'Which declaration cannot be reassigned?', o: ['var', 'let', 'const', 'All can'], a: 2, why: 'const.' },
  { m: 'js', q: '[[0 == ""]] and [[0 === ""]] give…', o: ['true, true', 'true, false', 'false, true', 'false, false'], a: 1, why: '== converts types, === does not.' },
  { m: 'js', q: 'What does this log? [[const x = 7; console.log(\`x is \${x * 2}\`);]]', o: ['x is ${x * 2}', 'x is 14', 'x is 7 * 2', 'Error'], a: 1, why: 'Template literals evaluate ${ }.' },
  { m: 'js', q: 'Which is a correct arrow function returning a + b?', o: ['[[(a, b) -> a + b]]', '[[(a, b) => a + b]]', '[[function (a, b) => a + b]]', '[[=> (a, b) a + b]]'], a: 1, why: 'Parameters, =>, expression.' },
  { m: 'js', q: 'For [[const g = [80, 90, 100];]], what is [[g[1]]]?', o: ['80', '90', '100', 'undefined'], a: 1, why: 'Index starts at 0.' },
  { m: 'js', q: 'A function has no return statement. Calling it gives…', o: ['0', 'null', 'undefined', 'false'], a: 2, why: 'undefined.' },
  { m: 'js', q: 'Which loop is correct for every index of array [[a]]?', o: ['[[for (let i = 1; i <= a.length; i++)]]', '[[for (let i = 0; i < a.length; i++)]]', '[[for (let i = 0; i <= a.length; i++)]]', '[[for (i in a.length)]]'], a: 1, why: '0 to length − 1.' },
  { m: 'js', q: 'What does this log? [[let s = 0; [1, 2, 3].forEach(n => { s += n; }); console.log(s);]]', o: ['0', '6', '"123"', 'undefined'], a: 1, why: '0 + 1 + 2 + 3.' },
  { m: 'js', q: 'Given [[const stats = { sum: 270, count: 3 };]], which gives 90?', o: ['[[stats.sum / stats.count]]', '[[stats[sum] / stats[count]]]', '[[sum / count]]', '[[stats / 3]]'], a: 0, why: 'Dot notation for properties.' },

  /* ---------- DOM ---------- */
  { m: 'dom', q: 'Which line gets the input with id studentId?', o: ['[[document.getElementById("#studentId")]]', '[[document.getElementById("studentId")]]', '[[document.querySelector("studentId")]]', '[[document.getElement("studentId")]]'], a: 1, why: 'No # with getElementById.' },
  { m: 'dom', q: 'Which returns ALL [[tr.data]] rows inside #gradeTbody?', o: ['[[document.querySelector("#gradeTbody tr.data")]]', '[[document.querySelectorAll("#gradeTbody tr.data")]]', '[[document.getElementById("gradeTbody").data]]', '[[document.getElementsByTagName("tr.data")]]'], a: 1, why: 'querySelectorAll + descendant selector.', src: 'Midterm 2025-26' },
  { m: 'dom', q: 'Which property gives the text typed in an input?', o: ['textContent', 'innerHTML', 'value', 'text'], a: 2, why: 'value (always a string).' },
  { m: 'dom', q: 'For [[<p id="here">hello <span>there</span></p>]], [[here.textContent]] is…', o: ['"hello <span>there</span>"', '"hello there"', '"hello"', '"there"'], a: 1, why: 'textContent strips tags; innerHTML keeps them.' },
  { m: 'dom', q: 'Why is textContent preferred over innerHTML for putting user text on the page?', o: ['It is shorter', 'innerHTML can allow cross-site scripting (XSS)', 'innerHTML is deprecated', 'textContent supports styles'], a: 1, why: 'Markup in user input could run scripts.' },
  { m: 'dom', q: 'Which adds class data to newRow?', o: ['[[newRow.class = "data"]]', '[[newRow.classList.add("data")]]', '[[newRow.addClass("data")]]', '[[newRow.style.class = "data"]]'], a: 1, why: 'classList.add.', src: 'Midterm 2025-26' },
  { m: 'dom', q: 'Which creates a new table cell?', o: ['[[document.createElement("<td>")]]', '[[document.createElement("td")]]', '[[document.newElement("td")]]', '[[new td()]]'], a: 1, why: 'Tag name without brackets.' },
  { m: 'dom', q: 'After [[row.appendChild(cell)]], where is cell?', o: ['Before row', 'The last child of row', 'The first child of row', 'Replaces row'], a: 1, why: 'appendChild adds at the end.' },
  { m: 'dom', q: 'For a row with two cells, which gives the second cell?', o: ['[[row.children[2]]]', '[[row.children[1]]]', '[[row.lastChild(1)]]', '[[row.cell2]]'], a: 1, why: 'children is zero-based.', src: 'Midterm 2025-26' },
  { m: 'dom', q: 'Which changes the background colour in JS?', o: ['[[el.style.background-color = "red"]]', '[[el.style.backgroundColor = "red"]]', '[[el.css("background", "red")]]', '[[el.backgroundColor = "red"]]'], a: 1, why: 'camelCase on el.style.' },
  { m: 'dom', q: 'What does querySelector return when nothing matches?', o: ['undefined', 'null', 'An empty NodeList', '0'], a: 1, why: 'null; querySelectorAll returns an empty NodeList.' },

  /* ---------- EVENTS ---------- */
  { m: 'events', q: 'Which correctly registers a click listener?', o: ['[[btn.addEventListener("onclick", go)]]', '[[btn.addEventListener("click", go())]]', '[[btn.addEventListener("click", go)]]', '[[btn.addEvent("click", go)]]'], a: 2, why: 'Type without "on"; function reference without ().' },
  { m: 'events', q: 'In a submit handler, what does [[event.preventDefault()]] do?', o: ['Clears the inputs', 'Stops the browser from sending the form and reloading the page', 'Stops other listeners', 'Checks required fields'], a: 1, why: 'It cancels the default action.', src: 'Midterm 2025-26' },
  { m: 'events', q: 'Which event is triggered when a form element loses focus?', o: ['focus', 'blur', 'change', 'leave'], a: 1, why: 'blur.' },
  { m: 'events', q: 'Which event fires when the HTML is fully parsed (without waiting for images)?', o: ['load', 'DOMContentLoaded', 'ready', 'parse'], a: 1, why: 'DOMContentLoaded.' },
  { m: 'events', q: 'A click on a button inside a div also runs the div\'s click listener. This is called…', o: ['Capturing', 'Bubbling', 'Delegation', 'Hoisting'], a: 1, why: 'The event bubbles up to ancestors.' },
  { m: 'events', q: 'Which stops an event from reaching the parents\' listeners?', o: ['[[e.preventDefault()]]', '[[e.stopPropagation()]]', '[[return false]] always', '[[e.cancel()]]'], a: 1, why: 'stopPropagation.' },
  { m: 'events', q: 'In delegation on a section full of images, which condition detects an image click?', o: ['[[e.target.nodeName == "img"]]', '[[e.target.nodeName == "IMG"]]', '[[e.nodeName == "IMG"]]', '[[e.currentTarget == "IMG"]]'], a: 1, why: 'nodeName is uppercase.' },
  { m: 'events', q: 'Which event fires when the user picks a new option in a select?', o: ['click', 'change', 'submit', 'select'], a: 1, why: 'change (select is about selecting text).' },
  { m: 'events', q: 'Which events stop/resume an image slideshow when the mouse enters and leaves the image?', o: ['mousedown / mouseup', 'mouseover / mouseout', 'click / dblclick', 'focus / blur'], a: 1, why: 'mouseover and mouseout.', src: 'Final 2019-20' },
  { m: 'events', q: 'The user clicks [[calcAvgBtn]] which is [[type="button"]] inside a form. What happens?', o: ['The form submits', 'Only the click listeners run; no submit', 'The page reloads', 'Nothing can happen'], a: 1, why: 'type="button" does not submit.' },
  { m: 'events', q: 'What is printed when the button is clicked? [[btn.addEventListener("click", () => console.log("A")); btn.addEventListener("click", () => console.log("B"));]]', o: ['A', 'B', 'A then B', 'B then A'], a: 2, why: 'All listeners run, in the order added.' },
  { m: 'events', q: 'Which property in a keyboard event gives the key pressed?', o: ['[[e.key]]', '[[e.button]]', '[[e.char]]', '[[e.target.key]]'], a: 0, why: 'e.key, e.g. "Enter".' }
];

/* Specificity puzzles: answers are computed at runtime from getComputedStyle, never hand-written. */
const PUZZLES = [
  { id: 'p1', src: 'Midterm 2024-25 Form A/C', prop: 'borderTopWidth', css: `.form input {
  border: 1px solid;
}
input > .border {
  border: 2px solid;
}
input .border {
  border: 3px solid;
}
.border ~ input {
  border: 4px solid;
}
input + .border {
  border: 5px solid;
}`, html: `<div class="form">
  <label class="required">Username:</label>
  <input class="text">
  <label>Password:</label>
  <input class="password">
</div>`, targets: [{ label: 'the text input', pick: 'input.text' }, { label: 'the password input', pick: 'input.password' }],
    options: ['1px', '2px', '3px', '4px', '5px'], fmt: v => 'border: ' + v + ' solid' },
  { id: 'p2', src: 'Midterm 2024-25 Form B2', prop: 'color', css: `.card p {
  color: gray;
}
.title + p {
  color: yellow;
}
p .title {
  color: blue;
}
.title ~ p {
  color: red;
}
p + .title {
  color: purple;
}`, html: `<div class="card">
  <h2 class="title">Header</h2>
  <p>First paragraph</p>
  <p>Second paragraph</p>
</div>`, targets: [{ label: '"First paragraph"', pick: 'p:nth-of-type(1)' }, { label: '"Second paragraph"', pick: 'p:nth-of-type(2)' }],
    options: ['gray', 'yellow', 'blue', 'red', 'purple'] },
  { id: 'p3', src: 'Midterm 2024-25 Form B', prop: 'color', css: `.menu a {
  color: gray;
}
div .dropdown {
  color: yellow;
}
a .dropdown {
  color: blue;
}
.dropdown ~ a {
  color: red;
}
a + .dropdown {
  color: purple;
}`, html: `<div class="menu">
  <a class="dropdown">Products</a>
  <a>Services</a>
</div>`, targets: [{ label: '"Products"', pick: 'a.dropdown' }, { label: '"Services"', pick: 'a:not(.dropdown)' }],
    options: ['gray', 'yellow', 'blue', 'red', 'purple'] },
  { id: 'p4', prop: 'color', css: `#news p {
  color: green;
}
.box p.lead {
  color: orange;
}
div > p {
  color: blue;
}
p.lead {
  color: red;
}`, html: `<div id="news" class="box">
  <p class="lead">Breaking</p>
  <p>Details</p>
</div>`, targets: [{ label: '"Breaking"', pick: 'p.lead' }, { label: '"Details"', pick: 'p:not(.lead)' }],
    options: ['green', 'orange', 'blue', 'red'] },
  { id: 'p5', prop: 'color', css: `ul li {
  color: gray;
}
.menu > li {
  color: blue;
}
li.active {
  color: red;
}
li + li {
  color: green;
}`, html: `<ul class="menu">
  <li class="active">Home</li>
  <li>About</li>
  <li class="active">Contact</li>
</ul>`, targets: [{ label: '"Home"', pick: 'li:nth-child(1)' }, { label: '"About"', pick: 'li:nth-child(2)' }, { label: '"Contact"', pick: 'li:nth-child(3)' }],
    options: ['gray', 'blue', 'red', 'green'] },
  { id: 'p6', prop: 'color', css: `form input {
  color: black;
}
input[type="number"] {
  color: red;
}
#gradeForm input {
  color: purple;
}
.big {
  color: orange;
}`, html: `<form id="gradeForm">
  <input type="text" class="big" value="S1">
  <input type="number" value="85">
</form>`, targets: [{ label: 'the text input', pick: 'input[type=text]' }, { label: 'the number input', pick: 'input[type=number]' }],
    options: ['black', 'red', 'purple', 'orange'] },
  { id: 'p7', prop: 'color', css: `section p {
  color: green;
}
h2 ~ p {
  color: blue;
}
h2 + p {
  color: red;
}`, html: `<section>
  <p>One</p>
  <h2>Title</h2>
  <p>Two</p>
  <p>Three</p>
</section>`, targets: [{ label: '"One"', pick: 'p:nth-of-type(1)' }, { label: '"Two"', pick: 'p:nth-of-type(2)' }, { label: '"Three"', pick: 'p:nth-of-type(3)' }],
    options: ['red', 'blue', 'green'] },
  { id: 'p8', prop: 'color', css: `.card .title {
  color: navy;
}
h3.title {
  color: teal;
}
div h3 {
  color: maroon;
}`, html: `<div class="card">
  <h3 class="title" style="color: olive">Inline wins?</h3>
  <h3 class="title">Second</h3>
</div>`, targets: [{ label: '"Inline wins?"', pick: 'h3:nth-of-type(1)' }, { label: '"Second"', pick: 'h3:nth-of-type(2)' }],
    options: ['navy', 'teal', 'maroon', 'olive'] }
];

/* Lessons added from the instructor's notes (Chapter 3.1 JavaScript Basics, 3.2 JavaScript DOM, Chapter 3 Tutorial).
   Each lesson is inserted after an existing lesson so the order follows the notes. */
(() => {
  const NEW = [];
  const after = (id, lesson) => NEW.push({ after: id, lesson });

  /* ---------- 1. Adding JS to a page + output methods ---------- */
  after('js-objects', {
    id: 'js-include-output', module: 'js', title: 'Adding JavaScript to a page & output methods',
    big: `Before any JavaScript runs, it has to be connected to the page. The notes show three ways to do that, and five ways for code to talk to the user: the console, the page itself, and three kinds of pop-up.`,
    simple: `**Three ways to include JavaScript**
- **Inline**: inside an HTML attribute, e.g. [[<button onclick="alert('Hello!')">]]. Quick, but messy for big code.
- **Internal**: inside a [[<script>]] tag in the head or at the end of the body.
- **External**: in a separate file, linked with [[<script src="script.js"></script>]]. Best for real projects: clean HTML, reusable code.

**[[defer]]**: [[<script defer src="script.js"></script>]] in the head waits until the HTML is parsed before running. The notes say it gives the same result as [[DOMContentLoaded]].

**Output methods**
- [[console.log('msg')]] → the browser console (F12). Best for testing.
- [[document.write('text')]] → writes onto the page. Avoid in real projects: after the page has loaded it wipes the page.
- [[alert('msg')]] → a pop-up message.
- [[prompt('Enter your name:')]] → a pop-up with a text box; returns the typed **string** (or [[null]] if the user presses Cancel).
- [[confirm('Are you sure?')]] → OK / Cancel pop-up; returns [[true]] or [[false]].`,
    ar: `<strong>بالعربي:</strong> ثلاث طرق تحط فيها JS: داخل الـ attribute (inline)، أو داخل script في نفس الصفحة (internal)، أو ملف خارجي (external) وهو الأفضل. والـ defer يخلي الملف الخارجي ينتظر لين الـ HTML يخلص، مثل DOMContentLoaded. والـ prompt يرجّع string، والـ confirm يرجّع true أو false.`,
    deeper: [
      { code: `<!-- 1. inline -->
<button onclick="alert('Hello!')">Click me</button>

<!-- 2. internal -->
<script>
  console.log('Hello from internal JS');
</script>

<!-- 3. external (in the head, with defer) -->
<script defer src="script.js"></script>`, lang: 'html' },
      { try: { task: 'Run it and read the console. In this preview, alert / prompt / confirm are shown in the console (pop-ups are blocked here). Change the switch on [[ok]] to see both branches.', html: `<button onclick="alert('Inline click!')">Inline button</button>
<p id="out"></p>`, js: `console.log('This goes to the console');
let userInput = prompt('Enter your name:');   // returns a string ("" here)
console.log('Hello, ' + userInput);

let ok = confirm('Are you sure?');            // true or false
if (ok) {
  console.log('User said yes!');
} else {
  console.log('User said no');
}
document.getElementById('out').textContent = 'Use textContent instead of document.write';` } },
      `**Which one in the exam?** The 2025-26 midterm used an **external** file ([[<script src="script.js">]] at the end of the body). For showing results, it used [[textContent]], not [[document.write]] or [[alert]].`
    ],
    points: [
      'Inline (onclick="…"), internal (<script>…</script>), external (<script src="file.js"></script>).',
      'External is preferred: clean HTML, reusable code.',
      '[[defer]] runs an external script after the HTML is parsed (like DOMContentLoaded).',
      'console.log for testing; alert = message; prompt = text input (string); confirm = true/false.',
      'Avoid document.write in real pages; write into elements with textContent instead.'
    ],
    exam: [
      'Q1 of 2025-26: "At the end of the <body>, add a <script> tag to link an external JavaScript file named script.js" (1 mark).',
      'MCQ style: "Which method returns true or false?" → confirm(). "Which returns what the user typed?" → prompt().'
    ],
    mistakes: [
      { lang: 'html', wrong: `<script src="script.js" defer>
  console.log('extra code');
</script>`, right: `<script src="script.js" defer></script>
<script>
  console.log('extra code');
</script>`, why: 'When a script has src, the code written inside the tag is ignored.' },
      { lang: 'js', wrong: `let age = prompt('Age?');
console.log(age + 1);   // "201"`, right: `let age = Number(prompt('Age?'));
console.log(age + 1);   // 21`, why: 'prompt always returns a string.' }
    ],
    summary: [
      'Inline / internal / external; external with defer or at the end of the body.',
      'console.log, document.write, alert, prompt (string), confirm (boolean).',
      'In real pages, show results with textContent.'
    ],
    recall: [
      { q: 'Which way of including JavaScript keeps HTML clean and lets many pages reuse the code?', o: ['Inline', 'Internal', 'External', 'All are the same'], a: 2, why: 'A separate .js file linked with src.' },
      { q: 'What does [[confirm("Delete?")]] return when the user presses OK?', o: ['"OK"', 'true', '1', 'undefined'], a: 1, why: 'confirm returns true (OK) or false (Cancel).' },
      { q: 'What does [[<script defer src="app.js"></script>]] in the head do?', o: ['Runs the script before the HTML', 'Runs the script after the HTML is parsed', 'Never runs the script', 'Runs it twice'], a: 1, why: 'defer waits for the HTML, like DOMContentLoaded.' }
    ],
    challenge: {
      task: `1. In the HTML, add a button with id **hiBtn** that uses an **inline** [[onclick]] to call [[alert('Hi')]].
2. In the JS tab, use [[confirm('Continue?')]] and store the result in [[answer]].
3. Use [[prompt('Name?')]] and store it in [[userName]].
4. Log [[answer]] with console.log.`,
      tabs: ['html', 'js'],
      starter: { html: `<!-- add your button here -->
`, js: `` },
      exports: ['answer', 'userName'],
      test: async (d, w) => { const got = []; w.alert = m => got.push(String(m)); const b = d.getElementById('hiBtn'); if (b) b.click(); return { got }; },
      checks: [
        { d: 'Button #hiBtn exists', t: d => !!d.getElementById('hiBtn') },
        { d: 'It has an inline onclick attribute that calls alert(\'Hi\')', t: (d, w, s, r) => /onclick\s*=\s*["'][^"']*alert\(/.test(s.html) && r.got.includes('Hi') },
        { d: 'answer holds the boolean returned by confirm()', t: (d, w, s) => typeof w.__exp.answer === 'boolean' && /confirm\(/.test(s.js) },
        { d: 'userName holds the string returned by prompt()', t: (d, w, s) => typeof w.__exp.userName === 'string' && /prompt\(/.test(s.js) },
        { d: 'answer is logged with console.log', t: (d, w, s) => /console\.log\([^)]*answer/.test(s.js) }
      ],
      solution: { html: `<button id="hiBtn" onclick="alert('Hi')">Say hi</button>`, js: `let answer = confirm('Continue?');
let userName = prompt('Name?');
console.log(answer);` }
    }
  });

  /* ---------- 2. switch, while, for...of, typeof, scope ---------- */
  after('js-include-output', {
    id: 'js-more-control', module: 'js', title: 'switch, while, for…of, typeof & scope',
    big: `The notes add more tools for decisions and repetition: [[switch]] for many fixed values, [[while]] for "repeat until", [[for…of]] for lists, plus [[typeof]] to see a value's type and the rules of **scope** (where a variable can be used).`,
    simple: `**switch** compares one value against several [[case]]s. [[break]] stops it; without break, the next case runs too ("fall-through"). [[default]] runs when nothing matched.

**while** repeats as long as the condition is true. Change the variable inside, or it loops forever.

**for…of** loops over the **values** of an array (or NodeList): [[for (let num of numbers) { … }]].

**Arrays**: [[push(x)]] adds at the end, [[pop()]] removes the last item, [[arr[0]]] is the first item.

**typeof** gives the type as a string: [[typeof 25]] → "number", [[typeof 'Ali']] → "string", [[typeof true]] → "boolean", [[typeof undefined]] → "undefined".
**null** = "nothing", set on purpose. **undefined** = declared but no value yet ([[let x;]]).

**Scope**
- **Global**: declared outside functions, usable everywhere.
- **Local**: declared inside a function (or a [[{ }]] block with let/const), usable only there. Outside, it gives "is not defined".
- [[var]] is function-scoped; [[let]]/[[const]] are block-scoped.`,
    ar: `<strong>بالعربي:</strong> الـ switch يقارن قيمة وحدة مع أكثر من case، ولا تنسى break وإلا يكمّل للي بعده. والـ while يكرر لين الشرط يصير false. والـ typeof يرجّع النوع كنص. والمتغير اللي داخل function ما تقدر تستخدمه برّاها.`,
    deeper: [
      { try: { mode: 'js', task: 'Change [[day]] to "Friday" and "Sunday". Then remove a [[break]] and see the fall-through.', js: `let day = 'Monday';
switch (day) {
  case 'Monday':
    console.log('Start of the week');
    break;
  case 'Friday':
    console.log('End of the week');
    break;
  default:
    console.log('Midweek');
}

let count = 0;
while (count < 3) {
  console.log('while:', count);   // 0, 1, 2
  count++;
}

let numbers = [1, 2, 3];
numbers.push(4);   // [1, 2, 3, 4]
numbers.pop();     // [1, 2, 3]
for (let num of numbers) console.log('for...of:', num);

console.log(typeof 25, typeof 'Ali', typeof true);
let notDefined;
console.log(notDefined);   // undefined` } },
      { try: { mode: 'js', task: 'Run it, then uncomment the last line and read the error: [[localVar]] only exists inside the function.', js: `let globalVar = 'Global';

function test() {
  let localVar = 'Local';
  console.log(globalVar);   // works: global
  console.log(localVar);    // works: inside the function
}
test();

if (true) {
  let blockVar = 'inside the block';
  var functionVar = 'var ignores blocks';
}
console.log(functionVar);   // works (var is function-scoped)
// console.log(localVar);   // ReferenceError: localVar is not defined` } }
    ],
    points: [
      'switch: case values + break; default when nothing matches.',
      'Forgetting break → the next case also runs.',
      'while (condition) { … update … } — always change the variable.',
      'for…of gives values; push adds at the end, pop removes the last.',
      'typeof returns a string: "number", "string", "boolean", "undefined", "object".',
      'Local variables are not visible outside their function; let/const are block-scoped, var is function-scoped.'
    ],
    exam: [
      'Output questions: "What is printed?" for a switch without break, or a while loop.',
      'Q2.B can be written with for…of instead of forEach: [[for (const row of rows) { … }]].'
    ],
    mistakes: [
      { lang: 'js', wrong: `switch (grade) {
  case 'A': msg = 'Excellent';
  case 'B': msg = 'Good';
}`, right: `switch (grade) {
  case 'A': msg = 'Excellent'; break;
  case 'B': msg = 'Good'; break;
}`, why: 'Without break, case A falls through to case B, so msg ends as "Good".' },
      { lang: 'js', wrong: `let i = 0;
while (i < 3) {
  console.log(i);
}`, right: `let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}`, why: 'Without i++ the condition never becomes false: an infinite loop.' }
    ],
    summary: [
      'switch + break + default; while needs an update inside.',
      'for…of loops over values; push/pop change the end of an array.',
      'typeof tells the type; local variables stay inside their function or block.'
    ],
    recall: [
      { q: 'What is printed? [[let x = 2; switch (x) { case 2: console.log("two"); case 3: console.log("three"); break; default: console.log("other"); }]]', o: ['two', 'two three', 'two three other', 'other'], a: 1, why: 'No break after case 2, so it falls into case 3, which has a break.' },
      { q: 'What does [[typeof "85"]] return?', o: ['"number"', '"string"', '"text"', 'number'], a: 1, why: 'Quotes make it a string; typeof returns the type name as a string.' },
      { q: 'A variable declared with let inside a function is used outside it. What happens?', o: ['It works', 'It is undefined', 'ReferenceError: not defined', 'It becomes global'], a: 2, why: 'Local scope: it does not exist outside.' }
    ],
    challenge: {
      task: `1. Write [[dayType(day)]] using a **switch**: "Friday" and "Saturday" return **"Weekend"**, anything else returns **"Weekday"** (use [[default]]).
2. Write [[countdown(n)]] using a **while** loop that returns an array from n down to 1, e.g. countdown(3) → [3, 2, 1].`,
      mode: 'js', tabs: ['js'],
      starter: { js: `function dayType(day) {

}

function countdown(n) {

}` },
      exports: ['dayType', 'countdown'],
      checks: [
        { d: 'Uses switch with case and default', t: (d, w, s) => /switch\s*\(/.test(s.js) && /case\s/.test(s.js) && /default\s*:/.test(s.js) },
        { d: 'dayType("Friday") and dayType("Saturday") return "Weekend"', t: (d, w) => w.__exp.dayType('Friday') === 'Weekend' && w.__exp.dayType('Saturday') === 'Weekend' },
        { d: 'dayType("Monday") returns "Weekday"', t: (d, w) => w.__exp.dayType('Monday') === 'Weekday' },
        { d: 'Uses a while loop', t: (d, w, s) => /while\s*\(/.test(s.js) },
        { d: 'countdown(3) returns [3, 2, 1]', t: (d, w) => JSON.stringify(w.__exp.countdown(3)) === '[3,2,1]' }
      ],
      solution: { js: `function dayType(day) {
  switch (day) {
    case 'Friday':
    case 'Saturday':
      return 'Weekend';
    default:
      return 'Weekday';
  }
}

function countdown(n) {
  const result = [];
  while (n > 0) {
    result.push(n);
    n--;
  }
  return result;
}` }
    }
  });

  /* ---------- 3. Functions deeper + constructors + this ---------- */
  after('js-more-control', {
    id: 'js-functions-deeper', module: 'js', title: 'Functions deeper: defaults, ...args, callbacks, constructors & this',
    big: `The notes go further than "a function returns a value": default parameter values, functions that take any number of arguments, passing a function into another function (callbacks, the idea behind every event listener), objects with methods that use [[this]], and constructor functions that build many similar objects with [[new]].`,
    simple: `- **Default parameter**: [[function add(a, b = 0)]] → if b is not given, it is 0.
- **Rest parameter**: [[function sum(...args)]] → all the arguments arrive as an **array** called args.
- **Callback**: a function passed to another function to be called later: [[process(done)]]. Every [[addEventListener('click', handler)]] uses a callback.
- **Object method & this**: inside a method, [[this]] means "this object": [[this.speed += 10]].
- **Add / change properties**: [[person.age = 26]] changes, [[person.gpa = 3]] adds a new key.
- **Constructor function**: a function used with [[new]] to create objects. By convention its name starts with a capital letter:
[[function Person(name, age) { this.name = name; this.age = age; }]] → [[let alice = new Person('Alice', 25);]]`,
    ar: `<strong>بالعربي:</strong> الـ default يعطي قيمة إذا ما انرسل الـ parameter. والـ ...args يجمع كل القيم في array. والـ callback هو function ترسلها لـ function ثانية عشان تناديها بعدين، وهذا نفس اللي يصير في addEventListener. والـ this داخل الـ method يعني نفس الـ object. والـ constructor نناديه بـ new عشان يسوي objects.`,
    deeper: [
      { try: { mode: 'js', task: 'Run it. Then call [[add(10)]], [[sum(5, 5, 5)]], and create a second Person.', js: `function add(a, b = 0) {        // default value
  return a + b;
}
console.log(add(5, 3));   // 8
console.log(add(5));      // 5

function sum(...args) {          // rest: args is an array
  let total = 0;
  for (let num of args) total += num;
  return total;
}
console.log(sum(1, 2, 3, 4));   // 10

function process(callback) {     // callback
  console.log('Processing...');
  callback();
}
function done() { console.log('Done!'); }
process(done);                   // pass done, not done()

let car = {
  brand: 'Tesla',
  speed: 0,
  accelerate: function () {
    this.speed += 10;            // this = car
    console.log('Speed: ' + this.speed);
  }
};
car.accelerate();   // Speed: 10
car.accelerate();   // Speed: 20

function Person(name, age) {     // constructor
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log("Hi, I'm " + this.name);
  };
}
let alice = new Person('Alice', 25);
alice.greet();` } }
    ],
    points: [
      'Default: [[b = 0]] in the parameter list.',
      'Rest: [[...args]] collects all arguments into an array.',
      'Callback: pass the function name without (); the receiver calls it.',
      'this inside a method = the object that owns the method.',
      'Constructor: function Name(…) { this.x = x; } and create with new Name(…).',
      'obj.newKey = value adds a property to an existing object.'
    ],
    exam: [
      'Every event listener in Q2 is a callback: [[addEventListener(\'submit\', function (event) { … })]].',
      'Short output questions: "What does add(5) return when b = 0 is a default?" → 5.'
    ],
    mistakes: [
      { lang: 'js', wrong: `process(done());`, right: `process(done);`, why: 'done() runs immediately and passes its result (undefined), not the function.' },
      { lang: 'js', wrong: `let p = Person('Ali', 20);`, right: `let p = new Person('Ali', 20);`, why: 'Without new, this is not a new object and p is undefined.' }
    ],
    summary: [
      'Defaults fill missing arguments; ...args gathers many into an array.',
      'A callback is a function given to another function (like event handlers).',
      'Objects can have methods that use this; constructors + new build many objects.'
    ],
    recall: [
      { q: 'With [[function add(a, b = 0) { return a + b; }]], what is [[add(7)]]?', o: ['NaN', '7', 'undefined', 'Error'], a: 1, why: 'b takes its default value 0.' },
      { q: 'Inside [[function sum(...args)]], what is args when you call [[sum(1, 2, 3)]]?', o: ['1', '6', '[1, 2, 3]', '"1,2,3"'], a: 2, why: 'Rest parameters arrive as an array.' },
      { q: 'Inside a method of [[car]], what does [[this.speed]] refer to?', o: ['A global variable speed', 'The speed property of car', 'The speed of window', 'Nothing'], a: 1, why: 'this is the object the method belongs to.' }
    ],
    challenge: {
      task: `1. [[greet(name = "Student")]] returns **"Hello, NAME"** (default name "Student").
2. [[sum(...nums)]] returns the total of any number of arguments.
3. [[applyTwice(fn, x)]] calls the callback twice: returns [[fn(fn(x))]].
4. Constructor [[Course(code, credits)]] with a method [[info()]] that returns **"CODE (N credits)"** using [[this]]. Create [[c1 = new Course("ITCS333", 3)]].`,
      mode: 'js', tabs: ['js'],
      starter: { js: `` },
      exports: ['greet', 'sum', 'applyTwice', 'Course', 'c1'],
      checks: [
        { d: 'greet() returns "Hello, Student" and greet("Ali") returns "Hello, Ali"', t: (d, w) => w.__exp.greet() === 'Hello, Student' && w.__exp.greet('Ali') === 'Hello, Ali' },
        { d: 'sum uses ...nums: sum(1, 2, 3, 4) is 10, sum() is 0', t: (d, w, s) => /\.\.\.\s*\w+/.test(s.js) && w.__exp.sum(1, 2, 3, 4) === 10 && w.__exp.sum() === 0 },
        { d: 'applyTwice(x => x * 2, 3) returns 12', t: (d, w) => w.__exp.applyTwice(x => x * 2, 3) === 12 },
        { d: 'c1 is created with new Course(...)', t: (d, w, s) => /new\s+Course\s*\(/.test(s.js) && w.__exp.c1 instanceof w.__exp.Course },
        { d: 'c1.info() returns "ITCS333 (3 credits)" using this', t: (d, w, s) => w.__exp.c1.info() === 'ITCS333 (3 credits)' && /this\./.test(s.js) }
      ],
      solution: { js: `function greet(name = "Student") {
  return "Hello, " + name;
}

function sum(...nums) {
  let total = 0;
  for (let n of nums) total += n;
  return total;
}

function applyTwice(fn, x) {
  return fn(fn(x));
}

function Course(code, credits) {
  this.code = code;
  this.credits = credits;
  this.info = function () {
    return this.code + " (" + this.credits + " credits)";
  };
}

let c1 = new Course("ITCS333", 3);` }
    }
  });

  /* ---------- 4. JSON + string functions ---------- */
  after('js-functions-deeper', {
    id: 'js-json-strings', module: 'js', title: 'JSON & string functions (trim, length, parseInt, parseFloat)',
    big: `Data travels between programs as text. **JSON** is the standard text format for objects. And because everything you read from a page is a string, you need the string helpers from the notes: [[trim]], [[length]], [[parseInt]], [[parseFloat]].`,
    simple: `**JSON** (JavaScript Object Notation) looks like an object but it is a **string**, and its keys must be in double quotes: [['{"name": "Bob", "age": 30}']].
- [[JSON.parse(text)]] → turns a JSON string into a real object.
- [[JSON.stringify(obj)]] → turns an object into a JSON string (e.g. to show or send it).

**String functions**
- [[value.trim()]] → removes spaces at the start and end: "  Ali Ahmed  " → "Ali Ahmed".
- [[value.length]] → number of characters ("123" → 3). It is a property, no ().
- [[parseInt("123.33")]] → 123 (whole number).
- [[parseFloat("123.33")]] → 123.33.
- Both return [[NaN]] (Not a Number) when the text is not a number: [[parseFloat("abc")]] → NaN.`,
    ar: `<strong>بالعربي:</strong> الـ JSON نص شكله مثل الـ object. الـ JSON.parse يحوّله لـ object، والـ JSON.stringify يرجّعه نص. والـ trim يشيل المسافات من البداية والنهاية، والـ length يرجّع عدد الحروف، والـ parseInt يرجّع رقم صحيح، والـ parseFloat يرجّع رقم مع الكسور.`,
    deeper: [
      { try: { mode: 'js', task: 'Add a "city" key to the JSON text and parse it again. Then try [[parseInt("12px")]] and [[parseFloat("abc")]].', js: `let jsonString = '{"name": "Bob", "age": 30}';
let obj = JSON.parse(jsonString);       // string -> object
console.log(obj.name);                  // Bob

obj.age = 31;
let backToJson = JSON.stringify(obj);   // object -> string
console.log(backToJson);                // {"name":"Bob","age":31}

let raw = '   Ali Ahmed   ';
console.log('[' + raw.trim() + ']');    // [Ali Ahmed]
console.log('123'.length);              // 3
console.log(parseInt('123.33'));        // 123
console.log(parseFloat('123.33'));      // 123.33
console.log(parseFloat('abc'));         // NaN` } },
      `In the notes' Exercise 4, the valid form data is shown as JSON: [[output.textContent = JSON.stringify(data)]].`
    ],
    points: [
      'JSON is text; keys and strings use double quotes.',
      'JSON.parse(string) → object; JSON.stringify(object) → string.',
      'trim() removes outer spaces; length is a property (no brackets).',
      'parseInt → whole number, parseFloat → keeps decimals; both give NaN for non-numbers.',
      'Number("12px") is NaN but parseInt("12px") is 12.'
    ],
    exam: [
      'Validation from the notes: [[if (name.trim() == "")]] → empty field.',
      'Converting a grade: [[Number(cell.textContent)]] (2025-26 key) or [[parseFloat(...)]] both work.'
    ],
    mistakes: [
      { lang: 'js', wrong: `let n = value.length();`, right: `let n = value.length;`, why: 'length is a property, not a function.' },
      { lang: 'js', wrong: `let obj = JSON.stringify('{"a": 1}');
console.log(obj.a);   // undefined`, right: `let obj = JSON.parse('{"a": 1}');
console.log(obj.a);   // 1`, why: 'parse reads JSON text into an object; stringify goes the other way.' }
    ],
    summary: [
      'parse: text → object; stringify: object → text.',
      'trim, length, parseInt, parseFloat clean and convert input.',
      'NaN means "not a number".'
    ],
    recall: [
      { q: 'Which turns [[\'{"gpa": 3.5}\']] into an object?', o: ['[[JSON.stringify(text)]]', '[[JSON.parse(text)]]', '[[Object(text)]]', '[[text.toObject()]]'], a: 1, why: 'JSON.parse.' },
      { q: 'What is [[parseInt("85.9")]]?', o: ['85.9', '86', '85', 'NaN'], a: 2, why: 'parseInt keeps only the whole part.' },
      { q: 'What does [["  hi  ".trim().length]] give?', o: ['6', '2', '4', 'Error'], a: 1, why: 'trim removes the spaces, leaving "hi".' }
    ],
    challenge: {
      task: `Given [[const text = '{"name": "  Ali Ahmed  ", "gpa": "3.75"}';]]
1. Parse it into [[student]].
2. [[cleanName]] = the name without outer spaces.
3. [[gpa]] = the gpa as a number (3.75).
4. [[nameLength]] = number of characters in cleanName.
5. [[out]] = a JSON string of [[{ name: cleanName, gpa: gpa }]].`,
      mode: 'js', tabs: ['js'],
      starter: { js: `const text = '{"name": "  Ali Ahmed  ", "gpa": "3.75"}';
` },
      exports: ['student', 'cleanName', 'gpa', 'nameLength', 'out'],
      checks: [
        { d: 'student is the parsed object', t: (d, w, s) => w.__exp.student && typeof w.__exp.student === 'object' && /JSON\.parse/.test(s.js) },
        { d: 'cleanName is "Ali Ahmed"', t: (d, w) => w.__exp.cleanName === 'Ali Ahmed' },
        { d: 'gpa is the number 3.75', t: (d, w) => w.__exp.gpa === 3.75 },
        { d: 'nameLength is 9', t: (d, w) => w.__exp.nameLength === 9 },
        { d: 'out is {"name":"Ali Ahmed","gpa":3.75}', t: (d, w) => w.__exp.out === '{"name":"Ali Ahmed","gpa":3.75}' }
      ],
      solution: { js: `const text = '{"name": "  Ali Ahmed  ", "gpa": "3.75"}';
let student = JSON.parse(text);
let cleanName = student.name.trim();
let gpa = parseFloat(student.gpa);
let nameLength = cleanName.length;
let out = JSON.stringify({ name: cleanName, gpa: gpa });` }
    }
  });

  /* ---------- 5. DOM navigation + more properties + manipulation ---------- */
  after('dom-select', {
    id: 'dom-navigate', module: 'dom', title: 'Navigating the DOM & more selectors',
    big: `Once you have one element, you can move to its parent, children and siblings, search **inside** it, and select by any attribute. The notes also list the properties you will change most: [[id]], [[className]], [[href]], [[src]], [[value]].`,
    simple: `**Root nodes**: [[document]] (the whole page), [[document.body]], [[document.head]].

**Family**
- [[firstChild]] / [[lastChild]] / [[childNodes]] → include **text nodes** (the whitespace between tags).
- [[firstElementChild]] / [[lastElementChild]] / [[children]] → **elements only**. Use these.
- [[parentNode]], [[nextSibling]], [[previousSibling]].

**More selectors**
- Attribute: [[document.querySelector("[name='fname']")]] or [[querySelector("input[name='fname']")]].
- **Nested search**: [[document.getElementById('myForm').querySelector('input')]] → searches only inside the form. Every element has querySelector, querySelectorAll, getElementsByTagName and getElementsByClassName, but [[getElementById]] exists **only on document**.
- [[getElementsByClassName]] returns an HTMLCollection (live); [[querySelectorAll]] returns a NodeList (static).

**Properties**: [[link.href]], [[img.src]], [[input.value]], [[el.id]], [[el.className = 'highlight']].`,
    ar: `<strong>بالعربي:</strong> الـ firstChild ممكن يرجّع مسافة فاضية (text node)، فاستخدم firstElementChild و children. وتقدر تبحث داخل عنصر معيّن بـ querySelector عليه هو، بس getElementById يشتغل على الـ document بس. وتقدر تختار بأي attribute مثل [name='fname'].`,
    deeper: [
      { try: { task: 'Run it and read the console. Then select the input by its name attribute and change its value.', html: `<h1 id="title">Hello DOM</h1>
<ul>
  <li>First item</li>
  <li>Last item</li>
</ul>
<a href="https://example.com">Link</a>
<form id="myForm">
  <input type="text" id="fname" name="fname" value="Enter your first name">
</form>`, js: `let ul = document.querySelector('ul');
console.log(ul.firstChild);                     // a text node (whitespace)
console.log(ul.firstElementChild.textContent);  // First item
console.log(ul.lastElementChild.textContent);   // Last item
console.log(ul.childNodes.length, ul.children.length);   // 5 vs 2

let link = document.querySelector('a');
console.log(link.href);
link.href = 'https://new.com';

let byName = document.querySelector("input[name='fname']");
console.log(byName.value);

let inside = document.getElementById('myForm').querySelector('input');   // nested search
console.log(inside === byName);   // true

document.getElementById('title').className = 'highlight';` , css: `.highlight { color: red; }` } },
      `**Manipulation methods from the notes**`,
      { code: `let newP = document.createElement('p');
newP.textContent = 'New paragraph';
document.body.appendChild(newP);                       // add at the end

let firstP = document.querySelector('.text');
document.body.removeChild(firstP);                     // parent.removeChild(child)

let secondP = document.querySelector('.text');
let replacement = document.createElement('span');
replacement.textContent = 'Replaced';
secondP.parentNode.replaceChild(replacement, secondP);  // replaceChild(new, old)

let list = document.querySelector('ul');
let li = document.createElement('li');
li.textContent = 'New first';
list.insertBefore(li, list.firstElementChild);          // insertBefore(new, reference)`, lang: 'js' }
    ],
    points: [
      'document, document.body, document.head are the roots.',
      'firstChild/childNodes include text nodes; firstElementChild/children are elements only.',
      'Attribute selector: [[querySelector("input[name=\'fname\']")]].',
      'Nested search: element.querySelector(…); getElementById only on document.',
      'replaceChild(new, old) and insertBefore(new, reference) are called on the parent.',
      'href, src, value, id, className can be read and changed.'
    ],
    exam: [
      'MCQ: "Which method cannot be called on an element, only on document?" → getElementById.',
      'Output: "What does ul.firstChild return?" → a text node (whitespace), not the first li.'
    ],
    mistakes: [
      { lang: 'js', wrong: `let form = document.getElementById('myForm');
let input = form.getElementById('fname');   // TypeError`, right: `let form = document.getElementById('myForm');
let input = form.querySelector('#fname');`, why: 'getElementById exists only on document.' },
      { lang: 'js', wrong: `ul.firstChild.textContent   // "\\n  " whitespace`, right: `ul.firstElementChild.textContent   // "First item"`, why: 'firstChild can be the whitespace text node.' }
    ],
    summary: [
      'Use children / firstElementChild / lastElementChild to move between elements.',
      'Search inside an element with element.querySelector; select by attribute with [name=…].',
      'replaceChild / insertBefore / removeChild are called on the parent.'
    ],
    recall: [
      { q: 'Which returns the first **element** child of ul, skipping whitespace?', o: ['[[ul.firstChild]]', '[[ul.firstElementChild]]', '[[ul.childNodes[0]]]', '[[ul.first]]'], a: 1, why: 'firstElementChild skips text nodes.' },
      { q: 'Which call is NOT valid?', o: ['[[form.querySelector("input")]]', '[[form.getElementsByTagName("input")]]', '[[form.getElementById("fname")]]', '[[document.getElementById("fname")]]'], a: 2, why: 'getElementById is only on document.' },
      { q: 'How do you select [[<input name="email">]]?', o: ['[[querySelector("#email")]]', '[[querySelector(".email")]]', '[[querySelector("[name=\'email\']")]]', '[[querySelector("email")]]'], a: 2, why: 'Attribute selector in square brackets.' }
    ],
    challenge: {
      task: `Using the HTML given:
1. Store the text of the **last** li of [[ul#menu]] in [[lastText]] (use lastElementChild).
2. Change the link's **href** to **https://uob.edu.bh**.
3. Select the input by its **name** attribute "email" (inside **#regForm**, nested search) and set its value to **test@uob.edu.bh**.
4. **Replace** the paragraph [[#old]] with a new [[<span>]] that says **Replaced**.
5. **Insert** a new li "Start" **before** the first li of the menu.`,
      tabs: ['js', 'html'],
      starter: { html: `<ul id="menu">
  <li>Home</li>
  <li>About</li>
  <li>Contact</li>
</ul>
<a id="site" href="https://example.com">Site</a>
<form id="regForm"><input name="email"></form>
<div id="box"><p id="old">Old text</p></div>`, js: `` },
      exports: ['lastText'],
      checks: [
        { d: 'lastText is "Contact" (lastElementChild)', t: (d, w, s) => w.__exp.lastText === 'Contact' && /lastElementChild/.test(s.js) },
        { d: 'The link points to https://uob.edu.bh', t: d => d.getElementById('site').getAttribute('href').replace(/\/$/, '') === 'https://uob.edu.bh' },
        { d: 'The email input is selected by [name=…] inside #regForm and has the new value', t: (d, w, s) => d.querySelector('[name=email]').value === 'test@uob.edu.bh' && /name\s*=\s*['"]?email/.test(s.js) && /regForm['"`]\)\s*\.querySelector|regForm.*\.querySelector/.test(s.js) },
        { d: '#old is replaced by a span "Replaced" (replaceChild)', t: (d, w, s) => !d.getElementById('old') && d.querySelector('#box > span') && d.querySelector('#box > span').textContent === 'Replaced' && /replaceChild/.test(s.js) },
        { d: 'A new first li "Start" is inserted with insertBefore', t: (d, w, s) => d.querySelector('#menu').firstElementChild.textContent === 'Start' && /insertBefore/.test(s.js) }
      ],
      solution: { js: `let menu = document.getElementById('menu');
let lastText = menu.lastElementChild.textContent;

document.getElementById('site').href = 'https://uob.edu.bh';

let email = document.getElementById('regForm').querySelector("[name='email']");
email.value = 'test@uob.edu.bh';

let old = document.getElementById('old');
let span = document.createElement('span');
span.textContent = 'Replaced';
old.parentNode.replaceChild(span, old);

let start = document.createElement('li');
start.textContent = 'Start';
menu.insertBefore(start, menu.firstElementChild);` }
    }
  });

  /* ---------- 6. Ways to attach events ---------- */
  after('events-basics', {
    id: 'events-ways', module: 'events', title: 'Ways to attach events: onclick, 3 listener styles, mouse & keyboard details',
    big: `The notes show every way to react to an event, from the old HTML attribute [[onclick="…"]] to the three styles of [[addEventListener]]. They recommend one style (named function with the event: "3e"). They also list the details you get from the event: which key, which element, where the mouse is, and whether Ctrl was held.`,
    simple: `**Old ways**
- In HTML: [[<button onclick="alert('Clicked!')">]], [[<div onmouseover="this.style.backgroundColor='red'">]].
- In JS: [[document.getElementById('myButton').onclick = function () { … };]] (only one handler per event).

**addEventListener, three styles** (the notes call them 1, 2, 3):
- **1 · function expression**: [[btn.addEventListener('click', function (event) { … })]]. Full control.
- **2 · arrow function**: [[btn.addEventListener('click', () => { … })]] or [[(e) => { … }]]. Short.
- **3 · named function**: [[function printLog(e) { … }]] then [[btn.addEventListener('click', printLog)]]. **No ()**. The notes say: "Always use method 3e, it is much more organised."

**Remove a listener**: [[btn.removeEventListener('click', printLog)]]. This only works with a named function.

**Event details**
- [[event.target]] → the element.
- [[event.ctrlKey]] → true if Ctrl was held.
- [[e.key]] → the key ("Enter", "a").
- [[e.clientX]], [[e.clientY]] → mouse position.

**Mouse**: [[click]], [[dblclick]], [[mousedown]] (pressed), [[mouseup]] (released), [[mouseover]] (enter), [[mouseout]] (leave), [[mousemove]].
**Keyboard**: [[keydown]] (pressed), [[keyup]] (released).`,
    ar: `<strong>بالعربي:</strong> الطريقة القديمة onclick داخل الـ HTML. والأفضل addEventListener، وفيها 3 أشكال: function عادية، أو arrow، أو function لها اسم. الدكتور يقول استخدم الثالثة مع e (3e). والـ removeEventListener يشتغل بس مع function لها اسم. والـ e.key يعطيك الزر، والـ e.ctrlKey يقول إذا Ctrl مضغوط.`,
    deeper: [
      { try: { task: 'Click, double-click and Ctrl+click the button, hover the box, type in the input and press Enter. Then click "Stop listening" and click the button again.', html: `<button id="btn" type="button">Click me</button>
<button id="stop" type="button">Stop listening</button>
<div id="box" style="padding:20px;border:1px solid;margin:8px 0">Hover me</div>
<input id="name" placeholder="type and press Enter">
<p id="out"></p>`, js: `const btn = document.getElementById('btn');
const out = document.getElementById('out');

// method 3e: named function with the event (recommended in the notes)
function handleClick(e) {
  out.textContent = 'Clicked ' + e.target.id + (e.ctrlKey ? ' with Ctrl' : '');
}
btn.addEventListener('click', handleClick);            // no ()
btn.addEventListener('dblclick', () => console.log('Double click'));

document.getElementById('stop').addEventListener('click', function () {
  btn.removeEventListener('click', handleClick);       // needs the same named function
  out.textContent = 'Click listener removed';
});

const box = document.getElementById('box');
box.addEventListener('mouseover', () => box.style.background = 'lightgreen');
box.addEventListener('mouseout', () => box.style.background = '');
box.addEventListener('mousemove', (e) => box.textContent = 'x: ' + e.clientX + ', y: ' + e.clientY);

document.getElementById('name').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') console.log('Enter pressed!');
});` } }
    ],
    points: [
      'HTML attribute: onclick="…", onmouseover="…" (inline).',
      'el.onclick = function () {…} keeps only one handler.',
      'addEventListener: 1 function(event), 2 arrow, 3 named function (pass it without ()).',
      'The notes recommend 3e: a named function that receives the event.',
      'removeEventListener needs the same named function.',
      'e.target, e.key, e.ctrlKey, e.clientX / e.clientY.'
    ],
    exam: [
      'Notes warning: [[document.addEventListener(\'click\', printLog)]] — not [[printLog()]].',
      'MCQ: "mousedown vs mouseup", "keydown vs keyup", "which property gives the pressed key?" → e.key.'
    ],
    mistakes: [
      { lang: 'js', wrong: `btn.addEventListener('click', () => go());
btn.removeEventListener('click', () => go());   // does nothing`, right: `function go() { … }
btn.addEventListener('click', go);
btn.removeEventListener('click', go);`, why: 'Two arrow functions are two different functions; removal needs the same reference.' },
      { lang: 'html', wrong: `<button onclick="alert(Clicked!)">`, right: `<button onclick="alert('Clicked!')">`, why: 'Inside the attribute, the JS string needs its own (single) quotes.' }
    ],
    summary: [
      'Inline onclick works, but addEventListener is better (separate JS).',
      'Prefer a named function with the event (3e); pass it without ().',
      'e.key, e.ctrlKey, e.clientX/Y, e.target give the details.'
    ],
    recall: [
      { q: 'Which style do the notes recommend for event listeners?', o: ['Inline onclick in HTML', 'el.onclick = …', 'A named function that receives the event (3e)', 'An arrow function always'], a: 2, why: '"Always use method (3e). It is much more organised."' },
      { q: 'When can [[removeEventListener]] remove a listener?', o: ['Always', 'Only if the same named function is passed', 'Only for click', 'Never'], a: 1, why: 'It needs the same function reference.' },
      { q: 'Which event fires when a mouse button is **released**?', o: ['mousedown', 'mouseup', 'mouseout', 'click only'], a: 1, why: 'mouseup.' }
    ],
    challenge: {
      task: `1. Write a **named** function [[showTarget(e)]] that writes [[e.target.id]] into **#out**, and attach it to **#btn** for **click** (method 3e).
2. Add a **keydown** listener on **#name**: when [[e.key]] is **"Enter"**, write **"Enter pressed"** into **#out**.
3. Add a **dblclick** listener on **#btn** that removes the click listener with [[removeEventListener]].`,
      tabs: ['js', 'html'],
      starter: { html: `<button id="btn" type="button">Button</button>
<input id="name">
<p id="out"></p>`, js: `` },
      exports: ['showTarget'],
      test: async (d, w) => {
        const btn = d.getElementById('btn'), out = d.getElementById('out');
        btn.click(); const a = out.textContent.trim();
        out.textContent = '';
        d.getElementById('name').dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        const b = out.textContent.trim();
        btn.dispatchEvent(new w.MouseEvent('dblclick', { bubbles: true }));
        out.textContent = ''; btn.click(); const c = out.textContent.trim();
        return { a, b, c };
      },
      checks: [
        { d: 'showTarget is a named function', t: (d, w) => typeof w.__exp.showTarget === 'function' },
        { d: 'Clicking #btn writes "btn" into #out', t: (d, w, s, r) => r.a === 'btn' && /addEventListener\(\s*['"]click['"]\s*,\s*showTarget\s*\)/.test(s.js) },
        { d: 'Pressing Enter in #name writes "Enter pressed"', t: (d, w, s, r) => r.b === 'Enter pressed' },
        { d: 'After a double-click, clicking no longer writes anything', t: (d, w, s, r) => r.c === '' && /removeEventListener\(\s*['"]click['"]\s*,\s*showTarget\s*\)/.test(s.js) }
      ],
      solution: { js: `const btn = document.getElementById('btn');
const out = document.getElementById('out');

function showTarget(e) {
  out.textContent = e.target.id;
}
btn.addEventListener('click', showTarget);

document.getElementById('name').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    out.textContent = 'Enter pressed';
  }
});

btn.addEventListener('dblclick', function () {
  btn.removeEventListener('click', showTarget);
});` }
    }
  });

  /* ---------- 7. Form validation ---------- */
  after('events-forms', {
    id: 'events-validation', module: 'events', title: 'Form validation: empty, numbers, checkbox, radio, select & submit()',
    big: `Before using form data, you check it. The notes give a short list of checks to focus on: **empty string**, **real number** and **length**. The tutorial adds checkboxes, radio buttons, drop-downs and submitting the form from JavaScript.`,
    simple: `**Checks from the notes** (on strings read from inputs):
- Empty: [[value == ""]], better [[value.trim() == ""]] (spaces only also count as empty).
- Null / undefined: [[value == null]] (useful after [[prompt()]] when the user presses Cancel).
- **Real number** (use this one): [[!isNaN(v) && isFinite(v)]].
- [[isNaN(v)]] → true if NOT a number. [[isFinite(v)]] → true if it is a finite number.
- Length: [[value.length > 0]], or e.g. [[id.length == 9]].

**Other controls**
- Checkbox: [[terms.checked]] → true / false.
- Radio group: [[document.querySelector("input[name='gender']:checked")]] → the selected radio (or [[null]] if none); then [[.value]].
- Select: [[select.value]] → the value of the chosen option.

**Pattern**: in the submit listener, [[e.preventDefault()]], check each field, show a message and stop at the first problem ([[return]]). If everything is valid, continue, or send it with [[form.submit()]].

The [[input]] event fires on every keystroke (the tutorial uses it to reset a red border).`,
    ar: `<strong>بالعربي:</strong> الدكتور قال ركّز على ثلاث فحوصات: الحقل الفاضي (value.trim() == "")، والرقم الحقيقي (!isNaN(v) && isFinite(v))، والطول (length). والـ checkbox نشيك عليه بـ checked. والـ radio نجيب المختار بـ :checked. وإذا كل شي صح، نقدر نرسل الـ form بـ form.submit().`,
    deeper: [
      { try: { task: 'Submit with an empty name, with GPA "abc", without ticking terms, and with everything valid.', html: `<form id="regForm">
  <input id="name" placeholder="Name">
  <input id="gpa" placeholder="GPA">
  <label><input type="radio" name="gender" value="male"> Male</label>
  <label><input type="radio" name="gender" value="female"> Female</label>
  <select id="major">
    <option value="">Select major</option>
    <option value="it">IT</option>
    <option value="science">Science</option>
  </select>
  <label><input type="checkbox" id="terms"> I agree</label>
  <button type="submit">Submit</button>
</form>
<p id="msg"></p>`, js: `const form = document.getElementById('regForm');
const msg = document.getElementById('msg');

function validate(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const gpa = document.getElementById('gpa').value;
  const gender = document.querySelector("input[name='gender']:checked");
  const major = document.getElementById('major').value;
  const terms = document.getElementById('terms').checked;

  if (name.trim() == '') { msg.textContent = 'Name is empty'; return; }
  if (!(!isNaN(gpa) && isFinite(gpa)) || gpa.trim() == '') { msg.textContent = 'GPA is not a number'; return; }
  if (gender == null) { msg.textContent = 'Choose a gender'; return; }
  if (major == '') { msg.textContent = 'Choose a major'; return; }
  if (!terms) { msg.textContent = 'Please agree to terms'; return; }

  msg.textContent = JSON.stringify({ name: name.trim(), gpa: parseFloat(gpa), gender: gender.value, major, terms });
  // form.submit();   // would send the form after validation
}
form.addEventListener('submit', validate);` } },
      `**Why "!isNaN(v) && isFinite(v)"?** [[isNaN("abc")]] is true (not a number). [[isFinite("Infinity")]] is false. Together they accept only real numbers like "3.5". One trap: [[isNaN("")]] is **false** (an empty string converts to 0), so check empty first, as the example does.`
    ],
    points: [
      'Empty: value.trim() == "".',
      'Real number: !isNaN(v) && isFinite(v) (check empty first).',
      'Length: value.length (e.g. exactly 9 digits for an ID).',
      'Checkbox → .checked; radio → querySelector("input[name=…]:checked"); select → .value.',
      'Validate inside the submit listener after preventDefault; form.submit() sends it.',
      'The input event fires on every change while typing.'
    ],
    exam: [
      'Tutorial Exercise 1: "check if studentName is not empty or just whitespace" → [[studentName.trim() == ""]].',
      'Tutorial Exercise 2: "Ensure the price and quantity are positive numbers" → [[!isNaN(p) && isFinite(p) && p > 0]].',
      'Tutorial Exercise 4: checkbox [[checked]], radio value, select value, errors shown in a div, red border with [[style.border = "2px solid red"]].'
    ],
    mistakes: [
      { lang: 'js', wrong: `if (isNaN(gpa)) { … }   // "" passes as a number`, right: `if (gpa.trim() == '' || !(!isNaN(gpa) && isFinite(gpa))) { … }`, why: 'isNaN("") is false, so an empty field looks like a number.' },
      { lang: 'js', wrong: `let gender = document.querySelector("input[name='gender']").value;`, right: `let g = document.querySelector("input[name='gender']:checked");
let gender = g ? g.value : '';`, why: 'Without :checked you always get the first radio, chosen or not.' }
    ],
    summary: [
      'Check empty (trim), real number (!isNaN && isFinite) and length.',
      'checked for checkboxes, :checked for radio groups, value for select.',
      'Validate in the submit handler; submit with form.submit() when valid.'
    ],
    recall: [
      { q: 'Which check from the notes means "the value is a real number"?', o: ['[[isNaN(v)]]', '[[!isNaN(v) && isFinite(v)]]', '[[v == null]]', '[[typeof v == "number"]]'], a: 1, why: 'Not NaN and finite.' },
      { q: 'How do you know if [[<input type="checkbox" id="terms">]] is ticked?', o: ['[[terms.value]]', '[[terms.checked]]', '[[terms.selected]]', '[[terms.textContent]]'], a: 1, why: 'checked is true or false.' },
      { q: 'What does [[isNaN("")]] return?', o: ['true', 'false', 'undefined', 'Error'], a: 1, why: '"" converts to 0, which is a number, so check empty strings separately.' }
    ],
    challenge: {
      task: `Add a **submit** listener to **#regForm** that calls [[preventDefault()]] and writes ONE message into **#msg**:
- name empty or spaces only → **"Name is empty"**
- age not a real number (use [[!isNaN && isFinite]], and empty counts as invalid) → **"Age is not a number"**
- terms checkbox not ticked → **"Please agree to terms"**
- otherwise → **"Welcome NAME"** (the trimmed name)`,
      tabs: ['js', 'html'],
      starter: { html: `<form id="regForm">
  <input id="name" placeholder="Name">
  <input id="age" placeholder="Age">
  <label><input type="checkbox" id="terms"> I agree</label>
  <button type="submit">Register</button>
</form>
<p id="msg"></p>`, js: `` },
      test: async (d, w) => {
        const f = d.getElementById('regForm'), msg = () => d.getElementById('msg').textContent.trim();
        const set = (n, a, t) => { d.getElementById('name').value = n; d.getElementById('age').value = a; d.getElementById('terms').checked = t; };
        const sub = () => { w.__subs = []; f.requestSubmit ? f.requestSubmit() : f.querySelector('button').click(); };
        const r = {};
        set('   ', '20', true); sub(); r.empty = msg();
        set('Ali', 'abc', true); sub(); r.nan = msg();
        set('Ali', '', true); sub(); r.blankAge = msg();
        set('Ali', '20', false); sub(); r.terms = msg();
        set('  Ali  ', '20', true); sub(); r.ok = msg(); r.prevented = w.__subs.length > 0 && w.__subs[0] === true;
        return r;
      },
      checks: [
        { d: 'Spaces-only name → "Name is empty"', t: (d, w, s, r) => r.empty === 'Name is empty' },
        { d: 'Age "abc" → "Age is not a number"', t: (d, w, s, r) => r.nan === 'Age is not a number' },
        { d: 'Empty age → "Age is not a number"', t: (d, w, s, r) => r.blankAge === 'Age is not a number' },
        { d: 'Terms not ticked → "Please agree to terms"', t: (d, w, s, r) => r.terms === 'Please agree to terms' },
        { d: 'Valid data → "Welcome Ali" and the page does not reload', t: (d, w, s, r) => r.ok === 'Welcome Ali' && r.prevented },
        { d: 'Uses isNaN and isFinite', t: (d, w, s) => /isNaN\(/.test(s.js) && /isFinite\(/.test(s.js) }
      ],
      solution: { js: `const form = document.getElementById('regForm');
const msg = document.getElementById('msg');

function validate(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const terms = document.getElementById('terms').checked;

  if (name.trim() == '') {
    msg.textContent = 'Name is empty';
    return;
  }
  if (age.trim() == '' || !(!isNaN(age) && isFinite(age))) {
    msg.textContent = 'Age is not a number';
    return;
  }
  if (!terms) {
    msg.textContent = 'Please agree to terms';
    return;
  }
  msg.textContent = 'Welcome ' + name.trim();
}

form.addEventListener('submit', validate);` }
    }
  });

  /* ---------- 8. Regex basics (bonus) ---------- */
  after('events-flow', {
    id: 'regex-basics', module: 'events', title: 'Bonus: Regular expressions (regex) basics',
    big: `**Bonus lesson.** The notes put regex right after the event sections, and the official scope says "till events". It may not be in the midterm, but it is short and the tutorial uses it for validation. A regex is a pattern that text must match: an email, a student ID like IT1234567, digits only.`,
    simple: `A regex is written between slashes: [[/pattern/flags]].

Symbols from the notes:
- [[^]] start, [[$]] end (so the **whole** string must match)
- [[[a-z]]] any character in the set; [[[0-9]]] or [[\\d]] a digit
- [[( )]] group; [[|]] OR: [[(cat|dog)]]
- [[?]] 0 or 1 time (optional): [[colou?r]] matches color and colour
- [[*]] 0 or more; [[+]] 1 or more; [[{7}]] exactly 7 times; [[{2,4}]] 2 to 4 times
- [[.]] any character (use [[\\.]] for a real dot)
- Flags: [[i]] ignore case, [[g]] global (find all)

Methods:
- [[regex.test(str)]] → true / false (use it for validation)
- [[str.match(regex)]] → the matches
- [[str.replace(regex, x)]] → swap text`,
    ar: `<strong>بالعربي:</strong> هذا درس إضافي، يمكن ما يجي في الميد لأنه بعد الـ events في النوتات. الـ ^ البداية والـ $ النهاية، و \\d رقم، و + مرة أو أكثر، و {7} بالضبط 7 مرات. ونستخدم test() عشان نشيك إذا النص مطابق.`,
    deeper: [
      { try: { mode: 'js', task: 'Test more strings: "it1234567", "IT123", "user@site", "colour".', js: `let str = 'Hello123 world!';
console.log(str.match(/\\d+/g));                 // ['123']

let emailRegex = /^[a-z]+@[a-z]+\\.[a-z]+$/i;
console.log(emailRegex.test('user@example.com'));   // true

console.log(/colou?r/.test('color'), /colou?r/.test('colour'));   // true true

let animal = /(cat|dog) food/;
console.log(animal.exec('cat food')[1]);         // 'cat'

let studentId = /^IT\\d{7}$/;                     // IT + exactly 7 digits
console.log(studentId.test('IT1234567'), studentId.test('IT123'));   // true false

let username = /^[a-z ]{3,}$/i;                  // letters and spaces, at least 3
console.log(username.test('Alex'), username.test('Al'));   // true false` } }
    ],
    points: [
      '^ start and $ end make the whole string match.',
      '[a-z] set, \\d digit, . any character, \\. a real dot.',
      '? optional, * 0+, + 1+, {n} exactly n, {n,m} between.',
      '( ) group and | OR; flags i (ignore case) and g (all matches).',
      'regex.test(str) → true/false for validation.'
    ],
    exam: [
      'Tutorial Exercise 4: student ID [[/^IT\\d{7}$/]], gender [[/^(male|female)$/]], username letters and spaces of at least 3 characters with the i flag.',
      'Older ITCS333 exams had many regex MCQs (e.g. "which string matches /^[0-9]-[0-9]{2,4}$/?").'
    ],
    mistakes: [
      { lang: 'js', wrong: `/\\d{9}/.test('1234567890123')   // true!`, right: `/^\\d{9}$/.test('1234567890123')  // false`, why: 'Without ^ and $ the pattern can match a part of the string.' },
      { lang: 'js', wrong: `/^[a-z]+@[a-z]+.[a-z]+$/`, right: `/^[a-z]+@[a-z]+\\.[a-z]+$/`, why: 'A plain . means any character; escape it for a real dot.' }
    ],
    summary: [
      'Wrap patterns in ^…$ to validate the whole value.',
      '\\d, [a-z], ?, *, +, {n}, ( ), | are the core symbols.',
      'Use test() for true/false.'
    ],
    recall: [
      { q: 'Which matches exactly "IT" followed by 7 digits and nothing else?', o: ['[[/IT\\d{7}/]]', '[[/^IT\\d{7}$/]]', '[[/^IT\\d+$/]]', '[[/^IT[7]$/]]'], a: 1, why: '^ and $ force the whole string; {7} is exactly 7.' },
      { q: 'What does [[?]] mean in [[/colou?r/]]?', o: ['Any character', 'u is optional (0 or 1)', 'u repeated', 'End of string'], a: 1, why: '? = 0 or 1 time.' },
      { q: 'Which method returns true or false?', o: ['[[str.match(re)]]', '[[re.test(str)]]', '[[str.replace(re, "")]]', '[[re.exec(str)]]'], a: 1, why: 'test returns a boolean.' }
    ],
    challenge: {
      task: `Write three functions that return true/false using **regex** and [[test()]]:
1. [[isStudentId(id)]] → "IT" + exactly 7 digits (IT1234567).
2. [[isNineDigits(id)]] → exactly nine digits (123456789).
3. [[isGender(g)]] → exactly "male" or "female" (use a group and |).`,
      mode: 'js', tabs: ['js'],
      starter: { js: `function isStudentId(id) {

}

function isNineDigits(id) {

}

function isGender(g) {

}` },
      exports: ['isStudentId', 'isNineDigits', 'isGender'],
      checks: [
        { d: 'isStudentId: IT1234567 true; IT123, it1234567x, XIT1234567 false', t: (d, w) => { const f = w.__exp.isStudentId; return f('IT1234567') === true && f('IT123') === false && f('it1234567x') === false && f('XIT1234567') === false; } },
        { d: 'isNineDigits: 123456789 true; 12345678 and 1234567890 false', t: (d, w) => { const f = w.__exp.isNineDigits; return f('123456789') === true && f('12345678') === false && f('1234567890') === false; } },
        { d: 'isGender: male/female true; other and males false', t: (d, w) => { const f = w.__exp.isGender; return f('male') && f('female') && !f('other') && !f('males'); } },
        { d: 'Uses .test() and a group with |', t: (d, w, s) => /\.test\(/.test(s.js) && /\([^)]*\|[^)]*\)/.test(s.js) }
      ],
      solution: { js: `function isStudentId(id) {
  return /^IT\\d{7}$/.test(id);
}

function isNineDigits(id) {
  return /^\\d{9}$/.test(id);
}

function isGender(g) {
  return /^(male|female)$/.test(g);
}` }
    }
  });

  /* insert in order */
  NEW.forEach(({ after: id, lesson }) => {
    const i = LESSONS.findIndex(l => l.id === id);
    LESSONS.splice(i < 0 ? LESSONS.length : i + 1, 0, lesson);
  });
})();

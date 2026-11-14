/* Extra questions from the instructor's notes (Chapter 3.1 / 3.2). Appended in the same order to QUESTIONS and QUESTIONS_AR. */
(() => {
  const EXTRA = [
    { m: 'js', q: 'Which tag runs an external script only after the HTML is parsed, even when placed in the head?', o: ['[[<script src="a.js"></script>]]', '[[<script defer src="a.js"></script>]]', '[[<script wait src="a.js"></script>]]', '[[<link src="a.js">]]'], a: 1, why: 'defer waits for the HTML, like DOMContentLoaded.', src: 'Notes 3.2',
      ar: { q: 'أي tag يشغّل ملف script خارجي بس بعد ما يخلص الـ parsing حق الـ HTML، حتى لو كان في الـ head؟', why: 'الـ defer ينتظر الـ HTML، مثل DOMContentLoaded.' } },
    { m: 'js', q: 'What does [[prompt("Age?")]] return when the user types 20?', o: ['The number 20', 'The string "20"', 'true', 'undefined'], a: 1, why: 'prompt always returns a string (or null on Cancel).', src: 'Notes 3.1',
      ar: { q: 'وش يرجّع [[prompt("Age?")]] لما المستخدم يكتب 20؟', o: ['الرقم 20', 'الـ string "20"', 'true', 'undefined'], why: 'الـ prompt دايمًا يرجّع string (أو null إذا ضغط Cancel).' } },
    { m: 'js', q: 'Which output method can wipe the page if called after the page has loaded?', o: ['console.log', 'alert', 'document.write', 'confirm'], a: 2, why: 'The notes warn to avoid document.write in real projects.', src: 'Notes 3.1',
      ar: { q: 'أي طريقة إخراج ممكن تمسح الصفحة إذا ناديتها بعد ما تتحمّل الصفحة؟', why: 'النوتات تحذّر من استخدام document.write في المشاريع الحقيقية.' } },
    { m: 'js', q: 'What is printed? [[let d = "Sunday"; switch (d) { case "Friday": console.log("F"); break; default: console.log("D"); }]]', o: ['F', 'D', 'F D', 'Nothing'], a: 1, why: 'No case matches, so default runs.', src: 'Notes 3.1',
      ar: { q: 'وش يطبع؟ [[let d = "Sunday"; switch (d) { case "Friday": console.log("F"); break; default: console.log("D"); }]]', o: ['F', 'D', 'F D', 'ولا شي'], why: 'ما في case ينطبق، فيشتغل الـ default.' } },
    { m: 'js', q: 'What is printed? [[let c = 0; while (c < 3) { c++; } console.log(c);]]', o: ['0', '2', '3', 'Infinite loop'], a: 2, why: 'The loop stops when c reaches 3.',
      ar: { q: 'وش يطبع؟ [[let c = 0; while (c < 3) { c++; } console.log(c);]]', o: ['0', '2', '3', 'Infinite loop'], why: 'الـ loop يوقف لما c توصل 3.' } },
    { m: 'js', q: 'After [[let a = [1, 2, 3]; a.push(4); a.pop(); a.pop();]], what is [[a]]?', o: ['[1, 2, 3, 4]', '[1, 2]', '[2, 3]', '[1, 2, 3]'], a: 1, why: 'push adds 4, then two pops remove 4 and 3.',
      ar: { q: 'بعد [[let a = [1, 2, 3]; a.push(4); a.pop(); a.pop();]]، وش قيمة [[a]]؟', why: 'الـ push يضيف 4، وبعدين اثنين pop يشيلون 4 و 3.' } },
    { m: 'js', q: 'What does [[let x; console.log(x);]] print?', o: ['null', '0', 'undefined', 'Error'], a: 2, why: 'Declared with no value → undefined.',
      ar: { q: 'وش يطبع [[let x; console.log(x);]]؟', why: 'معرّف بدون قيمة ← undefined.' } },
    { m: 'js', q: 'With [[function add(a, b = 10) { return a + b; }]], what is [[add(5)]]?', o: ['5', '10', '15', 'NaN'], a: 2, why: 'b uses its default 10.', src: 'Notes 3.1',
      ar: { q: 'مع [[function add(a, b = 10) { return a + b; }]]، وش قيمة [[add(5)]]؟', why: 'الـ b ياخذ القيمة الافتراضية 10.' } },
    { m: 'js', q: 'Which creates an object from the constructor [[function Person(name) { this.name = name; }]]?', o: ['[[Person("Ali")]]', '[[new Person("Ali")]]', '[[Person.new("Ali")]]', '[[create Person("Ali")]]'], a: 1, why: 'Constructors are called with new.', src: 'Notes 3.1',
      ar: { q: 'أي واحد يسوي object من الـ constructor [[function Person(name) { this.name = name; }]]؟', why: 'الـ constructors تنادى بـ new.' } },
    { m: 'js', q: 'Which turns an object into a JSON string?', o: ['[[JSON.parse(obj)]]', '[[JSON.stringify(obj)]]', '[[obj.toJSON]]', '[[String(obj)]]'], a: 1, why: 'stringify: object → string; parse: string → object.', src: 'Notes 3.1',
      ar: { q: 'أي واحد يحوّل object لـ JSON string؟', why: 'الـ stringify: من object ← string، والـ parse: من string ← object.' } },
    { m: 'js', q: 'What is [[parseFloat("12.5kg")]]?', o: ['NaN', '12', '12.5', '"12.5"'], a: 2, why: 'parseFloat reads the number at the start and stops at the first non-number character.',
      ar: { q: 'وش قيمة [[parseFloat("12.5kg")]]؟', why: 'الـ parseFloat يقرأ الرقم اللي في البداية ويوقف عند أول حرف مو رقم.' } },
    { m: 'dom', q: 'Which property returns the first child **element**, skipping whitespace text nodes?', o: ['firstChild', 'firstElementChild', 'childNodes[0]', 'parentNode'], a: 1, why: 'firstChild can be a text node.', src: 'Notes 3.2',
      ar: { q: 'أي property يرجّع أول **element** ولد، ويتخطى الـ text nodes حق المسافات؟', why: 'الـ firstChild ممكن يكون text node.' } },
    { m: 'dom', q: 'Which call is invalid?', o: ['[[document.getElementById("x")]]', '[[form.querySelector("#x")]]', '[[form.getElementById("x")]]', '[[form.getElementsByTagName("input")]]'], a: 2, why: 'getElementById exists only on document.', src: 'Notes 3.2',
      ar: { q: 'أي واحد من هذول غلط؟', why: 'الـ getElementById موجود في الـ document بس.' } },
    { m: 'dom', q: 'How do you replace the element [[old]] with [[newEl]]?', o: ['[[old.replaceChild(newEl)]]', '[[old.parentNode.replaceChild(newEl, old)]]', '[[old.parentNode.replaceChild(old, newEl)]]', '[[document.replace(old, newEl)]]'], a: 1, why: 'replaceChild(new, old) is called on the parent.', src: 'Notes 3.2',
      ar: { q: 'شلون تستبدل العنصر [[old]] بـ [[newEl]]؟', why: 'الـ replaceChild(new, old) تناديها على الأب.' } },
    { m: 'events', q: 'Which method do the notes recommend for event listeners?', o: ['Inline onclick', 'el.onclick = function', 'A named function that receives the event, passed without ()', 'Arrow functions only'], a: 2, why: '"Always use method (3e). It is much more organised."', src: 'Notes 3.2',
      ar: { q: 'أي طريقة تنصح فيها النوتات للـ event listeners؟', o: ['Inline onclick', 'el.onclick = function', 'function لها اسم وتستقبل الـ event، وترسلها بدون ()', 'Arrow functions بس'], why: '"Always use method (3e). It is much more organised."' } },
    { m: 'events', q: 'Which event property is true when Ctrl was held during a click?', o: ['[[e.ctrl]]', '[[e.ctrlKey]]', '[[e.key == "Ctrl"]]', '[[e.control]]'], a: 1, why: 'event.ctrlKey.', src: 'Notes 3.2',
      ar: { q: 'أي property في الـ event تكون true إذا كان Ctrl مضغوط وقت الضغطة؟', why: 'الـ event.ctrlKey.' } },
    { m: 'events', q: 'Which check do the notes recommend for "is this a real number"?', o: ['[[isNaN(v)]]', '[[!isNaN(v) && isFinite(v)]]', '[[v == null]]', '[[v.length > 0]]'], a: 1, why: 'Not NaN and finite.', src: 'Notes 3.2',
      ar: { q: 'أي فحص تنصح فيه النوتات عشان تعرف "هل هذا رقم حقيقي"؟', why: 'مو NaN ومحدود (finite).' } },
    { m: 'events', q: 'How do you get the selected value of radio buttons named gender?', o: ['[[document.querySelector("[name=\'gender\']").value]]', '[[document.querySelector("input[name=\'gender\']:checked").value]]', '[[document.getElementById("gender").checked]]', '[[document.gender.value]]'], a: 1, why: ':checked selects the chosen radio.', src: 'Tutorial Ex. 4',
      ar: { q: 'شلون تاخذ القيمة المختارة من أزرار الـ radio اللي اسمها gender؟', why: 'الـ :checked يختار الـ radio اللي انختار.' } }
  ];
  EXTRA.forEach(e => {
    const { ar, ...q } = e;
    QUESTIONS.push(q);
    QUESTIONS_AR.push(ar);
  });
})();

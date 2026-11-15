/* "Simpler explanation" (شرح أبسط): an optional, shorter explanation with an everyday picture.
   It is shown only when the student presses the button on the Simple Explanation step.
   SIMPLER[lessonId] = { en, ar }. Lessons without an entry simply have no button. */
const SIMPLER = {
  'html-structure': {
    en: `A page is like an ID card in a wallet.

- [[<head>]] is the back of the card: details the machine reads (tab title, character set, phone setting, the CSS file). Nobody sees it on the page.
- [[<body>]] is the front: everything the visitor sees.
- The [[<script>]] goes at the **end** of the body, like signing a paper only after it is fully written.`,
    ar: `الصفحة مثل بطاقة هوية في البوك.

- الـ [[<head>]] هو ظهر البطاقة: معلومات يقراها الجهاز (عنوان التاب، ونوع الحروف، وإعداد الجوال، وملف الـ CSS). محد يشوفها في الصفحة.
- الـ [[<body>]] هو وجه البطاقة: كل اللي يشوفه الزائر.
- الـ [[<script>]] ينحط في **آخر** الـ body، مثل ما توقّع على ورقة بس بعد ما تخلص كتابتها.`
  },
  'html-content': {
    en: `Think of a newspaper page.

- Headings ([[<h1>]] to [[<h6>]]) are the headlines, from the biggest to the smallest.
- [[<p>]] is a paragraph of the story.
- [[<a href="...">]] is "continued on page 5": it sends you somewhere else.
- [[<img src="..." alt="...">]] is the photo, and [[alt]] is its caption for someone who cannot see it.
- [[<ul>]] is a shopping list (order does not matter). [[<ol>]] is a recipe (order matters).
- Semantic tags ([[<header>]], [[<nav>]], [[<main>]], [[<footer>]]) are labels on the parts of the page, so the browser knows what each part is for.`,
    ar: `تخيّل صفحة جريدة.

- العناوين (من [[<h1>]] لين [[<h6>]]) هي المانشيتات، من الأكبر للأصغر.
- الـ [[<p>]] فقرة من الخبر.
- الـ [[<a href="...">]] مثل "التتمة في صفحة 5": يوديك مكان ثاني.
- الـ [[<img src="..." alt="...">]] هي الصورة، والـ [[alt]] وصفها حق اللي ما يقدر يشوفها.
- الـ [[<ul>]] قائمة مشتريات (الترتيب مو مهم). والـ [[<ol>]] طريقة طبخة (الترتيب مهم).
- الـ semantic tags (مثل [[<header>]] و [[<nav>]] و [[<main>]] و [[<footer>]]) ملصقات على أجزاء الصفحة، عشان الـ browser يعرف كل جزء حق شنو.`
  },
  tables: {
    en: `A table is a class attendance sheet.

- You always write it **one row at a time**: [[<tr>]] is one line of the sheet.
- Inside a row, [[<th>]] is a title cell ("Name", "Grade") and [[<td>]] is a normal cell.
- [[<thead>]] is the title line at the top, [[<tbody>]] is the students' lines.
- [[colspan="2"]] is one cell stretched **sideways** over 2 columns. [[rowspan="2"]] is one cell stretched **down** over 2 rows.`,
    ar: `الجدول مثل كشف الحضور في الصف.

- دايمًا تكتبه **صف صف**: الـ [[<tr>]] سطر واحد من الكشف.
- داخل الصف، الـ [[<th>]] خانة عنوان ("Name" و "Grade")، والـ [[<td>]] خانة عادية.
- الـ [[<thead>]] سطر العناوين اللي فوق، والـ [[<tbody>]] سطور الطلاب.
- الـ [[colspan="2"]] خانة وحدة ممدودة **بالعرض** على عمودين. والـ [[rowspan="2"]] خانة وحدة ممدودة **لتحت** على صفين.`
  },
  forms: {
    en: `A form is a paper application you fill in at a counter.

- [[<form>]] is the whole paper.
- [[<label>]] is the printed question, and [[<input>]] is the empty box you write in.
- [[type]] says what kind of box it is: text, number, email, checkbox…
- [[required]], [[min]] and [[max]] are the clerk who refuses the paper if a box is empty or the number is out of range.
- The submit button hands the paper over. [[id]] is how JavaScript finds a box; [[name]] is the label the server receives.`,
    ar: `الـ form مثل استمارة ورق تعبيها عند الكاونتر.

- الـ [[<form>]] هي الورقة كلها.
- الـ [[<label>]] السؤال المطبوع، والـ [[<input>]] المربع الفاضي اللي تكتب فيه.
- الـ [[type]] يحدد نوع المربع: text أو number أو email أو checkbox…
- الـ [[required]] والـ [[min]] والـ [[max]] مثل الموظف اللي يرجّع لك الورقة إذا في مربع فاضي أو الرقم خارج الحدود.
- زر الـ submit يسلّم الورقة. الـ [[id]] هو اللي يلقى فيه الـ JavaScript المربع، والـ [[name]] هو الاسم اللي يوصل للـ server.`
  },
  'css-selectors': {
    en: `CSS is giving orders in a classroom. The selector says **who** the order is for.

- [[p]] → "everyone who is a paragraph".
- [[.note]] → "everyone wearing the *note* badge" (a class: many can wear it).
- [[#total]] → "the one student with this ID number" (an id: only one).
- [[input[type="number"]]] → "everyone who has this exact detail".
- [[th, td]] → "this group **and** that group, same order for both".

Then inside [[{ }]] you say what to do: [[color: red;]].`,
    ar: `الـ CSS مثل أوامر تعطيها في الصف. والـ selector يحدد الأمر **حق منو**.

- [[p]] ← "كل واحد هو paragraph".
- [[.note]] ← "كل اللي لابسين باج *note*" (class: كثيرين يقدرون يلبسونه).
- [[#total]] ← "الطالب الوحيد اللي عنده هالرقم الجامعي" (id: واحد بس).
- [[input[type="number"]]] ← "كل اللي عنده هالمعلومة بالضبط".
- [[th, td]] ← "هالمجموعة **و** هذيج المجموعة، نفس الأمر للثنتين".

وبعدين داخل [[{ }]] تقول شنو يسوي: [[color: red;]].`
  },
  combinators: {
    en: `Think of a family living in one house.

- [[div p]] (a space) → every p **anywhere inside** the div: children, grandchildren, all of them.
- [[div > p]] → only the div's **own children**, not the grandchildren.
- [[h2 + p]] → the **one brother right after** h2.
- [[h2 ~ p]] → **all the younger brothers** after h2 (same parent).

Always read the selector from the **right**: the last word is the element that gets the style.`,
    ar: `تخيّل عايلة ساكنة في بيت واحد.

- [[div p]] (مسافة) ← كل p **داخل** الـ div في أي مكان: العيال، وعيال العيال، كلهم.
- [[div > p]] ← بس **عيال** الـ div المباشرين، مو الأحفاد.
- [[h2 + p]] ← **الأخو اللي بعد** الـ h2 على طول، واحد بس.
- [[h2 ~ p]] ← **كل الإخوان الأصغر** اللي بعد الـ h2 (نفس الأب).

دايمًا اقرأ الـ selector من **اليمين**: آخر كلمة هي العنصر اللي ياخذ الـ style.`
  },
  specificity: {
    en: `Several people give you different orders. Who do you obey?

1. First, ignore anyone who is **not talking to you** (the rule does not match the element).
2. Then the higher rank wins: a note stuck on you ([[style="..."]]) beats your **ID number** ([[#id]]), which beats your **team badge** ([[.class]]), which beats "all students" ([[p]]).
3. Same rank? The one who spoke **last** wins.

Write it as three numbers (ids, classes, elements) and compare from the left: (1,0,0) beats (0,5,5).`,
    ar: `كذا واحد يعطونك أوامر مختلفة. تسمع كلام منو؟

1. أول شي، طنّش أي واحد **مو قاعد يكلمك** (الـ rule ما ينطبق على العنصر).
2. بعدين الرتبة الأعلى تفوز: ورقة ملصوقة عليك ([[style="..."]]) تغلب **رقمك الجامعي** ([[#id]])، وهذا يغلب **باج فريقك** ([[.class]])، وهذا يغلب "كل الطلاب" ([[p]]).
3. نفس الرتبة؟ اللي تكلم **آخر واحد** يفوز.

اكتبها ثلاث أرقام (ids, classes, elements) وقارن من اليسار: (1,0,0) يغلب (0,5,5).`
  },
  'box-model': {
    en: `Every element is a framed picture on a wall.

- **content**: the picture itself.
- **padding**: the white card between the picture and the frame.
- **border**: the frame.
- **margin**: the empty wall between this frame and the next one.

[[width]] normally measures only the picture. With [[box-sizing: border-box]] it measures up to the outside of the frame, which is easier.

Units: [[px]] is a fixed ruler, [[%]] is "part of my parent", [[em]] / [[rem]] is "times the font size".`,
    ar: `كل عنصر مثل صورة ببرواز معلقة على الجدار.

- الـ **content**: الصورة نفسها.
- الـ **padding**: الكرتون الأبيض بين الصورة والبرواز.
- الـ **border**: البرواز.
- الـ **margin**: الجدار الفاضي بين هالبرواز واللي جنبه.

الـ [[width]] في العادة يقيس الصورة بس. ومع [[box-sizing: border-box]] يقيس لين طرف البرواز من برّه، وهذا أسهل.

الوحدات: الـ [[px]] مسطرة ثابتة، والـ [[%]] "جزء من الأب"، والـ [[em]] / [[rem]] "كم مرة من حجم الخط".`
  },
  'display-position': {
    en: `Elements are people in a queue.

- **block** elements take a whole row each (one per line). **inline** elements stand side by side like words in a sentence.
- [[position: relative]] → step a little out of your place, but your place is kept for you.
- [[position: absolute]] → leave the queue and stand at an exact spot, measured from the nearest parent that has a position.
- [[position: fixed]] → stuck to the screen glass; scrolling does not move it.
- [[display: none]] → left the room completely (no space kept).`,
    ar: `العناصر مثل ناس واقفين في طابور.

- عناصر الـ **block** كل واحد ياخذ سطر كامل (واحد في كل سطر). وعناصر الـ **inline** يوقفون جنب بعض مثل الكلمات في الجملة.
- [[position: relative]] ← تحرّك شوي من مكانك، بس مكانك محجوز لك.
- [[position: absolute]] ← اطلع من الطابور واوقف في نقطة محددة، محسوبة من أقرب أب عنده position.
- [[position: fixed]] ← ملصوق على زجاج الشاشة، والـ scroll ما يحركه.
- [[display: none]] ← طلع من الغرفة بالمرة (ومكانه ما ينحجز).`
  },
  flexbox: {
    en: `Flexbox is a shelf.

- You put [[display: flex]] on the **shelf** (the parent), never on the items.
- [[flex-direction]] → is the shelf horizontal ([[row]]) or standing up ([[column]])?
- [[justify-content]] → how the items spread **along** the shelf (start, center, space-between…).
- [[align-items]] → how they sit **across** the shelf (top, middle, bottom).
- [[gap]] → the space between two items.
- [[flex: 1]] on an item → "stretch me to take the free space".`,
    ar: `الـ Flexbox مثل رف.

- تحط [[display: flex]] على **الرف** (الأب)، مو على الأغراض.
- الـ [[flex-direction]] ← الرف بالعرض ([[row]]) أو واقف ([[column]])؟
- الـ [[justify-content]] ← شلون الأغراض تتوزع **على طول** الرف (start أو center أو space-between…).
- الـ [[align-items]] ← شلون تقعد **بالعرض** على الرف (فوق أو في النص أو تحت).
- الـ [[gap]] ← المسافة بين كل غرضين.
- [[flex: 1]] على غرض ← "مدّني عشان آخذ المساحة الفاضية".`
  },
  responsive: {
    en: `A media query is an "if" for the screen size, like clothes for the weather.

[[@media (max-width: 600px) { … }]] means: "**if** the screen is 600px wide or less, also apply these rules".

- [[max-width]] → rules for **small** screens (phones).
- [[min-width]] → rules for **big** screens.

The usual phone change: turn a row into a column ([[flex-direction: column]]) so things stack instead of squeezing.

Without the viewport [[<meta>]] tag in the head, a phone pretends to be a wide screen and the query never fires.`,
    ar: `الـ media query مثل "if" على حجم الشاشة، مثل ما تلبس حسب الجو.

[[@media (max-width: 600px) { … }]] يعني: "**إذا** عرض الشاشة 600px أو أقل، طبّق هالـ rules بعد".

- الـ [[max-width]] ← rules حق الشاشات **الصغيرة** (الجوالات).
- الـ [[min-width]] ← rules حق الشاشات **الكبيرة**.

التغيير المعتاد في الجوال: تحوّل الـ row لـ column ([[flex-direction: column]]) عشان الأشياء تصير فوق بعض بدل ما تنضغط.

بدون الـ viewport [[<meta>]] في الـ head، الجوال يسوي روحه شاشة عريضة والـ query ما يشتغل أبد.`
  },
  'js-basics': {
    en: `A variable is a labelled box.

- [[const]] → a box you close for good: you cannot put a different thing in it.
- [[let]] → a box you may empty and refill (a counter, a total).

What is inside has a type: a **number** ([[20]]), a **string** (text in quotes, [["20"]]), or a **boolean** ([[true]] / [[false]]).

Careful with [[+]]: with numbers it adds ([[2 + 3]] is 5), but if one side is text it **glues** ([["2" + 3]] is [["23"]]). Text typed into an input is always a string, so convert it with [[Number()]] first.

Use [[===]] to compare: it checks the value **and** the type.`,
    ar: `الـ variable مثل صندوق عليه اسم.

- الـ [[const]] ← صندوق تسكره للأبد: ما تقدر تحط فيه شي ثاني.
- الـ [[let]] ← صندوق تقدر تفضّيه وتعبّيه مرة ثانية (عدّاد، أو مجموع).

اللي داخله له نوع: **number** ([[20]])، أو **string** (نص بين quotes، [["20"]])، أو **boolean** ([[true]] / [[false]]).

انتبه من الـ [[+]]: مع الأرقام يجمع ([[2 + 3]] يطلع 5)، بس إذا واحد من الطرفين نص **يلصقهم** ([["2" + 3]] يطلع [["23"]]). واللي ينكتب في الـ input دايمًا string، فحوّله أول بـ [[Number()]].

استخدم [[===]] للمقارنة: يشيّك على القيمة **و** النوع.`
  },
  'js-control': {
    en: `- **if / else** is a fork in the road: "if it rains, take the umbrella, else leave it".
- A **loop** is doing the same job again and again: "for every student in the list, read the grade".
- A **function** is a recipe with a name. You write it once ([[function average(a, b) { … }]]) and cook it whenever you want by calling its name ([[average(80, 90)]]).
- The **parameters** are the ingredients you hand in, and [[return]] is the dish that comes back. A function with no [[return]] gives back [[undefined]].`,
    ar: `- الـ **if / else** مثل مفرق طريق: "إذا في مطر خذ المظلة، وإلا خلّها".
- الـ **loop** يعني تسوي نفس الشغلة مرة ورا مرة: "لكل طالب في القائمة، اقرأ الدرجة".
- الـ **function** طبخة لها اسم. تكتبها مرة وحدة ([[function average(a, b) { … }]]) وتطبخها متى ما تبي لما تناديها باسمها ([[average(80, 90)]]).
- الـ **parameters** هي المقادير اللي تعطيها، والـ [[return]] هو الصحن اللي يرجع لك. والـ function اللي ما فيها [[return]] ترجّع [[undefined]].`
  },
  'js-objects': {
    en: `- An **array** is a row of numbered lockers. The first locker is number **0**. [[grades[0]]] opens the first one, [[grades.length]] tells you how many there are, and [[grades.push(70)]] adds a locker at the end.
- An **object** is one student's file: each piece of information has a **name**, not a number. [[student.name]], [[student.grade]].
- An **array of objects** is a drawer full of files, which is how real data usually looks: [[students[1].name]] is "the name in the second file".`,
    ar: `- الـ **array** صف لوكرات مرقمة. وأول لوكر رقمه **0**. [[grades[0]]] يفتح الأول، و [[grades.length]] يقول لك كم واحد موجود، و [[grades.push(70)]] يضيف لوكر في الآخر.
- الـ **object** ملف طالب واحد: كل معلومة لها **اسم** مو رقم. [[student.name]] و [[student.grade]].
- الـ **array of objects** درج مليان ملفات، وهذا شكل البيانات الحقيقية في العادة: [[students[1].name]] يعني "الاسم اللي في ثاني ملف".`
  },
  'js-include-output': {
    en: `**Where the code lives**
- **Inline** → a sticky note on one button.
- **Internal** → a page of notes inside the same notebook (the HTML file).
- **External** → a separate notebook ([[script.js]]) that many pages can share. This is the tidy way.

**How the code talks**
- [[console.log()]] → whispering to the developer (only seen in F12).
- [[alert()]] → shouting a message at the user.
- [[prompt()]] → asking a question and getting the answer back as **text**.
- [[confirm()]] → a yes / no question: gives [[true]] or [[false]].`,
    ar: `**وين يكون الكود**
- الـ **Inline** ← ورقة لاصقة على زر واحد.
- الـ **Internal** ← صفحة ملاحظات داخل نفس الدفتر (ملف الـ HTML).
- الـ **External** ← دفتر منفصل ([[script.js]]) تتشارك فيه صفحات كثيرة. وهذي الطريقة المرتبة.

**شلون الكود يتكلم**
- [[console.log()]] ← يهمس للمبرمج (يطلع بس في F12).
- [[alert()]] ← يصارخ برسالة على المستخدم.
- [[prompt()]] ← يسأل سؤال وياخذ الجواب كـ **نص**.
- [[confirm()]] ← سؤال إي / لا: يرجّع [[true]] أو [[false]].`
  },
  'js-more-control': {
    en: `- **switch** is a lift panel: you press one floor ([[case]]) and go there. Without [[break]] the lift keeps going down through the next floors too. [[default]] is "any other button".
- **while** is "keep stirring **while** it is still lumpy": it checks first, then repeats. If the condition never becomes false, it never stops.
- **for…of** hands you each item of an array, one at a time, with no counting.
- [[typeof x]] is asking "what kind of thing is in this box?" and the answer is a string like [["number"]].
- **Scope** is rooms: a variable made with [[let]] inside [[{ }]] lives only in that room.`,
    ar: `- الـ **switch** مثل لوحة الأصنصير: تضغط على طابق واحد ([[case]]) وتروح له. وبدون [[break]] الأصنصير يكمّل ينزل على الطوابق اللي بعده بعد. والـ [[default]] يعني "أي زر ثاني".
- الـ **while** مثل "كمّل حرّك **طول ما** هو متكتل": يشيّك أول وبعدين يعيد. وإذا الشرط ما صار false أبد، ما يوقف.
- الـ **for…of** يعطيك كل عنصر في الـ array، واحد واحد، بدون ما تعدّ.
- [[typeof x]] يعني تسأل "شنو نوع الشي اللي في هالصندوق؟" والجواب string مثل [["number"]].
- الـ **Scope** مثل الغرف: الـ variable اللي ينسوّى بـ [[let]] داخل [[{ }]] يعيش بس في ذيج الغرفة.`
  },
  'js-functions-deeper': {
    en: `- A **default parameter** is "tea with sugar unless you say otherwise": [[function tea(sugar = 1)]].
- A **rest parameter** [[...args]] is a bag that collects however many things you pass in, as one array.
- A **callback** is leaving your phone number: you hand a function to someone else and **they** call it later ("call me when the food is ready"). You pass its name **without** [[()]].
- A **constructor** ([[new Student("Ali")]]) is a factory mould: every call makes a new object of the same shape.
- [[this]] means "the object I am working on right now".`,
    ar: `- الـ **default parameter** مثل "شاي بسكر إلا إذا قلت غير": [[function tea(sugar = 1)]].
- الـ **rest parameter** [[...args]] كيس يجمع أي عدد من الأشياء اللي تعطيها، ويحطها في array واحد.
- الـ **callback** مثل ما تخلي رقمك: تعطي function لواحد ثاني، و**هو** اللي يناديها بعدين ("كلمني لما يجهز الأكل"). وتعطيه اسمها **بدون** [[()]].
- الـ **constructor** ([[new Student("Ali")]]) قالب مصنع: كل مرة تناديه يسوي object جديد بنفس الشكل.
- الـ [[this]] يعني "الـ object اللي قاعد أشتغل عليه الحين".`
  },
  'js-json-strings': {
    en: `**JSON** is an object written down as **text** so it can travel (to a server, or into storage). It is like packing furniture flat in a box.

- [[JSON.stringify(obj)]] → pack it: object becomes text.
- [[JSON.parse(text)]] → unpack it: text becomes an object again.

**String helpers**
- [[.trim()]] → cuts the spaces at the two ends.
- [[.length]] → how many characters.
- [[parseInt("42px")]] → reads the whole number at the start: 42.
- [[parseFloat("3.5kg")]] → the same, but keeps the decimal: 3.5.
- If there is no number at the start, both give [[NaN]] ("not a number").`,
    ar: `الـ **JSON** هو object مكتوب كـ **نص** عشان يقدر يسافر (للـ server، أو للتخزين). مثل ما تفكك الأثاث وتحطه في كرتون.

- [[JSON.stringify(obj)]] ← فكّكه: الـ object يصير نص.
- [[JSON.parse(text)]] ← ركّبه: النص يرجع object.

**دوال الـ string**
- [[.trim()]] ← يقص المسافات من الطرفين.
- [[.length]] ← كم حرف.
- [[parseInt("42px")]] ← يقرأ الرقم الصحيح اللي في البداية: 42.
- [[parseFloat("3.5kg")]] ← نفس الشي، بس يخلي الكسر: 3.5.
- إذا ما في رقم في البداية، الثنتين يرجّعون [[NaN]] ("مو رقم").`
  },
  'dom-select': {
    en: `The DOM is the family tree of the page, and JavaScript can only change a person after it **finds** them.

- [[document.getElementById("total")]] → look someone up by ID number. One person, or [[null]] if nobody has it. No [[#]] here.
- [[document.querySelector(".note")]] → the **first** person who fits a CSS selector.
- [[document.querySelectorAll("td")]] → **everyone** who fits, as a list you can loop over.

Finding is not changing: keep what you found in a variable, then work on it.`,
    ar: `الـ DOM شجرة عايلة الصفحة، والـ JavaScript ما يقدر يغيّر أحد إلا بعد ما **يلقاه**.

- [[document.getElementById("total")]] ← تدوّر على واحد برقمه. يطلع واحد، أو [[null]] إذا محد عنده هالرقم. وما تكتب [[#]] هني.
- [[document.querySelector(".note")]] ← **أول** واحد ينطبق عليه الـ CSS selector.
- [[document.querySelectorAll("td")]] ← **كل** اللي ينطبق عليهم، في قائمة تقدر تسوي عليها loop.

إنك تلقاه مو يعني إنك غيّرته: احفظ اللي لقيته في variable، وبعدين اشتغل عليه.`
  },
  'dom-navigate': {
    en: `Once you are standing on one element, you can walk to its relatives instead of searching again.

- [[parentElement]] → go **up** to the parent.
- [[children]] → the list of its children ([[firstElementChild]], [[lastElementChild]] for the two ends).
- [[nextElementSibling]] / [[previousElementSibling]] → the brother on each side.

The names **with** "Element" skip the empty text (spaces and new lines between tags). The older ones ([[firstChild]], [[childNodes]]) count that empty text too, which is the usual surprise.`,
    ar: `أول ما توقف على عنصر واحد، تقدر تمشي لأقاربه بدل ما تدوّر من جديد.

- [[parentElement]] ← اطلع **فوق** للأب.
- [[children]] ← قائمة عياله (و [[firstElementChild]] و [[lastElementChild]] حق الأول والأخير).
- [[nextElementSibling]] / [[previousElementSibling]] ← الأخو اللي على كل صوب.

الأسماء اللي **فيها** كلمة "Element" تطوّف النص الفاضي (المسافات والأسطر الجديدة بين الـ tags). والقديمة ([[firstChild]] و [[childNodes]]) تحسب هالنص الفاضي بعد، وهذي المفاجأة المعتادة.`
  },
  'dom-change': {
    en: `After you find an element, you can read it or rewrite it.

- [[el.textContent]] → the **words** inside. Setting it replaces the words.
- [[el.innerHTML]] → the words **with their tags**. Setting it builds real elements.
- [[input.value]] → what the user typed in a box. It is always a **string**.
- [[el.style.color = "red"]] → paint one property directly.
- [[el.classList.add("done")]] → put a ready-made CSS class on it (tidier than many style lines).
- [[el.setAttribute("href", "…")]] → change an attribute.`,
    ar: `بعد ما تلقى العنصر، تقدر تقراه أو تعيد كتابته.

- [[el.textContent]] ← **الكلام** اللي داخله. وإذا عطيته قيمة، يبدّل الكلام.
- [[el.innerHTML]] ← الكلام **مع الـ tags حقته**. وإذا عطيته قيمة، يبني عناصر حقيقية.
- [[input.value]] ← اللي كتبه المستخدم في المربع. ودايمًا **string**.
- [[el.style.color = "red"]] ← تصبغ property وحدة مباشرة.
- [[el.classList.add("done")]] ← تحط عليه CSS class جاهز (أرتب من سطور style كثيرة).
- [[el.setAttribute("href", "…")]] ← تغيّر attribute.`
  },
  'dom-create': {
    en: `Adding something new to the page is like adding a sticker to an album, always in 3 moves:

1. **Make** the sticker: [[document.createElement("td")]]. It is in your hand, not in the album yet.
2. **Write** on it: [[cell.textContent = "90"]].
3. **Stick** it in: [[row.appendChild(cell)]].

For a table row you repeat this: make the [[tr]], make each [[td]] and stick it into the row, then stick the row into the [[tbody]]. Until the last [[appendChild]], nothing shows on the page.`,
    ar: `إنك تضيف شي جديد للصفحة مثل ما تضيف ستيكر في ألبوم، ودايمًا 3 حركات:

1. **سوّ** الستيكر: [[document.createElement("td")]]. هو في يدك، مو في الألبوم للحين.
2. **اكتب** عليه: [[cell.textContent = "90"]].
3. **الصقه**: [[row.appendChild(cell)]].

وحق صف الجدول تعيد نفس الشي: تسوي الـ [[tr]]، وتسوي كل [[td]] وتلصقه في الصف، وبعدين تلصق الصف في الـ [[tbody]]. ولين آخر [[appendChild]]، ما يطلع شي في الصفحة.`
  },
  'events-basics': {
    en: `An event listener is a doorbell.

[[button.addEventListener("click", function () { … })]] means: "on **this button**, when the bell **click** rings, do this".

- The first argument is which bell: [["click"]], [["submit"]], [["keydown"]]…
- The second is the function to run. You give the function itself, you do not call it: [[handleClick]], not [[handleClick()]].
- The browser hands your function an **event** object with the details: [[event.target]] is the element that was actually clicked.`,
    ar: `الـ event listener مثل جرس الباب.

[[button.addEventListener("click", function () { … })]] يعني: "على **هالزر**، لما يدق جرس الـ **click**، سوّ جذي".

- أول argument هو أي جرس: [["click"]] أو [["submit"]] أو [["keydown"]]…
- والثاني هو الـ function اللي تشتغل. تعطيه الـ function نفسها وما تناديها: [[handleClick]]، مو [[handleClick()]].
- والـ browser يعطي الـ function حقتك **event** object فيه التفاصيل: [[event.target]] هو العنصر اللي انضغط عليه فعلًا.`
  },
  'events-ways': {
    en: `There are three ways to connect a bell, from the oldest to the best:

1. In the HTML: [[<button onclick="...">]]. Works, but mixes code into the page.
2. As a property: [[btn.onclick = function () { … }]]. Only **one** function fits; a second one replaces the first.
3. [[btn.addEventListener("click", fn)]]. You can attach **many**, and remove one later with [[removeEventListener]]. Use this one.

The function can be written three ways (a named function, an anonymous [[function () { }]], or an arrow [[() => { }]]); all three do the same job here.`,
    ar: `في ثلاث طرق توصّل فيها الجرس، من الأقدم للأحسن:

1. في الـ HTML: [[<button onclick="...">]]. يشتغل، بس يخلط الكود مع الصفحة.
2. كـ property: [[btn.onclick = function () { … }]]. يشيل function **وحدة** بس، والثانية تمسح الأولى.
3. [[btn.addEventListener("click", fn)]]. تقدر تركّب **أكثر من وحدة**، وتشيل وحدة بعدين بـ [[removeEventListener]]. استخدم هذي.

والـ function تنكتب بثلاث أشكال (function لها اسم، أو anonymous [[function () { }]]، أو arrow [[() => { }]])، والثلاث يسوون نفس الشغل هني.`
  },
  'events-forms': {
    en: `When a form is submitted, the browser's old habit is to **send the data and reload the page**, which wipes everything your JavaScript did.

- Listen for [["submit"]] on the **form**, not for click on the button. That way pressing Enter also counts, and [[required]] is still checked.
- The first line inside is [[event.preventDefault()]]: "stop, do not reload, I will handle this myself".
- Then read the inputs ([[input.value]]), do the work, and clear the boxes if you want.`,
    ar: `لما الـ form ينرسل، عادة الـ browser القديمة إنه **يرسل البيانات ويعيد تحميل الصفحة**، وهذا يمسح كل اللي سواه الـ JavaScript حقك.

- اسمع الـ [["submit"]] على **الـ form**، مو الـ click على الزر. جذي ضغطة Enter تنحسب بعد، والـ [[required]] يتشيّك عليه.
- أول سطر داخل هو [[event.preventDefault()]]: "وقف، لا تعيد التحميل، أنا بتصرف".
- بعدين اقرأ الـ inputs ([[input.value]])، وسوّ الشغل، وفضّي المربعات إذا تبي.`
  },
  'events-validation': {
    en: `Validation is the guard at the door: check every answer **before** letting the form in.

- Empty? [[value.trim() === ""]] (so spaces alone do not pass).
- Not a number? [[isNaN(value)]].
- Checkbox ticked? [[box.checked]] is [[true]] or [[false]].
- Which radio? loop over them and find the one whose [[checked]] is true.
- Dropdown? [[select.value]].

If something is wrong: show a message and stop ([[return]]). Only when every check passes do you continue.`,
    ar: `الـ validation مثل الحارس على الباب: شيّك على كل جواب **قبل** ما تدخّل الـ form.

- فاضي؟ [[value.trim() === ""]] (عشان المسافات بروحها ما تعدّي).
- مو رقم؟ [[isNaN(value)]].
- الـ checkbox مصحّح؟ [[box.checked]] يكون [[true]] أو [[false]].
- أي radio؟ سوّ loop عليهم ودوّر اللي الـ [[checked]] حقه true.
- الـ dropdown؟ [[select.value]].

إذا في شي غلط: اعرض رسالة ووقف ([[return]]). وبس لما كل الفحوصات تنجح تكمّل.`
  },
  'events-flow': {
    en: `- **Page loading**: you cannot ring a bell on a door that is not built yet. Run your code after the HTML exists: put the script at the end of the body, or wait for [[DOMContentLoaded]].
- **Bubbling**: a click on a cell is like a shout in a small room. The cell hears it first, then the row, then the table, up to the document. [[event.stopPropagation()]] closes the door so it goes no further.
- **Delegation**: instead of a guard on every cell, put **one** guard on the table and let him ask "who shouted?" with [[event.target]]. It even works for rows you add later.`,
    ar: `- **تحميل الصفحة**: ما تقدر تدق جرس على باب للحين ما انبنى. شغّل الكود بعد ما يكون الـ HTML موجود: حط الـ script في آخر الـ body، أو انتظر الـ [[DOMContentLoaded]].
- الـ **Bubbling**: الضغطة على خانة مثل صرخة في غرفة صغيرة. الخانة تسمعها أول، بعدين الصف، بعدين الجدول، لين الـ document. والـ [[event.stopPropagation()]] يسكّر الباب عشان ما تروح أبعد.
- الـ **Delegation**: بدل ما تحط حارس على كل خانة، حط حارس **واحد** على الجدول وخلّه يسأل "منو اللي صرخ؟" بـ [[event.target]]. ويشتغل حتى على الصفوف اللي تضيفها بعدين.`
  },
  'regex-basics': {
    en: `A regex is a **stencil** that you hold over a piece of text to see if it fits.

- [[^]] is "must start here" and [[$]] is "must end here". With both, the **whole** text has to fit.
- [[[a-z]]] is "one letter from a to z", [[\\d]] is "one digit".
- [[+]] is "one or more of the thing before", [[*]] is "zero or more", [[?]] is "maybe one", [[{3}]] is "exactly three".

So [[/^[A-Z]\\d{3}$/]] reads: a capital letter, then exactly three digits, and nothing else. [[pattern.test(text)]] answers [[true]] or [[false]].`,
    ar: `الـ regex مثل **قالب مفرّغ** تحطه على النص عشان تشوف يركب أو لا.

- الـ [[^]] يعني "لازم يبدأ من هني"، والـ [[$]] يعني "لازم ينتهي هني". ومع الثنتين، النص **كله** لازم يركب.
- [[[a-z]]] يعني "حرف واحد من a لين z"، و [[\\d]] يعني "رقم واحد".
- الـ [[+]] يعني "واحد أو أكثر من اللي قبله"، والـ [[*]] "صفر أو أكثر"، والـ [[?]] "يمكن واحد"، و [[{3}]] "ثلاثة بالضبط".

يعني [[/^[A-Z]\\d{3}$/]] تنقرأ: حرف كبير، بعدين ثلاث أرقام بالضبط، وما في شي ثاني. و [[pattern.test(text)]] يجاوب [[true]] أو [[false]].`
  }
};
LESSONS.forEach(L => { const s = SIMPLER[L.id]; if (!s) return; L.simpler = s.en; if (LESSONS_AR[L.id]) LESSONS_AR[L.id].simpler = s.ar; });

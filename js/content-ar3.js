/* Arabic versions of the lessons added from the instructor's notes. */
LESSONS_AR['js-include-output'] = {
  title: 'إضافة الـ JavaScript للصفحة وطرق الإخراج',
  big: `قبل ما يشتغل أي كود JavaScript، لازم يكون مربوط بالصفحة. النوتات تشرح ثلاث طرق للربط، وخمس طرق يكلّم فيها الكود المستخدم: الـ console، والصفحة نفسها، وثلاث أنواع من الـ pop-up.`,
  simple: `**ثلاث طرق تضيف فيها JavaScript**
- **Inline**: داخل attribute في الـ HTML، مثل [[<button onclick="alert('Hello!')">]]. سريعة بس تخرّب الترتيب في الكود الكبير.
- **Internal**: داخل [[<script>]] في الـ head أو في آخر الـ body.
- **External**: في ملف منفصل، تربطه بـ [[<script src="script.js"></script>]]. هذي الأفضل للمشاريع الحقيقية: الـ HTML يبقى مرتب، والكود تقدر تستخدمه في أكثر من صفحة.

**الـ [[defer]]**: [[<script defer src="script.js"></script>]] في الـ head ينتظر لين الـ HTML يخلص قبل ما يشغّل الكود. النوتات تقول إنه يعطي نفس نتيجة [[DOMContentLoaded]].

**طرق الإخراج**
- [[console.log('msg')]] ← في الـ console حق الـ browser (F12). الأفضل للتجربة.
- [[document.write('text')]] ← يكتب على الصفحة. تجنّبه في المشاريع الحقيقية، لأنه بعد ما تتحمّل الصفحة يمسحها كلها.
- [[alert('msg')]] ← رسالة pop-up.
- [[prompt('Enter your name:')]] ← pop-up فيه مربع كتابة، ويرجّع اللي كتبه المستخدم كـ **string** (أو [[null]] إذا ضغط Cancel).
- [[confirm('Are you sure?')]] ← pop-up فيه OK و Cancel، ويرجّع [[true]] أو [[false]].`,
  deeper: [
    null,
    { task: 'شغّله واقرأ الـ console. في هالـ preview، الـ alert والـ prompt والـ confirm تطلع في الـ console (الـ pop-ups ممنوعة هني). غيّر الشرط على [[ok]] عشان تشوف الحالتين.' },
    `**أي واحد في الامتحان؟** ميد 2025-26 استخدم ملف **external** ([[<script src="script.js">]] في آخر الـ body). وعشان يعرض النتيجة استخدم [[textContent]]، مو [[document.write]] ولا [[alert]].`
  ],
  points: [
    'Inline (onclick="…")، و internal (<script>…</script>)، و external (<script src="file.js"></script>).',
    'الـ external هو الأفضل: HTML مرتب، وكود تقدر تعيد استخدامه.',
    'الـ [[defer]] يشغّل الملف الخارجي بعد ما يخلص الـ HTML (مثل DOMContentLoaded).',
    'الـ console.log للتجربة، والـ alert رسالة، والـ prompt إدخال نص (string)، والـ confirm يرجّع true أو false.',
    'تجنّب الـ document.write في الصفحات الحقيقية، واكتب داخل العناصر بالـ textContent.'
  ],
  exam: [
    'Q1 في 2025-26: "At the end of the <body>, add a <script> tag to link an external JavaScript file named script.js" (درجة).',
    'بأسلوب MCQ: "Which method returns true or false?" والجواب confirm(). و "Which returns what the user typed?" والجواب prompt().'
  ],
  mistakes: [
    'لما يكون للـ script عنده src، الكود اللي تكتبه داخل التاق ما يشتغل.',
    'الـ prompt دايمًا يرجّع string.'
  ],
  summary: [
    'Inline أو internal أو external، والـ external مع defer أو في آخر الـ body.',
    'console.log و document.write و alert و prompt (string) و confirm (boolean).',
    'في الصفحات الحقيقية، اعرض النتائج بالـ textContent.'
  ],
  recall: [
    { q: 'أي طريقة لإضافة الـ JavaScript تخلي الـ HTML مرتب، وتخلي صفحات كثيرة تستخدم نفس الكود؟', o: ['Inline', 'Internal', 'External', 'كلهم نفس الشي'], why: 'ملف .js منفصل تربطه بـ src.' },
    { q: 'وش يرجّع [[confirm("Delete?")]] لما المستخدم يضغط OK؟', why: 'الـ confirm يرجّع true (OK) أو false (Cancel).' },
    { q: 'وش يسوي [[<script defer src="app.js"></script>]] إذا كان في الـ head؟', o: ['يشغّل الكود قبل الـ HTML', 'يشغّل الكود بعد ما يخلص الـ HTML', 'ما يشغّل الكود أبد', 'يشغّله مرتين'], why: 'الـ defer ينتظر الـ HTML، مثل DOMContentLoaded.' }
  ],
  challenge: `1. في الـ HTML، أضف زر الـ id حقه **hiBtn**، ويستخدم [[onclick]] **inline** عشان ينادي [[alert('Hi')]].
2. في تاب الـ JS، استخدم [[confirm('Continue?')]] واحفظ النتيجة في [[answer]].
3. استخدم [[prompt('Name?')]] واحفظ النتيجة في [[userName]].
4. اطبع [[answer]] بـ console.log.`
};

LESSONS_AR['js-more-control'] = {
  title: 'الـ switch والـ while والـ for…of والـ typeof والـ scope',
  big: `النوتات تضيف أدوات ثانية للقرارات والتكرار: الـ [[switch]] لما يكون عندك قيم ثابتة كثيرة، والـ [[while]] لـ "كرر لين"، والـ [[for…of]] للقوائم، والـ [[typeof]] عشان تعرف نوع القيمة، وقواعد الـ **scope** (وين تقدر تستخدم المتغير).`,
  simple: `الـ **switch** يقارن قيمة وحدة مع أكثر من [[case]]. الـ [[break]] يوقفه، وبدونه يشتغل الـ case اللي بعده بعد (اسمه fall-through). والـ [[default]] يشتغل إذا ما انطبق أي case.

الـ **while** يكرر طول ما الشرط true. غيّر المتغير داخله، وإلا بيكرر للأبد.

الـ **for…of** يمر على **القيم** حق الـ array (أو الـ NodeList): [[for (let num of numbers) { … }]].

**الـ Arrays**: [[push(x)]] يضيف في الآخر، و [[pop()]] يشيل آخر عنصر، و [[arr[0]]] هو أول عنصر.

الـ **typeof** يرجّع النوع كـ string: [[typeof 25]] ← "number"، و [[typeof 'Ali']] ← "string"، و [[typeof true]] ← "boolean"، و [[typeof undefined]] ← "undefined".
الـ **null** = "ولا شي"، وتحطه أنت عن قصد. والـ **undefined** = المتغير موجود بس ما له قيمة للحين ([[let x;]]).

**الـ Scope**
- **Global**: متغير معرّف برّا الـ functions، وتقدر تستخدمه في أي مكان.
- **Local**: متغير معرّف داخل function (أو داخل [[{ }]] مع let أو const)، وتقدر تستخدمه هناك بس. وبرّاها يطلع error "is not defined".
- الـ [[var]] الـ scope حقه هو الـ function، أما الـ [[let]] والـ [[const]] فالـ scope حقهم هو الـ block.`,
  deeper: [
    { task: 'غيّر [[day]] لـ "Friday" وبعدين لـ "Sunday". بعدين شيل [[break]] وحدة وشوف الـ fall-through.' },
    { task: 'شغّله، بعدين شيل الـ comment عن آخر سطر واقرأ الـ error: الـ [[localVar]] موجود بس داخل الـ function.' }
  ],
  points: [
    'الـ switch: قيم الـ case مع break، والـ default إذا ما انطبق شي.',
    'إذا نسيت الـ break ← الـ case اللي بعده يشتغل بعد.',
    'while (condition) { … تحديث … }، ولازم تغيّر المتغير دايمًا.',
    'الـ for…of يعطيك القيم، والـ push يضيف في الآخر، والـ pop يشيل الأخير.',
    'الـ typeof يرجّع string: "number" أو "string" أو "boolean" أو "undefined" أو "object".',
    'المتغيرات الـ local ما تبين برّا الـ function، والـ let والـ const الـ scope حقهم الـ block، والـ var الـ scope حقه الـ function.'
  ],
  exam: [
    'أسئلة الإخراج: "What is printed?" لـ switch بدون break، أو لـ while loop.',
    'تقدر تكتب Q2.B بـ for…of بدل forEach: [[for (const row of rows) { … }]].'
  ],
  mistakes: [
    'بدون break، الـ case A يكمّل للـ case B، فتصير قيمة msg في الآخر "Good".',
    'بدون i++ الشرط ما يصير false أبد: يعني infinite loop.'
  ],
  summary: [
    'switch + break + default، والـ while يحتاج تحديث داخله.',
    'الـ for…of يمر على القيم، والـ push والـ pop يغيّرون آخر الـ array.',
    'الـ typeof يعطيك النوع، والمتغيرات الـ local تبقى داخل الـ function أو الـ block حقها.'
  ],
  recall: [
    { q: 'وش يطبع؟ [[let x = 2; switch (x) { case 2: console.log("two"); case 3: console.log("three"); break; default: console.log("other"); }]]', why: 'ما في break بعد case 2، فيكمّل لـ case 3 اللي فيه break.' },
    { q: 'وش يرجّع [[typeof "85"]]؟', why: 'علامات التنصيص تخليه string، والـ typeof يرجّع اسم النوع كـ string.' },
    { q: 'متغير معرّف بـ let داخل function، واستخدمته برّاها. وش يصير؟', o: ['يشتغل عادي', 'قيمته undefined', 'ReferenceError: not defined', 'يصير global'], why: 'الـ scope حقه local: يعني مو موجود برّا.' }
  ],
  challenge: `1. اكتب [[dayType(day)]] باستخدام **switch**: الـ "Friday" والـ "Saturday" يرجّعون **"Weekend"**، وأي يوم ثاني يرجّع **"Weekday"** (استخدم [[default]]).
2. اكتب [[countdown(n)]] باستخدام **while** loop، وترجّع array من n لين 1. مثلًا: countdown(3) ← [3, 2, 1].`
};

LESSONS_AR['js-functions-deeper'] = {
  title: 'الـ Functions بعمق: الـ defaults والـ ...args والـ callbacks والـ constructors والـ this',
  big: `النوتات تروح أبعد من "الـ function ترجّع قيمة": قيم افتراضية للـ parameters، و functions تاخذ أي عدد من القيم، وإنك ترسل function لـ function ثانية (الـ callbacks، وهي الفكرة اللي ورا كل event listener)، و objects فيها methods تستخدم [[this]]، و constructor functions تسوي objects كثيرة متشابهة بـ [[new]].`,
  simple: `- **Default parameter**: [[function add(a, b = 0)]] ← إذا ما انرسل الـ b، قيمته 0.
- **Rest parameter**: [[function sum(...args)]] ← كل القيم اللي ترسلها توصل كـ **array** اسمه args.
- **Callback**: function ترسلها لـ function ثانية عشان تناديها بعدين: [[process(done)]]. وكل [[addEventListener('click', handler)]] يستخدم callback.
- **Object method و this**: داخل الـ method، الـ [[this]] معناه "نفس الـ object": [[this.speed += 10]].
- **تضيف أو تغيّر properties**: [[person.age = 26]] يغيّر، و [[person.gpa = 3]] يضيف key جديد.
- **Constructor function**: function تستخدمها مع [[new]] عشان تسوي objects. والعادة إن اسمها يبدأ بحرف كبير:
[[function Person(name, age) { this.name = name; this.age = age; }]] ← [[let alice = new Person('Alice', 25);]]`,
  deeper: [
    { task: 'شغّله. بعدين نادِ [[add(10)]] و [[sum(5, 5, 5)]]، وسوّ Person ثاني.' }
  ],
  points: [
    'الـ Default: [[b = 0]] في قائمة الـ parameters.',
    'الـ Rest: [[...args]] يجمع كل القيم في array.',
    'الـ Callback: ترسل اسم الـ function بدون ()، واللي يستقبلها هو اللي يناديها.',
    'الـ this داخل الـ method = الـ object اللي يملك الـ method.',
    'الـ Constructor: function Name(…) { this.x = x; } وتسوي منه objects بـ new Name(…).',
    'obj.newKey = value يضيف property لـ object موجود.'
  ],
  exam: [
    'كل event listener في Q2 هو callback: [[addEventListener(\'submit\', function (event) { … })]].',
    'أسئلة إخراج قصيرة: "What does add(5) return when b = 0 is a default?" والجواب 5.'
  ],
  mistakes: [
    'الـ done() تشتغل على طول وترسل النتيجة حقتها (undefined)، مو الـ function نفسها.',
    'بدون new، الـ this ما يكون object جديد، وقيمة p تصير undefined.'
  ],
  summary: [
    'الـ defaults تعبّي القيم الناقصة، والـ ...args تجمع قيم كثيرة في array.',
    'الـ callback هو function تعطيها لـ function ثانية (مثل الـ event handlers).',
    'الـ objects ممكن يكون فيها methods تستخدم this، والـ constructors مع new يسوون objects كثيرة.'
  ],
  recall: [
    { q: 'مع [[function add(a, b = 0) { return a + b; }]]، وش قيمة [[add(7)]]؟', why: 'الـ b ياخذ القيمة الافتراضية 0.' },
    { q: 'داخل [[function sum(...args)]]، وش قيمة args لما تنادي [[sum(1, 2, 3)]]؟', why: 'الـ rest parameters توصل كـ array.' },
    { q: 'داخل method في الـ object اسمه [[car]]، الـ [[this.speed]] يشير لإيش؟', o: ['متغير global اسمه speed', 'الـ property اسمها speed في الـ car', 'الـ speed حق الـ window', 'ولا شي'], why: 'الـ this هو الـ object اللي الـ method تابعة له.' }
  ],
  challenge: `1. [[greet(name = "Student")]] ترجّع **"Hello, NAME"** (والاسم الافتراضي "Student").
2. [[sum(...nums)]] ترجّع مجموع أي عدد من القيم.
3. [[applyTwice(fn, x)]] تنادي الـ callback مرتين: يعني ترجّع [[fn(fn(x))]].
4. Constructor اسمه [[Course(code, credits)]] فيه method اسمها [[info()]] ترجّع **"CODE (N credits)"** باستخدام [[this]]. وسوّ [[c1 = new Course("ITCS333", 3)]].`
};

LESSONS_AR['js-json-strings'] = {
  title: 'الـ JSON والـ string functions (trim و length و parseInt و parseFloat)',
  big: `البيانات تنتقل بين البرامج كنص. والـ **JSON** هو الشكل المعتمد عشان تكتب الـ objects كنص. ولأن كل شي تقراه من الصفحة يجيك string، تحتاج الأدوات اللي في النوتات: [[trim]] و [[length]] و [[parseInt]] و [[parseFloat]].`,
  simple: `الـ **JSON** (JavaScript Object Notation) شكله مثل الـ object بس هو **string**، والـ keys حقه لازم تكون بين علامات تنصيص مزدوجة: [['{"name": "Bob", "age": 30}']].
- [[JSON.parse(text)]] ← يحوّل الـ JSON string لـ object حقيقي.
- [[JSON.stringify(obj)]] ← يحوّل الـ object لـ JSON string (مثلًا عشان تعرضه أو ترسله).

**الـ String functions**
- [[value.trim()]] ← يشيل المسافات من البداية والنهاية: "  Ali Ahmed  " ← "Ali Ahmed".
- [[value.length]] ← عدد الحروف ("123" ← 3). وهو property، يعني بدون ().
- [[parseInt("123.33")]] ← 123 (رقم صحيح).
- [[parseFloat("123.33")]] ← 123.33.
- الاثنين يرجّعون [[NaN]] (يعني Not a Number) إذا النص مو رقم: [[parseFloat("abc")]] ← NaN.`,
  deeper: [
    { task: 'أضف key اسمه "city" للـ JSON text وسوّ له parse مرة ثانية. بعدين جرّب [[parseInt("12px")]] و [[parseFloat("abc")]].' },
    `في Exercise 4 من النوتات، البيانات الصحيحة تنعرض كـ JSON: [[output.textContent = JSON.stringify(data)]].`
  ],
  points: [
    'الـ JSON نص، والـ keys والـ strings فيه تنكتب بعلامات تنصيص مزدوجة.',
    'JSON.parse(string) ← object، و JSON.stringify(object) ← string.',
    'الـ trim() يشيل المسافات اللي على الأطراف، والـ length هو property (بدون أقواس).',
    'الـ parseInt ← رقم صحيح، والـ parseFloat ← يخلي الكسور، والاثنين يعطون NaN إذا النص مو رقم.',
    'الـ Number("12px") يعطي NaN، بس الـ parseInt("12px") يعطي 12.'
  ],
  exam: [
    'الـ Validation من النوتات: [[if (name.trim() == "")]] ← يعني الحقل فاضي.',
    'تحويل الدرجة: [[Number(cell.textContent)]] (حل 2025-26) أو [[parseFloat(...)]]، والاثنين صح.'
  ],
  mistakes: [
    'الـ length هو property، مو function.',
    'الـ parse يقرأ JSON text ويحوّله لـ object، والـ stringify يسوي العكس.'
  ],
  summary: [
    'الـ parse: من نص ← لـ object، والـ stringify: من object ← لـ نص.',
    'الـ trim و length و parseInt و parseFloat ينظّفون الإدخال ويحوّلونه.',
    'الـ NaN معناه "مو رقم".'
  ],
  recall: [
    { q: 'أي واحد يحوّل [[\'{"gpa": 3.5}\']] لـ object؟', why: 'الـ JSON.parse.' },
    { q: 'وش قيمة [[parseInt("85.9")]]؟', why: 'الـ parseInt ياخذ الجزء الصحيح بس.' },
    { q: 'وش يعطي [["  hi  ".trim().length]]؟', why: 'الـ trim يشيل المسافات، فيبقى "hi".' }
  ],
  challenge: `عندك [[const text = '{"name": "  Ali Ahmed  ", "gpa": "3.75"}';]]
1. سوّ له parse واحفظه في [[student]].
2. [[cleanName]] = الاسم بدون المسافات اللي على الأطراف.
3. [[gpa]] = الـ gpa كـ رقم (3.75).
4. [[nameLength]] = عدد الحروف في cleanName.
5. [[out]] = JSON string من [[{ name: cleanName, gpa: gpa }]].`
};

LESSONS_AR['dom-navigate'] = {
  title: 'التنقل في الـ DOM وselectors زيادة',
  big: `لما يكون عندك عنصر واحد، تقدر تروح منه للأب والعيال والإخوان، وتبحث **داخله**، وتختار العناصر بأي attribute. والنوتات بعد تذكر أكثر الـ properties اللي بتغيّرها: [[id]] و [[className]] و [[href]] و [[src]] و [[value]].`,
  simple: `**الـ Root nodes**: [[document]] (الصفحة كاملة)، و [[document.body]]، و [[document.head]].

**العائلة**
- [[firstChild]] و [[lastChild]] و [[childNodes]] ← فيها **text nodes** (المسافات الفاضية اللي بين التاقات).
- [[firstElementChild]] و [[lastElementChild]] و [[children]] ← **elements بس**. استخدم هذي.
- [[parentNode]] و [[nextSibling]] و [[previousSibling]].

**selectors زيادة**
- بالـ attribute: [[document.querySelector("[name='fname']")]] أو [[querySelector("input[name='fname']")]].
- **البحث داخل عنصر (nested search)**: [[document.getElementById('myForm').querySelector('input')]] ← يبحث داخل الـ form بس. كل element فيه querySelector و querySelectorAll و getElementsByTagName و getElementsByClassName، بس الـ [[getElementById]] موجود **في الـ document بس**.
- الـ [[getElementsByClassName]] يرجّع HTMLCollection (live)، والـ [[querySelectorAll]] يرجّع NodeList (static).

**الـ Properties**: [[link.href]] و [[img.src]] و [[input.value]] و [[el.id]] و [[el.className = 'highlight']].`,
  deeper: [
    { task: 'شغّله واقرأ الـ console. بعدين اختار الـ input بالـ name attribute حقه وغيّر الـ value.' },
    `**methods التعديل اللي في النوتات**`,
    null
  ],
  points: [
    'الـ document و document.body و document.head هم الـ roots.',
    'الـ firstChild والـ childNodes فيها text nodes، أما الـ firstElementChild والـ children فـ elements بس.',
    'الـ Attribute selector: [[querySelector("input[name=\'fname\']")]].',
    'البحث داخل عنصر: element.querySelector(…)، والـ getElementById في الـ document بس.',
    'الـ replaceChild(new, old) والـ insertBefore(new, reference) تناديهم على الأب.',
    'الـ href و src و value و id و className تقدر تقراها وتغيّرها.'
  ],
  exam: [
    'MCQ: "Which method cannot be called on an element, only on document?" والجواب getElementById.',
    'سؤال إخراج: "What does ul.firstChild return?" والجواب text node (مسافة فاضية)، مو أول li.'
  ],
  mistakes: [
    'الـ getElementById موجود في الـ document بس.',
    'الـ firstChild ممكن يكون الـ text node حق المسافة الفاضية.'
  ],
  summary: [
    'استخدم الـ children والـ firstElementChild والـ lastElementChild عشان تتنقل بين العناصر.',
    'ابحث داخل عنصر بـ element.querySelector، واختار بالـ attribute بـ [name=…].',
    'الـ replaceChild والـ insertBefore والـ removeChild تناديهم على الأب.'
  ],
  recall: [
    { q: 'أي واحد يرجّع أول **element** ولد للـ ul، ويتخطى المسافات الفاضية؟', why: 'الـ firstElementChild يتخطى الـ text nodes.' },
    { q: 'أي واحد من هذول **مو** صحيح؟', why: 'الـ getElementById موجود في الـ document بس.' },
    { q: 'شلون تختار [[<input name="email">]]؟', why: 'attribute selector بين أقواس مربعة.' }
  ],
  challenge: `باستخدام الـ HTML اللي عندك:
1. احفظ نص **آخر** li في [[ul#menu]] في [[lastText]] (استخدم lastElementChild).
2. غيّر الـ **href** حق الرابط لـ **https://uob.edu.bh**.
3. اختار الـ input بالـ **name** attribute حقه "email" (داخل **#regForm**، يعني nested search)، وخلِّ قيمته **test@uob.edu.bh**.
4. **استبدل** الفقرة [[#old]] بـ [[<span>]] جديد مكتوب فيه **Replaced**.
5. **أضف** li جديد مكتوب فيه "Start" **قبل** أول li في الـ menu.`
};

LESSONS_AR['events-ways'] = {
  title: 'طرق ربط الـ events: الـ onclick و3 أشكال للـ listener وتفاصيل الماوس والكيبورد',
  big: `النوتات تشرح كل الطرق اللي تخلي الصفحة ترد على event، من الطريقة القديمة [[onclick="…"]] في الـ HTML لين الثلاث أشكال حق [[addEventListener]]. وتنصح بشكل واحد: function لها اسم وتاخذ الـ event (اسمها "3e"). وبعد تذكر التفاصيل اللي تاخذها من الـ event: أي زر انضغط، وأي عنصر، ووين الماوس، وإذا كان Ctrl مضغوط.`,
  simple: `**الطرق القديمة**
- في الـ HTML: [[<button onclick="alert('Clicked!')">]] و [[<div onmouseover="this.style.backgroundColor='red'">]].
- في الـ JS: [[document.getElementById('myButton').onclick = function () { … };]] (يقبل handler واحد بس لكل event).

**الـ addEventListener، ثلاث أشكال** (النوتات تسميهم 1 و2 و3):
- **1 · function expression**: [[btn.addEventListener('click', function (event) { … })]]. تحكّم كامل.
- **2 · arrow function**: [[btn.addEventListener('click', () => { … })]] أو [[(e) => { … }]]. مختصرة.
- **3 · named function**: [[function printLog(e) { … }]] وبعدين [[btn.addEventListener('click', printLog)]]. **بدون ()**. والنوتات تقول: "Always use method 3e, it is much more organised."

**تشيل listener**: [[btn.removeEventListener('click', printLog)]]. يشتغل بس مع function لها اسم.

**تفاصيل الـ event**
- [[event.target]] ← العنصر.
- [[event.ctrlKey]] ← true إذا كان Ctrl مضغوط.
- [[e.key]] ← الزر ("Enter" أو "a").
- [[e.clientX]] و [[e.clientY]] ← مكان الماوس.

**الماوس**: [[click]] و [[dblclick]] و [[mousedown]] (تضغط) و [[mouseup]] (تشيل إصبعك) و [[mouseover]] (يدخل الماوس) و [[mouseout]] (يطلع) و [[mousemove]].
**الكيبورد**: [[keydown]] (تضغط الزر) و [[keyup]] (تشيل إصبعك).`,
  deeper: [
    { task: 'اضغط الزر، وسوّ دبل كلك، واضغط مع Ctrl. مرّر الماوس على الصندوق، واكتب في الـ input واضغط Enter. بعدين اضغط "Stop listening" واضغط الزر مرة ثانية.' }
  ],
  points: [
    'الـ HTML attribute: onclick="…" و onmouseover="…" (inline).',
    'الـ el.onclick = function () {…} يقبل handler واحد بس.',
    'الـ addEventListener: (1) function(event)، (2) arrow، (3) function لها اسم (ترسلها بدون ()).',
    'النوتات تنصح بـ 3e: function لها اسم وتستقبل الـ event.',
    'الـ removeEventListener يحتاج نفس الـ function اللي لها اسم.',
    'الـ e.target و e.key و e.ctrlKey و e.clientX و e.clientY.'
  ],
  exam: [
    'تحذير من النوتات: [[document.addEventListener(\'click\', printLog)]]، مو [[printLog()]].',
    'MCQ: "mousedown vs mouseup"، و "keydown vs keyup"، و "which property gives the pressed key?" والجواب e.key.'
  ],
  mistakes: [
    'كل arrow function هي function مختلفة، فعشان تشيلها لازم تعطيه نفس المرجع (reference).',
    'داخل الـ attribute، الـ JS string يحتاج علامات تنصيص حقته (single quotes).'
  ],
  summary: [
    'الـ inline onclick يشتغل، بس الـ addEventListener أفضل (الـ JS يبقى منفصل).',
    'الأفضل function لها اسم وتاخذ الـ event (3e)، وترسلها بدون ().',
    'الـ e.key و e.ctrlKey و e.clientX/Y و e.target يعطونك التفاصيل.'
  ],
  recall: [
    { q: 'أي شكل للـ event listeners تنصح فيه النوتات؟', o: ['onclick inline في الـ HTML', 'el.onclick = …', 'function لها اسم وتستقبل الـ event (3e)', 'arrow function دايمًا'], why: '"Always use method (3e). It is much more organised."' },
    { q: 'متى يقدر [[removeEventListener]] يشيل listener؟', o: ['دايمًا', 'بس إذا أرسلت نفس الـ function اللي لها اسم', 'بس للـ click', 'أبد'], why: 'يحتاج نفس المرجع حق الـ function.' },
    { q: 'أي event يصير لما **تشيل إصبعك** عن زر الماوس؟', o: ['mousedown', 'mouseup', 'mouseout', 'click بس'], why: 'الـ mouseup.' }
  ],
  challenge: `1. اكتب function **لها اسم** [[showTarget(e)]] تكتب [[e.target.id]] داخل **#out**، واربطها بـ **#btn** على **click** (طريقة 3e).
2. أضف listener على **keydown** في **#name**: لما يكون [[e.key]] هو **"Enter"**، اكتب **"Enter pressed"** داخل **#out**.
3. أضف listener على **dblclick** في **#btn** يشيل الـ click listener بـ [[removeEventListener]].`
};

LESSONS_AR['events-validation'] = {
  title: 'الـ Form validation: الحقل الفاضي والأرقام والـ checkbox والـ radio والـ select والـ submit()',
  big: `قبل ما تستخدم بيانات الـ form، تتأكد منها. والنوتات تعطيك قائمة قصيرة من الفحوصات وتقول ركّز عليها: **الحقل الفاضي**، و**الرقم الحقيقي**، و**الطول**. والـ tutorial يضيف الـ checkboxes والـ radio buttons والقوائم المنسدلة، وإرسال الـ form من الـ JavaScript.`,
  simple: `**فحوصات النوتات** (على الـ strings اللي تقراها من الـ inputs):
- فاضي: [[value == ""]]، والأفضل [[value.trim() == ""]] (لأن المسافات بس بعد تنحسب فاضي).
- Null أو undefined: [[value == null]] (مفيد بعد [[prompt()]] لما المستخدم يضغط Cancel).
- **رقم حقيقي** (استخدم هذا): [[!isNaN(v) && isFinite(v)]].
- [[isNaN(v)]] ← true إذا **مو** رقم. و [[isFinite(v)]] ← true إذا رقم محدود (مو infinity).
- الطول: [[value.length > 0]]، أو مثلًا [[id.length == 9]].

**controls ثانية**
- الـ Checkbox: [[terms.checked]] ← true أو false.
- مجموعة Radio: [[document.querySelector("input[name='gender']:checked")]] ← الـ radio المختار (أو [[null]] إذا ما انختار شي)، وبعدين [[.value]].
- الـ Select: [[select.value]] ← القيمة حق الـ option المختار.

**النمط**: داخل الـ submit listener، [[e.preventDefault()]]، بعدين شيك كل حقل، وطلّع رسالة ووقف عند أول مشكلة ([[return]]). وإذا كل شي صح، كمّل، أو أرسل الـ form بـ [[form.submit()]].

والـ [[input]] event يصير مع كل حرف تكتبه (الـ tutorial يستخدمه عشان يرجّع الـ border الأحمر لطبيعته).`,
  deeper: [
    { task: 'سوّ submit والاسم فاضي، ومرة والـ GPA "abc"، ومرة بدون ما تختار الـ terms، ومرة وكل شي صح.' },
    `**ليش "!isNaN(v) && isFinite(v)"؟** الـ [[isNaN("abc")]] يرجّع true (يعني مو رقم). والـ [[isFinite("Infinity")]] يرجّع false. ومع بعض ما يقبلون إلا أرقام حقيقية مثل "3.5". بس فيه فخ: الـ [[isNaN("")]] يرجّع **false** (لأن النص الفاضي يتحوّل لـ 0)، فشيك على الحقل الفاضي أول، مثل ما يسوي المثال.`
  ],
  points: [
    'الفاضي: value.trim() == "".',
    'الرقم الحقيقي: !isNaN(v) && isFinite(v) (وشيك على الفاضي أول).',
    'الطول: value.length (مثلًا 9 أرقام بالضبط للـ ID).',
    'الـ Checkbox ← .checked، والـ radio ← querySelector("input[name=…]:checked")، والـ select ← .value.',
    'سوّ الـ validation داخل الـ submit listener بعد الـ preventDefault، والـ form.submit() يرسله.',
    'الـ input event يصير مع كل تغيير وأنت تكتب.'
  ],
  exam: [
    'Tutorial Exercise 1: "check if studentName is not empty or just whitespace" ← [[studentName.trim() == ""]].',
    'Tutorial Exercise 2: "Ensure the price and quantity are positive numbers" ← [[!isNaN(p) && isFinite(p) && p > 0]].',
    'Tutorial Exercise 4: الـ checkbox بـ [[checked]]، وقيمة الـ radio، وقيمة الـ select، والأخطاء تنعرض في div، والـ border يصير أحمر بـ [[style.border = "2px solid red"]].'
  ],
  mistakes: [
    'الـ isNaN("") يرجّع false، فالحقل الفاضي يبين كأنه رقم.',
    'بدون :checked دايمًا بيرجّع لك أول radio، سواء انختار أو لا.'
  ],
  summary: [
    'شيك على الفاضي (trim)، والرقم الحقيقي (!isNaN && isFinite)، والطول.',
    'الـ checked للـ checkboxes، والـ :checked لمجموعات الـ radio، والـ value للـ select.',
    'سوّ الـ validation في الـ submit handler، وأرسل بـ form.submit() إذا كل شي صح.'
  ],
  recall: [
    { q: 'أي فحص من النوتات معناه "القيمة رقم حقيقي"؟', why: 'مو NaN ومحدود (finite).' },
    { q: 'شلون تعرف إذا [[<input type="checkbox" id="terms">]] مختار؟', why: 'الـ checked يرجّع true أو false.' },
    { q: 'وش يرجّع [[isNaN("")]]؟', why: 'الـ "" يتحوّل لـ 0، و0 رقم، فشيك على النص الفاضي بروحه.' }
  ],
  challenge: `أضف **submit** listener على **#regForm** ينادي [[preventDefault()]] ويكتب رسالة **وحدة** داخل **#msg**:
- الاسم فاضي أو مسافات بس ← **"Name is empty"**
- العمر مو رقم حقيقي (استخدم [[!isNaN && isFinite]]، والفاضي بعد يعتبر غلط) ← **"Age is not a number"**
- الـ terms checkbox مو مختار ← **"Please agree to terms"**
- غير كذا ← **"Welcome NAME"** (الاسم بعد الـ trim)`
};

LESSONS_AR['regex-basics'] = {
  title: 'درس إضافي: أساسيات الـ Regular expressions (regex)',
  big: `**درس إضافي.** النوتات حاطة الـ regex بعد أقسام الـ events على طول، والمحتوى الرسمي يقول "till events". يمكن ما يجي في الميد، بس هو قصير والـ tutorial يستخدمه في الـ validation. الـ regex هو نمط (pattern) لازم النص يطابقه: مثلًا email، أو student ID مثل IT1234567، أو أرقام بس.`,
  simple: `الـ regex ينكتب بين slashes: [[/pattern/flags]].

الرموز اللي في النوتات:
- [[^]] البداية و [[$]] النهاية (يعني النص **كامل** لازم يطابق)
- [[[a-z]]] أي حرف من المجموعة، و [[[0-9]]] أو [[\\d]] رقم
- [[( )]] مجموعة (group)، و [[|]] يعني "أو": [[(cat|dog)]]
- [[?]] مرة أو ولا مرة (اختياري): [[colou?r]] يطابق color و colour
- [[*]] صفر أو أكثر، و [[+]] مرة أو أكثر، و [[{7}]] بالضبط 7 مرات، و [[{2,4}]] من 2 لين 4 مرات
- [[.]] أي حرف (واستخدم [[\\.]] للنقطة الحقيقية)
- الـ Flags: [[i]] يتجاهل الحروف الكبيرة والصغيرة، و [[g]] يدوّر على الكل (global)

الـ Methods:
- [[regex.test(str)]] ← true أو false (استخدمه للـ validation)
- [[str.match(regex)]] ← النتائج اللي طابقت
- [[str.replace(regex, x)]] ← يستبدل النص`,
  deeper: [
    { task: 'جرّب نصوص ثانية: "it1234567" و "IT123" و "user@site" و "colour".' }
  ],
  points: [
    'الـ ^ والـ $ يخلون النص كامل يطابق.',
    'الـ [a-z] مجموعة، والـ \\d رقم، والـ . أي حرف، والـ \\. نقطة حقيقية.',
    'الـ ? اختياري، والـ * صفر أو أكثر، والـ + مرة أو أكثر، والـ {n} بالضبط n، والـ {n,m} بين.',
    'الـ ( ) مجموعة والـ | يعني "أو"، والـ flags هي i (يتجاهل الحروف الكبيرة) و g (كل النتائج).',
    'الـ regex.test(str) ← true أو false للـ validation.'
  ],
  exam: [
    'Tutorial Exercise 4: الـ student ID هو [[/^IT\\d{7}$/]]، والـ gender هو [[/^(male|female)$/]]، والـ username حروف ومسافات 3 أو أكثر مع الـ flag اسمه i.',
    'امتحانات ITCS333 القديمة كان فيها أسئلة MCQ كثيرة عن الـ regex (مثلًا "which string matches /^[0-9]-[0-9]{2,4}$/?").'
  ],
  mistakes: [
    'بدون ^ و $، الـ pattern ممكن يطابق جزء من النص بس.',
    'النقطة لحالها معناها أي حرف، فحط قبلها \\ عشان تصير نقطة حقيقية.'
  ],
  summary: [
    'حط الـ patterns بين ^…$ عشان تتأكد من القيمة كاملة.',
    'الـ \\d و [a-z] و ? و * و + و {n} و ( ) و | هم الرموز الأساسية.',
    'استخدم test() عشان تاخذ true أو false.'
  ],
  recall: [
    { q: 'أي واحد يطابق "IT" وبعدها 7 أرقام بالضبط، وبس؟', why: 'الـ ^ والـ $ يجبرون النص كامل، والـ {7} يعني بالضبط 7.' },
    { q: 'وش معنى [[?]] في [[/colou?r/]]؟', o: ['أي حرف', 'الـ u اختياري (مرة أو ولا مرة)', 'الـ u يتكرر', 'نهاية النص'], why: 'الـ ? = مرة أو ولا مرة.' },
    { q: 'أي method يرجّع true أو false؟', why: 'الـ test يرجّع boolean.' }
  ],
  challenge: `اكتب ثلاث functions ترجّع true أو false باستخدام **regex** و [[test()]]:
1. [[isStudentId(id)]] ← "IT" وبعدها 7 أرقام بالضبط (IT1234567).
2. [[isNineDigits(id)]] ← 9 أرقام بالضبط (123456789).
3. [[isGender(g)]] ← بالضبط "male" أو "female" (استخدم group و |).`
};

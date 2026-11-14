/* Arabic version of the lessons (part 2: lessons 11-20). */
LESSONS_AR['responsive'] = {
  title: 'الـ Responsive design والـ media queries',
  big: `الناس يفتحون صفحتك من الجوال والتابلت والشاشات العريضة. الـ Responsive design معناه صفحة وحدة تتأقلم مع كل شاشة. وفيه أداتين يسوون أغلب الشغل: الـ **viewport meta tag** (من الدرس الأول)، والـ **media queries**.`,
  simple: `الـ media query مثل "if" للـ CSS: [[@media (max-width: 600px) { … }]] معناها "طبّق هالـ rules بس لما يكون عرض الشاشة 600px أو أقل".

- [[max-width]] ← للشاشات الصغيرة (تكتب الـ desktop أول، وبعدين تصلّح للشاشات الصغيرة).
- [[min-width]] ← للشاشات الكبيرة (mobile-first: تكتب للجوال أول، وبعدين تضيف للشاشات الكبيرة).

داخل الـ media query تكتب rules عادية. ولأنها مكتوبة **بعد** وتنطبق، فهي تغلب الـ rules اللي قبلها.`,
  deeper: [
    { task: 'صغّر الـ preview بتصغير نافذة الـ browser (أو غيّر الـ query لـ max-width: 2000px عشان تجرّب). في الشاشات الصغيرة: خفِّ الصندوق B، وخلِّ عرض A و C 45%، والزوايا مدوّرة 15px.' },
    `**تلميح من الامتحان عن الـ pseudo-class.** سؤال 2022-23 قال "Box B should be turned off (hint: use CSS pseudo class)". إذا الصناديق أولاد لنفس الـ container، فالـ B هو الولد الثاني: [[.box:nth-child(2) { display: none; }]].`
  ],
  points: [
    '[[@media (max-width: 600px) { … }]] = بس على الشاشات اللي عرضها 600px أو أقل.',
    'الـ min-width للـ mobile-first، والـ max-width للـ desktop-first.',
    'الـ rules اللي داخلها تفوز لأنها مكتوبة بعد.',
    'دايمًا حط الـ viewport meta tag، وإلا الجوال يسوي zoom out.',
    'استخدم % و rem و Flexbox عشان الأحجام تتأقلم.'
  ],
  exam: [
    '2022-23 Q4 [5]: في شاشة الجوال ← الصندوق B يختفي باستخدام pseudo-class، والصناديق A و C عرض كل واحد 45%، وزواياها مدوّرة 15px (border-radius).'
  ],
  mistakes: [
    'الشرط يحتاج أقواس.',
    'حط الـ media queries بعد الـ rules العادية، وإلا الـ rule العادي يفوز لما يتعادلون.'
  ],
  summary: [
    'الـ viewport meta + الـ media queries = responsive.',
    'الـ @media (max-width: …) للشاشات الصغيرة.',
    'اكتب الـ media queries في آخر الملف.'
  ],
  recall: [
    { q: 'أي واحد يطبّق الـ rules بس على الشاشات اللي عرضها 768px أو أقل؟', why: 'الـ max-width = لين هالعرض.' },
    { q: 'أي واحد يختار الولد الثاني اللي عنده class اسمه box؟', why: 'الـ :nth-child(2) هو pseudo-class.' }
  ],
  challenge: `أضف media query للشاشات **لين 2000px** (عشان يشتغل في هالـ preview): وداخلها خفِّ الصندوق **الثاني** باستخدام [[:nth-child(2)]]، وعطِ باقي الصناديق عرض **45%** و border-radius **15px**.`
};

LESSONS_AR['js-basics'] = {
  title: 'الـ Variables والـ types والـ operators',
  big: `الـ HTML هو الهيكل، والـ CSS هو الشكل، والـ JavaScript هو **السلوك** (behaviour). الـ JS يشتغل في الـ browser ويقدر يقرأ الصفحة ويغيّرها. أول شي تحتاج تتعلم اللغة نفسها: شلون تخزّن القيم، وأنواع القيم، وشلون تقارنها.`,
  simple: `الـ **Variables** تخزّن القيم:
- [[const]] ← ما ينفع تعطيه قيمة ثانية بعدين. استخدمه بشكل افتراضي.
- [[let]] ← يقدر يتغير بعدين (مثل العدادات والمجاميع).
- [[var]] ← الطريقة القديمة، تجنّبها (scope حقها function، ومربكة).

الـ **Types**: number ([[85]] و [[3.5]])، و string ([["hello"]])، و boolean ([[true]] أو [[false]])، و [[null]]، و [[undefined]]، والـ objects والـ arrays.

**فخ مهم**: القيم اللي تجي من الـ inputs ومن الـ [[textContent]] دايمًا تكون **strings**. يعني [["85" + 5]] تطلع [["855"]]! حوّلها أول: [[Number("85")]] ← 85.

**المقارنة**: الـ [[==]] يحوّل الأنواع قبل ما يقارن ([["5" == 5]] تطلع true). أما الـ [[===]] فيتأكد من النوع بعد ([["5" === 5]] تطلع false). استخدم [[===]] أفضل.`,
  deeper: [
    { task: 'شغّله واقرأ الـ console. بعدين صلّح الـ [[total]] عشان يطبع 90، مو 855.' },
    `الـ **Operators**: [[+ - * / %]] (الـ % = الباقي)، و [[++]] يزيد 1 ([[count++]])، و [[+=]] يضيف على متغير ([[sum += grade]]). والمنطقية: [[&&]] يعني و (and)، و [[||]] يعني أو (or)، و [[!]] يعني النفي (not).

الـ **Template literals** تستخدم backticks و [[\${ }]] عشان تحط قيم داخل الـ string. الحل النموذجي في الامتحان استخدم وحدة: [[\`Average Grade: \${average}\`]].`
  ],
  points: [
    'الـ const بشكل افتراضي، والـ let لما القيمة تتغير، وتجنّب الـ var.',
    'قيم الـ inputs والـ textContent كلها strings ← Number() قبل أي حساب.',
    'الـ === يقارن القيمة **والنوع**، واستخدمه بدل الـ ==.',
    '[[sum += x]] و [[count++]] هم أنماط الامتحان.',
    'الـ Template literal: [[\`Text \${value}\`]] مع backticks.'
  ],
  exam: [
    '2025-26 Q2.B: [[let sum = 0; let count = 0;]] (درجة لكل واحد)، و [[const grade = Number(gradeCell.textContent);]] (درجة)، و [[sum += grade;]] (درجة)، و [[count++;]] (درجة).',
    'سطر الإخراج الأخير: [[message = \`Average Grade: \${average}\`]].'
  ],
  mistakes: [
    'الـ const ما ينفع تعطيه قيمة جديدة، فاستخدم let للقيم اللي تتغير.',
    'الـ textContent يكون string، فالـ + يلزق النصوص.',
    'بس الـ backticks تحوّل الـ ${ } لقيمة.'
  ],
  summary: [
    'الـ let والـ const يخزنون القيم، والـ const ما ينفع تعطيه قيمة جديدة.',
    'الـ strings اللي تجي من الصفحة تحتاج Number() قبل الحساب.',
    'استخدم الـ === والـ template literals.'
  ],
  recall: [
    { q: 'وش يطلع [["7" + 3]]؟', o: ['10', '"73"', 'NaN', 'Error'], why: 'الـ string مع أي شي يلتزق كنص.' },
    { q: 'وش يطلع [["7" === 7]]؟', why: 'الـ === يتأكد من النوع بعد: string مقابل number.' },
    { q: 'أي keyword هو الصح لمجموع يكبر داخل loop؟', why: 'القيمة تتغير، فنستخدم let.' }
  ],
  challenge: `في تاب الـ JS:
1. سوّ [[gradeText]] وخلِّ قيمته الـ string **"88"** (كأنها قيمة جاية من input)
2. سوّ [[bonus]] وخلِّ قيمته الـ number **2**
3. سوّ [[total]] = المجموع **كرقم** (90)
4. سوّ [[message]] بـ template literal: **Total: 90**
5. [[console.log(message)]]`
};

LESSONS_AR['js-control'] = {
  title: 'الشروط والـ loops والـ functions',
  big: `البرامج تاخذ قرارات (if)، وتكرر شغل (loops)، وتجمع الخطوات في قطع تقدر تستخدمها أكثر من مرة (functions). في الامتحان، سؤالين الـ JavaScript الاثنين يبدون بـ "Write a function named …"، والثاني فيه loop على صفوف الجدول.`,
  simple: `الـ **if / else** يشغّل الكود بس لما الشرط يكون true.

الـ **Loops** تكرر:
- [[for (let i = 0; i < 5; i++) { … }]] ← يعدّ.
- [[for (const item of list) { … }]] ← على كل عنصر في array أو NodeList.
- [[list.forEach(item => { … })]] ← نفس الفكرة بس بـ function.

الـ **Functions** هي blocks من الكود لها اسم. تاخذ **parameters** وتقدر ترجّع قيمة بـ [[return]].
- Declaration: [[function add(a, b) { return a + b; }]]
- Arrow function: [[const add = (a, b) => a + b;]]
- Anonymous function (بدون اسم)، وعادةً تنعطى لـ function ثانية: [[function () { … }]]`,
  deeper: [
    { task: 'شغّله. بعدين أضف [[else if]] للدرجات ≥ 80 يرجّع "B"، وجرّب درجات ثانية.' },
    `**ترجيع أكثر من قيمة**: رجّع object. دالة [[calculateSumAndCount()]] في امتحان 2025-26 كانت تنتهي بـ [[return { sum: sum, count: count };]]، واللي يناديها يستخدم [[stats.sum]] و [[stats.count]].`,
    null
  ],
  points: [
    'الـ if و else if و else للقرارات.',
    'الـ for (let i…) يعدّ، والـ for…of والـ forEach يمرّون على كل عنصر.',
    'الـ function اللي ما فيها return ترجّع undefined.',
    'الـ Arrow: [[(a, b) => a + b]]، ومع parameter واحد: [[x => x * 2]].',
    'رجّع object عشان ترجّع أكثر من قيمة.'
  ],
  exam: [
    '2025-26 Q2.A: [[function createGradeRow() { … return newRow; }]] (سطر الـ function وسطر الـ return كل واحد عليه درجة).',
    '2025-26 Q2.B: [[gradeRows.forEach(row => { … })]] (درجة)، و [[return { sum: sum, count: count };]] (درجة).'
  ],
  mistakes: [
    'بدون return، القيمة تبقى داخل الـ function.',
    'الـ indexes تبدأ من 0 لين length − 1.'
  ],
  summary: [
    'الـ if للقرارات، والـ for أو forEach للتكرار.',
    'الـ Functions تاخذ parameters وترجّع قيمة.',
    'رجّع object عشان ترجّع الـ sum والـ count مع بعض.'
  ],
  recall: [
    { q: 'وش ترجّع الـ function إذا ما فيها return statement؟', why: 'الـ functions اللي ما فيها return ترجّع undefined.' },
    { q: 'أي واحد هو arrow function صح يضاعف x؟', why: 'الخيار الأخير فيه أقواس معقوفة بس ما فيه return، فيرجّع undefined.' },
    { q: 'function ترجّع [[{ sum: 270, count: 3 }]] وتنحفظ في [[stats]]. شلون تطلّع 90؟', why: 'استخدم الـ properties حق الـ object.' }
  ],
  challenge: `اكتب function اسمها [[calculateSumAndCount(grades)]] تمر بـ loop على الـ array [[grades]] و**ترجّع** object شكله [[{ sum, count }]]. بعدين اكتب [[average(grades)]] تستخدمها وترجّع sum / count.`
};

LESSONS_AR['js-objects'] = {
  title: 'الـ Objects والـ arrays',
  big: `البيانات الحقيقية تجي في مجموعات: الطالب عنده id و grade، والصف فيه طلاب كثير. الـ **Objects** تجمع قيم لها أسماء، والـ **arrays** تحفظ قوائم مرتبة. والـ DOM نفسه مبني من objects، فهالدرس هو الجسر للقسم الجاي.`,
  simple: `الـ **Array**: قائمة مرتبة، والـ index يبدأ من 0.
[[const grades = [80, 90, 100];]] ← [[grades[0]]] هو 80، و [[grades.length]] هو 3، و [[grades.push(70)]] يضيف في الآخر.

الـ **Object**: properties لها أسماء.
[[const student = { id: "S1", grade: 85 };]] ← [[student.id]] أو [[student["id"]]]، و [[student.grade = 90]] يغيّرها.

الـ **Array of objects** هي الطريقة المعتادة عشان تحفظ بيانات جدول:
[[const list = [{ id: "S1", grade: 80 }, { id: "S2", grade: 90 }];]]`,
  deeper: [
    { task: 'أضف طالب ثالث، وبعدين اطبع المعدل (average) باستخدام loop على الـ array of objects.' },
    `الـ objects تقدر تحفظ functions بعد (اسمها methods): [[const calc = { add(a, b) { return a + b; } };]] ← [[calc.add(2, 3)]]. وهذا بالضبط اللي هو [[document.getElementById(...)]]: الـ method اسمها getElementById في الـ object اسمه document.`
  ],
  points: [
    'الـ index في الـ array يبدأ من 0، وآخر index = length − 1.',
    'الـ push يضيف في الآخر، والـ length هو العدد.',
    'الـ properties حق الـ object: obj.key أو obj["key"].',
    'الـ array of objects = صفوف بيانات.',
    'عناصر الـ DOM هي objects لها properties (مثل textContent و value و children…).'
  ],
  exam: [
    'Q2.B: [[row.children[1]]] هو indexing مثل الـ array على الـ children حق العنصر (الخلية الثانية).',
    'Q2.B ترجّع object وتقرأ [[stats.sum]] و [[stats.count]].'
  ],
  mistakes: [
    'الـ indexes تبدأ من 0.',
    'الـ properties في الـ object تستخدم نقطتين ( : ).'
  ],
  summary: [
    'الـ Arrays: مرتبة، والـ index من 0، وفيها length و push.',
    'الـ Objects: properties لها أسماء وتوصل لها بالنقطة.',
    'عناصر الصفحة بعد objects.'
  ],
  recall: [
    { q: 'مع [[const a = [5, 10, 15];]] وش قيمة [[a[a.length - 1]]]؟', why: 'الـ length − 1 هو آخر index.' },
    { q: 'شلون تقرأ الـ grade من [[const s = { id: "S1", grade: 85 }]]؟', o: ['[[s->grade]]', '[[s.grade]]', '[[s(grade)]]', '[[s[grade]]] بدون علامات تنصيص'], why: 'بالنقطة (dot notation)، أو s["grade"].' }
  ],
  challenge: `سوّ array اسمها [[students]] فيها ثلاث objects شكلها [[{ id, grade }]]: الـ S1 = 70، والـ S2 = 85، والـ S3 = 100. بعدين سوّ [[best]] = الـ **id** حق الطالب اللي عنده أعلى درجة، باستخدام loop (لا تكتب "S3" مباشرة).`
};

LESSONS_AR['dom-select'] = {
  title: 'الـ DOM واختيار العناصر',
  big: `لما الـ browser يحمّل الـ HTML، يبني شجرة من الـ objects اسمها **DOM** (Document Object Model). والـ JavaScript يغيّر الصفحة عن طريق إنه يغيّر هالشجرة. والخطوة الأولى دايمًا نفسها: **تلقى العنصر** اللي تبيه.`,
  simple: `كل element هو **node** في الشجرة، والصفحة كاملة هي الـ object اسمه [[document]].

الـ Selection methods:
- [[document.getElementById("studentId")]] ← عنصر واحد (أو null). بدون # هني!
- [[document.querySelector("#main a")]] ← **أول** عنصر ينطبق عليه الـ CSS selector.
- [[document.querySelectorAll("#gradeTbody tr.data")]] ← **كل** العناصر اللي تنطبق، كـ NodeList (يشتغل معها forEach).
- القديمة: [[getElementsByClassName("x")]] و [[getElementsByTagName("li")]] ← ترجّع live collections.

الـ querySelector يستخدم CSS selectors، فكل اللي تعلمته في قسم الـ CSS يشتغل هني.`,
  deeper: [
    { task: 'شغّله واقرأ الـ console. بعدين اختار الـ li الثاني باستخدام querySelector و pseudo-class.' },
    `**الفرق بين NodeList و array.** الـ NodeList فيها [[length]] و indexes و [[forEach]]، بس مو كل الـ methods حق الـ array. عشان تسوي loop تقدر تستخدم [[forEach]] أو [[for…of]].

**علاقات العائلة** موجودة ([[parentNode]] و [[children]] و [[firstChild]] و [[nextSibling]])، بس السلايدات تحذّر إنها ما يعتمد عليها (بسبب الـ whitespace text nodes)، فالأفضل تستخدم الـ selectors. أما [[children]] (عناصر بس) فهي آمنة، والامتحان استخدمها: [[row.children[1]]].`
  ],
  points: [
    'الـ getElementById("id") ← بدون #.',
    'الـ querySelector("css") ← أول عنصر ينطبق، والـ querySelectorAll ← الكل (NodeList).',
    'الـ NodeList فيها forEach و length.',
    'ترجّع null إذا ما في شي ينطبق، ووقتها .value أو .textContent يطلّعون error.',
    'الـ children = العيال اللي هم elements بس، و children[1] = الثاني.'
  ],
  exam: [
    '2025-26: [[const studentIdValue = document.getElementById(\'studentId\').value;]] (درجة).',
    '[[const gradeRows = document.querySelectorAll(\'#gradeTbody tr.data\');]] (درجة): الصفوف اللي عندها class اسمه data داخل الـ tbody بس.',
    'الـ methods المفيدة المكتوبة على ورقة الامتحان: getElementById و getElementsByTagName و children و createElement و appendChild و preventDefault و addEventListener و querySelectorAll و textContent و Number.'
  ],
  mistakes: [
    'الـ getElementById ياخذ الـ id حاف، بدون #.',
    'الـ querySelector يحتاج CSS selector: يعني # للـ id.',
    'الـ querySelector يرجّع عنصر واحد، فتحتاج querySelectorAll عشان قائمة.'
  ],
  summary: [
    'الـ DOM هو الصفحة كشجرة من الـ objects.',
    'الـ getElementById (بدون #) أو querySelector و querySelectorAll (CSS selectors).',
    'الـ querySelectorAll ترجّع NodeList تقدر تسوي عليها forEach.'
  ],
  recall: [
    { q: 'أي واحد يرجّع **كل** الصفوف اللي عندها class اسمه data داخل #gradeTbody؟', why: 'الـ querySelectorAll مع descendant selector.' },
    { q: 'وش يرجّع getElementById إذا ما في عنصر عنده هالـ id؟', o: ['undefined', 'string فاضي', 'null', 'NodeList فاضية'], why: 'يرجّع null، فقراءة .value منه تطلّع error.' },
    { q: 'لصف مثل [[<tr><td>S1</td><td>85</td></tr>]]، أي واحد يجيب خلية الدرجة؟', why: 'الـ children يبدأ من صفر.' }
  ],
  challenge: `اكتب JavaScript:
1. يحفظ الـ input اللي الـ id حقه **#studentId** في [[idInput]] باستخدام getElementById
2. يحفظ **كل** صفوف الـ [[tr.data]] اللي داخل **#gradeTbody** في [[rows]]
3. يحفظ **خلية الدرجة حق أول صف بيانات** في [[firstGradeCell]]
4. يطبع (log) عدد صفوف البيانات`
};

LESSONS_AR['dom-change'] = {
  title: 'قراءة العناصر وتغييرها',
  big: `لما يكون عندك العنصر، تقدر تقرأ اللي فيه وتغيّره: النص حقه، أو الـ classes، أو الـ style، أو القيمة اللي انكتبت في input. وكذا الصفحة "تتفاعل".`,
  simple: `أهم الـ properties:
- [[el.textContent]] ← النص اللي داخله (بدون تاقات). تقرأه **أو** تغيّره.
- [[el.innerHTML]] ← الـ HTML اللي داخله، مع التاقات.
- [[input.value]] ← اللي كتبه المستخدم في input أو select أو textarea (ويكون **string**).
- [[el.classList.add("x")]] و [[.remove("x")]] و [[.toggle("x")]] و [[.contains("x")]] ← تغيّر الـ classes.
- [[el.className]] ← الـ class attribute كامل كنص.
- [[el.style.backgroundColor = "yellow"]] ← inline style (أسماء الـ CSS تنكتب camelCase).
- [[el.id]] و [[img.src]] و [[a.href]] ← الـ attributes كـ properties.

**الفرق بين textContent و innerHTML**: السلايدات تقول الأفضل **textContent** للنص، لأن الـ innerHTML مع كلام من المستخدم ممكن يسمح بـ **XSS** (أحد يحقن script).`,
  deeper: [
    { task: 'اكتب درجة واضغط الزر. بعدين غيّر الكود عشان الدرجات اللي أقل من 50 تاخذ class اسمه **fail** بدل **pass**.' },
    `**الفرق بين innerHTML و textContent**، من سلايد 9.13:`,
    null
  ],
  points: [
    'الـ textContent = نص بس وآمن، والـ innerHTML = HTML، وفيه خطر XSS مع كلام المستخدم.',
    'الـ input.value دايمًا string ← Number() للحساب.',
    'الـ classList فيها add و remove و toggle و contains.',
    'الـ style properties تنكتب camelCase: backgroundColor و fontWeight.',
    'الأفضل تغيّر الـ classes بدل ما تغيّر الـ style مباشرة.'
  ],
  exam: [
    '2025-26 Q2.A: [[idCell.textContent = studentIdValue;]] (درجة)، و [[newRow.classList.add(\'data\');]] (درجة).',
    '2025-26 Q2.B: [[averageContainer.textContent = message;]] (درجة).'
  ],
  mistakes: [
    'في الـ inputs، اللي كتبه المستخدم يكون في .value.',
    'الـ classList هو object فيه methods، وما في property اسمها .class.',
    'الشرطة (-) في الـ JS معناها ناقص، فاستخدم camelCase.'
  ],
  summary: [
    'اقرأ النص واكتبه بالـ textContent، وقيم الـ inputs بالـ .value.',
    'غيّر الـ classes بالـ classList، والـ styles بـ el.style.camelCase.',
    'تجنّب الـ innerHTML لنصوص المستخدم (XSS).'
  ],
  recall: [
    { q: 'أي property يعطيك اللي كتبه المستخدم في input؟', why: 'الـ value.' },
    { q: 'أي واحد يضيف class اسمه data للـ newRow؟', why: 'الـ classList.add.' },
    { q: 'ليش السلايدات تفضّل الـ textContent على الـ innerHTML للنص؟', o: ['لأنه أسرع في الكتابة', 'لأن الـ innerHTML ممكن يسمح للمهاجمين يحقنون scripts (XSS)', 'لأن الـ innerHTML ما يشتغل في Chrome', 'لأن الـ textContent يدعم CSS'], why: 'بسبب خطر الـ XSS.' }
  ],
  challenge: `لما ينضغط **#calcBtn**:
- اقرأ الرقم من **#grade**
- اكتب **"Grade: N"** داخل **#averageContainer** باستخدام textContent
- أضف class اسمه **pass** إذا N ≥ 50، وإذا لا أضف **fail**`
};

LESSONS_AR['dom-create'] = {
  title: 'إنشاء العناصر: بناء صف في جدول',
  big: `هذا أهم درس للميد. Q2.A في امتحان 2025-26 (17 درجة) كانت: ابنِ [[<tr>]] فيه خليتين [[<td>]] من قيم الـ form، وأضفه للجدول. وكل سطر عليه درجة.`,
  simple: `إنشاء عناصر جديدة دايمًا يمشي على نفس الثلاث خطوات:
1. **Create**: [[const cell = document.createElement("td");]] (موجود في الذاكرة، بس مو في الصفحة للحين)
2. **Fill**: [[cell.textContent = "85";]] وممكن [[cell.classList.add("x");]]
3. **Attach**: [[row.appendChild(cell);]] (الحين صار داخل الـ row)

ابنِ من الداخل لبرّا: الخلايا داخل الصف، وبعدين الصف داخل الـ tbody.

methods ثانية من السلايدات: [[insertBefore]] و [[removeChild]] و [[replaceChild]] و [[createTextNode]] و [[insertAdjacentElement]].`,
  deeper: [
    `الحل النموذجي في الامتحان، سطر سطر (كل سطر = درجة):`,
    null,
    { task: 'اضغط "Add row" كم مرة. بعدين غيّر الكود عشان يضيف خلية ثالثة مكتوب فيها "OK".' }
  ],
  points: [
    'الـ createElement("tag") ينشئ العنصر، وما يطلع أي شي لين تسوي له append.',
    'عبّه بالـ textContent (والـ classList.add للـ classes).',
    'الـ parent.appendChild(child) يضيف في آخر الأب.',
    'من الداخل لبرّا: td ← tr ← tbody.',
    'الـ function اللي تبني ترجّع العنصر، واللي يناديها هو اللي يسوي append.'
  ],
  exam: [
    '2025-26 Q2.A الـ "createGradeRow" = 11 درجة: سطر الـ function، وقراءتين .value، و createElement tr، و classList.add، واثنين createElement td، واثنين textContent، والـ appends، والـ return.',
    'إذا نسيت سطر، بتخسر درجته بس. فاكتب كل سطر صغير، حتى لو مو متأكد من الباقي.'
  ],
  mistakes: [
    'اسم الـ tag بدون الأقواس المثلثة.',
    'الـ appendChild ياخذ node واحد. (الـ append() يقدر ياخذ أكثر، بس استخدم اللي يذكره الامتحان.)',
    'السؤال يقول الـ function ترجّع الصف، والإضافة للجدول تصير في الـ submit listener.'
  ],
  summary: [
    'createElement ← textContent أو classList ← appendChild.',
    'ابنِ الخلايا داخل الصف، وبعدين الصف داخل الـ tbody.',
    'رجّع الصف من الـ function اللي تبنيه.'
  ],
  recall: [
    { q: 'بعد [[const td = document.createElement("td")]]، هل الخلية موجودة في الصفحة؟', o: ['إيه، في آخر الـ body', 'إيه، في أول جدول', 'لا، لين تسوي لها append', 'بس بعد reload'], why: 'موجودة في الذاكرة لين الـ appendChild يحطها في الشجرة.' },
    { q: 'أي سطر يضيف الخلية للصف؟', why: 'parent.appendChild(child).' },
    { q: 'بإيش لازم تنتهي createGradeRow()؟', why: 'لازم ترجّع الصف كامل.' }
  ],
  challenge: `اكتب [[createProductRow()]]:
- اقرأ قيم **#productName** و **#productPrice**
- سوّ [[<tr>]] عنده class اسمه **data**
- سوّ خليتين [[<td>]] فيها هالقيم (textContent)
- أضف الخليتين للصف و**رجّع** الصف

(الاختبار بينادي الـ function حقتك ويشيك على اللي ترجّعه.)`
};

LESSONS_AR['events-basics'] = {
  title: 'الـ addEventListener والـ event object',
  big: `الصفحة تنتظر المستخدم يسوي شي: يضغط، أو يكتب، أو يسوي submit. كل حركة تطلّع **event**. أنت تربط function (اسمها **handler**) بعنصر، والـ browser يناديها لما يصير هالـ event.`,
  simple: `النمط:
[[element.addEventListener("click", function () { … });]]

- الـ argument الأول: **نوع** الـ event كـ string ([["click"]] و [["submit"]] و [["keydown"]] و [["change"]] …)، **بدون** "on".
- الثاني: الـ **callback** function. عادةً تكون anonymous، أو arrow function. وإذا عندك function لها اسم، اكتب اسمها **بدون** أقواس: [[btn.addEventListener("click", showAverage)]].

الـ browser يعطي الـ function حقتك **event object**: [[function (e) { … }]]. أهم الأشياء فيه: [[e.target]] (العنصر اللي طلّع الـ event)، و [[e.type]]، و [[e.key]] للكيبورد، و [[e.preventDefault()]]، و [[e.stopPropagation()]].`,
  deeper: [
    { task: 'اضغط الأزرار. بعدين أضف listener للـ input على "keydown" يطبع [[e.key]].' },
    `**أكثر من listener** تقدر تربطهم على نفس العنصر، وكلهم يشتغلون بالترتيب. بالطريقة القديمة [[btn.onclick = …]] يبقى واحد بس، والسلايدات تستخدم addEventListener.

**أنواع الـ events** اللي لازم تعرفها: الماوس ([[click]] و [[dblclick]] و [[mouseover]] و [[mouseout]] و [[mousedown]] و [[mouseup]] و [[mousemove]])، والكيبورد ([[keydown]] و [[keyup]])، والـ form ([[submit]] و [[change]] و [[focus]] و [[blur]] و [[reset]] و [[select]])، والـ frame ([[load]] و [[DOMContentLoaded]] و [[resize]] و [[scroll]]).`
  ],
  points: [
    'الـ addEventListener("type", callback)، والـ type بدون "on".',
    'عطه الـ function نفسها، مو تناديها: handler مو handler().',
    'الـ event object (e) فيه target و type و key و preventDefault و stopPropagation.',
    'تقدر تضيف أكثر من listener لنفس العنصر.',
    'اعرف أنواع الـ events: click و mouseover و mouseout و keydown و submit و change و focus و blur و load و DOMContentLoaded.'
  ],
  exam: [
    '2025-26 Q2.B: [[calcAvgBtn.addEventListener(\'click\', function () { … })]] (درجة)، بعد ما تجيب الزر بـ getElementById (درجة).',
    'فاينلات قديمة: لعبة فيها [[mouseover]] و [[mouseout]] عشان توقف تغيير الصور وترجّعه.'
  ],
  mistakes: [
    'الـ type ما فيه "on" في أوله.',
    'الـ show() تشتغل على طول وتعطي النتيجة حقتها (undefined).'
  ],
  summary: [
    'element.addEventListener("click", function (e) { … }).',
    'عطه الـ function نفسها، مو تناديها.',
    'الـ e.target = العنصر اللي طلّع الـ event.'
  ],
  recall: [
    { q: 'أي واحد يسجّل click handler بشكل صحيح؟', why: 'الـ type بدون on، والـ function بدون ().' },
    { q: 'أي event يصير لما الماوس يدخل على عنصر؟', why: 'الـ mouseover (والـ mouseout لما يطلع منه).' },
    { q: 'داخل الـ handler، أي واحد يعطيك العنصر اللي طلّع الـ event؟', why: 'الـ e.target.' }
  ],
  challenge: `1. لما ينضغط **#counterBtn**، زِد عداد واعرض **"Clicks: N"** في **#out**.
2. لما يدخل الماوس على **#box**، أضف class اسمه **hot**، ولما يطلع منه، شيله.`
};

LESSONS_AR['events-forms'] = {
  title: 'الـ Form events: الـ submit والـ preventDefault',
  big: `لما ينسوّى submit للـ form، الـ browser عادةً يرسل البيانات و**يسوي reload للصفحة**. في تطبيق JavaScript نبي نبقى في الصفحة ونتعامل مع البيانات بنفسنا. والأداة هي [[event.preventDefault()]]، وعليها درجة في الامتحان.`,
  simple: `اسمع للـ **submit** على الـ **form** نفسه (مو click على الزر). ليش؟ لأن الـ submit يصير بعد لما المستخدم يضغط Enter، والـ browser يتأكد من [[required]] و [[min]] و [[max]] أول: يعني الكود حقك يشتغل بس إذا البيانات صحيحة.

النمط:
- جيب الـ form
- [[form.addEventListener("submit", function (event) { … })]]
- أول سطر: [[event.preventDefault();]] ← بدون reload
- اقرأ القيم، وابنِ، وأضف للصفحة.

الـ Validation بالـ JS (سلايد 9.10): شيك على القيمة، وإذا غلط، نادِ [[e.preventDefault()]] وطلّع رسالة.`,
  deeper: [
    `الحل النموذجي في الامتحان للـ listener (6 درجات، درجة لكل سطر):`,
    null,
    { task: 'أضف كم درجة. بعدين شيل سطر الـ [[preventDefault]] وسوّ submit مرة ثانية: اقرأ التحذير في الـ console.' },
    `**الـ Validation للحقل الفاضي** من السلايدات:`,
    null,
    `events ثانية للـ form: [[change]] (القيمة تغيّرت، مثلًا في select أو radio)، و [[focus]] و [[blur]] (تدخل على حقل أو تطلع منه)، و [[reset]]. والـ [[form.submit()]] يسوي submit من الكود، والـ [[form.reset()]] يفضّي الـ form.`
  ],
  points: [
    'اسمع للـ submit على الـ form، مو click على الزر.',
    'الـ event.preventDefault() يوقف الـ reload.',
    'الـ required و min و max يتشيّكون قبل ما يصير الـ submit.',
    'اقرأ القيم داخل الـ handler (لأنها تتغير كل مرة).',
    'الـ change و focus و blur و reset هم باقي الـ form events.'
  ],
  exam: [
    'listener الـ 2025-26 Q2.A: جيب الـ form (درجة)، وجيب الـ tbody (درجة)، و addEventListener("submit", function (event)) (درجة)، و event.preventDefault() (درجة)، ونادِ createGradeRow() (درجة)، و appendChild للـ tbody (درجة).',
    'بأسلوب سؤال قصير: "Why call preventDefault() in a submit handler?" والجواب: to stop the browser sending the form and reloading the page.'
  ],
  mistakes: [
    'السؤال يطلب submit listener على الـ form، مع preventDefault.',
    'عرّف الـ event parameter اللي تستخدمه.'
  ],
  summary: [
    'form.addEventListener("submit", function (event) { event.preventDefault(); … }).',
    'بعدين ابنِ الصف وأضفه للـ tbody.',
    'الـ Validation: إذا القيمة غلط، preventDefault وطلّع رسالة.'
  ],
  recall: [
    { q: 'وش يسوي [[event.preventDefault()]] في الـ submit handler؟', o: ['يفضّي الـ form', 'يوقف الحركة الافتراضية: إرسال الـ form والـ reload', 'يوقف الـ listeners الثانية', 'يتشيّك على الـ inputs'], why: 'يلغي الحركة الافتراضية حق الـ browser.' },
    { q: 'أي عنصر لازم ياخذ الـ submit listener؟', o: ['زر الـ submit', 'الـ form', 'الـ tbody', 'الـ document بس'], why: 'الـ submit يصير على الـ form.' },
    { q: 'الـ grade input فيه min="0" max="100" required. المستخدم كتب 150 وضغط Add. وش يصير؟', o: ['الـ submit handler حقك يشتغل بـ 150', 'الـ browser يطلّع error، والـ submit event ما يصير', 'الصفحة تسوي reload', 'القيمة تصير 100'], why: 'الـ validation المدمج يشتغل أول.' }
  ],
  challenge: `كمّل listener الامتحان:
- جيب **#gradeForm** و **#gradeTbody**
- أضف **submit** listener للـ form
- امنع الحركة الافتراضية
- نادِ [[createGradeRow()]] (مكتوبة جاهزة)، وأضف الصف للـ tbody`
};

LESSONS_AR['events-flow'] = {
  title: 'تحميل الصفحة والـ bubbling والـ delegation',
  big: `الـ events ما تبقى على عنصر واحد. الضغطة على زر داخل div داخل aside هي بعد ضغطة على الـ div وعلى الـ aside. إذا فهمت هالـ **propagation**، بتفهم أغلاط غريبة، وبتقدر تستخدم حركة قوية اسمها **event delegation**. وبعد: الكود حقك لازم ينتظر لين تتحمّل الصفحة.`,
  simple: `**تحميل الصفحة.** ما تقدر تختار عناصر قبل ما تكون موجودة. الخيارات:
- حط الـ script في آخر الـ body، أو
- حط الكود داخل [[document.addEventListener("DOMContentLoaded", function () { … })]] ← يشتغل لما يخلص الـ parsing حق الـ HTML (وهذا عادةً اللي تبيه)، أو
- [[window.addEventListener("load", …)]] ← ينتظر الصور والـ CSS بعد (أبطأ).

الـ **Propagation** فيه مرحلتين:
- **capturing**: من أبعد عنصر (الـ html) نزول لين الـ target،
- **bubbling**: من الـ target رجوع لفوق لين الـ html. والـ listeners بشكل افتراضي تشتغل في مرحلة الـ bubbling.

الـ [[e.stopPropagation()]] يوقف الـ event إنه يطلع لفوق أكثر.

الـ **Delegation**: حط listener واحد على الأب، وشيك على [[e.target]] عشان تعرف أي ولد انضغط. ويشتغل حتى مع العناصر اللي تنضاف بعدين (مثل صفوف الجدول الجديدة).`,
  deeper: [
    { task: 'اضغط الزر: اقرأ الترتيب في الـ console. بعدين شيل الـ comment عن [[e.stopPropagation()]] واضغط مرة ثانية.' },
    `الـ **Delegation** (سلايد 9.38). listener واحد على الـ tbody يتعامل مع الضغطات على أي صف، حتى الصفوف اللي تنضاف بعدين:`,
    { task: 'اضغط على الخلايا عشان الصف يتلوّن. بعدين أضف زر يضيف صف جديد: بيشتغل بدون listener جديد.' },
    `الـ **dataset**: الـ attributes المخصصة [[data-*]] تحفظ معلومات زيادة على العنصر: [[<tr data-id="5">]] ← [[row.dataset.id]] قيمته "5". ومفيد مع الـ delegation.`
  ],
  points: [
    'الـ script في آخر الـ body، أو DOMContentLoaded، عشان تكون العناصر موجودة.',
    'الـ DOMContentLoaded = خلص الـ parsing حق الـ HTML، والـ load = كل شي ومنها الصور.',
    'الـ Bubbling: من الـ target ← للآباء ← لين الـ html (وهي المرحلة الافتراضية).',
    'الـ stopPropagation() يوقف الـ bubbling.',
    'الـ Delegation: listener واحد على الأب + تشيك على e.target.',
    'الـ nodeName والـ tagName يطلعون بحروف كبيرة: "IMG" و "TD" و "TR".'
  ],
  exam: [
    'بأسلوب أسئلة السلايدات: "Which event is generally preferred to know the DOM is ready?" والجواب DOMContentLoaded.',
    '"Clicking the + button also triggers the div and aside handlers. Fix it." والجواب e.stopPropagation().',
    'شرط الـ Delegation: [[if (e.target && e.target.nodeName == "IMG")]].'
  ],
  mistakes: [
    'الـ nodeName دايمًا بحروف كبيرة لعناصر الـ HTML.',
    'في الـ head، عناصر الـ body للحين مو موجودة.'
  ],
  summary: [
    'انتظر الـ DOM: آخر الـ body أو DOMContentLoaded.',
    'الـ events تطلع لفوق (bubble)، والـ stopPropagation يوقفها.',
    'الـ Delegation: listener واحد على الأب + e.target.'
  ],
  recall: [
    { q: 'أي event يصير لما يخلص الـ parsing حق الـ HTML، بدون ما ينتظر الصور؟', why: 'الـ DOMContentLoaded.' },
    { q: 'بشكل افتراضي، الـ listeners تشتغل في أي مرحلة؟', o: ['Capturing', 'Bubbling', 'الاثنين مع بعض', 'ولا وحدة'], why: 'الـ Bubbling، إلا إذا طلبت الـ capture.' },
    { q: 'في الـ delegation، شلون تشيك إن اللي انضغط صورة؟', why: 'الـ nodeName يطلع بحروف كبيرة.' }
  ],
  challenge: `استخدم listener **واحد** على **#gradeTbody** (delegation): لما المستخدم يضغط على **TD**، شيل الصف كامل من الجدول. وبعد خلِّ الضغطات على الخلايا **ما توصل** للـ listener حق الـ [[document]] (وقّف الـ propagation).`
};

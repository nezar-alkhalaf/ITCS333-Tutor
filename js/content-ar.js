/* Arabic version of the lessons (part 1: lessons 1-10). Technical terms stay in English. Code is never translated.
   deeper: same order as the English array; null = keep the English item (code); {task} = translated "Try it" task. */
const LESSONS_AR = {};

LESSONS_AR['html-structure'] = {
  title: 'هيكل الصفحة والـ <head>',
  big: `كل صفحة ويب هي document واحد من HTML. الـ browser يقرأه من فوق لتحت ويبني منه الصفحة. قبل ما تقدر تسوي style بالـ CSS أو تخلي الصفحة تفاعلية بالـ JavaScript، لازم يكون الهيكل (skeleton) صح.

في الامتحان، Question 1 دايمًا تبدأ من هني: تاقات الـ [[<head>]] (مثل meta و link)، ومكان الـ [[<script>]]. وكل سطر صح عليه درجة.`,
  simple: `تخيل صفحة الـ HTML مثل رسالة داخل ظرف:

- [[<!DOCTYPE html>]] يقول للـ browser إن هذي صفحة HTML5 حديثة.
- [[<html>]] هو الظرف اللي يحتوي كل شي.
- [[<head>]] فيه معلومات **عن** الصفحة، والمستخدم ما يقرأها مباشرة: العنوان اللي يطلع في التاب، ونوع الحروف (charset)، وإعداد الـ viewport للجوال، وروابط ملفات الـ CSS.
- [[<body>]] هو محتوى الرسالة نفسها: كل شي يشوفه المستخدم.

التاقات عادةً تجي زوج: tag يفتح [[<p>]] و tag يسكّر [[</p>]]. وفيه تاقات اسمها **void** ما لها tag يسكّر: [[<meta>]] و [[<link>]] و [[<img>]] و [[<input>]] و [[<br>]].`,
  deeper: [
    `هذي صفحة كاملة. اقرأها سطر سطر، وبعدين عدّل عليها في الـ editor اللي تحت.`,
    null,
    `- [[<meta charset="UTF-8">]] يخلي الصفحة تعرض أي لغة، والعربي منها.
- [[<meta name="viewport" content="width=device-width, initial-scale=1.0">]] يقول للجوال يستخدم عرض الشاشة الحقيقي وما يسوي zoom out. الامتحان طلب هالسطر بالضبط: "set the viewport's content initial-scale to 1.0".
- [[<link rel="stylesheet" href="styles.css">]] يربط ملف CSS **خارجي** (external). لازم الـ [[rel]] والـ [[href]] الاثنين.
- [[<script src="script.js"></script>]] يحمّل ملف JavaScript خارجي. هذا **مو** void tag، يعني لازم [[</script>]]. ولما تحطه قبل [[</body>]] مباشرة، يكون كل الـ HTML اللي فوقه موجود لما الكود يشتغل.`,
    { task: 'غيّر الـ title والعنوان، وأضف paragraph ثاني، وبعدين اضغط **Run** (أو Ctrl+Enter).' }
  ],
  points: [
    'الترتيب: [[<!DOCTYPE html>]] ← [[<html>]] ← [[<head>]] ← [[<body>]].',
    'في كل صفحة [[<head>]] واحد و [[<body>]] واحد بس.',
    '[[<title>]] يكون داخل الـ [[<head>]] ويطلع في تاب الـ browser.',
    'الـ CSS الخارجي: [[<link rel="stylesheet" href="file.css">]] داخل الـ head.',
    'الـ JS الخارجي: [[<script src="file.js"></script>]]، وعادةً في آخر الـ body.',
    'الـ void elements ما لها tag يسكّر: meta و link و img و input و br و hr.',
    'الـ attributes تنكتب في الـ tag اللي يفتح: [[name="value"]]، ودايمًا بين علامات تنصيص.'
  ],
  exam: [
    'ميد 2025-26، Q1: "A [[<meta>]] tag to set the viewport\'s content initial-scale to 1.0" (درجة) و "A [[<link>]] tag to connect an external stylesheet named styles.css" (درجة).',
    '"At the end of the [[<body>]] tag, add a [[<script>]] tag to link an external JavaScript file named script.js" (درجة).',
    'ميد 2024-25: "Include html, head and body tags, set the page title to …". درجات سهلة، لا تنسى تسكّر التاقات.'
  ],
  mistakes: [
    'الـ script مو void element. بدون الـ tag اللي يسكّر، الـ browser يعتبر كل شي بعده script.',
    'الـ link يستخدم href (مو src) ويحتاج rel="stylesheet".',
    'الـ meta tag يستخدم الـ attributes اسمها name و content.'
  ],
  summary: [
    'الـ head = معلومات عن الصفحة (meta و title و link)، والـ body = اللي يشوفه المستخدم.',
    'الـ viewport: [[<meta name="viewport" content="width=device-width, initial-scale=1.0">]].',
    'الـ CSS بـ [[<link rel="stylesheet" href>]] في الـ head، والـ JS بـ [[<script src></script>]] في آخر الـ body.'
  ],
  recall: [
    { q: 'أي tag يربط stylesheet خارجي اسمه styles.css؟', why: 'الـ CSS الخارجي يستخدم link مع rel="stylesheet" و href.' },
    { q: 'وين المكان المعتاد لـ [[<script src="script.js"></script>]] عشان تكون عناصر الـ HTML موجودة لما الكود يشتغل؟', o: ['أول سطر في الـ head', 'بعد [[<body>]] مباشرة', 'قبل [[</body>]] مباشرة', 'بعد [[</html>]]'], why: 'في آخر الـ body، كل العناصر اللي فوقه تكون صارت موجودة في الـ DOM.' },
    { q: 'أي واحد من هذول void element (ما له tag يسكّر)؟', why: 'meta و link و img و input و br ما لها tag يسكّر.' }
  ],
  challenge: `اكتب صفحة كاملة (بأسلوب الامتحان):
- العنوان (title): **SERVICES**
- viewport meta tag فيه initial-scale 1.0
- link لملف **styles.css**
- [[<h1>]] مكتوب فيه Services
- script tag يربط **script.js** في آخر الـ body`
};

LESSONS_AR['html-content'] = {
  title: 'النصوص والروابط والصور والقوائم والـ semantic elements',
  big: `داخل الـ body توصف **وش نوع كل جزء من المحتوى**: عنوان، أو فقرة، أو قائمة، أو صورة، أو شريط تنقل (navigation)، أو footer. الـ HTML يوصف **المعنى والهيكل**، والـ CSS يقرر الشكل.`,
  simple: `- العناوين من [[<h1>]] لين [[<h6>]]: الـ h1 هو العنوان الرئيسي، والـ h2 قسم، وهكذا.
- [[<p>]] فقرة (paragraph). [[<strong>]] = مهم (bold)، و [[<em>]] = تأكيد (italic).
- [[<a href="page.html">]] رابط، والـ [[href]] هو المكان اللي يوديك له.
- [[<img src="pic.jpg" alt="description" width="100" height="100">]] يعرض صورة. والـ [[alt]] هو النص اللي تقراه برامج قراءة الشاشة (screen readers).
- القوائم: [[<ul>]] = قائمة نقاط، و [[<ol>]] = قائمة مرقّمة، وكل عنصر فيها [[<li>]].
- [[<div>]] و [[<span>]] صناديق عامة ما لها معنى: الـ div يكون block، والـ span يكون inline.

الـ **semantic elements** صناديق **لها** معنى: [[<header>]] و [[<nav>]] و [[<main>]] و [[<section>]] و [[<article>]] و [[<aside>]] و [[<footer>]] و [[<figure>]]. تساعد محركات البحث وبرامج قراءة الشاشة.`,
  deeper: [
    `**الفرق بين id و class.** أي element يقدر ياخذهم. الـ [[id]] لازم يكون **فريد** في الصفحة (لعنصر واحد بس). أما الـ [[class]] فيتكرر على عناصر كثيرة، والعنصر الواحد يقدر ياخذ أكثر من class بينهم مسافات.`,
    null,
    { task: 'أضف [[<ul>]] فيها ثلاث مواد، وعطِ الـ section class ثاني اسمه **wide**. اضغط Run.' }
  ],
  points: [
    'العناوين h1 لين h6 توضح الهيكل، واستخدمها بالترتيب.',
    '[[<a href>]] للروابط، و [[<img src alt>]] للصور (الـ img يكون void).',
    '[[<ul>]] غير مرقّمة و [[<ol>]] مرقّمة، والاثنين فيها [[<li>]].',
    'الـ id = فريد (لعنصر واحد)، والـ class = يتكرر، ويقدر يحمل أكثر من اسم: [[class="card highlight"]].',
    'الـ semantic: header و nav و main و section و article و aside و footer و figure و address.',
    'الـ div = صندوق block، والـ span = صندوق inline، والاثنين ما لهم معنى.'
  ],
  exam: [
    'نماذج 2024-25: "Add a header tag inside body with class=navbar. Inside header, add a nav tag with id=main-nav"، و "Add a footer element with class=bottom and an address tag inside with id=contact-info".',
    '2025-26: "add an empty [[<div>]] with the id averageContainer and class average" (درجة وحدة، والـ attributes الاثنين على نفس الـ div).',
    'امتحانات قديمة: "the tag/attribute used to define a numbered list using lower roman" والجواب [[<ol type="i">]].'
  ],
  mistakes: [
    'العنصر له id واحد بس. استخدم class للأسماء الزيادة.',
    'أكثر من class يتكتبون في class attribute **واحد**، وبينهم مسافات.',
    'الـ img يكون void (ما له tag يسكّر)، ولازم يكون له alt text.'
  ],
  summary: [
    'الـ HTML يوصف المعنى: عناوين وفقرات وقوائم وروابط وصور.',
    'الـ semantic elements (مثل header و nav و main و footer) صناديق لها معنى.',
    'الـ id فريد والـ class يتكرر، وأكثر من class يتكتبون في attribute واحد.'
  ],
  recall: [
    { q: 'أي قائمة تعرض أرقام 1، 2، 3؟', why: 'الـ ol = ordered list (قائمة مرقّمة).' },
    { q: 'شلون تعطي عنصر واحد class اسمه card و class ثاني اسمه big؟', why: 'الـ classes تنفصل بمسافات داخل class attribute واحد.' },
    { q: 'أي element من هذول semantic؟', why: 'الـ footer له معنى (أسفل الصفحة أو القسم).' }
  ],
  challenge: `بأسلوب الامتحان (2024-25، Form B2):
- [[<header>]] عنده class اسمه **navbar**
- وداخله [[<nav>]] عنده id اسمه **main-nav**، وفيه رابطين
- وبعد الـ header، [[<footer>]] عنده class اسمه **bottom**، وداخله [[<address>]] عنده id اسمه **contact-info**`
};

LESSONS_AR['tables'] = {
  title: 'الجداول: thead و tbody و rowspan و colspan',
  big: `الجداول تعرض البيانات في صفوف (rows) وأعمدة (columns): درجات، أسعار، جداول مواعيد. وفي هالمادة الجداول مهمة مرتين: تكتبها بالـ HTML في Q1، وبعدين الـ JavaScript حقك **يضيف لها صفوف** في Q2. فإذا فهمت الهيكل زين، بيصير جزء الـ JS سهل.`,
  simple: `الجدول ينبني **صف صف**:
- [[<table>]] يحتوي كل شي.
- [[<tr>]] = صف في الجدول (table **row**).
- [[<th>]] = خلية عنوان (header cell)، وتطلع bold وفي الوسط بشكل افتراضي.
- [[<td>]] = خلية بيانات عادية.

الصفوف ممكن تتجمّع: [[<thead>]] لصفوف العناوين، و [[<tbody>]] لصفوف البيانات، و [[<tfoot>]] للمجاميع. و [[<caption>]] يعطي الجدول عنوان.

عشان تدمج خلايا: [[colspan="2"]] تخلي الخلية **أعرض** (على عمودين)، و [[rowspan="2"]] تخليها **أطول** (على صفين).`,
  deeper: [
    `هذا نفس الجدول اللي كان في ميد 2025-26: صف عناوين داخل [[<thead>]]، و [[<tbody>]] **فاضي** عنده id، جاهز للـ JavaScript.`,
    null,
    `**دمج الخلايا.** لما يكون في خلية [[rowspan="2"]]، الصف اللي تحتها يكون فيه خلية **أقل**، لأن مكانها صار محجوز. احسب خلايا كل صف، ولازم يطلع المجموع نفس عدد الأعمدة.`,
    { task: 'خلِّ الخلية A تاخذ صفين، وخلِّ الخلية اللي تحت تاخذ عمودين. لاحظ كيف الصفوف الثانية تنقص منها خلايا.' },
    `الـ attributes القديمة مثل [[border="1"]] و [[width="300"]] لين الحين تشتغل، بس في امتحان 2024-25 انطلب الشكل بـ **internal CSS**: [[table { width: 400px; border: 2px solid purple; }]] و [[th, td { padding: 15px; }]].`
  ],
  points: [
    'الهيكل: table ← tr ← th أو td. لا تكتب نص مباشرة داخل الـ tr.',
    'الـ th = خلية عنوان، والـ td = خلية بيانات.',
    'الـ thead و tbody و tfoot يجمعون الصفوف، وكل واحد منهم لازم يكون داخله tr.',
    'الـ colspan = على أعمدة (أعرض)، والـ rowspan = على صفوف (أطول).',
    'مع الـ rowspan، الصفوف اللي تحت تحتاج خلايا أقل.',
    'عطِ الـ tbody id إذا الـ JavaScript بيضيف صفوف: [[<tbody id="gradeTbody">]].'
  ],
  exam: [
    '2025-26: "a [[<table>]] with id gradeTable… a [[<thead>]] with a row containing two headers (th)… an empty [[<tbody>]] with the id gradeTbody" = 6 درجات.',
    'امتحانات قديمة: ارسم هالجدول من صورة باستخدام rowspan و colspan (6 لين 8 درجات).',
    'MCQ: "The valid tag/attribute used to merge three table cells from different rows" والجواب [[<td rowspan="3">]].'
  ],
  mistakes: [
    'الخلايا دايمًا تكون داخل tr، حتى داخل الـ thead. والـ tr عليه درجة.',
    'الـ colspan والـ rowspan ينحطون على الخلايا (td أو th)، أبد مو على الـ tr.'
  ],
  summary: [
    'table ← (thead أو tbody) ← tr ← th أو td.',
    'الـ colspan = أعرض، والـ rowspan = أطول، وينحطون على td أو th بس.',
    'الـ tbody الفاضي اللي له id هو المكان اللي الـ JS بيضيف فيه الصفوف بعدين.'
  ],
  recall: [
    { q: 'أي attribute يدمج خلية على 3 أعمدة في نفس الصف؟', why: 'الـ colspan = columns = أفقي.' },
    { q: 'أي element هو خلية العنوان؟', why: 'الـ th خلية، أما الـ thead فهو مجموعة صفوف.' },
    { q: 'في جدول من 3 أعمدة، خلية في الصف الأول فيها [[rowspan="2"]]. كم خلية يحتاج الصف الثاني؟', why: 'عمود واحد من الصف الثاني محجوز للخلية الطويلة، يعني 3 − 1 = 2.' }
  ],
  challenge: `ابنِ جدول 2025-26:
- [[<table>]] عنده id اسمه **gradeTable**
- [[<thead>]] فيه صف واحد فيه خليتين عنوان: **Student ID** و **Grade**
- [[<tbody>]] فاضي عنده id اسمه **gradeTbody**`
};

LESSONS_AR['forms'] = {
  title: 'الـ Forms والـ inputs والأزرار',
  big: `الـ forms هي الطريقة اللي المستخدم يعطي فيها بيانات للصفحة: تسجيل دخول، بحث، إضافة درجة. الـ HTML form يحدد **وش** يقدر المستخدم يكتب، و**أي قواعد** يتأكد منها الـ browser قبل ما ينرسل أي شي. وفي Q1 من الامتحان، الـ form هو أكبر جزء.`,
  simple: `الـ form صندوق فيه controls:
- [[<form id="gradeForm">]] يحتويهم. ([[action]] و [[method]] يحددون وين تنرسل البيانات، ومع الـ JavaScript عادةً نوقف الإرسال.)
- [[<input>]] هو أكثر control يستخدم، والـ [[type]] حقه يغيّره: text و number و email و password و checkbox و radio و date.
- [[<label for="x">]] هو النص اللي جنب الـ input، والـ [[for]] لازم يطابق الـ [[id]] حق الـ input.
- [[<select>]] مع [[<option>]] يسوون قائمة منسدلة (drop-down)، و [[<textarea>]] نص بأكثر من سطر.
- [[<fieldset>]] يجمع الـ controls، ومعه [[<legend>]] كعنوان.

attributes مفيدة: [[id]] و [[name]] و [[placeholder]] و [[value]] و [[required]] (ما ينفع يكون فاضي)، و [[min]] و [[max]] (للأرقام).`,
  deeper: [
    `**نوعين من الأزرار.** داخل الـ form، الـ [[<button>]] يكون **submit** بشكل افتراضي. إذا تبي زر يشغّل JavaScript بس (مثل "Calculate Average")، اكتب [[type="button"]].`,
    null,
    `**الـ validation المدمج.** مع [[required]] و [[min]] و [[max]]، الـ browser يرفض يرسل القيم الغلط ويطلع رسالة. جرّب: خلِّ الـ grade فاضي، أو اكتب 150، واضغط Add Grade.`,
    { task: 'سوّ submit مرة والـ grade فاضي، ومرة بـ 150، ومرة بـ 85. بعدين أضف [[<select>]] للفصل الدراسي.' },
    `أنواع input ثانية لازم تعرفها: [[email]] و [[password]] و [[checkbox]] و [[radio]] (أزرار الـ radio اللي لها نفس الـ [[name]] تكون مجموعة وحدة، وتقدر تختار واحد بس منها)، و [[date]] و [[color]] و [[range]] و [[file]] و [[hidden]].`
  ],
  points: [
    'كل control يحتاج id إذا الـ JavaScript بيقراه.',
    '[[type="number" min="0" max="100"]] يحدد مدى الرقم.',
    '[[required]] هو boolean attribute: بس اكتبه، ما يحتاج قيمة.',
    'الزر داخل الـ form يكون submit بشكل افتراضي، فاستخدم [[type="button"]] للأزرار اللي للـ JS بس.',
    'الـ label for="id" يربط النص بالـ input.',
    'أزرار الـ radio اللي لها نفس الـ name تكون مجموعة وحدة.'
  ],
  exam: [
    '2025-26 Q1: input عنده id اسمه studentId و required (درجة)، و input عنده id اسمه studentGrade، و type number، و min 0، و max 100، و required (درجة).',
    '"A [[<button>]] with an id of addGradeBtn and type=submit" (درجة)، و "a [[<button>]] with id calcAvgBtn and type=button" (درجة).',
    '2024-25: "Add a form with class contact-form; inside it a fieldset with id user-info".'
  ],
  mistakes: [
    'حط القيم بين علامات تنصيص. والـ required ما يقبل قيمة "no": إذا موجود، فالحقل مطلوب.',
    'بدون type="button" يسوي submit للـ form (والصفحة تسوي reload).',
    'الـ input يكون void، والنص اللي جنبه يتكتب في label.'
  ],
  summary: [
    'الـ form وداخله inputs، ولكل واحد id و type وقواعد (required و min و max).',
    'type="submit" يرسل الـ form، و type="button" يشغّل JS بس.',
    'الـ label for و select مع option و textarea و fieldset مع legend يكمّلون المجموعة.'
  ],
  recall: [
    { q: 'أي input يقبل أرقام بس من 0 لين 100 ولازم ينعبّى؟', why: 'type number مع min و max و required.' },
    { q: 'وش يسوي الـ [[<button>]] داخل الـ form بشكل افتراضي؟', o: ['ولا شي', 'يسوي submit للـ form', 'يسوي reset للـ form', 'يفتح صفحة جديدة'], why: 'الـ type الافتراضي هو submit.' },
    { q: 'زرّين radio يكونون في نفس المجموعة لما يكون عندهم نفس الـ…', why: 'نفس الـ name = مجموعة وحدة، وواحد بس ينختار.' }
  ],
  challenge: `اكتب form امتحان 2025-26:
- [[<form>]] عنده id اسمه **gradeForm**
- text input عنده id اسمه **studentId**، و required
- number input عنده id اسمه **studentGrade**، و min **0**، و max **100**، و required
- زر عنده id اسمه **addGradeBtn**، و type submit، ومكتوب عليه "Add Grade"
- زر عنده id اسمه **calcAvgBtn**، و type button، ومكتوب عليه "Calculate Average"`
};

LESSONS_AR['css-selectors'] = {
  title: 'وين ينكتب الـ CSS والـ selectors الأساسية',
  big: `الـ CSS عبارة عن قائمة rules. كل rule يقول **أي عناصر** (الـ selector) و**وش يتغير** (الـ declarations). المهارة كلها إنك تختار العناصر الصح: الامتحان يعطيك جملة مثل "all inputs inside a form" وأنت لازم تكتب الـ selector.`,
  simple: `شكل الـ rule كذا: [[selector { property: value; }]]

فيه ثلاث أماكن تكتب فيها CSS:
- **Inline**: [[<p style="color:red">]]. لهالعنصر بس.
- **Embedded / internal**: [[<style>]] block داخل الـ head. لهالصفحة بس.
- **External**: ملف .css مربوط بـ [[<link>]]. صفحات كثيرة تشاركه، وهذي الطريقة المفضلة.

الـ selectors الأساسية:
- [[p]] ← كل عناصر الـ p.
- [[.average]] ← كل عنصر عنده class اسمه average.
- [[#studentId]] ← العنصر اللي الـ id حقه studentId.
- [[div.average]] ← عناصر الـ **div** بس اللي عندها class اسمه average (بدون مسافة!).
- [[h1, h2, h3]] ← مجموعة (group): نفس الـ rule للثلاثة.
- [[*]] ← كل العناصر.`,
  deeper: [
    `الـ **attribute selectors** تختار العناصر حسب attribute معيّن. الامتحان استخدم [[input[type="number"]]]: يعني كل input نوعه number.`,
    null,
    `الـ **pseudo-classes** تختار حالة (state): [[a:hover]] (لما الماوس فوقه)، و [[a:visited]]، و [[input:focus]]، و [[li:first-child]]، و [[li:nth-child(2)]]، و [[:not(.x)]]. أما الـ **pseudo-elements** فتختار جزء: [[p::first-line]] و [[::before]] و [[::after]].`,
    { task: 'خلِّ كل الـ number inputs لونها أحمر، والـ div اللي عنده class اسمه average يكون bold وخلفيته lightblue، والروابط تصير خضراء لما يكون الماوس فوقها.' }
  ],
  points: [
    'الـ rule = selector + { property: value; }. وكل declaration تنتهي بـ ;',
    'النقطة . = class، والـ # = id، والكلمة لحالها = element.',
    '[[div.average]] (بدون مسافة) = div عنده هالـ class.',
    'الفاصلة = group: [[th, td { … }]].',
    'الـ attribute selector: [[input[type="number"]]].',
    'الـ CSS الخارجي هو المفضل: ملف واحد يسوي style لصفحات كثيرة.'
  ],
  exam: [
    '2025-26 Q1 CSS: "selects any [[<div>]] element that has been given the class average… font weight bold and background color lightblue" والجواب [[div.average { font-weight: bold; background-color: lightblue; }]].',
    '"selects all [[<input>]] elements of type=number and makes their color #ff0000" والجواب [[input[type="number"] { color: #ff0000; }]].',
    'MCQ: "The style sheet that changes the appearance of all pages at once" والجواب external.'
  ],
  mistakes: [
    'مع المسافة يصير المعنى: عنصر عنده class اسمه average **داخل** div، مو الـ div نفسه.',
    'يشتغل بدون علامات تنصيص، بس الأضمن في الامتحان إنك تكتب علامات التنصيص والـ semicolon.',
    'الـ id يحتاج #، والـ class يحتاج نقطة.'
  ],
  summary: [
    'inline < embedded < external (والـ external هو الاختيار الاحترافي).',
    'element و .class و #id و element.class، والـ group بالفواصل.',
    'attribute مثل [type="number"]، و pseudo-class مثل :hover، و pseudo-element مثل ::before.'
  ],
  recall: [
    { q: 'أي selector يختار عناصر الـ div بس اللي عندها class اسمه average؟', why: 'بدون مسافة بين الـ element والـ class.' },
    { q: 'أي selector يختار الـ inputs اللي نوعها number؟', why: 'attribute selector بين أقواس مربعة.' },
    { q: 'أي طريقة لإضافة الـ CSS تقدر تسوي style لصفحات كثيرة مرة وحدة؟', o: ['Inline', 'Embedded', 'External', 'كلهم'], why: 'ملف external واحد مربوط من كل صفحة.' }
  ],
  challenge: `اكتب rules الامتحان الثلاثة في تاب الـ CSS:
1. عناصر الـ [[input]] اللي نوعها number ← اللون **#ff0000**
2. عناصر الـ [[div]] اللي عندها class اسمه **average** ← bold والخلفية **lightblue**
3. كل الـ [[th]] والـ [[td]] ← padding **10px** (rule واحد باستخدام فاصلة)`
};

LESSONS_AR['combinators'] = {
  title: 'الـ Combinators: المسافة و > و + و ~',
  big: `الـ combinators تختار العناصر حسب **مكانها** مقارنة بعناصر ثانية: داخل، أو داخل مباشرة، أو بعده على طول، أو في أي مكان بعده. موجودة في كل ميد في السنوات الأخيرة، سواء في كتابة الـ rules (مثل [[form input]]) أو في ألغاز "أي لون يفوز؟".`,
  simple: `تخيل شجرة العائلة.
- **Descendant** [[A B]] (مسافة): أي B **داخل** A، على أي عمق (ولد، أو حفيد…).
- **Child** [[A > B]]: الـ B اللي هو ولد **مباشر** لـ A.
- **Adjacent sibling** [[A + B]]: الـ B اللي يجي **بعد** A **على طول**، ولهم نفس الأب.
- **General sibling** [[A ~ B]]: **كل** B يجي بعد A، ولهم نفس الأب.

الإخوان (siblings) دايمًا يشوفون **لقدّام** (للعناصر اللي بعدهم)، أبد ما يرجعون لورا.`,
  deeper: [
    `جرّب الـ demo الحي: كل rule يلوّن عناصر مختلفة. غيّر الـ selectors وتوقّع النتيجة قبل ما تضغط Run.`,
    { task: 'توقّع أي فقرة بتاخذ أي لون، وبعدين اضغط Run. غيّر [[.title + p]] لـ [[.title ~ p]] وشغّله مرة ثانية.' },
    `**rule امتحان 2025-26** كان descendant selector: "selects all [[<input>]] elements that are inside a [[<form>]] element".`,
    null,
    `**انتبه للاتجاه.** [[input + .border]] معناه "عنصر عنده class اسمه border يجي بعد input على طول"، مو الـ input نفسه. في الألغاز، العنصر اللي ياخذ الـ style هو دايمًا **آخر** جزء في الـ selector.`
  ],
  points: [
    'المسافة = descendant (على أي عمق).',
    '> = ولد مباشر بس (direct child).',
    '+ = الأخ اللي بعده على طول.',
    '~ = كل الإخوان اللي بعده.',
    'العنصر اللي ياخذ الـ style هو آخر simple selector في السلسلة.',
    'الإخوان لازم يكون لهم نفس الأب، ويجون بعد.'
  ],
  exam: [
    '2025-26: "a CSS rule that selects all input elements inside a form… 5px padding top/bottom and 10px left/right, 1px solid black border" (درجتين).',
    'كل نماذج 2024-25: "What border/color will be applied to …?" مع rules مثل [[.card p]] و [[.title + p]] و [[p .title]] و [[.title ~ p]] و [[input > .border]].',
    'شوف Practice ← Specificity puzzles، فيها أمثلة كثيرة من هالنوع.'
  ],
  mistakes: [
    'الفاصلة معناها form **و** input كل واحد لحاله. أما المسافة فمعناها input داخل form.',
    'الجزء الأخير (p) هو اللي ياخذ الـ style.'
  ],
  summary: [
    'A B داخل · A > B ولد مباشر · A + B الأخ اللي بعده · A ~ B كل الإخوان اللي بعده.',
    'آخر جزء في الـ selector هو العنصر اللي يتغير.',
    'الإخوان: نفس الأب، ولقدّام بس.'
  ],
  recall: [
    { q: 'أي selector يختار الـ inputs في أي مكان داخل form؟', why: 'المسافة = descendant على أي عمق.' },
    { q: '[[h2 + p]] يختار…', o: ['كل الـ p اللي بعد h2', 'الـ p اللي يجي بعد h2 على طول', 'الـ h2 اللي قبل p', 'الـ p اللي داخل h2'], why: 'الـ + هو الأخ اللي بعده مباشرة (adjacent sibling).' },
    { q: 'في [[.menu a]]، أي عنصر ياخذ الـ style؟', o: ['.menu', 'a', 'الاثنين', 'ولا واحد'], why: 'آخر جزء في الـ selector هو اللي ياخذ الـ style.' }
  ],
  challenge: `باستخدام الـ combinators بس (بدون ما تضيف classes جديدة في الـ HTML):
1. كل الـ inputs داخل الـ form: padding **5px 10px**، و border **1px solid black**
2. أول [[p]] بس اللي يجي بعد الـ [[h2]] على طول: اللون **red**
3. عناصر الـ [[li]] بس اللي هي أولاد **مباشرين** لـ [[ul.menu]]: border-bottom **1px solid gray**`
};

LESSONS_AR['specificity'] = {
  title: 'الـ Cascade والـ specificity: أي rule يفوز؟',
  big: `كثير مرات يكون فيه rules اثنين يستهدفون نفس العنصر بقيم مختلفة، والـ browser يحتاج طريقة يقرر فيها. هالنظام اسمه **cascade**، وأهم أداة فيه هي **specificity**. ميد 2024-25 كان فيه سؤالين ألغاز على هالشي بالضبط.`,
  simple: `لما يتعارض أكثر من rule، الـ browser يسأل بالترتيب:

1. **هل الـ rule أصلًا ينطبق على العنصر؟** الـ rule اللي ما يختار العنصر ما ينحسب. (أغلب أغلاط الألغاز تكون هني.)
2. **أيهم specific أكثر؟** احسب score من ثلاث أرقام **(ids, classes, elements)**:
- كل [[#id]] ← (1,0,0)
- كل [[.class]] أو [[[attribute]]] أو [[:pseudo-class]] ← (0,1,0)
- كل element مثل [[p]] أو [[div]] ← (0,0,1)
قارن من اليسار لليمين: id واحد يغلب أي عدد من الـ classes.
3. **نفس الـ score؟** الـ rule اللي مكتوب **آخر** يفوز.

الـ inline [[style=""]] يغلب كل هذول، و [[!important]] يغلب حتى الـ inline (تجنّبه).`,
  deeper: [
    `**مثال محلول (ميد 2024-25، Form B2).**`,
    null,
    null,
    `**First paragraph:** ينطبق عليه [[.card p]] و [[.title + p]] و [[.title ~ p]]. أما [[p .title]] و [[p + .title]] فيسوون style لعنصر عنده class اسمه title، فما ينطبقون على p. الـ rules الثلاثة اللي تنطبق كلهم score حقهم (0,1,1)، يعني تعادل، فيفوز **آخر** واحد: [[.title ~ p]] ← **red**.

**Second paragraph:** ينطبق عليه [[.card p]] و [[.title ~ p]] (مو [[+]]، لأنه مو بعد الـ h2 على طول). تعادل مرة ثانية ← الأخير ← **red**.`,
    { task: 'أضف [[#main p { color: green; }]] في **أول** الـ CSS. يفوز ولا لا؟ وليش؟' },
    `الجواب: يفوز. الـ [[#main p]] الـ score حقه (1,0,1)، والـ id يغلب أي عدد من الـ classes، فمكانه في الملف ما يفرق.

الـ **Inheritance** (الوراثة) شي ثاني: بعض الـ properties مثل [[color]] و [[font-family]] تنتقل من الأب للأولاد لما ما يكون فيه شي يستهدف الولد. وأي rule ينطبق على الولد يغلب القيمة الموروثة.`
  ],
  points: [
    'الخطوة الأولى: شيل الـ rules اللي ما تنطبق على العنصر.',
    'الـ score = (ids، ثم classes و attributes و pseudo-classes، ثم elements).',
    'قارن من اليسار لليمين، والـ id الواحد يغلب 10 classes.',
    'إذا تعادلوا ← الـ rule الأخير يفوز.',
    'الـ inline style يغلب الـ selectors، و !important يغلب الـ inline.',
    'القيم الموروثة تخسر قدام أي rule ينطبق.'
  ],
  exam: [
    '2024-25 Form A و C: الـ rules هي [[.form input]] و [[input > .border]] و [[input .border]] و [[.border ~ input]] و [[input + .border]]. ولا عنصر عنده class اسمه border، فما ينطبق إلا [[.form input]] على الـ inputs الاثنين ← 1px solid.',
    '2024-25 Form B: [[.menu a]] الـ score حقه (0,1,1) ولونه gray، و [[div .dropdown]] الـ score حقه (0,1,1) ولونه yellow، و [[a .dropdown]] لونه blue (ما ينطبق)، و [[.dropdown ~ a]] الـ score حقه (0,1,1) ولونه red، و [[a + .dropdown]] لونه purple (ما ينطبق). الـ "Products" عنده class اسمه dropdown ← yellow. والـ "Services" يجي بعد .dropdown ← red.',
    'MCQ قديم: الـ h3 في الـ external لونه blue، وفي الـ internal لونه red، والـ inline لونه yellow ← yellow (الـ inline يفوز).'
  ],
  mistakes: [
    'تأكد إنه ينطبق أول. الـ specificity تقارن بس بين الـ rules اللي تنطبق.',
    'قارن عمود الـ id أول.'
  ],
  summary: [
    'أول شي ينطبق ولا لا، بعدين الـ specificity (id, class, element)، بعدين الترتيب.',
    'الـ id > الـ class > الـ element، والتعادل يروح للـ rule الأخير.',
    'الـ inline style يغلب كل الـ selectors.'
  ],
  recall: [
    { q: 'أي واحد عنده أعلى specificity؟', why: 'الـ [[#menu a]] الـ score حقه (1,0,1)، والـ id يغلب كل الباقي هني.' },
    { q: 'rules اثنين ينطبقون، والـ score حق كل واحد (0,1,1). أي واحد يفوز؟', o: ['الأول', 'الأخير', 'ولا واحد، وتنطبق القيمة الافتراضية', 'الأقصر'], why: 'إذا تعادلوا، الـ rule الأخير يفوز.' },
    { q: 'هل [[input + .border]] يسوي style لـ input؟', o: ['إيه، لأي input', 'إيه، للـ input اللي قبل .border', 'لا، يسوي style لعنصر عنده class اسمه border يجي بعد input على طول', 'لا، ما يسوي style لأي شي'], why: 'آخر جزء (.border) هو العنصر اللي ياخذ الـ style.' }
  ],
  challenge: `بدون ما تغيّر الـ HTML، خلِّ الفقرة لونها **green** بإضافة rule **واحد** في **أول** الـ CSS (لازم يفوز حتى لو هو الأول).`
};

LESSONS_AR['box-model'] = {
  title: 'الـ Box model والوحدات والألوان والنصوص',
  big: `كل element هو مستطيل. الـ CSS يتحكم بالمسافة **داخله**، و**الـ border** حقه، والمسافة **حوله**. وإذا أضفت الوحدات والألوان وتأثيرات النص، بتقدر تجاوب كل MCQ عن الـ styling الأساسي في الامتحانات القديمة.`,
  simple: `من الداخل لبرّا:
- **content**: النص أو الصورة
- **padding**: المسافة بين الـ content والـ border (داخل الصندوق، وتبين فيها الخلفية)
- **border**: الخط اللي حول الصندوق
- **margin**: المسافة برّا الـ border، بين الصناديق

ترتيب الاختصار (shorthand) **مع عقارب الساعة من فوق**: [[padding: 5px 10px 15px 20px]] = فوق يمين تحت يسار. ومع قيمتين، [[padding: 5px 10px]] = فوق وتحت 5px، ويمين ويسار 10px.

الـ [[width]] عادةً يحدد عرض الـ **content** بس. مع [[box-sizing: border-box]]، الـ width يشمل الـ padding والـ border، وهذا أسهل بوايد.`,
  deeper: [
    { task: 'غيّر الـ padding والـ border والـ margin ولاحظ الصندوق. بعدين حوّل الـ [[box-sizing]] لـ [[border-box]] وقارن العرض.' },
    `**الوحدات.** الـ [[px]] ثابت. الـ [[%]] نسبة من الأب. الـ [[em]] نسبة من حجم خط العنصر نفسه. الـ [[rem]] نسبة من حجم خط الـ **root** (الـ html)، فلما مستخدم نظره ضعيف يكبّر الخط في الـ browser، الأحجام اللي بالـ rem تكبر معاه. MCQ الامتحان: الأفضل للـ accessibility ← **rem**. والـ [[vw]] و [[vh]] نسبة من الـ viewport.

**الألوان.** بالاسم ([[lightblue]])، أو hex ([[#ff0000]])، أو [[rgb(255, 0, 0)]]، أو [[rgba(r, g, b, alpha)]] والـ alpha فيه من 0 (شفاف كامل) لين 1 (معتم). كل ما قلّ الـ alpha = شفاف أكثر.`,
    null
  ],
  points: [
    'content ← padding ← border ← margin.',
    'الاختصار بقيمتين: الرأسي بعدين الأفقي. وبأربع قيم: فوق يمين تحت يسار.',
    'اختصار الـ border: width بعدين style بعدين color، مثل [[1px solid black]].',
    'الـ box-sizing: border-box يخلي الـ width يشمل الـ padding والـ border.',
    'الـ rem = أحجام خط مناسبة للـ accessibility، وفي الـ rgba الـ alpha 0 = مخفي، و 1 = معتم.',
    'الـ text-shadow ترتيبه x y blur color: الـ y السالب = لفوق، والـ x الموجب = لليمين.'
  ],
  exam: [
    'MCQ: "inner space between the content and border" والجواب padding.',
    'MCQ: "best unit for people with vision impairment" والجواب rem.',
    'MCQ: "shadow positioned top-right of the text" والجواب [[text-shadow: 20px -20px 5px …]].',
    'MCQ: "highest transparent background" والجواب الـ rgba اللي الـ alpha حقه أصغر، مثل [[rgba(22,11,33,0.4)]].',
    'MCQ: "background image repeated horizontally" والجواب [[background-repeat: repeat-x]].'
  ],
  mistakes: [
    'القيم تنفصل بمسافات، مو بفواصل.',
    'بدون style (مثل solid أو dashed…) ما ينرسم أي border.',
    'الـ alpha رقم من 0 لين 1.'
  ],
  summary: [
    'الـ padding داخل، والـ margin برّا، والـ border بينهم.',
    'الاختصار يمشي مع عقارب الساعة من فوق.',
    'الـ rem للـ accessibility، والـ alpha في الـ rgba يتحكم بالشفافية.'
  ],
  recall: [
    { q: '[[padding: 5px 10px]] معناه…', o: ['فوق 5، يمين 10، تحت 0، يسار 0', 'فوق وتحت 5px، ويمين ويسار 10px', 'يمين ويسار 5px، وفوق وتحت 10px', 'كل الجهات 15px'], why: 'قيمتين: الرأسي بعدين الأفقي.' },
    { q: 'أي خلفية هي الأكثر شفافية؟', why: 'أصغر alpha هو الأكثر شفافية.' },
    { q: 'المسافة اللي برّا الـ border، بين صندوقين، اسمها…', why: 'الـ margin يكون برّا الـ border.' }
  ],
  challenge: `سوّ style للـ [[.card]]:
- padding: **15px** فوق وتحت، و **25px** يمين ويسار (في سطر واحد)
- border: **2px solid purple**
- margin-bottom: **20px**
- الخلفية: أسود بشفافية **50%** باستخدام rgba
- نص الـ [[h1]] كله uppercase، ومعه shadow **3px لليمين و 3px لفوق**، و blur 2px، ولونه gray`
};

LESSONS_AR['display-position'] = {
  title: 'الـ Normal flow والـ display والـ positioning',
  big: `قبل الـ Flexbox، لازم تعرف شلون الـ browser يرتب الصناديق لحاله (normal flow)، وشلون تطلّعها منه. هذا يفسّر ليش الـ [[<div>]] ياخذ سطر كامل والـ [[<span>]] لا، وشلون ينسوّى مثلًا badge في زاوية أو header ثابت لما تسوي scroll.`,
  simple: `في الـ **Normal flow**: عناصر الـ block (مثل div و p و h1 و section و form و table…) تبدأ في سطر جديد وتاخذ العرض كامل. وعناصر الـ inline (مثل span و a و strong و img و input…) تجلس داخل سطر النص، وعرضها على قد محتواها.

تقدر تغيّر هالشي بالـ [[display]]: [[block]] و [[inline]] و [[inline-block]] (inline بس يقبل width و height) و [[none]] (مخفي وما ياخذ مكان) و [[flex]] و [[grid]].

الـ [[position]] يحرّك الصناديق:
- [[static]] (الافتراضي): normal flow.
- [[relative]]: يتحرك من مكانه الطبيعي بـ top و left، ومكانه الأصلي يبقى محجوز.
- [[absolute]]: يطلع من الـ flow، ويتحدد مكانه على حسب **أقرب أب عنده position** (يعني غير static).
- [[fixed]]: مكانه على حسب نافذة الـ browser، ويبقى في مكانه لما تسوي scroll.
- [[sticky]]: عادي لين توصل له بالـ scroll، بعدين يلصق.`,
  deeper: [
    { task: 'غيّر الـ [[.badge]] من absolute لـ relative، بعدين شيل [[position: relative]] من الـ [[.card]]. وين يروح الـ badge في كل مرة؟' },
    `الـ **Floats** ([[float: left]]) كانت الطريقة القديمة عشان تحط صناديق جنب بعض، وعشان النص يلتف حول الصور. الحين الـ Flexbox والـ Grid هم اللي يسوون الـ layout، والـ floats لين الحين تستخدم عشان النص يلتف حول صورة.

الـ [[visibility: hidden]] يخفي العنصر بس **يخلي** مكانه، أما الـ [[display: none]] فيشيله كامل.`
  ],
  points: [
    'الـ Block: سطر جديد وعرض كامل. والـ Inline: داخل سطر النص وعرضه على قد محتواه.',
    'الـ inline-block: inline بس يقبل width و height.',
    'الـ display: none يشيل العنصر، والـ visibility: hidden يخلي مكانه.',
    'الـ absolute ← على حسب أقرب أب عنده position.',
    'الـ fixed ← على حسب الـ viewport، والـ sticky ← يلصق وأنت تسوي scroll.',
    'استخدم position: relative على الأب عشان تثبّت ولد absolute داخله.'
  ],
  exam: [
    'بأسلوب MCQ: "position: absolute is placed relative to…" والجواب the nearest positioned ancestor.',
    'ميد 2022-23: "Box B should be turned off in the mobile view" والجواب [[display: none]] داخل media query.'
  ],
  mistakes: [
    'عناصر الـ inline تتجاهل الـ width والـ height.',
    'بدون أب عنده position، الـ badge يتحدد مكانه على حسب الصفحة كلها.'
  ],
  summary: [
    'الـ Block والـ inline هم الـ flow الافتراضي.',
    'الـ display يغيّر نوع الصندوق، والـ none يخفيه كامل.',
    'الـ relative = تحريك بسيط، والـ absolute = تحطه داخل أب عنده position، والـ fixed = يلصق في النافذة.'
  ],
  recall: [
    { q: 'أي element يكون block بشكل افتراضي؟', why: 'الـ div يبدأ في سطر جديد وياخذ العرض كامل.' },
    { q: 'العنصر الـ absolute يتحدد مكانه على حسب…', o: ['الأخ اللي قبله', 'أقرب أب مو static', 'الـ body دايمًا', 'أول ولد له'], why: 'أقرب أب عنده position (يعني relative أو absolute أو fixed أو sticky).' },
    { q: 'أي واحد يخفي العنصر **ويشيل** مكانه؟', why: 'الـ display: none يطلّعه من الـ layout.' }
  ],
  challenge: `حط الـ [[.badge]] في **الزاوية اللي فوق على اليمين** من الـ [[.card]] (top 0 و right 0) باستخدام الـ positioning، وخفِّ الـ [[.old]] كامل (بدون ما يبقى مكانه).`
};

LESSONS_AR['flexbox'] = {
  title: 'الـ Flexbox',
  big: `الـ Flexbox هو الطريقة الحديثة عشان تحط صناديق في صف (row) أو عمود (column)، وتوزّع المسافات بينها وتخليها في الوسط. وهو one-dimensional: يرتب العناصر على خط **واحد** بس (صف أو عمود). ميد 2022-23 كان فيه 12 درجة على layout بالـ Flexbox.`,
  simple: `حط [[display: flex]] على **الأب** (الـ container)، وعياله المباشرين يصيرون **flex items** ويتصفّون.

فيه محورين:
- الـ **Main axis**: اتجاه الـ [[flex-direction]] ([[row]] = من اليسار لليمين، وهو الافتراضي، و [[column]] = من فوق لتحت).
- الـ **Cross axis**: الاتجاه الثاني.

properties الـ container:
- [[justify-content]] ← على الـ **main** axis: flex-start و center و flex-end و space-between و space-around و space-evenly.
- [[align-items]] ← على الـ **cross** axis: stretch (الافتراضي) و center و flex-start و flex-end.
- [[flex-wrap: wrap]] يخلي العناصر تنزل لسطر جديد، و [[gap]] يضيف مسافة بين العناصر.

properties الـ items: [[flex: 1]] (يكبر عشان يتقاسم المساحة)، و [[order]]، و [[align-self]].`,
  deeper: [
    { task: 'جرّب justify-content بـ center ثم space-between ثم space-around. بعدين حط flex-direction: column على [[.right]]، وخلِّ M و N في الوسط من الجهتين.' },
    `**توسيط عنصر من الجهتين** هي الحركة المشهورة في الـ Flexbox:`,
    null,
    `الـ **Grid** (موجود بعد في Ch7) يكون two-dimensional: صفوف **و** أعمدة، مثل [[display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;]]. استخدم الـ Flexbox لصف من العناصر، والـ Grid للـ layout حق الصفحة كاملة.`
  ],
  points: [
    'الـ display: flex ينحط على الـ container.',
    'بس العيال المباشرين يصيرون flex items.',
    'الـ justify-content = الـ main axis، والـ align-items = الـ cross axis.',
    'الـ flex-direction: column يبدّل المحورين.',
    'الـ gap = مسافة بين العناصر، والـ flex-wrap: wrap يسمح بسطور جديدة.',
    'الـ flex: 1 يخلي العناصر تتقاسم المساحة الفاضية.'
  ],
  exam: [
    'ميد 2022-23 Q4 (12 درجة): الـ container عليه [[display: flex]] (درجة)، والصناديق A و B و C في صف واحد مع مسافات (2.5)، و M و N في عمود في الوسط من الجهتين (2.5)، و M و N خلفيتهم blue و margin فوق وتحت 5px و width 50% (2.5).',
    'سؤال قصير: "Explain the Flexbox model and what you can do with it" والجواب: a one-dimensional layout model for distributing space and aligning items in a row or column.'
  ],
  mistakes: [
    'properties الـ flex حق الـ layout تنحط على الأب.',
    'في الـ column، الـ main axis يكون رأسي، فالأفقي يصير هو الـ cross axis (يعني align-items).'
  ],
  summary: [
    'الأب: display flex + direction + justify-content + align-items.',
    'الـ main axis يمشي مع الـ flex-direction، والـ cross axis هو الثاني.',
    'التوسيط: justify-content: center + align-items: center.'
  ],
  recall: [
    { q: 'في container فيه [[flex-direction: row]]، أي property يخلي العناصر في الوسط أفقيًا؟', why: 'الـ row ← الـ main axis أفقي ← justify-content.' },
    { q: 'وين تكتب [[display: flex]]؟', o: ['على كل item', 'على الـ container الأب', 'على الـ body بس', 'على أول ولد'], why: 'الـ container يصير flex container، وعياله يصيرون items.' },
    { q: 'أي قيمة تحط أول عنصر وآخر عنصر على الأطراف، وتوزّع الباقي بمسافات متساوية بينهم؟', why: 'الـ space-between يدف العناصر للطرفين.' }
  ],
  challenge: `في الـ [[.container]]: حط A و B و C **في صف واحد**، مع **space-between**، وخلّهم في الوسط **رأسيًا**. بعدين خلِّ الـ [[.right]] عمود flex (**column**)، وخلِّ M و N في الوسط **أفقيًا ورأسيًا**.`
};

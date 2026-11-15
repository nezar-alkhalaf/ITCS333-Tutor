/* Arabic versions of module 11 (Managing state). Aligned item by item with js/content7.js. */
(() => {
  const R = String.raw;
  const NOTE = R`**في الـ lab**: الـ Run يبدأ **زائر جديد** (بدون cookies وبدون session). ولما تضغط رابط أو ترسل form **داخل النتيجة**، الـ request الجاي ينرسل من **نفس** الزائر، فالـ cookies والـ session ينتقلون معاه. والـ log اللي تحت النتيجة يعرض كل [[Set-Cookie]]، والـ cookies اللي عند الـ browser الحين، واللي داخل [[$_SESSION]].`;

  LESSONS_AR['state-http'] = {
    title: 'الـ HTTP ينسى: ليش تطبيقات الـ web تحتاج state',
    big: R`الـ HTTP **stateless**: كل request ينرد عليه بروحه، والـ server ما يتذكر شي عن اللي قبله. فبالنسبة للـ server، ثاني ضغطة منك كأنها من واحد غريب. ومع ذلك المواقع تتذكر السلة حقتك، وتسجيل دخولك، ولغتك. وهالفصل يشرح شلون: إما ترسل قطع صغيرة من الـ **state** مع كل request (في الـ URL، أو في خانات form مخفية، أو في cookies)، أو تخليها على الـ server وتعطي الـ browser بس مفتاح (الـ sessions).

${NOTE}`,
    simple: R`طرق تنقل فيها معلومة من request للي بعده:
- الـ **Query string**: [[page.php?page=3&sort=price]]. تبين في الـ URL، وتقدر تسوي لها bookmark وتشاركها. زينة حق "أي صفحة / أي غرض".
- الـ **Hidden form field**: [[<input type="hidden" name="step" value="2">]]. تنرسل مع الـ form، وما تطلع في الصفحة (بس تبين في الـ source، والمستخدم يقدر يغيّرها).
- الـ **Cookie**: زوج name=value صغير يحفظه الـ **browser** ويرجّعه بروحه مع كل request لهالموقع.
- الـ **Session**: بيانات محفوظة **على الـ server**، والـ browser بس عنده cookie فيه الـ session id ([[PHPSESSID]]).

كل شي جاي من الـ browser (الـ query string، والـ hidden fields، والـ cookies) المستخدم يقدر يغيّره، فأبد لا تعتمد عليه للأسعار أو الصلاحيات. شيّك عليه في الـ server.`,
    simpler: R`الـ HTTP مثل موظف محل ما عنده ذاكرة: كل مرة تجي للكاونتر، كأنه أول مرة يشوفك.

- الـ **query string** ورقة تقراها بصوت عالي كل مرة ("أنا في صفحة 3").
- الـ **hidden field** ورقة مطوية داخل الـ form حقك.
- الـ **cookie** ستيكر يلصقه المحل على كيسك، وتوريه إياه كل مرة تدخل.
- الـ **session** لوكر في المحل: أغراضك تبقى هناك، وأنت بس تشيل **رقم المفتاح** (الـ session id).`,
    deeper: [
      { task: R`اضغط Next و Previous داخل النتيجة: كل ضغطة request جديد يشيل رقم الصفحة في الـ URL. وبعدين اكتب [[page=abc]] أو [[page=9]] في شريط الـ request.` },
      R`الـ **Hidden fields** تنقل الـ state في form على كذا خطوة. كل خطوة ترجّع الأجوبة اللي قبل للـ server في inputs مخفية.`,
      { task: R`عبّ الخطوة 1 وكمّل. وفي "اعرض الـ HTML اللي طلّعه السكربت"، دوّر على الـ input المخفي اللي يشيل اسمك للخطوة 2.` }
    ],
    points: [
      'الـ HTTP stateless: كل request مستقل.',
      'الـ state ممكن ينتقل في الـ query string، أو الـ hidden fields، أو الـ cookies، أو يبقى على الـ server في session.',
      'الـ query strings تبين وتنحفظ كـ bookmark، والـ hidden fields ما تبين في الصفحة بس مو سرية.',
      'أي شي يرسله الـ browser المستخدم يقدر يغيّره: سوّ validation عليه في الـ server.'
    ],
    exam: [
      'سؤال قصير: شنو معنى "HTTP is stateless"، واذكر طرق تحفظ فيها الـ state.',
      'MCQ: أي طريقة تحفظ البيانات على الـ server (الـ sessions).'
    ],
    mistakes: [
      'المستخدم يقدر يعدّل الـ hidden field. أرسل id ودوّر على السعر في الـ server.',
      'عط قيمة افتراضية لما تكون القيمة ناقصة، واجبر النوع.'
    ],
    summary: [
      'الـ HTTP stateless: الـ server ينسى.',
      'من جهة الـ client: الـ URL، والـ hidden fields، والـ cookies.',
      'من جهة الـ server: الـ sessions.'
    ],
    recall: [
      { q: 'إن الـ HTTP "stateless" معناه…', o: ['ما يقدر يرسل HTML', 'كل request يتعامل معاه بدون ما يتذكر اللي قبله', 'ما يقدر يستخدم cookies', 'يشتغل مع GET بس'], why: 'الـ server ما يحتفظ بشي بين الـ requests إلا إذا أضفت طريقة.' },
      { q: 'وين تنحفظ بيانات الـ session؟', o: ['في الـ URL', 'في الـ browser', 'على الـ server', 'في hidden field'], why: 'الـ browser بس يحتفظ بالـ session id.' },
      { q: 'هل المستخدم يقدر يغيّر قيمة hidden input؟', o: ['لا، لأنه مخفي', 'إي، بالـ developer tools أو بـ request يسويه بنفسه', 'بس إذا الـ JavaScript طافي', 'بس مع GET'], why: 'مخفي يعني بس ما ينعرض.' }
    ],
    challenge: R`سوّ pager حق 5 صفحات، باستخدام الـ query string بس.
- الـ [[$page]] يجي من [[$_GET["page"]]] كرقم، والافتراضي **1**، وأي شي أقل من 1 يصير 1، وأكثر من 5 يصير 5.
- اطبع [[<h2 id="title">Page N of 5</h2>]].
- إذا N > 1، اطبع [[<a id="prev" href="?page=N-1">Previous</a>]].
- إذا N < 5، اطبع [[<a id="next" href="?page=N+1">Next</a>]].`
  };

  LESSONS_AR['state-cookies'] = {
    title: 'الـ Cookies: الـ setcookie والـ $_COOKIE',
    big: R`الـ **cookie** قطعة نص صغيرة (name = value) الـ server يطلب من الـ browser يحفظها. ومن بعدها، الـ browser يرجّعها مع **كل** request لهالموقع، لين ينتهي وقتها. والـ PHP يسوي cookies بـ [[setcookie()]] ويقراها من [[$_COOKIE]]. واستخداماتها المعروفة: "تذكرني"، ووقت آخر زيارة، واللغة أو الـ theme المفضّل.

${NOTE}`,
    simple: R`**تسوي**: [[setcookie("username", "Sara", time() + 7*24*60*60);]]
- الاسم، والقيمة، و**وقت الانتهاء** كـ Unix time: [[time()]] (الحين، بالثواني) **زايد** كم ثانية المفروض تعيش. 7 أيام = 7 × 24 × 60 × 60 = 604800 ثانية.
- بدون وقت انتهاء تكون **session cookie**: تختفي لما يتسكر الـ browser.
- إضافات اختيارية: الـ path، والـ domain، والـ secure (HTTPS بس)، والـ **httponly** (الـ JavaScript ما يقدر يقراها).
- الـ [[setcookie]] يرسل header، فناديه **قبل أي output**.

**تقرا**: [[$_COOKIE["username"]]]، بعد ما تشيّك بـ [[isset($_COOKIE["username"])]].
- الـ cookie اللي تسويها الحين تطلع في [[$_COOKIE]] بس في الـ request **الجاي** (لازم الـ browser يرجّعها أول).

**تحذف**: سوّها مرة ثانية ووقت انتهائها في الماضي: [[setcookie("username", "", time() - 3600);]]

الحدود: تقريبًا 4 KB لكل cookie، والمستخدم يقدر يشوف الـ cookies ويعدّلها ويحذفها، فأبد لا تحفظ فيها passwords أو أي شي لازم تثق فيه.`,
    simpler: R`الـ cookie مثل **ختم على يدك** في فعالية.

- الـ [[setcookie]] هو الموظف اللي يختمك، ومعاه تاريخ انتهاء ("صالح 7 أيام").
- وكل ما ترجع تدخل، توريهم يدك ([[$_COOKIE]]) بدون ما يسألونك.
- والحذف مثل ما يختمون "منتهي" فوقه.
- وأنت تقدر تمسح الختم أو ترسم واحد مزوّر، فالفعالية أبد ما المفروض تعتمد عليه في شي مهم.`,
    deeper: [
      { task: R`شغّل، وبعدين اضغط "Reload" داخل النتيجة مرتين: أول زيارة ما فيها cookie، والثانية تعرض آخر زيارة، والعدّاد يزيد. واضغط "Forget me" عشان تحذف الـ cookieين.` },
      R`**وقت الانتهاء بالثواني**: احسبه بصوت عالي في الامتحان. ساعة = 60 × 60 = 3600. يوم = 86400. أسبوع = 604800. 3 أسابيع = 3 × 7 × 24 × 60 × 60 = 1814400. 30 يوم = 30 × 24 × 60 × 60 = 2592000.`,
      null
    ],
    points: [
      'الـ setcookie(name, value, time() + seconds) يسوي cookie، وناديه قبل أي output.',
      'بدون وقت انتهاء ← session cookie تنتهي لما يتسكر الـ browser.',
      'الـ $_COOKIE["name"] يقراها، بس من الـ request الجاي وطالع.',
      'احذفها بوقت انتهاء في الماضي: setcookie(name, "", time() - 3600).',
      'الـ cookies تعيش في الـ browser: صغيرة (~4 KB)، والمستخدم يشوفها ويعدّلها.'
    ],
    exam: [
      R`النمط: [[setcookie('lastvisit', date(...), 3*7*24*60*60 + time())]]، وبعدين اعرض آخر زيارة إذا [[isset($_COOKIE[...])]].`,
      'MCQ: argument وقت الانتهاء هو وقت بالثواني (time() + seconds).',
      'سؤال قصير: الـ cookies ضد الـ sessions (الدرس الجاي).'
    ],
    mistakes: [
      'وقت الانتهاء Unix time مطلق، فزيد الثواني على time().',
      'الـ $_COOKIE فيه اللي أرسله الـ browser مع هالـ request. والـ cookie الجديدة ترجع مع الـ request الجاي.',
      'الـ setcookie يرسل HTTP header، ولازم يروح قبل أي HTML.'
    ],
    summary: [
      'setcookie(name, value, time() + seconds).',
      'الـ $_COOKIE في الـ request الجاي.',
      'احذف بوقت انتهاء في الماضي.'
    ],
    recall: [
      { q: 'أي وقت انتهاء يخلّي الـ cookie تعيش يومين؟', why: 'الـ time() زايد يومين بالثواني.' },
      { q: 'شلون تحذف cookie؟', why: 'وقت الانتهاء اللي في الماضي يقول للـ browser يرميها. والـ unset بس يغيّر الـ array حق الـ PHP في هالـ request.' },
      { q: R`صفحة تنادي [[setcookie("a", "1")]] وبعدين تقرا [[$_COOKIE["a"]]] في نفس الـ request. شنو تاخذ؟`, o: ['"1"', 'ولا شي (للحين ما انحفظت)', 'true', 'error'], why: 'الـ cookie ترجع بس مع الـ request الجاي.' },
      { q: 'وين تنحفظ الـ cookies؟', o: ['على الـ server', 'في الـ browser', 'في الـ database', 'في ملف الـ PHP'], why: 'الـ browser يحتفظ فيها ويرجّعها.' }
    ],
    challenge: R`صفحة "تذكّر اسمي":
1. إذا [[?forget=1]] موجود في الـ URL: احذف الـ cookie [[username]] واطبع [[<p id="msg">Forgotten</p>]].
2. وإلا إذا الـ form انرسل ومعاه [[name]]: احفظه في cookie اسمها [[username]] تعيش **7 أيام**، واطبع [[<p id="msg">Saved NAME</p>]].
3. وإلا إذا الـ cookie [[username]] موجودة: اطبع [[<p id="msg">Welcome back, NAME</p>]].
4. وإلا اطبع [[<p id="msg">Hello, stranger</p>]] والـ form ([[method="post"]]، و input اسمه [[name]]).`
  };

  LESSONS_AR['state-sessions'] = {
    title: 'الـ Sessions: الـ session_start والـ $_SESSION',
    big: R`الـ **session** يحفظ بيانات **على الـ server** لزائر واحد، على كذا request. والـ PHP يعطي الـ browser cookie اسمها [[PHPSESSID]] فيها id عشوائي، ومع كل request الـ PHP يستخدم هالـ id عشان يحمّل الـ [[$_SESSION]] حق الزائر نفسه. وتسجيل الدخول، وسلة التسوّق، والـ forms اللي على كذا صفحة، كلها مبنية على الـ sessions.

${NOTE}`,
    simple: R`- [[session_start();]] في **أول** كل صفحة تستخدم الـ session (قبل أي output). يسوي session جديد أو يحمّل الموجود.
- [[$_SESSION["user"] = "Sara";]] ← تحفظ. وأي نوع يمشي، حتى الـ arrays: [[$_SESSION["cart"]["pen"] = 2;]]
- [[$_SESSION["user"]]] ← تقراه في أي request بعدين، بعد [[isset($_SESSION["user"])]].
- [[unset($_SESSION["cart"]);]] ← تشيل عنصر واحد.
- [[session_destroy();]] ← تحذف الـ session كله على الـ server (تسجيل خروج). والـ [[$_SESSION]] حق الـ request الحالي يبقى معبّى لين يخلص السكربت، فـ فضّه بعد بـ [[$_SESSION = [];]] إذا بتطبعه بعدها.
- [[session_id()]] ← الـ id الحالي.

الـ sessions تنتهي لما تحذفها، أو بعد فترة بدون requests (الـ timeout حق الـ server، في العادة 24 دقيقة).`,
    simpler: R`الـ session مثل **مكان تسليم الكوتات**.

- الـ [[session_start]] مثل ما توصل للكاونتر. أول مرة تاخذ تذكرة عليها رقم (الـ cookie [[PHPSESSID]]).
- الـ [[$_SESSION]] هو العلّاقة حقتك: تقدر تخلّي عليها أي شي.
- وكل زيارة توريهم التذكرة وترجع لك علّاقتك أنت، أبد مو حق أحد ثاني.
- والـ [[session_destroy]] مثل ما تاخذ كل أغراضك وترمي التذكرة.`,
    deeper: [
      { task: R`أضف أغراض بالـ form اللي داخل النتيجة. كل request جديد، بس السلة تبقى في [[$_SESSION]]. وبعدين اضغط "Empty cart".` },
      R`**بيانات الـ session كجدول (نمط امتحان).** associative array of arrays في الـ session، ينطبع بـ [[foreach]] متداخل، مع عدد ومعدّلات، ورسالة لما تكون بيانات الـ session مو موجودة.`,
      null
    ],
    points: [
      'الـ session_start() أول شي، قبل أي output، في كل صفحة تستخدم الـ session.',
      'الـ $_SESSION array محفوظ على الـ server لكل زائر، ويقدر يشيل arrays.',
      'شيّك بـ isset قبل ما تقرا، والـ unset يشيل key واحد.',
      'الـ session_destroy() ينهي الـ session (تسجيل خروج)، وفضّ الـ $_SESSION بعد إذا بتطبعه بعدها.',
      'الـ browser بس يحتفظ بالـ session id في الـ cookie حق PHPSESSID.'
    ],
    exam: [
      'اعرض associative array محفوظ في الـ $_SESSION كجدول HTML بـ foreach متداخل، مع عدد ومعدّلات، واعرض رسالة إذا مو موجود.',
      R`MCQ: شنو لازم يجي أول في صفحة تستخدم [[$_SESSION]] ([[session_start()]]).`
    ],
    mistakes: [
      'بدون session_start الـ array ما ينحفظ للـ request الجاي.',
      'الـ key يكون موجود بس بعد ما انحفظ في request قبل.',
      'تقدر تحذف بس session بديته في هالـ request.'
    ],
    summary: [
      'session_start ← $_SESSION[...] ← isset.',
      'البيانات تبقى على الـ server، والمفتاح PHPSESSID.',
      'الـ unset لـ key واحد، والـ session_destroy للكل.'
    ],
    recall: [
      { q: 'شنو لازم تنادي كل صفحة تستخدم $_SESSION أول شي؟', why: 'الـ session_start يحمّل الـ session أو يسويه.' },
      { q: 'أي cookie تربط الـ browser بالـ session حقه؟', why: 'الـ PHP يسميها PHPSESSID بشكل افتراضي.' },
      { q: R`شلون تشيل السلة بس من الـ session؟`, why: 'الـ unset يشيل key واحد ويخلّي الباقي.' }
    ],
    challenge: R`متتبّع درجات يحفظ بياناته في الـ session:
1. إذا انرسل الـ form ومعاه [[course]] و [[mark]]، احفظه: [[$_SESSION["marks"][course] = mark]].
2. إذا [[?clear=1]] موجود في الـ URL، احذف الـ session (وفضّ [[$_SESSION]]).
3. بعدين، إذا ما في درجات في الـ session، اطبع [[<p id="none">No marks yet</p>]]. وإلا اطبع [[<table id="marks">]] فيه صف لكل مادة (المادة، والدرجة)، و [[<p id="avg">Average: X</p>]] (مقرّب لخانة عشرية وحدة).
وخلّ الـ form اللي في الـ starter.`
  };

  LESSONS_AR['state-compare'] = {
    title: 'الـ Cookies ضد الـ sessions، وتسجيل الدخول، والـ caching',
    big: R`الـ cookies والـ sessions يحلّون نفس المشكلة بس في مكانين عكس بعض: الـ cookie تحفظ البيانات **في الـ browser**، والـ session يحفظها **على الـ server** ويعطي الـ browser بس مفتاح. والمقارنة بينهم من أكثر الأسئلة القصيرة اللي تطلع في هالمادة. وهالدرس بعد يوريك نمط "الصفحة المحمية" المعتمد، وفكرة الـ **caching**.`,
    simple: R`**الـ Cookies ضد الـ sessions**
- **وين**: الـ cookie ← الـ browser، والـ session ← الـ server (والـ browser بس عنده الـ cookie حق الـ id).
- **الحجم**: الـ cookie تقريبًا 4 KB، ونص بس، والـ session ← على قد ما يسمح الـ server، وأي قيمة PHP.
- **الأمان**: المستخدم يقدر يقرا الـ cookies ويعدّلها، أما بيانات الـ session فما يقدر يشوفها ولا يغيّرها (بس الـ session id لازم ينحمى، شوف الفصل 16).
- **العمر**: الـ cookie تعيش لين وقت انتهائها (ممكن أيام أو شهور)، والـ session ينتهي بالـ destroy، أو الـ timeout، أو في العادة لما يتسكر الـ browser.
- **الاستخدام**: الـ cookies للتفضيلات و"تذكرني"، والـ sessions لتسجيل الدخول والسلة وأي شي حساس.

**نمط الصفحة المحمية**
[[session_start(); if (!isset($_SESSION["user"])) { header("Location: login.php"); exit; }]]

**الـ Caching**: تحتفظ بنسخة من شي عشان ما تحتاج تجيبه أو تحسبه مرة ثانية.
- **الـ Browser cache**: الـ browser يحتفظ بالصور والـ CSS والـ JS، والـ server يتحكم فيه بـ headers مثل [[Cache-Control: max-age=86400]] (احتفظ فيها يوم) أو [[Cache-Control: no-store]] (أبد لا تحتفظ).
- **الـ Server-side cache**: الـ server يحتفظ بنتيجة شغلة بطيئة (query كبير، أو API call) لفترة ويعيد استخدامها.
- الفايدة: صفحات أسرع وضغط أقل. والخطر: تعرض بيانات **قديمة** (stale).`,
    simpler: R`- الـ **cookie** ورقة تشيلها في مخباتك: تقدر تقراها، أو تضيّعها، أو تعيد كتابتها.
- الـ **session** ملف تحتفظ فيه المدرسة في مكتبها، وأنت بس تشيل رقمك الجامعي.
- الـ **Caching** مثل ما تحتفظ بنسخة مصوّرة من صفحة تقراها واجد، بدال ما ترجع للمكتبة كل مرة. سريع، بس النسخة ممكن تكون قديمة.`,
    deeper: [
      { task: R`شغّل: يحوّلك على login.php. اضغط "Log in as Ali" في النتيجة: الحين الصفحة تسلّم عليك مع كل request. واضغط "Log out".` },
      R`**Cache headers من الـ PHP.** الصفحة تقدر تقول للـ browser كم يحتفظ فيها. استخدم [[no-store]] للصفحات الخاصة (الحساب، والسلة) عشان الكمبيوتر المشترك أبد ما يعرضها مرة ثانية من الـ cache.`,
      null
    ],
    points: [
      'بيانات الـ cookie تعيش في الـ browser، وبيانات الـ session تعيش على الـ server.',
      'الـ Cookies: صغيرة، والمستخدم يشوفها ويعدّلها، وتقدر تعيش طويل. الـ Sessions: أكبر، ومخفية عن المستخدم، وتنتهي بتسجيل الخروج أو الـ timeout.',
      'استخدم الـ sessions لتسجيل الدخول والسلة، والـ cookies للتفضيلات و"تذكرني".',
      'الصفحة المحمية: session_start، وشيّك على isset($_SESSION["user"])، وإلا سوّ redirect و exit.',
      'الـ Caching يحتفظ بنسخ (في الـ browser أو الـ server) عشان السرعة، والـ Cache-Control headers تتحكم في الـ browser cache.'
    ],
    exam: [
      'سؤال قصير: قارن بين الـ cookies والـ sessions (وين تنحفظ، والحجم، والأمان، والعمر، والاستخدام المعتاد).',
      'كود: صفحة تحوّل على login.php لما الـ session ما فيه user.',
      'مفهوم: شنو الـ caching، وفايدة وحدة وخطر واحد.'
    ],
    mistakes: [
      'المستخدم يقدر يعدّل الـ cookies ويخلّي نفسه "admin". خلّ المعلومات اللي تعتمد عليها في الـ session.',
      'بدون exit الجزء السري للحين ينرسل قبل ما الـ browser يتبع الـ redirect.'
    ],
    summary: [
      'الـ Cookie = الـ browser، والـ session = الـ server.',
      'احمِ الصفحات بـ session + redirect + exit.',
      'الـ Caching = تعيد استخدام نسخ، وانتبه للبيانات القديمة.'
    ],
    recall: [
      { q: 'أي واحد أأمن عشان تحفظ إن المستخدم مسجّل دخول؟', o: ['cookie "loggedin=yes"', 'session variable', 'hidden field', 'query string'], why: 'المستخدم ما يقدر يعدّل بيانات الـ session.' },
      { q: 'أي واحد يقدر يعيش شهور بعد ما يتسكر الـ browser؟', o: ['الـ session', 'cookie وقت انتهائها بعيد', 'hidden field', '$_POST'], why: 'الـ cookies الدايمة تعيش لين تاريخ انتهائها.' },
      { q: R`شنو يقول [[Cache-Control: no-store]] للـ browser؟`, o: ['احتفظ بالصفحة يوم', 'لا تحتفظ بنسخة من الصفحة', 'احذف كل الـ cookies', 'استخدم HTTPS'], why: 'الـ no-store يمنع الـ caching.' }
    ],
    challenge: R`ابنِ صفحة محمية بـ session:
1. [[?login=NAME]] يحفظ NAME في [[$_SESSION["user"]]].
2. [[?logout=1]] يحذف الـ session.
3. إذا ما في user في الـ session، سوّ redirect لـ [[login.php]] بـ [[header]] و [[exit]].
4. وإلا اطبع [[<p id="hello">Hello NAME</p>]].`
  };
})();

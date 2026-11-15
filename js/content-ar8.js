/* Arabic versions of module 12 (Security). Aligned item by item with js/content8.js. */
(() => {
  const R = String.raw;
  const SANDBOX = R`**تدريب آمن.** الهجمات اللي في هالقسم تشتغل بس داخل الـ sandbox حق هالصفحة، على database مؤقت يرجع لأصله مع كل Run. وهي معروضة عشان تعرف الغلطة وتكتب الحل.`;

  LESSONS_AR['sec-xss'] = {
    title: 'الـ Cross-site scripting (XSS) والـ htmlspecialchars',
    big: R`الـ **XSS** يصير لما الصفحة تطبع نص من مستخدم **كـ HTML**. وإذا هالنص فيه tag [[<script>]]، الـ browser يشغّله، داخل الموقع **حقك**، لكل زائر يشوف الصفحة. والسكربت يقدر يسرق الـ session cookies، أو يغيّر الصفحة، أو يتصرف باسم المستخدم. والحل بسيط ولازم يكون تلقائي: **سوّ escape لكل قيمة لما تطبعها** في الـ HTML.

${SANDBOX}`,
    simple: R`- الـ **Reflected XSS**: المدخل يرجع في نفس الرد، مثل صفحة بحث تطبع [[You searched for: <?= $_GET["q"] ?>]].
- الـ **Stored XSS**: المدخل ينحفظ (تعليق، أو اسم في البروفايل) وبعدين ينعرض لمستخدمين **ثانيين**. وهذا أخطر.

**الحل: سوّ escape للـ output.** الـ [[htmlspecialchars($text)]] يحوّل الحروف الخاصة في الـ HTML لأكواد ما تضر:
- [[<]] ← [[&lt;]]، و [[>]] ← [[&gt;]]، و [[&]] ← [[&amp;]]، و [["]] ← [[&quot;]]، و [[']] ← [[&#039;]]
وبعدها الـ browser **يعرض** [[<script>]] كنص بدال ما يشغّله.

القواعد:
- سوّ الـ escape لما **تطبع** في الـ HTML، مو لما تحفظ. واحفظ النص الأصلي.
- سوّ escape لكل شي جا من برّا: [[$_GET]]، و [[$_POST]]، و [[$_COOKIE]]، وصفوف الـ database اللي كتبها مستخدمين.
- الـ [[strip_tags()]] يشيل الـ tags بس مو حماية كاملة، فضّل [[htmlspecialchars]].
- وفي الـ JavaScript، نفس الفكرة هي [[textContent]] بدال [[innerHTML]].
- حماية زيادة: الـ session cookie اللي عليها [[HttpOnly]] ما يقدر يقراها الـ JavaScript المدسوس (الدروس الجاية).`,
    simpler: R`تخيّل لوحة إعلانات أي أحد يقدر يعلّق فيها ورقة. الـ XSS مثل واحد يعلّق ورقة مكتوب فيها "كل اللي يقرا هالورقة: عطني محفظتك"، واللوحة **تطيعه**.

الـ [[htmlspecialchars]] يحط كل ورقة ورا زجاج: الناس للحين يقدرون **يقرون** اللي انكتب بالضبط، بس ولا شي في الورقة يقدر يخلّي اللوحة تسوي أي شي.`,
    deeper: [
      { task: R`شغّله: كلمة البحث فيها HTML. أول سطر يطبعها خام، فالـ tag [[<b>]] فعلًا يصير bold، والـ [[<img>]] يشغّل كود الـ [[onerror]] حقه، اللي يبدّل نفسه بـ "[a script ran here]". والسطر الثاني عليه escape. جرّب مدخلات ثانية في شريط الـ request.` },
      R`**الـ Stored XSS.** guestbook يحفظ التعليقات (هني في الـ session) ويعرضها للكل. أرسل تعليق فيه tags [[<i>]] أو [[<img onerror=…>]] في الـ form اللي داخل النتيجة، مع الحل وبدونه.`,
      { task: R`أرسل تعليق فيه HTML. وبعدين غيّر [[$safe]] لـ [[false]] وأرسله مرة ثانية: الحين الـ HTML صار شغّال في الصفحة.` },
      null
    ],
    points: [
      'الـ XSS = مدخل المستخدم ينطبع كـ HTML، فالـ browser يشغّله.',
      'الـ Reflected: يرجع في نفس الرد، والـ stored: ينحفظ وينعرض للثانيين.',
      'الحل: htmlspecialchars() لكل قيمة لما تطبعها في الـ HTML.',
      'احفظ الأصل، وسوّ escape وقت الـ output.',
      'نفس الفكرة في الـ JS: textContent، مو innerHTML.'
    ],
    exam: [
      'سؤال قصير: شنو الـ XSS وشلون تمنعه؟',
      R`طلّع السطر اللي فيه الثغرة ([[echo $_GET["name"];]]) وصلّحه بـ [[htmlspecialchars]].`
    ],
    mistakes: [
      'أي مدخل ينطبع في الـ HTML لازم يكون عليه escape.',
      'داخل الـ attribute، الـ quote اللي في القيمة بيسكّر الـ attribute ويدخّل attributes جديدة.'
    ],
    summary: [
      'الـ XSS: المدخل يشتغل ككود في الصفحة.',
      'الـ htmlspecialchars وقت الـ output.',
      'الـ Reflected ضد الـ stored.'
    ],
    recall: [
      { q: R`شنو يرجّع [[htmlspecialchars("<b>")]]؟`, why: 'الـ < والـ > يصيرون &lt; و &gt;، وينعرضون كنص.' },
      { q: 'أي نوع XSS يحفظ الهجمة ويعرضها لمستخدمين ثانيين؟', o: ['Reflected', 'Stored', 'DOM-less', 'Encrypted'], why: 'الـ Stored XSS يعيش في الـ database أو ملف ويضرب كل اللي يشوفه.' },
      { q: 'متى المفروض تسوي escape لنص المستخدم؟', o: ['قبل ما تحفظه', 'لما تطبعه في الـ HTML', 'بس للـ admins', 'أبد مع POST'], why: 'سوّ الـ escape وقت الـ output، حسب المكان اللي تطبع فيه.' }
    ],
    challenge: R`حائط تعليقات يحفظ التعليقات في الـ session. لما ينرسل الـ form ومعاه [[name]] و [[comment]]، أضف الثنتين لـ [[$_SESSION["wall"]]]. وبعدين اطبع كل تعليق كـ [[<li><b>NAME</b>: COMMENT</li>]] داخل [[<ul id="wall">]].
والقيمتين جايين من مستخدمين، فالصفحة لازم **تعرض** أي HTML يكتبونه كنص عادي (بس الـ [[<b>]] حقك اللي حول الاسم هو HTML حقيقي).`
  };

  LESSONS_AR['sec-sqli'] = {
    title: 'الـ SQL injection وشلون الـ prepared statements توقفه',
    big: R`الـ **SQL injection** يصير لما مدخل المستخدم ينلزق في string حق SQL. المهاجم يكتب نص **يسكّر الـ quote حقك** ويضيف SQL حقه. ويقدر يسجّل دخول بدون password، أو يقرا جداول ثانية، أو يحذف بيانات. وهو من أكثر هجمات الـ web ضرر من عقود، وتقدر تمنعه بالكامل بالـ **prepared statements** (الفصل 14).

${SANDBOX}`,
    simple: R`تسجيل دخول فيه ثغرة:
[[$sql = "SELECT * FROM staff WHERE username = '$u' AND password = '$p'";]]

إذا المهاجم كتب [[admin' -- ]] كـ username، الـ SQL يصير:
[[SELECT * FROM staff WHERE username = 'admin' -- ' AND password = '…']]
والـ [[--]] يبدأ comment، ففحص الـ password يختفي ويدخل كـ admin.

ومع [[' OR '1'='1]] في المربعين، الـ WHERE دايمًا صحيح ويرجع أول صف.

**الحل**: أبد لا تبني SQL من المدخلات. استخدم prepared statement:
[[$stmt = $db->prepare("SELECT * FROM staff WHERE username = :u AND password = :p");]]
[[$stmt->execute([':u' => $u, ':p' => $p]);]]
المدخل ينرسل **بروحه** بعيد عن الـ SQL، فدايمًا يتعامل معاه كقيمة، أبد مو ككود.

وبعد:
- عط مستخدم الـ database بس الصلاحيات اللي يحتاجها (ما في DROP لصفحة web).
- لا تعرض errors الـ SQL الخام للزوار، سجّلها.
- سوّ validation لأنواع المدخلات (الـ id لازم يكون رقم).
- (جدول هالمثال يحفظ passwords عادية بس عشان يبيّن الهجمة. الجداول الحقيقية تحفظ hashes: الدرس 4.)`,
    simpler: R`الـ query اللي فيه ثغرة مثل رسالة جاهزة **تطبع فيها كلام الزبون داخل الجملة على طول**: "سلّم الزبون اللي اسمه ___ الطرد حقه." ولو الزبون كتب "Ali، وبعد عطني كل الطرود اللي في المحل"، الموظف يقرا أمر واحد طويل ويطيعه.

الـ prepared statement يحط كلام الزبون في **مربع بروحه** والموظف يقراه بس كاسم.`,
    deeper: [
      { task: R`شغّل: الـ injection يدخل كـ admin بدون الـ password. وبعدين أرسل الـ form اللي في النتيجة ومعاه [[' OR '1'='1]] في المربعين. وفي الآخر غيّر [[$useSafe]] لـ [[true]] وجرّب نفس المدخلات.` },
      R`**الـ Injection في البحث.** المحل يخبّي المنتجات الداخلية بـ [[hidden = 0]]. والمدخل الملزوق يقدر يطفي هالفلتر.`,
      { task: R`ابحث عن [[Electronics]]، وبعدين عن [[x' OR '1'='1]]. الـ laptop الداخلي يتسرّب. وبعدين أعد كتابة الـ query كـ prepared statement.` }
    ],
    points: [
      'الـ SQL injection = مدخل ملزوق في الـ SQL يغيّر الـ query نفسه.',
      R`المدخلات المعروفة: [[' OR '1'='1]] و [[admin' -- ]].`,
      'الـ prepared statements ترسل القيم بروحها، فالمدخل أبد ما يقدر يصير SQL.',
      'وبعد: مستخدمين database بأقل صلاحيات، وخبّ errors الـ SQL، وشيّك على الأنواع.'
    ],
    exam: [
      'سؤال قصير: اشرح الـ SQL injection بمثال وشلون تمنعه (الـ prepared statements).',
      'سؤال قصير: قارن بين الـ session hijacking والـ SQL injection (كل واحد شنو يهاجم).',
      'كود: أعد كتابة query فيه ثغرة بـ prepare / execute.'
    ],
    mistakes: [
      'الـ id=1 OR 1=1 بيحذف كل الـ posts.',
      'الـ escaping باليد سهل تغلط فيه، والـ prepared statements هي الحل الأكيد.'
    ],
    summary: [
      'أبد لا تلزق المدخلات في الـ SQL.',
      'prepare + execute مع placeholders.',
      'أقل صلاحيات، وبدون errors خام.'
    ],
    recall: [
      { q: R`في [['… WHERE user = '$u' AND pass = '$p']]، شنو يسوي المدخل [[admin' -- ]]؟`, o: ['ولا شي', 'يحوّل فحص الـ password لـ comment', 'يحذف الجدول', 'يشفّر الـ password'], why: 'الـ -- يبدأ comment في الـ SQL، ويشيل باقي الشرط.' },
      { q: 'شنو الدفاع الأكيد ضد الـ SQL injection؟', o: ['تخبّي الـ form', 'الـ prepared statements مع placeholders', 'تستخدم POST بدال GET', 'الـ HTTPS'], why: 'القيم تنرسل بروحها بعيد عن كود الـ SQL.' },
      { q: 'هل الـ HTTPS يوقف الـ SQL injection؟', o: ['إي', 'لا: يحمي البيانات وهي في الطريق بس', 'بس مع POST', 'بس في صفحات تسجيل الدخول'], why: 'الـ HTTPS يشفّر الاتصال، والـ server للحين يستلم نص الهجمة.' }
    ],
    challenge: R`تسجيل الدخول اللي تحت فيه ثغرة. أعد كتابته عشان يستخدم **prepared statement** مع named placeholders، وخلّ نفس الرسايل:
- user و password صحيحين ← [[<p id="msg">Logged in as USERNAME</p>]]
- غير جذي ← [[<p id="msg">Wrong username or password</p>]]
ومحاولات الـ injection اللي في الفحوصات كلها لازم تفشل.`
  };

  LESSONS_AR['sec-sessions'] = {
    title: 'الـ Session hijacking: الـ HttpOnly والـ Secure وتجديد الـ id',
    big: R`الـ session آمن على قد أمان الـ id حقه. اللي يقدّم الـ [[PHPSESSID]] حقك **هو** أنت، بالنسبة للـ server. والـ **Session hijacking** يعني سرقة هالـ id (عن طريق XSS، أو اتصال مو مشفّر، أو كمبيوتر مشترك) واستخدامه. والـ **Session fixation** يعني إنهم يخدعونك عشان تستخدم id المهاجم يعرفه من قبل. وكم إعداد يخلّون الثنتين أصعب بواجد.`,
    simple: R`**إعدادات الـ session cookie** (قبل [[session_start()]]):
- [[ini_set("session.cookie_httponly", 1);]] ← الـ JavaScript **ما يقدر يقرا** الـ cookie (الـ [[document.cookie]] ما يعرضها)، فسكربت XSS ما يقدر يسرقها.
- [[ini_set("session.cookie_secure", 1);]] ← الـ cookie تنرسل **بس على HTTPS**، أبد كنص عادي.
- [[ini_set("session.use_only_cookies", 1);]] ← الـ id أبد ما ينقبل من الـ URL.
- نفس الشي بنداء واحد: [[session_set_cookie_params(["httponly" => true, "secure" => true, "samesite" => "Strict"]);]]

**بعد تسجيل دخول ناجح**: [[session_regenerate_id(true);]] يعطي الزائر id **جديد** ويحذف الـ session القديم. فأي id قبل الدخول مثبّت أو مسروق يصير ما ينفع.

**عند تسجيل الخروج**: [[session_destroy()]] وفضّ [[$_SESSION]].

وبعد: استخدم HTTPS في كل مكان، وخلّ الـ sessions الخاملة تنتهي، و(اختياري) احفظ الـ user agent في الـ session وأنهِ الـ session إذا تغيّر.

**الـ Session hijacking ضد الـ SQL injection**: الـ hijacking يهاجم **الهوية** (يعيد استخدام session id حق أحد)، والـ injection يهاجم **الـ database** (يغيّر الـ SQL حقك). هجمتين مختلفتين، ودفاعين مختلفين.`,
    simpler: R`الـ session id حقك مثل **تذكرة الكوتات**. أي أحد ماسكها ياخذ الكوت حقك.

- الـ **HttpOnly** يخلّي التذكرة في مخبا ما توصل له السكربتات اللي في الصفحة.
- الـ **Secure** معناه إن التذكرة تمشي بس في صندوق مقفّل (HTTPS).
- و**التجديد** بعد تسجيل الدخول مثل ما تبدّل تذكرتك بوحدة جديدة أول ما تثبت منو أنت، فأي نسخة قديمة شافها أحد قبل ما تشتغل.`,
    deeper: [
      { task: R`شغّل واقرا الـ log: الـ session cookie عليها HttpOnly. اضغط "Log in" في النتيجة: الـ log يعرض قيمة PHPSESSID **جديدة**. وبعدين جرّب "Log out".` },
      R`**ربط الـ session بالـ browser** (فحص زيادة). إذا انستخدم id مسروق من browser ثاني، في العادة الـ user-agent string يختلف.`,
      null
    ],
    points: [
      'الـ Session hijacking = استخدام session id حق أحد ثاني، والـ fixation = تفرض id معروف على الضحية.',
      'الـ session.cookie_httponly يمنع الـ JavaScript (والـ XSS) من قراءة الـ cookie.',
      'الـ session.cookie_secure يرسل الـ cookie بس على HTTPS.',
      'الـ session_regenerate_id(true) بعد تسجيل الدخول يهزم الـ fixation والـ ids المسروقة القديمة.',
      'احذف الـ session عند تسجيل الخروج، وخلّ الـ sessions الخاملة تنتهي.'
    ],
    exam: [
      R`MCQ: أي إعداد يمنع الـ JavaScript من قراءة الـ session cookie ([[session.cookie_httponly]]).`,
      'سؤال قصير: الـ session hijacking ضد الـ SQL injection.',
      R`كود: وين تنادي [[session_regenerate_id(true)]] (على طول بعد تسجيل دخول ناجح).`
    ],
    mistakes: [
      'إعدادات الـ cookie لازم تنحط قبل ما الـ session_start يسوي الـ cookie.',
      'إذا خلّيت نفس الـ id اللي قبل الدخول، الـ session fixation يصير ممكن.'
    ],
    summary: [
      'احمِ الـ id: HttpOnly و Secure و HTTPS.',
      'جدّد الـ id عند تسجيل الدخول.',
      'احذف عند تسجيل الخروج.'
    ],
    recall: [
      { q: R`شنو يسوي [[session.cookie_httponly = 1]]؟`, o: ['يرسل الـ cookie على HTTP بس', 'يخبّي الـ cookie عن الـ JavaScript', 'يحذف الـ cookie عند تسجيل الخروج', 'يشفّر بيانات الـ session'], why: 'الـ cookies اللي عليها HttpOnly ما تبين للـ document.cookie.' },
      { q: R`متى المفروض تنادي [[session_regenerate_id(true)]]؟`, o: ['في كل صفحة', 'على طول بعد تسجيل دخول ناجح', 'قبل الـ session_start', 'بس عند تسجيل الخروج'], why: 'id جديد لما يتغير مستوى الصلاحية يهزم الـ fixation.' },
      { q: 'الـ Session hijacking يستهدف…', o: ['هيكل الـ database', 'الـ session id حق المستخدم', 'كود الـ PHP المصدري', 'الـ DNS server'], why: 'المهاجم يعيد استخدام session id صالح عشان يتصرف باسم الضحية.' }
    ],
    challenge: R`خلّ الـ session أأمن:
1. قبل ما يبدأ الـ session، خلّ [[session.cookie_httponly]] يساوي 1.
2. [[?login=NAME]]: جدّد الـ session id (واحذف الـ session القديم)، وبعدين احفظ NAME في [[$_SESSION["user"]]].
3. [[?logout=1]]: احذف الـ session.
4. اطبع [[<p id="who">Logged in as NAME</p>]] أو [[<p id="who">Not logged in</p>]].`
  };

  LESSONS_AR['sec-passwords'] = {
    title: 'حفظ الـ passwords: الـ password_hash والـ password_verify',
    big: R`قواعد البيانات تتسرّب. ولما يصير جذي، الـ passwords المحفوظة كنص عادي كارثة، لأن الناس يعيدون استخدامها في مواقع ثانية. فالموقع أبد ما يحفظ الـ password نفسه: يحفظ **hash**، نسخة مخربطة باتجاه واحد. ووقت تسجيل الدخول يسوي hash للـ password اللي انكتب بنفس الطريقة ويقارن. والـ PHP يسوي هذا كله، بأمان، بـ functionين.`,
    simple: R`- **التسجيل**: [[$hash = password_hash($password, PASSWORD_DEFAULT);]] واحفظ [[$hash]] (تقريبًا 60 حرف، ويبدأ بـ [[$2y$]]).
- **تسجيل الدخول**: جيب الصف بالـ **username** (prepared statement)، وبعدين [[if (password_verify($typed, $row["hash"])) { … }]].
- أبد لا تقارن بـ [[==]]، وأبد لا تدوّر بـ [[WHERE password = …]]: نفس الـ password يعطي hash **مختلف** كل مرة، لأن في **salt** عشوائي ينخلط معاه وينحفظ داخل الـ hash.
- **بطيء عن قصد**: كل hash ياخذ لحظة واضحة (تقريبًا ثانية في هالـ sandbox)، فتخمين ملايين الـ passwords يصير مو عملي.
- مو كافي: النص العادي، و [[md5()]]، و [[sha1()]]. سريعين وبدون salt، فينكسرون بسرعة.
- عط نفس الرسالة لـ "ما في هالمستخدم" ولـ "password غلط"، عشان المهاجمين ما يعرفون أي usernames موجودة.`,
    simpler: R`الـ hash مثل **فرّامة اللحم**: تقدر تحوّل الستيك لمفروم، بس أبد ما ترجّع المفروم ستيك.

الموقع يحتفظ بالمفروم بس. ولما تسجّل دخول، يفرم اللي كتبته ويشيّك إذا المفروم يطابق. والحرامي اللي يسرق المفروم للحين ما يعرف الستيك حقك. والـ **salt** العشوائي رشّة بهارات تخلّي ستيكين متشابهين يعطون مفروم مختلف.`,
    deeper: [
      { task: R`شغّل مرتين: الـ hash يتغير كل مرة، ومع ذلك الـ [[password_verify]] للحين يطابق. وبعدين غيّر الـ password اللي انكتب.` },
      R`**تسجيل دخول على جدول hashes.** الجدول [[members]] فيه المستخدم [[ali]] ومعاه hash لـ [[pass1234]].`,
      { task: R`سجّل دخول كـ [[ali]] / [[pass1234]] في النتيجة، وبعدين بـ password غلط، وبعدين بمستخدم مو موجود. والرسالة حق الأخيرتين نفسها عن قصد.` }
    ],
    points: [
      'أبد لا تحفظ الـ passwords، احفظ password_hash($p, PASSWORD_DEFAULT).',
      'شيّك بـ password_verify($typed, $storedHash)، أبد مو بـ ==.',
      'كل hash له salt عشوائي حقه، فالـ passwords المتشابهة تعطي hashes مختلفة.',
      'الـ md5 / sha1 مو مقبولين للـ passwords.',
      'استخدم رسالة وحدة للمستخدم المو موجود وللـ password الغلط.'
    ],
    exam: [
      'سؤال قصير: ليش نسوي hash للـ passwords، وليش الـ md5 مو كافي.',
      R`كود: تسجيل بـ [[password_hash]] وتسجيل دخول بـ [[password_verify]] (مع prepared SELECT بالـ username).`
    ],
    mistakes: [
      'الـ hash الجديد أبد ما يساوي اللي محفوظ (salt مختلف). جيب بالـ username، وبعدين سوّ verify.',
      'الـ md5 سريع وبدون salt، والـ query بعد كان فيه ثغرة injection.'
    ],
    summary: [
      'الـ password_hash عشان تحفظ.',
      'الـ password_verify عشان تشيّك.',
      'أبد نص عادي، وأبد md5.'
    ],
    recall: [
      { q: 'أي function تشيّك على password انكتب مقابل hash محفوظ؟', why: 'الـ password_verify تقرا الـ salt من الـ hash وتقارن.' },
      { q: R`مستخدمين اختاروا نفس الـ password. الـ hashes المحفوظة حقتهم…`, o: ['متطابقة', 'مختلفة، بسبب الـ salt العشوائي', 'فاضية', 'هي الـ password نفسه'], why: 'ينسوّى salt جديد لكل hash.' },
      { q: 'ليش الـ hash البطيء شي زين للـ passwords؟', o: ['يوفّر مساحة', 'يخلّي تخمين passwords كثيرة مو عملي', 'أسهل في القراءة', 'الـ HTTP يطلبه'], why: 'المهاجمين يقدرون يجرّبون تخمينات أقل بواجد في الثانية.' }
    ],
    challenge: R`صفحة تسجيل / تسجيل دخول على الجدول [[members]] (الـ columns [[username]] و [[hash]]). الـ form يرسل [[action]] ([["register"]] أو [["login"]])، و [[u]]، و [[p]].
- **register**: أضف المستخدم بـ [[password_hash]] (prepared statement) واطبع [[<p id="msg">Account created for NAME</p>]].
- **login**: جيب الصف بالـ username (prepared)، وشيّك بـ [[password_verify]]، واطبع [[<p id="msg">Welcome NAME</p>]] أو [[<p id="msg">Wrong username or password</p>]].`
  };

  LESSONS_AR['sec-https-validation'] = {
    title: 'الـ HTTPS، والـ validation للمدخلات على الـ server',
    big: R`آخر قطعتين. الـ **HTTPS** يحمي البيانات **وهي في الطريق** بين الـ browser والـ server. والـ **Validation** يقرر شنو **يقبل** الـ server. فحوصات الـ client-side (الـ [[required]] في الـ HTML، والـ JavaScript) تخلّي الـ forms أريح، بس أي أحد يقدر يتخطّاها، فالـ server لازم يشيّك على كل شي مرة ثانية.`,
    simple: R`الـ **HTTPS** = الـ HTTP فوق الـ **TLS**.
- **التشفير**: محد على الشبكة (الـ Wi-Fi العام، أو شركة الإنترنت) يقدر يقرا البيانات: الـ passwords، والـ cookies، وخانات الـ forms.
- **سلامة البيانات (Integrity)**: محد يقدر يغيّر البيانات في الطريق.
- **إثبات الهوية (Authentication)**: الـ server يعرض **certificate** موقّعة من جهة موثوقة، تثبت إنه فعلًا هالـ domain. والقفل في شريط العنوان معناه إن الـ certificate انفحصت وطلعت سليمة.
- وهو **ما يوقف** الـ XSS، ولا الـ SQL injection، ولا الـ passwords الضعيفة: هذول أخطاء في الموقع نفسه.

**الـ Validation في الـ client ضد الـ server**
- في الـ Client (attributes الـ HTML5 مثل [[required]] و [[type="email"]] و [[min]] و [[pattern]]، أو الـ JavaScript): رد فوري، و requests ضايعة أقل. و**مو أمان**: المستخدم يقدر يطفيه أو يرسل request مباشرة.
- في الـ Server (الـ PHP): البوابة الحقيقية. شيّك على كل خانة، كل مرة.

**فحوصات مفيدة في الـ PHP**
- [[trim($x) === ""]] ← فاضي.
- [[filter_var($email, FILTER_VALIDATE_EMAIL)]] ← الإيميل، أو [[false]].
- [[filter_var($age, FILTER_VALIDATE_INT, ["options" => ["min_range" => 17, "max_range" => 60]])]] ← الرقم الصحيح، أو [[false]].
- [[is_numeric($x)]]، و [[strlen($p) >= 8]]، و [[preg_match('/^\d{9}$/', $id)]].
- اجمع الـ errors في array، واعرضهم كلهم، وكمّل بس لما يكون الـ array فاضي.`,
    simpler: R`- الـ **HTTPS** مثل ما ترسل رسالتك في **صندوق حديد مقفّل** عليه ختم الشركة الرسمي: محد يقدر يقراها أو يبدّلها في الطريق، وتعرف لمنو قاعد ترسلها. بس إذا الشركة نفسها مهملة مع رسالتك، الصندوق ما يفيد.
- الـ **Validation في الـ client** مثل لوحة على الباب مكتوب فيها "عبّ كل المربعات". والـ **Validation في الـ server** هو الموظف اللي فعلًا يشيّك على الاستمارة قبل ما يقبلها. والموظف بس هو اللي ينحسب.`,
    deeper: [
      { task: R`الـ form اللي في النتيجة فيه [[required]] و [[type="email"]]، بس شريط الـ request يرسل البيانات مباشرة ويتخطاهم. شغّله، وبعدين أرسل بيانات صحيحة بالـ form.` },
      R`**شنو يحمي الـ HTTPS، خطوة بخطوة.** الـ browser يتصل بـ [[https://uob.edu.bh]]، والـ server يرسل الـ certificate حقه، والـ browser يشيّك عليه مقابل الجهات اللي يثق فيها، والطرفين يتفقون على مفتاح سري، ومن بعدها كل request و response، حتى الـ cookies، يكون مشفّر. وعشان جذي بعد الـ session cookies المفروض تكون **Secure**: فأبد ما تمشي بدون هالحماية.`
    ],
    points: [
      'الـ HTTPS = الـ HTTP فوق الـ TLS: تشفير، وسلامة بيانات، وإثبات هوية الـ server (certificate).',
      'الـ HTTPS ما يصلّح الـ XSS، ولا الـ SQL injection، ولا الـ passwords الضعيفة.',
      'الـ validation في الـ client للراحة، وينقدر يتخطّاه.',
      'الـ validation في الـ server لازم: شيّك على كل خانة في كل request.',
      'الـ filter_var مع FILTER_VALIDATE_EMAIL / FILTER_VALIDATE_INT، و trim، و strlen، و preg_match.'
    ],
    exam: [
      'سؤال قصير: الـ HTTPS من شنو يحمي، ومن شنو ما يحمي؟',
      'سؤال قصير: ليش الـ validation في الـ client مو كافي؟',
      'قائمة أفضل الممارسات: سوّ validation للمدخلات، و escape للـ output، و prepared statements، و hash للـ passwords، و HTTPS، و session cookies آمنة.'
    ],
    mistakes: [
      'attributes الـ HTML تنشال أو تتخطّى. والـ server لازم يسوي validation.',
      'الـ filter_var يرجّع القيمة أو false. قارن مع false، خصوصًا مع الأرقام اللي فيها 0 نتيجة صحيحة.'
    ],
    summary: [
      'الـ HTTPS: مشفّر، وما تغيّر، والـ server الصحيح.',
      'سوّ validation في الـ server، دايمًا.',
      'فحوصات الـ client بس للراحة.'
    ],
    recall: [
      { q: 'شنو يحمي الـ HTTPS؟', o: ['الـ database من الـ SQL injection', 'البيانات اللي تمشي بين الـ browser والـ server', 'الصفحة من الـ XSS', 'الـ passwords المحفوظة في الـ database'], why: 'الـ TLS يشفّر ويحمي البيانات وهي في الطريق.' },
      { q: 'ليش الـ validation في الـ client بروحه مو كافي؟', o: ['بطيء', 'المستخدمين يقدرون يتخطّونه ويرسلون أي بيانات', 'يشتغل في Chrome بس', 'ما يقدر يشيّك الإيميلات'], why: 'الـ requests تنرسل بدون الصفحة، أو والفحوصات طافية.' },
      { q: R`شنو يرجّع [[filter_var("ab.com", FILTER_VALIDATE_EMAIL)]]؟`, why: 'مو إيميل صحيح، فيرجّع false.' },
      { q: 'القفل في شريط العنوان شنو يأكّد؟', o: ['الموقع ما فيه أخطاء', 'الاتصال مشفّر والـ certificate صالحة لهالـ domain', 'الموقع تابع للحكومة', 'الـ passwords عليها hash'], why: 'هو عن الاتصال والـ certificate بس.' }
    ],
    challenge: R`سوّ validation لتسجيل على الـ **server**. لما ينرسل الـ form، اجمع الـ errors في array، بهالترتيب:
- [["Name is required"]] إذا الاسم فاضي بعد [[trim]]
- [["Email is not valid"]] (استخدم [[filter_var]])
- [["Age must be a whole number from 17 to 60"]]
- [["Password must be at least 8 characters"]]
إذا في errors، اطبعهم كعناصر [[<li>]] داخل [[<ul id="errors">]]. وإلا اطبع [[<p id="ok">Registered NAME</p>]] (عليه escape).`
  };
})();

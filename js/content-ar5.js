/* Arabic versions of module 09 (PHP basics). Aligned item by item with js/content5.js. */
(() => {
  const R = String.raw;

  LESSONS_AR['php-intro'] = {
    title: 'شلون يشتغل الـ PHP: الـ syntax والـ echo والـ variables والـ strings',
    big: R`لين الحين كل سطر كود كان يشتغل **في الـ browser**. أما الـ PHP فيشتغل **على الـ server**. الـ browser يطلب [[page.php]]، والـ server يشغّل الـ PHP اللي داخله، ويرجّع **النتيجة** بس: HTML عادي. والزائر أبد ما يشوف كود الـ PHP حقك، حتى لو فتح View Source.

وعشان جذي الـ PHP يقدر يسوي أشياء ما يقدر عليها الـ JavaScript اللي في الـ browser: يقرأ database، ويشيّك على password، ويتذكر المستخدم بين الصفحات.

**في هالموقع**، في PHP 8.4 حقيقي يشتغل داخل الـ browser حقك ويسوي روحه server. الشريط اللي فوق النتيجة هو الـ **request**: الـ method، والـ query string، وبيانات الـ POST، والـ IP حق الزائر. غيّره واضغط Run.`,
    simple: R`- كود الـ PHP يكون بين [[<?php]] و [[?>]]. وأي شي برّا الـ tags ينرسل كـ HTML عادي.
- كل statement ينتهي بـ semicolon [[;]].
- الـ [[echo]] يرسل نص للصفحة: [[echo "Hello";]]. والـ [[print]] نفس الشي.
- الـ variables تبدأ بـ [[$]]: [[$name = "Ali";]]. والأسماء case-sensitive (يعني [[$Name]] variable ثاني). وما في [[let]] ولا [[const]].
- النوع يتحدد من القيمة: int [[20]]، و float [[3.5]]، و string [["text"]]، و bool [[true]]، و array، و [[null]]. والـ [[var_dump($x)]] يعرض النوع والقيمة.
- **الـ Strings**: الـ double quotes تحط قيمة الـ variable داخلها ([["Hi $name"]] ← Hi Ali)، والـ single quotes لا ([['Hi $name']] ← Hi $name).
- **لزق الـ strings يكون بالنقطة** [[.]]، مو بـ [[+]]: [["Hi " . $name]]. والـ [[.=]] يضيف لآخر الـ string.
- الـ comments: [[//]] و [[#]] و [[/* … */]].
- الـ [[<?= $name ?>]] طريقة مختصرة لـ [[<?php echo $name; ?>]] داخل الـ HTML.`,
    simpler: R`تخيّل مطعم.

- الـ **browser** هو الزبون، يطلب [[menu.php]].
- الـ **server** هو المطبخ، و**الـ PHP هو الوصفة** اللي يمشي عليها الطبّاخ.
- الزبون ياخذ **الصحن** بس (الـ HTML)، وأبد ما ياخذ الوصفة.

وفي الوصفة، الـ [[$]] يعلّم على صندوق مكوّن ([[$name]])، والـ [[echo]] يحط شي في الصحن، والنقطة [[.]] هي الغرا اللي يلزق قطعتين نص مع بعض.`,
    deeper: [
      { task: R`شغّله، وبعدين غيّر [[$name]] و [[$age]]. وافتح "اعرض الـ HTML اللي طلّعه السكربت": كود الـ PHP مو موجود، بس النتيجة حقته.` },
      R`**الأرقام والـ strings.** الـ PHP يحوّل بينهم لما يحتاج. الـ [[+]] دايمًا يسوي حساب، والـ [[.]] دايمًا يلزق نص. وهذا عكس الـ JavaScript، اللي فيه الـ [[+]] يسوي الثنتين.`,
      null,
      R`**الـ PHP داخل الـ HTML.** ملف الـ [[.php]] في العادة صفحة HTML فيها جزر PHP صغيرة. والـ [[<?= ?>]] يطبع قيمة وحدة.`,
      { task: R`غيّر [[$course]] وقائمة [[$topics]]. وبعدين أضف [[<li>]] ثالث فيه [[<?= $topics[2] ?>]].` }
    ],
    points: [
      'الـ PHP يشتغل على الـ server، والـ browser يوصله بس الـ HTML اللي يطلّعه.',
      'الكود يكون بين <?php و ?>، وكل statement ينتهي بـ ;.',
      'الـ variables تبدأ بـ $ وهي case-sensitive، وما في let/const.',
      'لزق الـ strings بـ . (نقطة). والـ + للأرقام بس.',
      'الـ double quotes تحط قيمة الـ variables ("Hi $name")، والـ single quotes لا.',
      'الـ <?= $x ?> اختصار لـ <?php echo $x; ?>.'
    ],
    exam: [
      R`أسئلة المخرجات: توقّع شنو يطبع [[echo "5" . 3;]] أو [[echo "5" + 3;]] أو [[echo 'Hi $x';]].`,
      'سؤال قصير: الـ client-side ضد الـ server-side scripting (وين يشتغل الكود، ومنو يقدر يشوفه، وشنو يقدر يوصل له كل واحد).',
      'كل سؤال كود PHP يتوقع الـ $ على الـ variables والـ ; في آخر السطر: كل واحد ناقص ممكن يكلفك درجة.'
    ],
    mistakes: [
      'في الـ PHP الـ + للحساب بس. ولزق النص بالنقطة.',
      'كل variable يحتاج علامة الـ $، لما تعطيه قيمة ولما تستخدمه.',
      'الـ variables تتبدّل بقيمتها بس داخل الـ double quotes.'
    ],
    summary: [
      'الـ server يشغّل الـ PHP ← الـ browser ياخذ HTML.',
      '$variables، و ; في الآخر، و echo عشان تطبع.',
      'النقطة تلزق الـ strings، والـ double quotes تحط قيمة الـ variables.'
    ],
    recall: [
      { q: R`شنو يطبع [[echo "4" . 2;]]؟`, o: ['6', '42', '4.2', 'Error'], why: 'النقطة تلزق النص: "4" و "2" يصيرون "42".' },
      { q: R`[[$x = "Ali";]] شنو يطبع [[echo 'Hi $x';]]؟`, o: ['Hi Ali', 'Hi $x', 'Hi', 'Error'], why: 'الـ single quotes تطبع النص مثل ما هو مكتوب بالضبط.' },
      { q: 'وين يشتغل كود الـ PHP؟', o: ['في الـ browser', 'على الـ web server', 'في الـ database', 'في محرك الـ CSS'], why: 'الـ PHP شغله server-side، والـ browser يوصله الناتج بس.' },
      { q: R`أي سطر يطبع الـ variable [[$total]] داخل الـ HTML؟`, why: R`[[<?= $total ?>]] اختصار لـ [[<?php echo $total; ?>]].` }
    ],
    challenge: R`باستخدام الـ variables اللي في الـ starter:
1. اطبع [[<h1>Welcome Nezar</h1>]]، وابنه بلزق النص مع [[$name]] بالنقطة.
2. اطبع فقرة [[<p id="mark">ITCS333 mark: 87 (Pass)</p>]]. استخدم [[$course]] و [[$mark]]، و [[if]] يكتب [[Pass]] إذا الدرجة 60 أو أكثر، وإلا [[Fail]].
3. اطبع [[<p id="next">Next year: 2027</p>]] باستخدام [[$year + 1]].`
  };

  LESSONS_AR['php-arrays'] = {
    title: 'الـ Arrays والـ foreach',
    big: R`تقريبًا كل سؤال PHP في الامتحان يبدأ بـ array: قائمة كتب، أو سيارات، أو طلاب، أو دول، و loop يطبعهم كـ HTML. والـ PHP عنده نوع array واحد يشتغل كقائمة مرقّمة، ويشتغل بعد كـ **قاموس** فيه أزواج [[key => value]].`,
    simple: R`**الـ Indexed array** (مرقّم من 0):
- [[$marks = [80, 95, 70];]] أو الطريقة القديمة [[$marks = array(80, 95, 70);]]
- [[$marks[0]]] قيمته 80. و [[$marks[] = 60;]] يضيف في الآخر. و [[count($marks)]] هو الطول.

**الـ Associative array** (keys لها أسماء):
- [[$student = ["name" => "Ali", "gpa" => 3.4];]]
- [[$student["name"]]] قيمته "Ali". وعشان تضيف أو تغيّر: [[$student["major"] = "CS";]]

الـ **foreach** يمشي على الـ array:
- [[foreach ($marks as $m) { … }]] ← كل قيمة
- [[foreach ($student as $key => $value) { … }]] ← كل key مع قيمته

**Arrays داخل arrays** (المفضّل في الامتحان):
- قائمة records: [[$books = [ ["title" => "PHP", "year" => 2019], ["title" => "SQL", "year" => 2012] ];]] ← [[$books[1]["title"]]] قيمته "SQL".
- key فيه قائمة: [[$capitals["Bahrain"] = ["Manama", "Asia"];]] ← [[$capitals["Bahrain"][0]]] قيمته "Manama".

وعشان تشوف داخل أي array وأنت تجرّب: [[print_r($arr);]] أو [[var_dump($arr);]] (حطهم داخل [[<pre>]] عشان يبقى الترتيب).`,
    simpler: R`- الـ **indexed array** صف لوكرات مرقّمة، يبدأ من 0.
- الـ **associative array** صف لوكرات عليها **أسماء** بدال الأرقام: "name" و "gpa".
- قائمة الـ records مثل **كبت ملفات**: كل درج (0 و 1 و 2…) فيه ملف طالب واحد، وكل ملف فيه خانات لها أسماء.
- الـ [[foreach]] يفتح كل لوكر بالترتيب ويعطيك اللي داخله ([[$value]])، وإذا طلبت، الاسم اللي على الباب ([[$key]]).`,
    deeper: [
      { task: R`أضف طالب رابع في [[$students]] وشغّل مرة ثانية. الجدول يكبر بروحه بسبب الـ [[foreach]].` },
      R`**Loop داخل الـ HTML.** بدال ما تسوي echo لكل tag، تقدر تسكّر الـ PHP، وتكتب HTML، وتفتح الـ PHP مرة ثانية. وشكل [[foreach (…):]] / [[endforeach;]] ينقرا زين في الـ templates.`,
      { task: R`أضف [[<td>]] للـ major في كل صف (موجود في الـ array).` },
      R`**قوائم متداخلة من array of arrays.** كل key هو دولة، والقيمة حقته indexed array صغير [العاصمة، القارة]. الـ [[foreach]] اللي برّا يسوي القائمة الخارجية، وداخله تطبع القيم الداخلية.`,
      null
    ],
    points: [
      'الـ indexed arrays تبدأ من 0، و $a[] = x يضيف في الآخر، و count($a) يعطي الطول.',
      'الـ associative arrays تستخدم "key" => value، وتقراها بـ $a["key"].',
      'foreach ($a as $v) يعطي القيم، و foreach ($a as $k => $v) يعطي الـ keys والقيم.',
      'قائمة الـ records هي indexed array فيه associative arrays: $rows[1]["name"].',
      'الـ print_r / var_dump يعرضون الـ array وأنت تجرّب.'
    ],
    exam: [
      'عرّف array of associative arrays (كل واحد فيه 3 keys) وسوّ عليه loop بالـ foreach.',
      R`اطبع قوائم HTML متداخلة من [[$arr[$key] = [value1, value2]]].`,
      R`اعرف الطريقتين: [[[1, 2]]] و [[array(1, 2)]]، و [[array("a" => 1)]].`
    ],
    mistakes: [
      'الـ key والـ value يتربطون بـ => مو بفاصلة.',
      'الـ keys اللي هي نص تحتاج quotes. وبدونها الـ PHP 8 يرمي Error (undefined constant).',
      'الـ arrays في الـ PHP ما عندها .length. استخدم count().'
    ],
    summary: [
      '[…] أو array(…)، و "key" => value للـ keys اللي لها أسماء.',
      'foreach ($a as $k => $v).',
      'الـ Records: $rows[i]["field"].'
    ],
    recall: [
      { q: R`[[$a = [5, 8, 2]; $a[] = 7;]] كم [[count($a)]]؟`, why: 'الـ $a[] = 7 يضيف عنصر رابع.' },
      { q: 'أي loop يعطيك الـ key والـ value مع بعض؟', why: 'اكتب key => value بعد as.' },
      { q: R`[[$cars = [["model" => "Civic", "year" => 2019]];]] شلون تطبع 2019؟`, why: 'أول اختار الـ record [0]، وبعدين الخانة ["year"].' }
    ],
    challenge: R`اطبع الدول اللي في [[$countries]] كقوائم متداخلة:
[[<ul id="countries">]] فيها [[<li>]] لكل دولة. والـ [[<li>]] حق كل دولة يبدأ باسم الدولة، وبعدين فيه [[<ul>]] داخلي فيه عنصرين: [["Capital: …"]] و [["Continent: …"]].
وتحتها، اطبع [[<p id="total">3 countries</p>]] باستخدام [[count()]].`
  };

  LESSONS_AR['php-functions'] = {
    title: 'الـ Functions والـ scope والـ global والـ $GLOBALS',
    big: R`الـ functions في الـ PHP شكلها مثل functions الـ JavaScript، بس فيها مفاجأة كبيرة: الـ function **ما تشوف** الـ variables المكتوبة برّاها. وإذا تبي تستخدم variable من برّا لازم تقول جذي بـ [[global]] أو توصل له عن طريق [[$GLOBALS]]. والثنتين يطلعون واجد في الـ MCQs.`,
    simple: R`- التعريف: [[function area($w, $h) { return $w * $h; }]]
- الاستدعاء: [[echo area(3, 4);]] ← 12
- القيم الافتراضية: [[function greet($name = "guest") { … }]] ← [[greet()]] تستخدم "guest".
- الـ function اللي ما فيها [[return]] ترجّع [[null]].

**الـ Scope**
- الـ variables اللي تنسوّى **داخل** الـ function تكون **local**: تختفي لما تخلص.
- الـ variables اللي تنسوّى **برّا** (global variables) **ما تبين** داخل الـ function.
- [[global $rate;]] داخل الـ function ← استخدم [[$rate]] اللي برّا.
- [[$GLOBALS['rate']]] ← نفس الـ variable اللي برّا، تقراه أو تغيّره عن طريق الـ array الخاص اللي فيه كل الـ globals.`,
    simpler: R`الـ function مثل غرفة بابها مسكّر.

- اللي ينسوّى داخل الغرفة يبقى داخلها.
- اللي برّا في الصالة ما ينشاف من داخل الغرفة.
- [[global $x;]] مثل ما تفتح دريشة على الصالة وتقول "أبي **ذاك** الـ $x".
- والـ [[$GLOBALS]] هو لوحة الإعلانات حق العمارة: أي أحد في أي غرفة يقدر يقراها أو يكتب عليها.`,
    deeper: [
      { task: R`شيل السطر [[global $discount;]] وشغّل: الـ warning يبيّن إن [[$discount]] مو موجود داخل الـ function.` },
      R`**الـ Local يعني local.** الـ variable اللي له نفس الاسم داخل الـ function هو variable ثاني. وإذا غيّرته ما يتغير اللي برّا.`,
      null
    ],
    points: [
      'function name($a, $b = default) { return …; }',
      'الـ variables داخل الـ function تكون local، والـ variables اللي برّا ما تبين داخلها.',
      'الـ global $x; داخل الـ function يربطها بالـ $x اللي برّا.',
      'الـ $GLOBALS["x"] يقرا أو يغيّر الـ $x اللي برّا من أي مكان.',
      'بدون return الـ function ترجّع null.'
    ],
    exam: [
      R`MCQ: شنو ينطبع لما function تستخدم variable من برّا **بدون** [[global]]؟ (warning وقيمة فاضية.)`,
      R`MCQ: أي طريقتين يخلّون الـ function توصل لـ global variable ([[global]] و [[$GLOBALS]])؟`
    ],
    mistakes: [
      'الـ variables اللي برّا ما تبين داخل الـ functions إلا إذا استخدمت global أو $GLOBALS.',
      'الـ key حق $GLOBALS هو اسم الـ variable كـ string، بدون الـ $.'
    ],
    summary: [
      'الـ Functions: function و parameters و return.',
      'local بشكل افتراضي.',
      'global $x أو $GLOBALS["x"] للـ variables اللي برّا.'
    ],
    recall: [
      { q: R`[[$a = 5; function f() { return $a; } echo f();]] شنو يصير؟`, o: ['يطبع 5', 'Warning: undefined variable، وما يطبع شي', 'يطبع 0', 'يطبع $a'], why: 'داخل f، الـ $a variable local جديد ما انعطى قيمة أبد.' },
      { q: R`أي سطر يخلّي [[$total]] اللي برّا ينفع داخل function؟`, why: 'الـ global يربط الاسم بالـ global variable.' },
      { q: R`شلون تقرأ الـ global [[$name]] عن طريق الـ superglobal array؟`, why: 'الـ key هو اسم الـ variable بدون $.' }
    ],
    challenge: R`1. اكتب [[function priceWithTax($price)]] اللي تستخدم الـ global [[$taxRate]] (بـ [[global]]) وترجّع السعر مع الضريبة.
2. اكتب [[function addToCart($amount)]] اللي تضيف [[$amount]] للـ global [[$total]] باستخدام [[$GLOBALS]].
3. بعدين اطبع [[<p id="tax">With tax: 110</p>]] باستخدام [[priceWithTax(100)]]، ونادي [[addToCart(10)]] و [[addToCart(25)]]، واطبع [[<p id="total">Total: 35</p>]].`
  };

  LESSONS_AR['php-strings'] = {
    title: 'دوال الـ String: الـ explode والـ implode والـ trim والـ substr وغيرها',
    big: R`البيانات اللي تجي من الـ forms والملفات توصل كنص: أسماء فيها مسافات زايدة، وقيم ملزوقة مع بعض مثل [["2.5#300"]]. وفي كم function جاهزة تنظّف هالنص وتقصّه وتقسمه. والـ [[explode]] بالذات موجود تقريبًا في كل امتحان سابق.`,
    simple: R`- [[trim($s)]] ← يشيل المسافات (والأسطر الجديدة) من الطرفين.
- [[strlen($s)]] ← عدد الحروف.
- [[strtoupper($s)]] / [[strtolower($s)]] ← كله capital / كله small. و [[ucfirst($s)]] ← أول حرف capital.
- [[substr($s, start, length)]] ← قطعة من الـ string. [[substr("Hello", 1, 3)]] ← "ell"، والـ start السالب يحسب من الآخر: [[substr("Hello", -2)]] ← "lo".
- [[strpos($s, "x")]] ← مكان "x"، أو [[false]] إذا مو موجود. قارن بـ [[!== false]]، لأن المكان 0 بعد يبين كأنه "false".
- [[str_replace("a", "o", $s)]] ← يبدّل كل "a" بـ "o".
- [[explode(",", $s)]] ← **يقسم** الـ string لـ array عند كل فاصلة.
- [[implode(", ", $arr)]] ← **يلزق** الـ array في string واحد، وبين كل عنصر ", ".
- [[number_format($n, 3)]] ← رقم بثلاث خانات عشرية كنص: 2.85 ← "2.850".`,
    simpler: R`- الـ [[explode]] سكين: يقص الـ string عند كل فاصل ويعطيك القطع في array. "2.5#300" لما تقصه عند "#" يعطيك ["2.5", "300"].
- الـ [[implode]] غرا: يلزق قطع الـ array في string واحد، والفاصل بينهم.
- الـ [[trim]] مثل ما تقص الأطراف حق الساندويش من الجهتين.
- الـ [[substr]] مثل ما تقص شريحة من مكان معيّن.`,
    deeper: [
      { task: R`غيّر الفاصل في الـ [[explode]] لـ [["#"]] وخلّ قيمة [[$item]] تصير [["2.5#300"]]. شنو قيمة [[$parts[0]]] و [[$parts[1]]] الحين؟` },
      R`**نمط الامتحان.** قيمة فيها معلومتين ملزوقين برمز، مثل قيمة checkbox [["1.250#400"]] (السعر # السعرات). الـ [[explode]] يقسمها، وأنت تجمع كل جزء.`,
      null
    ],
    points: [
      'الـ trim يشيل المسافات اللي برّا، والـ strlen يعد الحروف.',
      'الـ strtoupper / strtolower / ucfirst يغيّرون حجم الحروف.',
      'substr($s, start, length)، والـ start السالب يحسب من الآخر.',
      'الـ strpos يرجّع مكان أو false: اختبره بـ !== false.',
      'explode(separator, string) ← array، و implode(separator, array) ← string.',
      'الـ number_format($n, decimals) يحوّل الرقم لنص منسّق.'
    ],
    exam: [
      R`قسّم قيمة مثل [["price#weight"]] بـ [[explode('#', $v)]] وكمّل المجموع.`,
      R`MCQ: شنو يرجّع [[trim]] أو [[implode]] أو [[substr]] لمدخل معيّن.`,
      R`تذكّر ترتيب الـ arguments: الفاصل **أول** في [[explode]] وفي [[implode]].`
    ],
    mistakes: [
      'الفاصل يجي أول، وبعدين الـ string.',
      'لما "A" يكون أول حرف، الـ strpos يرجّع 0، والـ if() تعتبره false.',
      'إذا سويت echo لـ array يطبع كلمة Array مع warning. الزقه أول.'
    ],
    summary: [
      'تنظيف: trim و strtolower و ucfirst.',
      'قص: substr و strpos.',
      'تقسيم / لزق: explode / implode.'
    ],
    recall: [
      { q: R`كم [[count(explode("-", "a-b-c-d"))]]؟`, why: 'ثلاث فواصل تعطي أربع قطع.' },
      { q: R`شنو يرجّع [[implode("+", [1, 2, 3])]]؟`, why: 'الـ implode يلزق العناصر كنص والفاصل بينهم.' },
      { q: R`شنو [[substr("ITCS333", 4)]]؟`, why: 'من المكان 4 (العد من 0) لين الآخر.' },
      { q: R`شنو يرجّع [[trim("  hi  ")]]؟`, why: 'الـ trim يشيل المسافات من الطرفين.' }
    ],
    challenge: R`[[$line]] فيه أربع أسماء بمسافات وحروف كبيرة لخبطة.
1. قسّمه لـ array عند كل فاصلة.
2. نظّف كل اسم: شيل المسافات اللي حوله وخلّه [["Capitalised"]] (أول حرف capital والباقي small).
3. اطبع [[<p id="names">Ali | Sara | Hassan | Maryam</p>]] (الزقهم بـ [[" | "]]).
4. اطبع [[<p id="count">4 names</p>]].
5. اطبع [[<p id="initials">ASHM</p>]]: أول حرف من كل اسم بعد التنظيف.`
  };

  LESSONS_AR['php-regex'] = {
    title: 'الـ preg_match: تشيّك على النص بالـ patterns',
    big: R`أحدث امتحانات هالمادة تطلب منك تسوي loop على array وتطبع بس العناصر اللي **تطابق pattern**: أسماء تنتهي برقم، أو codes تبدأ بحرف capital، أو كلمات فيها حرف علة. وأداة الـ PHP لهالشي هي [[preg_match]]. ولغة الـ pattern هي نفس الـ regex اللي شفته في درس الـ JavaScript الإضافي.`,
    simple: R`الـ [[preg_match('/pattern/', $text)]] يرجّع **1** إذا لقى الـ pattern في النص، و **0** إذا ما لقاه.

اكتب الـ pattern بين **single quotes**، وبين slashes. وبعد آخر slash تقدر تضيف [[i]] عشان يتجاهل الـ capital والـ small.

القطع:
- [[^]] بداية النص · [[$]] نهاية النص
- [[[abc]]] حرف واحد من هذول · [[[a-z]]] [[[A-Z]]] [[[0-9]]] نطاقات · [[[^0-9]]] أي شي إلا رقم
- [[\d]] رقم · [[\w]] حرف أو رقم أو _ · [[\s]] مسافة · [[.]] أي حرف
- الـ Quantifiers، بعد القطعة: [[*]] صفر أو أكثر · [[+]] واحد أو أكثر · [[?]] صفر أو واحد · [[{3}]] ثلاثة بالضبط · [[{2,4}]] من 2 لين 4

فحوصات معروفة:
- ينتهي برقم: [['/\d$/']] · يبدأ بـ capital: [['/^[A-Z]/']]
- فيه حرف علة: [['/[aeiou]/i']] · حروف بس: [['/^[a-zA-Z]+$/']]
- ثلاث أرقام بالضبط: [['/^\d{3}$/']]`,
    simpler: R`الـ pattern **وصف** لشكل النص المطلوب، والـ preg_match هو الحارس اللي يشيّك عليه.

- الـ [[^]] يعني "في البداية على طول"، والـ [[$]] يعني "في النهاية على طول".
- الـ [[[A-Z]]] يعني "أي حرف capital واحد"، والـ [[\d]] يعني "أي رقم واحد".
- الـ [[+]] يعني "واحد أو أكثر منه"، و [[{3}]] يعني "ثلاثة منه بالضبط".

[['/^[A-Z]\d+$/']] تنقرأ: "حرف capital في البداية، وبعدين أرقام لين النهاية". "B12" يعدّي، و "b12" و "B1x" لا.`,
    deeper: [
      { task: R`أضف كلماتك في [[$words]]، وبعدين غيّر الـ pattern لـ [['/^[a-z]/']] (يبدأ بحرف small).` },
      R`**نمط الامتحان (على طريقة 2024-25).** array of associative arrays، و [[if]] على خانة وحدة، و [[foreach]] مع [[preg_match]] على خانة ثانية.`,
      null,
      { task: R`اكتب pattern حق رقم جامعي: 9 أرقام بالضبط، ويبدأ بـ 20. وجرّبه على القائمة.` }
    ],
    points: [
      'الـ preg_match(pattern, text) يرجّع 1 (تطابق) أو 0 (ما تطابق).',
      'اكتب الـ patterns كـ string بين single quotes وبين / /، وأضف i عشان يتجاهل حجم الحروف.',
      'الـ ^ للبداية، والـ $ للنهاية، وبدونهم الـ pattern ممكن يطابق في أي مكان.',
      '\\d رقم، و [A-Z] capital، و [aeiou] حرف علة، و . أي حرف.',
      '* 0 أو أكثر، و + 1 أو أكثر، و ? 0 أو 1، و {m,n} بين m و n.'
    ],
    exam: [
      'سوّ loop على array of associative arrays واطبع العناصر اللي الخانة حقها تطابق pattern (تنتهي برقم، أو تبدأ بحرف، أو فيها حرف علة).',
      R`MCQ على الـ quantifiers: شنو معنى [[* + ? {m,n}]].`,
      R`انتبه للـ anchors: [['/\d/']] يعني "فيه رقم"، و [['/\d$/']] يعني "ينتهي برقم".`
    ],
    mistakes: [
      'الـ pattern يحتاج delimiters (في العادة slashes) حوله.',
      'بدون $ الرقم ممكن يكون في أي مكان في النص.',
      'الـ patterns حساسة لحجم الحروف إلا إذا أضفت الـ flag حق i.'
    ],
    summary: [
      'preg_match ← 1 أو 0.',
      'الـ anchors ^ $، والـ classes [ ]، و \\d \\w \\s.',
      'الـ quantifiers * + ? {m,n}، و i يتجاهل حجم الحروف.'
    ],
    recall: [
      { q: R`أي pattern يطابق نص **ينتهي برقم**؟`, why: '\\d وبعده $ = رقم في النهاية على طول.' },
      { q: R`شنو يرجّع [[preg_match('/^[A-Z]{2}\d{3}$/', "IT333")]]؟`, why: 'حرفين capital، وبعدين ثلاث أرقام بالضبط: يطابق، فيرجّع 1.' },
      { q: R`في الـ regex، الـ [[?]] بعد حرف معناه…`, o: ['واحد أو أكثر', 'صفر أو أكثر', 'صفر أو واحد', 'أي حرف'], why: 'الـ ? يخلّي القطعة اختيارية.' },
      { q: R`أي flag يخلّي [['/[aeiou]/']] يطابق حروف العلة الـ capital بعد؟`, why: 'الـ i = case-insensitive.' }
    ],
    challenge: R`باستخدام [[$cars]]:
1. في [[<ul id="recent">]]، اكتب الـ models حق السيارات اللي **year > 2015**.
2. في [[<ul id="digit">]]، اكتب الـ models اللي **تنتهي برقم** (استخدم [[preg_match]]).
3. في [[<ul id="both">]]، اكتب الـ models اللي **تبدأ بحرف capital وتنتهي برقم**.
4. اطبع [[<p id="first">Corolla is old</p>]]: [[if]] على السنة حق أول سيارة (2015 أو قبل ← "old"، وإلا "new").`
  };

  LESSONS_AR['php-forms'] = {
    title: 'الـ Forms: الـ $_GET والـ $_POST والـ isset والـ extract',
    big: R`هني الـ PHP يلتقي مع الـ forms اللي بنيتها في جزء الميد. لما ينرسل form، الـ browser يرسل **الـ name** و**الـ value** حق كل خانة للـ server. والـ PHP يحطهم في arrayين جاهزين: [[$_GET]] و [[$_POST]]. والصفحة تقدر تعرض الـ form **وتتعامل** معاه بعد، وتقرر أي واحد تسوي بـ [[isset]].

في الـ lab، أرسل الـ form اللي داخل النتيجة: شريط الـ request يبيّن شنو أرسل الـ browser.`,
    simple: R`- [[<form method="get">]] ← البيانات تروح في الـ URL ([[page.php?name=Ali&mark=90]]) وتوصل في [[$_GET]].
- [[<form method="post">]] ← البيانات تروح في الـ request body وتوصل في [[$_POST]].
- الـ attribute **[[name]]** حق كل input يصير هو الـ **key**: [[<input name="mark">]] ← [[$_POST["mark"]]].
- الـ [[action="result.php"]] يرسل البيانات لصفحة ثانية، وإذا ما في action تروح لنفس الصفحة.
- القيم دايمًا توصل كـ **strings**.

**في بيانات؟**
- [[isset($_POST["mark"])]] ← true إذا هالخانة انرسلت. شيّك قبل ما تقرا، وإلا بيطلع لك warning في أول زيارة.
- [[empty($x)]] ← true إذا القيمة مو موجودة، أو "" أو "0".
- اختبار معروف حق "هل انرسل الـ form؟": [[if (isset($_POST["submit"]))]] (زر الـ submit عليه [[name="submit"]]).

الـ **extract($_POST)** يحوّل كل key لـ variable: [[$_POST["mark"]]] يصير [[$mark]]. الامتحانات السابقة تستخدمه، فاعرف شنو يسوي (وإنه ممكن يكتب فوق الـ variables حقتك).

والـ [[$_REQUEST]] فيه الـ GET والـ POST مع بعض.`,
    simpler: R`إرسال الـ form مثل ما ترسل استمارة معبّاة لمكتب بالبريد.

- الـ [[name]] هو العنوان المطبوع جنب كل مربع: "mark" و "email".
- مع الـ **GET** الأجوبة مكتوبة على برّا الظرف (الـ URL): أي أحد يقدر يقراها.
- مع الـ **POST** تكون داخل الظرف (الـ request body).
- وفي المكتب، الـ PHP يفتح [[$_GET]] أو [[$_POST]] ويقرأ كل جواب باسمه.
- والـ [[isset]] يعني تشيّك "هل فعلًا عبّى هالمربع؟" قبل ما تقراه.`,
    deeper: [
      { task: R`أرسل الـ form اللي في النتيجة بقيم مختلفة، وفضّي الاسم. وبعدين غيّر لـ [[method="get"]] وشوف شريط الـ request: البيانات تنتقل للـ URL.` },
      R`**الـ extract.** نفس الكود، بس أقصر. كل key في [[$_POST]] يصير variable بنفس الاسم.`,
      null,
      R`**الـ GET حق الروابط والبحث.** بيانات الـ GET جزء من الـ URL، فالرابط يقدر يشيلها: [[<a href="course.php?code=ITCS333">]]. استخدم الـ GET عشان تقرا أو تبحث، والـ POST عشان ترسل أو تغيّر بيانات، وحق الـ passwords.`,
      { task: R`اضغط على الروابط اللي في النتيجة. وبعدين اكتب [[code=ITCS214]] في شريط الـ request واضغط Run.` }
    ],
    points: [
      'الـ name حق الـ input هو الـ key في $_GET / $_POST.',
      'الـ method="get" ← $_GET (البيانات في الـ URL)، والـ method="post" ← $_POST (البيانات في الـ body).',
      'شيّك بـ isset قبل ما تقرا أي خانة.',
      'قيم الـ form كلها strings، فحوّل أو قارن بحذر.',
      'الـ extract($_POST) يسوي variable لكل key.'
    ],
    exam: [
      R`كود: صفحة تعرض form، ولما ينرسل تقرا الخانات بـ [[isset]] (أو [[extract]]) وتطبع نتيجة أو error.`,
      'سؤال قصير: الفرق بين GET و POST.',
      R`MCQ: أي superglobal فيه بيانات [[<form method="post">]].`
    ],
    mistakes: [
      'بس الـ attribute حق name هو اللي ينرسل للـ server. والـ id حق الـ CSS والـ JavaScript.',
      'في أول زيارة ما انرسل شي، فالـ key مو موجود.',
      'الـ superglobal لازم يطابق الـ method حق الـ form.'
    ],
    summary: [
      'name="x" ← $_GET["x"] أو $_POST["x"].',
      'isset قبل ما تقرا.',
      'الـ extract يسوي variables من الـ keys.'
    ],
    recall: [
      { q: R`الـ form فيه [[method="post"]] و [[<input name="email">]]. شلون تقرا الإيميل؟`, why: 'بيانات الـ POST تكون في $_POST، والـ key هو الـ name حق الـ input.' },
      { q: R`شنو يشيّك [[isset($_GET["page"])]]؟`, o: ['إن page رقم', 'إن في قيمة "page" انرسلت في الـ URL', 'إن الـ form صحيح', 'إن المستخدم مسجّل دخول'], why: 'الـ isset يكون true إذا الـ key موجود (ومو null).' },
      { q: R`بعد [[extract($_POST)]] والـ body فيه [[city=Manama]]، أي variable يصير موجود؟`, o: [R`[[$_city]]`, R`[[$city]]`, R`[[$post_city]]`, 'ولا واحد'], why: 'الـ extract يسوي variable لكل key، بنفس الاسم.' },
      { q: 'أي method تبيّن البيانات في شريط العنوان؟', o: ['GET', 'POST', 'الثنتين', 'ولا وحدة'], why: 'الـ GET يضيف ?name=value للـ URL.' }
    ],
    challenge: R`سوّ صفحة تعرض form ([[method="post"]]، و inputs أسماءها [[student]] و [[mark]]، وزر submit اسمه [[submit]])، ولما ينرسل، تطبع [[<p id="result">]]:
- إذا الاسم فاضي (بعد [[trim]]): [["Please enter a name"]]
- وإلا [["Name: grade"]] والـ grade يكون A (90+)، و B (80+)، و C (70+)، و D (60+)، و F (أقل من 60). مثال: [["Sara: A"]].
وفي أول زيارة (ما انرسل شي)، **ما يكون في** [[#result]].`
  };

  LESSONS_AR['php-checkbox'] = {
    title: 'الـ Checkbox arrays: الـ name="item[]" والمجموع',
    big: R`سؤال امتحان معروف: قائمة checkboxes، والمستخدم يصحّح على بعضها، والـ PHP يطبع المجموع. والحيلة في الاسم: [[name="item[]"]] مع الأقواس المربعة يخلّي الـ PHP يجمع **كل** القيم المصحّحة في array واحد.`,
    simple: R`- عط كل checkbox **نفس** الاسم وخلّه ينتهي بـ [[[]]]: [[<input type="checkbox" name="item[]" value="…">]].
- بس المربعات **المصحّحة** تنرسل. والـ [[$_POST["item"]]] يكون array فيه قيمها.
- إذا **ولا وحدة** مصحّحة، الـ key أصلًا مو موجود: اختبر بـ [[isset($_POST["item"])]] (أو [[isset($item)]] بعد [[extract]]) واعرض رسالة error.
- القيمة في العادة فيها كذا معلومة مع فاصل، مثل [[value="1.250#400"]] = السعر # السعرات. قسّمها بـ [[explode("#", $v)]].
- خلّ مجموع يمشي معاك: ابدأ من 0 قبل الـ loop، وأضف داخل الـ loop، واطبع بعده.
- الـ [[number_format($total, 3)]] يعطي 3 خانات عشرية (الدينار البحريني يستخدم 3).`,
    simpler: R`كرت طلب في كافيه فيه مربعات تصحّح عليها.

- كل المربعات لها نفس الاسم، [[item[]]]: والـ [[[]]] معناها "حط كل واحد مصحّح في نفس السلة".
- بس اللي تصحّح عليه يدخل السلة. والسلة الفاضية معناها إن الـ key مو موجود أصلًا، فشيّك بـ [[isset]] أول.
- وقيمة كل مربع مثل بطاقة سعر "1.250#400": الـ [[explode]] يقصها لسعر وسعرات، وأنت تجمعهم وأنت ماشي.`,
    deeper: [
      { task: R`صحّح على أغراض مختلفة في النتيجة واضغط Order. وبعدين شيل التصحيح من الكل واضغط Order مرة ثانية.` },
      R`**شنو يرسل الـ browser.** لما تصحّح على Latte و Juice ينرسل [[item[]=Latte#1.600#190&item[]=Juice#1.250#110]]. والـ PHP يشوف [[item[]]] مرتين ويبني [[$_POST["item"] = ["Latte#1.600#190", "Juice#1.250#110"]]]. وبدون الـ [[[]]] في الاسم، بس **آخر** قيمة مصحّحة تبقى.`,
      R`**نفس الشي مع الـ extract.** الامتحانات السابقة في العادة تكتب [[extract($_POST);]] وبعدين تختبر [[if (isset($item))]]. ويشتغل بنفس الطريقة: الـ variable يكون موجود بس إذا في مربع واحد على الأقل مصحّح.`
    ],
    points: [
      'الـ checkboxes اللي تنتمي لبعض لها اسم واحد ينتهي بـ [].',
      'الـ $_POST["item"] array فيه القيم المصحّحة بس.',
      'إذا ما في شي مصحّح ← الـ key مو موجود: اختبر بـ isset واعرض error.',
      'قسّم القيم الملزوقة بـ explode وأضف القطع للمجموع.',
      'ابدأ المجموع من 0 قبل الـ loop، واطبعه بعد الـ loop.'
    ],
    exam: [
      R`سؤال كامل: checkboxes [[name="x[]"]] وقيمها مثل [["price#weight"]]، واستخدم [[extract]] و [[isset]] و [[foreach]] و [[explode]]، وخلّ مجموع، واطبع error إذا ما انختار شي. ويتصحح سطر بسطر.`
    ],
    mistakes: [
      'بدون [] الـ PHP يخلّي بس آخر قيمة مصحّحة، كـ string.',
      'إذا ما في مربع مصحّح الـ key مو موجود.',
      'إذا رجّعت المجموع صفر داخل الـ loop، تضيع الأغراض اللي قبل.'
    ],
    summary: [
      'name="x[]" ← array فيه القيم المصحّحة.',
      'isset أول، و error إذا ما في شي مصحّح.',
      'explode لكل قيمة وكمّل المجموع.'
    ],
    recall: [
      { q: R`مربعين اسمهم [[c[]]] مصحّحين. شنو [[$_POST["c"]]]؟`, o: ['آخر قيمة', 'array فيه القيمتين', 'string مفصول بفواصل', 'true'], why: 'الـ [] في الاسم تجمع كل قيمة مصحّحة في array.' },
      { q: 'ولا checkbox مصحّح. شنو يكون في $_POST حقهم؟', o: ['array فاضي', 'null', 'ولا شي: الـ key مو موجود', '"off"'], why: 'الـ checkboxes اللي مو مصحّحة ما تنرسل أبد.' },
      { q: R`[[explode("#", "0.750#200")[1]]] قيمته…`, why: 'الـ index 1 هو ثاني قطعة.' }
    ],
    challenge: R`الـ form فيه ثلاث كتب. وقيمة كل واحد [["Title#price#weight"]] (السعر بالدينار، والوزن بالجرام). لما ينرسل الـ form:
- إذا في كتاب واحد على الأقل مصحّح: اطبع [[<li>]] لكل عنوان مصحّح داخل [[<ul id="chosen">]]، وبعدين [[<p id="total">Total: X BD, Y g</p>]] والسعر بـ 3 خانات عشرية.
- إذا ولا واحد مصحّح: [[<p id="total">No book selected</p>]].
استخدم [[extract($_POST)]] (أو [[$_POST]])، و [[isset]]، و [[foreach]]، و [[explode]].`
  };

  LESSONS_AR['php-server'] = {
    title: 'الـ $_SERVER والـ header() والـ die()',
    big: R`كل request فيه معلومات عن نفسه: الـ IP حق الزائر، والـ method، والصفحة المطلوبة، والـ browser. والـ PHP يحطهم في [[$_SERVER]]. وبالـ [[header("Location: …")]] الصفحة تقدر توجّه الزائر لمكان ثاني، وبالـ [[die()]] توقف في مكانها. والثنتين مع بعض يسوون سؤال "فلتر الـ IP" اللي في الامتحانات السابقة.

في الـ lab، غيّر خانة الـ **IP** في شريط الـ request عشان تسوي روحك زائر ثاني.`,
    simple: R`**الـ $_SERVER** (كم key مفيد)
- [[$_SERVER["REMOTE_ADDR"]]] ← الـ IP address حق الزائر، مثل "10.0.5.20"
- [[$_SERVER["REQUEST_METHOD"]]] ← "GET" أو "POST"
- [[$_SERVER["PHP_SELF"]]] ← مسار هالسكربت، مثل "/index.php"
- [[$_SERVER["QUERY_STRING"]]] ← الجزء اللي بعد ? في الـ URL
- [[$_SERVER["HTTP_USER_AGENT"]]] ← أي browser أرسل الـ request

الـ **header("Location: page.php")** يقول للـ browser "روح لـ page.php بدالها". وينرسل كـ HTTP header، فلازم يجي **قبل أي output** (أي echo أو HTML)، وإلا الـ PHP يعطي warning "headers already sent".

الـ **die("message")** (نفس [[exit("message")]]) يطبع الرسالة ويوقّف السكربت. وما يشتغل أي شي بعده. حطه بعد الـ redirect على طول عشان باقي الصفحة ما تنطبع أبد.`,
    simpler: R`- الـ [[$_SERVER]] هو المعلومات المكتوبة على ظرف الـ request: من وين جا (الـ IP)، وشلون انرسل (GET/POST)، وأي صفحة طلب.
- الـ [[header("Location: …")]] مثل موظف الاستقبال لما يقول "مو هني، روح ذاك المكتب".
- الـ [[die()]] مثل ما تسكّر باب المحل على طول: أي شي كان مخطط له بعده ما يصير.`,
    deeper: [
      { task: R`غيّر الـ IP في شريط الـ request لـ [[192.168.1.7]] واضغط Run. وبعدين جرّب [[10.0.0.66]].` },
      R`**الـ Headers قبل الـ output.** الـ redirect هو HTTP header، والـ headers تمشي **قبل** محتوى الصفحة. وأول ما ينرسل أي output، يكون الوقت فات. (سيرفرات واجد تحبس أول كم kilobyte من الـ output، وهذا يخفي هالغلطة، بس القاعدة للحين ثابتة والامتحانات تختبرها.)`,
      null,
      R`**شنو يسوي الـ browser** مع الـ [[Location]]: الـ server يرد بـ status **302 Found** مع العنوان الجديد، والـ browser يطلب هالعنوان بروحه. وفي الـ lab، الـ log يعرضه كـ "header Location".`
    ],
    points: [
      'الـ $_SERVER["REMOTE_ADDR"] هو الـ IP حق الزائر، و explode(".", …) يقسمه لـ 4 أجزاء.',
      'الـ $_SERVER فيه بعد REQUEST_METHOD و PHP_SELF و QUERY_STRING و HTTP_USER_AGENT.',
      'الـ header("Location: x.php") يسوي redirect، ولازم يجي قبل أي output.',
      'الـ die() / exit() يوقّف السكربت، استخدمه بعد الـ redirect.',
      'الـ redirect يرد بـ status 302 والـ browser يتبعه.'
    ],
    exam: [
      R`فلتر الـ IP: [[explode('.', $_SERVER['REMOTE_ADDR'])]]، وقارن جزء، وبعدين [[die()]] أو [[header('Location: …')]].`,
      R`MCQ: أي key في [[$_SERVER]] فيه الـ IP حق الـ client ([[REMOTE_ADDR]]).`
    ],
    mistakes: [
      'الـ header() ما يوقّف السكربت. وبدون exit/die باقي الصفحة للحين تشتغل.',
      'الـ HTTP header يكون "Name: value" بـ colon.',
      'الـ key اسمه REMOTE_ADDR.'
    ],
    summary: [
      'الـ $_SERVER["REMOTE_ADDR"] = الـ IP حق الـ client.',
      'الـ header("Location: …") قبل أي output.',
      'الـ die() / exit يوقّفون السكربت.'
    ],
    recall: [
      { q: R`أي واحد يعطي الـ IP address حق الزائر؟`, why: 'الـ REMOTE_ADDR هو العنوان حق الـ client اللي سوّى الـ request.' },
      { q: R`شنو يصير للكود اللي بعد [[die("Stop");]]؟`, o: ['يشتغل عادي', 'أبد ما يشتغل', 'يشتغل بعد تأخير', 'يشتغل بس مع POST'], why: 'الـ die يطبع رسالته وينهي السكربت.' },
      { q: R`ليش لازم [[header("Location: …")]] يجي قبل أي echo؟`, o: ['أسرع', 'الـ headers تنرسل قبل محتوى الصفحة', 'الـ echo يمسح الـ headers', 'مو لازم'], why: 'أول ما يبدأ الـ output، تكون الـ headers انرسلت خلاص.' }
    ],
    challenge: R`بس شبكة الجامعة (الـ IP addresses اللي تبدأ بـ [[10.]]) تقدر تشوف هالصفحة.
1. قسّم الـ IP حق الزائر من [[$_SERVER]] بـ [[explode]].
2. إذا الـ IP بالضبط [["10.0.0.66"]]، وقّف بـ [[die("Banned")]].
3. وإلا، إذا أول جزء مو [["10"]]، سوّ redirect لـ [[denied.php]] بـ [[header]] ووقّف بـ [[die()]].
4. وإلا اطبع [[<h1>Lab results</h1>]] و [[<p id="ip">Your IP: …</p>]].`
  };
})();

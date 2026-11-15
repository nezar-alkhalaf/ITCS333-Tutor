/* Arabic versions of module 10 (Databases & PDO). Aligned item by item with js/content6.js. */
(() => {
  const R = String.raw;

  LESSONS_AR['db-sql'] = {
    title: 'الـ SQL: الـ SELECT والـ INSERT والـ UPDATE والـ DELETE',
    big: R`الموقع يحفظ بياناته (المستخدمين، والمنتجات، والطلبات) في **database**، مو في variables حق PHP تختفي بعد كل request. والـ database الـ **relational** مثل MySQL يحفظ البيانات في **جداول** وتتحكم فيه بالـ **SQL**. والـ PHP يرسل SQL للـ database وترجع له صفوف.

كل lab في هالقسم فيه database صغير اسمه [[uob]] فيه أربع جداول: [[students]] و [[products]] و [[users]] و [[accounts]]. ويرجع لأصله كل ما تضغط Run.`,
    simple: R`الـ **table** فيه **columns** (خانات) و **rows** (records). وكل row له **primary key**، في العادة [[id]]، يميّزه.

الأوامر الأربعة:
- **القراءة**: [[SELECT name, gpa FROM students WHERE major = 'CS' ORDER BY gpa DESC;]]
  - الـ [[*]] يعني كل الـ columns. والـ [[WHERE]] يفلتر الصفوف. والـ [[ORDER BY … ASC/DESC]] يرتّب. والـ [[LIMIT 3]] ياخذ أول 3.
  - الشروط: [[=]]، و [[<>]] (مو يساوي)، و [[<]]، و [[>=]]، و [[AND]]، و [[OR]]، و [[LIKE 'A%']] (يبدأ بـ A).
- **الإضافة**: [[INSERT INTO students (name, major, gpa) VALUES ('Fatima', 'CE', 3.6);]]
- **التغيير**: [[UPDATE students SET gpa = 2.5 WHERE name = 'Hassan';]]
- **الحذف**: [[DELETE FROM students WHERE id = 6;]]

القيم النصية تكون بين **single quotes**، والأرقام لا. و**لا تنسى الـ WHERE** في الـ UPDATE والـ DELETE: بدونه، كل الصفوف تتغير.

العد والحساب: [[SELECT COUNT(*) FROM students;]]، و [[SELECT AVG(gpa) FROM students WHERE major = 'CS';]].`,
    simpler: R`جدول الـ database مثل شيت Excel يقدر الـ server يدوّر فيه بسرعة.

- الـ **SELECT** يعني "وريني هالـ columns، من ذاك الشيت، بس الصفوف اللي…، مرتبة حسب…".
- الـ **INSERT** يضيف صف جديد تحت.
- الـ **UPDATE** يغيّر خانات في الصفوف اللي تختارها بالـ WHERE.
- الـ **DELETE** يشيل الصفوف اللي تختارها بالـ WHERE.

إنك تنسى الـ WHERE في الـ UPDATE أو الـ DELETE مثل ما تحدد الشيت كله قبل ما تضغط Delete.`,
    deeper: [
      { task: R`عدّل [[$sql]] واضغط Run. جرّب: [[SELECT * FROM products ORDER BY price DESC]]، و [[SELECT name FROM students WHERE name LIKE 'M%']]، و [[SELECT major, COUNT(*) FROM students GROUP BY major]].` },
      R`**تغيير البيانات.** شغّل الأوامر اللي تحت واحد واحد (الـ database يرجع لأصله مع كل Run). وآخر سطر يعرض الجدول بعدها.`,
      { task: R`شيل الـ [[WHERE]] من الـ UPDATE وشغّله. الحين كل الطلاب عندهم نفس الـ GPA: وعشان جذي الـ WHERE مهم.` },
      R`**إنشاء جدول (MySQL).** نادرًا تكتب هذا في الـ PHP، بس لازم تقدر تقراه. (الـ sandbox يشغّل SQLite، وهو يكتب [[AUTO_INCREMENT]] بطريقة ثانية، أما كود الـ MySQL حقك فيبقى مثل اللي تحت.)`,
      null,
      R`**الـ NoSQL (فكرة بس).** مو كل database يستخدم جداول. قواعد البيانات الـ **NoSQL** (مثل MongoDB) تحفظ البيانات كـ **documents** مرنة (شكلها مثل JSON)، أو أزواج key–value، أو graphs. وكل document ممكن تكون خاناته غير، فما في schema ثابت، وتتوزع بسهولة على كذا server. وقواعد البيانات الـ relational أحسن لما تكون البيانات لها شكل ثابت، وفي علاقات بين الجداول، و transactions لازم تصير كلها أو ولا شي.`
    ],
    points: [
      'الجداول فيها columns و rows، والـ primary key (id) يميّز الصف.',
      'SELECT columns FROM table WHERE … ORDER BY … ASC|DESC.',
      'INSERT INTO t (cols) VALUES (…)، و UPDATE t SET col = v WHERE …، و DELETE FROM t WHERE ….',
      'النص بين single quotes، والأرقام بدون.',
      'الـ UPDATE أو الـ DELETE بدون WHERE يغيّر كل الصفوف.',
      'الـ NoSQL: documents / key–value بدون schema ثابت، والـ relational: جداول و SQL و joins و transactions.'
    ],
    exam: [
      R`اكتب الـ SQL داخل string في الـ PHP: [[$sql = "SELECT * FROM books WHERE year > 2000 ORDER BY title";]]`,
      'MCQ: أي أمر يغيّر صفوف موجودة (UPDATE) أو يحذفها (DELETE).',
      'سؤال قصير: الفرق بين الـ relational والـ NoSQL databases (على مستوى الفكرة).'
    ],
    mistakes: [
      'بدون WHERE كل الصفوف تنحذف.',
      'القيم النصية تحتاج single quotes، وإلا CS ينقرا كاسم column.',
      'الـ UPDATE يحتاج SET قبل الـ column.'
    ],
    summary: [
      'الـ SELECT يقرا، والـ INSERT يضيف، والـ UPDATE يغيّر، والـ DELETE يشيل.',
      'الـ WHERE يفلتر، والـ ORDER BY يرتّب.',
      'الـ NoSQL = documents مرنة، بدون جداول ثابتة.'
    ],
    recall: [
      { q: 'أي أمر يغيّر الـ GPA حق طالب موجود؟', why: 'الـ UPDATE … SET … WHERE … يغيّر صفوف موجودة.' },
      { q: R`شنو يسوي [[ORDER BY gpa DESC]]؟`, o: ['أقل GPA أول', 'أعلى GPA أول', 'يشيل المكرر', 'يفلتر الـ GPAs'], why: 'الـ DESC = تنازلي، من الأعلى للأقل.' },
      { q: R`[[DELETE FROM products;]] شنو يصير؟`, o: ['ولا شي، الـ WHERE لازم', 'كل الصفوف تنحذف', 'بس أول صف ينحذف', 'الجدول ينشال'], why: 'بدون WHERE الشرط يكون صحيح لكل صف.' },
      { q: 'أي واحد يوصف NoSQL document database؟', o: ['جداول ثابتة مربوطة بـ keys', 'documents مرنة شكلها مثل JSON، بدون schema ثابت', 'جدول واحد بس', 'ما يقدر يحفظ نص'], why: 'الـ document stores تحفظ records مرنة شكلها مثل JSON.' }
    ],
    challenge: R`عبّ الخمس SQL strings. والكود اللي تحتهم يشغّلهم ويطبع النتايج.
1. [[$q1]]: الـ [[name]] والـ [[gpa]] حق طلاب **CS**، و**أعلى GPA أول**.
2. [[$q2]]: الـ [[name]] حق الطلاب اللي الـ GPA حقهم **أقل من 3**، مرتبين بالاسم.
3. [[$insert]]: أضف [[Fatima]]، والـ major [[CE]]، والـ GPA [[3.6]].
4. [[$update]]: خلّ الـ GPA حق Hassan يصير [[2.5]].
5. [[$delete]]: احذف الطالب اللي اسمه [[Noor]].`
  };

  LESSONS_AR['db-query'] = {
    title: 'الاتصال بـ PDO: الـ query والـ fetch والـ try/catch',
    big: R`الـ **PDO** (PHP Data Objects) هو الطريقة المعتمدة اللي يكلّم فيها الـ PHP الـ database. ونفس كود الـ PDO يشتغل مع MySQL و SQLite و PostgreSQL وغيرهم: بس نص الاتصال اللي يتغير. ونمط الامتحان دايمًا نفسه: اتصل داخل [[try]]، وشغّل query، وسوّ loop بـ [[fetch()]]، واطبع صفوف HTML، وتعامل مع الـ [[PDOException]] في الـ [[catch]].`,
    simple: R`**1. الاتصال**
[[$db = new PDO("mysql:host=localhost;dbname=uob", "root", "");]]
- أول argument هو الـ **DSN**: الـ driver ([[mysql:]])، والـ server ([[host=]])، والـ database ([[dbname=]]).
- وبعدين الـ username والـ password.
- [[$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);]] ← أي error في الـ SQL يرمي [[PDOException]] تقدر تمسكه.
- المواقع الحقيقية تحط هالأسطر في ملف واحد، [[connection.php]]، وتسوي له [[require]] في كل صفحة.

**2. الـ query والـ fetch**
- [[$result = $db->query("SELECT * FROM products");]] يشغّل SELECT ويرجّع **PDOStatement**.
- [[$row = $result->fetch()]] يعطيك الصف **الجاي** كـ array، أو [[false]] لما تخلص الصفوف. فجذي: [[while ($row = $result->fetch()) { … }]]
- اقرا الـ columns بالاسم: [[$row["price"]]]. والـ [[fetch(PDO::FETCH_ASSOC)]] يعطي الأسماء بس (بدون keys رقمية).
- الـ [[fetchAll()]] يعطي كل الصفوف مرة وحدة، و [[count($rows)]] يعدّهم.

**3. امسك الـ errors**
[[try { … } catch (PDOException $e) { echo "Error: " . $e->getMessage(); }]]

وفي الآخر، [[$db = null;]] يسكّر الاتصال (والـ PHP يسكّره بروحه بعد لما يخلص السكربت).`,
    simpler: R`- الـ [[new PDO(...)]] مثل ما تتصل على رقم الـ database (الـ host واسم الـ database) وتعطيهم الـ username والـ password.
- الـ [[query()]] مثل ما تسأل سؤال بالـ SQL.
- الـ [[fetch()]] مثل ما تقرا الجواب **سطر سطر**، ولما تخلص الأسطر يقول [[false]]، والـ [[while]] يوقف.
- الـ [[try / catch]] يعني "إذا فشلت المكالمة (password غلط، أو جدول غلط)، لا تطيح: قول شنو اللي خرب".`,
    deeper: [
      { task: R`غيّر الـ password في الاتصال لـ [["x"]] وشغّل: الـ [[catch]] يعرض الـ error. وبعدين غيّر اسم الجدول لـ [[product]] (بدون s).` },
      R`**تلوين الصفوف حسب شرط** و**النجوم بـ for loop** الثنتين أسطر امتحان معروفة. قرّر الـ class في الـ PHP، وبعدين اطبعه في الـ tag.`,
      { task: R`غيّر الشرط عشان الصفوف اللي سعرها أكثر من 5 ياخذون الـ class [[pricey]] (وأضف CSS rule له).` },
      R`**تعدّ الصفوف.** بعد الـ SELECT، الطريقة الأكيدة هي [[count($result->fetchAll())]]. (الـ [[$result->rowCount()]] يعطي عدد الصفوف حق الـ SELECT في MySQL، بس مو في كل database، أما مع الـ INSERT والـ UPDATE والـ DELETE فهو مضبوط في كل مكان.)`
    ],
    points: [
      'الـ new PDO("mysql:host=…;dbname=…", user, password) يتصل.',
      'الـ ERRMODE_EXCEPTION يخلّي errors الـ SQL ترمي PDOException.',
      'حط كود الـ database داخل try / catch (PDOException $e) واطبع $e->getMessage().',
      'الـ query() يشغّل SELECT، و while ($row = $stmt->fetch()) يقرا صف صف.',
      'الـ $row["column"] يقرا قيمة، والـ FETCH_ASSOC يرجّع الأسماء بس.',
      'الـ require("connection.php") يخلّي كل الصفحات تستخدم ملف اتصال واحد.'
    ],
    exam: [
      R`سؤال كامل: [[require('connection.php')]]، و [[try/catch (PDOException)]]، و query، و loop بـ [[fetch()]] يطبع جدول، ويلوّن صفوف أو خانات حسب شرط، ونجوم بـ [[for]] loop.`,
      R`MCQ: "الـ PDO يدعم databases كثيرة" (صح)، وشنو فيه الـ DSN.`
    ],
    mistakes: [
      'أول argument هو DSN string واحد فيه الـ driver والـ host واسم الـ database.',
      'لازم تنادي fetch() في كل لفة عشان تنتقل للصف الجاي.',
      'الـ getMessage هي method، فتحتاج (). والجواب المتوقع إنك تمسك PDOException.'
    ],
    summary: [
      'اتصل ← query ← while fetch ← اطبع.',
      'try / catch (PDOException $e).',
      'الـ classes والنجوم تتقرر في الـ PHP.'
    ],
    recall: [
      { q: R`شنو يرجّع [[$stmt->fetch()]] لما تخلص الصفوف؟`, o: ['null', 'false', 'array فاضي', '0'], why: 'الـ false يوقّف الـ while loop.' },
      { q: 'أي attribute يخلّي errors الـ SQL ترمي exceptions؟', why: 'الـ ERRMODE_EXCEPTION.' },
      { q: R`في [["mysql:host=localhost;dbname=shop"]]، شنو [[shop]]؟`, o: ['الجدول', 'الـ database', 'الـ user', 'الـ password'], why: 'الـ dbname = اسم الـ database.' },
      { q: 'ليش تستخدم PDO بدال extension حق MySQL بس؟', o: ['هو الطريقة الوحيدة اللي تشغّل SELECT', 'نفس الكود يشتغل مع databases كثيرة', 'ما يحتاج SQL', 'أسرع من الـ SQL'], why: 'الـ PDO واجهة وحدة فوق drivers كثيرة.' }
    ],
    challenge: R`اطبع كل المنتجات في [[<table id="products">]]، **مرتبة بالاسم**، صف لكل منتج فيه 4 خانات: الاسم، والسعر (3 خانات عشرية)، والـ stock، والنجوم ([["★"]] مكررة بعدد الـ [[rating]]، وتبنيها بـ [[for]] loop).
- الصفوف اللي الـ stock فيها **0** تاخذ [[class="out"]].
- **خانة** الـ stock تاخذ [[class="low"]] لما يكون الـ stock أقل من 10.
- استخدم [[require('connection.php')]] و [[try / catch (PDOException $e)]] يطبع رسالة الـ error.`
  };

  LESSONS_AR['db-exec'] = {
    title: 'تغيّر البيانات بالـ exec() وتعدّ الصفوف المتأثرة',
    big: R`الـ [[query()]] حق الأسئلة اللي ترجّع صفوف (SELECT). أما الأوامر اللي **تغيّر** البيانات (INSERT و UPDATE و DELETE) فالـ PDO عنده [[exec()]]، اللي يرجّع **كم صف تأثر**. وإنك تطبع هالرقم ("2 rows deleted") سطر امتحان معروف.`,
    simple: R`- [[$n = $db->exec("DELETE FROM products WHERE stock = 0");]] ← [[$n]] هو عدد الصفوف اللي انحذفت (0 إذا ولا صف طابق).
- الـ [[exec]] يشتغل مع الـ INSERT والـ UPDATE والـ DELETE. واستخدم [[query]] للـ SELECT.
- بعد الـ INSERT، الـ [[$db->lastInsertId()]] يعطيك الـ id حق الصف الجديد.
- الـ [[exec]] يرجّع [[false]] لما يفشل إذا الـ errors ما ترمي، ومع [[ERRMODE_EXCEPTION]] الفشل يرمي exception بداله.

**مدخلات المستخدم والـ exec.** الـ exec يشغّل الـ string بالضبط مثل ما هو مكتوب. وإنك تلزق مدخلات المستخدم الخام فيه خطير (SQL injection، الفصل 16). هني نستخدم بس قيم ثابتة أو رقم نجبره بـ [[(int)]]. وأي شي يكتبه المستخدم، استخدم له الـ **prepared statements** اللي في الدرس الجاي.`,
    simpler: R`الـ [[exec]] مثل ما تعطي الـ database أمر ("احذف هذول"، "زيد هذول")، والـ database يرد عليك **كم صف لمس**. والرد 0 مو error: بس معناه إن ولا صف طابق الـ WHERE حقك.`,
    deeper: [
      { task: R`غيّر الـ UPDATE لـ [[stock < 20]] وشوف العدد يتغير. وبعدين احذف منتج مو موجود ([[id = 99]]).` },
      R`**Form يغيّر البيانات.** الصفحة تتعامل مع الـ POST أول (تغيّر الـ database)، وبعدين تعرض القائمة المحدّثة. أرسل الـ form اللي داخل النتيجة مرتين: الـ database يحتفظ بالتغيير بين الـ requests حقتك لين تضغط Run أو "زائر جديد".`
    ],
    points: [
      'الـ exec(sql) يشغّل INSERT / UPDATE / DELETE ويرجّع عدد الصفوف المتأثرة.',
      'الـ query(sql) حق الـ SELECT (يرجّع صفوف).',
      'الـ lastInsertId() يرجّع الـ id حق الصف اللي انضاف توه.',
      '0 صفوف متأثرة مو error: ولا شي طابق الـ WHERE.',
      'لا تلزق مدخلات المستخدم الخام في الـ exec أبد، استخدم (int) للأرقام أو الـ prepared statements.'
    ],
    exam: [
      R`اطبع العدد: [[$count = $db->exec("DELETE …"); echo "$count rows deleted";]]`,
      'MCQ: أي method في الـ PDO ترجّع عدد الصفوف المتأثرة بالـ DELETE.'
    ],
    mistakes: [
      'الـ exec يرجّع رقم، مو صفوف. استخدم query للـ SELECT.',
      'المدخلات الخام في الـ SQL تسمح بالـ injection. والـ (int) يجبرها تكون رقم عادي، والـ prepared statements أحسن بعد.'
    ],
    summary: [
      'الـ exec ← عدد الصفوف المتأثرة.',
      'الـ query ← صفوف.',
      'الـ lastInsertId بعد الـ INSERT.'
    ],
    recall: [
      { q: R`شنو يرجّع [[$db->exec("UPDATE products SET price = 1 WHERE id = 50")]] إذا ما في منتج الـ id حقه 50؟`, o: ['false', '0', 'null', 'exception'], why: 'ولا صف طابق، فـ 0 صفوف تأثرت.' },
      { q: 'أي method المفروض تشغّل SELECT؟', why: 'الـ query ترجّع statement تقدر تسوي منه fetch للصفوف.' },
      { q: R`شلون تجيب الـ id حق الصف اللي أضفته توه؟`, why: 'الـ lastInsertId().' }
    ],
    challenge: R`صفحة stock صغيرة. تعامل مع الـ POST **أول**، وبعدين اعرض المنتجات.
- إذا [[$_POST["action"]]] كان [["restock"]]: زيد 10 على الـ stock حق كل منتج الـ stock حقه أقل من 10 باستخدام [[exec]]، واطبع [[<p id="msg">N products restocked</p>]].
- إذا كان [["delete"]]: احذف المنتج اللي الـ id حقه [[$_POST["id"]]] (اجبره يكون رقم بـ [[(int)]])، واطبع [[<p id="msg">N product(s) deleted</p>]]، مثل [["1 product(s) deleted"]] أو [["0 product(s) deleted"]].
- ودايمًا اطبع [[<ul id="list">]] فيها [[<li>]] لكل منتج: [["Name (stock)"]]، مرتبين بالـ id.`
  };

  LESSONS_AR['db-prepared'] = {
    title: 'الـ Prepared statements: الـ prepare والـ bindParam والـ execute',
    big: R`أي وقت تكون قيمة في الـ SQL حقك جاية من المستخدم (إيميل تسجيل دخول، أو كلمة بحث، أو id)، استخدم **prepared statement**. ترسل الـ SQL أول ومعاه **placeholders**، وبعدين القيم بروحها. والـ database أبد ما يخلط القيم مع كود الـ SQL، فمدخل مثل [[' OR '1'='1]] يتعامل معاه كنص عادي. وهذا الدفاع المعتمد ضد الـ **SQL injection**، وفاينل 2024-25 طلب هالكود بالضبط.`,
    simple: R`**ثلاث خطوات**
1. [[$stmt = $db->prepare("SELECT * FROM users WHERE email = :email");]]: SQL فيه **named placeholder** ([[:email]]). وبدون quotes حوله.
2. عطه القيمة، بوحدة من طريقتين:
   - [[$stmt->bindParam(':email', $_POST['email']);]] وبعدين [[$stmt->execute();]]
   - أو مرة وحدة: [[$stmt->execute([':email' => $_POST['email']]);]]
3. اقرا النتيجة: [[$user = $stmt->fetch();]] (صف واحد، أو [[false]] إذا محد طابق)، أو سوّ loop بـ [[while ($row = $stmt->fetch())]].

**الـ bindParam ضد الـ execute([...])**
- الـ [[bindParam]] يربط **variable**، وقيمته تنقرا لما يشتغل [[execute()]]. مفيد في الـ loops: تربط مرة، وتغيّر الـ variable، وتسوي execute مرة ثانية.
- الـ [[bindValue]] ينسخ القيمة في ذيج اللحظة.
- الـ [[execute([...])]] الأقصر، وكل قيمة تنرسل كنص.

والـ placeholders ممكن تكون بعد [[?]] والقيم بالترتيب: [[prepare("… WHERE id = ?")]] وبعدين [[execute([5])]].

والـ prepared statements تشتغل مع الـ INSERT والـ UPDATE والـ DELETE بعد، وساعتها [[$stmt->rowCount()]] يعطيك الصفوف المتأثرة.`,
    simpler: R`الـ prepared statement مثل **استمارة فيها مربعات فاضية**.

- الـ [[prepare]] يطبع الاستمارة: "دوّر على المستخدم اللي إيميله [ :email ]".
- الـ [[bindParam]] / [[execute]] يكتب نص المستخدم **داخل المربع**.
- وأي شي يكتبه المستخدم يبقى داخل المربع، حتى لو شكله SQL. وأبد ما يقدر يغيّر الاستمارة نفسها.`,
    deeper: [
      { task: R`أرسل الـ form اللي في النتيجة بـ [[ali@uob.edu.bh]]، وبإيميل مو موجود، وبـ [[x' OR '1'='1]]. الأخير ما يلقى أحد: هو بس نص.` },
      R`**كذا قيمة و loop.** الـ [[execute([...])]] مع array، ونفس الـ prepared statement ينعاد استخدامه لصفوف كثيرة.`,
      { task: R`أضف طالب رابع في [[$new]] وشغّل مرة ثانية.` }
    ],
    points: [
      'prepare(SQL فيه placeholders :name) ← اربط القيم ← execute() ← fetch().',
      'الـ placeholders بدون quotes: WHERE email = :email.',
      'الـ bindParam يربط variable (ينقرا وقت الـ execute)، و execute([":x" => v]) يعطي القيم على طول.',
      'الـ fetch() يرجّع صف واحد أو false: اختبره بـ if ($user).',
      'الـ prepared statements توقف الـ SQL injection لأن القيم أبد ما تصير كود SQL.'
    ],
    exam: [
      R`على طريقة 2024-25: [[prepare("SELECT … WHERE email = :email")]]، و [[bindParam(':email', $_POST['email'])]]، و [[execute()]]، و [[$user = $stmt->fetch()]]، وبعدين [[<div class="welcome">Welcome <?= $user['username'] ?></div>]].`,
      'سؤال قصير: شلون الـ prepared statements تمنع الـ SQL injection؟',
      R`اعرف الطريقتين: [[bindParam]] و [[execute([...])]].`
    ],
    mistakes: [
      'إذا كان بين quotes، الـ :email يصير بس نص ":email"، مو placeholder.',
      'الـ prepare بس يجهّز. ولا شي يشتغل لين الـ execute().',
      'لزق المدخلات في الـ SQL هو بالضبط اللي يستغله الـ SQL injection.'
    ],
    summary: [
      'prepare ← bindParam / execute([…]) ← fetch.',
      'الـ :placeholders بدون quotes.',
      'الطريقة الآمنة عشان تستخدم مدخلات المستخدم في الـ SQL.'
    ],
    recall: [
      { q: 'شنو الترتيب الصحيح؟', why: 'جهّز الـ SQL، وشغّله مع القيم، وبعدين اقرا الصفوف.' },
      { q: R`شنو يرجّع [[$stmt->fetch()]] لما ما في مستخدم بهالإيميل؟`, o: ['string فاضي', 'false', 'null', 'exception'], why: 'ما في صف ← false، فـ if ($user) يكون false.' },
      { q: 'ليش الـ prepared statements توقف الـ SQL injection؟', o: ['تشفّر الـ SQL', 'القيم تنرسل بروحها وأبد ما تشتغل كـ SQL', 'تشيل الـ quotes من المدخلات', 'تسمح بالأرقام بس'], why: 'الـ SQL يكون ثابت قبل ما توصل القيم.' },
      { q: R`أي سطر يعطي القيمة على طول، بدون bindParam؟`, why: 'الـ execute ياخذ array فيه قيم الـ placeholders.' }
    ],
    challenge: R`اكتب فحص تسجيل الدخول (على طريقة 2024-25). لما ينرسل الـ form:
1. اتصل بـ [[new PDO("mysql:host=localhost;dbname=uob", "root", "")]] داخل [[try]].
2. سوّ prepare لـ [[SELECT * FROM users WHERE email = :email]]، واربط [[$_POST['email']]] بـ [[bindParam]]، وسوّ execute، وجيب الصف في [[$user]] بالـ fetch.
3. إذا لقيت مستخدم اطبع [[<div class="welcome">Welcome USERNAME</div>]]، وإلا [[<div class="error">No account for that email</div>]].
4. وفي [[catch (PDOException $e)]]، اطبع الرسالة.`
  };

  LESSONS_AR['db-transactions'] = {
    title: 'الـ Transactions: الـ beginTransaction والـ commit والـ rollBack',
    big: R`في شغلات تحتاج **كذا** أمر SQL ولازم **كلهم** ينجحون أو **كلهم** يتلغون. ومثال الكتاب تحويل فلوس: تاخذ 100 من Ali، وتعطي Sara 100. ولو الـ server طاح بين الـ updateين، الفلوس تختفي. والـ **transaction** يجمع الأوامر عشان الـ database يطبقهم مع بعض، أو ولا واحد منهم.`,
    simple: R`- [[$db->beginTransaction();]] ← ابدأ. ومن الحين، التغييرات مو نهائية.
- شغّل الأوامر حقتك ([[exec]]، أو [[prepare]] + [[execute]]، وفي العادة داخل loop).
- [[$db->commit();]] ← كل شي اشتغل: خلّ كل التغييرات نهائية.
- [[$db->rollBack();]] ← شي فشل: الغِ كل تغيير من بعد الـ beginTransaction.

الشكل المعتاد:
[[try { $db->beginTransaction(); …statements…; $db->commit(); } catch (Exception $e) { $db->rollBack(); echo "Failed: " . $e->getMessage(); }]]

وعشان تلغي بسبب **قاعدة شغل** (الفلوس ما تكفي، أو الغرض خلص)، سوّ [[throw new Exception("…")]] داخل الـ try: يقفز للـ catch، وهو يسوي rollBack.

والوعود الأربعة حق الـ transaction اسمها **ACID**: Atomic (كله أو ولا شي)، و Consistent، و Isolated، و Durable.`,
    simpler: R`الـ transaction مثل عربانة التسوّق.

- الـ [[beginTransaction]]: تاخذ عربانة.
- كل أمر يحط غرض في العربانة، وللحين ما دفعت.
- الـ [[commit]]: تدفع، وكل اللي في العربانة يصير لك.
- الـ [[rollBack]]: تخلّي العربانة، وكل غرض يرجع للرف، كأنك ما جيت أصلًا.`,
    deeper: [
      { task: R`غيّر [[$amount]] لـ 800 وشغّل: الفحص يرمي exception، والـ [[rollBack]] يلغي أول UPDATE بعد. والرصيدين يبقون مثل ما كانوا.` },
      R`**إضافات كثيرة في transaction واحد.** الامتحانات السابقة تسوي loop على array (مثلًا الأغراض المحفوظة في session) وتضيف كل واحد داخل transaction، عشان لو صار فشل في النص ما يبقى شي محفوظ بالنص.`,
      null
    ],
    points: [
      'الـ transaction يخلّي كذا أمر كلهم أو ولا شي.',
      'beginTransaction() ← الأوامر ← commit().',
      'مع أي error: الـ rollBack() في الـ catch يلغي كل شي من بعد الـ beginTransaction.',
      'سوّ throw new Exception(...) داخل الـ try عشان تلغي بسبب قاعدة شغل.',
      'الـ ACID: Atomic و Consistent و Isolated و Durable.'
    ],
    exam: [
      R`كود: [[beginTransaction]]، و [[prepare]]، و [[execute([':x' => …])]] داخل loop، و [[commit]]، و [[rollBack]] في الـ [[catch]].`,
      'سؤال قصير: ليش نستخدم الـ transactions؟ اشرح بمثال تحويل الفلوس.'
    ],
    mistakes: [
      'بدون commit التغييرات تنرمى لما يخلص السكربت.',
      'بعد الفشل تلغي (rollBack)، ما تحفظ.',
      'أسماء الـ methods في الـ PHP مو حساسة لحجم الحروف، بس الاسم الموثّق rollBack (بـ B كبيرة)، فاستخدمه في الامتحان.'
    ],
    summary: [
      'begin ← الأوامر ← commit.',
      'catch ← rollBack.',
      'كله أو ولا شي (ACID).'
    ],
    recall: [
      { q: 'أي استدعاء يخلّي تغييرات الـ transaction نهائية؟', why: 'الـ commit يحفظ كل شي من بعد الـ beginTransaction.' },
      { q: 'ثاني UPDATE في التحويل فشل. شنو المفروض يسوي الـ catch؟', o: ['commit()', 'rollBack()', 'ولا شي', 'يشغّل أول UPDATE مرة ثانية'], why: 'الـ rollBack يلغي أول UPDATE بعد.' },
      { q: 'حرف الـ A في ACID معناه…', why: 'Atomic: كله أو ولا شي.' }
    ],
    challenge: R`اكتب كود التحويل. لما ينرسل الـ form ومعاه [[from]] و [[to]] و [[amount]]:
1. ابدأ transaction.
2. انقص المبلغ من الحساب [[from]] وزيده على الحساب [[to]]، باستخدام **prepared statements** فيها named placeholders.
3. إذا رصيد المرسل صار **أقل من 0**، سوّ [[throw new Exception("not enough money")]].
4. سوّ commit واطبع [[<p id="msg">Transfer done</p>]]، وفي الـ [[catch]] سوّ rollBack واطبع [[<p id="msg">Transfer failed: MESSAGE</p>]].
والـ starter يطبع الأرصدة في الآخر.`
  };

  LESSONS_AR['db-grid'] = {
    title: 'تعرض النتايج كـ grid (عدد N في كل صف)',
    big: R`صفحات المنتجات في العادة تعرض الأغراض كبطاقات، **ثنتين أو ثلاث في كل صف**، مو واحد في كل سطر. ومع جدول HTML هذا يحتاج حيلة وحدة: **عدّاد** يسكّر الصف ويفتح واحد جديد كل N عناصر. وطلع في كذا فاينل سابق.`,
    simple: R`الفكرة، حق 3 في كل صف:
1. قبل الـ loop: [[echo "<table><tr>";]] و [[$count = 0;]]
2. داخل الـ loop، قبل ما تطبع العنصر: إذا [[$count > 0]] و [[$count % 3 == 0]]، اطبع [["</tr><tr>"]] (سكّر هالصف، وابدأ اللي بعده).
3. اطبع العنصر كـ [[<td>]] واحد، وبعدين [[$count++]].
4. بعد الـ loop: [[echo "</tr></table>";]]

الـ [[%]] هو الباقي: [[$count % 3 == 0]] يكون true عند 0 و 3 و 6 و 9… فيبدأ صف جديد بعد كل 3 عناصر. وغيّر الـ 3 لأي N.

ونفس العدّاد يشتغل مع صفوف [[<div>]]. (وبالـ CSS تقدر بعد تستخدم grid layout، بس الامتحان يطلب طريقة الجدول.)`,
    simpler: R`مثل ما تحط كاسات على رف ياخذ ثلاث.

تعدّ الكاسات وأنت تحطها. وكل ما توصل 3 و 6 و 9… يكون الرف تعبّى، فتبدأ رف جديد ([["</tr><tr>"]]) قبل ما تحط الكاس الجاي.`,
    deeper: [
      { task: R`غيّر الـ 3 لـ 2، وبعدين لـ 4. وبعدين أضف [[WHERE category = 'Electronics']] للـ query.` },
      R`**طريقة ثانية تكتب فيها نفس الاختبار**: اطبع [["<tr>"]] لما [[$count % 3 == 0]]، و [["</tr>"]] لما [[$count % 3 == 2]]. والثنتين مقبولين، والمهم إن كل صف فيه العدد الصحيح من الخانات وكل [[<tr>]] متسكّر.`
    ],
    points: [
      'استخدم عدّاد يبدأ من 0 مع الـ operator حق % (الباقي).',
      'لما $count > 0 و $count % N == 0، سكّر الصف وافتح واحد جديد.',
      'افتح <table><tr> قبل الـ loop، وسكّر </tr></table> بعده.',
      'آخر صف ممكن يكون فيه أقل من N خانات، وهذا عادي.'
    ],
    exam: [
      R`الـ Grid view: اعرض نتايج الـ query ثنتين أو ثلاث في كل صف بعدّاد و [["</tr><tr>"]].`
    ],
    mistakes: [
      'عند العدد 0 الاختبار أصلًا true، وهذا يسوي أول صف فاضي.',
      'بدون $count++ العدّاد أبد ما يتحرك.'
    ],
    summary: [
      'عدّاد + % N.',
      '</tr><tr> بين الصفوف.',
      'افتح قبل الـ loop، وسكّر بعده.'
    ],
    recall: [
      { q: R`مع [[if ($count > 0 && $count % 2 == 0) echo "</tr><tr>";]] و 5 عناصر، كم صف؟`, why: 'صفوف فيها 2 و 2 و 1.' },
      { q: R`كم [[7 % 3]]؟`, why: '7 = 2 × 3 + 1، فالباقي 1.' }
    ],
    challenge: R`اعرض كل المنتجات، **مرتبة بالسعر (الأرخص أول)**، في [[<table id="grid">]] و**منتجين في كل صف**.
كل [[<td>]] فيه الاسم داخل [[<b>]]، وفي السطر اللي بعده السعر بـ 3 خانات عشرية وبعده [[" BD"]]. استخدم [[query]]، و loop [[while ($p = $result->fetch())]]، وعدّاد.`
  };
})();

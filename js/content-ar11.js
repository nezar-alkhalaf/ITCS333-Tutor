/* Arabic versions of module 13 (Bonus: Node.js, React, Laravel). Aligned item by item with js/content11.js. */
(() => {
  const R = String.raw;
  const NOTE = R`**إضافي (Bonus): ممكن ما يجي في الامتحان.** هالموضوع موجود في الجدول الأسبوعي بس مو موجود في قائمة الفصول اللي في توصيف المادة. تعلّم الأفكار الأساسية، ولا تضيّع وقت أسبوع الامتحان هني قبل الفصول الأساسية.`;

  LESSONS_AR['bonus-node'] = {
    title: 'إضافي (Bonus): الـ Node.js والـ Express (الـ JavaScript على الـ server)',
    big: R`${NOTE}

لين الحين الـ JavaScript كان يشتغل في الـ browser والـ PHP على الـ server. والـ **Node.js** يشغّل الـ JavaScript **على الـ server** بعد. يستخدم محرك V8 حق Chrome مع modules للملفات والشبكات وغيرها، وهو أساس back ends وأدوات حديثة واجد (منها npm، مدير الـ packages).`,
    simple: R`- الـ **Node.js** = JavaScript runtime برّا الـ browser. ما فيه [[document]] ولا [[window]]، وبدالهم modules مثل [[fs]] (الملفات) و [[http]] (الـ servers).
- **Event-driven و non-blocking**: process واحد حق Node يشغّل **event loop**. الشغل البطيء (قراءة ملف، أو query على database) يبدأ ويتعالج بعدين بـ callback أو Promise، فـ process واحد يقدر يخدم requests كثيرة بنفس الوقت. قارنه بالـ PHP، اللي فيه كل request يشغّل السكربت حقك من فوق في worker بروحه.
- الـ **npm** يركّب الـ packages اللي مكتوبة في [[package.json]]: [[npm install express]].
- الـ **Express** framework صغير للـ web: تسجّل **routes** (method + path) وترسل responses.
- تشغّل البرنامج بـ [[node server.js]]، والـ server يبقى شغّال ويسمع على port.`,
    simpler: R`الـ PHP مثل **مطعم كل طلب فيه طبّاخ بروحه** يقرا الوصفة من فوق ويمشي لما يخلص الصحن.

والـ Node.js مثل **ويتر واحد سريع واجد** ياخذ الطلب، ويعطيه المطبخ، وياخذ الطلب اللي بعده والأول للحين ينطبخ، ويقدّم كل صحن أول ما يجهز. ونفس اللغة اللي تعرفها، الـ JavaScript، بس الحين على الـ server.`,
    deeper: [
      R`**API صغير بالـ Express.** نفس الـ JSON API اللي استخدمته دروس الـ async ممكن ينكتب جذي:`,
      null,
      R`**الـ PHP ضد الـ Node.js، بالأفكار**
- اللغة: PHP ضد JavaScript (نفس اللغة في الجهتين مع Node).
- النموذج: سكربت لكل request (الـ PHP) ضد process واحد يشتغل على طول مع event loop (الـ Node).
- الـ Routing: في الـ PHP العادي مسار الملف يحدد الصفحة ([[/login.php]])، وفي الـ Express تعرّف الـ routes في الكود.
- بيانات الـ request: [[$_GET]] / [[$_POST]] ضد [[req.query]] / [[req.body]]، وparameters الـ URL بـ [[req.params]].
- الـ Response: [[echo]] و [[header()]] ضد [[res.send()]] و [[res.json()]] و [[res.status()]].`
    ],
    points: [
      'الـ Node.js يشغّل الـ JavaScript على الـ server (محرك V8)، وبدون DOM.',
      'Event loop + non-blocking I/O: process واحد يخدم requests كثيرة.',
      'الـ npm يركّب الـ packages اللي في package.json.',
      'routes الـ Express: app.get / app.post(path, (req, res) => …).',
      'الـ req.params و req.query و req.body، والـ res.json و res.status.'
    ],
    exam: [
      'إضافي: ممكن ما يجي في الامتحان. وإذا انسأل، توقّع MCQ عن المفهوم: شنو الـ Node.js، أو شنو معنى non-blocking.'
    ],
    mistakes: [
      'الـ Node.js ما فيه DOM. الـ document والـ window موجودين في الـ browser بس.'
    ],
    summary: [
      'JavaScript على الـ server.',
      'Event loop، و non-blocking.',
      'الـ Express: routes ← res.json.'
    ],
    recall: [
      { q: 'شنو الـ Node.js؟', o: ['browser', 'JavaScript runtime يشتغل برّا الـ browser', 'CSS framework', 'database'], why: 'يشغّل الـ JavaScript على الـ servers والكمبيوترات، ومبني على V8.' },
      { q: 'شنو معنى "non-blocking" في الـ Node.js؟', o: ['ما فيه errors أبد', 'الشغلات البطيئة تبدأ وتخلص بعدين، فينخدم requests ثانية في نفس الوقت', 'يوقّف كل المستخدمين الثانيين', 'ما يقدر يقرا ملفات'], why: 'الـ event loop يكمّل يخدم والـ I/O للحين شغّال.' },
      { q: R`في الـ Express، وين قيمة [[:id]] في [[/api/students/:id]]؟`, why: 'parameters الـ route تكون في req.params.' }
    ]
  };

  LESSONS_AR['bonus-react'] = {
    title: 'إضافي (Bonus): الـ React (الـ components والـ props والـ state)',
    big: R`${NOTE}

في دروس الـ DOM كنت تغيّر الصفحة بيدك: تلقى العنصر، وتسوي صفوف، وتحدّث النص. والـ **React** (library حق JavaScript) يخلّيك **توصف** شكل الصفحة حسب البيانات الحالية، وهو يحدّث الـ DOM عنك كل ما تتغير البيانات.`,
    simple: R`- الـ **component** هو function ترجّع اللي ينعرض، مكتوب بالـ **JSX** (syntax شكله مثل الـ HTML داخل الـ JavaScript): [[function Hello() { return <h1>Hello</h1>; }]]
- الـ **Props** مدخلات تنعطى للـ component مثل الـ attributes: [[<Greeting name="Sara" />]] ← [[props.name]].
- الـ **State** بيانات تابعة للـ component وممكن تتغير: [[const [count, setCount] = useState(0);]]. ولما تنادي [[setCount(…)]] الـ React **يعيد رسم** الـ component.
- الـ React يقارن الناتج الجديد بالقديم (الـ **virtual DOM**) ويغيّر بس الأجزاء اللي اختلفت في الـ DOM الحقيقي.
- القوائم: [[items.map(i => <li key={i.id}>{i.name}</li>)]]، وكل عنصر يحتاج [[key]] فريد.
- الـ Events: [[<button onClick={() => setCount(count + 1)}>]] (camelCase، و function مو string).
- تحميل البيانات: [[useEffect(() => { fetch(…) … }, [])]] يشتغل بعد أول رسم.
- الـ JSX يسوي escape للقيم اللي داخل [[{ }]] بشكل افتراضي، وهذا يحمي من الـ XSS.`,
    simpler: R`مع كود الـ DOM العادي أنت **صبّاغ** يعيد صبغ أجزاء من الجدار بيده كل ما يتغير شي.

ومع الـ React تكتب **وصفة** للجدار ("مع هالبيانات، الجدار شكله جذي"). ولما تتغير البيانات، الـ React يقارن الصورة الجديدة بالقديمة ويعيد صبغ بس الطابوق اللي تغيّر.`,
    deeper: [
      R`**عدّاد وقائمة.** اقراه جنب نسخة الـ DOM اللي تعرفها: ما في getElementById ولا appendChild.`,
      null,
      R`**ليش هو مشهور**: الواجهة تنقسم لـ components صغيرة ينعاد استخدامها، والصفحة دايمًا تطابق البيانات (ما في تحديثات تنساها)، ونفس الأفكار تشتغل لتطبيقات الجوال (React Native). والثمن: يحتاج build step (الـ JSX لازم يتحوّل)، وفيه أشياء تتعلمها أكثر من كود الـ DOM العادي.`
    ],
    points: [
      'الـ React يبني الواجهات من components (functions ترجّع JSX).',
      'الـ Props: مدخلات من الأب، والـ state: بيانات يملكها الـ component (useState).',
      'تغيير الـ state يعيد الرسم، والـ React يحدّث بس اللي تغيّر (virtual DOM).',
      'عناصر القائمة تحتاج key فريد، والـ events بـ camelCase (onClick).',
      'الـ useEffect يشغّل side effects مثل الـ fetch بعد الرسم.'
    ],
    exam: [
      'إضافي: ممكن ما يجي في الامتحان. وإذا انسأل، توقّع مفاهيم: الـ component، والـ props ضد الـ state، والـ virtual DOM.'
    ],
    mistakes: [
      'بس تغييرات الـ state عن طريق الـ setter تخلّي الـ React يعيد الرسم.',
      'في الـ JSX، الـ events بـ camelCase وتاخذ function، مو string.'
    ],
    summary: [
      'Components + JSX.',
      'الـ Props تدخل، والـ state داخل.',
      'setState ← إعادة رسم ← أقل تغييرات في الـ DOM.'
    ],
    recall: [
      { q: 'شنو الفرق بين الـ props والـ state؟', o: ['ما في فرق', 'الـ Props تجي من الأب، والـ state يملكه الـ component ويغيّره', 'الـ State يجي من الـ server، والـ props من الـ CSS', 'الـ Props تتغير، والـ state لا'], why: 'الـ component يقرا الـ props ويدير الـ state حقه.' },
      { q: R`شنو يصير بعد [[setCount(5)]]؟`, o: ['ولا شي لين الـ reload', 'الـ React يعيد رسم الـ component بالقيمة الجديدة', 'الصفحة تسوي reload', 'error'], why: 'تحديث الـ state يسبب إعادة رسم.' },
      { q: 'ليش كل عنصر في القائمة يحتاج key؟', o: ['حق الـ CSS', 'عشان الـ React يميّز العناصر لما تتغير القائمة', 'حق الـ SEO', 'ما يحتاج'], why: 'الـ keys تخلّي الـ React يطابق العناصر القديمة والجديدة بكفاءة.' }
    ]
  };

  LESSONS_AR['bonus-laravel'] = {
    title: 'إضافي (Bonus): الـ Laravel (framework حق PHP، و MVC)',
    big: R`${NOTE}

كل شي في فصول الـ PHP (الـ forms، والـ PDO، والـ sessions، والـ security) تقدر تسويه بيدك. والـ **framework** يعطيك هيكل جاهز وإعدادات افتراضية آمنة لكل هذا. والـ **Laravel** أشهر framework حق PHP، ومبني على نمط الـ **MVC**.`,
    simple: R`الـ **MVC** يقسم التطبيق لثلاث أجزاء:
- الـ **Model**: البيانات وقواعدها (class لكل جدول). والـ models حق الـ Laravel اسمها **Eloquent**: [[Student::where('major', 'CS')->get()]] بدال ما تكتب SQL.
- الـ **View**: قوالب الـ HTML. والـ **Blade** حق الـ Laravel: [[{{ $student->name }}]] يطبع القيمة **وعليها escape** (يحمي من الـ XSS).
- الـ **Controller**: يستلم الـ request، ويستخدم الـ models، ويرجّع view أو JSON.

الـ **Routes** (في [[routes/web.php]]) تربط الـ URLs بالـ controllers: [[Route::get('/students', [StudentController::class, 'index']);]]

أجزاء ثانية بتسمع عنها:
- الـ **Artisan**: أداة الـ command line ([[php artisan make:controller]]، و [[php artisan migrate]]).
- الـ **Migrations**: تعريفات الجداول مكتوبة بالـ PHP ولها نسخ مع الكود.
- أمان جاهز: الـ query bindings (ما في SQL injection)، والـ output في Blade عليه escape، و tokens حق **CSRF** في الـ forms ([[@csrf]])، و password hashing، و sessions.`,
    simpler: R`الـ PHP العادي مثل **إنك تبني بيت بالطابوق الخام**: تبني كل جدار وتمدّ كل سلك بنفسك.

والـ Laravel مثل **بيت جاهز تركّبه**: الغرف (الـ Models والـ Views والـ Controllers) محددة من قبل، والسباكة (الـ routing، والـ database، والـ sessions) والأقفال (الـ CSRF، والـ escaping، والـ password hashing) مركّبة، وأنت تأثّث الغرف بالميزات حقتك.`,
    deeper: [
      R`**ميزة وحدة عبر الـ MVC**: اعرض طلاب الـ CS.`,
      null,
      R`**الـ PHP العادي ضد الـ Laravel**: نفس الأفكار اللي تعلمتها (الـ routes = أي كود يشتغل لأي URL، والـ prepared statements، والـ escaping، والـ sessions، والـ password_hash) للحين موجودة، بس ملفوفة في قواعد ثابتة. وإنك تعرف نسخة الـ PHP العادي هو اللي يخلّيك تفهم شنو يسوي لك الـ framework.`
    ],
    points: [
      'الـ Laravel هو framework حق PHP مبني على الـ MVC.',
      'الـ Model (Eloquent) = البيانات، والـ View (Blade) = الـ HTML، والـ Controller = منطق الـ request.',
      'الـ Routes تربط الـ URLs بـ methods في الـ controllers.',
      'الـ {{ }} في Blade يسوي escape للـ output، والـ @csrf يضيف CSRF token، والـ Eloquent يستخدم bindings.',
      'الـ Artisan CLI والـ migrations يديرون الكود وهيكل الـ database.'
    ],
    exam: [
      'إضافي: ممكن ما يجي في الامتحان. وإذا انسأل، توقّع مفاهيم: شنو معنى الـ MVC، أو شنو يعطيك الـ framework.'
    ],
    mistakes: [
      'الشكل {!! !!} يتخطى الـ escaping ويرجّع الـ XSS.'
    ],
    summary: [
      'الـ Framework = هيكل + إعدادات افتراضية آمنة.',
      'الـ MVC: Model و View و Controller.',
      'الـ Routes، والـ Eloquent، والـ Blade، والـ Artisan.'
    ],
    recall: [
      { q: 'في الـ MVC، أي جزء فيه قوالب الـ HTML؟', why: 'الـ Views (الـ Blade في الـ Laravel) تطلّع الـ HTML.' },
      { q: R`شنو يسوي [[{{ $name }}]] حق Blade بالـ HTML اللي داخل $name؟`, o: ['يشغّله', 'يسوي له escape', 'يحذفه', 'يحفظه'], why: 'الأقواس المعقوفة الدبل تسوي escape للـ output، مثل htmlspecialchars.' },
      { q: 'أي جزء في تطبيق MVC يستلم الـ request ويقرر شنو يرجّع؟', why: 'الـ controller ينسّق بين الـ models والـ views.' }
    ]
  };
})();

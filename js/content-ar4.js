/* Arabic versions of module 08 (APIs & async JavaScript). Aligned item by item with js/content4.js. */
(() => {
  const API = `**الـ API حق التدريب.** هالـ sandbox ما فيه إنترنت، فالدروس تستخدم server صغير "تمثيلي". يرد بعد تقريبًا 0.3 ثانية:
- [[GET /api/students]] ← قائمة فيها 4 طلاب [[{id, name, major, gpa}]]، و [[/api/students/2]] ← طالب واحد (404 إذا الـ id مو موجود).
- [[GET /api/courses]] ← 3 مواد [[{code, title, credits}]].
- [[GET /api/weather?city=Manama]] ← [[{city, temp, sky}]].
- [[POST /api/students]] مع body فيه JSON ← 201 والـ object اللي انحفظ مع id جديد.
- [[/api/error]] ← status 500، و [[/api/offline]] ← الشبكة تفشل. وأضف [[?delay=2000]] لأي عنوان عشان يصير أبطأ.`;

  LESSONS_AR['async-promises'] = {
    title: 'الـ Synchronous والـ asynchronous: الـ callbacks والـ Promises',
    big: `بعض الشغلات تاخذ وقت: تطلب بيانات من server، أو تقرأ ملف، أو تنتظر timer. لو الـ JavaScript وقف وانتظر، الصفحة كلها بتعلّق. بدال جذي هو **يبدأ** الشغلة البطيئة، ويكمّل على الأسطر اللي بعدها، ويتعامل مع النتيجة **بعدين**.

الفصل 10 يبني الأدوات حق "بعدين": أول الـ **callbacks**، بعدين الـ **Promises**، وبعدين (في الدروس الجاية) الـ **fetch** والـ **async/await**.`,
    simple: `الكود الـ **Synchronous** يمشي سطر سطر، وكل سطر ينتظر اللي قبله.
والكود الـ **Asynchronous** يبدأ شي الحين ويخلّصه بعدين، بدون ما يوقّف الأسطر اللي بعده.

[[setTimeout(fn, 1000)]] أبسط شغلة async: "شغّل fn بعد ثانية". والأسطر اللي بعده تشتغل **قبله**.

الـ **Callback**: function تعطيها لأحد عشان يناديها لما تخلص الشغلة. ولما تتداخل callbacks واجد يصير الكود صعب ينقرا ("callback hell").

الـ **Promise**: object يمثّل نتيجة للحين مو جاهزة. ويكون في وحدة من ثلاث حالات:
- **pending**: للحين يشتغل
- **fulfilled** (resolved): خلص ومعاه قيمة
- **rejected**: فشل ومعاه error

وتتعامل معاه بـ:
- [[.then(value => …)]] ← تشتغل لما يصير fulfilled
- [[.catch(error => …)]] ← تشتغل لما يصير rejected
- [[.finally(() => …)]] ← تشتغل في الحالتين`,
    simpler: `مثل ما تطلب أكل في مطعم.

- الـ **Synchronous**: توقف عند باب المطبخ وما تسوي شي لين يجهز صحنك.
- الـ **Asynchronous**: تطلب، وتقعد، وتسولف، والويتر يجيب الصحن **لما يجهز**.
- الـ **callback** مثل ما تقول للويتر "ناديني لما يجهز".
- الـ **Promise** هو الإيصال اللي عليه رقم طلبك: الحين هو *pending*، وبعدين يصير *fulfilled* (أكلك وصل) أو *rejected* ("آسفين، خلص").
- الـ [[.then]] اللي تسويه لما يوصل الأكل، والـ [[.catch]] اللي تسويه إذا ما وصل.`,
    deeper: [
      `شغّل هالكود وشوف **ترتيب** الأسطر في الـ console. سطر الـ timer يطلع آخر شي مع إنه مكتوب ثاني.`,
      { task: 'غيّر الـ delay لـ 0. للحين "B" يطلع آخر؟ (إي: الـ callback حق الـ timer دايمًا ينتظر لين يخلص الكود الحالي.)' },
      `**شلون تسوي Promise.** [[new Promise((resolve, reject) => { … })]] يعطيك functionين: نادي [[resolve(value)]] للنجاح أو [[reject(error)]] للفشل.`,
      null,
      { task: 'شغّله، وبعدين غيّر 75 لـ 40 وشغّل مرة ثانية. أي function تشتغل الحين؟' },
      `**الـ Chaining.** أي شي ترجّعه الـ callback حق [[.then]] يوصل للـ [[.then]] اللي بعدها. وإذا رجّعت Promise ثاني، السلسلة تنتظره. وواحد [[.catch]] في الآخر يمسك الـ error من **أي** خطوة فوقه. وهالسلسلة المسطّحة تبدّل "الهرم" حق الـ callbacks المتداخلة.`,
      null
    ],
    points: [
      'الكود الـ async يبدأ الشغلة الحين ويتعامل مع النتيجة بعدين، والأسطر اللي بعده تكمّل تشتغل.',
      'الـ callbacks حق setTimeout دايمًا تشتغل بعد ما يخلص الـ script الحالي، حتى لو الـ delay صفر.',
      'الـ Promise يكون pending، وبعدين يا fulfilled (resolve) يا rejected (reject). وبعدها ما يتغير.',
      'الـ [[.then]] تاخذ القيمة، والـ [[.catch]] تاخذ الـ error، والـ [[.finally]] تشتغل في الحالتين.',
      'رجّع قيمة (أو Promise) من [[.then]] عشان توصل للي بعدها، وواحد [[.catch]] في الآخر يمسك errors كل الخطوات.'
    ],
    exam: [
      'سؤال قصير: اشرح الفرق بين synchronous و asynchronous مع مثال مثل [[setTimeout]] أو [[fetch]].',
      'أسئلة ترتيب المخرجات: الأسطر اللي بعد [[setTimeout]] تنطبع **قبل** الـ callback حقه.',
      'احفظ حالات الـ Promise الثلاث، وأي method تتعامل مع كل وحدة.'
    ],
    mistakes: [
      'الـ Promise مو هو القيمة نفسها. اقرأ القيمة داخل .then (أو بـ await في الدروس الجاية).',
      'الـ .then اللي بعدها تاخذ اللي ترجّعه اللي قبلها. وبدون return توصلها undefined.',
      'عطه الـ function نفسها. showMessage() تشغّلها على طول وتعطيه النتيجة حقتها بدالها.'
    ],
    summary: [
      'الـ Async = ابدأ الحين، خلّص بعدين، ولا توقّف شي.',
      'Callback ← Promise (pending و fulfilled و rejected).',
      '.then للنجاح، و .catch للـ errors، و .finally دايمًا.'
    ],
    recall: [
      { q: 'شنو يطبع هالكود؟\n[[console.log(1); setTimeout(() => console.log(2), 0); console.log(3);]]', why: 'الـ callback حق الـ timer ينتظر لين يخلص الـ script الحالي، فالـ 3 تنطبع قبل الـ 2.' },
      { q: 'الـ Promise اللي فشل يكون…', why: 'الـ reject() يحوّله لحالة rejected، والـ .catch تتعامل معاه.' },
      { q: 'أي method تشتغل سواء الـ Promise نجح أو فشل؟', why: 'الـ .finally تشتغل في الحالتين.' },
      { q: 'داخل [[new Promise((resolve, reject) => {…})]]، شلون تبلّغ عن النجاح بالقيمة 5؟', why: 'الـ resolve(value) يخلّي الـ Promise يصير fulfilled بهالقيمة.' }
    ],
    challenge: `1. اكتب [[function checkGrade(grade)]] اللي **ترجّع Promise**. بعد 300 ms يسوي resolve بـ [["Pass"]] إذا الـ grade >= 60، وإلا يسوي reject بـ [[new Error("Fail")]].
2. نادي [[checkGrade(75)]] وداخل [[.then]] حط النتيجة في [[#out]].
3. نادي [[checkGrade(40)]] وداخل [[.catch]] حط رسالة الـ error في [[#err]].`
  };

  LESSONS_AR['async-fetch'] = {
    title: 'الـ fetch والـ .then: تجيب JSON من API',
    big: `الـ **API** (هني نقصد web API) هو URL يرجّع **بيانات** بدال صفحة، وفي العادة كـ JSON. وبالـ [[fetch]]، الـ JavaScript حقك يطلب هالبيانات من ورا الكواليس ويحدّث جزء من الصفحة، بدون reload. وهالفكرة اسمها **AJAX** (Asynchronous JavaScript And XML، واليوم البيانات تقريبًا دايمًا JSON مو XML).

${API}`,
    simple: `الـ [[fetch(url)]] يرسل HTTP request ويرجّع **Promise** فيه **Response**.

قراءة البيانات تاخذ **خطوتين**، والثنتين asynchronous:
1. [[fetch('/api/courses')]] ← ينتظر لين يوصل الرد ← Response object.
2. [[response.json()]] ← يقرأ الـ body ويحوّل الـ JSON ← بياناتك (array أو object).

فالنمط المعتاد فيه [[.then]] ثنتين وواحد [[.catch]]:
[[fetch(url).then(response => response.json()).then(data => { … use data … }).catch(error => { … })]]

أجزاء مفيدة في الـ Response:
- [[response.status]] ← رقم الـ HTTP status (200 OK، و 404 Not Found، و 500 Server Error)
- [[response.ok]] ← [[true]] إذا الـ status بين 200 و 299
- [[response.json()]] / [[response.text()]] ← تقرأ الـ body كـ JSON / كنص عادي`,
    simpler: `الـ fetch مثل الطلب أونلاين.

1. [[fetch(url)]] يحط الطلب. وأول شي يوصلك هو **الكرتون** (الـ Response): تشوف الملصق (status 200 أو 404) بس للحين ما شفت الغرض.
2. [[response.json()]] يفتح الكرتون ويطلّع الغرض (بياناتك).

عشان جذي في [[.then]] ثنتين: وحدة لما يوصل الكرتون، ووحدة لما تفتحه. والـ [[.catch]] حق لما التوصيل يفشل بالكامل.`,
    deeper: [
      { task: 'شغّله. وبعدين غيّر الـ URL لـ [[/api/courses/ITCS214]] (مادة وحدة، object) واطبع [[data.title]].' },
      `**تحط البيانات في الصفحة.** البيانات اللي تجيبها بالـ fetch هي JavaScript عادي: سوّ loop على الـ array وابنِ عناصر، بالضبط مثل دروس الـ DOM.`,
      { task: 'غيّر [[city=Manama]] لـ [[city=Riffa]]. وبعدين جرّب مدينة مو موجودة وشوف شنو داخل [[data]].' },
      `**الـ 404 مو error عند الـ fetch.** الـ fetch يسوي reject بس إذا الـ request ما قدر ينرسل أصلًا (ما في شبكة، أو عنوان غلط). وإذا الـ server رد بـ 404 أو 500، الـ Promise للحين يصير **fulfilled**. شيّك على [[response.ok]] بنفسك وسوّ [[throw]] عشان تنط لـ [[.catch]].`,
      null,
      { task: 'جرّب [[/api/students/2]] و [[/api/students/99]] و [[/api/error]] و [[/api/offline]]. أي واحد منهم يوصل لـ .catch بدون الشيك على [[response.ok]]؟' },
      `**الـ AJAX: ليش وليش لا** (سؤال قصير معتاد)
- المميزات: يتحدّث جزء من الصفحة بس، فيكون أسرع ويستهلك بيانات أقل، والصفحة تبقى تشتغل وأنت تنتظر، والـ browser والـ server يتبادلون بيانات بس (JSON).
- العيوب: زر الـ Back والـ bookmarks ممكن ما يطابقون اللي يشوفه المستخدم، والمحتوى اللي يتحمّل بعدين أصعب على محركات البحث، ويحتاج JavaScript، وفي كود أكثر عشان تتعامل مع الـ loading والـ errors.`
    ],
    points: [
      'الـ fetch(url) يرجّع Promise فيه Response، والـ response.json() يرجّع Promise فيه البيانات.',
      'خطوتين .then: وحدة للـ response ووحدة للبيانات. رجّع response.json() من الأولى.',
      'الـ fetch يسوي reject بس لما تفشل الشبكة. الـ 404 والـ 500 للحين fulfilled: شيّك على response.ok / response.status.',
      'الـ JSON اللي يجي من API يصير arrays و objects عادية: سوّ loop وابنِ عناصر DOM منها.',
      'الـ AJAX = تحدّث جزء من الصفحة ببيانات جت من ورا الكواليس، بدون reload.'
    ],
    exam: [
      'سؤال قصير: عرّف الـ AJAX / الـ fetch واذكر ميزتين وعيبين.',
      'كود: كمّل سلسلة [[fetch(...).then(...).then(...)]] تعرض بيانات في عنصر.',
      'اعرف شنو معنى [[response.ok]] و [[response.status]].'
    ],
    mistakes: [
      'الـ .then الثانية ما تاخذ البيانات إلا إذا الأولى رجّعت response.json().',
      'الـ fetch ما يرجّع البيانات على طول، يرجّع Promise.',
      'الـ method اسمها json() بحروف صغيرة. والـ JSON (بحروف كبيرة) هو الـ object العام اللي فيه parse و stringify.'
    ],
    summary: [
      'fetch ← Response ← response.json() ← البيانات.',
      'شيّك على response.ok، الـ fetch يسوي reject بس مع errors الشبكة.',
      'الـ AJAX يحدّث جزء من الصفحة بدون reload.'
    ],
    recall: [
      { q: 'شنو يرجّع [[fetch(url)]]؟', o: ['بيانات الـ JSON', 'Promise فيه Response', 'string', 'XMLHttpRequest'], why: 'الـ fetch asynchronous: يرجّع Promise يصير fulfilled بـ Response.' },
      { q: 'الـ server رد بـ 404. شنو يصير للـ Promise حق الـ fetch؟', o: ['يصير rejected', 'يصير fulfilled، والـ response.ok يكون false', 'يبقى pending', 'الصفحة تسوي reload'], why: 'الـ fetch يسوي reject بس لما تفشل الشبكة. شيّك على response.ok.' },
      { q: 'أي سطر يقرأ body فيه JSON؟', why: 'الـ response.json() يقرأ الـ body ويحوّله، ويرجّع Promise.' },
      { q: 'أي واحد من هذول عيب في الـ AJAX؟', o: ['الصفحة كلها تسوي reload', 'تنرسل بيانات أكثر', 'زر الـ Back ممكن ما يطابق اللي يشوفه المستخدم', 'ما يقدر يستخدم JSON'], why: 'الـ URL والـ history ما يتغيرون لما يتحدّث جزء من الصفحة.' }
    ],
    challenge: `باستخدام [[fetch('/api/courses')]] و [[.then]]:
1. اقرأ الـ JSON (array فيه [[{code, title, credits}]]).
2. لكل مادة، أضف [[<li>]] في [[#list]] نصه [["CODE: Title"]]، مثل [["ITCS333: Internet Software Development"]].
3. حط عدد المواد في [[#count]].
4. أضف [[.catch]] يكتب [["Could not load"]] في [[#count]].`
  };

  LESSONS_AR['async-await'] = {
    title: 'الـ async / await مع try / catch',
    big: `الـ [[async]] والـ [[await]] طريقة أحلى تكتب فيها نفس كود الـ Promise. الكود **شكله** synchronous (من فوق لتحت، سطر ورا سطر) بس للحين ما يعلّق الصفحة. والـ errors تتعامل معاها بالـ [[try / catch]] اللي تعرفه بدال [[.catch]].`,
    simple: `- حط [[async]] قبل الـ function: [[async function load() { … }]]. والـ async function **دايمًا ترجّع Promise**.
- داخلها، الـ [[await]] يوقّف **هالـ function بس** لين يخلص الـ Promise، وبعدين يعطيك القيمة:
  [[const response = await fetch(url);]]
  [[const data = await response.json();]]
- إذا الـ Promise اللي تنتظره صار rejected، الـ [[await]] **يسوي throw**. امسكه بـ [[try { … } catch (error) { … }]].
- الـ [[await]] يشتغل بس داخل function فيها [[async]] (في الـ scripts العادية).

نفس الشغلة، بأسلوبين:
- [[fetch(url).then(r => r.json()).then(data => show(data)).catch(e => …)]]
- [[try { const r = await fetch(url); const data = await r.json(); show(data); } catch (e) { … }]]`,
    simpler: `الـ await يعني "انتظر هني هالشي الواحد، وبعدين كمّل"، مثل ما تنتظر الكتلي يغلي قبل ما تصب الشاي.

- الـ [[async]] على الـ function يعني "هالـ function ممكن تنتظر أشياء".
- الـ [[await]] ينتظر بس داخل **ذيج** الـ function، وباقي الصفحة تكمّل تشتغل.
- الـ [[try]] يعني "جرّب هالخطوات"، والـ [[catch]] يعني "إذا أي خطوة خربت، سوّ هذا بدالها".`,
    deeper: [
      { task: 'شغّله. وبعدين غيّر العنوان لـ [[/api/students/99]]، وبعدها لـ [[/api/offline]]، وشوف أي رسالة تطلع.' },
      `**الـ async function ترجّع Promise.** أي شي تسوي له [[return]] داخلها يصير قيمة هالـ Promise. فـ async function ثانية تقدر تسوي له [[await]]، والكود العادي يقدر يستخدم [[.then]] عليه.`,
      null,
      `**داخل event listener.** الـ function حق الـ listener نفسها تقدر تكون async. اقرأ الـ input، وسوّ await للبيانات، وحدّث الصفحة.`,
      { task: 'اكتب رقم من 1 لين 4 واضغط Find. وبعدين اكتب 7. ليش تطلع رسالة الـ error؟' },
      `**ورا بعض، ولا في نفس الوقت؟** ثنتين [[await]] ورا بعض ينتظرون واحد ورا الثاني. وإذا تبي تبدأ كذا request مع بعض وتنتظرهم كلهم، استخدم [[Promise.all([...])]].`,
      null
    ],
    points: [
      'الـ async قبل الـ function يخليها ترجّع Promise.',
      'الـ await يوقّف هالـ async function بس لين يخلص الـ Promise، وبعدين يعطي القيمة.',
      'الـ Promise اللي يصير rejected يخلي الـ await يسوي throw: حط الـ awaits داخل try / catch.',
      'للحين شيّك على response.ok: الـ 404 ما يسوي throw بروحه.',
      'الـ await مسموح بس داخل async functions (في الـ scripts العادية).'
    ],
    exam: [
      'أعد كتابة سلسلة [[.then]] بـ [[async/await]] و [[try/catch]] (أو العكس).',
      'اشرح شنو يسوي الـ [[await]] وليش الصفحة ما تعلّق.',
      'طلّع كلمة [[async]] الناقصة لما function تستخدم [[await]].'
    ],
    mistakes: [
      'الـ await ما ينفع إلا داخل function عليها async.',
      'الـ response.json() بعد asynchronous، فيحتاج await خاص فيه.',
      'بدون try / catch الـ error يصير "Uncaught (in promise)".'
    ],
    summary: [
      'async function ← ترجّع Promise.',
      'await ← انتظر Promise وخذ قيمته.',
      'try / catch يتعامل مع الـ awaits اللي تفشل، وشيّك على response.ok.'
    ],
    recall: [
      { q: 'شنو ترجّع الـ function اللي عليها [[async]] دايمًا؟', o: ['undefined', 'Promise', 'القيمة اللي انتظرتها', 'Response'], why: 'القيمة اللي ترجّعها تنلف داخل Promise.' },
      { q: 'وين تقدر تستخدم [[await]] في script عادي؟', o: ['في أي مكان', 'بس داخل async function', 'بس داخل .then', 'بس داخل try'], why: 'الـ await يحتاج async function حوله.' },
      { q: 'fetch عليه await فشل لأن الشبكة طايحة. شنو يصير؟', o: ['الـ await يرجّع null', 'الـ await يسوي throw، فيشتغل الـ catch', 'الصفحة تسوي reload', 'ولا شي'], why: 'الـ Promise اللي يصير rejected يخلي الـ await يرمي الـ error.' },
      { q: 'شلون تبدأ fetch ثنتين مع بعض وتنتظرهم الثنتين؟', why: 'الـ Promise.all ينتظر كل Promise في الـ array.' }
    ],
    challenge: `1. اكتب [[async function loadStudent(id)]] اللي تسوي fetch لـ [['/api/students/' + id]]. إذا [[response.ok]] كان false، **سوّ throw** لـ [[new Error("Student not found")]]. وإلا رجّع الـ JSON بعد ما تقراه.
2. لما ينرسل [[#findForm]]: وقّف الـ reload، وبعدين سوّ **await** لـ [[loadStudent]] بالـ id اللي في [[#sid]] داخل [[try / catch]].
   - إذا نجح: [[#msg]] يعرض [["Name (Major)"]]، مثل [["Sara (CE)"]].
   - إذا صار error: [[#msg]] يعرض رسالة الـ error.`
  };

  LESSONS_AR['async-post'] = {
    title: 'ترسل JSON: الـ POST requests والـ headers والـ status codes',
    big: `قراءة البيانات نص شغل الـ API بس. عشان **تنشئ** شي على الـ server، الـ browser يرسل بيانات في الـ request body، وفي العادة كـ JSON، بالـ method [[POST]]. والـ fetch ياخذ argument ثاني، options object، حق هالشي.`,
    simple: `[[fetch(url, options)]]: الـ options object يوصف الـ request.
- [[method: 'POST']] ← الـ HTTP method (الـ GET هو الافتراضي).
- [[headers: { 'Content-Type': 'application/json' }]] ← يقول للـ server إن الـ body هو JSON.
- [[body: JSON.stringify(obj)]] ← البيانات بعد ما تتحوّل لـ **string** JSON (الـ object ما ينرسل جذي).

الـ server يرد برقم status. اللي لازم تعرفهم:
- **200** OK · **201** Created (بعد POST ناجح)
- **400** Bad Request (البيانات غلط) · **401** Unauthorized · **403** Forbidden · **404** Not Found
- **500** Internal Server Error

المجموعات: 2xx نجاح، 3xx redirect، 4xx الغلط من الـ **client**، 5xx الـ **server** فشل.`,
    simpler: `الـ POST مثل ما ترسل رسالة بالبريد.

- [[method: 'POST']] ← "أنا قاعد أرسل شي"، مو بس أسأل.
- الـ [[headers]] ← اللي تكتبه على الظرف: "Content-Type: JSON" يقول للبريد شنو داخله.
- الـ [[body]] ← الرسالة نفسها. ولازم تطوي الـ object لنص أول بـ [[JSON.stringify]].
- الـ status code هو ورقة الرد: 201 "وصلت وانحفظت"، و 400 "رسالتك ما تنقرا"، و 500 "مكتبنا فيه مشكلة".`,
    deeper: [
      { task: 'شغّله. وبعدين شيل [[JSON.stringify]] (أرسل الـ object نفسه) وشوف رد الـ 400.' },
      `**من form لـ JSON.** اقرأ الـ inputs، وابنِ object، وأرسله. نفس النمط مكتوب بـ async/await:`,
      { task: 'عبّ الـ form واضغط Save. وشوف في الـ console الـ request اللي أرسله الـ browser.' },
      `**الـ GET ضد الـ POST** (ينسأل تقريبًا في كل فاينل)
- الـ **GET** يحط البيانات في الـ URL ([[?name=Ali&age=20]]): تبين، وتقدر تسوي لها bookmark، وتنحفظ في الـ cache، وطولها محدود. استخدمه عشان **تقرأ**.
- الـ **POST** يحط البيانات في الـ request body: ما تطلع في الـ URL، وما لها حد حجم عملي، وما تنحفظ في الـ cache. استخدمه عشان **تنشئ أو تغيّر** شي، وحق الـ passwords. (الـ POST بروحه مو تشفير: بس الـ HTTPS يحمي البيانات وهي في الطريق.)`
    ],
    points: [
      'الـ fetch(url, { method, headers, body }) يرسل أي HTTP request.',
      'أرسل JSON بـ body: JSON.stringify(obj) مع الـ header Content-Type: application/json.',
      'الـ 201 Created هو الرد المعتاد على POST ناجح، والـ 400 يعني البيانات غلط.',
      '2xx نجاح، 3xx redirect، 4xx غلط الـ client، 5xx غلط الـ server.',
      'الـ GET: البيانات في الـ URL، للقراءة. الـ POST: البيانات في الـ body، للإنشاء أو التغيير.'
    ],
    exam: [
      'سؤال قصير: الفرق بين GET و POST (وين تروح البيانات، وهل تبين، والـ caching، والحجم، ومتى تستخدم كل واحد).',
      'MCQ: طابق الـ status code مع معناه (200 و 201 و 301 و 404 و 500).',
      'كود: كمّل الـ options object حق fetch بالـ POST.'
    ],
    mistakes: [
      'الـ body لازم يكون string. والـ JSON.stringify يحوّل الـ object لنص JSON.',
      'الـ fetch ياخذ بس argumentين: الـ URL وواحد options object.'
    ],
    summary: [
      'POST + headers + JSON.stringify(body).',
      '201 Created، و 400 Bad Request، و 404 Not Found، و 500 Server Error.',
      'الـ GET يقرأ (الـ URL)، والـ POST يكتب (الـ body).'
    ],
    recall: [
      { q: 'أي status code معناه "انخلق" بعد POST؟', why: '201 Created.' },
      { q: 'أي مجموعة status معناها إن الـ **client** أرسل request غلط؟', why: '4xx = غلط الـ client، و 5xx = غلط الـ server.' },
      { q: 'شلون ترسل الـ object [[s]] كـ JSON؟', why: 'الـ body لازم يكون string فيه JSON.' },
      { q: 'وين يحط الـ GET request البيانات حقته؟', o: ['في الـ body', 'في الـ query string حق الـ URL', 'في cookie بس', 'في الـ status code'], why: 'بيانات الـ GET تكون في الـ URL بعد علامة ?.' }
    ],
    challenge: `لما ينضغط الزر [[#save]]، أرسل هالـ object لـ [[/api/students]] بـ **POST**:
[[{ name: "Nora", major: "CS", gpa: 3.6 }]]
- استخدم الـ header [['Content-Type': 'application/json']] و [[JSON.stringify]].
- إذا الـ status كان 201، اعرض [["Saved with id "]] + الـ id اللي في الرد داخل [[#msg]] (بيطلع 5).
- وإلا اعرض [["Error "]] + الـ status.`
  };

  LESSONS_AR['async-table'] = {
    title: 'تعرض البيانات اللي جبتها: تبني جدول من API',
    big: `أكثر شغلة AJAX معروفة، وسؤال متوقع في الامتحان: تجيب JSON array وتحوّله لصفوف جدول، مع رسالة "loading" وأنت تنتظر، ورسالة error إذا فشل، و style للصفوف اللي ينطبق عليها شرط. وهو يربط هالقسم مع دروس الـ DOM (createElement و appendChild و classList).`,
    simple: `الطريقة:
1. اعرض status: [["Loading…"]].
2. [[await fetch(url)]]، وشيّك على [[response.ok]]، و [[await response.json()]] ← array.
3. امسح الصفوف القديمة: [[tbody.innerHTML = ""]].
4. لكل object: سوّ [[tr]]، وسوّ [[td]] لكل field، وحط [[textContent]]، وألصق الخانات في الصف والصف في الـ [[tbody]].
5. style بشرط: [[if (s.gpa < 2.5) tr.classList.add("low");]]
6. حدّث الـ status ([["Loaded 4 students"]]). وفي الـ [[catch]]، اعرض error بداله.

استخدم [[textContent]] (مو [[innerHTML]]) للبيانات اللي جاية من server: تطلع كنص، وأبد ما تشتغل كـ HTML.`,
    simpler: `مثل ما تعبّي كشف حضور من قائمة توصلك بالتلفون.

وأنت تنتظر الخط يتصل تكتب "Loading…". لما توصل القائمة، تمسح الكشف القديم، وبعدين لكل اسم ترسم صف جديد وتكتب كل معلومة في خانتها. وإذا طالب وضعه صعب (GPA واطي)، تعلّم صفه بالأحمر. وإذا الخط انقطع، تكتب "Could not load".`,
    deeper: [
      { task: 'شغّله. وبعدين غيّر الشرط لـ [[s.major === "CS"]]، وغيّر الـ URL لـ [[/api/error]] عشان تشوف طريق الـ error.' },
      `**زر "Refresh" ومربع بحث** يستخدمون نفس الـ function: ناديها مرة ثانية من click listener، أو ابنِ الـ URL من input ([['/api/students/' + id]]). ولأن الصفوف تنمسح أول، الـ refresh أبد ما يكرر الصفوف.`,
      `**ليش textContent؟** لو الـ server أرسل الاسم [[<img src=x onerror=alert(1)>]]، الـ [[innerHTML]] بيسوي هالصورة ويشغّل الكود حقها. أما الـ [[textContent]] فيعرض الحروف كنص عادي. وهذا نص الـ client-side من درس الـ XSS في الفصل 16.`
    ],
    points: [
      'اعرض رسالة loading، وبعدين بدّلها بالنتيجة أو بالـ error.',
      'امسح الـ tbody قبل ما تضيف الصفوف، عشان الـ refresh ما يكررها.',
      'ابنِ الصفوف بـ createElement + textContent + appendChild.',
      'الـ style بشرط: أضف class داخل if، وحط الـ style حق الـ class في الـ CSS.',
      'فضّل textContent للبيانات اللي من الـ server (آمن ضد الـ XSS).'
    ],
    exam: [
      'كود: جيب قائمة JSON واعرضها في جدول، ولوّن الصفوف حسب شرط.',
      'نفس نمط "اعرض الصفوف ولوّنها حسب شرط" يطلع في أسئلة الـ PHP (نتايج الـ PDO)، فتعلّمه مرة وحدة.'
    ],
    mistakes: [
      'الـ innerHTML مع بيانات الـ server ممكن يشغّل HTML مدسوس (XSS)، ويعيد بناء الـ tbody كله كل مرة.',
      'النص مكانه داخل خانات td، والـ tr لازم يكون فيه td أو th بس.'
    ],
    summary: [
      'Loading ← fetch ← json ← امسح ← صفوف ← status.',
      'صفوف بشرط بـ classList.add.',
      'textContent للبيانات اللي من الـ server.'
    ],
    recall: [
      { q: 'ليش تمسح الـ tbody قبل ما تضيف الصفوف اللي جبتها؟', o: ['أسرع', 'عشان التحميل الثاني ما يكرر الصفوف', 'الـ fetch يطلب جذي', 'عشان تشيل الـ thead'], why: 'كل تحميل يضيف صفوف، والمسح أول يخلي نسخة وحدة بس.' },
      { q: 'أي واحد الأأمن عشان تعرض اسم جاي من server؟', why: 'الـ textContent أبد ما يعامل النص كـ HTML.' },
      { q: 'شلون تعلّم الصفوف اللي الـ GPA فيها أقل من 2.5؟', why: 'الـ classList.add يضيف class، والـ CSS rule حق .low هو اللي يسوي الـ style.' }
    ],
    challenge: `اكتب [[async function loadStudents()]] وناديها مرة وحدة:
1. حط [["Loading…"]] في [[#status]].
2. سوّ fetch لـ [[/api/students]] واقرأ الـ JSON.
3. لكل طالب، أضف صف في [[#tbody]] فيه ثلاث خانات: name و major و gpa.
4. أضف الـ class [[low]] للصفوف اللي الـ gpa فيها **أقل من 2.5**.
5. بعدين خلّ [[#status]] يصير [["Loaded 4 students"]] (استخدم طول الـ array).
6. إذا أي شي فشل، خلّ [[#status]] يصير [["Could not load"]].`
  };
})();

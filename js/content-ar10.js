/* Arabic version of the file-upload lesson. Aligned item by item with js/content10.js. */
(() => {
  const R = String.raw;
  LESSONS_AR['db-upload'] = {
    title: 'رفع الملفات بالـ $_FILES (وحفظها في الـ database)',
    big: R`صور البروفايل، والواجبات، وصور المنتجات: المواقع في العادة تخلّي المستخدمين **يرفعون ملفات**. الـ browser يرسل الملف داخل POST request، والـ PHP يحفظه في **ملف مؤقت** ويوصفه في [[$_FILES]]. والكود حقك يشيّك عليه، وينقله لمجلد بـ [[move_uploaded_file()]]، وفي العادة يسجّله في الـ database. وفي سؤال كامل من الامتحانات السابقة يمشي على هالخطوات بالضبط.

**في الـ lab** تقدر تختار ملف حقيقي في الـ form اللي داخل النتيجة. والفحوصات ترسل ملفات تمثيلية.`,
    simple: R`**الـ form** يحتاج ثلاث أشياء:
[[<form method="post" enctype="multipart/form-data">]] و [[<input type="file" name="pic">]].
وبدون [[enctype="multipart/form-data"]] ينرسل بس **اسم** الملف، مو الملف نفسه.

الـ **$_FILES["pic"]** هو array:
- [["name"]] ← اسم الملف الأصلي، مثل [["cat.jpg"]]
- [["type"]] ← الـ MIME type اللي يقوله الـ browser، مثل [["image/jpeg"]]
- [["size"]] ← الحجم بالـ bytes
- [["tmp_name"]] ← المكان اللي حط فيه الـ PHP النسخة المؤقتة
- [["error"]] ← 0 ([[UPLOAD_ERR_OK]]) لما ينجح، و 4 معناه ما انختار ملف

**الخطوات المعتادة**
1. شيّك إن في ملف وصل: [[isset($_FILES["pic"]) && $_FILES["pic"]["error"] == 0]].
2. شيّك على النوع (قائمة مسموحة) والحجم (مثلًا 1 MB بالأكثر = 1048576 bytes).
3. ابنِ مسار الهدف: [[$target = "uploads/" . basename($_FILES["pic"]["name"]);]]
4. ارفض الكتابة فوق ملف موجود: [[if (file_exists($target)) …]]
5. [[move_uploaded_file($_FILES["pic"]["tmp_name"], $target)]] ← [[true]] إذا نجح.
6. سجّله: [[INSERT]] بـ prepared statement فيه اسم الملف وحجمه.

**الأمان**: الاسم والنوع جايين من المستخدم، فلا تثق فيهم: استخدم [[basename()]]، وشيّك على الامتداد والنوع، وحدّد الحجم، وسوّ escape للاسم لما تطبعه.`,
    simpler: R`رفع الملف مثل ما تسلّم طرد عند كاونتر البريد.

- الـ form اللي فيه [[enctype="multipart/form-data"]] هو استمارة الطرد، وبدونه تسلّم بس **الملصق**.
- الـ PHP يحط الطرد في **غرفة ورا** ([[tmp_name]]) ويكتب معلوماته على كرت ([[$_FILES]]: الاسم، والنوع، والحجم، والـ error).
- وأنت تفحصه (النوع صحيح؟ مو ثقيل واجد؟ في طرد بنفس الاسم على الرف؟)، وبعدين **تنقله للرف** بـ [[move_uploaded_file]]، وتسجّله في الدفتر (الـ database).`,
    deeper: [
      { task: R`شغّله، وبعدين اختار ملف حقيقي في الـ form اللي داخل النتيجة واضغط Upload. اقرا الـ [[$_FILES]] في الناتج. وبعدين شيل الـ [[enctype]] من الـ form وارفع مرة ثانية: بس الاسم يوصل، في [[$_POST]].` },
      R`**النمط الكامل**: شيّك، وانقل، وبعدين أضف في الـ database. كل Run يبدأ بمجلد uploads فاضي وجدول [[photos]] فاضي.`,
      { task: R`ارفع نفس الملف مرتين في النتيجة: المرة الثانية ينرفض. وارفع ملف نصي: فحص النوع يرفضه.` }
    ],
    points: [
      'الـ form يحتاج method="post" و enctype="multipart/form-data"، و input type="file" عليه name.',
      'الـ $_FILES["field"] فيه name و type و size و tmp_name و error (0 = تمام، 4 = ما في ملف).',
      'شيّك على الـ error والنوع والحجم قبل ما تقبل الملف.',
      'الـ file_exists($target) يمنع الكتابة فوق ملف موجود، و move_uploaded_file(tmp_name, target) يحفظه.',
      'سجّل الملف في الـ database بـ INSERT بـ prepared statement، وسوّ escape للاسم لما تطبعه.'
    ],
    exam: [
      R`سؤال كامل: اقرا [[$_FILES['pic']['type'|'size'|'name'|'tmp_name']]]، وشيّك عليهم، واستخدم [[file_exists]] و [[move_uploaded_file]]، وبعدين سوّ INSERT لاسم الملف.`,
      R`MCQ: أي superglobal فيه الملفات المرفوعة ([[$_FILES]])، وشنو يحتاج الـ form ([[enctype="multipart/form-data"]]).`
    ],
    mistakes: [
      'بدون الـ multipart encoding محتوى الملف ما ينرسل أبد.',
      'الملف محفوظ في tmp_name، والـ name بس اسم الملف الأصلي.',
      'الـ basename يشيل أي أجزاء مجلدات مثل ../ ممكن تكون في اسم متلاعب فيه.'
    ],
    summary: [
      'multipart/form-data + input type="file".',
      'الـ $_FILES: name و type و size و tmp_name و error.',
      'شيّك ← file_exists ← move_uploaded_file ← INSERT.'
    ],
    recall: [
      { q: 'أي attribute لازم يكون في الـ form عشان ترفع ملفات؟', why: 'ومعاه method="post".' },
      { q: R`أي key في [[$_FILES["pic"]]] هو المسار المؤقت اللي تنقل منه؟`, why: 'move_uploaded_file(tmp_name, target).' },
      { q: R`شنو معنى [[$_FILES["pic"]["error"] == 4]]؟`, o: ['الملف كبير واجد', 'ما انختار ملف', 'الرفع نجح', 'النوع غلط'], why: '0 = تمام، و 4 = ما في ملف.' },
      { q: 'ليش تشيّك على file_exists($target) قبل ما تنقل؟', o: ['الـ move_uploaded_file يحتاجه', 'عشان ما تكتب فوق ملف موجود', 'عشان تشيّك على الحجم', 'عشان تسوي المجلد'], why: 'وإلا الرفع الجديد بنفس الاسم يبدّل القديم.' }
    ],
    challenge: R`كمّل صفحة الرفع (الـ form معطى). لما ينرسل ملف في الخانة [[pic]]، اطبع رسالة وحدة في [[<p id="msg">]]:
- ما انختار ملف (error 4): [["No file chosen"]]
- النوع مو [[image/jpeg]] أو [[image/png]]: [["Only JPEG or PNG images"]]
- أكبر من 1 MB (1048576 bytes): [["File too large (max 1 MB)"]]
- الهدف [[uploads/NAME]] موجود من قبل: [["File already exists"]]
- وإلا انقله هناك، وأضف اسم الملف وحجمه في [[photos]] بـ prepared statement، واطبع [["Uploaded NAME"]]
ودايمًا اطبع [[<ul id="photos">]] فيها [[<li>]] لكل صف في [[photos]] (اسم الملف بس)، بترتيب الإضافة.`
  };
})();

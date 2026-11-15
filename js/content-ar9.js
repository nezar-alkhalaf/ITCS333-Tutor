/* Arabic versions of module 00 (How the web works). Aligned item by item with js/content9.js. */
(() => {
  const R = String.raw;

  LESSONS_AR['web-basics'] = {
    title: 'الـ Clients والـ servers والـ URLs والـ DNS',
    big: R`قبل ما يصير للـ PHP والـ databases والـ sessions معنى، لازم تكون عندك الصورة حق اللي يصير لما أحد يكتب عنوان ويضغط Enter. الـ **client** (الـ browser) يسأل، والـ **server** يجاوب، وفي كم نظام بينهم (الـ DNS، والـ TCP/IP، والـ ports) يتأكدون إن السؤال يوصل للجهاز الصحيح.`,
    simple: R`**الـ Internet ضد الـ Web.** الـ **Internet** هو الشبكة العالمية حق الأجهزة المتصلة (كيبلات، و routers، و IP addresses). والـ **Web** خدمة وحدة تشتغل فوقه: صفحات مربوطة ببعض وتنجاب بالـ **HTTP**. والإيميل ومكالمات الفيديو خدمات ثانية على نفس الـ Internet.

**الـ Client–server.** الـ **client** يرسل **request**، والـ **server** يرجّع **response**. والـ **web server** (مثل Apache أو Nginx) يسمع الـ requests ويرجّع ملفات أو output برامج مثل الـ PHP.
- الصفحة الـ **Static**: نفس الملف للكل (HTML و CSS وصور).
- الصفحة الـ **Dynamic**: تنبني لكل request بكود على الـ server (PHP يقرا من database).

الـ **URL** (Uniform Resource Locator)، مثل [[https://www.uob.edu.bh:443/courses/list.php?dept=it&year=2#top]]
- [[https]] ← الـ protocol (الـ scheme)
- [[www.uob.edu.bh]] ← الـ domain name (الـ host)
- [[443]] ← الـ port (اختياري: 80 هو الافتراضي حق http، و 443 حق https)
- [[/courses/list.php]] ← الـ path
- [[dept=it&year=2]] ← الـ query string (أزواج name=value بينهم &)
- [[top]] ← الـ fragment: مكان داخل الصفحة، و**ما** ينرسل للـ server.

الـ **IP address**: العنوان الرقمي حق الجهاز، مثل [[193.188.97.10]] (IPv4) أو عنوان IPv6 أطول.

الـ **DNS** (Domain Name System) يحوّل الـ domain name لـ IP address:
1. الـ browser يشيّك على الـ cache حقه، وبعدين حق نظام التشغيل.
2. إذا ما يعرفه، يسأل **DNS resolver** (في العادة حق شركة الإنترنت).
3. الـ resolver يسأل الـ **root** server ← الـ server حق الـ **.bh TLD** ← الـ server الـ **authoritative** حق uob.edu.bh.
4. الـ IP يرجع وينحفظ في الـ cache لفترة (الـ TTL). والحين الـ browser يقدر يتصل.`,
    simpler: R`إنك تزور موقع مثل ما ترسل رسالة بالبريد.

- الـ **URL** هو العنوان الكامل على الظرف: أي خدمة ([[https]])، وأي عمارة ([[www.uob.edu.bh]])، وأي باب ([[:443]])، وأي غرفة ([[/courses/list.php]])، وملاحظة للي داخل ([[?dept=it]]).
- الـ **DNS** هو دليل التلفونات اللي يحوّل اسم العمارة لإحداثيات الـ GPS حقتها (الـ IP address).
- والـ **server** هو المكتب اللي في ذيج العمارة، يقرا رسالتك ويرسل لك الرد، وأنت الـ **client**.`,
    deeper: [
      { task: R`غيّر العنوان اللي في [[u]] (شيل الـ port، واستخدم http، وأضف parameters ثانية في الـ query) وشغّل. الـ URL parser حق الـ browser نفسه يقسمه لك.` },
      R`**شنو يصير لما تضغط Enter** (سؤال قصير مفضّل):
1. الـ browser يقرا الـ URL.
2. الـ **DNS** يحوّل الـ domain لـ IP address.
3. الـ browser يفتح اتصال **TCP** مع هالـ IP على الـ port (80 أو 443)، ومع الـ https، في **TLS** handshake يجهّز التشفير.
4. يرسل **HTTP request** (الدرس الجاي).
5. الـ server يشغّل الكود حق هالـ path (مثلًا ملف PHP) ويرسل **HTTP response**.
6. الـ browser يقرا الـ HTML، ويطلب الـ CSS والـ JS والصور اللي مذكورة فيه (requests ثانية)، وبعدين يعرض الصفحة.`,
      R`الـ **Ports** تخلّي الجهاز الواحد يشغّل كذا خدمة: 80 HTTP، و 443 HTTPS، و 21 FTP، و 22 SSH، و 25 SMTP (الإيميل)، و 3306 MySQL. ولما يكون الـ port هو الافتراضي حق الـ protocol ما ينكتب في الـ URL.`
    ],
    points: [
      'الـ Internet = الشبكة، والـ Web = صفحات مربوطة تنخدم بالـ HTTP فوقه.',
      'الـ Client يرسل request، والـ server يرجّع response.',
      'الصفحات الـ static نفس الملفات للكل، والـ dynamic تنبني لكل request بكود على الـ server.',
      'أجزاء الـ URL: الـ protocol، والـ domain، والـ port، والـ path، والـ query string، والـ fragment.',
      'الـ fragment (#…) أبد ما ينرسل للـ server.',
      'الـ DNS يربط الـ domain name بـ IP address: cache ← resolver ← root ← TLD ← authoritative.',
      'الـ ports الافتراضية: 80 حق http، و 443 حق https.'
    ],
    exam: [
      'MCQ: سمّ أجزاء URL معيّن.',
      'سؤال قصير: شنو يصير لما تكتب URL وتضغط Enter (الـ DNS، والاتصال، والـ request، والـ response، والعرض).',
      'MCQ: الفرق بين الـ Internet والـ Web، وبين الصفحات الـ static والـ dynamic.'
    ],
    mistakes: [
      'الـ fragment يبدأ عند # ويبقى في الـ browser.',
      'الـ DNS خدمة بحث، مو web server.',
      'الإيميل والـ FTP ومكالمات الفيديو بعد يستخدمون الـ Internet وهم مو الـ Web.'
    ],
    summary: [
      'Client ← request ← server ← response.',
      'الـ URL = protocol://domain:port/path?query#fragment.',
      'الـ DNS: اسم ← IP.'
    ],
    recall: [
      { q: R`في [[http://shop.bh:8080/cart.php?id=5#items]]، شنو الـ port؟`, why: 'الرقم اللي بعد الـ colon اللي يجي بعد الـ domain.' },
      { q: 'أي جزء من الـ URL ما ينرسل للـ server؟', o: ['الـ path', 'الـ query string', 'الـ fragment', 'الـ domain'], why: 'الـ browser يحتفظ بالـ #fragment لنفسه.' },
      { q: 'شنو يسوي الـ DNS؟', o: ['يشفّر الاتصال', 'يحوّل الـ domain names لـ IP addresses', 'يحفظ صفحات الـ web', 'يشغّل الـ PHP'], why: 'هو دليل التلفونات حق الـ Internet.' },
      { q: 'أي واحد صفحة dynamic؟', o: ['logo.png', 'style.css', 'صفحة PHP تعرض منتجات من database', 'about.html'], why: 'تنبني بكود على الـ server لكل request.' }
    ],
    challenge: R`اكتب [[function urlParts(address)]] اللي ترجّع object فيه:
- [[protocol]]: [["https"]] أو [["http"]] (بدون colon)
- [[domain]]: مثل [["www.uob.edu.bh"]]
- [[port]]: **رقم**، ولما الـ URL ما فيه port، استخدم الافتراضي (80 حق http، و 443 حق https)
- [[path]]: مثل [["/courses/list.php"]] (و [["/"]] إذا فاضي)
- [[query]]: object فيه الـ query parameters، مثل [[{ dept: "it", year: "2" }]] (و [[{}]] إذا ما في)
- [[fragment]]: النص اللي بعد #، بدون الـ #، أو [[""]]
تقدر تستخدم [[new URL(address)]].`
  };

  LESSONS_AR['web-http'] = {
    title: 'تقرا الـ HTTP: الـ request والـ response',
    big: R`كل مرة تفتح صفحة، وكل form ينرسل، وكل [[fetch]]، هو **HTTP request** يرد عليه **HTTP response**. والثنتين نص عادي بنفس الأجزاء الثلاثة. وإذا تقدر تقراهم سطر سطر، تفهم شنو فعلًا الـ [[$_GET]] والـ [[$_POST]] والـ [[$_COOKIE]] والـ [[header()]] والـ status codes.`,
    simple: R`**الـ request**
1. الـ **Request line**: الـ method، والـ path (مع الـ query string)، والـ version: [[GET /search.php?q=php HTTP/1.1]]
2. الـ **Headers**، واحد في كل سطر، [[Name: value]]:
   - [[Host]] (لازم): الـ domain المطلوب
   - [[User-Agent]]: أي browser
   - [[Accept]]: أي صيغ يبي
   - [[Cookie]]: الـ cookies اللي عند الـ browser لهالموقع
   - [[Content-Type]] و [[Content-Length]]: يوصفون الـ **body**، إذا موجود
3. **سطر فاضي**، وبعدين الـ **body** (مع الـ POST: بيانات الـ form، مثل [[name=Ali&age=20]]، أو JSON).

**الـ response**
1. الـ **Status line**: الـ version، والكود، والسبب: [[HTTP/1.1 200 OK]]
2. الـ **Headers**: [[Content-Type: text/html; charset=UTF-8]]، و [[Content-Length]]، و [[Set-Cookie]]، و [[Location]] (مع الـ redirects)، و [[Cache-Control]]
3. سطر فاضي، وبعدين الـ **body** (الـ HTML، أو الـ JSON، أو الصورة).

**الـ Methods**: الـ GET (قراءة)، والـ POST (إرسال / إنشاء)، والـ PUT (استبدال)، والـ DELETE (حذف)، والـ HEAD (headers بس).
**مجموعات الـ Status**: 1xx معلومات، و 2xx نجاح (200 و 201)، و 3xx redirect (301 انتقل للأبد، و 302 found، و 304 not modified)، و 4xx غلط الـ client (400 و 401 و 403 و 404)، و 5xx غلط الـ server (500 و 503).

الـ HTTP **stateless** (الفصل 15): كل request يشيل كل اللي يحتاجه الـ server، وعشان جذي الـ cookies تمشي مع كل request.`,
    simpler: R`الـ HTTP request مثل **استمارة تسلّمها عند الكاونتر**:
- السطر اللي فوق يقول شنو تبي ("GET لي /search.php")،
- والـ headers هي المربعات اللي عنك (أي browser، وأي لغة، وبطاقات العضوية = الـ cookies)،
- وبعدين سطر فاضي، وأي شي مرفق (الـ body).

والـ response هو **ورقة الرد**: status فوق (200 = تفضّل، و 404 = ما في شي جذي)، والمربعات حقته (نوع المحتوى، و cookies احتفظ فيها، و "روح كاونتر ثاني" = Location)، وسطر فاضي، والمحتوى نفسه.`,
    deeper: [
      R`**إرسال form، وهو في الطريق.** الـ form [[<form method="post" action="/login.php">]] اللي فيه خانتين يرسل:`,
      null,
      R`الـ PHP يقرا هالـ request عنك: الـ body يصير [[$_POST["email"]]] (بعد الـ decode يصير [[ali@uob.bh]])، والـ Cookie header يصير [[$_COOKIE["PHPSESSID"]]]، و [[$_SERVER["REQUEST_METHOD"]]] يكون [["POST"]]. والـ [[Content-Length: 27]] هو عدد الـ bytes في الـ body.`,
      null,
      R`هالـ response هو اللي يطلّعه [[header("Location: /dashboard.php")]] و [[session_regenerate_id()]]: status 302، و header [[Location]] الـ browser يتبعه بـ GET جديد، و session cookie جديدة.`,
      { task: R`شغّله عشان تشوف الـ headers حق response حقيقي (من الـ API حق التدريب). غيّر العنوان لـ [[/api/missing]] أو [[/api/error]].` }
    ],
    points: [
      'الـ Request = request line + headers + سطر فاضي + body اختياري.',
      'الـ Response = status line + headers + سطر فاضي + body.',
      'الـ Host لازم في HTTP/1.1، والـ Cookie يشيل الـ cookies للـ server، والـ Set-Cookie يرسل cookies جديدة.',
      'الـ Content-Type يقول شنو الـ body، والـ Content-Length يقول كم byte.',
      'بيانات الـ GET تكون في الـ request line (الـ query string)، وبيانات الـ POST في الـ body.',
      'مجموعات الـ Status: 2xx نجاح، و 3xx redirect، و 4xx غلط الـ client، و 5xx غلط الـ server.'
    ],
    exam: [
      'اقرا HTTP request خام وطلّع: الـ method، والـ path، والـ host، والـ query string، والـ Content-Type، والـ Content-Length.',
      'سؤال قصير: اوصف تركيبة الـ HTTP request والـ response.',
      'MCQ: طابق الـ status codes (200 و 301 و 302 و 404 و 500) والـ headers (Location و Set-Cookie) مع معناها.'
    ],
    mistakes: [
      'الـ request line فيه الـ path بس، والـ domain يكون header.',
      'بس الـ GET يحط بيانات الـ form في الـ query string.',
      'الـ 4xx يلوم الـ request، والـ 5xx يلوم الـ server.'
    ],
    summary: [
      'الـ Request line / الـ status line، والـ headers، وسطر فاضي، والـ body.',
      'الـ GET في الـ URL، والـ POST في الـ body.',
      '2xx / 3xx / 4xx / 5xx.'
    ],
    recall: [
      { q: R`في [[GET /books.php?id=7 HTTP/1.1]]، شنو الـ query string؟`, why: 'هو الجزء اللي بعد ? في الـ path.' },
      { q: 'أي header يقول للـ server الـ request حق أي domain؟', why: 'الـ Host لازم في HTTP/1.1.' },
      { q: 'شنو يفصل الـ headers عن الـ body؟', o: ['semicolon', 'سطر فاضي', 'كلمة BODY', 'الـ Content-Length'], why: 'السطر الفاضي ينهي الـ headers.' },
      { q: 'response فيه status 302 و header اسمه Location. شنو يسوي الـ browser؟', o: ['يعرض error', 'يطلب الـ URL اللي في الـ Location', 'يحذف الـ cookies حقته', 'يعيد نفس الـ request'], why: 'الـ 3xx مع Location يعني redirect.' }
    ],
    challenge: R`اكتب [[function parseRequest(text)]] اللي تقرا HTTP request خام (الأسطر مفصولة بـ [["\n"]] أو [["\r\n"]]) وترجّع:
- [[method]]، و [[path]] (بدون الـ query string)، و [[version]] (مثل [["HTTP/1.1"]])
- [[query]]: النص اللي بعد [[?]] في الـ request line، أو [[""]]
- [[host]]: قيمة الـ header حق [[Host]]
- [[contentType]]: قيمة [[Content-Type]]، أو [[""]] إذا مو موجود
- [[contentLength]]: قيمة [[Content-Length]] كـ **رقم**، أو [[0]] إذا مو موجود
- [[body]]: كل شي بعد أول سطر فاضي، أو [[""]]
وأسماء الـ headers مو حساسة لحجم الحروف ([[host:]] تنحسب مثل [[Host:]]).`
  };
})();

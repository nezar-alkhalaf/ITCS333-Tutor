/* Module 00: How the web works (Ch 1–2). Concepts that the final asks as MCQs and short answers. */
(() => {
  const R = String.raw;
  /* deep equality that ignores key order */
  const sorted = v => v && typeof v === 'object' && !Array.isArray(v) ? Object.keys(v).sort().reduce((o, k) => (o[k] = sorted(v[k]), o), {}) : v;
  const near = (a, b) => JSON.stringify(sorted(a)) === JSON.stringify(sorted(b));

  LESSONS.push({
    id: 'web-basics', module: 'web', title: 'Clients, servers, URLs and DNS',
    big: R`Before PHP, databases or sessions make sense, you need the picture of what happens when someone types an address and presses Enter. A **client** (the browser) asks, a **server** answers, and a few systems in between (DNS, TCP/IP, ports) make sure the question reaches the right machine.`,
    simple: R`**Internet vs Web.** The **Internet** is the global network of connected computers (cables, routers, IP addresses). The **Web** is one service that runs on it: pages linked together and fetched with **HTTP**. Email and video calls are other services on the same Internet.

**Client–server.** The **client** sends a **request**; the **server** sends back a **response**. A **web server** (e.g. Apache, Nginx) listens for requests and returns files or the output of programs such as PHP.
- **Static** page: the same file for everyone (HTML, CSS, images).
- **Dynamic** page: built for each request by server code (PHP reading a database).

**URL** (Uniform Resource Locator), e.g. [[https://www.uob.edu.bh:443/courses/list.php?dept=it&year=2#top]]
- [[https]] → protocol (scheme)
- [[www.uob.edu.bh]] → domain name (host)
- [[443]] → port (optional: 80 is the default for http, 443 for https)
- [[/courses/list.php]] → path
- [[dept=it&year=2]] → query string (name=value pairs joined by &)
- [[top]] → fragment: a place inside the page; it is **not** sent to the server.

**IP address**: the numeric address of a machine, e.g. [[193.188.97.10]] (IPv4) or a longer IPv6 address.

**DNS** (Domain Name System) turns a domain name into an IP address:
1. The browser checks its own cache, then the operating system's.
2. If unknown, it asks a **DNS resolver** (usually the ISP's).
3. The resolver asks the **root** server → the **.bh TLD** server → the **authoritative** server for uob.edu.bh.
4. The IP comes back and is cached for a while (the TTL). Now the browser can connect.`,
    simpler: R`Visiting a website is like posting a letter.

- The **URL** is the full address on the envelope: which service ([[https]]), which building ([[www.uob.edu.bh]]), which door ([[:443]]), which room ([[/courses/list.php]]), and a note for the person inside ([[?dept=it]]).
- **DNS** is the phone book that turns the building's name into its GPS numbers (the IP address).
- The **server** is the office in that building that reads your letter and posts a reply back to you, the **client**.`,
    deeper: [
      { try: { mode: 'js', task: R`Change the address in [[u]] (remove the port, use http, add more query parameters) and run it. The browser's own URL parser splits it for you.`, js: R`const u = new URL('https://www.uob.edu.bh:443/courses/list.php?dept=it&year=2#top');

console.log('protocol:', u.protocol);    // https:
console.log('host:', u.hostname);        // www.uob.edu.bh
console.log('port:', u.port || '(default)');
console.log('path:', u.pathname);        // /courses/list.php
console.log('query:', u.search);         // ?dept=it&year=2
console.log('dept =', u.searchParams.get('dept'));
console.log('fragment:', u.hash);        // #top` } },
      R`**What happens when you press Enter** (a favourite short answer):
1. The browser reads the URL.
2. **DNS** turns the domain into an IP address.
3. The browser opens a **TCP** connection to that IP on the port (80 or 443); for https, a **TLS** handshake sets up encryption.
4. It sends an **HTTP request** (next lesson).
5. The server runs the code for that path (for example a PHP file) and sends an **HTTP response**.
6. The browser reads the HTML, requests the CSS, JS and images it mentions (more requests), then shows the page.`,
      R`**Ports** let one machine run several services: 80 HTTP, 443 HTTPS, 21 FTP, 22 SSH, 25 SMTP (email), 3306 MySQL. When the port is the default for the protocol it is left out of the URL.`
    ],
    points: [
      'Internet = the network; Web = linked pages served over HTTP on it.',
      'Client sends a request; server returns a response.',
      'Static pages are the same files for all; dynamic pages are built per request by server code.',
      'URL parts: protocol, domain, port, path, query string, fragment.',
      'The fragment (#…) is never sent to the server.',
      'DNS maps a domain name to an IP address: cache → resolver → root → TLD → authoritative.',
      'Default ports: 80 for http, 443 for https.'
    ],
    exam: [
      'MCQ: label the parts of a given URL.',
      'Short answer: what happens when you type a URL and press Enter (DNS, connection, request, response, rendering).',
      'MCQ: the difference between the Internet and the Web; between static and dynamic pages.'
    ],
    mistakes: [
      { lang: 'text', wrong: R`The query string is ?dept=it#top`, right: R`The query string is dept=it; #top is the fragment`, why: 'The fragment starts at # and stays in the browser.' },
      { lang: 'text', wrong: R`DNS sends the web page to the browser.`, right: R`DNS only returns the IP address; the web server sends the page.`, why: 'DNS is a lookup service, not a web server.' },
      { lang: 'text', wrong: R`The Internet and the Web are the same thing.`, right: R`The Web is one service that runs on the Internet.`, why: 'Email, FTP and video calls also use the Internet without being the Web.' }
    ],
    summary: [
      'Client → request → server → response.',
      'URL = protocol://domain:port/path?query#fragment.',
      'DNS: name → IP.'
    ],
    recall: [
      { q: R`In [[http://shop.bh:8080/cart.php?id=5#items]], what is the port?`, o: ['80', '8080', '5', 'items'], a: 1, why: 'The number after the colon that follows the domain.' },
      { q: 'Which part of a URL is not sent to the server?', o: ['The path', 'The query string', 'The fragment', 'The domain'], a: 2, why: 'The browser keeps the #fragment to itself.' },
      { q: 'What does DNS do?', o: ['Encrypts traffic', 'Turns domain names into IP addresses', 'Stores web pages', 'Runs PHP'], a: 1, why: 'It is the Internet\'s phone book.' },
      { q: 'Which is a dynamic page?', o: ['logo.png', 'style.css', 'A PHP page that lists products from a database', 'about.html'], a: 2, why: 'It is built by server code for each request.' }
    ],
    challenge: {
      task: R`Write [[function urlParts(address)]] that returns an object with:
- [[protocol]]: [["https"]] or [["http"]] (no colon)
- [[domain]]: e.g. [["www.uob.edu.bh"]]
- [[port]]: a **number**; when the URL has none, use the default (80 for http, 443 for https)
- [[path]]: e.g. [["/courses/list.php"]] ([["/"]] when empty)
- [[query]]: an object of the query parameters, e.g. [[{ dept: "it", year: "2" }]] ([[{}]] when none)
- [[fragment]]: the text after #, without the #, or [[""]]
You may use [[new URL(address)]].`,
      mode: 'js', tabs: ['js'],
      starter: { js: R`function urlParts(address) {

}
` },
      exports: ['urlParts'],
      checks: [
        { d: R`A full URL is split into all six parts`, t: (d, w) => near(w.__exp.urlParts('https://www.uob.edu.bh:8443/courses/list.php?dept=it&year=2#top'), { protocol: 'https', domain: 'www.uob.edu.bh', port: 8443, path: '/courses/list.php', query: { dept: 'it', year: '2' }, fragment: 'top' }) },
        { d: R`https without a port → port 443`, t: (d, w) => w.__exp.urlParts('https://example.com/a').port === 443 },
        { d: R`http without a port → port 80, path "/" and empty query and fragment`, t: (d, w) => near(w.__exp.urlParts('http://shop.bh'), { protocol: 'http', domain: 'shop.bh', port: 80, path: '/', query: {}, fragment: '' }) },
        { d: R`The port is a number, not a string`, t: (d, w) => typeof w.__exp.urlParts('http://a.bh:8080/x').port === 'number' && w.__exp.urlParts('http://a.bh:8080/x').port === 8080 },
        { d: R`Query values are decoded ([[q=web+dev]] → "web dev")`, t: (d, w) => w.__exp.urlParts('https://a.bh/s?q=web+dev&n=1').query.q === 'web dev' }
      ],
      solution: { js: R`function urlParts(address) {
  const u = new URL(address);
  const protocol = u.protocol.replace(':', '');
  let port = Number(u.port);
  if (!u.port) {
    port = protocol === 'https' ? 443 : 80;
  }
  const query = {};
  u.searchParams.forEach(function (value, key) {
    query[key] = value;
  });
  return {
    protocol: protocol,
    domain: u.hostname,
    port: port,
    path: u.pathname || '/',
    query: query,
    fragment: u.hash.replace('#', '')
  };
}` }
    }
  });

  LESSONS.push({
    id: 'web-http', module: 'web', title: 'Reading HTTP: the request and the response',
    big: R`Every page view, every form post and every [[fetch]] is an **HTTP request** answered by an **HTTP response**. Both are plain text with the same three parts. If you can read them line by line, you understand what [[$_GET]], [[$_POST]], [[$_COOKIE]], [[header()]] and status codes really are.`,
    simple: R`**A request**
1. **Request line**: method, path (with the query string), version: [[GET /search.php?q=php HTTP/1.1]]
2. **Headers**, one per line, [[Name: value]]:
   - [[Host]] (required): the domain asked for
   - [[User-Agent]]: which browser
   - [[Accept]]: which formats it wants
   - [[Cookie]]: cookies the browser holds for this site
   - [[Content-Type]] and [[Content-Length]]: describe the **body**, when there is one
3. An **empty line**, then the **body** (for POST: the form data, e.g. [[name=Ali&age=20]]; or JSON).

**A response**
1. **Status line**: version, code, reason: [[HTTP/1.1 200 OK]]
2. **Headers**: [[Content-Type: text/html; charset=UTF-8]], [[Content-Length]], [[Set-Cookie]], [[Location]] (with redirects), [[Cache-Control]]
3. An empty line, then the **body** (the HTML, the JSON, the image).

**Methods**: GET (read), POST (send / create), PUT (replace), DELETE (remove), HEAD (headers only).
**Status groups**: 1xx info, 2xx success (200, 201), 3xx redirect (301 moved permanently, 302 found, 304 not modified), 4xx client error (400, 401, 403, 404), 5xx server error (500, 503).

HTTP is **stateless** (Chapter 15): each request carries everything the server needs, which is why cookies travel in every request.`,
    simpler: R`An HTTP request is a **form you hand in at a counter**:
- the top line says what you want ("GET me /search.php"),
- the headers are the boxes about you (which browser, which language, your membership cards = cookies),
- then a blank line, and anything attached (the body).

The response is the **reply slip**: a status at the top (200 = here you go, 404 = no such thing), its own boxes (what type of content, cookies to keep, "go to another counter" = Location), a blank line, and the content itself.`,
    deeper: [
      R`**A form post, as it travels.** The form [[<form method="post" action="/login.php">]] with two fields sends:`,
      { code: R`POST /login.php HTTP/1.1
Host: www.uob.edu.bh
User-Agent: Mozilla/5.0 (Windows NT 10.0)
Content-Type: application/x-www-form-urlencoded
Content-Length: 27
Cookie: PHPSESSID=8f3a2c1e

email=ali%40uob.bh&pass=abc`, lang: 'http' },
      R`PHP reads this request for you: the body becomes [[$_POST["email"]]] (decoded to [[ali@uob.bh]]), the Cookie header becomes [[$_COOKIE["PHPSESSID"]]], and [[$_SERVER["REQUEST_METHOD"]]] is [["POST"]]. [[Content-Length: 27]] is the number of bytes in the body.`,
      { code: R`HTTP/1.1 302 Found
Date: Sun, 27 Dec 2026 05:31:02 GMT
Location: /dashboard.php
Set-Cookie: PHPSESSID=b71d09aa; path=/; HttpOnly
Content-Type: text/html; charset=UTF-8
Content-Length: 0
`, lang: 'http' },
      R`This response is what [[header("Location: /dashboard.php")]] and [[session_regenerate_id()]] produce: status 302, a [[Location]] header that the browser follows with a new GET, and a new session cookie.`,
      { try: { mode: 'js', task: R`Run it to see the headers of a real response (from the practice API). Change the address to [[/api/missing]] or [[/api/error]].`, js: R`fetch('/api/students/1').then(function (response) {
  console.log('status line: HTTP/1.1', response.status, response.statusText || '');
  response.headers.forEach(function (value, name) {
    console.log(name + ': ' + value);
  });
  return response.text();
}).then(function (body) {
  console.log('');
  console.log('body: ' + body);
});` } }
    ],
    points: [
      'Request = request line + headers + empty line + optional body.',
      'Response = status line + headers + empty line + body.',
      'Host is required in HTTP/1.1; Cookie carries cookies to the server; Set-Cookie sends new ones.',
      'Content-Type says what the body is; Content-Length says how many bytes.',
      'GET data is in the request line (query string); POST data is in the body.',
      'Status groups: 2xx success, 3xx redirect, 4xx client error, 5xx server error.'
    ],
    exam: [
      'Read a raw HTTP request and give: the method, the path, the host, the query string, the Content-Type and the Content-Length.',
      'Short answer: describe the anatomy of an HTTP request and response.',
      'MCQ: match status codes (200, 301, 302, 404, 500) and headers (Location, Set-Cookie) to their meaning.'
    ],
    mistakes: [
      { lang: 'text', wrong: R`The Host of "GET /a.php HTTP/1.1" is /a.php`, right: R`/a.php is the path; the host is in the Host: header`, why: 'The request line has the path only; the domain is a header.' },
      { lang: 'text', wrong: R`A POST sends its data in the URL.`, right: R`A POST sends its data in the body, after the empty line.`, why: 'Only GET puts form data in the query string.' },
      { lang: 'text', wrong: R`404 means the server crashed.`, right: R`404 = not found (client asked for something missing); 500 = the server failed.`, why: '4xx blames the request, 5xx the server.' }
    ],
    summary: [
      'Request line / status line, headers, blank line, body.',
      'GET in the URL, POST in the body.',
      '2xx / 3xx / 4xx / 5xx.'
    ],
    recall: [
      { q: R`In [[GET /books.php?id=7 HTTP/1.1]], what is the query string?`, o: [R`[[/books.php]]`, R`[[id=7]]`, R`[[HTTP/1.1]]`, R`[[GET]]`], a: 1, why: 'It is the part after ? in the path.' },
      { q: 'Which header tells the server which domain the request is for?', o: ['Location', 'Host', 'Accept', 'Referer'], a: 1, why: 'Host is required in HTTP/1.1.' },
      { q: 'What separates the headers from the body?', o: ['A semicolon', 'An empty line', 'The word BODY', 'Content-Length'], a: 1, why: 'A blank line ends the headers.' },
      { q: 'A response has status 302 and a Location header. What does the browser do?', o: ['Shows an error', 'Requests the URL in Location', 'Deletes its cookies', 'Retries the same request'], a: 1, why: '3xx with Location is a redirect.' }
    ],
    challenge: {
      task: R`Write [[function parseRequest(text)]] that reads a raw HTTP request (lines separated by [["\n"]] or [["\r\n"]]) and returns:
- [[method]], [[path]] (without the query string), [[version]] (e.g. [["HTTP/1.1"]])
- [[query]]: the text after [[?]] in the request line, or [[""]]
- [[host]]: the value of the [[Host]] header
- [[contentType]]: the value of [[Content-Type]], or [[""]] if missing
- [[contentLength]]: the value of [[Content-Length]] as a **number**, or [[0]] if missing
- [[body]]: everything after the first empty line, or [[""]]
Header names are case-insensitive ([[host:]] counts as [[Host:]]).`,
      mode: 'js', tabs: ['js'],
      starter: { js: R`function parseRequest(text) {

}
` },
      exports: ['parseRequest'],
      checks: [
        { d: R`A GET request: method, path, query, version and host`, t: (d, w) => { const r = w.__exp.parseRequest('GET /search.php?q=php&page=2 HTTP/1.1\nHost: www.uob.edu.bh\nUser-Agent: Firefox\n\n'); return r && r.method === 'GET' && r.path === '/search.php' && r.query === 'q=php&page=2' && r.version === 'HTTP/1.1' && r.host === 'www.uob.edu.bh'; } },
        { d: R`A GET request has contentType "", contentLength 0 and body ""`, t: (d, w) => { const r = w.__exp.parseRequest('GET / HTTP/1.1\nHost: a.bh\n\n'); return r && r.contentType === '' && r.contentLength === 0 && r.body === '' && r.query === '' && r.path === '/'; } },
        { d: R`A POST request: content type, length (a number) and body`, t: (d, w) => { const r = w.__exp.parseRequest('POST /login.php HTTP/1.1\nHost: shop.bh\nContent-Type: application/x-www-form-urlencoded\nContent-Length: 20\n\nemail=a%40b.c&pass=x'); return r && r.method === 'POST' && r.contentType === 'application/x-www-form-urlencoded' && r.contentLength === 20 && r.body === 'email=a%40b.c&pass=x'; } },
        { d: R`Works with "\r\n" line ends`, t: (d, w) => { const r = w.__exp.parseRequest('POST /api/students HTTP/1.1\r\nHost: uob.bh\r\nContent-Type: application/json\r\nContent-Length: 15\r\n\r\n{"name":"Nora"}'); return r && r.host === 'uob.bh' && r.contentType === 'application/json' && r.contentLength === 15 && r.body === '{"name":"Nora"}'; } },
        { d: R`Header names are case-insensitive, and values keep their colons ([[host: localhost:8080]])`, t: (d, w) => { const r = w.__exp.parseRequest('DELETE /items/3 HTTP/1.1\nhost: localhost:8080\ncontent-length: 0\n\n'); return r && r.method === 'DELETE' && r.host === 'localhost:8080' && r.contentLength === 0; } }
      ],
      solution: { js: R`function parseRequest(text) {
  const normal = text.replace(/\r\n/g, '\n');
  const blank = normal.indexOf('\n\n');
  const head = blank === -1 ? normal : normal.slice(0, blank);
  const body = blank === -1 ? '' : normal.slice(blank + 2);
  const lines = head.split('\n');

  const first = lines[0].split(' ');
  const target = first[1];
  const q = target.indexOf('?');

  const headers = {};
  for (const line of lines.slice(1)) {
    const colon = line.indexOf(':');
    if (colon > 0) {
      headers[line.slice(0, colon).trim().toLowerCase()] = line.slice(colon + 1).trim();
    }
  }

  return {
    method: first[0],
    path: q === -1 ? target : target.slice(0, q),
    query: q === -1 ? '' : target.slice(q + 1),
    version: first[2],
    host: headers['host'] || '',
    contentType: headers['content-type'] || '',
    contentLength: Number(headers['content-length'] || 0),
    body: body
  };
}` }
    }
  });
})();

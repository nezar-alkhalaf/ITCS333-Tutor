/* PHP in the browser. Lazy: nothing is downloaded until the first PHP run.
   Runtime: php-wasm (seanmorris) with the PDO SQLite extension, pinned below and loaded from jsDelivr.
   One "visitor" = a cookie jar. Each request runs the script from scratch, like a real server:
   $_GET / $_POST / $_COOKIE / $_SERVER are filled from the fake request, sessions are kept in the
   runtime's own files, and Set-Cookie / Location headers are captured instead of being sent. */
const PHPRUN = (() => {
  const CDN = 'https://cdn.jsdelivr.net/npm/';
  const PIN = { core: 'php-wasm@0.2.0', sqlite: 'php-wasm-sqlite@0.2.0', php: '8.4' };
  const MARK = '\u001e\u001eWDL';

  const BOOT = `<?php
ob_start();
error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('html_errors', '1');
date_default_timezone_set('Asia/Bahrain');
final class SandboxPDO extends PDO {
  public static $cfg = null;
  public static $done = false;
  public static $died = false;
  public function __construct($dsn, $username = null, $password = null, $options = null) {
    if (preg_match('/^mysql:/i', (string) $dsn)) {
      $c = self::$cfg;
      $name = preg_match('/dbname=([^;]+)/i', $dsn, $m) ? trim($m[1]) : '';
      if ($c && isset($c['user']) && ($username !== $c['user'] || (string) $password !== (string) ($c['pass'] ?? ''))) {
        throw new PDOException("SQLSTATE[HY000] [1045] Access denied for user '" . $username . "'@'localhost' (using password: " . ($password ? 'YES' : 'NO') . ")");
      }
      if (!$c || $name !== $c['name']) {
        throw new PDOException("SQLSTATE[HY000] [1049] Unknown database '" . $name . "'");
      }
      parent::__construct('sqlite:/tmp/db/' . $name . '.sqlite', null, null, $options);
      return;
    }
    parent::__construct($dsn, $username, $password, $options);
  }
}
final class SandboxExit extends Error {}
function __wdl_exit($status = '') { if (is_string($status)) echo $status; SandboxPDO::$died = true; throw new SandboxExit(); }
function __wdl_is_uploaded($f) { return is_string($f) && strpos($f, '/tmp/uploads/') === 0 && is_file($f); }
function __wdl_move_uploaded($from, $to) {
  if (!__wdl_is_uploaded($from)) return false;
  if (!is_dir(dirname($to))) { trigger_error("move_uploaded_file($to): Failed to open stream: No such file or directory", E_USER_WARNING); return false; }
  return rename($from, $to);
}
(function () {
  $r = json_decode(file_get_contents('/www/__req.json'), true);
  SandboxPDO::$cfg = $r['db'];
  $_GET = []; $_POST = [];
  parse_str($r['query'], $_GET);
  if ($r['method'] === 'POST') parse_str($r['body'], $_POST);
  $_COOKIE = $r['cookies'];
  $_REQUEST = array_merge($_GET, $_POST);
  $_FILES = [];
  foreach (($r['files'] ?? []) as $field => $f) {
    $_FILES[$field] = ['name' => $f['name'], 'full_path' => $f['name'], 'type' => $f['type'], 'tmp_name' => $f['tmp_name'], 'error' => $f['error'], 'size' => $f['size']];
  }
  $_SERVER['REQUEST_METHOD'] = $r['method'];
  $_SERVER['REMOTE_ADDR'] = $r['ip'];
  $_SERVER['QUERY_STRING'] = $r['query'];
  $_SERVER['REQUEST_URI'] = '/index.php' . ($r['query'] !== '' ? '?' . $r['query'] : '');
  $_SERVER['PHP_SELF'] = '/index.php';
  $_SERVER['SCRIPT_NAME'] = '/index.php';
  $_SERVER['SCRIPT_FILENAME'] = '/www/index.php';
  $_SERVER['HTTP_HOST'] = 'localhost';
  $_SERVER['SERVER_NAME'] = 'localhost';
  $_SERVER['HTTP_USER_AGENT'] = 'ITCS333-Tutor sandbox';
  $_SERVER['REQUEST_TIME'] = time();
  if ($r['method'] === 'POST') $_SERVER['CONTENT_TYPE'] = $_FILES ? 'multipart/form-data' : 'application/x-www-form-urlencoded';
})();
register_shutdown_function(function () {
  $body = '';
  while (ob_get_level() > 0) { $body = ob_get_clean() . $body; }
  echo $body, "${MARK}", json_encode(['headers' => headers_list(), 'status' => http_response_code(), 'done' => SandboxPDO::$done, 'died' => SandboxPDO::$died]);
});
set_include_path('/www');
`;

  let booting = null, php = null, FS = null, buf = '';
  let chain = Promise.resolve();

  function load() {
    if (!booting) booting = (async () => {
      const [core, sq] = await Promise.all([import(CDN + PIN.core + '/PhpWeb.mjs'), import(CDN + PIN.sqlite + '/index.mjs')]);
      php = new core.PhpWeb({ version: PIN.php, sharedLibs: [sq.default], autoTransaction: false });
      php.addEventListener('output', e => { buf += e.detail.join(''); });
      php.addEventListener('error', e => { buf += e.detail.join(''); });
      FS = (await php.binary).FS;
      ['/www', '/www/uploads', '/tmp', '/tmp/db', '/tmp/uploads'].forEach(d => { if (!FS.analyzePath(d).exists) FS.mkdir(d); });
      /* scripts run with the folder "/" as the working folder (changing it breaks loading the SQLite driver),
         so a relative "uploads/x.jpg" is linked to the site's own uploads folder */
      if (!FS.analyzePath('/uploads').exists) FS.symlink('/www/uploads', '/uploads');
      FS.writeFile('/www/__boot.php', BOOT);
    })().catch(e => { booting = null; throw e; });
    return booting;
  }

  /* run raw PHP once, in a clean request; returns everything it printed */
  async function raw(code) {
    buf = '';
    try { await php.run(code); } catch (e) { buf += '\n<b>Fatal error</b>: ' + (e && e.message || e); }
    try { await php.refresh(); } catch (e) { /* the next run reports it */ }
    php.flush();
    const out = buf; buf = '';
    return out;
  }
  const phpStr = s => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
  /* Two small source rewrites, applied only to real PHP code (never inside strings, comments or HTML):
     1. The exam writes new PDO("mysql:..."). The sandbox has SQLite only, so "new PDO" goes through a subclass
        that maps the mysql: DSN to the lesson's SQLite database. Every other PDO call is unchanged.
     2. die() / exit() become a sandbox function that prints the message and stops the script, because a real
        exit would also skip the code that reports cookies and headers back to the page. */
  const rewrite = src => U.phpScan(src).map(p => p.t !== 'code' ? p.s : p.s
    .replace(/\bnew\s+\\?PDO\s*\(/gi, 'new SandboxPDO(')
    .replace(/\bmove_uploaded_file\s*\(/gi, '__wdl_move_uploaded(')
    .replace(/\bis_uploaded_file\s*\(/gi, '__wdl_is_uploaded(')
    .replace(/(?<![\w$>:\\])(?:die|exit)\b(\s*\()?/gi, (m, par) => par ? '__wdl_exit(' : '__wdl_exit()')).join('');
  const rm = p => { try { FS.unlink(p); } catch (e) { /* not there */ } };

  function clearDir(dir) {
    FS.readdir(dir).forEach(n => { if (n !== '.' && n !== '..') { try { FS.unlink(dir + '/' + n); } catch (e) { /* a folder */ } } });
  }
  async function seed(db) {
    clearDir('/tmp/db');
    clearDir('/www/uploads');
    if (!db) return '';
    return raw('<?php try { $d = new PDO(' + phpStr('sqlite:/tmp/db/' + db.name + '.sqlite') + '); $d->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); $d->exec(' + phpStr(db.sql) + '); } catch (Exception $e) { echo "SEED ERROR: ", $e->getMessage(); }');
  }

  function parseCookie(line, jar) {
    const parts = line.split(';').map(s => s.trim());
    const eq = parts[0].indexOf('='); if (eq < 0) return;
    const name = parts[0].slice(0, eq);
    let value = parts[0].slice(eq + 1);
    try { value = decodeURIComponent(value.replace(/\+/g, ' ')); } catch (e) { /* keep raw */ }
    const c = { name, value, expires: null, httponly: false, secure: false };
    let gone = value === 'deleted';
    parts.slice(1).forEach(p => {
      const [k, v] = p.split('='), key = k.toLowerCase();
      if (key === 'max-age') { const n = parseInt(v, 10); if (n <= 0) gone = true; else c.expires = Date.now() + n * 1000; }
      else if (key === 'expires' && c.expires === null) { const d = Date.parse(v); if (!isNaN(d)) { if (d <= Date.now()) gone = true; else c.expires = d; } }
      else if (key === 'httponly') c.httponly = true;
      else if (key === 'secure') c.secure = true;
    });
    if (gone) delete jar[name]; else jar[name] = c;
    return { name, value, deleted: gone, expires: c.expires, httponly: c.httponly, secure: c.secure };
  }

  const ERR_RE = /<b>(Warning|Notice|Deprecated|Fatal error|Parse error)<\/b>:\s+([\s\S]*?) in <b>([^<]*)<\/b> on line <b>(\d+)<\/b>/g;

  async function one(code, req, visitor, o) {
    const cookies = {};
    Object.values(visitor.jar).forEach(c => { if (!c.expires || c.expires > Date.now()) cookies[c.name] = c.value; });
    Object.assign(cookies, req.cookies || {});
    /* uploaded files: {field: {name, type, size?, content? (text) | data? (base64), error?}} → temp files + $_FILES */
    clearDir('/tmp/uploads');
    const files = {};
    Object.entries(req.files || {}).forEach(([field, f], i) => {
      const error = f.error || 0;
      let bytes = new Uint8Array(0), tmp = '';
      if (!error) {
        bytes = f.data ? Uint8Array.from(atob(f.data), c => c.charCodeAt(0)) : new TextEncoder().encode(f.content || '');
        tmp = '/tmp/uploads/php' + (Date.now() % 100000) + i;
        FS.writeFile(tmp, bytes);
      }
      files[field] = { name: f.name || '', type: f.type || '', size: f.size !== undefined ? f.size : bytes.length, tmp_name: tmp, error };
    });
    FS.writeFile('/www/__req.json', JSON.stringify({ files,
      method: (req.method || (req.body ? 'POST' : 'GET')).toUpperCase(), query: req.query || '', body: req.body || '',
      ip: req.ip || '127.0.0.1', cookies: Object.keys(cookies).length ? cookies : {}, db: o.db ? { name: o.db.name, user: o.db.user, pass: o.db.pass } : null
    }));
    FS.writeFile('/www/index.php', rewrite(code));
    Object.entries(o.files || {}).forEach(([n, c]) => FS.writeFile('/www/' + n, rewrite(c)));
    const out = await raw("<?php require '/www/__boot.php'; try { require '/www/index.php'; } catch (SandboxExit $e) { } SandboxPDO::$done = true;");
    const at = out.lastIndexOf(MARK);
    let body = at < 0 ? out : out.slice(0, at) + out.slice(at).replace(/^[^\n]*\n?/, '');
    let meta = { headers: [], status: 200, done: false, died: false };
    if (at >= 0) { try { meta = JSON.parse(out.slice(at + MARK.length).split('\n')[0]); } catch (e) { /* keep defaults */ } }
    const res = { html: body, status: meta.status || 200, headers: meta.headers.filter(h => !/^X-Powered-By/i.test(h)), setCookies: [], redirect: null, died: !!meta.died, stopped: !meta.done, errors: [], session: null, cookies: {} };
    meta.headers.forEach(h => {
      const m = h.match(/^([\w-]+):\s*(.*)$/); if (!m) return;
      if (/^set-cookie$/i.test(m[1])) { const c = parseCookie(m[2], visitor.jar); if (c) res.setCookies.push(c); }
      if (/^location$/i.test(m[1])) res.redirect = m[2];
    });
    let m; ERR_RE.lastIndex = 0;
    while ((m = ERR_RE.exec(body))) res.errors.push({ level: m[1], msg: m[2].replace(/<[^>]+>/g, ''), line: /index\.php$/.test(m[3]) ? +m[4] : null, file: m[3].replace('/www/', '') });
    if (res.errors.some(e => /Fatal|Parse/.test(e.level))) res.stopped = true;
    Object.values(visitor.jar).forEach(c => { res.cookies[c.name] = c.value; });
    const sid = visitor.jar.PHPSESSID && visitor.jar.PHPSESSID.value;
    if (sid && /^[\w,-]+$/.test(sid)) {
      const s = await raw("<?php ini_set('session.use_cookies', '0'); session_id('" + sid + "'); session_start(['read_and_close' => true]); echo json_encode((object) $_SESSION);");
      try { res.session = JSON.parse(s); } catch (e) { res.session = null; }
    }
    res.text = body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return res;
  }

  /* A visitor keeps cookies (and through PHPSESSID, the session) between requests. */
  const visitor = () => ({ jar: {}, n: 0 });

  /* send(code, req, visitor, opts) -> result. opts: { db:{name,sql,user?,pass?}, files:{name:code}, reseed:boolean } */
  function send(code, req, v, o = {}) {
    const job = chain.then(async () => {
      await load();
      if (o.reseed) await seed(o.db);
      rm('/www/__req.json');
      v.n++;
      return one(code, req || {}, v, o);
    });
    chain = job.catch(() => {});
    return job;
  }

  /* play(code, requests, opts): a new visitor sends the requests in order against a freshly seeded database. */
  async function play(code, requests, o = {}) {
    const v = visitor(), out = [];
    for (let i = 0; i < requests.length; i++) out.push(await send(code, requests[i], v, Object.assign({}, o, { reseed: i === 0 })));
    return out;
  }

  /* forget the visitor's server-side session files */
  function reset() { return chain = chain.then(async () => { await load(); try { clearDir('/tmp'); } catch (e) { /* nothing */ } }).catch(() => {}); }

  return { load, send, play, visitor, reset, PIN, loaded: () => !!php };
})();

/* Module 10 (Databases & PDO), extra lesson: file uploads with $_FILES, saved to a folder and recorded in the database.
   The PHP runner fakes uploads: a request can carry files, and a file chosen in the preview's form is sent too. */
(() => {
  const R = String.raw;
  const GALLERY_SQL = `CREATE TABLE photos (id INTEGER PRIMARY KEY, filename VARCHAR(100), size INT);`;
  const db = { name: 'gallery', user: 'root', pass: '', sql: GALLERY_SQL };
  const files = { 'connection.php': R`<?php
$db = new PDO("mysql:host=localhost;dbname=gallery;charset=utf8", "root", "");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>` };
  const clean = rs => rs.every(r => !r.errors.length);
  const tx = (r, sel) => { const e = r && r.doc.querySelector(sel); return e ? e.textContent.replace(/\s+/g, ' ').trim() : null; };
  const all = (r, sel) => r ? [...r.doc.querySelectorAll(sel)].map(e => e.textContent.replace(/\s+/g, ' ').trim()) : [];
  const code = src => U.phpScan(src).filter(p => p.t === 'code').map(p => p.s).join(' ');
  const pic = (name, type, size, content) => ({ name, type, size, content: content || 'IMAGE-BYTES' });

  LESSONS.push({
    id: 'db-upload', module: 'db', title: 'File uploads with $_FILES (and saving them in the database)',
    big: R`Profile pictures, assignments, product photos: a site often lets users **upload files**. The browser sends the file inside a POST request; PHP stores it in a **temporary file** and describes it in [[$_FILES]]. Your code checks it, moves it into a folder with [[move_uploaded_file()]], and usually records it in the database. A full past-paper question follows exactly these steps.

**In the lab** you can choose a real file in the form inside the result. The checks send pretend files.`,
    simple: R`**The form** needs three things:
[[<form method="post" enctype="multipart/form-data">]] and [[<input type="file" name="pic">]].
Without [[enctype="multipart/form-data"]] only the file **name** is sent, not the file.

**$_FILES["pic"]** is an array:
- [["name"]] → the original file name, e.g. [["cat.jpg"]]
- [["type"]] → the MIME type the browser reports, e.g. [["image/jpeg"]]
- [["size"]] → the size in bytes
- [["tmp_name"]] → where PHP put the temporary copy
- [["error"]] → 0 ([[UPLOAD_ERR_OK]]) when it worked; 4 means no file was chosen

**The usual steps**
1. Check that a file came: [[isset($_FILES["pic"]) && $_FILES["pic"]["error"] == 0]].
2. Check the type (allowed list) and the size (e.g. at most 1 MB = 1048576 bytes).
3. Build the target path: [[$target = "uploads/" . basename($_FILES["pic"]["name"]);]]
4. Refuse to overwrite: [[if (file_exists($target)) …]]
5. [[move_uploaded_file($_FILES["pic"]["tmp_name"], $target)]] → [[true]] if it worked.
6. Record it: a prepared [[INSERT]] with the file name and size.

**Safety**: the name and the type come from the user, so treat them as untrusted: use [[basename()]], check the extension and type, limit the size, and escape the name when you print it.`,
    simpler: R`Uploading is handing a parcel in at a post office counter.

- The form with [[enctype="multipart/form-data"]] is the parcel form; without it you only hand in the **label**.
- PHP keeps the parcel in a **back room** ([[tmp_name]]) and writes its details on a card ([[$_FILES]]: name, type, size, error).
- You inspect it (right type? not too heavy? a parcel with that name already on the shelf?), then **move it to the shelf** with [[move_uploaded_file]], and write it in the register (the database).`,
    deeper: [
      { try: { task: R`Run it, then choose a real file in the form inside the result and press Upload. Read [[$_FILES]] in the output. Then remove [[enctype]] from the form and upload again: only the name arrives, in [[$_POST]].`, php: R`<form method="post" enctype="multipart/form-data">
  <input type="file" name="pic">
  <button type="submit" name="send">Upload</button>
</form>
<?php
if (isset($_POST["send"])) {
  echo "<pre>";
  print_r($_FILES);
  print_r($_POST);
  echo "</pre>";
}
?>`, req: { method: 'POST', body: 'send=', files: { pic: pic('cat.jpg', 'image/jpeg', 2048) } } } },
      R`**The complete pattern**: check, move, then insert. Each Run starts with an empty uploads folder and an empty [[photos]] table.`,
      { try: { task: R`Upload the same file twice in the result: the second time it is refused. Upload a text file: the type check refuses it.`, php: R`<form method="post" enctype="multipart/form-data">
  <input type="file" name="pic"> <button type="submit">Upload</button>
</form>
<?php
require 'connection.php';
if (isset($_FILES["pic"]) && $_FILES["pic"]["error"] == 0) {
  $f = $_FILES["pic"];
  $allowed = ["image/jpeg", "image/png"];
  $target = "uploads/" . basename($f["name"]);
  if (!in_array($f["type"], $allowed)) {
    echo "<p>Only JPEG or PNG images</p>";
  } elseif ($f["size"] > 1048576) {
    echo "<p>File too large (max 1 MB)</p>";
  } elseif (file_exists($target)) {
    echo "<p>File already exists</p>";
  } elseif (move_uploaded_file($f["tmp_name"], $target)) {
    $stmt = $db->prepare("INSERT INTO photos (filename, size) VALUES (:n, :s)");
    $stmt->execute([':n' => basename($f["name"]), ':s' => $f["size"]]);
    echo "<p>Uploaded " . htmlspecialchars($f["name"]) . "</p>";
  } else {
    echo "<p>Upload failed</p>";
  }
}
echo "<ul>";
foreach ($db->query("SELECT filename, size FROM photos") as $p) {
  echo "<li>" . htmlspecialchars($p["filename"]) . " (" . $p["size"] . " bytes)</li>";
}
echo "</ul>";
?>`, req: { method: 'POST', body: '', files: { pic: pic('beach.png', 'image/png', 5120) } }, db, files } }
    ],
    points: [
      'The form needs method="post" and enctype="multipart/form-data", and an input type="file" with a name.',
      '$_FILES["field"] has name, type, size, tmp_name and error (0 = OK, 4 = no file).',
      'Check the error, the type and the size before accepting the file.',
      'file_exists($target) prevents overwriting; move_uploaded_file(tmp_name, target) saves it.',
      'Record the file in the database with a prepared INSERT; escape the name when printing.'
    ],
    exam: [
      R`Full question: read [[$_FILES['pic']['type'|'size'|'name'|'tmp_name']]], check them, use [[file_exists]] and [[move_uploaded_file]], then INSERT the file name.`,
      R`MCQ: which superglobal holds uploaded files ([[$_FILES]]), and what the form needs ([[enctype="multipart/form-data"]]).`
    ],
    mistakes: [
      { lang: 'php', wrong: R`<form method="post">
  <input type="file" name="pic">
</form>`, right: R`<form method="post" enctype="multipart/form-data">
  <input type="file" name="pic">
</form>`, why: 'Without the multipart encoding the file contents are not sent at all.' },
      { lang: 'php', wrong: R`<?php
move_uploaded_file($_FILES["pic"]["name"], "uploads/a.jpg");`, right: R`<?php
move_uploaded_file($_FILES["pic"]["tmp_name"], "uploads/a.jpg");`, why: 'The file is stored at tmp_name; name is only the original file name.' },
      { lang: 'php', wrong: R`<?php
$target = "uploads/" . $_FILES["pic"]["name"];   // trusts the name as given`, right: R`<?php
$target = "uploads/" . basename($_FILES["pic"]["name"]);`, why: 'basename removes any folder parts such as ../ that a crafted name could contain.' }
    ],
    summary: [
      'multipart/form-data + input type="file".',
      '$_FILES: name, type, size, tmp_name, error.',
      'Check → file_exists → move_uploaded_file → INSERT.'
    ],
    recall: [
      { q: 'Which attribute must a form have to upload files?', o: [R`[[method="get"]]`, R`[[enctype="multipart/form-data"]]`, R`[[type="file"]]`, R`[[upload="true"]]`], a: 1, why: 'And method="post".' },
      { q: R`Which key of [[$_FILES["pic"]]] is the temporary path to move from?`, o: ['name', 'type', 'tmp_name', 'path'], a: 2, why: 'move_uploaded_file(tmp_name, target).' },
      { q: R`What does [[$_FILES["pic"]["error"] == 4]] mean?`, o: ['The file is too big', 'No file was chosen', 'The upload succeeded', 'The type is wrong'], a: 1, why: '0 = OK, 4 = no file.' },
      { q: 'Why check file_exists($target) before moving?', o: ['move_uploaded_file needs it', 'To avoid overwriting an existing file', 'To check the size', 'To create the folder'], a: 1, why: 'Otherwise a new upload with the same name replaces the old one.' }
    ],
    challenge: {
      task: R`Complete the upload page (the form is given). When a file is posted in the field [[pic]], print one message in [[<p id="msg">]]:
- no file chosen (error 4): [["No file chosen"]]
- type not [[image/jpeg]] or [[image/png]]: [["Only JPEG or PNG images"]]
- larger than 1 MB (1048576 bytes): [["File too large (max 1 MB)"]]
- the target [[uploads/NAME]] already exists: [["File already exists"]]
- otherwise move it there, insert the file name and size into [[photos]] with a prepared statement, and print [["Uploaded NAME"]]
Always print [[<ul id="photos">]] with one [[<li>]] per row of [[photos]] (just the file name), in insert order.`,
      mode: 'php', tabs: ['php'],
      starter: { php: R`<form method="post" enctype="multipart/form-data">
  <input type="file" name="pic"> <button type="submit">Upload</button>
</form>
<?php
require 'connection.php';

?>` },
      db, files,
      req: { method: 'POST', body: '', files: { pic: pic('cat.jpg', 'image/jpeg', 2048) } },
      requests: [{}, { method: 'POST', body: '', files: { pic: pic('cat.jpg', 'image/jpeg', 2048) } }, { method: 'POST', body: '', files: { pic: pic('cat.jpg', 'image/jpeg', 2048) } }, { method: 'POST', body: '', files: { pic: pic('notes.txt', 'text/plain', 300, 'hello') } }, { method: 'POST', body: '', files: { pic: pic('huge.png', 'image/png', 3000000) } }, { method: 'POST', body: '', files: { pic: { name: '', error: 4 } } }, { method: 'POST', body: '', files: { pic: pic('dog.png', 'image/png', 4096) } }],
      checks: [
        { d: 'First visit: no message and an empty list', t: rs => !rs[0].doc.querySelector('#msg') && !!rs[0].doc.querySelector('ul#photos') && all(rs[0], '#photos li').length === 0 },
        { d: R`cat.jpg → "Uploaded cat.jpg", and it is listed`, t: rs => tx(rs[1], '#msg') === 'Uploaded cat.jpg' && all(rs[1], '#photos li').join() === 'cat.jpg' },
        { d: R`cat.jpg again → "File already exists" (still one row)`, t: rs => tx(rs[2], '#msg') === 'File already exists' && all(rs[2], '#photos li').length === 1 },
        { d: R`notes.txt → "Only JPEG or PNG images"`, t: rs => tx(rs[3], '#msg') === 'Only JPEG or PNG images' },
        { d: R`a 3 MB PNG → "File too large (max 1 MB)"`, t: rs => tx(rs[4], '#msg') === 'File too large (max 1 MB)' },
        { d: R`no file → "No file chosen"`, t: rs => tx(rs[5], '#msg') === 'No file chosen' },
        { d: R`dog.png → uploaded; the list is cat.jpg, dog.png`, t: rs => tx(rs[6], '#msg') === 'Uploaded dog.png' && all(rs[6], '#photos li').join() === 'cat.jpg,dog.png' },
        { d: R`Uses [[$_FILES]], [[file_exists]], [[move_uploaded_file]] and [[prepare]]; no warnings`, t: (rs, src) => /\$_FILES/.test(src) && /file_exists\s*\(/.test(code(src)) && /move_uploaded_file\s*\(/.test(code(src)) && /->\s*prepare\s*\(/.test(code(src)) && clean(rs) }
      ],
      solution: { php: R`<form method="post" enctype="multipart/form-data">
  <input type="file" name="pic"> <button type="submit">Upload</button>
</form>
<?php
require 'connection.php';
if (isset($_FILES["pic"])) {
  $f = $_FILES["pic"];
  $target = "uploads/" . basename($f["name"]);
  if ($f["error"] == 4) {
    echo '<p id="msg">No file chosen</p>';
  } elseif ($f["type"] != "image/jpeg" && $f["type"] != "image/png") {
    echo '<p id="msg">Only JPEG or PNG images</p>';
  } elseif ($f["size"] > 1048576) {
    echo '<p id="msg">File too large (max 1 MB)</p>';
  } elseif (file_exists($target)) {
    echo '<p id="msg">File already exists</p>';
  } elseif (move_uploaded_file($f["tmp_name"], $target)) {
    $stmt = $db->prepare("INSERT INTO photos (filename, size) VALUES (:name, :size)");
    $stmt->execute([':name' => basename($f["name"]), ':size' => $f["size"]]);
    echo '<p id="msg">Uploaded ' . htmlspecialchars($f["name"]) . '</p>';
  }
}
echo '<ul id="photos">';
foreach ($db->query("SELECT filename FROM photos ORDER BY id") as $p) {
  echo "<li>" . htmlspecialchars($p["filename"]) . "</li>";
}
echo "</ul>";
?>` }
    }
  });
})();

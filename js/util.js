/* Shared helpers: escaping, mini-markdown, syntax highlighting, storage, editor, sandboxed runner. */
const U = (() => {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* Mini markdown: paragraphs, "- " lists, [[code]], **bold**. Input is plain text. */
  function md(src) {
    const inline = t => esc(t)
      .replace(/\[\[(.+?)\]\]/g, (_, c) => '<code>' + c + '</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    return String(src).trim().split(/\n\s*\n/).map(block => {
      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      let out = '', para = [], list = [];
      const flushP = () => { if (para.length) out += '<p>' + inline(para.join(' ')) + '</p>'; para = []; };
      const flushL = () => { if (list.length) out += '<ul>' + list.map(l => '<li>' + inline(l) + '</li>').join('') + '</ul>'; list = []; };
      lines.forEach(l => {
        const m = l.match(/^(?:- |\d+\. )(.*)$/);
        if (m) { flushP(); list.push(m[1]); } else { flushL(); para.push(l); }
      });
      flushP(); flushL();
      return out;
    }).join('');
  }

  /* ---------- Highlighter (small, regex based, good enough for teaching) ---------- */
  const span = (c, t) => '<span class="tk-' + c + '">' + esc(t) + '</span>';
  function hlJS(code) {
    const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\[\s\S]|[^`])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|\b(const|let|var|function|return|if|else|for|of|in|while|new|true|false|null|undefined|typeof|class|this|document|window|console)\b|\b(\d+(?:\.\d+)?)\b|([A-Za-z_$][\w$]*)(?=\s*\()|([{}()[\];,.=+\-*/<>!&|?:])/g;
    let out = '', last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      if (m[1]) out += span('com', m[1]);
      else if (m[2]) out += span('str', m[2]);
      else if (m[3]) out += span('kw', m[3]);
      else if (m[4]) out += span('num', m[4]);
      else if (m[5]) out += span('fn', m[5]);
      else out += span('punc', m[6]);
      last = re.lastIndex;
    }
    return out + esc(code.slice(last));
  }
  function hlCSS(code) {
    const re = /(\/\*[\s\S]*?\*\/)|([^{}]+)(\{)|([\w-]+)(\s*:)([^;{}]*)(;?)|(\})/g;
    let out = '', last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      if (m[1]) out += span('com', m[1]);
      else if (m[2] !== undefined && m[3]) out += span('sel', m[2]) + span('punc', '{');
      else if (m[4]) out += span('prop', m[4]) + esc(m[5]) + span('str', m[6]) + span('punc', m[7]);
      else out += span('punc', m[8]);
      last = re.lastIndex;
    }
    return out + esc(code.slice(last));
  }
  function hlHTML(code) {
    let out = '', i = 0;
    const re = /(<!--[\s\S]*?-->)|(<\/?)([a-zA-Z][\w-]*|!DOCTYPE)([^>]*?)(\/?>)/g;
    let m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(i, m.index));
      if (m[1]) out += span('com', m[1]);
      else {
        out += span('punc', m[2]) + span('tag', m[3]);
        out += m[4].replace(/([^\s=]+)(\s*=\s*)?("[^"]*"|'[^']*'|[^\s>]+)?|(\s+)/g, (all, a, eq, v, ws) => {
          if (ws) return ws;
          return span('attr', a) + (eq ? esc(eq) : '') + (v ? span('str', v) : '');
        });
        out += span('punc', m[5]);
      }
      i = re.lastIndex;
      // highlight inline <style>/<script> contents
      if (!m[1] && m[2] === '<' && /^(style|script)$/i.test(m[3])) {
        const close = code.toLowerCase().indexOf('</' + m[3].toLowerCase(), i);
        if (close > -1) {
          const inner = code.slice(i, close);
          out += /style/i.test(m[3]) ? hlCSS(inner) : hlJS(inner);
          i = close; re.lastIndex = close;
        }
      }
    }
    return out + esc(code.slice(i));
  }
  /* ---------- PHP: scanner (shared by the highlighter and the PHP runner) ---------- */
  /* Splits a .php source into pieces: html (outside the PHP tags), tag (<?php, <?=, ?>), com, str, code. */
  function phpScan(src) {
    src = String(src);
    const out = [], n = src.length;
    const push = (t, s) => { if (s) out.push({ t, s }); };
    const open = /<\?(?:php(?![\w])|=)/gi;
    const tok = /(\?>)|(\/\/|#(?!\[))|(\/\*[\s\S]*?(?:\*\/|$))|('(?:\\[\s\S]|[^'\\])*'?)|("(?:\\[\s\S]|[^"\\])*"?)|(<<<[ \t]*(['"]?)(\w+)\7\r?\n[\s\S]*?\n[ \t]*\8\b)|([^'"\/#?<]+|[\s\S])/y;
    let i = 0, inPhp = false;
    while (i < n) {
      if (!inPhp) {
        open.lastIndex = i;
        const m = open.exec(src);
        if (!m) { push('html', src.slice(i)); break; }
        push('html', src.slice(i, m.index)); push('tag', m[0]);
        i = m.index + m[0].length; inPhp = true;
        continue;
      }
      tok.lastIndex = i;
      const m = tok.exec(src);
      if (m[1]) { push('tag', m[1]); inPhp = false; i = tok.lastIndex; }
      else if (m[2]) {
        let e = src.indexOf('\n', i); if (e < 0) e = n;
        const c = src.indexOf('?>', i); if (c > -1 && c < e) e = c;
        push('com', src.slice(i, e)); i = e;
      }
      else if (m[3]) { push('com', m[3]); i = tok.lastIndex; }
      else if (m[4] || m[5] || m[6]) { push('str', m[0]); i = tok.lastIndex; }
      else {
        const last = out[out.length - 1];
        if (last && last.t === 'code') last.s += m[0]; else push('code', m[0]);
        i = tok.lastIndex;
      }
    }
    return out;
  }
  const PHP_KW = 'abstract|and|array|as|break|case|catch|class|const|continue|default|die|do|echo|else|elseif|empty|endfor|endforeach|endif|endwhile|exit|extends|false|final|finally|fn|for|foreach|function|global|if|include|include_once|isset|list|new|null|or|print|private|protected|public|require|require_once|return|static|switch|throw|true|try|unset|use|var|while';
  function hlPHP(code) {
    const re = new RegExp('(\\$\\w+)|\\b(' + PHP_KW + ')\\b|\\b(\\d+(?:\\.\\d+)?)\\b|([A-Za-z_]\\w*)(?=\\s*\\()|([{}()[\\];,.=+\\-*/<>!&|?:])', 'gi');
    return phpScan(code).map(p => {
      if (p.t === 'html') return hlHTML(p.s);
      if (p.t === 'tag') return span('tag', p.s);
      if (p.t === 'com') return span('com', p.s);
      if (p.t === 'str') return span('str', p.s);
      let out = '', last = 0, m; re.lastIndex = 0;
      while ((m = re.exec(p.s))) {
        out += esc(p.s.slice(last, m.index));
        if (m[1]) out += span('var', m[1]);
        else if (m[2]) out += span('kw', m[2]);
        else if (m[3]) out += span('num', m[3]);
        else if (m[4]) out += span('fn', m[4]);
        else out += span('punc', m[5]);
        last = re.lastIndex;
      }
      return out + esc(p.s.slice(last));
    }).join('');
  }
  function hlSQL(code) {
    const re = /(--[^\n]*)|('(?:''|[^'])*')|\b(SELECT|FROM|WHERE|AND|OR|NOT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|ORDER|BY|ASC|DESC|LIMIT|CREATE|TABLE|PRIMARY|KEY|NULL|LIKE|IN|BETWEEN|AS|COUNT|SUM|AVG|MIN|MAX|JOIN|ON|GROUP|HAVING|INT|INTEGER|VARCHAR|TEXT|DECIMAL|AUTO_INCREMENT|DROP|DISTINCT|IS)\b|\b(\d+(?:\.\d+)?)\b|(:\w+|\?)|([(),;=*<>])/gi;
    let out = '', last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      if (m[1]) out += span('com', m[1]);
      else if (m[2]) out += span('str', m[2]);
      else if (m[3]) out += span('kw', m[3]);
      else if (m[4]) out += span('num', m[4]);
      else if (m[5]) out += span('var', m[5]);
      else out += span('punc', m[6]);
      last = re.lastIndex;
    }
    return out + esc(code.slice(last));
  }
  /* An HTTP message: first line and header names stand out, the rest is plain. */
  function hlHTTP(code) {
    return code.split('\n').map((l, i) => {
      if (i === 0) return span('kw', l);
      const m = l.match(/^([\w-]+)(:)(.*)$/);
      return m ? span('prop', m[1]) + span('punc', m[2]) + span('str', m[3]) : esc(l);
    }).join('\n');
  }
  const HL = { css: hlCSS, js: hlJS, json: hlJS, php: hlPHP, sql: hlSQL, http: hlHTTP, text: esc, html: hlHTML };
  const hl = (lang, code) => (HL[lang] || hlHTML)(code);
  const codeBlock = (lang, code) => '<pre class="code" data-lang="' + lang + '"><code>' + hl(lang, code.replace(/^\n/, '').replace(/\s+$/, '')) + '</code></pre>';

  /* ---------- Storage (safe) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('wdl:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('wdl:' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  /* ---------- Editor: textarea over highlighted pre ---------- */
  function editor(host, lang, value, onInput) {
    host.classList.add('editor');
    host.innerHTML = '<div class="gutter"></div><pre aria-hidden="true"><code></code></pre><textarea spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="' + lang.toUpperCase() + ' code editor"></textarea>';
    const ta = host.querySelector('textarea'), pre = host.querySelector('pre'), codeEl = pre.querySelector('code'), gutter = host.querySelector('.gutter');
    ta.value = value || '';
    const paint = () => {
      codeEl.innerHTML = hl(lang, ta.value) + '\n';
      const n = ta.value.split('\n').length;
      let g = ''; for (let i = 1; i <= n; i++) g += i + '\n';
      gutter.textContent = g;
    };
    const sync = () => { pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft; gutter.scrollTop = ta.scrollTop; };
    ta.addEventListener('input', () => { paint(); sync(); onInput && onInput(ta.value); });
    ta.addEventListener('scroll', sync);
    const keepCaret = () => { ta.dataset.caret = String(ta.selectionStart); };
    ['click', 'keyup', 'input'].forEach(ev => ta.addEventListener(ev, keepCaret));
    ta.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        host.dispatchEvent(new CustomEvent('run', { bubbles: true }));
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart, en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 2; ta.dispatchEvent(new Event('input'));
      } else if (e.key === 'Enter') {
        const s = ta.selectionStart;
        const lineStart = ta.value.lastIndexOf('\n', s - 1) + 1;
        const indent = (ta.value.slice(lineStart, s).match(/^\s*/) || [''])[0];
        const prev = ta.value[s - 1];
        const extra = prev === '{' ? '  ' : '';
        if (indent || extra) {
          e.preventDefault();
          const ins = '\n' + indent + extra;
          ta.value = ta.value.slice(0, s) + ins + ta.value.slice(ta.selectionEnd);
          ta.selectionStart = ta.selectionEnd = s + ins.length; ta.dispatchEvent(new Event('input'));
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        host.dispatchEvent(new CustomEvent('run', { bubbles: true }));
      }
    });
    paint();
    return { get: () => ta.value, set: v => { ta.value = v; paint(); }, el: ta };
  }

  /* ---------- Runner: builds a document from html/css/js and loads it in an iframe ---------- */
  let runSeq = 0;
  function buildDoc(parts, extraScript) {
    const id = ++runSeq;
    const prelude = '<script>(function(){var R=' + id + ';function S(t,m){try{parent.postMessage({__wdl:R,type:t,msg:m},"*")}catch(e){}}' +
      '["log","warn","error","info"].forEach(function(k){var o=console[k];console[k]=function(){var a=[].slice.call(arguments).map(function(x){try{return typeof x==="object"&&x!==null?(x.nodeType?"<"+x.nodeName.toLowerCase()+"> element":JSON.stringify(x)):String(x)}catch(e){return String(x)}});S(k==="info"?"log":k,a.join(" "));o.apply(console,arguments)}});' +
      'window.alert=function(m){S("alert","alert: "+m)};window.confirm=function(){return true};window.prompt=function(){return ""};' +
      'window.addEventListener("error",function(e){S("error",e.message+(e.lineno?" (line "+e.lineno+")":""))});' +
      'document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(a&&!/^#/.test(a.getAttribute("href")||"")){e.preventDefault();S("log","(link to "+a.getAttribute("href")+" — links are disabled in the preview)")}});' +
      'window.__subs=[];window.addEventListener("submit",function(e){window.__subs.push(e.defaultPrevented);if(!e.defaultPrevented){e.preventDefault();S("warn","The form was submitted and the page would reload. Call event.preventDefault() in your submit listener to stop that.")}});' +
      '})();<\/script>';
    let html = parts.html || '';
    const css = parts.css || '', js = parts.js || '';
    const styleTag = css ? '<style>' + css + '</style>' : '';
    const scriptTag = js ? '<script>' + js.replace(/<\/script/gi, '<\\/script') + '<\/script>' : '';
    const extra = extraScript ? '<script>' + extraScript + '<\/script>' : '';
    let usedStyle = false, usedScript = false;
    html = html.replace(/<link\b[^>]*href\s*=\s*["']?styles?\.css["']?[^>]*>/i, () => { usedStyle = true; return styleTag; });
    html = html.replace(/<script\b[^>]*src\s*=\s*["']?script\.js["']?[^>]*>\s*<\/script>/i, () => { usedScript = true; return scriptTag + extra; });
    const isFull = /<html[\s>]/i.test(html) || /<body[\s>]/i.test(html);
    if (!isFull) html = '<!DOCTYPE html><html><head></head><body>' + html + '</body></html>';
    if (!/<head[\s>]/i.test(html)) html = html.replace(/<html([^>]*)>/i, '<html$1><head></head>');
    const base = '<style>body{font-family:system-ui,Segoe UI,sans-serif;margin:12px;color:#111}</style>';
    html = html.replace(/<head([^>]*)>/i, '<head$1>' + prelude + base + (usedStyle ? '' : styleTag));
    if (!usedScript) {
      if (/<\/body>/i.test(html)) html = html.replace(/<\/body>(?![\s\S]*<\/body>)/i, scriptTag + extra + '</body>');
      else html += scriptTag + extra;
    }
    return { id, html };
  }

  const listeners = new Map();
  window.addEventListener('message', e => {
    const d = e.data; if (!d || !d.__wdl) return;
    const fn = listeners.get(d.__wdl); if (fn) fn(d.type, d.msg);
  });

  /* run(parts, iframe, consoleEl, extraScript) -> Promise resolves when loaded */
  function run(parts, iframe, consoleEl, extraScript) {
    const { id, html } = buildDoc(parts, extraScript);
    if (consoleEl) consoleEl.innerHTML = '';
    listeners.set(id, (type, msg) => {
      if (!consoleEl) return;
      const d = document.createElement('div'); d.className = type; d.textContent = (type === 'error' ? '✖ ' : type === 'warn' ? '⚠ ' : '› ') + msg;
      consoleEl.appendChild(d); consoleEl.scrollTop = consoleEl.scrollHeight;
    });
    return new Promise(resolve => {
      iframe.onload = () => setTimeout(() => resolve(iframe), 30);
      iframe.srcdoc = html;
    });
  }

  /* Hidden iframe for grading */
  function hiddenFrame() {
    const f = document.createElement('iframe');
    f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
    f.style.cssText = 'position:fixed;left:0;top:0;width:800px;height:600px;border:0;visibility:hidden;pointer-events:none;z-index:-1';
    f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1;
    document.body.appendChild(f);
    return f;
  }

  /* CSS helpers used by checks */
  const normSel = s => String(s).toLowerCase().replace(/'/g, '"').replace(/\s*([>+~,])\s*/g, '$1').replace(/\s+/g, ' ').trim();
  function findRule(doc, selectors) {
    const want = selectors.map(normSel);
    for (const sh of doc.styleSheets) {
      let rules; try { rules = sh.cssRules; } catch (e) { continue; }
      for (const r of rules) {
        if (r.selectorText && r.selectorText.split(',').some(s => want.includes(normSel(s)))) return r;
        if (r.cssRules) for (const rr of r.cssRules) if (rr.selectorText && rr.selectorText.split(',').some(s => want.includes(normSel(s)))) return rr;
      }
    }
    return null;
  }
  function normColor(doc, c) {
    const el = doc.createElement('span'); el.style.color = ''; el.style.color = c; doc.body.appendChild(el);
    const v = doc.defaultView.getComputedStyle(el).color; el.remove(); return v;
  }
  /* Code without comments, for static checks */
  const strip = src => String(src || '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

  return { esc, md, hl, codeBlock, store, editor, run, hiddenFrame, findRule, normColor, strip, normSel, phpScan };
})();

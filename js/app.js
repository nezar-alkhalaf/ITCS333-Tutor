/* App: routing and views. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app');
  const md = U.md, esc = U.esc;
  const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const moduleOf = id => MODULES.find(m => m.id === id);
  const lessonsOf = mid => LESSONS.filter(l => l.module === mid);
  const LANG_COLOR = { html: 'var(--c-html)', css: 'var(--c-css)', js: 'var(--c-js)' };
  QUESTIONS.forEach((q, i) => q.id = 'q' + i);

  /* ---------- progress ---------- */
  const P = {
    done: () => U.store.get('done', {}),
    chal: () => U.store.get('chal', {}),
    markDone(id) { const d = P.done(); d[id] = true; U.store.set('done', d); },
    markChal(id) { const d = P.chal(); d[id] = true; U.store.set('chal', d); },
    step(id, n) { const s = U.store.get('step', {}); if (n === undefined) return s[id] || 0; s[id] = n; U.store.set('step', s); U.store.set('last', id); },
    q(id, ok) { const s = U.store.get('qstats', {}); const r = s[id] || { c: 0, w: 0 }; ok ? r.c++ : r.w++; s[id] = r; U.store.set('qstats', s); }
  };
  const moduleProgress = mid => { const ls = lessonsOf(mid), d = P.done(); return ls.length ? ls.filter(l => d[l.id]).length / ls.length : 0; };

  /* ---------- theme & Arabic ---------- */
  const themeBtn = $('#themeBtn');
  const applyTheme = t => { if (t) document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme'); };
  applyTheme(U.store.get('theme', null));
  themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark'; applyTheme(next); U.store.set('theme', next);
  });
  const t = I18N.t;
  const paintChrome = () => {
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === I18N.lang()));
  };
  paintChrome();
  document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.lang === I18N.lang()) return;
    I18N.setLang(b.dataset.lang); paintChrome(); route();
  }));
  const strip = x => md(x).replace(/^<p>|<\/p>$/g, '');

  /* ---------- shared widgets ---------- */
  /* Live lab: editors + preview + console */
  function lab(host, cfg, opts = {}) {
    const mode = cfg.mode || (cfg.html !== undefined || cfg.css !== undefined ? 'web' : 'js');
    const langs = opts.tabs || (mode === 'js' ? ['js'] : ['html', 'css', 'js'].filter(l => cfg[l] !== undefined && (l !== 'js' || cfg.js !== undefined)));
    if (!opts.tabs && mode !== 'js' && !langs.includes('html')) langs.unshift('html');
    const stacked = mode === 'js' || U.store.get('labStack', false);
    const wrap = h(`<div class="lab ${stacked ? 'stack' : ''}">
      <div class="panel"><div class="panel-head"><div class="tabs" role="tablist"></div><div class="row"><button class="btn small ghost" data-act="layout" type="button" title="${t('layoutTip')}" aria-label="${t('layoutTip')}">⇵</button><button class="btn small ghost" data-act="full" type="button" title="${t('fullTip')}" aria-label="${t('fullTip')}" aria-pressed="false">⛶</button><button class="btn small ghost" data-act="reset" type="button">${t('reset')}</button><button class="btn small primary" data-act="run" type="button">${t('run')}</button></div></div><div class="eds"></div></div>
      <div class="panel"><div class="panel-head"><span>${mode === 'js' ? t('console') : t('result')}</span></div>
        <div class="preview" ${mode === 'js' ? 'style="display:none"' : ''}><iframe title="Result preview" sandbox="allow-scripts allow-same-origin allow-forms allow-modals"></iframe></div>
        <div class="console" data-empty="${esc(t('consoleEmpty'))}" aria-live="polite" ${mode === 'js' ? 'style="max-height:none;min-height:200px"' : ''}></div></div>
    </div>`);
    host.appendChild(wrap);
    const tabs = $('.tabs', wrap), eds = $('.eds', wrap), editors = {};
    const initial = {};
    langs.forEach((l, i) => {
      initial[l] = cfg[l] || '';
      const b = h(`<button type="button" role="tab" aria-selected="${i === 0}" style="--tabc:${LANG_COLOR[l]}">${l === 'js' ? 'JavaScript' : l.toUpperCase()}</button>`);
      tabs.appendChild(b);
      const box = h('<div style="height:100%;' + (i ? 'display:none' : '') + '"></div>'); eds.appendChild(box);
      const ed = h('<div style="min-height:' + (opts.height || 420) + 'px;height:100%"></div>'); box.appendChild(ed);
      editors[l] = U.editor(ed, l, initial[l], opts.onInput);
      b.addEventListener('click', () => {
        [...tabs.children].forEach(x => x.setAttribute('aria-selected', 'false')); b.setAttribute('aria-selected', 'true');
        [...eds.children].forEach(x => x.style.display = 'none'); box.style.display = '';
      });
    });
    const iframe = $('iframe', wrap), con = $('.console', wrap);
    const values = () => { const v = Object.assign({ html: '', css: '', js: '' }, opts.fixed || {}); langs.forEach(l => v[l] = editors[l].get()); return v; };
    const runIt = () => U.run(values(), iframe, con);
    $('[data-act=run]', wrap).addEventListener('click', runIt);
    $('[data-act=layout]', wrap).addEventListener('click', () => {
      if (mode === 'js') return;
      const on = !wrap.classList.contains('stack');
      document.querySelectorAll('.lab').forEach(l => { if (!l.dataset.jsonly) l.classList.toggle('stack', on); });
      U.store.set('labStack', on);
    });
    if (mode === 'js') { wrap.dataset.jsonly = '1'; $('[data-act=layout]', wrap).hidden = true; }
    const fullBtn = $('[data-act=full]', wrap);
    const setFull = on => {
      wrap.classList.toggle('lab-full', on); document.body.classList.toggle('has-full', on);
      fullBtn.setAttribute('aria-pressed', String(on)); fullBtn.textContent = on ? '✕' : '⛶';
      fullBtn.title = on ? t('exitFull') : t('fullTip'); fullBtn.setAttribute('aria-label', fullBtn.title);
      const ta = wrap.querySelector('.eds > div:not([style*="display: none"]) textarea'); if (ta) ta.focus();
    };
    fullBtn.addEventListener('click', () => setFull(!wrap.classList.contains('lab-full')));
    wrap.addEventListener('keydown', e => { if (e.key === 'Escape' && wrap.classList.contains('lab-full')) { e.stopPropagation(); setFull(false); fullBtn.focus(); } });
    wrap.addEventListener('run', runIt);
    $('[data-act=reset]', wrap).addEventListener('click', () => { langs.forEach(l => editors[l].set(initial[l])); runIt(); });
    if (opts.autorun !== false) runIt();
    return { values, editors, run: runIt, iframe, con, set: v => langs.forEach(l => v[l] !== undefined && editors[l].set(v[l])) };
  }

  function quiz(host, qs, opts = {}) {
    let answered = 0, right = 0;
    const head = opts.score ? h('<div class="row" style="margin-bottom:10px"><span class="score-pill">0 / ' + qs.length + '</span></div>') : null;
    if (head) host.appendChild(head);
    qs.forEach((q, qi) => {
      const card = h(`<div class="q"><div class="prompt">${opts.number ? (qi + 1) + '. ' : ''}${md(q.q).replace(/^<p>|<\/p>$/g, '')}${q.src ? ' <span class="chip">' + esc(q.src) + '</span>' : ''}</div><div class="opts"></div></div>`);
      const opsEl = $('.opts', card);
      if (q.o.length > 2) {
        const hb = h(`<button class="btn small ghost mcq-hint" type="button">💡 ${t('mcqHint')}</button>`);
        hb.addEventListener('click', () => {
          const wrong = [...opsEl.children].filter((x, j) => j !== q.a && !x.disabled);
          if (wrong.length > 1) { const x = wrong[Math.floor(Math.random() * wrong.length)]; x.disabled = true; x.classList.add('struck'); }
          if ([...opsEl.children].filter((x, j) => j !== q.a && !x.disabled).length <= 1) hb.disabled = true;
        });
        card.insertBefore(hb, opsEl);
      }
      q.o.forEach((o, i) => {
        const b = h(`<button class="opt" type="button"><span class="k">${'ABCDE'[i]}</span><span>${md(o).replace(/^<p>|<\/p>$/g, '')}</span></button>`);
        b.addEventListener('click', () => {
          const ok = i === q.a;
          [...opsEl.children].forEach((x, j) => { x.disabled = true; if (j === q.a) x.classList.add('right'); });
          const mh = card.querySelector('.mcq-hint'); if (mh) mh.disabled = true;
          if (!ok) b.classList.add('wrong');
          card.appendChild(h(`<div class="explain ${ok ? 'good' : 'bad'}"><strong>${ok ? t('correct') : t('notQuite')}</strong> ${md(q.why).replace(/^<p>|<\/p>$/g, '')}</div>`));
          answered++; if (ok) right++;
          if (q.id) P.q(q.id, ok);
          if (head) head.firstElementChild.textContent = right + ' / ' + qs.length;
          if (answered === qs.length && opts.onDone) opts.onDone(right, qs.length);
        });
        opsEl.appendChild(b);
      });
      host.appendChild(card);
    });
  }

  function renderChecks(host, items) {
    host.innerHTML = '';
    items.forEach(c => host.appendChild(h(`<div class="check ${c.ok ? 'ok' : 'no'}"><span class="ic">${c.ok ? '✓' : '✗'}</span><span>${md(c.d).replace(/^<p>|<\/p>$/g, '')}</span>${c.pts !== undefined ? '<span class="pts">' + (c.ok ? c.pts : 0) + ' / ' + c.pts + '</span>' : ''}</div>`)));
  }

  /* Help panel: progressive hints (what is missing, then the next line of the model answer) + show answer */
  function helpPanel(host, L, opts) {
    const box = h(`<div class="help"><div class="row">
        <button class="btn" data-h="hint" type="button">💡 ${t('hint')}</button>
        <button class="btn ghost" data-h="answer" type="button" aria-expanded="false">👁 ${t('showModel')}</button>
        <span class="small muted" data-h="count"></span></div>
      <div class="hint-out" aria-live="polite"></div><div class="answer-out"></div></div>`);
    host.appendChild(box);
    const out = $('.hint-out', box), ans = $('.answer-out', box), count = $('[data-h=count]', box);
    let used = 0, tipShown = false;
    const solLines = () => {
      const list = [];
      Object.entries(opts.solution()).forEach(([lang, code]) => code.split('\n').forEach(line => { if (line.trim() && !/^\s*(\/\/|\/\*|<!--)/.test(line)) list.push({ lang, line }); }));
      return list;
    };
    const nextLine = () => {
      const v = L.values();
      const have = {}; ['html', 'css', 'js'].forEach(l => { have[l] = new Set((v[l] || '').split('\n').map(x => x.trim()).filter(Boolean)); });
      return solLines().find(x => !(have[x.lang] && have[x.lang].has(x.line.trim())));
    };
    $('[data-h=hint]', box).addEventListener('click', async () => {
      used++; count.textContent = t('hintsUsed', used); if (opts.onUse) opts.onUse(used);
      if (!tipShown && opts.tip) {
        tipShown = true;
        out.innerHTML = '<div class="hint-card"><span class="muted small">' + t('checking') + '</span></div>';
        const tip = await opts.tip();
        out.innerHTML = '<div class="hint-card">' + (tip ? '<strong>' + t('hintNext') + '</strong> ' + md(tip).replace(/^<p>|<\/p>$/g, '') : t('hintAllPass')) + '</div>';
        return;
      }
      const nx = nextLine();
      if (!nx) { out.innerHTML = '<div class="hint-card">' + t('hintNoMore') + '</div>'; return; }
      out.innerHTML = `<div class="hint-card"><div class="row" style="justify-content:space-between"><strong>${t('hintLine')}</strong><span class="chip ${nx.lang}">${nx.lang.toUpperCase()}</span></div>${U.codeBlock(nx.lang, nx.line.trim())}<button class="btn small" type="button" data-h="add">＋ ${t('addLine')}</button></div>`;
      $('[data-h=add]', out).addEventListener('click', () => {
        const ed = L.editors[nx.lang]; if (!ed) return;
        const ta = ed.el, cur = ta.value;
        let pos = ta.dataset.caret !== undefined ? Math.min(+ta.dataset.caret, cur.length) : -1;
        if (pos < 0) {
          /* not clicked yet: an indented line goes before the last closing brace, otherwise at the end */
          pos = cur.length;
          if (/^\s+/.test(nx.line)) { const m = cur.match(/\n?[ \t]*\}\)?;?[ \t]*\s*$/); if (m) pos = m.index; }
        }
        if (pos > 0 && pos < cur.length && cur[pos - 1] !== '\n') { const nl = cur.indexOf('\n', pos); pos = nl < 0 ? cur.length : nl; }
        const before = cur.slice(0, pos), after = cur.slice(pos);
        const indent = (nx.line.match(/^\s*/) || [''])[0];
        const ins = (before && !before.endsWith('\n') ? '\n' : '') + indent + nx.line.trim() + '\n';
        ed.set(before + ins + after); ta.dispatchEvent(new Event('input'));
        ta.focus(); ta.selectionStart = ta.selectionEnd = (before + ins).length; ta.dataset.caret = String((before + ins).length);
        const tabBtn = [...ta.closest('.lab').querySelectorAll('.tabs button')].find(b => b.textContent.toLowerCase().startsWith(nx.lang === 'js' ? 'javascript' : nx.lang));
        if (tabBtn) tabBtn.click();
        out.innerHTML = '<div class="hint-card small muted">' + t('lineAdded') + '</div>';
      });
    });
    $('[data-h=answer]', box).addEventListener('click', e => {
      const b = e.currentTarget, open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open)); b.textContent = '👁 ' + (open ? t('showModel') : t('hideModel'));
      ans.innerHTML = open ? '' : Object.entries(opts.solution()).map(([l, c]) => U.codeBlock(l, c)).join('');
    });
    return { used: () => used };
  }

  /* Challenge (auto-checked exercise) */
  let gradeFrame = null;
  const frame = () => gradeFrame || (gradeFrame = U.hiddenFrame());
  function challenge(host, ch, lessonId) {
    const box = h(`<div><div class="task">${md(ch.task)}</div><div class="labhost"></div>
      <div class="row"><button class="btn primary" data-act="check" type="button">${t('check')}</button></div>
      <div class="checks" aria-live="polite"></div><div class="helphost"></div></div>`);
    host.appendChild(box);
    const tabs = ch.tabs || ['html'];
    const cfg = { mode: ch.mode };
    tabs.forEach(t => cfg[t] = (ch.starter || {})[t] || '');
    const fixed = {};
    ['html', 'css', 'js'].forEach(t => { if (!tabs.includes(t) && ch.starter && ch.starter[t] !== undefined) fixed[t] = ch.starter[t]; });
    const L = lab($('.labhost', box), cfg, { tabs: tabs.slice(), fixed });
    const checksEl = $('.checks', box);
    const runChecks = async () => {
      const v = L.values();
      const f = frame();
      const extra = ch.exports ? 'window.__exp={};' + ch.exports.map(n => 'try{window.__exp[' + JSON.stringify(n) + ']=' + n + '}catch(e){}').join(';') : 'window.__exp={};';
      await U.run(v, f, null, extra);
      let r = {};
      if (ch.test) { try { r = await ch.test(f.contentDocument, f.contentWindow) || {}; } catch (e) { r = { err: e.message }; } }
      return ch.checks.map(c => { let ok = false; try { ok = !!c.t(f.contentDocument, f.contentWindow, v, r); } catch (e) { ok = false; } return { d: c.d, ok }; });
    };
    helpPanel($('.helphost', box), L, { solution: () => ch.solution, tip: async () => { const it = await runChecks(); const miss = it.find(i => !i.ok); return miss ? miss.d : null; } });
    $('[data-act=check]', box).addEventListener('click', async () => {
      checksEl.innerHTML = '<div class="check"><span class="ic">…</span><span>' + t('checking') + '</span></div>';
      const items = await runChecks();
      renderChecks(checksEl, items);
      L.run();
      if (items.every(i => i.ok)) { P.markChal(lessonId); checksEl.appendChild(h('<div class="done-banner">' + t('allPassed') + '</div>')); }
    });
  }

  /* ---------- VIEWS ---------- */
  function viewHome() {
    const last = U.store.get('last', null), lastL0 = LESSONS.find(l => l.id === last), lastL = lastL0 && I18N.lesson(lastL0);
    const totalDone = Object.keys(P.done()).filter(k => LESSONS.some(l => l.id === k)).length;
    app.innerHTML = `
    <section class="hero">
      <div>
        <span class="chip">${t('heroChip')}</span>
        <h1 style="margin-top:14px">${t('heroTitle')}</h1>
        <p class="lead">${t('heroLead')}</p>
        <div class="row">
          <a class="btn primary" href="#${lastL ? 'lesson-' + lastL.id : 'lesson-' + LESSONS[0].id}">${lastL ? t('continue') + esc(lastL.title) : t('start1')}</a>
          <a class="btn" href="#exam">${t('takeMock')}</a>
        </div>
        <p class="small muted" style="margin-top:12px">${t('lessonsDone', totalDone, LESSONS.length)}</p>
      </div>
      <div class="hero-code">${U.hl('js', `gradeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const newRow = createGradeRow();
  gradeTbody.appendChild(newRow);
});`)}</div>
    </section>
    <div class="quick">
      <a href="#learn"><div class="card"><h3>${t('qLearnT')}</h3><p class="muted small">${t('qLearnD')}</p></div></a>
      <a href="#practice"><div class="card"><h3>${t('qPracT')}</h3><p class="muted small">${t('qPracD', QUESTIONS.length)}</p></div></a>
      <a href="#practice-puzzles"><div class="card"><h3>${t('qPuzT')}</h3><p class="muted small">${t('qPuzD')}</p></div></a>
      <a href="#practice-exam"><div class="card"><h3>${t('qRandT')}</h3><p class="muted small">${t('qRandD')}</p></div></a>
    </div>
    <div class="section-title"><h2>${t('thePath')}</h2><a href="#guide" class="small">${t('howStudy')}</a></div>
    <div class="path">${MODULES.map(m => `
      <a class="module-card" href="#lesson-${lessonsOf(m.id)[0].id}" style="--mc:${LANG_COLOR[m.lang]}">
        <span class="num">${m.num}</span>
        <span class="row"><span class="chip ${m.lang}">${m.ch}</span><span class="small muted">${t('nLessons', lessonsOf(m.id).length)}</span></span>
        <h3>${esc(I18N.modTitle(m))}</h3><p class="small muted" style="margin:0">${esc(I18N.modBlurb(m))}</p>
        <div class="bar" aria-label="progress"><span style="width:${Math.round(moduleProgress(m.id) * 100)}%"></span></div>
      </a>`).join('')}</div>`;
  }

  function viewLearn() {
    const d = P.done(), c = P.chal();
    app.innerHTML = `<h1>${t('lessonsH')}</h1><p class="muted">${t('lessonsLead')}</p>` +
      MODULES.map(m => `<div class="module-block"><div class="module-head"><span class="chip ${m.lang}">${m.ch}</span><h2 style="margin:0">${m.num} · ${esc(I18N.modTitle(m))}</h2></div>
      <div class="lesson-list">${lessonsOf(m.id).map((l, i) => `<a class="lesson-link" href="#lesson-${l.id}"><span class="t">${i + 1}. ${esc(I18N.lesson(l).title)}</span><span class="row">${d[l.id] ? '<span class="chip done">' + t('quizDone') + '</span>' : ''}${c[l.id] ? '<span class="chip done">' + t('chalDone') + '</span>' : ''}</span></a>`).join('')}</div></div>`).join('');
  }

  function viewLesson(id) {
    const L0 = LESSONS.find(l => l.id === id);
    if (!L0) return viewLearn();
    const L = I18N.lesson(L0);
    const m = moduleOf(L.module), idx = LESSONS.indexOf(L0);
    let step = Math.min(P.step(id), 7);
    const seen = new Set(U.store.get('seen:' + id, [0]));
    const prevL = LESSONS[idx - 1], nextL = LESSONS[idx + 1];
    const doneMap = P.done(), chalMap = P.chal();
    const courseMap = MODULES.map(mm => {
      const ls = lessonsOf(mm.id), open = mm.id === m.id;
      return `<details class="cm-mod" ${open ? 'open' : ''} style="--mc:${LANG_COLOR[mm.lang]}"><summary><span class="cm-num">${mm.num}</span><span>${esc(I18N.modTitle(mm))}</span><span class="cm-ch">${mm.ch}</span></summary>
        <ol class="cm-list">${ls.map(l => `<li><a href="#lesson-${l.id}" ${l.id === id ? 'aria-current="page"' : ''}><span class="cm-dot ${doneMap[l.id] && chalMap[l.id] ? 'full' : doneMap[l.id] || chalMap[l.id] ? 'half' : ''}" aria-hidden="true"></span>${esc(I18N.lesson(l).title)}</a></li>`).join('')}</ol></details>`;
    }).join('');
    app.innerHTML = `<div class="lesson-top">
        <div class="crumbs"><a href="#learn">${t('lessonsH')}</a> / ${esc(m.num + ' ' + I18N.modTitle(m))} <span class="muted">· ${t('lessonOf', idx + 1, LESSONS.length)}</span></div>
        <div class="row lesson-jump">
          ${prevL ? `<a class="btn small" href="#lesson-${prevL.id}" title="${esc(I18N.lesson(prevL).title)}">${t('prevLesson')}</a>` : ''}
          <label for="jump" class="sr-only">${t('jump')}</label>
          <select id="jump" aria-label="${t('jump')}">${MODULES.map(mm => `<optgroup label="${mm.num} · ${esc(I18N.modTitle(mm))} (${mm.ch})">${lessonsOf(mm.id).map(l => `<option value="${l.id}" ${l.id === id ? 'selected' : ''}>${LESSONS.indexOf(l) + 1}. ${esc(I18N.lesson(l).title)}</option>`).join('')}</optgroup>`).join('')}</select>
          ${nextL ? `<a class="btn small" href="#lesson-${nextL.id}" title="${esc(I18N.lesson(nextL).title)}">${t('nextLessonBtn')}</a>` : ''}
        </div>
      </div>
      <h1 style="font-size:clamp(1.6rem,3.4vw,2.4rem)">${esc(L.title)}</h1>
      <div class="lesson-wrap ${U.store.get('sideHidden', false) ? 'side-hidden' : ''}" style="--side-w:${U.store.get('sideW', 228)}px"><button class="side-rail" id="sideOpen" type="button" title="${t('showMenu')}" aria-label="${t('showMenu')}" aria-controls="lessonSide"><span aria-hidden="true">☰</span><span class="rail-text">${t('menu')}</span></button><aside class="lesson-side" id="lessonSide"><div class="side-head"><span>☰ ${t('menu')}</span><button class="btn small" id="sideClose" type="button" title="${t('hideMenu')}" aria-label="${t('hideMenu')}" aria-controls="lessonSide">${I18N.isAr() ? '»' : '«'} ${t('hideShort')}</button></div><div class="side-resize" id="sideResize" role="separator" aria-orientation="vertical" aria-label="${t('resizeMenu')}" tabindex="0" title="${t('resizeMenu')}"></div><div class="side-label">${t('thisLesson')}</div><ol class="steps">${STEP_NAMES.map((n, i) => `<li><button type="button" data-step="${i}">${I18N.stepName(i)}</button></li>`).join('')}</ol>
        <div class="side-label" style="margin-top:18px">${t('allChapters')}</div><nav class="course-map" aria-label="${t('allChapters')}">${courseMap}</nav>
        <p class="small muted kbd-hint">${t('keysHint')}</p></aside>
      <section><div class="progress-dots">${STEP_NAMES.map(() => '<span></span>').join('')}</div><div class="step-label"></div><div class="step-body"></div>
      <div class="step-nav"><button class="btn" data-go="-1" type="button">${t('back')}</button><button class="btn primary" data-go="1" type="button">${t('next')}</button></div></section></div>`;
    const body = $('.step-body'), label = $('.step-label');
    const render = () => {
      seen.add(step); U.store.set('seen:' + id, [...seen]); P.step(id, step);
      app.querySelectorAll('[data-step]').forEach(b => { const i = +b.dataset.step; b.setAttribute('aria-current', i === step); b.classList.toggle('seen', seen.has(i)); });
      app.querySelectorAll('.progress-dots span').forEach((s, i) => s.classList.toggle('on', i <= step));
      label.textContent = t('stepOf', step + 1, I18N.stepName(step));
      body.innerHTML = '';
      const add = html => body.insertAdjacentHTML('beforeend', html);
      const SN = i => I18N.stepName(i);
      if (step === 0) { add('<h2>' + SN(0) + '</h2>' + md(L.big)); }
      if (step === 1) { add('<h2>' + SN(1) + '</h2>' + md(L.simple)); if (L.ar) add('<div class="ar" lang="ar">' + L.ar + '</div>'); }
      if (step === 2) {
        add('<h2>' + SN(2) + '</h2>');
        L.deeper.forEach(part => {
          if (typeof part === 'string') add(md(part));
          else if (part.code) add(U.codeBlock(part.lang, part.code));
          else if (part.try) { if (part.try.task) add('<div class="task"><strong>' + t('tryIt') + '</strong> ' + md(part.try.task).replace(/^<p>|<\/p>$/g, '') + '</div>'); const host = document.createElement('div'); body.appendChild(host); lab(host, part.try); }
        });
      }
      if (step === 3) add('<h2>' + SN(3) + '</h2><ul>' + L.points.map(p => '<li>' + md(p).replace(/^<p>|<\/p>$/g, '') + '</li>').join('') + '</ul>');
      if (step === 4) add('<h2>' + SN(4) + '</h2><p class="muted">' + t('examFocusLead') + '</p><ul class="examfocus">' + L.exam.map(p => '<li>' + md(p).replace(/^<p>|<\/p>$/g, '') + '</li>').join('') + '</ul>');
      if (step === 5) { add('<h2>' + SN(5) + '</h2>'); L.mistakes.forEach(x => add(`<div class="mistake"><div class="w"><div class="lab">${t('wrong')}</div>${U.codeBlock(x.lang, x.wrong)}</div><div class="r"><div class="lab">${t('right')}</div>${U.codeBlock(x.lang, x.right)}</div><div class="why">${md(x.why).replace(/^<p>|<\/p>$/g, '')}</div></div>`)); }
      if (step === 6) add('<h2>' + SN(6) + '</h2><div class="summary-card"><ul>' + L.summary.map(p => '<li>' + md(p).replace(/^<p>|<\/p>$/g, '') + '</li>').join('') + '</ul></div>');
      if (step === 7) {
        add('<h2>' + SN(7) + '</h2><p class="muted">' + t('recallLead') + '</p>');
        const qh = document.createElement('div'); body.appendChild(qh);
        quiz(qh, L.recall, { score: true, number: true, onDone: () => P.markDone(id) });
        if (L.challenge) { add('<h3 style="margin-top:24px">' + t('codingChallenge') + '</h3>'); const ch = document.createElement('div'); body.appendChild(ch); challenge(ch, L.challenge, id); }
        const next = LESSONS[idx + 1];
        add(`<div class="done-banner"><span>${next ? t('nextLessonBanner', esc(I18N.lesson(next).title)) : t('lastLesson')}</span><a class="btn" href="#${next ? 'lesson-' + next.id : 'exam'}">${next ? t('goNext') : t('startMock')}</a></div>`);
      }
      $('[data-go="-1"]').disabled = step === 0 && idx === 0;
      $('[data-go="1"]').textContent = step === 7 ? (LESSONS[idx + 1] ? t('nextLessonBtn') : t('mockArrow')) : t('next');
    };
    $('#jump').addEventListener('change', e => { location.hash = 'lesson-' + e.target.value; });
    const wrapEl = $('.lesson-wrap');
    const setHidden = hid => { wrapEl.classList.toggle('side-hidden', hid); U.store.set('sideHidden', hid); $('#sideOpen').setAttribute('aria-expanded', String(!hid)); $('#sideClose').setAttribute('aria-expanded', String(!hid)); };
    $('#sideClose').addEventListener('click', () => { setHidden(true); $('#sideOpen').focus(); });
    $('#sideOpen').addEventListener('click', () => { setHidden(false); $('#sideClose').focus(); });
    setHidden(wrapEl.classList.contains('side-hidden'));
    /* drag (or arrow keys) to resize the menu */
    const handle = $('#sideResize');
    const setW = w => { w = Math.max(180, Math.min(460, Math.round(w))); wrapEl.style.setProperty('--side-w', w + 'px'); U.store.set('sideW', w); };
    handle.addEventListener('pointerdown', e => {
      e.preventDefault(); handle.setPointerCapture(e.pointerId);
      const startX = e.clientX, startW = $('#lessonSide').getBoundingClientRect().width, rtl = I18N.isAr();
      const move = ev => setW(startW + (rtl ? startX - ev.clientX : ev.clientX - startX));
      const up = () => { handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); document.body.classList.remove('resizing'); };
      document.body.classList.add('resizing');
      handle.addEventListener('pointermove', move); handle.addEventListener('pointerup', up);
    });
    handle.addEventListener('keydown', e => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault(); e.stopPropagation();
      const grow = (e.key === 'ArrowRight') !== I18N.isAr();
      setW($('#lessonSide').getBoundingClientRect().width + (grow ? 20 : -20));
    });
    handle.addEventListener('dblclick', () => setW(228));
    lessonKeys = e => {
      if (!location.hash.startsWith('#lesson-')) return;
      const t = e.target; if (t && (t.tagName === 'TEXTAREA' || t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.isContentEditable)) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      let dir = e.key === 'ArrowRight' ? 1 : -1;
      if (I18N.isAr()) dir = -dir;
      if (e.shiftKey) { const L2 = LESSONS[idx + dir]; if (L2) { e.preventDefault(); location.hash = 'lesson-' + L2.id; } return; }
      const btn = app.querySelector('[data-go="' + dir + '"]'); if (btn && !btn.disabled) { e.preventDefault(); btn.click(); }
    };
    app.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => { step = +b.dataset.step; render(); }));
    app.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => {
      const g = +b.dataset.go;
      if (g > 0 && step === 7) { location.hash = LESSONS[idx + 1] ? 'lesson-' + LESSONS[idx + 1].id : 'exam'; return; }
      if (g < 0 && step === 0) { if (idx > 0) location.hash = 'lesson-' + LESSONS[idx - 1].id; return; }
      step += g; render(); window.scrollTo({ top: 0 });
    }));
    render();
  }

  /* ----- Practice ----- */
  const PTABS = [['practice', 'ptQuiz'], ['practice-puzzles', 'ptPuz'], ['practice-exam', 'ptRand'], ['practice-challenges', 'ptChal'], ['practice-playground', 'ptPlay']];
  function practiceShell(active) {
    app.innerHTML = `<h1>${t('practiceH')}</h1><div class="toolbar"><div class="seg" role="group" aria-label="Practice type">${PTABS.map(([k, n]) => `<button type="button" aria-pressed="${k === active}" data-k="${k}">${t(n)}</button>`).join('')}</div></div><div id="pbody"></div>`;
    app.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => location.hash = b.dataset.k));
    return $('#pbody');
  }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function viewPractice() {
    const host = practiceShell('practice');
    const stats = U.store.get('qstats', {});
    host.innerHTML = `<div class="toolbar"><label for="pm" class="small muted">${t('topic')}</label><select id="pm"><option value="all">${t('allTopics')}</option>${MODULES.map(m => `<option value="${m.id}">${m.num} · ${esc(I18N.modTitle(m))}</option>`).join('')}</select>
      <label for="pn" class="small muted">${t('questions')}</label><select id="pn"><option>10</option><option>20</option><option value="999">${t('all')}</option></select>
      <label class="switch"><input type="checkbox" id="pw"> ${t('onlyWrong')}</label>
      <button class="btn primary" id="pgo" type="button">${t('newSet')}</button></div><div id="qhost"></div>`;
    const go = () => {
      const mod = $('#pm').value, n = +$('#pn').value, wrongOnly = $('#pw').checked;
      let pool = QUESTIONS.map((q, i) => I18N.question(q, i)).filter(q => mod === 'all' || q.m === mod);
      if (wrongOnly) pool = pool.filter(q => stats[q.id] && stats[q.id].w > 0);
      const qh = $('#qhost'); qh.innerHTML = '';
      if (!pool.length) { qh.innerHTML = '<div class="note">' + t('noQs') + '</div>'; return; }
      const set = shuffle(pool).slice(0, n).map(q => { const order = shuffle(q.o.map((o, i) => i)); return Object.assign({}, q, { o: order.map(i => q.o[i]), a: order.indexOf(q.a) }); });
      quiz(qh, set, { score: true, number: true, onDone: (r, tt) => qh.appendChild(h(`<div class="done-banner"><span>${t('scored', r, tt)}</span><button class="btn" type="button">${t('another')}</button></div>`)).querySelector('button').addEventListener('click', go) });
    };
    $('#pgo').addEventListener('click', go); go();
  }

  /* Specificity: compute and explain */
  function specOf(sel) {
    let s = sel.replace(/:not\(([^)]*)\)/g, ' $1 ');
    const ids = (s.match(/#[\w-]+/g) || []).length; s = s.replace(/#[\w-]+/g, ' ');
    const cls = (s.match(/\.[\w-]+|\[[^\]]+\]|:(?!:)[\w-]+(\([^)]*\))?/g) || []).length; s = s.replace(/\.[\w-]+|\[[^\]]+\]|::?[\w-]+(\([^)]*\))?/g, ' ');
    const el = (s.match(/[a-zA-Z][\w-]*/g) || []).length; return [ids, cls, el];
  }
  const kebab = p => p.replace(/[A-Z]/g, c => '-' + c.toLowerCase());
  let puzzleQueue = Promise.resolve();
  function solvePuzzle(p) {
    const job = puzzleQueue.then(() => solveOne(p));
    puzzleQueue = job.catch(() => {});
    return job;
  }
  async function solveOne(p) {
    const f = frame();
    await U.run({ html: p.html, css: p.css }, f, null);
    const d = f.contentDocument, w = f.contentWindow;
    const rules = []; for (const sh of d.styleSheets) { try { for (const r of sh.cssRules) if (r.selectorText && !/^body$/.test(r.selectorText)) rules.push(r); } catch (e) { } }
    const prop = p.prop === 'borderTopWidth' ? 'border-top-width' : kebab(p.prop);
    return p.targets.map(t => {
      const el = d.querySelector(t.pick); const val = w.getComputedStyle(el)[p.prop];
      const norm = o => p.prop === 'color' ? U.normColor(d, o) : o;
      const answer = p.options.findIndex(o => norm(o) === val);
      const lines = rules.filter(r => r.style.getPropertyValue(prop)).map((r, i) => ({ sel: r.selectorText, match: el.matches(r.selectorText), spec: specOf(r.selectorText), val: r.style.getPropertyValue(prop), order: i }));
      if (el.getAttribute('style')) lines.push({ sel: 'style="…" (inline)', match: true, spec: ['inline', '', ''], val: el.style.getPropertyValue(prop), order: 99, inline: true });
      return { answer, lines };
    });
  }
  function viewPuzzles() {
    const host = practiceShell('practice-puzzles');
    host.insertAdjacentHTML('beforeend', `<div class="note">${t('puzMethod')}</div>`);
    PUZZLES.forEach((p, pi) => {
      const card = h(`<div class="q"><div class="row" style="justify-content:space-between"><h3 style="margin:0">${t('puzzle', pi + 1)}</h3>${p.src ? '<span class="chip">' + esc(p.src) + '</span>' : ''}</div>
        <div class="puzzle-code" style="margin-top:10px"><div>${U.codeBlock('css', p.css)}</div><div>${U.codeBlock('html', p.html)}</div></div><div class="targets"></div></div>`);
      host.appendChild(card);
      const solved = solvePuzzle(p);
      p.targets.forEach((tg, ti) => {
        const sub = h(`<div style="margin-top:12px"><div class="prompt">${t('whatApplied', p.prop, esc(tg.label))}</div><div class="opts"></div></div>`);
        $('.targets', card).appendChild(sub);
        p.options.forEach((o, oi) => {
          const b = h(`<button type="button" class="opt"><span class="k">${'abcde'[oi]})</span><span><code>${esc(p.fmt ? p.fmt(o) : 'color: ' + o)}</code></span></button>`);
          b.addEventListener('click', async () => {
            const res = (await solved)[ti]; const ok = oi === res.answer;
            [...$('.opts', sub).children].forEach((x, j) => { x.disabled = true; if (j === res.answer) x.classList.add('right'); });
            if (!ok) b.classList.add('wrong');
            P.q(p.id + '-' + ti, ok);
            const rows = res.lines.map(l => `<li>${l.match ? '✓' : '✗'} <code>${esc(l.sel)}</code> ${l.match ? '<span class="muted">(' + (l.inline ? 'inline' : l.spec.join(',')) + ') → ' + esc(l.val) + '</span>' : '<span class="muted">' + t('noMatch') + '</span>'}</li>`).join('');
            sub.appendChild(h(`<div class="explain ${ok ? 'good' : 'bad'}"><strong>${ok ? t('correct') : t('notQuite')}</strong> ${t('rulesSet')}<ul style="margin:6px 0 0">${rows}</ul><div class="small muted" style="margin-top:6px">${t('puzFoot')}</div></div>`));
          });
          $('.opts', sub).appendChild(b);
        });
      });
    });
  }

  /* Exam part editor (used by random question and mock exam) */
  function partEditor(host, part, sc, value, onInput) {
    const cfg = {}; part.tabs.forEach(t => cfg[t] = value[t] || '');
    const fixed = part.id === 'q1' ? {} : { html: EXAM.PARTS[0].model(sc).html, css: EXAM.PARTS[0].model(sc).css };
    if (part.id !== 'q1') cfg.mode = 'web';
    return lab(host, cfg, { tabs: part.tabs.slice(), fixed, autorun: part.id === 'q1', height: 480, onInput });
  }
  function specPanel(part, sc) {
    let extra = '';
    if (part.id !== 'q1') extra = `<details class="model"><summary>${t('showHtml')}</summary>${U.codeBlock('html', EXAM.PARTS[0].model(sc).html)}</details>`;
    return `<div class="spec" dir="ltr" lang="en">${I18N.isAr() ? '<div class="note" dir="rtl" lang="ar">' + t('examEnglish') + '</div>' : ''}${md(part.spec(sc))}${extra}<p class="small muted" ${I18N.isAr() ? 'dir="rtl" lang="ar"' : ''}>${t('noAuto')}</p></div>`;
  }
  async function gradePart(part, sc, ans) { return part.grade(sc, ans, frame()); }
  function resultBlock(part, sc, items) {
    const got = items.reduce((a, c) => a + (c.ok ? c.pts : 0), 0);
    const el = h(`<div class="card" style="margin-bottom:18px"><div class="row" style="justify-content:space-between"><h3 style="margin:0">${part.title}</h3><span class="score-pill">${got} / ${part.marks}</span></div><div class="checks"></div><details class="model"><summary>${t('model')}</summary><div></div></details></div>`);
    renderChecks($('.checks', el), items);
    const m = part.model(sc), mh = $('details div', el);
    Object.entries(m).forEach(([l, c]) => mh.insertAdjacentHTML('beforeend', U.codeBlock(l, c)));
    return { el, got };
  }

  function viewRandomQ() {
    const host = practiceShell('practice-exam');
    const sc = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)], part = EXAM.PARTS[Math.floor(Math.random() * 3)];
    host.innerHTML = `<div class="toolbar"><span class="chip">${t('scenario')}: ${esc(sc.name)}</span><span class="chip">${part.title}</span><button class="btn" id="another" type="button">${t('anotherQ')}</button></div>
      <div class="exam-grid">${specPanel(part, sc)}<div><div id="ed"></div><div class="row"><button class="btn primary" id="grade" type="button">${t('mark')}</button></div><div id="helphost" style="margin-top:12px"></div><div id="res" style="margin-top:14px"></div></div></div>`;
    $('#another').addEventListener('click', viewRandomQ);
    const E = partEditor($('#ed'), part, sc, EXAM.starter[part.id]);
    helpPanel($('#helphost'), E, { solution: () => part.model(sc), tip: async () => { const it = await gradePart(part, sc, E.values()); const miss = it.find(i => !i.ok); return miss ? miss.d : null; } });
    $('#grade').addEventListener('click', async () => {
      $('#res').innerHTML = '<p class="muted">' + t('marking') + '</p>';
      const items = await gradePart(part, sc, E.values());
      $('#res').innerHTML = ''; $('#res').appendChild(resultBlock(part, sc, items).el);
      E.run();
    });
  }

  function viewPlayground() {
    const host = practiceShell('practice-playground');
    const saved = U.store.get('playground', null) || { html: `<h1>My playground</h1>
<form id="myForm">
  <input id="name" required>
  <button type="submit">Add</button>
</form>
<ul id="list"></ul>`, css: `h1 { color: #2346d8; }
#list li { padding: 4px 0; }`, js: `document.getElementById('myForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const li = document.createElement('li');
  li.textContent = document.getElementById('name').value;
  document.getElementById('list').appendChild(li);
});` };
    host.insertAdjacentHTML('beforeend', '<p class="muted">' + t('playLead') + '</p><div id="pg"></div><div class="row"><button class="btn ghost small" id="pgClear" type="button">' + t('playClear') + '</button></div>');
    let L;
    const save = () => U.store.set('playground', L.values());
    L = lab($('#pg'), { html: saved.html, css: saved.css, js: saved.js }, { height: 460, onInput: () => save() });
    $('#pgClear').addEventListener('click', () => { L.set({ html: '', css: '', js: '' }); save(); L.run(); });
  }

  function viewChallenges() {
    const host = practiceShell('practice-challenges');
    const c = P.chal();
    host.innerHTML = '<p class="muted">' + t('chalLead') + '</p>' + MODULES.map(m => `<h3 style="margin-top:18px">${m.num} · ${esc(I18N.modTitle(m))}</h3><div class="lesson-list">${lessonsOf(m.id).filter(l => l.challenge).map(l => `<a class="lesson-link" href="#lesson-${l.id}" data-l="${l.id}"><span class="t">${esc(I18N.lesson(l).title)}</span>${c[l.id] ? '<span class="chip done">' + t('done') + '</span>' : '<span class="chip">' + t('todo') + '</span>'}</a>`).join('')}</div>`).join('');
    host.querySelectorAll('[data-l]').forEach(a => a.addEventListener('click', () => P.step(a.dataset.l, 7)));
  }

  /* ----- Mock exam ----- */
  let timerId = null;
  function viewExam() {
    clearInterval(timerId);
    const draft = U.store.get('examDraft', null);
    const hist = U.store.get('exams', []);
    app.innerHTML = `<h1>${t('mockH')}</h1>
      <p class="muted" style="max-width:70ch">${t('mockLead')}</p>
      <div class="card" style="max-width:720px"><div class="toolbar" style="margin:0">
        <label for="scSel" class="small muted">${t('scenario')}</label><select id="scSel"><option value="random">${t('random')}</option>${SCENARIOS.map(s => `<option value="${s.key}">${esc(s.name)}</option>`).join('')}</select>
        <label class="switch"><input type="checkbox" id="timed" checked> ${t('timer60')}</label>
        <button class="btn primary" id="start" type="button">${t('startExam')}</button>
        ${draft ? '<button class="btn" id="resume" type="button">' + t('resume') + '</button>' : ''}
      </div></div>
      ${hist.length ? `<h2 style="margin-top:30px">${t('attempts')}</h2><table class="history"><thead><tr><th>${t('thDate')}</th><th>${t('thScenario')}</th><th>Q1</th><th>Q2.A</th><th>Q2.B</th><th>${t('thTotal')}</th></tr></thead><tbody>${hist.slice(-10).reverse().map(x => `<tr><td>${esc(new Date(x.date).toLocaleString())}</td><td>${esc(x.sc)}</td><td>${x.p[0]}/21</td><td>${x.p[1]}/17</td><td>${x.p[2]}/17</td><td><strong>${x.total}/55</strong></td></tr>`).join('')}</tbody></table>` : ''}`;
    $('#start').addEventListener('click', () => {
      const v = $('#scSel').value; const sc = v === 'random' ? SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)] : SCENARIOS.find(s => s.key === v);
      const st = { sc: sc.key, timed: $('#timed').checked, start: Date.now(), part: 0, ans: JSON.parse(JSON.stringify(EXAM.starter)) };
      U.store.set('examDraft', st); examRun(st);
    });
    if (draft) $('#resume').addEventListener('click', () => examRun(draft));
  }
  function examRun(st) {
    const sc = SCENARIOS.find(s => s.key === st.sc);
    const save = () => U.store.set('examDraft', st);
    app.innerHTML = `<div class="toolbar" style="justify-content:space-between"><div class="row"><h2 style="margin:0">${t('mockTitle')} · ${esc(sc.name)}</h2></div>
      <div class="row">${st.timed ? '<span class="timer" id="timer" aria-live="off">60:00</span>' : ''}<button class="btn primary" id="submitExam" type="button">${t('submit')}</button></div></div>
      <div class="toolbar"><div class="seg" role="group" aria-label="Question">${EXAM.PARTS.map((p, i) => `<button type="button" data-p="${i}" aria-pressed="${i === st.part}">${p.title} · ${p.marks}</button>`).join('')}</div>
      <button class="btn ghost small" id="runAll" type="button">${t('runAll')}</button></div>
      <div id="ex"></div>`;
    const ex = $('#ex');
    const show = () => {
      app.querySelectorAll('[data-p]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.p === st.part));
      const part = EXAM.PARTS[st.part];
      ex.innerHTML = `<div class="exam-grid">${specPanel(part, sc)}<div id="ed"></div></div>`;
      const E = partEditor($('#ed'), part, sc, st.ans[part.id], () => { part.tabs.forEach(t => st.ans[part.id][t] = E.values()[t]); save(); });
    };
    app.querySelectorAll('[data-p]').forEach(b => b.addEventListener('click', () => { st.part = +b.dataset.p; save(); show(); }));
    $('#runAll').addEventListener('click', () => {
      ex.innerHTML = '<div class="note">' + t('runAllNote') + '</div><div id="all"></div>';
      lab($('#all'), { html: st.ans.q1.html, css: st.ans.q1.css, js: st.ans.q2a.js + '\n\n' + st.ans.q2b.js }, { height: 300 });
    });
    if (st.timed) {
      const tick = () => {
        const left = Math.max(0, 3600 - Math.floor((Date.now() - st.start) / 1000));
        const t = $('#timer'); if (!t) { clearInterval(timerId); return; }
        t.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
        t.classList.toggle('low', left < 300);
        if (left === 0) { clearInterval(timerId); finish(); }
      };
      clearInterval(timerId); timerId = setInterval(tick, 1000); tick();
    }
    let finishing = false;
    const finish = async () => {
      if (finishing) return; finishing = true; clearInterval(timerId);
      app.innerHTML = '<h2>' + t('markingExam') + '</h2><p class="muted">' + t('markingLead') + '</p>';
      const blocks = [], scores = [];
      for (const part of EXAM.PARTS) { const items = await gradePart(part, sc, st.ans[part.id]); const r = resultBlock(part, sc, items); blocks.push(r.el); scores.push(r.got); }
      const total = scores.reduce((a, b) => a + b, 0);
      const hist = U.store.get('exams', []); hist.push({ date: Date.now(), sc: sc.name, p: scores, total }); U.store.set('exams', hist);
      U.store.set('examDraft', null);
      const mins = Math.round((Date.now() - st.start) / 60000);
      app.innerHTML = `<div class="result-head"><div class="big-score">${total}<small> / 55</small></div><div><h2 style="margin:0">${t('mockTitle')} · ${esc(sc.name)}</h2><p class="muted" style="margin:0">Q1 ${scores[0]}/21 · Q2.A ${scores[1]}/17 · Q2.B ${scores[2]}/17 · ${mins} ${t('min')}</p></div>
        <div class="row" style="margin-inline-start:auto"><a class="btn primary" href="#exam">${t('newAttempt')}</a><a class="btn" href="#practice-exam">${t('practiseSingle')}</a></div></div>
        <div class="note">${t('reviewNote')}</div><div id="blocks"></div>`;
      blocks.forEach(b => $('#blocks').appendChild(b));
    };
    $('#submitExam').addEventListener('click', () => {
      const btn = $('#submitExam');
      if (btn.dataset.confirm) return finish();
      btn.dataset.confirm = '1'; btn.textContent = t('clickAgain');
      setTimeout(() => { if (btn.isConnected) { delete btn.dataset.confirm; btn.textContent = t('submit'); } }, 3000);
    });
    show();
  }

  function viewGuide() {
    if (I18N.isAr()) { app.innerHTML = GUIDE_AR; return; }
    app.innerHTML = `<h1>How to use this site</h1>
    <p class="muted">Written for any ITCS333 student. The midterm material is <strong>HTML + CSS + JS (till events)</strong>: chapters 3, 4, 5, 7, 8 and 9 up to events.</p>
    <ol class="guide-steps">
      <li><h3>Go through the lessons in order</h3><p>Each lesson has 8 steps: Big Picture, Simple Explanation, Deeper Understanding (with a live editor), Important Points, Exam Focus, Common Mistakes, Mini Summary and Active Recall. Do not skip the editor: change the code and press Run.</p></li>
      <li><h3>Finish every coding challenge</h3><p>The last step of each lesson has a challenge that the site checks line by line. If you are stuck, write what you can, press Check, and read which lines fail before opening the model answer.</p></li>
      <li><h3>Drill the weak spots</h3><p>Use Practice: quick quizzes by topic (tick "only ones I got wrong" to repeat mistakes) and the specificity puzzles, which follow the 2024-25 exam style.</p></li>
      <li><h3>Take a mock midterm on paper first</h3><p>The real exam is handwritten. Write your answer on paper with the timer running, then type it into the mock exam and submit. The marking follows the 2025-26 paper: about one mark per line.</p></li>
      <li><h3>Review and repeat</h3><p>Compare every ✗ with the model answer, then redo that part in "Random exam question". Each mock uses a new scenario (grades, shopping cart, library…), so you practise the pattern, not the ids.</p></li>
    </ol>
    <h2 style="margin-top:30px">Good to know</h2>
    <ul>
      <li>Progress is saved in this browser only. Another device or a classmate starts fresh.</li>
      <li>Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> in an editor to run the code; <kbd>Tab</kbd> indents.</li>
      <li>The English / عربي switch at the top changes the language. In Arabic mode the technical terms and the exam questions stay in English.</li>
      <li>Source: Connolly &amp; Hoar, <em>Fundamentals of Web Development</em>, 3rd ed., and past ITCS333 papers.</li>
    </ul>`;
  }

  /* ---------- router ---------- */
  function route() {
    clearInterval(timerId);
    document.body.classList.remove('has-full');
    const hsh = (location.hash || '#home').slice(1);
    document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('active', hsh.startsWith(a.dataset.nav) || (a.dataset.nav === 'learn' && hsh.startsWith('lesson-'))));
    if (hsh.startsWith('lesson-')) viewLesson(hsh.slice(7));
    else if (hsh === 'learn') viewLearn();
    else if (hsh === 'practice') viewPractice();
    else if (hsh === 'practice-puzzles') viewPuzzles();
    else if (hsh === 'practice-exam') viewRandomQ();
    else if (hsh === 'practice-challenges') viewChallenges();
    else if (hsh === 'practice-playground') viewPlayground();
    else if (hsh === 'exam') viewExam();
    else if (hsh === 'guide') viewGuide();
    else viewHome();
    if (!hsh.startsWith('lesson-')) window.scrollTo({ top: 0 });
    app.focus({ preventScroll: true });
  }
  let lessonKeys = null;
  document.addEventListener('keydown', e => { if (lessonKeys) lessonKeys(e); });
  window.addEventListener('hashchange', route);
  route();
})();

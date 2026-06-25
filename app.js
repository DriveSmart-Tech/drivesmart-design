/* ============================================================================
   DriveSmart gallery — shared app behaviour (single page)
   Injects the sidebar + command palette, wires theme / copy-CSS / search,
   smooth-scrolls to in-page sections (opening collapsibles on the way).
   ============================================================================ */
(function () {
  var docEl = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  function applyTheme(t) {
    if (t === 'light') docEl.setAttribute('data-theme', 'light'); else docEl.removeAttribute('data-theme');
    var ic = $('#themeToggle .material-symbols-outlined'); if (ic) ic.textContent = (t === 'light') ? 'light_mode' : 'dark_mode';
    try { localStorage.setItem('ds-theme', t); } catch (e) {}
  }
  try { applyTheme(localStorage.getItem('ds-theme') || 'dark'); } catch (e) { applyTheme('dark'); }

  function flash(btn, msg) { var o = btn.innerHTML; btn.innerHTML = msg; btn.classList.add('copied'); setTimeout(function () { btn.innerHTML = o; btn.classList.remove('copied'); }, 1400); }
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta); return Promise.resolve();
  }

  /* ── command palette (injected once) ──────────────────────────────────────── */
  var cmdk = document.createElement('div');
  cmdk.className = 'cmdk-overlay hidden'; cmdk.id = 'cmdk';
  cmdk.innerHTML =
    '<div class="cmdk"><div class="cmdk-input"><span class="material-symbols-outlined">search</span>' +
    '<input id="cmdkInput" placeholder="Search…" autocomplete="off" spellcheck="false"><span class="kbd">esc</span></div>' +
    '<div class="cmdk-list" id="cmdkList"></div><div class="cmdk-empty hidden" id="cmdkEmpty">No matches.</div></div>';
  document.body.appendChild(cmdk);
  var cmdkInput = $('#cmdkInput'), cmdkList = $('#cmdkList'), cmdkEmpty = $('#cmdkEmpty');
  var ITEMS = [], shown = [], activeIdx = 0;

  function go(id) {
    closeCmdk();
    var el = document.getElementById(id); if (!el) return;
    var det = el.querySelector('details'); if (det) det.open = true;   // open collapsibles (Brand guide / Spec)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + id);
  }
  function renderCmdk(q) {
    q = (q || '').toLowerCase().trim();
    shown = ITEMS.filter(function (it) { return (it.label + ' ' + it.group).toLowerCase().indexOf(q) !== -1; });
    activeIdx = 0; cmdkEmpty.classList.toggle('hidden', shown.length > 0);
    var html = '', lastG = null;
    shown.forEach(function (it, i) {
      if (it.group !== lastG) { html += '<div class="cmdk-group-label">' + it.group + '</div>'; lastG = it.group; }
      html += '<div class="cmdk-item' + (i === 0 ? ' active' : '') + '" data-id="' + it.id + '">' +
              '<span class="material-symbols-outlined">' + it.icon + '</span>' + it.label +
              '<span class="cmdk-grp">' + it.group + '</span></div>';
    });
    cmdkList.innerHTML = html;
  }
  function setActive(i) {
    var els = cmdkList.querySelectorAll('.cmdk-item'); if (!els.length) return;
    activeIdx = (i + els.length) % els.length;
    els.forEach(function (el, n) { el.classList.toggle('active', n === activeIdx); });
    els[activeIdx].scrollIntoView({ block: 'nearest' });
  }
  function openCmdk() { cmdk.classList.remove('hidden'); cmdkInput.value = ''; renderCmdk(''); cmdkInput.focus(); }
  function closeCmdk() { cmdk.classList.add('hidden'); }
  cmdkInput.addEventListener('input', function () { renderCmdk(this.value); });
  cmdkInput.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); if (shown[activeIdx]) go(shown[activeIdx].id); }
  });
  cmdkList.addEventListener('click', function (e) { var it = e.target.closest('.cmdk-item'); if (it) go(it.getAttribute('data-id')); });
  cmdk.addEventListener('click', function (e) { if (e.target === cmdk) closeCmdk(); });
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); cmdk.classList.contains('hidden') ? openCmdk() : closeCmdk(); }
    if (e.key === 'Escape') closeCmdk();
  });

  /* ── after the sidebar partial injects ────────────────────────────────────── */
  function initSidebar() {
    var tt = $('#themeToggle');
    if (tt) { var ic = $('#themeToggle .material-symbols-outlined'); if (ic) ic.textContent = docEl.getAttribute('data-theme') === 'light' ? 'light_mode' : 'dark_mode';
      tt.addEventListener('click', function () { applyTheme(docEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light'); }); }
    var cc = $('#copyCssBtn');
    if (cc) cc.addEventListener('click', function () { fetch('drivesmart.css').then(function (r) { return r.text(); }).then(copy).then(function () { flash(cc, 'Copied!'); }).catch(function () { flash(cc, 'serve over http'); }); });
    var so = $('#cmdkOpen'); if (so) so.addEventListener('click', openCmdk);

    var links = document.querySelectorAll('#sideNav .nav-link[href^="#"]'), byId = {};
    ITEMS = Array.prototype.map.call(links, function (a) {
      var id = a.getAttribute('href').slice(1); byId[id] = a;
      a.addEventListener('click', function (e) { e.preventDefault(); go(id); });
      return { id: id, label: ($('.lbl', a) || a).textContent.trim(),
               group: (a.closest('.nav-group').querySelector('.nav-group-label') || {}).textContent || '',
               icon: (a.querySelector('.material-symbols-outlined') || {}).textContent || 'chevron_right' };
    });

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var l = byId[en.target.id]; if (!l) return;
            links.forEach(function (x) { x.classList.remove('active'); });
            l.classList.add('active'); l.scrollIntoView({ block: 'nearest' });
          }
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      document.querySelectorAll('.comp[id]').forEach(function (s) { obs.observe(s); });
    }
  }

  var mount = document.getElementById('appSidebar');
  if (mount) {
    fetch('sidebar.html').then(function (r) { return r.text(); }).then(function (html) { mount.innerHTML = html; initSidebar(); })
      .catch(function () { mount.innerHTML = '<div class="brand"><span class="text-headline-md">DriveSmart</span></div>'; });
  }
})();

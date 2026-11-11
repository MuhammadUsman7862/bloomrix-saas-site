(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page;

  /* ---------- Icons ---------- */
  const PATHS = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    check: '<path d="M5 13l4 4L19 7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 21a7 7 0 0 1 14 0M17 4.5a3.5 3.5 0 0 1 0 7M22 21a7 7 0 0 0-4-6.3"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    plug: '<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7zM10 20a2 2 0 0 0 4 0"/>',
  };
  const svg = (n, cls = 'h-5 w-5') =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[n]}</svg>`;
  const logo = `<span class="grid h-8 w-8 place-items-center rounded-lg bg-brand-700 text-white dark:bg-brand-400 dark:text-ink-950"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 16c3-3 6 3 9 0s6 3 9 0"/></svg></span>`;

  /* ---------- Theme (saved in localStorage) ---------- */
  const root = document.documentElement;
  const getTheme = () => { try { return localStorage.getItem('theme'); } catch { return null; } };
  const setTheme = (t) => {
    root.classList.toggle('dark', t === 'dark');
    try { localStorage.setItem('theme', t); } catch {}
    $$('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', t === 'dark'));
  };
  const themeBtn = `<button type="button" data-theme-toggle class="btn-ghost" aria-label="Toggle dark theme" aria-pressed="false"><span class="dark:hidden">${svg('moon')}</span><span class="hidden dark:inline">${svg('sun')}</span></button>`;
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-theme-toggle]')) setTheme(root.classList.contains('dark') ? 'light' : 'dark');
  });

  /* ---------- Shared layout ---------- */
  const NAV = [['index.html', 'Home'], ['pricing.html', 'Pricing'], ['dashboard.html', 'Dashboard'], ['profile.html', 'Profile']];
  const links = (cls = '') => NAV.map(([h, t]) => `<a href="${h}" class="nav-link ${cls}" ${h.startsWith(page) ? 'aria-current="page"' : ''}>${t}</a>`).join('');

  const header = $('#site-header');
  if (header) {
    header.outerHTML = `<header class="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur dark:border-ink-700 dark:bg-ink-900/90">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="index.html" class="flex items-center gap-2 font-display text-xl font-bold text-ink-900 dark:text-white">${logo}Bloomrix</a>
        <nav aria-label="Main" class="hidden items-center gap-1 md:flex">${links()}</nav>
        <div class="flex items-center gap-2">${themeBtn}
          <a href="pricing.html" class="btn-primary hidden sm:inline-flex">Start free</a>
          <button id="menu-btn" type="button" class="btn-ghost md:hidden" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">${svg('menu')}</button>
        </div>
      </div>
      <nav id="mobile-menu" aria-label="Mobile" class="hidden border-t border-ink-100 dark:border-ink-700 md:hidden"><div class="flex flex-col gap-1 p-4">${links()}<a href="pricing.html" class="btn-primary mt-2">Start free</a></div></nav>
    </header>`;
    $('#menu-btn').addEventListener('click', (e) => {
      const open = $('#mobile-menu').classList.toggle('hidden') === false;
      e.currentTarget.setAttribute('aria-expanded', open);
    });
  }

  const footer = $('#site-footer');
  if (footer) {
    const col = (t, items) => `<div><h3 class="text-sm font-semibold">${t}</h3><ul class="mt-3 space-y-2 text-sm">${items.map(([h, l]) => `<li><a class="muted rounded hover:text-brand-700 hover:underline dark:hover:text-brand-300" href="${h}">${l}</a></li>`).join('')}</ul></div>`;
    footer.outerHTML = `<footer class="border-t border-ink-100 bg-ink-50 dark:border-ink-700 dark:bg-ink-950">
      <div class="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div class="sm:col-span-2 lg:col-span-1"><a href="index.html" class="flex items-center gap-2 font-display text-xl font-bold text-ink-900 dark:text-white">${logo}Bloomrix</a><p class="muted mt-3 max-w-xs text-sm">Project tracking that stays calm when the work gets busy.</p></div>
        ${col('Product', [['index.html#features', 'Features'], ['pricing.html', 'Pricing'], ['index.html#faq', 'FAQ']])}
        ${col('Account', [['dashboard.html', 'Dashboard'], ['profile.html', 'Profile'], ['pricing.html', 'Billing']])}
        ${col('Company', [['index.html', 'About'], ['index.html#testimonials', 'Customers'], ['mailto:hello@bloomrix.example', 'Contact']])}
      </div>
      <p class="muted border-t border-ink-100 px-4 py-5 text-center text-sm dark:border-ink-700">© 2026 Bloomrix. All rights reserved.</p></footer>`;
  }

  const sidebar = $('#app-sidebar');
  if (sidebar) {
    const side = [['dashboard.html', 'Overview', 'grid'], ['dashboard.html#projects', 'Projects', 'folder'], ['pricing.html', 'Billing', 'card'], ['profile.html', 'Profile', 'user']];
    sidebar.innerHTML = `<div id="overlay" class="fixed inset-0 z-40 hidden bg-ink-950/60 lg:hidden"></div>
      <aside id="sidebar" aria-label="Sidebar" class="fixed inset-y-0 left-0 z-50 flex w-64 -translate-x-full flex-col border-r border-ink-100 bg-white transition-transform lg:translate-x-0 dark:border-ink-700 dark:bg-ink-900">
        <div class="flex items-center justify-between px-4 py-4"><a href="index.html" class="flex items-center gap-2 font-display text-xl font-bold text-ink-900 dark:text-white">${logo}Bloomrix</a>
          <button type="button" id="close-side" class="btn-ghost lg:hidden" aria-label="Close sidebar">${svg('x')}</button></div>
        <nav aria-label="App" class="flex-1 space-y-1 px-3">${side.map(([h, t, i]) => `<a href="${h}" class="nav-link flex items-center gap-3" ${h === page + '.html' ? 'aria-current="page"' : ''}>${svg(i, 'h-5 w-5')}${t}</a>`).join('')}</nav>
        <div class="m-3 flex items-center gap-3 rounded-xl bg-ink-50 p-3 dark:bg-ink-800"><span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white dark:bg-brand-400 dark:text-ink-950">MU</span>
          <div class="min-w-0"><p class="truncate text-sm font-semibold text-ink-900 dark:text-white">Muhammad Usman</p><p class="muted truncate text-xs">Team plan</p></div></div>
      </aside>`;
    const toggleSide = (open) => {
      $('#sidebar').classList.toggle('-translate-x-full', !open);
      $('#overlay').classList.toggle('hidden', !open);
    };
    document.addEventListener('click', (e) => {
      if (e.target.closest('#open-side')) toggleSide(true);
      else if (e.target.closest('#close-side') || e.target.id === 'overlay') toggleSide(false);
    });
    document.addEventListener('keydown', (e) => e.key === 'Escape' && toggleSide(false));
  }
  const topbar = $('#app-topbar');
  if (topbar) {
    topbar.innerHTML = `<div class="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-ink-100 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 dark:border-ink-700 dark:bg-ink-900/90">
      <div class="flex items-center gap-2"><button type="button" id="open-side" class="btn-ghost lg:hidden" aria-label="Open sidebar">${svg('menu')}</button><p class="font-display text-lg font-semibold text-ink-900 dark:text-white">${document.body.dataset.title}</p></div>
      <div class="flex items-center gap-2">${themeBtn}<a href="profile.html" class="grid h-9 w-9 place-items-center rounded-full bg-brand-700 text-xs font-bold text-white dark:bg-brand-400 dark:text-ink-950" aria-label="Your profile">MU</a></div></div>`;
  }

  /* ---------- Pricing cards + monthly/yearly toggle ---------- */
  const PLANS = [
    { name: 'Starter', m: 12, y: 120, blurb: 'For solo makers getting organised.', feat: ['3 active projects', '1 GB file storage', 'Basic reports', 'Email support'] },
    { name: 'Team', m: 29, y: 290, rec: true, blurb: 'For growing teams shipping every week.', feat: ['Unlimited projects', '50 GB file storage', 'Advanced reports', 'Priority support', 'Integrations'] },
    { name: 'Business', m: 79, y: 790, blurb: 'For organisations with security needs.', feat: ['Everything in Team', '1 TB file storage', 'Single sign-on', 'Audit log', 'Dedicated manager'] },
  ];
  const plans = $('[data-plans]');
  if (plans) {
    plans.innerHTML = PLANS.map((p) => `<article class="plan-card ${p.rec ? 'plan-card-featured' : ''}">
      <div class="flex items-center justify-between gap-2"><h3 class="text-xl font-bold">${p.name}</h3>${p.rec ? '<span class="badge-brand">Recommended</span>' : ''}</div>
      <p class="muted mt-1 text-sm">${p.blurb}</p>
      <p class="mt-5 flex items-baseline gap-1"><span class="font-display text-4xl font-bold text-ink-900 dark:text-white" data-price data-m="${p.m}" data-y="${p.y}">$${p.m}</span><span class="muted text-sm" data-unit>/month</span></p>
      <ul class="mb-8 mt-6 space-y-3 text-sm">${p.feat.map((f) => `<li class="flex items-start gap-2"><span class="mt-0.5 text-brand-700 dark:text-brand-300">${svg('check', 'h-4 w-4')}</span>${f}</li>`).join('')}</ul>
      <a href="dashboard.html" class="${p.rec ? 'btn-primary' : 'btn-secondary'} mt-auto" aria-label="Get started with ${p.name}">Get started</a></article>`).join('');
    const sw = $('#billing-toggle');
    const update = () => {
      const yearly = sw.getAttribute('aria-checked') === 'true';
      $$('[data-price]').forEach((el) => (el.textContent = '$' + (yearly ? el.dataset.y : el.dataset.m)));
      $$('[data-unit]').forEach((el) => (el.textContent = yearly ? '/year' : '/month'));
      $('#lbl-m').classList.toggle('font-semibold', !yearly);
      $('#lbl-y').classList.toggle('font-semibold', yearly);
    };
    sw.addEventListener('click', () => { sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') !== 'true'); update(); });
    update();
  }

  /* ---------- Dashboard: stats + projects table ---------- */
  const DATA = [
    ['Website redesign', 'Amina Khan', 'Active', '2026-12-05', 4800], ['Mobile app MVP', 'Bilal Ahmed', 'Active', '2026-12-20', 12500],
    ['Brand guidelines', 'Sara Malik', 'Completed', '2026-10-30', 2200], ['Q4 marketing plan', 'Hamza Ali', 'Pending', '2026-11-28', 3100],
    ['Customer portal', 'Zainab Raza', 'Active', '2027-01-15', 9800], ['Data migration', 'Omar Farooq', 'Completed', '2026-10-12', 5400],
    ['Support chatbot', 'Amina Khan', 'Pending', '2026-12-18', 6700], ['Annual report', 'Sara Malik', 'Completed', '2026-09-30', 1800],
    ['Billing integration', 'Bilal Ahmed', 'Active', '2026-11-25', 7300], ['Onboarding emails', 'Hamza Ali', 'Pending', '2026-12-02', 1500],
    ['Security audit', 'Zainab Raza', 'Active', '2026-12-10', 8900], ['Help centre refresh', 'Omar Farooq', 'Completed', '2026-10-22', 2600],
  ].map(([name, owner, status, due, budget]) => ({ name, owner, status, due, budget }));
  const BADGE = { Active: 'badge-info', Completed: 'badge-success', Pending: 'badge-warning' };

  if ($('#project-rows')) {
    $('[data-stat=total]').textContent = DATA.length;
    $('[data-stat=active]').textContent = DATA.filter((d) => d.status === 'Active').length;
    const PER = 5;
    let pageNo = 1;
    const state = () => {
      const q = $('#search').value.trim().toLowerCase();
      const f = $('#status-filter').value;
      return DATA.filter((d) => (f === 'all' || d.status === f) && (d.name + ' ' + d.owner).toLowerCase().includes(q));
    };
    const render = () => {
      const rows = state();
      const pages = Math.max(1, Math.ceil(rows.length / PER));
      pageNo = Math.min(pageNo, pages);
      const start = (pageNo - 1) * PER;
      const slice = rows.slice(start, start + PER);
      $('#project-rows').innerHTML = slice.length
        ? slice.map((d) => `<tr class="hover:bg-ink-50 dark:hover:bg-ink-900/40"><td class="td font-medium text-ink-900 dark:text-white">${d.name}</td><td class="td hidden sm:table-cell">${d.owner}</td><td class="td"><span class="${BADGE[d.status]}">${d.status}</span></td><td class="td hidden md:table-cell">${new Date(d.due).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td><td class="td text-right tabular-nums">$${d.budget.toLocaleString()}</td></tr>`).join('')
        : `<tr><td colspan="5" class="td py-10 text-center muted">No projects match your search. Try a different name or clear the filter.</td></tr>`;
      $('#result-count').textContent = rows.length ? `Showing ${start + 1}–${start + slice.length} of ${rows.length} projects` : 'Showing 0 projects';
      $('#pager').innerHTML =
        `<button class="btn-secondary px-3 py-1.5" data-go="${pageNo - 1}" ${pageNo === 1 ? 'disabled' : ''}>Previous</button>` +
        Array.from({ length: pages }, (_, i) => `<button class="${i + 1 === pageNo ? 'btn-primary' : 'btn-secondary'} px-3 py-1.5" data-go="${i + 1}" ${i + 1 === pageNo ? 'aria-current="page"' : ''} aria-label="Page ${i + 1}">${i + 1}</button>`).join('') +
        `<button class="btn-secondary px-3 py-1.5" data-go="${pageNo + 1}" ${pageNo === pages ? 'disabled' : ''}>Next</button>`;
    };
    $('#search').addEventListener('input', () => { pageNo = 1; render(); });
    $('#status-filter').addEventListener('change', () => { pageNo = 1; render(); });
    $('#pager').addEventListener('click', (e) => { const b = e.target.closest('[data-go]'); if (b && !b.disabled) { pageNo = +b.dataset.go; render(); } });
    render();
  }

  /* ---------- Profile: forms, switches, avatar ---------- */
  const flash = (el, msg, ok = true) => {
    el.className = ok ? 'alert-success' : 'alert-error';
    el.textContent = msg;
    el.hidden = false;
  };
  $$('[role=switch][data-pref]').forEach((s) => s.addEventListener('click', () => s.setAttribute('aria-checked', s.getAttribute('aria-checked') !== 'true')));
  const prefs = $('#prefs-form');
  if (prefs) prefs.addEventListener('submit', (e) => { e.preventDefault(); flash($('#prefs-msg'), 'Notification preferences saved.'); });
  const info = $('#info-form');
  if (info) info.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#full-name').value.trim();
    $('#display-name').textContent = name || 'Muhammad Usman';
    flash($('#info-msg'), 'Profile details saved.');
  });
  const pw = $('#password-form');
  if (pw) pw.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = $('#pw-msg');
    const [cur, next, conf] = ['current-pw', 'new-pw', 'confirm-pw'].map((id) => $('#' + id).value);
    if (!cur) return flash(msg, 'Enter your current password.', false);
    if (next.length < 8) return flash(msg, 'New password must be at least 8 characters.', false);
    if (next !== conf) return flash(msg, 'New password and confirmation do not match.', false);
    pw.reset();
    flash(msg, 'Password updated.');
  });
  const photo = $('#photo-input');
  if (photo) photo.addEventListener('change', () => {
    const file = photo.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const r = new FileReader();
    r.onload = () => { $('#avatar').innerHTML = `<img src="${r.result}" alt="Your profile photo" class="h-full w-full object-cover">`; };
    r.readAsDataURL(file);
  });

  /* ---------- Finish: icons + theme state ---------- */
  $$('[data-icon]').forEach((el) => (el.outerHTML = svg(el.dataset.icon, el.className || 'h-5 w-5')));
  $$('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', root.classList.contains('dark')));
})();

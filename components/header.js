(() => {
  /* ── Styles ─────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    [data-comment="header"] {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 24px 56px; display: flex; align-items: center; justify-content: space-between;
      transition: background .4s, border-color .4s; border-bottom: 1px solid transparent;
    }
    [data-comment="header"].scrolled {
      background: rgba(17,17,17,.92); backdrop-filter: blur(14px); border-color: var(--color-border);
    }
    [data-comment="header-logo"] {
      font-family: var(--font-display); font-weight: 800; font-size: 16px;
      color: #fff; text-decoration: none; letter-spacing: .04em;
    }
    [data-comment="header-nav"] { display: flex; gap: 36px; list-style: none; margin: 0; padding: 0; }
    .nav-link { font-size: 13px; color: var(--color-muted); text-decoration: none; transition: color .2s; }
    .nav-link:hover, .nav-link.active { color: #fff; }
    @media (max-width: 768px) {
      [data-comment="header"] { padding: 20px 24px; }
      [data-comment="header-nav"] { display: none; }
    }
  `;
  document.head.appendChild(style);

  /* ── Active page detection ──────────────────────────────── */
  let path = location.pathname.split('/').pop() || 'index.html';
  if (path && !path.includes('.')) path = path + '.html';

  const navItems = [
    { label: 'Solutions',   href: 'solutions.html',   key: 'solutions'  },
    { label: 'Industries',  href: 'industries.html',  key: 'industries' },
    { label: 'How we work', href: 'how-we-work.html', key: 'process'    },
  ];

  const activeKey =
    path === 'solutions.html'   ? 'solutions'  :
    path === 'industries.html'  ? 'industries' :
    path === 'how-we-work.html' ? 'process'    : null;

  /* ── Render ─────────────────────────────────────────────── */
  const nav = navItems.map(({ label, href, key }) => {
    const isActive = key === activeKey;
    return `<li><a href="${href}" class="nav-link${isActive ? ' active' : ''}"${isActive ? ' aria-current="page"' : ''} data-comment="header-nav-${key}">${label}</a></li>`;
  }).join('\n        ');

  const header = document.createElement('header');
  header.setAttribute('data-comment', 'header');
  header.innerHTML = `
    <a href="index.html" data-comment="header-logo">Rivne Tech</a>
    <nav><ul data-comment="header-nav">
        ${nav}
    </ul></nav>
    <a href="#" data-cu-open data-comment="header-cta" class="btn btn-primary btn-sm">Let's Talk</a>
  `;
  document.body.insertAdjacentElement('afterbegin', header);

  /* ── Scroll behaviour ───────────────────────────────────── */
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 40), { passive: true });
})();

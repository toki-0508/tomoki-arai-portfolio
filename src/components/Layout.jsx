import { Fragment, useEffect, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import { EasterEgg } from './EasterEgg.jsx';
import { CLICKS_NEEDED, WINDOW_MS } from '../effects/index.js';

// ========== LOGO ==========
// onRapidClicks が渡されたときだけ連打を数える(Nav の Home 表示時のみ)。
// フッターのロゴは渡さないので、素直なリンクのまま。
export function Logo({ onRapidClicks }) {
  const clicks = useRef([]);
  const handleClick = (e) => {
    e.preventDefault();
    window.location.hash = '/';
    if (!onRapidClicks) return;
    const now = Date.now();
    clicks.current = clicks.current.filter((t) => now - t < WINDOW_MS);
    clicks.current.push(now);
    if (clicks.current.length >= CLICKS_NEEDED) {
      clicks.current = [];
      const box = e.currentTarget.getBoundingClientRect();
      onRapidClicks({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
    }
  };
  return (
    <a href="#/" className="brand" onClick={handleClick}>
      <div className="brand-name">
        <div className="brand-jp">新井智己</div>
        <div className="brand-en">Tomoki Arai</div>
      </div>
    </a>
  );
}

// ========== NAV ==========
export function Nav({ route }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [eggOrigin, setEggOrigin] = useState(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  const links = [
    { id: '/', label: 'Home' },
    { id: '/about', label: 'About' },
    { id: '/works', label: 'Works' },
    { id: '/downloads', label: 'Downloads' },
    { id: '/contact', label: 'Contact' },
  ];
  const go = (e, id) => { e.preventDefault(); window.location.hash = id; window.scrollTo({ top: 0, behavior: 'auto' }); setOpen(false); };
  return (
    <Fragment>
      {eggOrigin && <EasterEgg origin={eggOrigin} onDone={() => setEggOrigin(null)} />}
      <header className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'nav-open' : ''}`}>
        <div className="wrap nav-inner">
          <Logo onRapidClicks={route === '/' ? setEggOrigin : null} />
          <nav className="nav-links desktop-nav">
            {links.map(l => (
              <a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)} className={`nav-link ${route === l.id ? 'active' : ''}`}>{l.label}</a>
            ))}
          </nav>
          <button className={`burger ${open ? 'open' : ''}`} aria-label="menu" onClick={() => setOpen(!open)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {links.map((l, i) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)} className={`mobile-link ${route === l.id ? 'active' : ''}`} style={{ animationDelay: `${i * 0.05}s` }}>
              <span className="mobile-link-num">{String(i+1).padStart(2,'0')}</span>
              <span className="mobile-link-label">{l.label}</span>
              <Icon.Arrow/>
            </a>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

// ========== FOOTER ==========
export function Footer() {
  const go = (e, id) => { e.preventDefault(); window.location.hash = id; window.scrollTo({ top: 0, behavior: 'auto' }); };
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <div className="footer-socials">
            <a href="https://x.com/zeno_arai" target="_blank" rel="noreferrer" aria-label="X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://github.com/toki-0508" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.08-.74.08-.74 1.21.09 1.84 1.25 1.84 1.25 1.08 1.84 2.82 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 0z"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h5>メニュー</h5>
          <ul>
            <li><a href="#/about" onClick={(e) => go(e, '/about')}>About</a></li>
            <li><a href="#/works" onClick={(e) => go(e, '/works')}>Works</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>&nbsp;</h5>
          <ul>
            <li><a href="#/downloads" onClick={(e) => go(e, '/downloads')}>Downloads</a></li>
            <li><a href="#/contact" onClick={(e) => go(e, '/contact')}>Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>得意分野</h5>
          <ul>
            <li><a href="#a">3Dデザイン</a></li>
            <li><a href="#a">Web / アプリ開発</a></li>
            <li><a href="#a">ツール開発</a></li>
            <li><a href="#a">UI / UXデザイン</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">© 2026 Tomoki Arai All Rights Reserved.</div>
    </footer>
  );
}

import { Fragment, useEffect, useState } from 'react';
import { Icon } from './Icon.jsx';

// ========== LOGO ==========
export function Logo({ size = 44 }) {
  return (
    <a href="#/" className="brand" onClick={(e) => { e.preventDefault(); window.location.hash = '/'; }}>
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
      <header className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'nav-open' : ''}`}>
        <div className="wrap nav-inner">
          <Logo />
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
          <p className="footer-name-note">新井智己（あらいともき / Tomoki Arai）のポートフォリオ</p>
          <div className="footer-socials">
            <a href="#x" aria-label="X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#instagram" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#github" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.08-.74.08-.74 1.21.09 1.84 1.25 1.84 1.25 1.08 1.84 2.82 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 0z"/></svg>
            </a>
            <a href="#youtube" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
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

// ========== CTA BANNER ==========
export function CTABanner({ title, sub, btns }) {
  const go = (e, id) => { e.preventDefault(); window.location.hash = id; window.scrollTo({ top: 0, behavior: 'auto' }); };
  return (
    <section className="block">
      <div className="wrap">
        <div className="cta-banner">
          <div className="cta-left">
            <div className="cta-icon">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="m22 2-11 11"/>
              </svg>
            </div>
            <div>
              <h3 className="cta-h">{title}</h3>
              <p className="cta-p">{sub}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
            {btns.map((b, i) => (
              <a key={i} href={`#${b.to}`} onClick={(e) => go(e, b.to)} className="cta-btn">
                {b.label} {b.icon === 'mail' ? <Icon.Mail/> : <Icon.Arrow className="arrow"/>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


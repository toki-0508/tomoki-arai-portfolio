import { useEffect, useState } from 'react';
import { Footer, Nav } from './components/Layout.jsx';
import { HomePage } from './pages/home.jsx';
import { AboutPage } from './pages/about.jsx';
import { WorksPage } from './pages/works.jsx';
import { WorkDetailPage } from './pages/work-detail.jsx';
import { DownloadsPage } from './pages/downloads.jsx';
import { ContactPage } from './pages/contact.jsx';

function getRoute() {
  const h = window.location.hash.replace(/^#/, '') || '/';
  if (['/about','/works','/downloads','/contact'].includes(h)) return h;
  if (h.startsWith('/works/')) return h;
  return '/';
}

export function App() {
  const [route, setRoute] = useState(getRoute());
  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  let Page = HomePage;
  let label = '01 Home';
  if (route === '/about') { Page = AboutPage; label = '02 About'; }
  else if (route === '/works') { Page = WorksPage; label = '03 Works'; }
  else if (route.startsWith('/works/')) { Page = () => <WorkDetailPage id={route.split('/').pop()}/>; label = '04 Work Detail'; }
  else if (route === '/downloads') { Page = DownloadsPage; label = '05 Downloads'; }
  else if (route === '/contact') { Page = ContactPage; label = '06 Contact'; }
  return (
    <div className="app" data-screen-label={label}>
      <Nav route={route}/>
      <main key={route}><Page/></main>
      <Footer/>
    </div>
  );
}


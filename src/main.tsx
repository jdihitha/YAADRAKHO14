import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Force browser to refresh tab favicon with bright Ganesha icon, bypassing stale disk cache
const ganeshaFavicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABfElEQVR4nNWWMY7CMBBFUy7albgE4gZ0NFtxAK5CwTk4ABU9xVJts9Keg4IaaqooAk2ksUY/Mx47cZCI9KXE8cx/nji2q+rdr/v+8/FSM9RpPem0FYfC5I/6FkQA8rkoiGUqzZvLqgOhwRQ3J53n8yCrTy8Iz5hHLwGsKiBIEXMSlR7lxSRBpI5eAxhchZi59qt5yobAoP/vryIAMg/nio6eAlCWCU1A652Wx6wCBtW7ZZBM0PxuguRfINtlfy2PCSCDmsMxiIM1Y5SEsPIwhAqAQSQc/XYxVc2pHauAuRgiG0Cas2TZtfZkgFj5EYDN5LPVHgMwIRBAm3yk689HR9hH+wy9PgFeqQDtipk7BzSIXAAy5s2K75P+Amsd6AOAO2XSOhBbCXEeaACk1uxv1orM+Z7aoyuhtxfwsweAEGzu7gVYBUtcDQ+AIfi+yJYsFQPwDqymeWmAUY9luQC9D6Yp1Ug5ho12NB/N3ALxYLDvIGMPJKaixh7UkPgnZKpBpn+jW6cAAAAASUVORK5CYII=';

try {
  const existingLinks = document.querySelectorAll("link[rel*='icon']");
  existingLinks.forEach(el => el.parentNode?.removeChild(el));

  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = ganeshaFavicon;
  document.head.appendChild(link);
} catch {
  // ignore
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);


// FOOTER — bookends the navbar's overlay panel: same ink tone, so the site
// opens and closes on the same dark note the bone-colored sections sit inside.
// Polish pass: a large closing wordmark for real editorial weight, and
// social links as icon buttons instead of plain text.
import './Footer.css';

const LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  {
    label: 'GitHub',
    href: '#',
    icon: <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />,
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92A1.96 1.96 0 0 0 5.25 3ZM20.5 20h-3.37v-6.06c0-1.44-.03-3.3-2.02-3.3-2.02 0-2.33 1.58-2.33 3.2V20H9.4V8.5h3.24v1.57h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20Z" />,
  },
  {
    label: 'Email',
    href: 'mailto:hello@example.com',
    icon: <path d="M3 5h18v14H3V5Zm2 2 7 6 7-6" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="1.7" />,
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <a href="#hero" className="footer__logo">Shafiqur</a>
        <a href="#hero" className="footer__back-to-top">Back to top ↑</a>
      </div>

      <nav className="footer__nav">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>

      <a href="#contact" className="footer__cta">Let's build something<span>→</span></a>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Mohammad Shafiqur Rahman</p>
        <ul className="footer__socials">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">{s.icon}</svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

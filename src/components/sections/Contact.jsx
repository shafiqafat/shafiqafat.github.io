// CONTACT / CLOSING — kept calmer than the rest (a light fade, no fly-ins
// or pins) after Testimonials' pinned sequence. Polish pass: two-column
// layout on desktop with a quick-facts panel, and the email upgraded from
// a plain underlined link to an actual button with a hover fill sweep.
import { useRef } from 'react';
import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import './Contact.css';

const FACTS = [
  { label: 'Location', value: 'Sylhet, Bangladesh' },
  { label: 'Timezone', value: 'GMT+6' },
  { label: 'Response time', value: 'Within 24 hours' },
];

function Contact() {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, { y: 16, duration: 0.9 });

  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <p className="section__eyebrow">Contact</p>

      <div className="contact__layout">
        <div className="contact__main">
          <div className="contact__available">
            <span className="contact__dot" aria-hidden="true" />
            Available for new projects
          </div>

          <h2 className="contact__heading">Let's build something that holds up.</h2>

          <a href="mailto:hello@example.com" className="contact__email">
            <span>hello@example.com</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <ul className="contact__links">
            <li><a href="#" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">Resume</a></li>
          </ul>
        </div>

        <dl className="contact__facts">
          {FACTS.map((fact) => (
            <div className="contact__fact" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Contact;

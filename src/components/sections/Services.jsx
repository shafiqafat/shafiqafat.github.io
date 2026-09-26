// SERVICES — inspiration: Lewius hover — the card darkens slightly, then
// after a short delay a soft glow ramps up, radiating from the exact point
// the cursor entered. Pointer position is tracked into CSS vars; the delay
// itself lives in the CSS transition-delay, not in JS.
// Polish pass: small line icon + a large faint index numeral per card, so
// the grid reads as an editorial spec sheet rather than three plain boxes.
import { useRef } from 'react';
import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import './Services.css';

const SERVICES = [
  {
    title: 'Frontend Development',
    desc: 'React applications built for performance, not just for the first paint.',
    icon: (
      <path d="M8 6 3 12l5 6M16 6l5 6-5 6M13 4l-2 16" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'UI Engineering',
    desc: 'Design files turned into components that hold up at every breakpoint.',
    icon: (
      <path d="M4 5h16v5H4zM4 14h7v5H4zM13 14h7v5h-7z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Interaction & Motion',
    desc: 'Scroll and hover behavior that responds to what a person is doing.',
    icon: (
      <path d="M4 12a8 8 0 1 1 8 8M4 12l3-3M4 12l3 3" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

function ServiceCard({ title, desc, icon, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <article
      ref={cardRef}
      className="services__card"
      onMouseMove={handleMouseMove}
    >
      <div className="services__glow" />
      <span className="services__index" aria-hidden="true">{String(index).padStart(2, '0')}</span>
      <svg className="services__icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        {icon}
      </svg>
      <h3>{title}</h3>
      <p>{desc}</p>
    </article>
  );
}

function Services() {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef);

  return (
    <section id="services" className="section services" ref={sectionRef}>
      <p className="section__eyebrow">Services</p>
      <h2>What I do</h2>
      <div className="services__grid">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} {...service} index={i + 1} />
        ))}
      </div>
    </section>
  );
}

export default Services;

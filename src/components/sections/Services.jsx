// SERVICES — inspiration: Lewius hover — the card darkens slightly, then
// after a short delay a soft glow ramps up, radiating from the exact point
// the cursor entered. Pointer position is tracked into CSS vars; the delay
// itself lives in the CSS transition-delay, not in JS.
import { useRef } from 'react';
import './Services.css';

const SERVICES = [
  {
    title: 'Frontend Development',
    desc: 'React applications built for performance, not just for the first paint.',
  },
  {
    title: 'UI Engineering',
    desc: 'Design files turned into components that hold up at every breakpoint.',
  },
  {
    title: 'Interaction & Motion',
    desc: 'Scroll and hover behavior that responds to what a person is doing.',
  },
];

function ServiceCard({ title, desc }) {
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
      <h3>{title}</h3>
      <p>{desc}</p>
    </article>
  );
}

function Services() {
  return (
    <section id="services" className="section services">
      <p className="section__eyebrow">Services</p>
      <h2>What I do</h2>
      <div className="services__grid">
        {SERVICES.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}

export default Services;

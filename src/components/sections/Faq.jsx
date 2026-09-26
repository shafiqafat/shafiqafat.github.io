// FAQ — accordion, single item open at a time. Uses the CSS
// grid-template-rows 0fr→1fr trick for the expand/collapse animation, so
// there's no JS height measurement involved — just a clean CSS transition.
import { useRef, useState } from 'react';
import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import './Faq.css';

const FAQS = [
  {
    q: "What's your process like?",
    a: 'Usually starts with a short call to scope the problem, then a quick turnaround on structure/wireframes before I touch any code, so we agree on direction before either of us invests real time in it.',
  },
  {
    q: 'Do you work from an existing design, or design it yourself?',
    a: "Either. I can build directly from a Figma file, or handle the UI/UX side myself if you'd rather hand off the whole thing.",
  },
  {
    q: "What's your usual turnaround time?",
    a: 'Depends on scope — a landing page is typically 1-2 weeks, a fuller product build is longer. I\'ll give you a real estimate once I know what we\'re building.',
  },
  {
    q: 'Are you available for contract or full-time roles?',
    a: "Open to both — update this once you know which you're currently looking for.",
  },
  {
    q: 'Do you handle backend work too?',
    a: "My focus is frontend, but I'm comfortable wiring up to REST APIs and can work alongside a backend engineer or handle simple backend needs myself.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq__item${isOpen ? ' is-open' : ''}`}>
      <button
        className="faq__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{item.q}</span>
        <span className="faq__icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="faq__answer-wrap">
        <div className="faq__answer">
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef);

  return (
    <section id="faq" className="section faq" ref={sectionRef}>
      <p className="section__eyebrow">FAQ</p>
      <h2>Questions people usually ask</h2>

      <div className="faq__list">
        {FAQS.map((item, i) => (
          <FaqItem
            key={item.q}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}

export default Faq;

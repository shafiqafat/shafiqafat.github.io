import { useState } from "react";
import "./Faq.css";

const FAQS = [
  {
    q: "What's your process like?",
    a: "Usually starts with a short call to scope the problem, then a quick turnaround on structure and wireframes before I touch any code, so we agree on direction before either of us invests real time in it.",
  },
  {
    q: "Do you work from an existing design, or design it yourself?",
    a: "Either. I can build directly from a Figma file, or handle the UI/UX side myself if you'd rather hand off the whole thing.",
  },
  {
    q: "What's your usual turnaround time?",
    a: "Depends on scope — a landing page is typically 1–2 weeks, while a fuller product build takes longer. I'll give you a realistic estimate once I know what we're building.",
  },
  {
    q: "Are you available for contract or full-time roles?",
    a: "I'm open to both contract and full-time opportunities depending on the role, project, and working arrangement.",
  },
  {
    q: "Do you handle backend work too?",
    a: "My focus is frontend development, but I'm comfortable working with REST APIs, Supabase, authentication, databases, and simple backend requirements.",
  },
];

function FaqItem({ item, index, isOpen, onToggle }) {
  return (
    <article className={`faq__item${isOpen ? " is-open" : ""}`}>
      <button
        type="button"
        className="faq__question"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="faq__question-content">
          <span className="faq__number">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="faq__question-text">{item.q}</span>
        </span>

        <span className="faq__icon" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        id={`faq-answer-${index}`}
        className="faq__answer-wrap"
        aria-hidden={!isOpen}
      >
        <div className="faq__answer">
          <p>{item.a}</p>
        </div>
      </div>
    </article>
  );
}

function Faq() {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  return (
    <section id="faq" className="section faq">
      <div className="faq__top">
        <p className="section__eyebrow">FAQ</p>
      </div>

      <div className="faq__grid">
        {FAQS.map((item, index) => (
          <FaqItem
            key={item.q}
            item={item}
            index={index}
            isOpen={openItems.includes(index)}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Faq;

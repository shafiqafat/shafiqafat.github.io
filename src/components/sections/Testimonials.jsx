// TESTIMONIALS — inspiration: Monod's stacked cards. The section pins while
// the current card exits and the next one, previously just peeking from
// behind, slides into the front position — repeating for each testimonial.
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "Shafiqur turned a rough Figma file into something that actually felt like the product we'd imagined — and pointed out three accessibility gaps we hadn't caught.",
    author: 'Client Name',
    role: 'Role, Company',
  },
  {
    quote: "Fast, communicative, and the code was clean enough that our team could pick it up without a handoff call.",
    author: 'Client Name',
    role: 'Role, Company',
  },
  {
    quote: "The kind of frontend engineer who asks about the design decision before implementing it, not after.",
    author: 'Client Name',
    role: 'Role, Company',
  },
  {
    quote: "Shipped a fully responsive rebuild two days ahead of schedule with zero regressions.",
    author: 'Client Name',
    role: 'Role, Company',
  },
];

const PEEK = { x: 36, y: 18, rotate: 5, scale: 0.94 };
const FRONT = { x: 0, y: 0, rotate: 0, scale: 1 };

function Testimonials() {
  const pinRef = useRef(null);
  const stackRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];
  const [active, setActive] = useState(0);

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useLayoutEffect(() => {
    const cards = cardRefs.current;
    const total = cards.length;
    if (!total) return;

    const ctx = gsap.context(() => {
      // initial stack: card 0 in front, card 1 peeking, rest hidden at the peek spot
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { ...FRONT, opacity: 1, zIndex: total });
        } else if (i === 1) {
          gsap.set(card, { ...PEEK, opacity: 1, zIndex: total - 1 });
        } else {
          gsap.set(card, { ...PEEK, opacity: 0, zIndex: total - i });
        }
      });

      const steps = total - 1;
      const stepLength = 600;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: `+=${steps * stepLength}`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            setActive(Math.min(total - 1, Math.round(self.progress * steps)));
          },
        },
      });

      for (let i = 0; i < steps; i += 1) {
        tl.to(cards[i], { x: -60, y: -30, rotate: -8, scale: 0.9, opacity: 0, duration: 1 }, i);
        tl.to(cards[i + 1], { ...FRONT, opacity: 1, duration: 1 }, i);
        if (cards[i + 2]) {
          tl.to(cards[i + 2], { ...PEEK, opacity: 1, duration: 1 }, i);
        }
      }
    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="testimonials" ref={pinRef}>
      <div className="testimonials__inner section">
        <div className="testimonials__head">
          <p className="section__eyebrow">Testimonials</p>
          <div className="testimonials__progress">
            <div className="testimonials__dots">
              {TESTIMONIALS.map((t, i) => (
                <span key={t.author + i} className={`testimonials__dot${i === active ? ' is-active' : ''}`} />
              ))}
            </div>
            <span className="testimonials__count">
              {String(active + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="testimonials__stack" ref={stackRef}>
          {TESTIMONIALS.map((t) => (
            <blockquote className="testimonials__card" key={t.author + t.quote.slice(0, 8)} ref={addCardRef}>
              <span className="testimonials__quote-mark" aria-hidden="true">“</span>
              <p>{t.quote}</p>
              <cite>
                <span className="testimonials__avatar" aria-hidden="true">{t.author.charAt(0)}</span>
                <span className="testimonials__cite-text">
                  <span className="testimonials__author">{t.author}</span>
                  <span className="testimonials__role">{t.role}</span>
                </span>
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

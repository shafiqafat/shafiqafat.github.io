// DATA / STATS — inspiration: Monod's stat cards, structure + hover.
// Numbers count up once, the first time the section scrolls into view
// (not every time — a counter that replays on every scroll gets annoying
// fast), and each card lifts slightly on hover.
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stats.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: 3, suffix: '+', label: 'Years of experience' },
  { number: 20, suffix: '+', label: 'Projects shipped' },
  { number: 100, suffix: '%', label: 'Responsive, accessible builds' },
  { number: 40, suffix: '%', label: 'Avg. load-time improvement' },
];

function Stats() {
  const gridRef = useRef(null);
  const numberRefs = useRef([]);
  numberRefs.current = [];

  const addNumberRef = (el) => {
    if (el && !numberRefs.current.includes(el)) numberRefs.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        const { number, suffix } = STATS[i];
        const counter = { val: 0 };

        gsap.to(counter, {
          val: number,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(counter.val) + suffix;
          },
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" className="section stats">
      <p className="section__eyebrow">By the numbers</p>
      <div className="stats__grid" ref={gridRef}>
        {STATS.map((stat, i) => (
          <div className="stats__card" key={stat.label}>
            <strong ref={addNumberRef}>0{stat.suffix}</strong>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;

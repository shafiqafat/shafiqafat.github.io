// DATA / STATS — inspiration: Monod's stat cards, structure + hover.
// Numbers count up once, the first time the section scrolls into view
// (not every time — a counter that replays on every scroll gets annoying
// fast). Polish pass: hover is now a real pointer-tracked 3D tilt rather
// than a flat lift, plus a small icon per stat for visual anchoring.
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stats.css';

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  clock: <path d="M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" strokeLinecap="round" strokeLinejoin="round" />,
  box: <path d="M21 8 12 3 3 8l9 5 9-5ZM3 8v8l9 5 9-5V8M12 13v8" strokeLinecap="round" strokeLinejoin="round" />,
  check: <path d="M9 12l2 2 4-4M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" strokeLinecap="round" strokeLinejoin="round" />,
  gauge: <path d="M12 14 15 10M4 14a8 8 0 1 1 16 0" strokeLinecap="round" strokeLinejoin="round" />,
};

const STATS = [
  { number: 3, suffix: '+', label: 'Years of experience', icon: 'clock' },
  { number: 20, suffix: '+', label: 'Projects shipped', icon: 'box' },
  { number: 100, suffix: '%', label: 'Responsive, accessible builds', icon: 'check' },
  { number: 40, suffix: '%', label: 'Avg. load-time improvement', icon: 'gauge' },
];

const TILT_RANGE = 8; // degrees

function StatCard({ stat, addNumberRef }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.setProperty('--rx', `${(-py * TILT_RANGE).toFixed(2)}deg`);
    cardRef.current.style.setProperty('--ry', `${(px * TILT_RANGE).toFixed(2)}deg`);
  };

  const handleMouseLeave = () => {
    cardRef.current.style.setProperty('--rx', '0deg');
    cardRef.current.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      className="stats__card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg className="stats__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        {ICONS[stat.icon]}
      </svg>
      <strong ref={addNumberRef}>0{stat.suffix}</strong>
      <p>{stat.label}</p>
    </div>
  );
}

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
          <StatCard stat={stat} key={stat.label} addNumberRef={addNumberRef} />
        ))}
      </div>
    </section>
  );
}

export default Stats;

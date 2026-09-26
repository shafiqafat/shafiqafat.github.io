// PERSISTENT EASTER EGG — inspiration: Ruhi Pro's uncatchable ant.
// Fixed-position (stays put through scroll), wanders idly when left alone,
// and flees the cursor once it gets close — but tuned this pass to trigger
// only at close range and flee at a believable speed, not an instant snap.
//
// CREATURE picks which one renders — flip this one line to switch.
import { useEffect, useRef } from 'react';
import './CursorCreature.css';

const CREATURE = 'spider'; // 'spider' | 'ant'

const FLEE_RADIUS = 100;       // was 150 — only reacts once the cursor is genuinely close
const MAX_FLEE_SPEED = 7.5;    // was 13 — noticeably calmer top speed
const IDLE_SPEED = 0.55;
const FRICTION = 0.9;
const MARGIN = 24;

function CursorCreature() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.transform = `translate(${window.innerWidth - 60}px, ${window.innerHeight - 60}px)`;
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    const onResize = () => { width = window.innerWidth; height = window.innerHeight; };
    window.addEventListener('resize', onResize);

    const pos = { x: width - 80, y: height - 80 };
    const vel = { x: 0, y: 0 };
    const mouse = { x: -9999, y: -9999, active: false };
    let wanderTarget = { x: pos.x, y: pos.y };
    let wanderTimer = 0;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => { mouse.active = false; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const pickWanderTarget = () => ({
      x: MARGIN + Math.random() * (width - MARGIN * 2),
      y: MARGIN + Math.random() * (height - MARGIN * 2),
    });

    let rafId;
    const tick = () => {
      const dx = pos.x - mouse.x;
      const dy = pos.y - mouse.y;
      const dist = Math.hypot(dx, dy) || 1;

      if (mouse.active && dist < FLEE_RADIUS) {
        // eased falloff (squared) instead of linear — right at the edge of
        // the radius the push is gentle, it only ramps up hard once the
        // cursor is truly on top of it, rather than snapping to top speed
        const t = 1 - dist / FLEE_RADIUS;
        const strength = t * t * MAX_FLEE_SPEED;
        vel.x += (dx / dist) * strength * 0.4;
        vel.y += (dy / dist) * strength * 0.4;
        wanderTimer = 0;
      } else {
        wanderTimer -= 1;
        if (wanderTimer <= 0) {
          wanderTarget = pickWanderTarget();
          wanderTimer = 120 + Math.random() * 180;
        }
        const wx = wanderTarget.x - pos.x;
        const wy = wanderTarget.y - pos.y;
        const wd = Math.hypot(wx, wy) || 1;
        vel.x += (wx / wd) * IDLE_SPEED * 0.08;
        vel.y += (wy / wd) * IDLE_SPEED * 0.08;
      }

      vel.x *= FRICTION;
      vel.y *= FRICTION;
      const speed = Math.hypot(vel.x, vel.y);
      const cap = mouse.active && dist < FLEE_RADIUS ? MAX_FLEE_SPEED : IDLE_SPEED * 2;
      if (speed > cap) {
        vel.x = (vel.x / speed) * cap;
        vel.y = (vel.y / speed) * cap;
      }

      pos.x += vel.x;
      pos.y += vel.y;

      if (pos.x < MARGIN) { pos.x = MARGIN; vel.x *= -0.6; }
      if (pos.x > width - MARGIN) { pos.x = width - MARGIN; vel.x *= -0.6; }
      if (pos.y < MARGIN) { pos.y = MARGIN; vel.y *= -0.6; }
      if (pos.y > height - MARGIN) { pos.y = height - MARGIN; vel.y *= -0.6; }

      const finalSpeed = Math.hypot(vel.x, vel.y);
      const angle = finalSpeed > 0.15 ? Math.atan2(vel.y, vel.x) * (180 / Math.PI) : null;

      // faster movement = quicker leg cycle; idle = slow amble
      const walkDuration = 0.9 - Math.min(finalSpeed / MAX_FLEE_SPEED, 1) * 0.68;
      el.style.setProperty('--walk-speed', `${walkDuration.toFixed(2)}s`);
      el.style.transform = `translate(${pos.x}px, ${pos.y}px)${angle !== null ? ` rotate(${angle}deg)` : ''}`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={`cursor-creature cursor-creature--${CREATURE}`} ref={wrapRef} aria-hidden="true">
      {CREATURE === 'spider' ? <SpiderSVG /> : <AntSVG />}
    </div>
  );
}

// 8 jointed legs (hip → knee → foot) in a tripod-style alternating gait,
// a two-part body (cephalothorax + abdomen), and small eye dots.
function SpiderSVG() {
  const leftLegs = [
    { hip: [15, 10], knee: [6, 5], foot: [1, 3] },
    { hip: [15, 13], knee: [4, 12], foot: [-2, 14] },
    { hip: [15, 17], knee: [4, 20], foot: [-2, 24] },
    { hip: [15, 20], knee: [6, 27], foot: [1, 32] },
  ];
  const rightLegs = leftLegs.map(({ hip, knee, foot }) => ({
    hip: [40 - hip[0], hip[1]],
    knee: [40 - knee[0], knee[1]],
    foot: [40 - foot[0], foot[1]],
  }));
  const legs = [...leftLegs, ...rightLegs];

  return (
    <svg width="40" height="34" viewBox="0 0 40 34" fill="none">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none">
        {legs.map((leg, i) => (
          <g
            key={i}
            className="cursor-creature__leg"
            style={{
              transformOrigin: `${leg.hip[0]}px ${leg.hip[1]}px`,
              animationDelay: i % 2 === 0 ? '0s' : '-0.3s',
            }}
          >
            <polyline points={`${leg.hip.join(',')} ${leg.knee.join(',')} ${leg.foot.join(',')}`} />
          </g>
        ))}
      </g>
      {/* abdomen (back) */}
      <ellipse cx="20" cy="21" rx="7.5" ry="8.5" fill="currentColor" />
      {/* cephalothorax (front) */}
      <ellipse cx="20" cy="10" rx="5.5" ry="5" fill="currentColor" />
      {/* eyes */}
      <circle cx="17.7" cy="8" r="0.9" fill="var(--color-bone, #EEEAE2)" />
      <circle cx="22.3" cy="8" r="0.9" fill="var(--color-bone, #EEEAE2)" />
    </svg>
  );
}

function AntSVG() {
  return (
    <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="cursor-creature__leg-group">
        <line x1="9" y1="6" x2="4" y2="2" />
        <line x1="9" y1="6" x2="4" y2="10" />
        <line x1="13" y1="8" x2="9" y2="3" />
        <line x1="13" y1="8" x2="9" y2="14" />
        <line x1="17" y1="8" x2="21" y2="3" />
        <line x1="17" y1="8" x2="21" y2="13" />
      </g>
      <circle cx="6" cy="8" r="3" fill="currentColor" />
      <ellipse cx="13" cy="8" rx="3.4" ry="3" fill="currentColor" />
      <ellipse cx="20" cy="8" rx="4.4" ry="3.6" fill="currentColor" />
    </svg>
  );
}

export default CursorCreature;

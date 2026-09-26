// GLOBAL SCROLL BASELINE, part 2 — Vertical's reference wasn't just smooth
// momentum (that's useSmoothScroll.js); it's also that content actually
// animates in as it scrolls into view. This was missing from Services,
// Tech Stack, Gallery, and Contact, which previously just appeared
// instantly. Fires once per element, doesn't reverse on scroll-up.
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useRevealOnScroll(ref, options = {}) {
  const { y = 28, duration = 0.7, delay = 0 } = options;

  useLayoutEffect(() => {
    if (!ref.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, y, duration, delay]);
}

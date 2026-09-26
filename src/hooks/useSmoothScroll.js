// GLOBAL SCROLL BASELINE — inspiration: Vertical's scroll feel.
// Lenis smooths the raw scroll input; GSAP's ticker drives Lenis's frame
// loop (rather than Lenis running its own rAF) so every ScrollTrigger
// instance across the site — About's word reveal, Projects' fly-in,
// Testimonials' pin, Stats' count-up — reads position off the exact same
// clock. Without this sync, pinned/scrubbed sections stutter or drift
// slightly out of step with native scroll.
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // matches --ease-standard's feel
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // in-page nav/footer links use plain #hash hrefs — route them through
    // Lenis too, since native scroll-behavior:smooth is turned off globally
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -70 });
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
}

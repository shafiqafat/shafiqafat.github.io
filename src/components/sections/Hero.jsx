import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';
import heroPortrait from '../../assets/images/hero-portrait.jpeg';

gsap.registerPlugin(ScrollTrigger);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } },
};

function Hero() {
  const heroRef = useRef(null);
  const mediaRef = useRef(null);
  const mediaInnerRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const media = mediaRef.current;
    const mediaInner = mediaInnerRef.current;

    if (!hero || !media || !mediaInner) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      const moveX = gsap.quickTo(mediaInner, 'x', { duration: 0.7, ease: 'power3.out' });
      const moveY = gsap.quickTo(mediaInner, 'y', { duration: 0.7, ease: 'power3.out' });
      const rotate = gsap.quickTo(mediaInner, 'rotation', { duration: 0.8, ease: 'power3.out' });

      const handlePointerMove = (event) => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        moveX(x * 12);
        moveY(y * 8);
        rotate(x * 1.1);

        media.style.setProperty('--hero-light-x', `${(x + 0.5) * 100}%`);
        media.style.setProperty('--hero-light-y', `${(y + 0.5) * 100}%`);
      };

      const resetPointer = () => {
        moveX(0);
        moveY(0);
        rotate(0);
        media.style.setProperty('--hero-light-x', '50%');
        media.style.setProperty('--hero-light-y', '50%');
      };

      hero.addEventListener('pointermove', handlePointerMove);
      hero.addEventListener('pointerleave', resetPointer);

      gsap.fromTo(
        media,
        { yPercent: 6, scale: 0.96, opacity: 0 },
        { yPercent: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.25 }
      );

      gsap.to(media, {
        yPercent: -12,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      return () => {
        hero.removeEventListener('pointermove', handlePointerMove);
        hero.removeEventListener('pointerleave', resetPointer);
      };
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" className="section hero">
      <div className="hero__media" ref={mediaRef} aria-hidden="true">
        <div className="hero__media-inner" ref={mediaInnerRef}>
          <img src={heroPortrait} alt="" className="hero__portrait" />
          <span className="hero__media-light" />
        </div>
      </div>

      <div className="hero__shade" aria-hidden="true" />

      <motion.div
        className="hero__inner"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="hero__role">Frontend Software Engineer</motion.p>

        <motion.h1 variants={item}>
          Mohammad Shafiqur
          <br />
          Rahman
        </motion.h1>

        <motion.p variants={item} className="hero__intro">
          I build interfaces where the code holds up as well as the
          interaction feels. React on the front end, an eye for UI/UX
          underneath.
        </motion.p>

        <motion.div variants={item} className="hero__actions">
          <a href="#work" className="hero__cta-primary">See my work</a>
          <a href="#contact" className="hero__cta-secondary">Get in touch</a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="hero__scroll-line" />
        Scroll
      </motion.div>
    </section>
  );
}

export default Hero;

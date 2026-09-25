import { motion } from "framer-motion";
import "./Hero.css";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

function Hero() {
  return (
    <section id="hero" className="hero">
      <motion.div
        className="hero__content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="hero__eyebrow">
          Frontend Software Engineer
        </motion.p>

        <motion.h1 variants={item} className="hero__title">
          Mohammad Shafiqur
          <span>Rahman</span>
        </motion.h1>

        <motion.div variants={item} className="hero__visual-wrap">
          <div className="hero__visual">
            <div className="hero__visual-placeholder">
              <span>SH</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="hero__bottom">
          <p className="hero__intro">
            I build interfaces where the code holds up as well as the
            interaction feels. React on the front end, with an eye for UI/UX
            underneath.
          </p>

          <div className="hero__actions">
            <a href="#work" className="hero__cta-primary">
              See my work
              <span aria-hidden="true">↗</span>
            </a>

            <a href="#contact" className="hero__cta-secondary">
              Get in touch
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.1,
          duration: 0.6,
        }}
        aria-hidden="true"
      >
        <span className="hero__scroll-line" />
        Scroll to explore
      </motion.div>
    </section>
  );
}

export default Hero;

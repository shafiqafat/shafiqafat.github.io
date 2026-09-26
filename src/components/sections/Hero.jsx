import { motion } from 'framer-motion';
import './Hero.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } },
};

function Hero() {
  return (
    <section id="hero" className="section hero">
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

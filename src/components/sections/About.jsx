// ABOUT — Auton-inspired word-by-word scroll reveal.
// This is the only section using this specific text effect.

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const BIO =
  "I'm a frontend engineer who spent enough time in design tools to know why a button feels wrong before I can explain it in CSS. Most of my work sits at that seam — turning a Figma file into something that holds up in a real browser, on a real connection, for a real person clicking around at 11pm. I care about the fifty milliseconds between a click and a response as much as the fifty pixels around a headline.";

function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".about__word");

      /*
       * Every word gets its own position in the timeline.
       *
       * This is important:
       * We are NOT simply fading the whole paragraph.
       *
       * Scroll progress controls the timeline:
       *
       * word 1 → word 2 → word 3 → word 4 → ...
       */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "bottom 38%",
          scrub: true,
        },
      });

      words.forEach((word, index) => {
        timeline.to(
          word,
          {
            opacity: 1,
            duration: 0.8,
            ease: "none",
          },
          index * 0.55,
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section about">
      <p className="section__eyebrow">About</p>

      <p ref={textRef} className="about__text">
        {BIO.split(" ").map((word, index) => (
          <span className="about__word" key={`${word}-${index}`}>
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}

export default About;

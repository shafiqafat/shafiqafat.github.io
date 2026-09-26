import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const BIO =
  "I'm a frontend developer who enjoys turning ideas and designs into thoughtful digital experiences. I build responsive websites and web applications with React, JavaScript, Next.js, and modern CSS, while paying close attention to interaction, performance, and the details that make an interface feel right. I like working where design and development meet, turning a visual idea into something real, usable, and built to last.";

function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const words = gsap.utils.toArray(".word", text);

    const context = gsap.context(() => {
      gsap.set(words, {
        opacity: 0.14,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 30%",
          scrub: 0.4,
        },
      });

      words.forEach((word) => {
        timeline.to(
          word,
          {
            opacity: 1,
            duration: 1,
            ease: "none",
          },
          "+=0.025",
        );
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section id="about" className="section about" ref={sectionRef}>
      <div className="about__top">
        <p className="section__eyebrow">About Me</p>
      </div>

      <div className="about__scroll-space">
        <div className="about__pin">
          <p ref={textRef} className="about__text">
            {BIO.split(" ").map((word, index) => (
              <span className="word" key={`${word}-${index}`}>
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;

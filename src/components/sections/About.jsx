// ABOUT — inspiration: Auton scroll text highlight. Words dim by default and
// light up in sequence as the paragraph scrolls through the viewport.
// This is the ONLY section using this specific effect, per the brief.
// The text is pinned for a dedicated scroll distance (rather than just
// riding the paragraph's own natural height) so the reveal has room to
// play out deliberately instead of finishing in a couple hundred pixels.
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const BIO = "I'm a frontend engineer who spent enough time in design tools to know why a button feels wrong before I can explain it in CSS. Most of my work sits at that seam — turning a Figma file into something that holds up in a real browser, on a real connection, for a real person clicking around at 11pm. I care about the fifty milliseconds between a click and a response as much as the fifty pixels around a headline.";

function About() {
  const scrollSpaceRef = useRef(null);
  const pinRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const words = textRef.current.querySelectorAll('.word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.03,
          ease: 'none',
          scrollTrigger: {
            trigger: scrollSpaceRef.current,
            pin: pinRef.current,
            start: 'top top+=70', // clears the sticky navbar height
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );
    }, scrollSpaceRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section about">
      <p className="section__eyebrow">About</p>
      <div className="about__scroll-space" ref={scrollSpaceRef}>
        <div className="about__pin" ref={pinRef}>
          <p ref={textRef} className="about__text">
            {BIO.split(' ').map((word, i) => (
              <span className="word" key={i}>{word}{' '}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;

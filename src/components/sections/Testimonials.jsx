import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Testimonials.css";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    logo: "Mōno",
    quote:
      "Working with Mōno™ felt like having an internal team rather than an external agency. They were proactive, detail-oriented, and genuinely invested in the outcome.",
    author: "John Doe",
    role: "Head design at Circle®",
    avatar: "https://i.pravatar.cc/120?img=12",
    type: "light",
  },
  {
    logo: "Radius",
    quote:
      "We didn't just get a website — we got a solid digital foundation. Mōno™ is the kind of partner you want when building something meant to last.",
    author: "Amantha Doe",
    role: "Founder of Radius®",
    avatar: "https://i.pravatar.cc/120?img=47",
    type: "light",
  },
  {
    logo: "Light Studio",
    quote:
      "Their ability to listen, challenge assumptions, and translate ideas into a clean digital system.",
    author: "Max Trump",
    role: "Founder of Light Studio®",
    avatar: "https://i.pravatar.cc/120?img=11",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85",
    type: "image",
  },
  {
    logo: "Logoipsum",
    quote:
      "What stood out with Mōno™ was the balance between design quality and technical execution. Everything was thoughtful, scalable, and built with term use in mind.",
    author: "Camila Verga",
    role: "Head design at LogoIspum®",
    avatar: "https://i.pravatar.cc/120?img=32",
    type: "light",
  },
];

const STACK_STATES = [
  {
    x: 0,
    y: 0,
    rotationZ: 0,
    rotationY: 0,
    scale: 1,
    opacity: 1,
    z: 40,
  },
  {
    x: 0,
    y: 22,
    rotationZ: 0,
    rotationY: 0,
    scale: 0.965,
    opacity: 1,
    z: 30,
  },
  {
    x: 0,
    y: 43,
    rotationZ: 0,
    rotationY: 0,
    scale: 0.93,
    opacity: 1,
    z: 20,
  },
  {
    x: 0,
    y: 63,
    rotationZ: 0,
    rotationY: 0,
    scale: 0.895,
    opacity: 1,
    z: 10,
  },
];

function Testimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const countRef = useRef(null);

  const addCardRef = (element) => {
    if (!element) return;

    if (!cardsRef.current.includes(element)) {
      cardsRef.current.push(element);
    }
  };

  useLayoutEffect(() => {
    const cards = cardsRef.current;
    const total = cards.length;

    if (!total) return;

    const ctx = gsap.context(() => {
      const setCard = (card, state) => {
        gsap.set(card, {
          x: state.x,
          y: state.y,
          rotationZ: state.rotationZ,
          rotationY: state.rotationY,
          rotationX: 0,
          scale: state.scale,
          opacity: state.opacity,
          zIndex: state.z,
        });
      };

      /* ---------------------------------------------
       INITIAL STACK
       --------------------------------------------- */

      cards.forEach((card, index) => {
        setCard(
          card,
          STACK_STATES[index] || STACK_STATES[STACK_STATES.length - 1],
        );
      });

      const steps = total - 1;
      const stepLength = 900;

      /* ---------------------------------------------
       MAIN SCROLL TIMELINE

       IMPORTANT:
       The SECTION itself is pinned.
       --------------------------------------------- */

      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },

        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top top",

          end: `+=${steps * stepLength}`,

          pin: true,

          pinSpacing: true,

          scrub: 0.8,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const rawIndex = self.progress * steps;

            const index = Math.min(total - 1, Math.round(rawIndex));

            if (countRef.current) {
              countRef.current.textContent =
                `${String(index + 1).padStart(2, "0")} / ` +
                `${String(total).padStart(2, "0")}`;
            }
          },
        },
      });

      /* ---------------------------------------------
       CARD TRANSITIONS
       --------------------------------------------- */

      for (let i = 0; i < steps; i += 1) {
        const current = cards[i];
        const next = cards[i + 1];

        const direction = i % 2 === 0 ? 1 : -1;

        /*
        Current card leaves the section
        toward upper-right / upper-left.
      */

        const exitX = direction * 430;

        const exitY = i % 2 === 0 ? -390 : -365;

        const exitRotationZ = direction === 1 ? 17 : -17;

        const exitRotationY = direction === 1 ? 16 : -16;

        /*
        Incoming card starts below
        and slightly to the opposite side.
      */

        const incomingX = direction === 1 ? -115 : 115;

        const incomingY = 145;

        const incomingRotationZ = direction === 1 ? -6 : 6;

        const incomingRotationY = direction === 1 ? -8 : 8;

        const position = i;

        /* -------------------------------------------
         1. CURRENT CARD EXITS
         ------------------------------------------- */

        timeline.to(
          current,
          {
            x: exitX,
            y: exitY,

            rotationZ: exitRotationZ,
            rotationY: exitRotationY,
            rotationX: direction === 1 ? -4 : 4,

            scale: 0.72,

            opacity: 0,

            duration: 0.46,

            ease: "power3.in",
          },
          position,
        );

        /* -------------------------------------------
         2. NEXT CARD ENTERS
         ------------------------------------------- */

        timeline.set(
          next,
          {
            x: incomingX,
            y: incomingY,

            rotationZ: incomingRotationZ,
            rotationY: incomingRotationY,
            rotationX: 4,

            scale: 0.84,

            opacity: 1,

            zIndex: 50,
          },
          position + 0.04,
        );

        /* -------------------------------------------
         3. NEXT CARD BECOMES ACTIVE
         ------------------------------------------- */

        timeline.to(
          next,
          {
            x: 0,
            y: 0,

            rotationZ: 0,
            rotationY: 0,
            rotationX: 0,

            scale: 1,

            opacity: 1,

            duration: 0.58,

            ease: "power3.out",
          },
          position + 0.18,
        );

        /* -------------------------------------------
         4. CARD BEHIND IT MOVES FORWARD
         ------------------------------------------- */

        if (cards[i + 2]) {
          timeline.to(
            cards[i + 2],
            {
              x: 0,
              y: 22,

              rotationZ: 0,
              rotationY: 0,
              rotationX: 0,

              scale: 0.965,

              opacity: 1,

              zIndex: 30,

              duration: 0.58,

              ease: "power3.out",
            },
            position + 0.18,
          );
        }

        /* -------------------------------------------
         5. THIRD CARD MOVES FORWARD
         ------------------------------------------- */

        if (cards[i + 3]) {
          timeline.to(
            cards[i + 3],
            {
              x: 0,
              y: 43,

              rotationZ: 0,
              rotationY: 0,
              rotationX: 0,

              scale: 0.93,

              opacity: 1,

              zIndex: 20,

              duration: 0.58,

              ease: "power3.out",
            },
            position + 0.18,
          );
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="testimonials" className="testimonials" ref={sectionRef}>
      <div className="testimonials__pin">
        {/* CENTER AXIS */}
        <div className="testimonials__vertical-line" />

        <span className="testimonials__line-dot testimonials__line-dot--top" />

        <span className="testimonials__line-dot testimonials__line-dot--bottom" />

        {/* LEFT LABEL */}
        <div className="testimonials__label">(Testimonials)</div>

        {/* RIGHT COUNTER */}
        <div className="testimonials__counter">
          <span ref={countRef}>01 / 04</span>
        </div>

        {/* CARD STACK */}
        <div className="testimonials__stack">
          {TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.author}
              className={`testimonials__card testimonials__card--${testimonial.type}`}
              ref={addCardRef}
            >
              {testimonial.type === "image" ? (
                <div className="testimonials__image-card">
                  <img src={testimonial.image} alt="" draggable="false" />

                  <div className="testimonials__image-overlay" />

                  <div className="testimonials__card-top">
                    <span className="testimonials__logo testimonials__logo--white">
                      {testimonial.logo}
                    </span>

                    <span className="testimonials__dots testimonials__dots--white">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>

                  <div className="testimonials__image-copy">
                    <p>{testimonial.quote}</p>

                    <strong>{testimonial.author}</strong>

                    <span>{testimonial.role}</span>
                  </div>
                </div>
              ) : (
                <div className="testimonials__light-card">
                  <div className="testimonials__card-top">
                    <span className="testimonials__logo">
                      {testimonial.logo}
                    </span>

                    <span className="testimonials__dots">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>

                  <div className="testimonials__light-copy">
                    <p>“{testimonial.quote}”</p>

                    <div className="testimonials__author">
                      <img src={testimonial.avatar} alt="" draggable="false" />

                      <div>
                        <strong>{testimonial.author}</strong>

                        <span>{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* BOTTOM HINT */}
        <div className="testimonials__scroll-hint">(Scroll for more)</div>
      </div>
    </section>
  );
}

export default Testimonials;

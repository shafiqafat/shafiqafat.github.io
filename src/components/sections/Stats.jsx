import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Stats.css";

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  clock: (
    <path
      d="M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),

  box: (
    <path
      d="M21 8 12 3 3 8l9 5 9-5ZM3 8v8l9 5 9-5V8M12 13v8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),

  check: (
    <path
      d="M9 12l2 2 4-4M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),

  gauge: (
    <path
      d="M4 14a8 8 0 1 1 16 0M12 14l3-4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

const STATS = [
  {
    number: 3,
    suffix: "+",
    label: "Years of experience",
    icon: "clock",
    detail:
      "Years spent working across frontend development, QA, and digital product work.",
    focus: "Experience",
    type: "Career",
  },

  {
    number: 20,
    suffix: "+",
    label: "Projects shipped",
    icon: "box",
    detail:
      "Websites, interfaces, experiments, and digital products built across different projects.",
    focus: "Projects",
    type: "Delivery",
  },

  {
    number: 100,
    suffix: "%",
    label: "Responsive builds",
    icon: "check",
    detail:
      "Every interface is designed to work across desktop, tablet, and mobile screen sizes.",
    focus: "Responsive",
    type: "Frontend",
  },

  {
    number: 40,
    suffix: "%",
    label: "Load-time improvement",
    icon: "gauge",
    detail:
      "A performance-focused metric representing optimization work across selected builds.",
    focus: "Performance",
    type: "Optimization",
  },
];

function StatIcon({ type }) {
  return (
    <svg
      className="stats__icon"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      {ICONS[type]}
    </svg>
  );
}

function StatCard({ stat, index, addNumberRef }) {
  return (
    <article className={`stats__card stats__card--${index + 1}`}>
      <div
        className="stats__card-inner"
        tabIndex="0"
        aria-label={`${stat.label}: ${stat.number}${stat.suffix}`}
      >
        {/* FRONT */}
        <div className="stats__face stats__face--front">
          <div className="stats__top">
            <span className="stats__label">({stat.label})</span>

            <span className="stats__dots" aria-hidden="true">
              {Array.from({ length: 4 }).map((_, dotIndex) => (
                <span
                  key={dotIndex}
                  className={
                    dotIndex <= index
                      ? "stats__dot stats__dot--active"
                      : "stats__dot"
                  }
                />
              ))}
            </span>
          </div>

          <div className="stats__main">
            <StatIcon type={stat.icon} />

            <strong ref={addNumberRef}>0{stat.suffix}</strong>

            <p>{stat.label}</p>
          </div>
        </div>

        {/* BACK */}
        <div className="stats__face stats__face--back">
          <div className="stats__back-top">
            <span className="stats__back-index">00{index + 1}</span>

            <span className="stats__back-icon">
              <StatIcon type={stat.icon} />
            </span>
          </div>

          <div className="stats__back-content">
            <span className="stats__back-kicker">{stat.type}</span>

            <h3>{stat.focus}</h3>

            <p>{stat.detail}</p>
          </div>

          <div className="stats__back-footer">
            <span>More about this</span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Stats() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const numberRefs = useRef([]);

  numberRefs.current = [];

  const addNumberRef = (element) => {
    if (element && !numberRefs.current.includes(element)) {
      numberRefs.current.push(element);
    }
  };

  useEffect(() => {
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray(".stats__card");

      const isDesktop = window.matchMedia("(min-width: 1060px)").matches;

      /*
       * ------------------------------------------------------
       * DESKTOP STARTING POSITIONS
       * ------------------------------------------------------
       *
       * All cards are visible.
       *
       * Card 1 = final position
       * Card 2 = 105px lower
       * Card 3 = 210px lower
       * Card 4 = 315px lower
       *
       * This creates the compact diagonal composition.
       */

      const startingOffsets = [0, 105, 210, 315];

      if (isDesktop) {
        gsap.set(cards, {
          y: (index) => startingOffsets[index],
        });
      } else {
        gsap.set(cards, {
          y: 0,
        });
      }

      /*
       * ------------------------------------------------------
       * COUNTERS
       * ------------------------------------------------------
       */

      numberRefs.current.forEach((element, index) => {
        const { number, suffix } = STATS[index];

        const counter = {
          value: 0,
        };

        gsap.to(counter, {
          value: number,

          duration: 1.35,

          ease: "power2.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },

          onUpdate: () => {
            element.textContent = `${Math.round(counter.value)}${suffix}`;
          },
        });
      });

      /*
       * ------------------------------------------------------
       * DESKTOP SCROLL ANIMATION
       * ------------------------------------------------------
       *
       * IMPORTANT:
       *
       * There is NO pinning.
       *
       * Card 1 stays where it is.
       *
       * Cards 2, 3 and 4 move together.
       *
       * The stage starts tall because Card 4 is lower.
       *
       * As the cards converge, the stage contracts.
       *
       * This allows Testimonials to naturally move closer
       * instead of leaving a giant blank area.
       */

      if (isDesktop) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,

            /*
             * Wait until the diagonal composition is
             * properly visible in the viewport.
             */
            start: "top 62%",

            /*
             * Middle-ground scroll distance.
             */
            end: "+=520",

            /*
             * Smooth but still responsive.
             */
            scrub: 0.7,

            invalidateOnRefresh: true,
          },
        });

        /*
         * Cards 2, 3 and 4 move together.
         */
        timeline.to(
          cards.slice(1),
          {
            y: 0,

            duration: 1,

            ease: "none",
          },
          0,
        );

        /*
         * The stage contracts at the same time.
         *
         * Starting height:
         * 250px card + 315px offset
         * = 565px
         *
         * Final height:
         * 250px
         */
        timeline.to(
          stageRef.current,
          {
            height: 250,

            duration: 1,

            ease: "none",
          },
          0,
        );
      }

      /*
       * ------------------------------------------------------
       * REFRESH
       * ------------------------------------------------------
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section id="stats" className="section stats" ref={sectionRef}>
      <div className="stats__header">
        <p className="section__eyebrow">By the numbers</p>

        <h2 className="stats__title">A few numbers worth knowing.</h2>
      </div>

      <div className="stats__stage" ref={stageRef}>
        <div className="stats__grid">
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              addNumberRef={addNumberRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;

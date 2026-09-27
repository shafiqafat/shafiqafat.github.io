import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Timeline.css";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_ITEMS = [
  {
    year: "2026",
    type: "Work",
    title: "Software Engineer Forntend",
    organization: "Accelosys",
    period: "Feb 2026 — Present",
    side: "left",
    details: [
      "Moved from QA into web development and frontend implementation.",
      "Worked with React and responsive interfaces.",
      "Turned design concepts into working web experiences.",
    ],
  },

  {
    year: "2025",
    type: "Work",
    title: "Senior Associate QA",
    organization: "Acote Group",
    period: "Sep 2025 — Jan 2026",
    side: "right",
    details: [
      "Took on increased responsibility within QA workflows.",
      "Supported quality control, process consistency, and team workflows.",
    ],
  },

  {
    year: "2025",
    type: "Work",
    title: "Associate QA",
    organization: "Acote Group",
    period: "Nov 2024 — Aug 2025",
    side: "left",
    details: [
      "Performed quality assurance checks across production workflows.",
      "Contributed to process improvements and consistent quality control.",
      "Supported teammates through practical QA workflows.",
    ],
  },

  {
    year: "2024",
    type: "Work",
    title: "Associate",
    organization: "Acote Group",
    period: "Aug 2024 — Oct 2024",
    side: "right",
    details: [
      "Worked in annotation and quality-focused production workflows.",
      "Built practical experience with structured data processes.",
    ],
  },

  {
    year: "2020",
    type: "Education",
    title: "BSc in Computer Science & Engineering",
    organization: "Southeast University",
    period: "2020 — 2024",
    side: "left",
    details: [
      "Completed 150 academic credits.",
      "Graduated with a CGPA of 3.64 / 4.00.",
      "Thesis: A Study on Selected Classification Algorithm for Liver Disease Diagnosis.",
    ],
  },
];

function Timeline() {
  const sectionRef = useRef(null);
  const lineProgressRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      /*
       * Center spine progress
       */
      gsap.fromTo(
        lineProgressRef.current,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            end: "bottom 58%",
            scrub: true,
          },
        },
      );

      /*
       * Desktop / tablet timeline movement
       *
       * Cards start away from the spine and move toward it.
       * They deliberately stop before reaching the line.
       */
      const mm = gsap.matchMedia();

      mm.add("(min-width: 761px)", () => {
        const isTablet = window.innerWidth <= 1100;

        const cardShift = isTablet ? 50 : 100;

        const connectorEnd = isTablet ? 70 / 120 : 120 / 220;

        gsap.utils.toArray(".timeline__item").forEach((item) => {
          const side = item.dataset.side;

          const card = item.querySelector(".timeline__card");
          const connector = item.querySelector(".timeline__connector");
          const dot = item.querySelector(".timeline__dot");

          const direction = side === "left" ? 1 : -1;

          /*
           * CARD
           *
           * Desktop:
           * 220px initial gap
           * -100px movement
           * = 120px final gap
           */
          gsap.fromTo(
            card,
            {
              x: 0,
              opacity: 1,
            },
            {
              x: direction * cardShift,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: item,

                /*
                 * Start when the event enters the lower part
                 * of the viewport.
                 */
                start: "top 88%",

                /*
                 * Finish before the event reaches the
                 * middle of the viewport.
                 */
                end: "center 58%",

                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );

          /*
           * CONNECTOR
           *
           * The connector starts fully extended and becomes
           * shorter as the card approaches the spine.
           */
          gsap.fromTo(
            connector,
            {
              scaleX: 1,
            },
            {
              scaleX: connectorEnd,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                end: "center 58%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );

          /*
           * DOT
           */
          gsap.fromTo(
            dot,
            {
              scale: 0.65,
            },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                end: "center 58%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="section timeline">
      <div className="timeline__header">
        <div>
          <p className="section__eyebrow">Journey</p>

          <h2 className="timeline__title">
            From learning
            <span>to building.</span>
          </h2>
        </div>

        <p className="timeline__intro">
          Education, work, certifications, and meaningful events — arranged as a
          living timeline of how my work has evolved.
        </p>
      </div>

      <div className="timeline__stage">
        {/* Center timeline */}
        <div className="timeline__spine" aria-hidden="true">
          <div ref={lineProgressRef} className="timeline__spine-progress" />
        </div>

        <div className="timeline__items">
          {TIMELINE_ITEMS.map((item) => (
            <article
              key={`${item.year}-${item.title}`}
              className={`timeline__item timeline__item--${item.side}`}
              data-side={item.side}
              tabIndex="0"
            >
              <div className="timeline__year">{item.year}</div>

              <div className="timeline__dot" aria-hidden="true" />

              <div className="timeline__connector" aria-hidden="true" />

              <div className="timeline__card">
                <div className="timeline__card-head">
                  <div>
                    <span className="timeline__type">{item.type}</span>

                    <h3>{item.title}</h3>

                    <p className="timeline__organization">
                      {item.organization}
                    </p>

                    <p className="timeline__period">{item.period}</p>
                  </div>

                  <span className="timeline__hover-mark" aria-hidden="true">
                    +
                  </span>
                </div>

                <div className="timeline__details">
                  <div className="timeline__details-inner">
                    <ul>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;

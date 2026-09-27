import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: "Project One",
    type: "Case Study",
    description:
      "A short line describing the product, the problem, and what was built.",
    image: "https://picsum.photos/id/1005/1200/900",
    href: "#",
  },
  {
    name: "Project Two",
    type: "Showcase",
    description:
      "A visual project focused on a clean interface and responsive experience.",
    image: "https://picsum.photos/id/1016/1200/900",
    href: "#",
  },
  {
    name: "Project Three",
    type: "Case Study",
    description:
      "A frontend experience built around a clear interaction system.",
    image: "https://picsum.photos/id/1020/1200/900",
    href: "#",
  },
  {
    name: "Project Four",
    type: "Showcase",
    description: "A compact digital experience with a strong visual direction.",
    image: "https://picsum.photos/id/1031/1200/900",
    href: "#",
  },
];

function ProjectCard({ project, index, cardRef }) {
  return (
    <article ref={cardRef} className="projects__item">
      <a href={project.href} className="projects__project">
        <div className="projects__project-media">
          <img src={project.image} alt={project.name} loading="lazy" />

          <div className="projects__project-overlay">
            {/* TOP CONTENT */}
            <div className="projects__overlay-top">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>

            {/* BOTTOM CONTENT */}
            <div className="projects__overlay-bottom">
              <span className="projects__case-study">
                VIEW CASE STUDY
                <span className="projects__project-arrow">↗</span>
              </span>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}

function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  cardsRef.current = [];

  const addCardRef = (element) => {
    if (element && !cardsRef.current.includes(element)) {
      cardsRef.current.push(element);
    }
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards.length) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* =========================================
         DESKTOP
         ========================================= */

      mm.add("(min-width: 781px)", () => {

        const timeline = gsap.timeline({
          defaults: {
            ease: "none",
          },

          scrollTrigger: {
            trigger: section,

            start: "top top",

            /*
             * One scroll segment per project.
             */
            end: `+=${cards.length * 850}`,

            pin: true,
            pinSpacing: true,

            /*
             * Smooth connection between
             * scroll position and card position.
             */
            scrub: 1,

            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, index) => {
          // 1st & 3rd cards = 200px left
          // 2nd & 4th cards = 200px right
          const side = index % 2 === 0 ? -280 : 280;

          gsap.set(card, {
            x: side,
            y: 750,
            rotate: 0,
            scale: 1,
            opacity: 1,
          });

          timeline.to(
            card,
            {
              x: side,
              y: -750,
              rotate: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "none",
            },
            index,
          );
        });
      });

      /* =========================================
         MOBILE
         ========================================= */

      mm.add("(max-width: 780px)", () => {
        /*
         * Mobile does not use the pinned
         * desktop composition.
         */

        gsap.set(cards, {
          clearProps: "all",
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="section projects" ref={sectionRef}>
      <div className="projects__stage">
        {/* =========================================
            CENTER HEADING
            ========================================= */}

        <div className="projects__heading">
          <p className="projects__eyebrow">(Work)</p>

          <h2>Featured work</h2>

          <p className="projects__scroll">(SCROLL TO EXPLORE)</p>
        </div>

        {/* =========================================
            PROJECT CARDS
            ========================================= */}

        <div className="projects__cards">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              cardRef={addCardRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;

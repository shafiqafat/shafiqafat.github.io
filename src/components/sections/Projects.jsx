// WORK / PROJECTS
// - Launchfolio: cards start staged at a common point, then fly out to their
//   grid position as the section scrolls into view (GSAP + ScrollTrigger).
// - Monod: one featured project sits larger/first, the rest sit in a
//   regular grid beneath it.
// - Each card is either a quick showcase or a deeper case study
//   (problem / stack / role / outcome), set per project.
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: 'Project One',
    type: 'case-study',
    featured: true,
    blurb: 'A short line on the problem this project solved.',
    stack: 'React, GSAP, Node',
    role: 'Frontend engineering, UI design',
    outcome: 'Placeholder outcome metric or result.',
  },
  {
    name: 'Project Two',
    type: 'showcase',
    blurb: 'Quick visual showcase — screenshots and a link.',
  },
  {
    name: 'Project Three',
    type: 'case-study',
    blurb: 'A short line on the problem this project solved.',
    stack: 'React, TypeScript',
    role: 'Frontend engineering',
    outcome: 'Placeholder outcome metric or result.',
  },
  {
    name: 'Project Four',
    type: 'showcase',
    blurb: 'Quick visual showcase — screenshots and a link.',
  },
];

function Projects() {
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const cards = cardRefs.current;
    if (!grid || !cards.length) return;

    const ctx = gsap.context(() => {
      const gridRect = grid.getBoundingClientRect();
      const originX = gridRect.width / 2;
      const originY = gridRect.height / 2;

      cards.forEach((card, i) => {
        const rect = {
          left: card.offsetLeft,
          top: card.offsetTop,
          width: card.offsetWidth,
          height: card.offsetHeight,
        };
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const fromX = originX - cardCenterX;
        const fromY = originY - cardCenterY;

        gsap.fromTo(
          card,
          { x: fromX, y: fromY, opacity: 0, scale: 0.82 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            delay: i * 0.06,
            scrollTrigger: {
              trigger: grid,
              start: 'top 78%',
              end: 'top 35%',
              scrub: true,
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="section projects">
      <p className="section__eyebrow">Work</p>
      <h2>Selected projects</h2>

      <div className="projects__grid" ref={gridRef}>
        {PROJECTS.map((project) => (
          <article
            key={project.name}
            ref={addCardRef}
            className={`projects__card${project.featured ? ' projects__card--featured' : ''}`}
          >
            <div className="projects__card-media" aria-hidden="true" />
            <div className="projects__card-body">
              <h3>{project.name}</h3>
              <p className="projects__card-blurb">{project.blurb}</p>

              {project.type === 'case-study' ? (
                <dl className="projects__card-meta">
                  <div>
                    <dt>Stack</dt>
                    <dd>{project.stack}</dd>
                  </div>
                  <div>
                    <dt>Role</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div>
                    <dt>Outcome</dt>
                    <dd>{project.outcome}</dd>
                  </div>
                </dl>
              ) : null}

              <a href="#" className="projects__card-link">
                {project.type === 'case-study' ? 'Read case study' : 'View project'} →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;

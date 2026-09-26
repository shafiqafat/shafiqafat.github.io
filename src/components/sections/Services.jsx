import { FiCode, FiLayout, FiZap, FiGlobe } from "react-icons/fi";

import "./Services.css";

const SERVICES = [
  {
    title: "Frontend Development",
    description:
      "Building responsive interfaces with React, JavaScript, and modern frontend tools.",
    skills: ["React", "JavaScript", "Next.js", "Responsive Design", "CSS"],
    icon: FiCode,
  },
  {
    title: "UI Engineering",
    description:
      "Turning designs into clean, reusable interfaces that work across different screen sizes.",
    skills: [
      "Figma",
      "Component Systems",
      "UI Implementation",
      "Accessibility",
      "Responsive UI",
    ],
    icon: FiLayout,
  },
  {
    title: "Interactive Web Exp.",
    description:
      "Creating thoughtful scroll, transition, and interaction effects that make interfaces feel alive.",
    skills: [
      "GSAP",
      "ScrollTrigger",
      "Framer Motion",
      "Animations",
      "Interactions",
    ],
    icon: FiZap,
  },
  {
    title: "WordPress & CMS",
    description:
      "Building and customizing production-ready websites with WordPress and Elementor.",
    skills: ["WordPress", "Elementor", "Elementor Pro", "CMS", "SEO"],
    icon: FiGlobe,
  },
];

function Services() {
  return (
    <section id="services" className="section services">
      <div className="services__header">
        <p className="section__eyebrow">Services</p>

        <h2 className="services__title">What I can do</h2>
      </div>

      <div className="services__grid">
        {SERVICES.map((service) => {
          const Icon = service.icon;

          return (
            <article className="services__card" key={service.title}>
              <div className="services__light" aria-hidden="true" />

              <div className="services__title-row">
                <span className="services__marker">
                  <Icon size={17} strokeWidth={1.7} />
                </span>

                <h3>{service.title}</h3>
              </div>

              <p className="services__description">{service.description}</p>

              <div className="services__tags">
                {service.skills.map((skill) => (
                  <span className="services__tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Services;

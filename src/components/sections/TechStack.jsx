import { motion } from "framer-motion";
import "./TechStack.css";

const SKILL_GROUPS = [
  {
    number: "01",
    title: "Frontend",
    description:
      "Building responsive interfaces and interactive web experiences.",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    number: "02",
    title: "Backend & Data",
    description:
      "Connecting interfaces to APIs, services, and application data.",
    skills: [
      "Node.js",
      "Supabase",
      "REST APIs",
      "Authentication",
      "Database Design",
    ],
  },
  {
    number: "03",
    title: "Tools & Workflow",
    description: "The tools I use to design, build, test, and ship projects.",
    skills: ["Git", "GitHub", "VS Code", "Vite", "Figma", "Adobe XD"],
  },
  {
    number: "04",
    title: "CMS & Platforms",
    description:
      "Building and customizing production-ready websites and platforms.",
    skills: ["WordPress", "Elementor", "Hostinger", "Responsive Design"],
  },
];

function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="skills__header">
        <div>
          <p className="section__eyebrow">Tech Stack</p>

          <h2 className="skills__title">
            Tools I use to
            <span>build things.</span>
          </h2>
        </div>

        <p className="skills__intro">
          A practical stack focused on building interfaces, connecting products
          to data, and shipping responsive experiences.
        </p>
      </div>

      <div className="skills__groups">
        {SKILL_GROUPS.map((group, groupIndex) => (
          <motion.article
            key={group.number}
            className="skills__group"
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              delay: groupIndex * 0.08,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            <div className="skills__group-top">
              <span className="skills__number">{group.number}</span>

              <h3 className="skills__group-title">{group.title}</h3>

              <p className="skills__group-description">{group.description}</p>
            </div>

            <div className="skills__list">
              {group.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="skill"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: groupIndex * 0.08 + index * 0.035,
                  }}
                >
                  <span>{skill}</span>

                  <span className="skill__arrow" aria-hidden="true">
                    ↗
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Skills;

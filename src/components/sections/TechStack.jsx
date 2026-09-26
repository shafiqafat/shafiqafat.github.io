import { motion } from "framer-motion";

import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  // SiNodedotjs,
  SiSupabase,
  SiGit,
  SiGithub,
  SiVite,
  SiFigma,
  SiWordpress,
  SiElementor,
} from "react-icons/si";

import { FaCss3Alt } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

import {
  FiMonitor,
  FiLayout,
  FiLayers,
  FiCode,
  FiZap,
  FiDatabase,
  FiSmartphone,
} from "react-icons/fi";

import "./TechStack.css";

const TECH_STACK = [
  {
    name: "HTML5",
    icon: SiHtml5,
  },
  {
    name: "CSS3",
    icon: FaCss3Alt,
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
  },
  {
    name: "React",
    icon: SiReact,
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
  },
  // {
  //   name: "Node.js",
  //   icon: SiNodedotjs,
  // },
  {
    name: "Supabase",
    icon: SiSupabase,
  },
  {
    name: "Git",
    icon: SiGit,
  },
  {
    name: "GitHub",
    icon: SiGithub,
  },
  {
    name: "VS Code",
    icon: VscVscode,
  },
  {
    name: "Vite",
    icon: SiVite,
  },
  {
    name: "Figma",
    icon: SiFigma,
  },
  {
    name: "WordPress",
    icon: SiWordpress,
  },
  {
    name: "Elementor",
    icon: SiElementor,
  },
];

const SERVICES = [
  {
    name: "Frontend Development",
    icon: FiCode,
  },
  {
    name: "Web Design",
    icon: FiLayout,
  },
  {
    name: "Responsive Websites",
    icon: FiSmartphone,
  },
  {
    name: "Web Applications",
    icon: FiMonitor,
  },
  {
    name: "Interactive Experiences",
    icon: FiZap,
  },
  {
    name: "CMS Development",
    icon: FiLayers,
  },
  {
    name: "Supabase Integration",
    icon: FiDatabase,
  },
];

function TechIcon({ tool, index }) {
  const Icon = tool.icon;

  return (
    <motion.div
      className="tech-stack__tool"
      initial={{
        opacity: 0,
        y: 16,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.025,
        ease: [0.65, 0, 0.35, 1],
      }}
    >
      <div className="tech-stack__icon" tabIndex="0" aria-label={tool.name}>
        <Icon aria-hidden="true" />
      </div>

      <span className="tech-stack__tooltip">{tool.name}</span>
    </motion.div>
  );
}

function ServiceItem({ service, index }) {
  const Icon = service.icon;

  return (
    <motion.div
      className="tech-stack__service"
      initial={{
        opacity: 0,
        x: 20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.65, 0, 0.35, 1],
      }}
    >
      <span className="tech-stack__service-icon">
        <Icon aria-hidden="true" />
      </span>

      <span className="tech-stack__service-name">{service.name}</span>
    </motion.div>
  );
}

function TechStack() {
  return (
    <section id="skills" className="section tech-stack">
      <div className="tech-stack__layout">
        {/* =================================================
            LEFT — TECH STACK
            ================================================= */}

        <div className="tech-stack__content">
          <p className="section__eyebrow">Tech Stack</p>

          <h2 className="tech-stack__title">
            Tools I use to
            <span>build things.</span>
          </h2>

          <div className="tech-stack__label">My tech stack</div>

          <div className="tech-stack__tools">
            {TECH_STACK.map((tool, index) => (
              <TechIcon key={tool.name} tool={tool} index={index} />
            ))}
          </div>
        </div>

        {/* =================================================
            RIGHT — SERVICES
            ================================================= */}

        <div className="tech-stack__services">
          <div className="tech-stack__services-label">What I can build</div>

          <div className="tech-stack__service-list">
            {SERVICES.map((service, index) => (
              <ServiceItem key={service.name} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechStack;

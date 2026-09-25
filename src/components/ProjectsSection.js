// Projects Section Component
// Showcases portfolio projects with images and descriptions

const ProjectsSection = {
  name: "ProjectsSection",

  template: `
        <section id="projects" class="py-20 px-6 lg:px-12 bg-black text-white">
            <div class="max-w-7xl mx-auto">
                <!-- Section Title -->
                <h2 class="text-3xl lg:text-4xl text-center mb-16 fade-in-up">
                    <span class="font-light">My</span> <span class="font-bold">Projects</span>
                </h2>
                
                <!-- Projects Grid -->
                <div class="space-y-20">
                    <div 
                        v-for="(project, index) in projects" 
                        :key="index"
                        class="fade-in-up"
                        :class="'stagger-' + (index + 1)"
                    >
                        <div 
                            class="grid lg:grid-cols-2 gap-12 items-center"
                            :class="{ 'lg:grid-flow-dense': project.imageRight }"
                        >
                            <!-- Project Image -->
                            <div 
                                class="project-image-container"
                                :class="{ 'lg:col-start-2': project.imageRight }"
                            >
                                <div class="project-image aspect-video rounded-xl overflow-hidden shadow-2xl">
                                    <img 
                                        :src="project.image" 
                                        :alt="project.title" 
                                        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    >
                                </div>
                            </div>
                            
                            <!-- Project Info -->
                            <div :class="{ 'lg:col-start-1 lg:row-start-1': project.imageRight }">
                                <div class="text-5xl lg:text-6xl font-bold text-white mb-4">
                                    {{ String(index + 1).padStart(2, '0') }}
                                </div>
                                
                                <h3 class="text-2xl lg:text-3xl font-bold mb-4">
                                    {{ project.title }}
                                </h3>
                                
                                <p class="text-gray-400 text-sm lg:text-base leading-relaxed mb-8">
                                    {{ project.description }}
                                </p>
                                
                                <!-- Project Link Button -->
                                <a 
                                    :href="project.link" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-brand-green to-emerald-500 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 hover:-translate-y-1 group"
                                >
                                    <svg class="w-5 h-5 lg:w-6 lg:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                    </svg>
                                    <span>Explore</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,

  data() {
    return {
      projects: [
        {
          title: "krea8.studio clone",
          description:
            "This project is a sample landing page that we used to develop a descriptive product showcase to create awareness to the end users. This was also to show the process of development of Figma to final functional product using React with TailwindCSS, Express.js, NodeJs along with responsive design making sure the product is scalable or extendable. This project also shows various aspects and stages that goes through product development.",
          image: "src/assets/images/project_1.JPG",
          link: "#",
          imageRight: false,
        },
        {
          title: "Parenting & Milestone Tracker App",
          description:
            "This project is a family friendly application that is developed to a scientific approach in which users can track their kid's growth and development, store memories, along with receiving guidance through stages that the kid goes through. It's designed to bring families closer together through the use of digital transformation.",
          image: "src/assets/images/project_2.JPG",
          link: "#",
          imageRight: true,
        },
        {
          title: "Task & Project Management Dashboard UI",
          description:
            "This project is a task driven and project collaborative dashboard design to help users to organize and share tasks with their team or collaborators in an efficient manner. The emphasis was placed on the simple presentation and effective navigation to work as simple as possible. This approach also supports the users in both team and individual settings.",
          image: "src/assets/images/project_3.JPG",
          link: "#",
          imageRight: false,
        },
      ],
    };
  },

  mounted() {
    this.animateOnScroll();
    window.addEventListener("scroll", this.animateOnScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.animateOnScroll);
  },

  methods: {
    animateOnScroll() {
      const elements = document.querySelectorAll(".fade-in-up");
      const windowHeight = window.innerHeight;

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
          element.classList.add("visible");
        }
      });
    },
  },
};

window.ProjectsSection = ProjectsSection;

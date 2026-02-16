// Experience Section Component
// Displays work experience timeline with clickable cards

const ExperienceSection = {
  name: "ExperienceSection",

  template: `
        <section id="experience" class="py-20 px-6 lg:px-12 bg-black text-white">
            <div class="max-w-7xl mx-auto">
                <!-- Section Title -->
                <h2 class="text-3xl lg:text-4xl font-bold text-center mb-16 fade-in-up">
                    <span class="font-light">My</span> <span class="font-bold">Experience</span>
                </h2>
                
                <!-- Experience Cards -->
                <div class="space-y-6 max-w-4xl mx-auto">
                    <div 
                        v-for="(exp, index) in experiences" 
                        :key="index"
                        class="experience-card fade-in-up border-2 border-white/20 rounded-lg p-6 lg:p-8"
                        :class="'stagger-' + (index + 1)"
                    >
                        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                            <div class="flex items-start space-x-4 mb-4 lg:mb-0">
                                <!-- Company Logo -->
                                <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <img 
                                        :src="exp.logo" 
                                        :alt="exp.company" 
                                        class="w-full h-full object-contain p-1"
                                    >
                                </div>
                                
                                <div>
                                    <h3 class="text-lg lg:text-xl font-semibold">{{ exp.title }}</h3>
                                    <p class="text-gray-400 text-sm">{{ exp.company }}</p>
                                </div>
                            </div>
                            
                            <div class="text-sm text-gray-400">
                                {{ exp.period }}
                            </div>
                        </div>
                        
                        <p class="text-gray-300 text-sm leading-relaxed">
                            {{ exp.description }}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    `,

  data() {
    return {
      experiences: [
        {
          logo: "src/assets/images/acote.png",
          title: "Senior Associate Quality Assurance at Acote Group",
          company: "Acote Group",
          period: "Sept 2025- Jan 2026",
          description:
            "As a Senior Associate, I ensured 98%+ accuracy in QA checks across large-scale AI/ML datasets while implementing process improvements that reduced annotation errors by 15% and increased overall team efficiency. I mentored and trained over 8 junior associates to maintain consistent performance and collaborated closely with clients on project documentation and progress reporting to support smooth project delivery.",
        },
        {
          logo: "src/assets/images/acote.png",
          title: "Associate Quality Assurance at Acote Group",
          company: "Acote Group",
          period: "Nov 2024 - Aug 2025",
          description:
            "As an Associate Quality Assurance, I consistently delivered dailty and weekly targets of 100+ items per day with high accuracy, identified and reported over 50 usability and data inconsistencies each month, and improved overall team efficeiency by 12% through process optimization.",
        },
        {
          logo: "src/assets/images/acote.png",
          title: "Associate at Acote Group",
          company: "Acote Group",
          period: "Aug 2024 - Oct 2024",
          description:
            "As an Associate I performed high-quality data and images annotation in alighment with project requirements while collaborating with team members to improve annotation processes and overall efficiency.",
        },
        {
          logo: "src/assets/images/a1qa-logo.svg",
          title: "QA Intern - Functional Testing at A1QA",
          company: "A1QA",
          period: "Oct 2023",
          description:
            "As a Quality Assurance Intern, I performed functional and usability testing, assisted in identifying UI issues and workflow gaps, and gained hands-on experience with various types of functional testing.",
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

window.ExperienceSection = ExperienceSection;

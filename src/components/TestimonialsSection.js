// Testimonials Section Component
// Displays client testimonials in a card grid layout

const TestimonialsSection = {
  name: "TestimonialsSection",

  template: `
        <section id="testimonials" class="py-20 px-6 lg:px-12 bg-white">
            <div class="max-w-7xl mx-auto">
                <!-- Section Title -->
                <h2 class="text-3xl lg:text-4xl text-center mb-16 fade-in-up">
                    <span class="font-light">My</span> <span class="font-bold">Testimonial</span>
                </h2>
                
                <!-- Testimonials Grid -->
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <div 
                        v-for="(testimonial, index) in testimonials" 
                        :key="index"
                        class="testimonial-card fade-in-up rounded-2xl p-8 transition-all duration-300"
                        :class="[
                            testimonial.highlight ? 'bg-black text-white' : 'bg-white border-2 border-gray-200',
                            'stagger-' + (index + 1)
                        ]"
                    >
                        <!-- Client Avatar -->
                        <div class="flex justify-center mb-6">
                            <div class="w-16 h-16 rounded-full overflow-hidden border-4"
                                 :class="testimonial.highlight ? 'border-white/20' : 'border-gray-200'"
                            >
                                <img 
                                    :src="testimonial.photo" 
                                    :alt="testimonial.name" 
                                    class="w-full h-full object-cover"
                                >
                            </div>
                        </div>
                        
                        <!-- Testimonial Text -->
                        <p 
                            class="text-center text-sm leading-relaxed mb-6"
                            :class="testimonial.highlight ? 'text-gray-300' : 'text-gray-600'"
                        >
                            "{{ testimonial.text }}"
                        </p>
                        
                        <!-- Underline -->
                        <div 
                            class="h-px mx-auto mb-4 w-1/3"
                            :class="testimonial.highlight ? 'bg-white' : 'bg-black'"
                        ></div>
                        
                        <!-- Client Info -->
                        <div class="text-center">
                            <h4 
                                class="font-semibold mb-1"
                                :class="testimonial.highlight ? 'text-white' : 'text-black'"
                            >
                                {{ testimonial.name }}
                            </h4>
                            <p 
                                class="text-xs"
                                :class="testimonial.highlight ? 'text-gray-200' : 'text-gray-800'"
                            >
                                {{ testimonial.role }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,

  data() {
    return {
      testimonials: [
        {
          name: "Rafique Islam",
          role: "Product Manager",
          text: "Shafique has a strong eye for usability and detail-his designs consistently balance clarity, functionality, and visual appeal.",
          photo: "src/assets/images/testimonials/avatar1.png",
          highlight: false,
        },
        {
          name: "Nusrat Jahan",
          role: "Senior Software Engineer",
          text: "Working with Shafique was effortless; he understands requirements quickly and translates them into intuitive, well-structured designs.",
          photo: "src/assets/images/testimonials/avatar2.png",
          highlight: true,
        },
        {
          name: "Mahmudul Hasan",
          role: "Project Coordinator",
          text: "Shafique's ability to think from a user's perspective and refine interfaces thorugh feedback made a noticeable impact on our product quality.",
          photo: "src/assets/images/testimonials/avatar3.png",
          highlight: false,
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

window.TestimonialsSection = TestimonialsSection;

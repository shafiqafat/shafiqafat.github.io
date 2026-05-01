// Contact Section Component
// Contact form and information display

const ContactSection = {
  name: "ContactSection",

  template: `
        <section id="contact" class="py-20 px-6 lg:px-12 bg-white">
            <div class="max-w-7xl mx-auto">
                <div class="grid lg:grid-cols-2 gap-12 items-start">
                    <!-- Contact Information (Appears first on mobile) -->
                    <div class="fade-in-up order-1 lg:order-2">
                        <h2 class="text-3xl lg:text-4xl font-bold mb-6">
                            Let's talk for<br>Something special
                        </h2>
                        
                        <p class="text-gray-600 text-sm mb-8">
                            I seek to push the limits of creativity to create high-engaging, 
                            user-friendly, and memorable interactive experiences.
                        </p>
                        
                        <!-- Contact Details with Larger Font -->
                        <div class="space-y-6 mb-8">
                            <div>
                                <a 
                                    href="mailto:Srahman0125@gmail.com"
                                    class="text-xl lg:text-2xl font-semibold hover:text-gray-600 transition-colors flex items-center"
                                >
                                    <svg class="w-6 h-6 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    Srahman0125@gmail.com
                                </a>
                            </div>
                            
                            <div>
                                <a 
                                    href="tel:+8801854282765"
                                    class="text-xl lg:text-2xl font-semibold hover:text-gray-600 transition-colors flex items-center"
                                >
                                    <svg class="w-6 h-6 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    +8801854282765
                                </a>
                            </div>
                        </div>
                        
                        <!-- Social Icons (Fixed and Left-Aligned) -->
                        <div class="flex items-start space-x-3">
                            <a 
                                v-for="(social, index) in socialLinks" 
                                :key="social.name"
                                :href="social.url"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="group social-icon w-10 h-10 border border-black border-2 flex items-center justify-center rounded transition-all duration-200"
                                :class="index === 0 
                                    ? 'bg-black hover:opacity-80 hover:shadow-lg' 
                                    : 'hover:bg-black'"
                                :aria-label="social.name"
                            >
                                <img :src="social.icon" :alt="social.name" class="w-6 h-6 transition-all duration-200"
                                     :class="index === 0 ? 'filter brightness-0 invert' : 'group-hover:filter group-hover:brightness-0 group-hover:invert'">
                            </a>
                        </div>
                    </div>
                    
                    <!-- Contact Form -->
                    <div class="fade-in-up order-2 lg:order-1">
                        <form @submit.prevent="handleSubmit" class="space-y-6">
                            <!-- Name Input -->
                            <div>
                                <input 
                                    v-model="formData.name"
                                    type="text" 
                                    placeholder="Your name"
                                    required
                                    class="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                                >
                            </div>
                            
                            <!-- Email Input -->
                            <div>
                                <input 
                                    v-model="formData.email"
                                    type="email" 
                                    placeholder="Email address or phone"
                                    required
                                    class="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                                >
                            </div>
                            
                            <!-- Subject Input -->
                            <div>
                                <input 
                                    v-model="formData.subject"
                                    type="text" 
                                    placeholder="Subject (select a service)"
                                    class="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                                >
                            </div>
                            
                            <!-- Message Textarea -->
                            <div>
                                <textarea 
                                    v-model="formData.message"
                                    placeholder="Message..."
                                    rows="5"
                                    required
                                    class="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors resize-none"
                                ></textarea>
                            </div>
                            
                            <!-- Submit Button (Reduced Width and Left-Aligned) -->
                            <button 
                                type="submit"
                                :disabled="isSubmitting"
                                class="btn-primary bg-black text-white px-8 py-4 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:scale-105"
                            >
                                <span v-if="!isSubmitting">Get in touch</span>
                                <span v-else class="flex items-center space-x-2">
                                    <div class="spinner"></div>
                                    <span>Sending...</span>
                                </span>
                            </button>
                            
                            <!-- Success/Error Messages -->
                            <div v-if="submitMessage" 
                                 class="p-4 rounded-lg text-sm"
                                 :class="submitSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                            >
                                {{ submitMessage }}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `,

  data() {
    return {
      formData: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      isSubmitting: false,
      submitMessage: "",
      submitSuccess: false,
      socialLinks: [
        {
          name: "Facebook",
          url: "https://www.facebook.com/shafiq.afat",
          icon: "src/assets/images/facebook.svg",
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/shafiq-afat/",
          icon: "src/assets/images/linkedin.svg",
        },
        {
          name: "Instagram",
          url: "https://www.instagram.com/shafiq_afat",
          icon: "src/assets/images/instagram.svg",
        },
        { name: "Figma", url: "#", icon: "src/assets/images/figma.svg" },
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
    async handleSubmit() {
      this.isSubmitting = true;
      this.submitMessage = "";

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.submitMessage =
          "Thank you! Your message has been sent successfully.";

        // Reset form
        this.formData = {
          name: "",
          email: "",
          subject: "",
          message: "",
        };

        // Clear message after 5 seconds
        setTimeout(() => {
          this.submitMessage = "";
        }, 5000);
      }, 1500);

      /* Replace with actual form submission:
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.formData)
                });
                
                if (response.ok) {
                    this.submitSuccess = true;
                    this.submitMessage = 'Thank you! Your message has been sent.';
                    this.formData = { name: '', email: '', subject: '', message: '' };
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                this.submitSuccess = false;
                this.submitMessage = 'Sorry, something went wrong. Please try again.';
            } finally {
                this.isSubmitting = false;
                setTimeout(() => { this.submitMessage = ''; }, 5000);
            }
            */
    },

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

window.ContactSection = ContactSection;

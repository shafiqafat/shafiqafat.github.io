// Hero Section Component
// Main landing section with introduction and illustration

const HeroSection = {
  name: "HeroSection",

  template: `
        <section id="home" class="pt-32 pb-20 px-6 lg:px-12 bg-white">
            <div class="max-w-7xl mx-auto">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <!-- Right Illustration (Mobile First) -->
                    <div class="fade-in-up stagger-2 flex justify-center lg:justify-end order-first lg:order-last">
                        <div class="relative w-full max-w-md">
                            <!-- Placeholder for illustration - Replace with actual image -->
                            <div class="w-full aspect-square bg-gray-100 rounded-full flex items-center justify-center">
                               <img src="src/assets/images/hero_logo.JPG" alt="Hero Illustration" class="w-auto h-auto">
                            </div>
                           </div>
                    </div>
                    
                    <!-- Left Content -->
                    <div class="fade-in-up order-last lg:order-first">
                        <h1 class="text-4xl lg:text-4xl font-light leading-tight mb-4">
                            Hello I'am<br>
                            <span class="text-4xl lg:text-5xl font-bold">Mohammad Shafiqur Rahman.</span><br>
                            <span class="text-4xl lg:text-5xl font-bold">UI/UX  </span> 
                            <span class="relative inline-block">
                                <span class="text-4xl lg:text-5xl font-bold text-gray" style="font-family: 'Faculty Glyphic', cursive;">Designer</span>
                               
                            </span><br>
                            <span class="text-4xl lg:text-5xl font-light">Based In</span> 
                            <span class="text-4xl lg:text-5xl font-bold"> Bangladesh.</span>
                        </h1>
                        
                        <p class="text-gray-600 text-sm lg:text-base mb-8 leading-relaxed max-w-xl">
                            I'm a UI/UX designer, I focused on creating 
                            clean, functional and optimized digital experiences for web and 
                            mobile application. With a passion for user-centric design, I have 
                            experience in design process from wireframes to high fidelity 
                            prototypes. Specializing in interactive design and usability, my 
                            goal is to bring the best user experiences through thoughtful design.
                        </p>
                        
                        
                        <!-- Social Icons -->
<div class="flex items-center space-x-5">
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
        <img 
            :src="social.icon" 
            :alt="social.name" 
            class="w-6 h-6 transition-all duration-200"
            :class="index === 0 ? 'filter brightness-0 invert' : 'group-hover:filter group-hover:brightness-0 group-hover:invert'"
        >
    </a>
</div>
                    </div>
                </div>
            </div>
        </section>
    `,

  data() {
    return {
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
    // Trigger animations on mount
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

window.HeroSection = HeroSection;

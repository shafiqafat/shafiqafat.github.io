// Professional About Me Section Component with Enhanced Skills Showcase

const AboutSection = {
    
    name: 'AboutSection',

    data() {
        return {
            capabilities: [
                {
                    title: 'User-Centered Design',
                    description: 'Deep user research and empathy-driven design processes that put your audience first'
                },
                {
                    title: 'Quality Assurance Mindset',
                    description: 'Proactive problem identification with meticulous attention to detail and usability'
                },
                {
                    title: 'Iterative Excellence',
                    description: 'Continuous refinement through testing, feedback, and data-driven improvements'
                },
                {
                    title: 'Strategic Solutions',
                    description: 'Business-focused design that drives engagement and achieves measurable results'
                }
            ],
            skills: [
                { icon: 'src/assets/images/skills/figma.svg' },
                { icon: 'src/assets/images/skills/sketch.svg' },
                { icon: 'src/assets/images/skills/protopie.svg' },
                { icon: 'src/assets/images/skills/framer.svg' },
                { icon: 'src/assets/images/skills/adobe-xd.svg' },
                { icon: 'src/assets/images/skills/dribbble.svg' },
                { icon: 'src/assets/images/skills/illustrator.svg' },
                { icon: 'src/assets/images/skills/photoshop.svg' }
            ]
        }
    },
    
    template: `
        <section id="about" class="py-20 px-6 lg:px-12 bg-white relative overflow-hidden">
            <div class="max-w-7xl mx-auto">
                <!-- Section Title -->
                <h2 class="text-3xl lg:text-4xl text-center mb-16 fade-in-up">
                    <span class="font-light">About</span> <span class="font-bold">Me</span>
                </h2>
                
                <!-- Mobile Layout: Image First -->
                <div class="lg:hidden fade-in-up">
                    <!-- Profile Image -->
                    <div class="flex justify-center mb-8">
                        <div class="relative group w-full max-w-md mx-auto">
                            <div class="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]">
                                <img 
                                    src="src/assets/images/about_me_logo.JPG" 
                                    alt="Mohammad Shafiqur Rahman - UI/UX Designer" 
                                    class="w-full h-full object-cover"
                                >
                            </div>
                            <!-- Decorative element -->
                            <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-black/5 rounded-2xl -z-10 transform rotate-6 transition-transform duration-500 group-hover:rotate-12"></div>
                        </div>
                    </div>
                    
                    <!-- Mobile Skills Carousel -->
                    <div class="mb-8 overflow-hidden">
                        <div class="flex animate-scroll">
                            <!-- First set of skills -->
                            <div v-for="(skill, index) in skills" :key="index" class="flex-shrink-0 w-16 h-16 mx-2 skill-card-mobile">
                                <div class="w-full h-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-110">
                                    <img :src="skill.icon" :alt="'Skill ' + (index + 1)" class="w-full h-full object-contain p-1.5 bg-gray-100">
                                </div>
                            </div>
                            <!-- Duplicate set for infinite scroll -->
                            <div v-for="(skill, index) in skills" :key="'duplicate-' + index" class="flex-shrink-0 w-16 h-16 mx-2 skill-card-mobile">
                                <div class="w-full h-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-110">
                                    <img :src="skill.icon" :alt="'Skill ' + (index + 1)" class="w-full h-full object-contain p-1.5 bg-gray-100">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Desktop Layout: Side by Side -->
                <div class="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-start relative">
                    <!-- Left Column: Profile Image and Skills Grid -->
                    <div class="fade-in-up">
                        <!-- Profile Image -->
                        <div class="flex justify-center lg:justify-start mb-8">
                            <div class="relative group w-full max-w-lg">
                                <div class="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]">
                                    <img 
                                        src="src/assets/images/about_me_logo.JPG" 
                                        alt="Mohammad Shafiqur Rahman - UI/UX Designer" 
                                        class="w-full h-full object-cover"
                                    >
                                </div>
                                <!-- Decorative element -->
                                <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-black/5 rounded-2xl -z-10 transform rotate-6 transition-transform duration-500 group-hover:rotate-12"></div>
                            </div>
                        </div>
                        
                        <!-- Desktop Skills Grid -->
                        <div class="grid grid-cols-4 gap-3 mb-4 max-w-sm mx-auto lg:mx-0">
                            <div v-for="(skill, index) in skills" :key="index" class="skill-card-desktop">
                                <div class="aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-gray-100 p-1.5">
                                    <img :src="skill.icon" :alt="'Skill ' + (index + 1)" class="w-full h-full object-contain">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Column: About Content -->
                    <div class="fade-in-up stagger-2">
                        <!-- Introduction -->
                        <div class="mb-10">
                            <h3 class="text-2xl lg:text-3xl font-bold text-black mb-4 leading-tight">
                                UI/UX Designer<br>
                                <span class="font-light">Creating Meaningful Digital Experiences</span>
                            </h3>
                            <p class="text-gray-600 text-lg leading-relaxed">
                                I bridge aesthetics and functionality to deliver solutions that make people's lives 
                                easier and more enjoyable. Let's create something exceptional together.
                            </p>
                        </div>
                        
                        <!-- What I Deliver -->
                        <div class="mb-10">
                            <h4 class="text-sm font-semibold text-black uppercase tracking-wider mb-6 flex items-center gap-2">
                                <span class="w-8 h-0.5 bg-black"></span>
                                What I Deliver
                            </h4>
                            <div class="grid grid-cols-2 gap-4">
                                <div 
                                    v-for="(capability, index) in capabilities" 
                                    :key="index"
                                    class="capability-card group relative bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-black transition-all duration-300"
                                    :style="{ animationDelay: (index * 0.1) + 's' }"
                                >
                                    <div class="absolute top-4 right-4 w-8 h-8 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h5 class="font-bold text-black mb-2 text-base pr-8">{{ capability.title }}</h5>
                                    <p class="text-sm text-gray-600 leading-relaxed">{{ capability.description }}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- CTA Buttons -->
                        <div class="flex gap-4">
                            <a 
                                href="#contact" 
                                class="group relative inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
                            >
                                <span class="relative z-10 flex items-center gap-2">
                                    Let's Work Together
                                    <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </span>
                                <div class="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>
                            
                            <a 
                                href="#portfolio" 
                                class="group inline-flex items-center justify-center border-2 border-black text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-black hover:text-white hover:shadow-xl hover:scale-105 active:scale-95"
                            >
                                <span class="flex items-center gap-2">
                                    View My Work
                                    <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Mobile Layout: Content Section -->
                <div class="lg:hidden">
                    <!-- About Content -->
                    <div class="fade-in-up stagger-2">
                        <!-- Introduction -->
                        <div class="mb-10">
                            <h3 class="text-2xl lg:text-3xl font-bold text-black mb-4 leading-tight">
                                UI/UX Designer<br>
                                <span class="font-light">Creating Meaningful Digital Experiences</span>
                            </h3>
                            <p class="text-gray-600 text-lg leading-relaxed">
                                I bridge aesthetics and functionality to deliver solutions that make people's lives 
                                easier and more enjoyable. Let's create something exceptional together.
                            </p>
                        </div>
                        
                        <!-- What I Deliver -->
                        <div class="mb-10">
                            <h4 class="text-sm font-semibold text-black uppercase tracking-wider mb-6 flex items-center gap-2">
                                <span class="w-8 h-0.5 bg-black"></span>
                                What I Deliver
                            </h4>
                            <div class="grid grid-cols-2 gap-4">
                                <div 
                                    v-for="(capability, index) in capabilities" 
                                    :key="index"
                                    class="capability-card group relative bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-black transition-all duration-300"
                                    :style="{ animationDelay: (index * 0.1) + 's' }"
                                >
                                    <div class="absolute top-4 right-4 w-8 h-8 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h5 class="font-bold text-black mb-2 text-base pr-8">{{ capability.title }}</h5>
                                    <p class="text-sm text-gray-600 leading-relaxed">{{ capability.description }}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mobile CTA Buttons -->
                        <div class="flex flex-col gap-3">
                            <a 
                                href="#contact" 
                                class="group relative inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-95 w-full"
                            >
                                <span class="relative z-10 flex items-center gap-2 justify-center">
                                    Let's Work Together
                                    <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </span>
                                <div class="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>
                            
                            <a 
                                href="#portfolio" 
                                class="group inline-flex items-center justify-center border-2 border-black text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-black hover:text-white hover:shadow-xl hover:scale-[1.02] active:scale-95 w-full"
                            >
                                <span class="flex items-center gap-2 justify-center">
                                    View My Work
                                    <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    
    mounted() {
        this.animateOnScroll();
        window.addEventListener('scroll', this.animateOnScroll);
        
        // Add custom styles for infinite carousel
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            
            .animate-scroll {
                animation: scroll 10s linear infinite;
            }
            
            .animate-scroll:hover {
                animation-play-state: paused;
            }
            
            .skill-card-desktop {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease;
            }
            
            .skill-card-desktop.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .skill-card-mobile {
                opacity: 0;
                transform: translateX(-20px);
                transition: all 0.6s ease;
            }
            
            .skill-card-mobile.visible {
                opacity: 1;
                transform: translateX(0);
            }
            
            .fade-in-up {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            
            .fade-in-up.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .stagger-2 {
                transition-delay: 0.2s;
            }
        `;
        document.head.appendChild(style);
    },
    
    beforeUnmount() {
        window.removeEventListener('scroll', this.animateOnScroll);
    },
    
    methods: {
        animateOnScroll() {
            const elements = document.querySelectorAll('.fade-in-up, .capability-card, .skill-card-mobile, .skill-card-desktop');
            const windowHeight = window.innerHeight;
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        }
    }
};

window.AboutSection = AboutSection;

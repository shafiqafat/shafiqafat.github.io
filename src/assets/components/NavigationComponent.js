// Navigation Component
// Handles both desktop and mobile navigation with smooth transitions

const NavigationComponent = {
    name: "NavigationComponent",

    template: `
                <nav class="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm border border-black">
                        <div class="max-w-7xl mx-auto px-6 lg:px-12">
                                <div class="flex items-center justify-between h-20">
                                        <!-- Signature Logo -->
                                        <a href="#home" @click.prevent="scrollToSection('home')" class="flex items-center">
                                                <img src="src/assets/images/nav_logo.JPG" alt="Shafiqur Signature" class="h-12 w-auto">
                                        </a>
                                        
                                        <!-- Desktop Navigation (Centered) -->
                                        <div class="hidden md:flex items-center justify-center flex-1">
                                                <div class="flex items-center space-x-10">
                                                        <a 
                                                                v-for="item in navItems" 
                                                                :key="item.id"
                                                                :href="'#' + item.id"
                                                                @click.prevent="scrollToSection(item.id)"
                                                                :class="['link-underline text-md font-semibold text-gray-700 hover:text-black transition-colors', 
                                                                                 activeSection === item.id ? 'active' : '']"
                                                        >
                                                                {{ item.label }}
                                                        </a>
                                                </div>
                                        </div>
                                        
                                        <!-- Resume Button with Animation -->
                                        <a 
                                                href="#" 
                                                download
                                                class="hidden md:flex items-center bg-black text-white px-6 py-2.5 rounded text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg hover:scale-105 hover:border-2 hover:border-black"
                                        >
                                                Resume
                                                <svg class="w-4 h-4 ml-2 transition-transform duration-300 hover:translate-y-0.5" hover:text-black fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                                </svg>
                                        </a>
                                        
                                        <!-- Mobile Menu Button -->
                                        <button 
                                                @click="toggleMobileMenu"
                                                class="md:hidden hamburger z-[1000]"
                                                :class="{ 'active': isMobileMenuOpen }"
                                                aria-label="Toggle menu"
                                        >
                                                <span :style="isMobileMenuOpen ? 'background:white;' : ''"></span>
                                                <span :style="isMobileMenuOpen ? 'background:white;' : ''"></span>
                                                <span :style="isMobileMenuOpen ? 'background:white;' : ''"></span>
                                        </button>
                                </div>
                        </div>
                        
                        <!-- Mobile Menu Overlay -->
                        <div 
                                class="mobile-menu-overlay"
                                :class="{ 'active': isMobileMenuOpen }"
                                @click="closeMobileMenu"
                        ></div>
                        
                        <!-- Mobile Menu -->
                        <div class="mobile-menu md:hidden" :class="{ 'open': isMobileMenuOpen }">
                                <div class="flex flex-col items-center justify-center min-h-screen p-8">
                                        <nav class="flex flex-col items-center space-y-8">
                                                <a 
                                                        v-for="item in navItems" 
                                                        :key="item.id"
                                                        :href="'#' + item.id"
                                                        @click.prevent="handleMobileNavClick(item.id)"
                                                        class="mobile-nav-item text-white text-2xl font-medium hover:text-brand-green transition-colors"
                                                >
                                                        {{ item.label }}
                                                </a>
                                                <a 
                                                        href="#" 
                                                        download
                                                        class="mobile-nav-item btn-primary bg-brand-green text-black px-8 py-3 rounded text-lg font-medium mt-4 flex items-center transition-all duration-200 hover:bg-green-400 hover:shadow-lg hover:scale-105"
                                                >
                                                        Resume
                                                        <svg class="w-4 h-4 ml-2 transition-transform duration-200 hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                                        </svg>
                                                </a>
                                        </nav>
                                </div>
                        </div>
                </nav>
        `,

    data() {
        return {
            isMobileMenuOpen: false,
            activeSection: "home",
            navItems: [
                { id: "about", label: "About Me" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact Me" },
            ],
        };
    },

    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        // Prevent body scroll when menu is open
        this.$watch("isMobileMenuOpen", (isOpen) => {
            document.body.style.overflow = isOpen ? "hidden" : "";
        });
    },

    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        document.body.style.overflow = "";
    },

    methods: {
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        },

        closeMobileMenu() {
            this.isMobileMenuOpen = false;
        },

        handleMobileNavClick(sectionId) {
            this.closeMobileMenu();
            setTimeout(() => {
                this.scrollToSection(sectionId);
            }, 400);
        },

        scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                const offset = 80; // Navigation height
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        },

        handleScroll() {
            const sections = [
                "home",
                "experience",
                "about",
                "projects",
                "testimonials",
                "contact",
            ];
            const scrollPosition = window.scrollY + 100;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        this.activeSection = sectionId;
                        break;
                    }
                }
            }
        },
    },
};

// Make component globally available
window.NavigationComponent = NavigationComponent;

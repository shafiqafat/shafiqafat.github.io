// Scroll to Top Component
// Floating button to scroll back to top of page

const ScrollToTop = {
    name: 'ScrollToTop',
    
    template: `
        <button 
            v-show="isVisible"
            @click="scrollToTop"
            class="scroll-top-btn no-print"
            :class="{ 'visible': isVisible }"
            aria-label="Scroll to top"
        >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        </button>
    `,
    
    data() {
        return {
            isVisible: false
        };
    },
    
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    
    methods: {
        handleScroll() {
            this.isVisible = window.scrollY > 300;
        },
        
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
};

window.ScrollToTop = ScrollToTop;

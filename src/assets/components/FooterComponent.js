// Footer Component
// Site footer with signature and automated copyright

const FooterComponent = {
  name: "FooterComponent",

  template: `
        <footer class="bg-black text-white py-8 px-6 lg:px-12">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <!-- Signature Logo -->
                    <a href="#home" @click.prevent="scrollToSection('home')" class="flex items-center">
                        <img src="src/assets/images/footer_logo.JPG" alt="Shafiqur Signature" class="h-10 w-auto">
                    </a>
                    <!-- Copyright with Automated Year -->
                    <div class="text-sm text-gray-400 text-center md:text-right">
                        © {{ currentYear }}, All Content by Shafiqur Rahman. All rights reserved
                    </div>
                </div>
            </div>
        </footer>
    `,

  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};

window.FooterComponent = FooterComponent;

// Main Application Entry Point
// Imports and initializes all components

// Import Vue
const { createApp } = Vue;

// Import all components (in browser, we'll use inline imports)
// Since we're using browser modules, we'll define components inline

// Main App Component
const App = {
  name: "App",

  template: `
        <div class="app">
            <navigation-component></navigation-component>
            <hero-section></hero-section>
            <experience-section></experience-section>
            <about-section></about-section>
            <projects-section></projects-section>
            <testimonials-section></testimonials-section>
            <contact-section></contact-section>
            <footer-component></footer-component>
            <scroll-to-top></scroll-to-top>
        </div>
    `,
};

// Initialize and mount the app
const app = createApp(App);

// Since we can't use ES modules in browser without a build tool,
// we'll load components via script tags and register them here
// The components will be available globally after their script tags load

// This file should be loaded after all component files
document.addEventListener("DOMContentLoaded", () => {
  // Wait for all component scripts to load
  if (
    typeof NavigationComponent !== "undefined" &&
    typeof HeroSection !== "undefined" &&
    typeof ExperienceSection !== "undefined" &&
    typeof AboutSection !== "undefined" &&
    typeof ProjectsSection !== "undefined" &&
    typeof TestimonialsSection !== "undefined" &&
    typeof ContactSection !== "undefined" &&
    typeof FooterComponent !== "undefined" &&
    typeof ScrollToTop !== "undefined"
  ) {
    // Register all components
    app.component("navigation-component", NavigationComponent);
    app.component("hero-section", HeroSection);
    app.component("experience-section", ExperienceSection);
    app.component("about-section", AboutSection);
    app.component("projects-section", ProjectsSection);
    app.component("testimonials-section", TestimonialsSection);
    app.component("contact-section", ContactSection);
    app.component("footer-component", FooterComponent);
    app.component("scroll-to-top", ScrollToTop);

    // Mount the app
    app.mount("#app");
  } else {
    console.error(
      "Not all components loaded. Please check script loading order.",
    );
  }
});

// Export for potential use
if (typeof module !== "undefined" && module.exports) {
  module.exports = app;
}

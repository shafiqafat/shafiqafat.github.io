import './App.css';
import useSmoothScroll from './hooks/useSmoothScroll';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CursorCreature from './components/common/CursorCreature';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import TechStack from './components/sections/TechStack';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Gallery from './components/sections/Gallery';
import Stats from './components/sections/Stats';
import Testimonials from './components/sections/Testimonials';
import Faq from './components/sections/Faq';
import Contact from './components/sections/Contact';

function App() {
  useSmoothScroll();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Services />
        <Projects />
        <Gallery />
        <Stats />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <CursorCreature />
    </>
  );
}

export default App;

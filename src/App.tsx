import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroLoader from './components/IntroLoader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TracksSection from './components/TracksSection';
import RegistrationSection from './components/RegistrationSection';
import FooterSection from './components/FooterSection';
import BackToTop from './components/BackToTop';

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loader minimum time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 second delay after intro
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <IntroLoader isLoading={loading} />

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="app"
            className="app-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Navbar />
            <main>
              <HeroSection />
              <AboutSection />
              <TracksSection />
              <RegistrationSection />
            </main>
            <FooterSection />
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;

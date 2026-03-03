import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import './BackToTop.css';

const BackToTop: React.FC = () => {
       const [isVisible, setIsVisible] = useState(false);

       useEffect(() => {
              const toggleVisibility = () => {
                     // Show button when page is scrolled down
                     if (window.pageYOffset > 500) {
                            setIsVisible(true);
                     } else {
                            setIsVisible(false);
                     }
              };

              window.addEventListener('scroll', toggleVisibility);
              return () => window.removeEventListener('scroll', toggleVisibility);
       }, []);

       const scrollToTop = () => {
              window.scrollTo({
                     top: 0,
                     behavior: 'smooth'
              });
       };

       return (
              <AnimatePresence>
                     {isVisible && (
                            <motion.button
                                   className="back-to-top"
                                   onClick={scrollToTop}
                                   initial={{ opacity: 0, scale: 0.5, y: 50 }}
                                   animate={{ opacity: 1, scale: 1, y: 0 }}
                                   exit={{ opacity: 0, scale: 0.5, y: 50 }}
                                   transition={{ duration: 0.3 }}
                                   aria-label="Back to top"
                            >
                                   <ArrowUp size={24} />
                                   <div className="btt-glow"></div>
                            </motion.button>
                     )}
              </AnimatePresence>
       );
};

export default BackToTop;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
       const [scrolled, setScrolled] = useState(false);
       const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

       useEffect(() => {
              const handleScroll = () => {
                     setScrolled(window.scrollY > 50);
              };
              window.addEventListener('scroll', handleScroll);
              return () => window.removeEventListener('scroll', handleScroll);
       }, []);

       const navLinks = [
              { name: 'Home', href: '#home' },
              { name: 'About', href: '#about' },
              { name: 'Tracks', href: '#tracks' },
       ];

       return (
              <motion.nav
                     className={`navbar ${scrolled ? 'scrolled' : ''}`}
                     initial={{ y: -100 }}
                     animate={{ y: 0 }}
                     transition={{ delay: 3.5, duration: 0.8 }} // Appears after loader
              >
                     <div className="nav-container">
                            <div className="nav-logo">
                                   <Terminal size={28} color="var(--neon-blue)" />
                                   <span className="logo-text">HOH <span className="version">6.0</span></span>
                            </div>

                            <div className="nav-links desktop-only">
                                   {navLinks.map((link, index) => (
                                          <a key={index} href={link.href} className="nav-link">
                                                 {link.name}
                                          </a>
                                   ))}
                                   <a href="#register" className="register-btn">REGISTER NOW</a>
                            </div>

                            <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                   {mobileMenuOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
                            </div>
                     </div>

                     {mobileMenuOpen && (
                            <motion.div
                                   className="mobile-menu glass-panel"
                                   initial={{ opacity: 0, y: -20 }}
                                   animate={{ opacity: 1, y: 0 }}
                            >
                                   {navLinks.map((link, index) => (
                                          <a
                                                 key={index}
                                                 href={link.href}
                                                 className="mobile-nav-link"
                                                 onClick={() => setMobileMenuOpen(false)}
                                          >
                                                 {link.name}
                                          </a>
                                   ))}
                                   <a href="#register" className="register-btn mobile-btn" onClick={() => setMobileMenuOpen(false)}>
                                          REGISTER NOW
                                   </a>
                            </motion.div>
                     )}
              </motion.nav>
       );
};

export default Navbar;

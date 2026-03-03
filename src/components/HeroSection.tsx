import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import './HeroSection.css';

const HeroSection: React.FC = () => {
       return (
              <section id="home" className="hero-section">
                     <div className="hero-background">
                            <div className="gradient-sphere sphere-1"></div>
                            <div className="gradient-sphere sphere-2"></div>
                            <div className="grid-overlay"></div>
                     </div>

                     <div className="hero-content">
                            <motion.div
                                   initial={{ opacity: 0, y: 50 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.8, delay: 1 }} // Appears quickly
                                   className="badge"
                            >
                                   <Zap size={16} color="var(--gold)" className="mr-2" />
                                   <span>A NATIONAL LEVEL 24 HOUR HACKATHON</span>
                            </motion.div>

                            <motion.h1
                                   className="main-title"
                                   initial={{ opacity: 0, scale: 0.9 }}
                                   animate={{ opacity: 1, scale: 1 }}
                                   transition={{ duration: 1, delay: 1.5, type: 'spring' }}
                            >
                                   <span className="text-gradient">HACK-O-HOLICS</span>
                                   <br />
                                   <span className="version-glitch" data-text="6.0">6.0</span>
                            </motion.h1>

                            <motion.p
                                   className="hero-subtitle"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.8, delay: 2 }}
                            >
                                   Innovate • Integrate • Dominate
                            </motion.p>

                            <CountdownTimer />

                            <motion.div
                                   className="hero-cta"
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.8, delay: 2.5 }}
                            >
                                   <a href="#register" className="btn-primary">
                                          <span className="btn-content">REGISTER NOW</span>
                                          <span className="btn-glare"></span>
                                   </a>
                                   <a href="#tracks" className="btn-secondary">EXPLORE TRACKS</a>
                            </motion.div>

                     </div>

                     <motion.div
                            className="scroll-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 6, duration: 1 }}
                     >
                            <motion.div
                                   animate={{ y: [0, 10, 0] }}
                                   transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                   <ChevronDown size={24} color="var(--neon-blue)" />
                            </motion.div>
                     </motion.div>
              </section>
       );
};

export default HeroSection;

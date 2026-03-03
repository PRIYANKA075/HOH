import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal } from 'lucide-react';
// import logoUrl from '../assets/logo3.jpg';
import './IntroLoader.css';

interface IntroLoaderProps {
       isLoading: boolean;
}

const IntroLoader: React.FC<IntroLoaderProps> = ({ isLoading }) => {
       return (
              <AnimatePresence>
                     {isLoading && (
                            <motion.div
                                   className="intro-overlay"
                                   initial={{ opacity: 1 }}
                                   exit={{ opacity: 0, scale: 1.3, rotate: 5, filter: 'blur(20px)' }}
                                   transition={{ duration: 0.9, ease: 'easeInOut' }}
                            >
                                   <div className="particles-container">
                                          {[...Array(20)].map((_, i) => (
                                                 <div key={i} className={`particle p-${i}`}></div>
                                          ))}
                                   </div>

                                   <div className="logo-content" style={{ position: 'relative' }}>
                                          {/* Cinematic Background Flare */}
                                          <motion.div
                                                 className="cinematic-flare"
                                                 initial={{ scale: 0, opacity: 0 }}
                                                 animate={{ scale: [1, 2, 1.2], opacity: [0, 1, 0.6] }}
                                                 transition={{
                                                        duration: 2.5,
                                                        ease: 'easeOut',
                                                        delay: 0.5
                                                 }}
                                          ></motion.div>
                                          <motion.div
                                                 className="presented-by mt-4"
                                                 initial={{ opacity: 0 }}
                                                 animate={{ opacity: 1 }}
                                                 transition={{ duration: 0.8, delay: 0.5 }}
                                          >
                                                 <span className="text-sm tracking-[0.2em] text-cyan-400 font-bold">IN ASSOCIATION WITH</span>
                                                 <br />
                                                 <span className="text-lg font-heading text-white tracking-wider mt-1 block">IEEE COMPUTER SCIENCE SOCIETY</span>
                                          </motion.div>
                                          <motion.h1
                                                 className="hoh-title"
                                                 initial={{ y: 20, opacity: 0 }}
                                                 animate={{ y: 0, opacity: 1 }}
                                                 transition={{ delay: 0.5, duration: 0.8 }}
                                          >
                                                 HACK-O-HOLICS <span className="version">6.0</span>
                                          </motion.h1>

                                          <motion.div
                                                 className="motto"
                                                 initial={{ y: 10, opacity: 0 }}
                                                 animate={{ y: 0, opacity: 1 }}
                                                 transition={{ delay: 1, duration: 0.8 }}
                                          >
                                                 INNOVATE <span className="dot">•</span> INTEGRATE <span className="dot">•</span> DOMINATE
                                          </motion.div>
                                   </div>

                                   {/* IEEE Computer Society Badge */}
                                   <motion.div
                                          className="ieee-cs-badge"
                                          initial={{ opacity: 0, y: 30 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 1.5, duration: 0.8 }}
                                   >
                                          <div className="badge-icon">
                                                 <Cpu size={24} color="var(--neon-blue)" />
                                          </div>
                                          <div className="badge-text">
                                                 <strong>IEEE Computer Society</strong>
                                          </div>
                                          <div className="badge-icon">
                                                 <Terminal size={24} color="var(--neon-blue)" />
                                          </div>
                                   </motion.div>

                                   <motion.div
                                          className="loading-bar-container"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 2, duration: 0.5 }}
                                   >
                                          <motion.div
                                                 className="loading-bar-fill"
                                                 initial={{ width: '0%' }}
                                                 animate={{ width: '100%' }}
                                                 transition={{ delay: 2, duration: 1.5, ease: 'easeInOut' }}
                                          />
                                   </motion.div>
                            </motion.div>
                     )}
              </AnimatePresence>
       );
};

export default IntroLoader;

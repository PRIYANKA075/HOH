import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, ShieldCheck, Cloud, BrainCircuit, Smartphone, Lightbulb } from 'lucide-react';
import './TracksSection.css';

const hardwareTracks = [
       { id: 1, title: 'IoT & Smart Living', icon: <Wifi size={40} />, desc: 'Creating connected devices that enhance everyday living, from smart homes to industrial automation.' },
       { id: 2, title: 'AgriTech & Rural Innovation', icon: <Cpu size={40} />, desc: 'Empowering farmers with technology-driven tools to boost productivity and sustainability in agriculture.' },
       { id: 3, title: 'Smart Energy & Robotics', icon: <ShieldCheck size={40} />, desc: 'Designing intelligent machines and energy systems that drive efficiency, automation, and future-ready power solutions.' },
       { id: 4, title: 'Open Innovation', icon: <Lightbulb size={40} />, desc: 'Build any hardware solutions that solve emerging global challenges.' }
];

const softwareTracks = [
       { id: 1, title: 'AI for Humanity', icon: <BrainCircuit size={40} />, desc: 'Harnessing artificial intelligence to solve real-world problems and improve lives through healthcare, disaster management, and accessibility.' },
       { id: 2, title: 'Smart Cities & Digital Infrastructure', icon: <Cloud size={40} />, desc: 'Building intelligent systems that make urban spaces safer, cleaner, and more efficient for citizens.' },
       { id: 3, title: 'Sustainability & Green Tech', icon: <Smartphone size={40} />, desc: 'Innovating eco-friendly solutions to monitor, reduce, and optimize environmental impact for a greener planet.' },
       { id: 4, title: 'Open Innovation', icon: <Lightbulb size={40} />, desc: 'Develop impactful software solutions pushing the boundaries of technology.' }
];

const TracksSection: React.FC = () => {
       return (
              <section id="tracks" className="tracks-section">
                     <div className="tracks-container">
                            <motion.div
                                   className="section-header"
                                   initial={{ opacity: 0, y: 30 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true, margin: "-100px" }}
                                   transition={{ duration: 0.8 }}
                            >
                                   <h2 className="section-title text-gradient">DOMAINS & TRACKS</h2>
                                   <div className="title-underline"></div>
                            </motion.div>

                            <div className="tracks-split">
                                   {/* HARDWARE TRACKS */}
                                   <div className="track-category hardware">
                                          <motion.h3
                                                 className="category-title"
                                                 initial={{ opacity: 0, x: -30 }}
                                                 whileInView={{ opacity: 1, x: 0 }}
                                                 viewport={{ once: true }}
                                                 transition={{ duration: 0.6 }}
                                          >
                                                 HARDWARE TRACKS
                                          </motion.h3>
                                          <div className="track-grid">
                                                 {hardwareTracks.map((track, i) => (
                                                        <motion.div
                                                               key={track.id}
                                                               className="track-card glass-panel"
                                                               initial={{ opacity: 0, scale: 0.8 }}
                                                               whileInView={{ opacity: 1, scale: 1 }}
                                                               whileHover={{ scale: 1.05, y: -5 }}
                                                               viewport={{ once: true }}
                                                               transition={{ duration: 0.5, delay: i * 0.1 }}
                                                        >
                                                               <div className="track-icon hardware-icon">{track.icon}</div>
                                                               <h4 className="track-title">{track.title}</h4>
                                                               <p className="track-desc">{track.desc}</p>
                                                        </motion.div>
                                                 ))}
                                          </div>
                                   </div>

                                   {/* SOFTWARE TRACKS */}
                                   <div className="track-category software">
                                          <motion.h3
                                                 className="category-title"
                                                 initial={{ opacity: 0, x: 30 }}
                                                 whileInView={{ opacity: 1, x: 0 }}
                                                 viewport={{ once: true }}
                                                 transition={{ duration: 0.6 }}
                                          >
                                                 SOFTWARE TRACKS
                                          </motion.h3>
                                          <div className="track-grid">
                                                 {softwareTracks.map((track, i) => (
                                                        <motion.div
                                                               key={track.id}
                                                               className="track-card glass-panel"
                                                               initial={{ opacity: 0, scale: 0.8 }}
                                                               whileInView={{ opacity: 1, scale: 1 }}
                                                               whileHover={{ scale: 1.05, y: -5 }}
                                                               viewport={{ once: true }}
                                                               transition={{ duration: 0.5, delay: i * 0.1 }}
                                                        >
                                                               <div className="track-icon software-icon">{track.icon}</div>
                                                               <h4 className="track-title">{track.title}</h4>
                                                               <p className="track-desc">{track.desc}</p>
                                                        </motion.div>
                                                 ))}
                                          </div>
                                   </div>
                            </div>
                     </div>
              </section>
       );
};

export default TracksSection;

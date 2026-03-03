import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Target, Users, Clock, Award } from 'lucide-react';
import './AboutSection.css';

const AboutSection: React.FC = () => {
       const containerVariants: Variants = {
              hidden: { opacity: 0 },
              visible: {
                     opacity: 1,
                     transition: {
                            staggerChildren: 0.2
                     }
              }
       };

       const itemVariants: Variants = {
              hidden: { opacity: 0, y: 30 },
              visible: {
                     opacity: 1,
                     y: 0,
                     transition: { duration: 0.8, ease: "easeOut" }
              }
       };

       return (
              <section id="about" className="about-section">
                     <div className="about-container">
                            <motion.div
                                   className="section-header"
                                   initial={{ opacity: 0, scale: 0.9 }}
                                   whileInView={{ opacity: 1, scale: 1 }}
                                   viewport={{ once: true, margin: "-100px" }}
                                   transition={{ duration: 0.8 }}
                            >
                                   <h2 className="section-title">ABOUT THE EVENT</h2>
                                   <div className="title-underline"></div>
                            </motion.div>

                            <div className="about-content">
                                   <motion.div
                                          className="about-text glass-panel"
                                          initial={{ opacity: 0, x: -50 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          viewport={{ once: true, margin: "-100px" }}
                                          transition={{ duration: 0.8 }}
                                   >
                                          <p className="highlight">
                                                 Welcome to the 6th edition of India's most fiercely competitive 24-hour hackathon.
                                          </p>
                                          <p>
                                                 Hack-O-Holics 6.0 is organized by the <strong>IEEE Student Branch Jeppiaar Engineering College</strong> in association with the <strong>IEEE Computer Society</strong>. We bring together the brightest minds across the nation to solve real-world problems through innovation and technology.
                                          </p>
                                          <p>
                                                 Whether you're a hardware enthusiast or a software wizard, this is your battleground. Code, solder, build, and deploy your way to victory over 24 grueling but exhilarating hours.
                                          </p>

                                          <div className="amenities-highlight" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0, 243, 255, 0.05)', borderLeft: '4px solid var(--neon-blue)', borderRadius: '0 8px 8px 0' }}>
                                                 <h4 style={{ color: 'var(--neon-blue)', fontSize: '1.2rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        Special Amenities Provided
                                                 </h4>
                                                 <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '1.05rem' }}>
                                                        Focus entirely on building! <strong>Food and snacks</strong> will be provided by us throughout the event, and <strong>transport facilities</strong> are also available for all participants.
                                                 </p>
                                          </div>

                                          <div className="fee-highlight" style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(255, 0, 128, 0.05)', borderLeft: '4px solid var(--neon-pink)', borderRadius: '0 8px 8px 0' }}>
                                                 <h4 style={{ color: 'var(--neon-pink)', fontSize: '1.2rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        Registration Fees
                                                 </h4>
                                                 <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '1.05rem' }}>
                                                        Secure your spot! The registration fee is <strong>₹500 for IEEE Members</strong> and <strong>₹700 for Non-IEEE Members</strong>.
                                                 </p>
                                          </div>
                                   </motion.div>

                                   <motion.div
                                          className="about-stats"
                                          variants={containerVariants}
                                          initial="hidden"
                                          whileInView="visible"
                                          viewport={{ once: true, margin: "-100px" }}
                                   >
                                          {[
                                                 { icon: <Clock size={32} />, value: "24", label: "Hours" },
                                                 { icon: <Users size={32} />, value: "50+", label: "Participants" },
                                                 { icon: <Target size={32} />, value: "8", label: "Tracks" },
                                                 { icon: <Award size={32} />, value: "Exciting Prizes", label: "Prize Pool" }
                                          ].map((stat, index) => (
                                                 <motion.div key={index} className="stat-card glass-panel" variants={itemVariants}>
                                                        <div className="stat-icon">{stat.icon}</div>
                                                        <h3 className="stat-value">{stat.value}</h3>
                                                        <p className="stat-label">{stat.label}</p>
                                                        <div className="card-glare"></div>
                                                 </motion.div>
                                          ))}
                                   </motion.div>
                            </div>
                     </div>
              </section>
       );
};

export default AboutSection;

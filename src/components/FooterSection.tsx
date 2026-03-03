import React from 'react';
import { Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import './FooterSection.css';

const FooterSection: React.FC = () => {
       return (
              <footer className="footer-section">
                     <div className="sponsors-strip">
                            <div className="sponsors-container">
                                   {/* Mock Sponsors/Patrons placeholders since the user will add real logos. We'll use styled text for now. */}
                                   <div className="sponsor-text">Institution's Innovation Council</div>
                                   <div className="sponsor-text">IEEE</div>
                                   <div className="sponsor-text">IEEE Computer Society</div>
                                   <div className="sponsor-text">NAAC A+</div>
                                   <div className="sponsor-text">Jeppiaar Engineering College</div>
                            </div>
                     </div>

                     <div className="footer-content">
                            <div className="footer-grid">
                                   <div className="footer-col brand-col">
                                          <h3 className="footer-logo">HACK-O-HOLICS <span className="version">6.0</span></h3>
                                          <p className="footer-desc">
                                                 Innovate, integrate, and dominate at the most prestigious 24-hour national level hackathon hosted by IEEE SB Jeppiaar Engineering College.
                                          </p>
                                          <div className="social-links">
                                                 <a href="https://www.instagram.com/ieeesbjec?igsh=bmdqMGQ1Z3FrNXVp" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon"><Instagram size={20} /></a>
                                                 <a href="https://www.linkedin.com/in/ieee-sb-jec?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon"><Linkedin size={20} /></a>
                                          </div>
                                   </div>

                                   <div className="footer-col links-col">
                                          <h4 className="footer-heading">Quick Links</h4>
                                          <ul className="footer-links">
                                                 <li><a href="#home">Home</a></li>
                                                 <li><a href="#about">About</a></li>
                                                 <li><a href="#tracks">Tracks</a></li>
                                                 <li><a href="#register">Register</a></li>
                                          </ul>
                                   </div>

                                   <div className="footer-col contact-col">
                                          <h4 className="footer-heading">Contact Us</h4>
                                          <div className="contact-item">
                                                 <MapPin size={20} className="contact-icon" />
                                                 <span>Jeppiaar Engineering College, Rajiv Gandhi Salai, Chennai</span>
                                          </div>
                                          <div className="contact-item">
                                                 <Mail size={20} className="contact-icon" />
                                                 <span>ieeesbjec@gmail.com</span>
                                          </div>
                                   </div>
                            </div>
                     </div>

                     <div className="footer-bottom">
                            <p>&copy; {new Date().getFullYear()} IEEE Student Branch Jeppiaar Engineering College. All rights reserved.</p>
                     </div>
              </footer>
       );
};

export default FooterSection;

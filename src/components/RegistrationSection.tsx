import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Loader2, ChevronRight, ChevronLeft, Check, AlertCircle, X, FileCheck, Clock } from 'lucide-react';
import './RegistrationSection.css';

interface TeamMember {
       id: string;
       name: string;
       email: string;
       contact: string;
}

interface FormDataType {
       teamName: string;
       numParticipants: string;
       teamMembers: TeamMember[];
       department: string;
       collegeName: string;
       year: string;
       projectType: string;
       isIEEE: string;
       ieeeMembershipNumber: string;
}

interface FormErrors {
       [key: string]: string;
}

// Constants
const PROJECT_TYPES = ['Hardware', 'Software'];

const RegistrationSection: React.FC = () => {
       const [currentStep, setCurrentStep] = useState(1);
       const [isSubmitting, setIsSubmitting] = useState(false);
       const [isSuccess, setIsSuccess] = useState(false);
       const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
       const [formErrors, setFormErrors] = useState<FormErrors>({});
       const [filePreview, setFilePreview] = useState<{ url: string; size: string } | null>(null);

       // Form State
       const [formData, setFormData] = useState<FormDataType>({
              teamName: '',
              numParticipants: '',
              teamMembers: [],
              department: '',
              collegeName: '',
              year: '',
              projectType: '',
              isIEEE: '',
              ieeeMembershipNumber: '',
       });

       // File State
       const [paymentScreenshot, setPaymentScreenshot] = useState<{ name: string; type: string; data: string } | null>(null);

       // Load from localStorage on mount
       useEffect(() => {
              const saved = localStorage.getItem('registrationFormData');
              if (saved) {
                     const parsed = JSON.parse(saved);
                     setFormData(parsed);
              }
       }, []);

       // Save to localStorage whenever form changes
       useEffect(() => {
              localStorage.setItem('registrationFormData', JSON.stringify(formData));
       }, [formData]);

       const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
              setNotification({ type, message });
              setTimeout(() => setNotification(null), 4000);
       };

       const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
       const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));

       const formatPhoneNumber = (value: string): string => {
              const cleaned = value.replace(/\D/g, '');
              const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
              if (!match) return value;
              
              const [, area, exchange, subscriber] = match;
              if (subscriber) return `${area}-${exchange}-${subscriber}`;
              if (exchange) return `${area}-${exchange}`;
              return area;
       };

       const checkDuplicateContact = (email: string, contact: string, excludeId?: string): { hasDuplicate: boolean; type: string } => {
              for (const member of formData.teamMembers) {
                     if (excludeId && member.id === excludeId) continue;
                     if (email && member.email.toLowerCase() === email.toLowerCase()) {
                            return { hasDuplicate: true, type: 'email' };
                     }
                     if (contact && member.contact.replace(/\D/g, '') === contact.replace(/\D/g, '')) {
                            return { hasDuplicate: true, type: 'phone' };
                     }
              }
              return { hasDuplicate: false, type: '' };
       };

       const validateStep = (step: number): boolean => {
              const errors: FormErrors = {};

              if (step === 1) {
                     if (!formData.teamName.trim()) errors.teamName = 'Team name is required';
                     if (!formData.numParticipants) errors.numParticipants = 'Select number of participants';
              } else if (step === 2) {
                     const numRequired = parseInt(formData.numParticipants);
                     if (formData.teamMembers.length !== numRequired) {
                            errors.teamMembers = `You must add exactly ${numRequired} team member${numRequired !== 1 ? 's' : ''}`;
                     } else {
                            formData.teamMembers.forEach((member, idx) => {
                                   if (!member.name.trim()) errors[`name_${idx}`] = 'Name required';
                                   if (!validateEmail(member.email)) errors[`email_${idx}`] = 'Valid email required';
                                   if (!validatePhone(member.contact)) errors[`contact_${idx}`] = 'Valid 10-digit phone required';
                                   
                                   // Check for duplicates
                                   const duplicate = checkDuplicateContact(member.email, member.contact, member.id);
                                   if (duplicate.hasDuplicate) {
                                          errors[`${duplicate.type}_${idx}`] = `This ${duplicate.type} is already used by another team member`;
                                   }
                            });
                     }
              } else if (step === 3) {
                     if (!formData.department.trim()) errors.department = 'Department is required';
                     if (!formData.collegeName.trim()) errors.collegeName = 'College name is required';
                     if (!formData.year) errors.year = 'Select year';
                     if (!formData.projectType) errors.projectType = 'Select project type';
                     if (!formData.isIEEE) errors.isIEEE = 'Select IEEE membership status';
                     if (formData.isIEEE === 'Yes' && !formData.ieeeMembershipNumber.trim()) {
                            errors.ieeeMembershipNumber = 'IEEE membership number required';
                     }
              } else if (step === 4) {
                     if (!paymentScreenshot) errors.payment = 'Payment screenshot is required';
              }

              setFormErrors(errors);
              if (Object.keys(errors).length > 0) {
                     showNotification('error', 'Please fix the errors below');
                     return false;
              }
              return true;
       };

       const handleAddMember = () => {
              const numRequired = parseInt(formData.numParticipants);
              if (formData.teamMembers.length < numRequired) {
                     setFormData(prev => ({
                            ...prev,
                            teamMembers: [...prev.teamMembers, { id: Date.now().toString(), name: '', email: '', contact: '' }]
                     }));
              }
       };

       const handleRemoveMember = (id: string) => {
              setFormData(prev => ({
                     ...prev,
                     teamMembers: prev.teamMembers.filter(m => m.id !== id)
              }));
       };

       const handleMemberChange = (id: string, field: keyof TeamMember, value: string) => {
              let processedValue = value;
              
              // Auto-format phone number
              if (field === 'contact') {
                     processedValue = formatPhoneNumber(value);
              }

              setFormData(prev => ({
                     ...prev,
                     teamMembers: prev.teamMembers.map(m => m.id === id ? { ...m, [field]: processedValue } : m)
              }));

              // Check for duplicates
              if (field === 'email' || field === 'contact') {
                     const duplicate = checkDuplicateContact(
                            field === 'email' ? processedValue : '',
                            field === 'contact' ? processedValue : '',
                            id
                     );
                     if (duplicate.hasDuplicate) {
                            setFormErrors(prev => ({...prev, [`${field}_${id}`]: `This ${duplicate.type} is already used by another team member`}));
                     } else {
                            setFormErrors(prev => {
                                   const newErrors = {...prev};
                                   delete newErrors[`${field}_${id}`];
                                   return newErrors;
                            });
                     }
              }
       };

       const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
              const { id, value } = e.target;
              setFormData(prev => ({ ...prev, [id]: value }));
              // Clear error for this field
              if (formErrors[id]) {
                     setFormErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors[id];
                            return newErrors;
                     });
              }
       };

       const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                     if (file.size > 10 * 1024 * 1024) {
                            showNotification('error', 'File size must be less than 10MB');
                            return;
                     }
                     
                     const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
                     const reader = new FileReader();
                     reader.onloadend = () => {
                            const base64String = reader.result as string;
                            setPaymentScreenshot({
                                   name: file.name,
                                   type: file.type,
                                   data: base64String.split(',')[1]
                            });
                            
                            // Create preview for images
                            if (file.type.startsWith('image/')) {
                                   setFilePreview({
                                          url: base64String,
                                          size: `${sizeInMB} MB`
                                   });
                            } else {
                                   setFilePreview({
                                          url: '',
                                          size: `${sizeInMB} MB`
                                   });
                            }
                            
                            showNotification('success', 'Payment screenshot uploaded successfully');
                     };
                     reader.readAsDataURL(file);
              }
       };

       const handleNextStep = () => {
              if (validateStep(currentStep)) {
                     if (currentStep === 2 && formData.teamMembers.length === 0) {
                            handleAddMember();
                            return;
                     }
                     setCurrentStep(prev => Math.min(prev + 1, 5));
              }
       };

       const handlePrevStep = () => {
              setCurrentStep(prev => Math.max(prev - 1, 1));
       };

       const handleSubmit = async (e: React.FormEvent) => {
              e.preventDefault();
              if (!validateStep(currentStep)) return;

              setIsSubmitting(true);

              try {
                     const submitData = {
                            teamName: formData.teamName,
                            numParticipants: formData.numParticipants,
                            participantsName: formData.teamMembers.map(m => m.name).join('\n'),
                            participantsEmail: formData.teamMembers.map(m => m.email).join('\n'),
                            participantsContact: formData.teamMembers.map(m => m.contact).join('\n'),
                            department: formData.department,
                            collegeName: formData.collegeName,
                            year: formData.year,
                            projectType: formData.projectType,
                            isIEEE: formData.isIEEE,
                            ieeeMembershipNumber: formData.ieeeMembershipNumber,
                            paymentScreenshot: paymentScreenshot?.data || '',
                            paymentScreenshotMimeType: paymentScreenshot?.type || '',
                            paymentScreenshotName: paymentScreenshot?.name || ''
                     };

                     const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwk4fhuTSuE4124FzgEgs_om5rwTzR_7OwfBUAyG-VLd0GAvYyFu3vZ9FvBfP_Elqro/exec';

                     if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL') {
                            console.log("Form Data Output:", submitData);
                            showNotification('warning', 'Please setup the Google Script URL first!');
                            setIsSubmitting(false);
                            return;
                     }

                     const response = await fetch(GOOGLE_SCRIPT_URL, {
                            method: 'POST',
                            body: JSON.stringify(submitData)
                     });

                     const result = await response.json();
                     if (result.status === 'success') {
                            setIsSuccess(true);
                            localStorage.removeItem('registrationFormData');
                            showNotification('success', 'Registration successful!');
                     } else {
                            showNotification('error', 'Registration failed: ' + result.message);
                     }
              } catch (error) {
                     console.error('Error submitting form:', error);
                     showNotification('error', 'An error occurred while submitting. Please try again later.');
              } finally {
                     setIsSubmitting(false);
              }
       };

       const progressPercentage = (currentStep / 5) * 100;

       return (
              <section id="register" className="registration-section">
                     <div className="registration-container">
                            <motion.div
                                   className="section-header"
                                   initial={{ opacity: 0, y: 30 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true, margin: "-100px" }}
                                   transition={{ duration: 0.8 }}
                            >
                                   <h2 className="section-title">SECURE YOUR SPOT</h2>
                                   <div className="title-underline"></div>
                                   <div className="step-header">
                                          <p className="reg-subtitle mt-4">Step {currentStep} of 5 - {['Team Info', 'Team Members', 'Details', 'Payment', 'Review'][currentStep - 1]}</p>
                                          <div className="estimated-time">
                                                 <Clock size={16} />
                                                 <span>~2 mins to complete</span>
                                          </div>
                                   </div>
                            </motion.div>

                            {notification && (
                                   <motion.div
                                          className={`notification notification-${notification.type}`}
                                          initial={{ opacity: 0, y: -20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -20 }}
                                   >
                                          <div className="notification-content">
                                                 {notification.type === 'error' && <AlertCircle size={20} />}
                                                 {notification.type === 'success' && <Check size={20} />}
                                                 <span>{notification.message}</span>
                                                 <X size={16} onClick={() => setNotification(null)} style={{ cursor: 'pointer', marginLeft: 'auto' }} />
                                          </div>
                                   </motion.div>
                            )}

                            <motion.div
                                   className="registration-card glass-panel"
                                   initial={{ opacity: 0, scale: 0.95 }}
                                   whileInView={{ opacity: 1, scale: 1 }}
                                   viewport={{ once: true, margin: "-100px" }}
                                   transition={{ duration: 0.8 }}
                            >
                                   <div className="reg-decor">
                                          <Terminal size={100} color="rgba(0, 243, 255, 0.05)" />
                                   </div>

                                   {/* Progress Bar */}
                                   <div className="progress-bar">
                                          <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 0.5 }} />
                                   </div>

                                   {isSuccess ? (
                                          <div className="success-message" style={{ textAlign: 'center', padding: '2rem 0' }}>
                                                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                                                        <div style={{ width: '80px', height: '80px', background: 'rgba(0, 243, 255, 0.1)', border: '2px solid var(--neon-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                                               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--neon-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                                      <polyline points="20 6 9 17 4 12"></polyline>
                                                               </svg>
                                                        </div>
                                                 </motion.div>
                                                 <h3 style={{ color: 'white', fontSize: '1.8rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Registration Successful!</h3>
                                                 <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                                                        Your team's registration details have been securely saved. Please click the button below to join our official WhatsApp group for all upcoming hackathon announcements.
                                                 </p>
                                                 <a href="https://chat.whatsapp.com/I7RVXyebNlPH43hfsFGFSp" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                        <button className="submit-btn" style={{ margin: '0 auto', background: 'rgba(0, 243, 255, 0.1)' }}>
                                                               <span className="btn-text">JOIN WHATSAPP GROUP</span>
                                                               <Send size={18} className="ml-2" />
                                                               <div className="btn-glow"></div>
                                                        </button>
                                                 </a>
                                          </div>
                                   ) : (
                                          <form className="registration-form" onSubmit={handleSubmit}>
                                                 {/* Step 1: Team Info */}
                                                 {currentStep === 1 && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                                               <div className="form-group">
                                                                      <label htmlFor="teamName">Team Name *</label>
                                                                      <input type="text" id="teamName" className={`form-input ${formErrors.teamName ? 'error' : ''}`} placeholder="Enter your team name" value={formData.teamName} onChange={handleInputChange} />
                                                                      {formErrors.teamName && <span className="error-text">{formErrors.teamName}</span>}
                                                               </div>

                                                               <div className="form-group">
                                                                      <label htmlFor="numParticipants">Number of Participants *</label>
                                                                      <select id="numParticipants" className={`form-input ${formErrors.numParticipants ? 'error' : ''}`} value={formData.numParticipants} onChange={handleInputChange}>
                                                                             <option value="">Select</option>
                                                                             <option value="1">1</option>
                                                                             <option value="2">2</option>
                                                                             <option value="3">3</option>
                                                                             <option value="4">4</option>
                                                                      </select>
                                                                      {formErrors.numParticipants && <span className="error-text">{formErrors.numParticipants}</span>}
                                                               </div>
                                                        </motion.div>
                                                 )}

                                                 {/* Step 2: Team Members */}
                                                 {currentStep === 2 && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                                               <p className="step-info">Add details for {formData.numParticipants} team member{formData.numParticipants !== '1' ? 's' : ''}</p>
                                                               {formData.teamMembers.map((member, idx) => (
                                                                      <div key={member.id} className="team-member-card">
                                                                             <h4>Team Member {idx + 1}</h4>
                                                                             <div className="form-group">
                                                                                    <label>Name *</label>
                                                                                    <input type="text" className={`form-input ${formErrors[`name_${idx}`] ? 'error' : ''}`} placeholder="Full name" value={member.name} onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)} />
                                                                                    {formErrors[`name_${idx}`] && <span className="error-text">{formErrors[`name_${idx}`]}</span>}
                                                                             </div>
                                                                             <div className="form-group">
                                                                                    <label>Email *</label>
                                                                                    <input type="email" className={`form-input ${formErrors[`email_${idx}`] ? 'error' : ''}`} placeholder="example@email.com" value={member.email} onChange={(e) => handleMemberChange(member.id, 'email', e.target.value)} />
                                                                                    {formErrors[`email_${idx}`] && <span className="error-text">{formErrors[`email_${idx}`]}</span>}
                                                                             </div>
                                                                             <div className="form-group">
                                                                                    <label>Contact Number *</label>
                                                                                    <input type="tel" className={`form-input ${formErrors[`contact_${idx}`] ? 'error' : ''}`} placeholder="10-digit number" value={member.contact} onChange={(e) => handleMemberChange(member.id, 'contact', e.target.value)} />
                                                                                    {formErrors[`contact_${idx}`] && <span className="error-text">{formErrors[`contact_${idx}`]}</span>}
                                                                             </div>
                                                                             {idx > 0 && (
                                                                                    <button type="button" className="remove-btn" onClick={() => handleRemoveMember(member.id)}>
                                                                                           Remove Member
                                                                                    </button>
                                                                             )}
                                                                      </div>
                                                               ))}
                                                               {formErrors.teamMembers && <span className="error-text">{formErrors.teamMembers}</span>}
                                                               {formData.teamMembers.length < parseInt(formData.numParticipants) && (
                                                                      <button type="button" className="add-btn" onClick={handleAddMember}>
                                                                             Add Team Member
                                                                      </button>
                                                               )}
                                                        </motion.div>
                                                 )}

                                                 {/* Step 3: Team Details */}
                                                 {currentStep === 3 && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                                               <div className="form-row">
                                                                      <div className="form-group">
                                                                             <label htmlFor="department">Department *</label>
                                                                             <input type="text" id="department" className={`form-input ${formErrors.department ? 'error' : ''}`} placeholder="e.g., CSE, ECE, Mechanical" value={formData.department} onChange={handleInputChange} />
                                                                             {formErrors.department && <span className="error-text">{formErrors.department}</span>}
                                                                      </div>
                                                                      <div className="form-group">
                                                                             <label htmlFor="collegeName">College Name *</label>
                                                                             <input type="text" id="collegeName" className={`form-input ${formErrors.collegeName ? 'error' : ''}`} placeholder="Your college name" value={formData.collegeName} onChange={handleInputChange} />
                                                                             {formErrors.collegeName && <span className="error-text">{formErrors.collegeName}</span>}
                                                                      </div>
                                                               </div>

                                                               <div className="form-row">
                                                                      <div className="form-group">
                                                                             <label htmlFor="year">Year *</label>
                                                                             <select id="year" className={`form-input ${formErrors.year ? 'error' : ''}`} value={formData.year} onChange={handleInputChange}>
                                                                                    <option value="">Select Year</option>
                                                                                    <option value="I">I</option>
                                                                                    <option value="II">II</option>
                                                                                    <option value="III">III</option>
                                                                                    <option value="IV">IV</option>
                                                                             </select>
                                                                             {formErrors.year && <span className="error-text">{formErrors.year}</span>}
                                                                      </div>
                                                                      <div className="form-group">
                                                                             <label htmlFor="projectType">Project Type *</label>
                                                                             <select id="projectType" className={`form-input ${formErrors.projectType ? 'error' : ''}`} value={formData.projectType} onChange={handleInputChange}>
                                                                                    <option value="">Select Track</option>
                                                                                    <option value="Hardware">Hardware</option>
                                                                                    <option value="Software">Software</option>
                                                                             </select>
                                                                             {formErrors.projectType && <span className="error-text">{formErrors.projectType}</span>}
                                                                      </div>
                                                               </div>

                                                               <div className="form-group">
                                                                      <label htmlFor="isIEEE">Are you an IEEE member? *</label>
                                                                      <select id="isIEEE" className={`form-input ${formErrors.isIEEE ? 'error' : ''}`} value={formData.isIEEE} onChange={handleInputChange}>
                                                                             <option value="">Select</option>
                                                                             <option value="Yes">Yes</option>
                                                                             <option value="No">No</option>
                                                                      </select>
                                                                      {formErrors.isIEEE && <span className="error-text">{formErrors.isIEEE}</span>}
                                                               </div>

                                                               {formData.isIEEE === 'Yes' && (
                                                                      <div className="form-group">
                                                                             <label htmlFor="ieeeMembershipNumber">IEEE Membership Number *</label>
                                                                             <input type="text" id="ieeeMembershipNumber" className={`form-input ${formErrors.ieeeMembershipNumber ? 'error' : ''}`} placeholder="Your IEEE membership number" value={formData.ieeeMembershipNumber} onChange={handleInputChange} />
                                                                             {formErrors.ieeeMembershipNumber && <span className="error-text">{formErrors.ieeeMembershipNumber}</span>}
                                                                      </div>
                                                               )}
                                                        </motion.div>
                                                 )}

                                                 {/* Step 4: Payment */}
                                                 {currentStep === 4 && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                                               <div className="form-group">
                                                                      <label>Registration Fee</label>
                                                                      {formData.isIEEE === 'Yes' ? (
                                                                             <div className="fee-card">
                                                                                    <h4>₹ 500</h4>
                                                                                    <p>Discounted fee for IEEE Members</p>
                                                                             </div>
                                                                      ) : (
                                                                             <div className="fee-card">
                                                                                    <h4>₹ 700</h4>
                                                                                    <p>Standard fee for Non-IEEE Members</p>
                                                                             </div>
                                                                      )}
                                                               </div>

                                                               <div className="payment-details-card">
                                                                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                                                             <div style={{ padding: '0.5rem', background: 'white', borderRadius: '12px', display: 'inline-block', boxShadow: '0 0 20px rgba(0, 243, 255, 0.2)' }}>
                                                                                    <img src={formData.isIEEE === 'Yes' ? "/qr-code.jpg" : "/qr-code-700.jpg"} alt="Payment QR Code" style={{ width: '180px', height: '180px', objectFit: 'contain', borderRadius: '8px' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                                                             </div>
                                                                             <div style={{ textAlign: 'center' }}>
                                                                                    <p style={{ margin: '0', fontSize: '1.1rem', fontWeight: 'bold', color: 'white' }}>Manikandan V 054</p>
                                                                                    <div className="upi-copy">UPI: vengtesanvenkatesan-1@okaxis</div>
                                                                             </div>
                                                                      </div>
                                                               </div>

                                                               <div className="form-group">
                                                                      <label htmlFor="paymentScreenshot">Upload Payment Screenshot *</label>
                                                                      <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>Max 10 MB (JPG, PNG, PDF)</span>
                                                                      <input type="file" id="paymentScreenshot" className={`form-input ${formErrors.payment ? 'error' : ''}`} accept="image/*,application/pdf" onChange={handleFileChange} />
                                                                      
                                                                      {paymentScreenshot && (
                                                                             <div className="file-preview-card">
                                                                                    {filePreview?.url ? (
                                                                                           <div className="preview-image-container">
                                                                                                  <img src={filePreview.url} alt="Payment screenshot preview" className="preview-image" />
                                                                                           </div>
                                                                                    ) : (
                                                                                           <div className="file-icon-container">
                                                                                                  <FileCheck size={32} color="var(--neon-blue)" />
                                                                                           </div>
                                                                                    )}
                                                                                    <div className="file-info">
                                                                                           <p className="file-name"><Check size={14} /> {paymentScreenshot.name}</p>
                                                                                           <p className="file-size">{filePreview?.size}</p>
                                                                                    </div>
                                                                             </div>
                                                                      )}
                                                                      {formErrors.payment && <span className="error-text">{formErrors.payment}</span>}
                                                               </div>
                                                        </motion.div>
                                                 )}

                                                 {/* Step 5: Review */}
                                                 {currentStep === 5 && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="review-section">
                                                               <h3>Review Your Registration</h3>
                                                               <div className="review-group">
                                                                      <h4>Team Information</h4>
                                                                      <p><strong>Team Name:</strong> {formData.teamName}</p>
                                                                      <p><strong>Participants:</strong> {formData.numParticipants}</p>
                                                               </div>
                                                               <div className="review-group">
                                                                      <h4>Team Members</h4>
                                                                      {formData.teamMembers.map((member, idx) => (
                                                                             <div key={member.id} className="review-member">
                                                                                    <p><strong>{idx + 1}. {member.name}</strong></p>
                                                                                    <p className="muted">{member.email}</p>
                                                                                    <p className="muted">{member.contact}</p>
                                                                             </div>
                                                                      ))}
                                                               </div>
                                                               <div className="review-group">
                                                                      <h4>Other Details</h4>
                                                                      <p><strong>Department:</strong> {formData.department}</p>
                                                                      <p><strong>College:</strong> {formData.collegeName}</p>
                                                                      <p><strong>Year:</strong> {formData.year}</p>
                                                                      <p><strong>Project Type:</strong> {formData.projectType}</p>
                                                                      <p><strong>IEEE Member:</strong> {formData.isIEEE}</p>
                                                                      <p><strong>Registration Fee:</strong> ₹ {formData.isIEEE === 'Yes' ? '500' : '700'}</p>
                                                               </div>
                                                        </motion.div>
                                                 )}

                                                 {/* Navigation Buttons */}
                                                 <div className="form-navigation">
                                                        <button type="button" className="nav-btn prev-btn" onClick={handlePrevStep} disabled={currentStep === 1}>
                                                               <ChevronLeft size={18} />
                                                               Previous
                                                        </button>
                                                        {currentStep < 5 ? (
                                                               <button type="button" className="nav-btn next-btn" onClick={handleNextStep}>
                                                                      Next
                                                                      <ChevronRight size={18} />
                                                               </button>
                                                        ) : (
                                                               <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                                                      {isSubmitting ? (
                                                                             <>
                                                                                    <span className="btn-text">SUBMITTING...</span>
                                                                                    <Loader2 size={18} className="ml-2 animate-spin" />
                                                                             </>
                                                                      ) : (
                                                                             <>
                                                                                    <span className="btn-text">SUBMIT REGISTRATION</span>
                                                                                    <Send size={18} className="ml-2" />
                                                                             </>
                                                                      )}
                                                                      <div className="btn-glow"></div>
                                                               </button>
                                                        )}
                                                 </div>
                                          </form>
                                   )}
                            </motion.div>
                     </div>
              </section>
       );
};

export default RegistrationSection;

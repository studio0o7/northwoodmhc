'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaExclamationCircle, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus('submitting');
    
    // Simulate API call
    try {
      // This would be an actual API call in production
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success response
      setFormStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 bg-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/4 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/4 opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 bg-blue-gradient text-white text-sm font-semibold rounded-full mb-2">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-3">
            Contact <span className="text-sky-600">Northwood Estates</span>
          </h2>
          <p className="text-sky-800 max-w-2xl mx-auto">
            Have questions about Northwood Estates MHC? We&apos;re here to help! Reach out to our team using the contact form or visit us during office hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-sky-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-blue-gradient-dark p-6 relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full opacity-10">
                <div className="absolute right-0 bottom-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute left-0 top-0 w-20 h-20 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Send Us a Message</h3>
                <p className="text-white/90">We&apos;ll get back to you as soon as possible.</p>
              </div>
            </div>
            
            <div className="p-6">
              {formStatus === 'success' ? (
                <motion.div 
                  className="bg-sky-50 text-sky-800 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <FaCheck className="text-sky-600 text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p>Thank you for contacting Northwood Estates. Our team will get back to you shortly.</p>
                </motion.div>
              ) : formStatus === 'error' ? (
                <div className="bg-red-50 text-red-800 p-6 rounded-lg text-center">
                  <FaExclamationCircle className="text-red-600 text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
                  <p>We&apos;re experiencing technical difficulties. Please try again or contact us directly.</p>
                  <motion.button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Try Again
                  </motion.button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sky-800 font-medium mb-2">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.fullName ? "border-red-500 focus:ring-red-200" : "border-sky-300 focus:ring-sky-200"
                      }`}
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="email" className="block text-sky-800 font-medium mb-2">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.email ? "border-red-500 focus:ring-red-200" : "border-sky-300 focus:ring-sky-200"
                        }`}
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sky-800 font-medium mb-2">
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.phone ? "border-red-500 focus:ring-red-200" : "border-sky-300 focus:ring-sky-200"
                        }`}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sky-800 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all duration-300"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-3 px-6 rounded-lg text-white font-bold transition-all duration-300 ${
                      formStatus === 'submitting'
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-gradient hover:shadow-lg"
                    }`}
                    whileHover={formStatus !== 'submitting' ? { scale: 1.03 } : undefined}
                    whileTap={formStatus !== 'submitting' ? { scale: 0.98 } : undefined}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
          
          {/* Contact Info - now the only right side card */}
          <motion.div 
            className="bg-blue-gradient-dark rounded-lg p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Background pattern - matches Hero */}
            <div className="absolute inset-0 w-full h-full opacity-10">
              <div className="absolute right-0 bottom-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute left-0 top-0 w-20 h-20 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white/20 p-2.5 rounded-lg mr-3 flex-shrink-0">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Address</p>
                    <p className="text-white">
                      1905 Tracy Road<br />
                      Northwood, OH 43619
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 p-2.5 rounded-lg mr-3 flex-shrink-0">
                    <FaPhone className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Phone</p>
                    <a href="tel:4199646639" className="text-white hover:underline group">
                      (419) 964-6639
                      <span className="block text-xs text-white/70 mt-0.5 group-hover:text-white/90 transition-colors">
                        Mon-Fri: 9:00 AM - 5:00 PM
                      </span>
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 p-2.5 rounded-lg mr-3 flex-shrink-0">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Email</p>
                    <a href="mailto:northwoodestatesmhc@gmail.com" className="text-white hover:underline">
                      northwoodestatesmhc@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 p-2.5 rounded-lg mr-3 flex-shrink-0">
                    <FaClock className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Office Hours</p>
                    <p className="text-white">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: By Appointment only
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative elements - matches Hero */}
              <div className="absolute bottom-0 right-0 p-4">
                <svg className="w-8 h-8 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm0-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
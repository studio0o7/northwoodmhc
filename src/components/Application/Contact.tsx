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
    <section id="contact" className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sky-800 mb-3">
            Contact Us
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-sky-400 to-blue-600 mx-auto mb-5 rounded-full"></div>
          <p className="text-sky-700 max-w-2xl mx-auto">
            Have questions about Northwood Estates MHC? We&apos;re here to help! Reach out to our team using the contact form or visit us during office hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-sky-100">
            <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">Send Us a Message</h3>
              <p className="text-sky-100">We&apos;ll get back to you as soon as possible.</p>
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
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Try Again
                  </button>
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
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
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
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
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
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
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
                      className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-200"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-3 px-6 rounded-lg text-white font-bold transition-all duration-300 ${
                      formStatus === 'submitting'
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-sky-500 to-blue-600 hover:shadow-lg"
                    }`}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
          
          {/* Map and Contact Info */}
          <div className="grid grid-rows-[1fr,auto] gap-6 h-full">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-sky-100 h-full">
              <div className="h-64 lg:h-80 relative bg-blue-50">
                {/* Replace this with an actual map component in production */}
                <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaMapMarkerAlt className="text-white text-2xl" />
                    </div>
                    <p className="text-sky-800 font-medium">Map placeholder</p>
                    <p className="text-sky-600 text-sm">Interactive map will be displayed here</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-sky-800 mb-4">Our Location</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Northwood Estates MHC</strong>
                </p>
                <p className="text-gray-700 mb-4">
                  102 Woodville Road<br />
                  Northwood, OH 43619
                </p>
                <a 
                  href="https://maps.google.com/?q=Northwood+Estates+MHC,+Northwood,+OH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium"
                >
                  <span>Get Directions</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl text-white p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white/20 p-2.5 rounded-lg mr-3 flex-shrink-0">
                    <FaPhone className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-sky-100">Phone</p>
                    <a href="tel:4199646639" className="text-white hover:underline">
                      (419) 964-6639
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-2.5 rounded-lg mr-3 flex-shrink-0">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-sky-100">Email</p>
                    <a href="mailto:info@northwoodestatesmhc.com" className="text-white hover:underline">
                      info@northwoodestatesmhc.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-2.5 rounded-lg mr-3 flex-shrink-0">
                    <FaClock className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-sky-100">Office Hours</p>
                    <p className="text-white">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
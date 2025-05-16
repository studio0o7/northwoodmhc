'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-sky-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-800 rounded-full -translate-y-1/2 translate-x-1/4 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-800 rounded-full translate-y-1/2 -translate-x-1/4 opacity-30"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-sky-300">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-sky-400 mt-1 mr-3 flex-shrink-0" />
                <span>
                  1905 Tracy Road<br />
                  Northwood, OH 43619
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-sky-400 mr-3 flex-shrink-0" />
                <a href="tel:4199646639" className="hover:text-sky-300 transition-colors">
                  (419) 964-6639
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-sky-400 mr-3 flex-shrink-0" />
                <a href="mailto:northwoodestatesmhc@gmail.com" className="hover:text-sky-300 transition-colors">
                  northwoodestatesmhc@gmail.com
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-sky-300">Office Hours:</h4>
              <ul className="space-y-1 text-sky-100">
                <li>Monday - Friday: 10am - 5pm</li>
                <li>Saturday: 10am - 1pm</li>
                <li>Sunday: By Appointment</li>
              </ul>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-sky-300">Quick Links</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <a href="#homes" className="hover:text-sky-300 transition-colors">
                  New Homes
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <a href="#amenities" className="hover:text-sky-300 transition-colors">
                  Amenities
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <a href="#neighborhood" className="hover:text-sky-300 transition-colors">
                  Neighborhood
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <a href="#contact" className="hover:text-sky-300 transition-colors">
                  Contact
                </a>
              </motion.li>
            </ul>
          </motion.div>
          
          {/* Special Offer Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-sky-300">Current Special</h3>
            
            <motion.div 
              className="bg-blue-gradient-dark p-6 rounded-xl shadow-lg border border-sky-700/50 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 w-full h-full opacity-10">
                <div className="absolute right-0 bottom-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute left-0 top-0 w-20 h-20 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10">
                <div className="bg-white text-sky-600 font-bold text-xs rounded-full px-3 py-1 inline-block mb-3 shadow-md">
                  LIMITED TIME OFFER
                </div>
                <h4 className="font-bold text-xl text-white mb-3">First Month&apos;s Rent 50% OFF!</h4>
                <p className="text-white/90 mb-4">
                  For new residents who apply before October 31st
                </p>
                <motion.a 
                  href="#apply" 
                  className="bg-white text-sky-700 hover:bg-sky-50 px-6 py-2.5 rounded-lg inline-block font-semibold transition-colors shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-12 pt-6 border-t border-sky-800/50 text-center text-sky-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; {currentYear} Northwood Estates MHC. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            A peaceful and friendly manufactured home community in Northwood, Ohio.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 
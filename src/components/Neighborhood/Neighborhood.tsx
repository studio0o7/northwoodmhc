'use client';

import React from 'react';
import { FaGraduationCap, FaStore, FaMapMarkerAlt, FaHeart, FaCar, FaUtensils, FaMedkit, FaShoppingBag, FaLocationArrow, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Neighborhood = () => {
  // Neighborhood features - Updated for Northwood Estates MHC
  const neighborhoodFeatures = [
    {
      id: 1,
      icon: <FaStore />,
      title: "Shopping & Dining",
      color: "from-sky-500 to-blue-600",
      items: [
        "Woodville Mall Area - 1.5 miles",
        "Walmart Supercenter - 3.2 miles",
        "Kroger Grocery - 2.5 miles",
        "Local Restaurants on Woodville Rd - 1.0 mile",
        "Great Eastern Shopping Plaza - 2.1 miles",
        "Fast Food Options - Under 1 mile"
      ]
    },
    {
      id: 2,
      icon: <FaGraduationCap />,
      title: "Education",
      color: "from-blue-500 to-sky-600",
      items: [
        "Northwood Local Schools District",
        "Northwood Elementary - 0.8 miles",
        "Northwood Middle School - 1.2 miles",
        "Northwood High School - 1.5 miles",
        "Owens Community College - 3.5 miles",
        "Toledo University - 12 miles"
      ]
    },
    {
      id: 3,
      icon: <FaMedkit />,
      title: "Healthcare",
      color: "from-cyan-500 to-blue-500",
      items: [
        "Bay Park Hospital - 4.2 miles",
        "Mercy Health St. Charles - 5.1 miles",
        "Northwood Medical Center - 1.8 miles",
        "ProMedica Toledo Hospital - 10 miles",
        "Various Medical Offices on Woodville Rd",
        "24-hour Pharmacy - 2.3 miles"
      ]
    },
    {
      id: 4,
      icon: <FaCar />,
      title: "Transportation",
      color: "from-blue-600 to-sky-400",
      items: [
        "Quick Access to I-75 - 2 miles",
        "Ohio Turnpike (I-80/90) - 3 miles",
        "TARTA Bus Service",
        "15 Minutes to Downtown Toledo",
        "Toledo Express Airport - 20 miles",
        "Detroit Metro Airport - 60 miles"
      ]
    }
  ];

  // Calculate the order for mobile view as requested
  const getMobileOrderedFeatures = () => {
    // Education (id: 2), Healthcare (id: 3), Shopping & Dining (id: 1), Transportation (id: 4)
    return [
      ...neighborhoodFeatures.filter(f => f.id === 2), // Education first
      ...neighborhoodFeatures.filter(f => f.id === 3), // Healthcare second
      ...neighborhoodFeatures.filter(f => f.id === 1), // Shopping & Dining third
      ...neighborhoodFeatures.filter(f => f.id === 4), // Transportation last
    ];
  };

  const areaHighlights = [
    {
      icon: <FaUtensils />,
      title: "Dining & Entertainment",
      description: "Enjoy a variety of dining options from family restaurants to fast food within minutes of the community."
    },
    {
      icon: <FaShoppingBag />,
      title: "Shopping Convenience",
      description: "Access all your shopping needs with grocery stores, department stores, and specialty shops nearby."
    },
    {
      icon: <FaHeart />,
      title: "Community Spirit",
      description: "Experience the friendly atmosphere of Northwood with community events, local festivals, and recreational activities."
    }
  ];

  return (
    <section id="neighborhood" className="relative bg-white overflow-hidden py-16">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/4 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/4 opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-14 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-blue-50 blur-2xl opacity-70 z-0"></div>
          <span className="inline-block py-1 px-3 bg-blue-gradient text-white text-sm font-semibold rounded-full mb-2">
            Explore Northwood
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sky-900 mb-3 relative z-10">
            Discover Our <span className="text-sky-600">Neighborhood</span>
          </h2>
          <p className="text-lg text-sky-800 mb-5 max-w-2xl mx-auto">
            Enjoy the perfect blend of peaceful suburban living with convenient access to everything you need in Northwood, Ohio.
          </p>
        </motion.div>

        {/* Main Feature Card */}
        <motion.div 
          className="relative z-10 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-sky-100">
            <div className="bg-blue-gradient-dark p-5 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 w-full h-full opacity-10">
                <div className="absolute right-0 bottom-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute left-0 top-0 w-20 h-20 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center">
                  <FaLocationArrow className="mr-3 text-2xl" />
                  <h3 className="text-2xl font-bold">Prime Location Benefits</h3>
                </div>
                <div className="bg-white text-sky-600 font-bold text-xs rounded-full px-3 py-1 shadow-md">
                  NORTHWOOD, OHIO
                </div>
              </div>
            </div>

            {/* Desktop layout - hidden on mobile */}
            <div className="hidden md:grid md:grid-cols-3 p-6 gap-6">
              {areaHighlights.map((highlight, idx) => (
                <motion.div 
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="group relative"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-5 rounded-xl border border-sky-100 hover:border-sky-200 transition-colors duration-300">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-gradient text-white p-2.5 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                        {highlight.icon}
                      </div>
                      <h4 className="font-semibold text-sky-800">{highlight.title}</h4>
                    </div>
                    <p className="text-sky-700 text-sm">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile horizontal scrolling layout - hidden on desktop */}
            <div className="md:hidden p-4 overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 w-max pb-2">
                {areaHighlights.map((highlight, idx) => (
                  <motion.div 
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="group relative flex-shrink-0 w-[260px] snap-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-5 rounded-xl border border-sky-100 hover:border-sky-200 transition-colors duration-300 h-full">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-gradient text-white p-2.5 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                          {highlight.icon}
                        </div>
                        <h4 className="font-semibold text-sky-800">{highlight.title}</h4>
                      </div>
                      <p className="text-sky-700 text-sm">{highlight.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Neighborhood Features - Desktop Layout - hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-12 gap-6 mb-12">
          {neighborhoodFeatures.map((feature, idx) => (
            <motion.div 
              key={feature.title}
              className={`md:col-span-6 ${idx === 0 || idx === 3 ? 'lg:col-span-7' : 'lg:col-span-5'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white h-full rounded-xl shadow-md overflow-hidden border border-sky-50 hover:border-sky-200 transition-all duration-300 hover:shadow-lg">
                <div className={`bg-gradient-to-r ${feature.color} p-4 text-white relative overflow-hidden`}>
                  {/* Subtle pattern */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center">
                      <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg mr-3">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>
                    <div className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                      Nearby
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start group">
                        <FaMapMarkerAlt className="text-sky-500 mt-1 mr-2 flex-shrink-0 group-hover:text-sky-600 transition-colors" />
                        <span className="text-sky-700 text-sm group-hover:text-sky-900 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile horizontal scrolling for neighborhood features - hidden on desktop */}
        <div className="md:hidden mb-12 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4 w-max">
            {getMobileOrderedFeatures().map((feature, idx) => (
              <motion.div 
                key={feature.title}
                className="flex-shrink-0 w-[280px] snap-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.5 }}
              >
                <div className="bg-white h-full rounded-xl shadow-md overflow-hidden border border-sky-50 hover:border-sky-200 transition-all duration-300 hover:shadow-lg">
                  <div className={`bg-gradient-to-r ${feature.color} p-4 text-white relative overflow-hidden`}>
                    {/* Subtle pattern */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center">
                        <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg mr-3">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                      </div>
                      <div className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        Nearby
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <ul className="grid grid-cols-1 gap-y-2.5">
                      {feature.items.map((item, i) => (
                        <li key={i} className="flex items-start group">
                          <FaMapMarkerAlt className="text-sky-500 mt-1 mr-2 flex-shrink-0 group-hover:text-sky-600 transition-colors" />
                          <span className="text-sky-700 text-sm group-hover:text-sky-900 transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to Action - Styled like Hero special offer card */}
        <motion.div 
          className="mt-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-blue-gradient-dark rounded-lg p-6 shadow-lg relative overflow-hidden text-center">
            {/* Background pattern */}
            <div className="absolute inset-0 w-full h-full opacity-10">
              <div className="absolute right-0 bottom-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute left-0 top-0 w-20 h-20 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="bg-white text-sky-600 font-bold text-xs rounded-full px-3 py-1 inline-block mb-2 shadow-md">
                EXPLORE IN PERSON
              </div>
              <h4 className="text-white text-2xl font-bold mb-3">Want to see our neighborhood in person?</h4>
              <p className="text-white/90 mb-6">
                Our team would love to show you around and answer any questions about the community and surrounding area.
              </p>
              <motion.a 
                href="#apply" 
                className="bg-white text-sky-600 py-3 px-7 rounded-lg font-medium inline-flex items-center group shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2">Schedule a Tour Today</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute bottom-0 right-0 p-4">
              <svg className="w-8 h-8 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm0-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hide scrollbars but allow scrolling */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </section>
  );
};

export default Neighborhood; 
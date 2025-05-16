'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ApplyTodayPopup from '../ApplyTodayPopup/ApplyTodayPopup';

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isApplyPopupOpen, setIsApplyPopupOpen] = useState(false);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  
  const properties = [
    {
      id: 1,
      title: "The Pulse",
      price: "$1095/MO",
      features: "3 bed • 2 Bath",
      image: "/images/ThePulse.png", // Assuming ThePulse.png is in public/images/
      sqft: "16x76",
      highlights: ["Brand new model", "Spacious layout"],
      virtualTourUrl: "https://momento360.com/e/uc/4c68f3949e9248d7b384deb250e13eca?utm_campaign=embed&utm_source=other&reset-heading=true&size=large",
      availability: "Last 3 units left"
    },
    {
      id: 2,
      title: "The Lone Star",
      price: "$1095/Mo",
      features: "3 bed • 2 bath",
      image: "/images/TheLoneStart.png", // Updated image path
      sqft: "16x72",
      highlights: ["Modern design", "Community amenities"],
      virtualTourUrl: "https://my.matterport.com/show/?m=bo5ofaNrm1C",
      availability: "Last 2 units left"
    },
  ];

  // Handle automatic slide changing
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % properties.length);
    }, 5000);
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [properties.length]);

  // Reset timer when manually changing slides
  const goToSlide = (index: number) => {
    setActiveSlide(index);
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    slideInterval.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % properties.length);
    }, 5000);
  };

  return (
    <section className="relative bg-white overflow-hidden min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Left Content Side */}
        <div className="flex flex-col justify-start pt-8 md:pt-16 px-4 py-6 md:px-8 lg:px-10 xl:px-12 bg-white z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto md:mx-0 md:ml-4 lg:ml-8 xl:ml-12 relative"
          >
            <div className="mb-4">
              <span className="inline-block py-1 px-3 bg-blue-gradient text-white text-sm font-semibold rounded-full mb-2">
                Northwood, Ohio
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sky-900 leading-tight mb-3">
                Welcome to <span className="text-sky-600">Northwood Estates</span>
              </h1>
              <p className="text-lg text-sky-800 mb-5">
                A beautifully maintained manufactured home community with spacious lots, excellent amenities, and easy access to Toledo.
              </p>
            </div>

            {/* Special Offer Card - Enhanced with strong contrast */}
            <motion.div 
              className="bg-blue-gradient-dark rounded-lg p-6 mb-6 shadow-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 w-full h-full opacity-10">
                <div className="absolute right-0 bottom-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute left-0 top-0 w-20 h-20 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10">
                <div className="bg-white text-sky-600 font-bold text-xs rounded-full px-3 py-1 inline-block mb-2 shadow-md">
                  LIMITED TIME OFFER
                </div>
                <h3 className="font-bold text-2xl text-white mb-1">First Month&apos;s Rent 50% OFF!</h3>
                <p className="text-white/90 text-sm">For new residents who apply before October 31st</p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-0 right-0 p-4">
                <svg className="w-8 h-8 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm0-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                </svg>
              </div>
            </motion.div>

            <div className="flex gap-3 mb-8">
              <motion.button 
                onClick={() => setIsApplyPopupOpen(true)}
                className="btn btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Today
              </motion.button>
              <motion.a 
                href="#homes" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                View Homes
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Right Image Slider Side */}
        <div className="relative w-full h-[50vh] md:h-full overflow-hidden flex items-center justify-center bg-white mt-4 md:mt-0">
          <div className="relative w-[92%] md:w-[85%] h-[90%] md:h-[80%] rounded-xl overflow-hidden shadow-2xl mx-auto my-auto">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                className="absolute inset-0 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeSlide === index ? 1 : 0,
                  zIndex: activeSlide === index ? 10 : 0 
                }}
                transition={{ duration: 0.8 }}
              >
                {/* Image Section */}
                <div 
                  className="w-full h-3/5 bg-cover bg-center relative rounded-t-lg flex-shrink-0"
                  style={{ backgroundImage: `url(${property.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-800/30 to-transparent rounded-t-lg"></div>
                </div>
                
                {/* Property Info Card Section */}
                <motion.div 
                  className="w-full h-2/5 bg-white/95 backdrop-blur-sm p-3 md:p-5 rounded-b-lg shadow-xl border border-sky-200 flex flex-col justify-center overflow-y-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: activeSlide === index ? 1 : 0, y: activeSlide === index ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2 md:mb-3">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-sky-50 text-sky-700 text-xs font-medium rounded mb-1 border border-sky-200">Featured</span>
                        <h3 className="text-base md:text-xl font-bold text-sky-900">{property.title}</h3>
                        <p className="text-sky-700 text-xs md:text-sm">{property.features}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sky-600 font-bold text-lg md:text-xl block mb-1 md:mb-3">{property.price}</span>
                        {/* Special Offer Tag */}
                        <div className="bg-sky-600 text-white text-xs font-medium px-2 py-0.5 rounded inline-block">
                          50% OFF 1st Month
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1 mb-2 md:mb-3">
                      {property.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center">
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-sky-500 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs md:text-sm text-sky-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    {property.availability && (
                      <p className="text-red-500 text-xs md:text-sm font-semibold mt-1 mb-2 md:mb-3 text-center md:text-left">
                        {property.availability}
                      </p>
                    )}

                    <div className="flex justify-between items-center pt-2 border-t border-sky-200">
                      <div className="flex items-center text-sky-600 text-xs md:text-sm">
                        <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                        <span>{property.sqft} sq.ft.</span>
                      </div>
                      <a 
                        href="https://calendly.com/northwoodestatesmhc/house-tour?month=2025-05"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-blue-gradient text-white px-2 md:px-3 py-1 md:py-1.5 rounded-md font-medium transition-all duration-300 group text-xs md:text-sm hover:shadow-md"
                      >
                        Book Showing
                        <svg className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-1.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Special Offer Ribbon - Top Corner */}
            <div className="absolute top-0 right-0 z-20">
              <div className="bg-blue-gradient text-white px-3 md:px-4 py-1 md:py-2 font-bold text-xs md:text-sm transform rotate-0 origin-top-right shadow-lg rounded-bl-lg">
                <span>New Homes</span>
              </div>
            </div>
            
            {/* Virtual Tour Button */}
            <div className="absolute top-3 md:top-4 left-3 md:left-4 z-20">
              <motion.a 
                href={activeSlide !== null && properties[activeSlide] ? properties[activeSlide].virtualTourUrl : "#"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-sky-600 hover:bg-sky-700 text-white px-2 md:px-3 py-1 rounded-lg shadow-lg flex items-center transition-all text-xs md:text-sm font-medium"
              >
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Virtual Tour
              </motion.a>
            </div>
          </div>
          
          {/* Navigation Dots - Moved outside the carousel container */}
          <div className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 md:space-x-3">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 shadow-md ${
                  activeSlide === index ? `bg-sky-600 w-6 md:w-8` : `bg-white hover:bg-sky-200`
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Schedule Tour Button - mobile only */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <motion.a 
          href="#apply" 
          className="bg-blue-gradient-dark text-white px-4 py-2 rounded-full shadow-xl text-sm font-medium flex items-center blue-glow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Schedule a Tour
        </motion.a>
      </div>

      {/* Render the ApplyTodayPopup */}
      <ApplyTodayPopup 
        isOpen={isApplyPopupOpen} 
        onClose={() => setIsApplyPopupOpen(false)} 
        onProceed={() => {
          console.log("Proceeding to application..."); 
          window.open('https://ewood.twa.rentmanager.com/ApplyNow?propertyID=33&locations=1', '_blank');
        }}
      />
    </section>
  );
};

export default Hero; 
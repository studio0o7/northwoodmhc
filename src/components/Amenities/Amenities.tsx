'use client';

import React, { useState, useEffect } from 'react';
import { FaDog, FaChild, FaBook, FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaRoad, FaUserTie } from 'react-icons/fa';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Define amenity type
type AmenityType = {
  icon: React.ReactNode;
  title: string;
};

// Define photo type
type PhotoType = {
  src: string;
  alt: string;
};

const Amenities = () => {
  // Define Northwood Estates MHC's actual amenities with icons
  const amenities: AmenityType[] = [
    { icon: <FaBuilding />, title: 'Community Center' },
    { icon: <FaChild />, title: 'Playground' },
    { icon: <FaDog />, title: 'Pet Friendly' },
    { icon: <FaUserTie />, title: 'On-Site Management' },
    { icon: <FaRoad />, title: 'Quick I-75 Access' },
    { icon: <FaMoneyBillWave />, title: 'Online Bill Pay' },
    { icon: <FaBook />, title: 'Mobile Library' },
    { icon: <FaCalendarAlt />, title: 'Resident Events' },
  ];

  // Community photos
  const photos: PhotoType[] = [
    { src: "/images/main.JPG", alt: "Main Entrance" },
    { src: "/images/Com1.JPG", alt: "Northwood Estates Community" },
    { src: "/images/com.JPG", alt: "Northwood Estates MHC" },
    { src: "/images/com2.JPG", alt: "Mobile Home Community View" },
    { src: "/images/commailboxes.JPG", alt: "Community Mailboxes" },
    { src: "/images/complayground.JPG", alt: "Community Playground" },
  ];

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  // Auto-rotate through images
  useEffect(() => {
    if (!autoplay || showFullGallery || isHovering) return;
    
    const interval = setInterval(() => {
      setActivePhotoIndex(prev => (prev + 1) % photos.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoplay, photos.length, showFullGallery, isHovering]);

  return (
    <section id="amenities" className="py-16 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/4 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/4 opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 bg-blue-gradient text-white text-sm font-semibold rounded-full mb-2">
            Community Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sky-900 mb-3">
            Discover Our <span className="text-sky-600">Amenities</span>
          </h2>
          <p className="text-lg text-sky-800 max-w-2xl mx-auto">
            Experience the quality lifestyle at Northwood Estates with our excellent amenities and community features.
          </p>
        </motion.div>

        {/* Enhanced side-by-side layout */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          {/* LEFT SIDE: Ultra-modern gallery */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Interactive photo gallery */}
            <div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-sky-100 hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Dynamic main image display */}
              <div className="relative aspect-[16/10] group">
                {/* Main image with transition effect */}
                {photos.map((photo, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === activePhotoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-10000 group-hover:scale-110"
                    />
                  </div>
                ))}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-20 opacity-80"></div>
                
                {/* Community title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-30 transform transition-transform duration-300 translate-y-0 group-hover:translate-y-1">
                  <h3 className="font-bold text-lg drop-shadow-lg text-white">
                    Northwood Estates MHC
                  </h3>
                  <p className="text-white/90 text-sm hidden group-hover:block transition-all duration-300">
                    Click any thumbnail to explore our community
                  </p>
                </div>
                
                {/* Navigation dots */}
                <div className="absolute bottom-4 right-4 flex space-x-1.5 z-30">
                  {photos.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        setActivePhotoIndex(idx);
                        setAutoplay(false);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activePhotoIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
                
                {/* Full view button */}
                <motion.button 
                  className="absolute right-4 top-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30 z-30"
                  onClick={() => setShowFullGallery(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  </svg>
                </motion.button>
                
                {/* Left/Right arrows - visible on hover */}
                <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                  <motion.button 
                    className="bg-white/20 backdrop-blur-sm text-white p-2.5 rounded-full hover:bg-white/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex(prev => prev === 0 ? photos.length - 1 : prev - 1);
                      setAutoplay(false);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <motion.button 
                    className="bg-white/20 backdrop-blur-sm text-white p-2.5 rounded-full hover:bg-white/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex(prev => (prev + 1) % photos.length);
                      setAutoplay(false);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
              
              {/* Modern thumbnail strip */}
              <div className="p-2 px-1 grid grid-cols-6 gap-1">
                {photos.map((photo, idx) => (
                  <motion.div 
                    key={idx}
                    onClick={() => {
                      setActivePhotoIndex(idx);
                      setAutoplay(false);
                    }}
                    className={`
                      relative overflow-hidden cursor-pointer rounded-md
                      ${idx === activePhotoIndex ? 'ring-2 ring-sky-500' : 'opacity-70 hover:opacity-100'} 
                      transition-all duration-300
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="aspect-square relative">
                      <Image 
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="100px"
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* RIGHT SIDE: Premium amenities display */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Premium amenities cards */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-sky-100 h-full flex flex-col">
              <div className="bg-blue-gradient-dark p-4 text-white relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 w-full h-full opacity-10">
                  <div className="absolute right-0 bottom-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                  <div className="absolute left-0 top-0 w-20 h-20 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="relative z-10 flex items-center">
                  <span className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold">Community Highlights</h3>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between p-5 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((amenity, idx) => (
                    <motion.div 
                      key={amenity.title}
                      className="group bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-sky-50"
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-gradient text-white p-2 rounded-lg mr-2.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {amenity.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-sky-800 text-sm">{amenity.title}</h4>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* CTA button - moved up, less margin */}
                <div className="pt-4">
                  <motion.a 
                    href="#apply" 
                    className="relative bg-blue-gradient text-white py-3 px-6 rounded-xl font-medium inline-flex items-center justify-center w-full shadow-md hover:shadow-lg transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-2">Schedule a Tour Today</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.a>
                </div>
                {/* Tagline moved from left to right */}
                <div className="mt-6">
                  <p className="text-sky-700 text-sm italic text-center">
                    A friendly community offering comfortable manufactured homes in Northwood, Ohio. Perfectly balancing affordability and lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Full-screen gallery modal */}
      <AnimatePresence>
        {showFullGallery && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullGallery(false)}
          >
            <motion.div 
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button 
                className="absolute top-4 right-4 z-10 bg-white/20 text-white p-2.5 rounded-full hover:bg-white/30 transition-colors"
                onClick={() => setShowFullGallery(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
              {/* Main image */}
              <div className="relative h-[70vh] rounded-t-2xl overflow-hidden">
                <Image 
                  src={photos[activePhotoIndex].src}
                  alt={photos[activePhotoIndex].alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="transition-opacity duration-300"
                />
                
                {/* Navigation arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <motion.button 
                    className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/40 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex(prev => prev === 0 ? photos.length - 1 : prev - 1);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <motion.button 
                    className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/40 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex(prev => (prev + 1) % photos.length);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
                
                {/* Image counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {activePhotoIndex + 1} / {photos.length}
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-b-2xl flex overflow-x-auto gap-2 justify-center">
                {photos.map((photo, idx) => (
                  <motion.div 
                    key={idx}
                    className={`
                      relative cursor-pointer flex-shrink-0 transition-all duration-300
                      ${idx === activePhotoIndex ? 'ring-2 ring-sky-400 opacity-100' : 'opacity-50 hover:opacity-80'}
                    `}
                    onClick={() => setActivePhotoIndex(idx)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="h-20 w-32 relative rounded-md overflow-hidden">
                      <Image 
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="128px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Amenities; 
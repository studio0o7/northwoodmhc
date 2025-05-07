'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes, FaArrowRight, FaArrowLeft, FaCalendarAlt, FaPhone, FaBed, FaBath, FaRuler } from 'react-icons/fa';

// Types for properties (copied from HomesRVs)
type PropertyType = {
  id: number;
  name: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  price: number;
  monthlyPrice: number;
  image: string;
  description: string;
  leaseToOwn?: boolean;
  financing?: boolean;
  features?: string[];
  additionalImages?: string[];
};

type PropertyDetailModalProps = {
  selectedProperty: PropertyType | null;
  closePropertyModal: () => void;
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
};

const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  selectedProperty,
  closePropertyModal,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  // Get current display image (main or additional)
  const getCurrentImage = () => {
    if (!selectedProperty) return '';
    if (currentImageIndex === 0) return selectedProperty.image;
    if (!selectedProperty.additionalImages) return selectedProperty.image;
    return selectedProperty.additionalImages[currentImageIndex - 1];
  };

  const nextImage = () => {
    if (!selectedProperty?.additionalImages) return;
    setCurrentImageIndex((prev) => 
      prev === selectedProperty.additionalImages!.length ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedProperty?.additionalImages) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProperty.additionalImages!.length : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {selectedProperty && (
        <div 
          className="fixed inset-0 z-[999999] flex items-center justify-center p-0 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-sm"
          onClick={closePropertyModal}
          style={{ 
            position: 'fixed', 
            isolation: 'isolate' 
          }}
        >
          <motion.div 
            className="bg-white w-full max-w-4xl rounded-none sm:rounded-2xl shadow-2xl border border-sky-100 my-0 sm:my-8 h-full sm:h-auto max-h-[100vh] sm:max-h-[90vh] overflow-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Gallery */}
            <div className="relative h-[30vh] sm:h-[40vh]">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${getCurrentImage()})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>
              
              {/* Image Navigation */}
              <button 
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 text-sky-700 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <FaArrowLeft />
              </button>
              <button 
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 text-sky-700 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <FaArrowRight />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                <button 
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentImageIndex === 0 ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(0);
                  }}
                />
                {selectedProperty.additionalImages?.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentImageIndex === idx + 1 ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx + 1);
                    }}
                  />
                ))}
              </div>

              {/* Price Badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-blue-gradient text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-bold shadow-lg">
                  ${selectedProperty.monthlyPrice}/month
                </div>
              </div>

              {/* Close Button */}
              <button 
                className="absolute top-4 left-4 bg-black/60 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                onClick={closePropertyModal}
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4 sm:mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-sky-900 mb-2">{selectedProperty.name}</h3>
                  <div className="flex items-center flex-wrap gap-y-2">
                    <span className="text-sky-600 flex items-center mr-4">
                      <FaBed className="mr-1 sm:mr-2" /> {selectedProperty.bedrooms} Bed
                    </span>
                    <span className="text-sky-600 flex items-center mr-4">
                      <FaBath className="mr-1 sm:mr-2" /> {selectedProperty.bathrooms} Bath
                    </span>
                    <span className="text-sky-600 flex items-center">
                      <FaRuler className="mr-1 sm:mr-2" /> {selectedProperty.sqft} sq.ft.
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-2 sm:mt-0">
                  {selectedProperty.leaseToOwn && (
                    <span className="bg-blue-gradient text-white text-xs font-bold px-3 py-1 rounded-full">
                      Lease to Own
                    </span>
                  )}
                  {selectedProperty.financing && (
                    <span className="bg-blue-gradient text-white text-xs font-bold px-3 py-1 rounded-full">
                      Financing
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sky-700 mb-6 text-sm sm:text-base md:text-lg">{selectedProperty.description}</p>

              {/* Features List */}
              <div className="mb-6">
                <h4 className="text-lg sm:text-xl font-bold text-sky-800 mb-3">Features & Amenities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  {selectedProperty.features?.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start bg-sky-50 p-2 sm:p-3 rounded-lg"
                    >
                      <div className="bg-blue-gradient p-1.5 rounded-full mr-2 sm:mr-3 text-white">
                        <FaCheck className="text-xs" />
                      </div>
                      <span className="text-sky-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="border-t border-sky-100 pt-6 mt-6 flex flex-col sm:flex-row gap-3">
                <a 
                  href="#apply" 
                  className="flex-1 bg-blue-gradient text-white py-3 px-4 rounded-lg font-bold text-center flex items-center justify-center"
                  onClick={closePropertyModal}
                >
                  <FaCalendarAlt className="mr-2" />
                  Schedule Showing
                </a>
                <a 
                  href="#apply" 
                  className="flex-1 border-2 border-sky-500 text-sky-700 hover:bg-sky-50 py-3 px-4 rounded-lg font-bold text-center flex items-center justify-center"
                  onClick={closePropertyModal}
                >
                  <FaPhone className="mr-2" />
                  Inquire Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PropertyDetailModal; 
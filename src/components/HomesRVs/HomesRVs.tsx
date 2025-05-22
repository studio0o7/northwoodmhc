'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaDollarSign, FaHome, FaHandshake, FaInfoCircle, FaCalendarAlt, FaArrowRight, FaArrowLeft, FaFileSignature } from 'react-icons/fa';
import PropertyModalRoot from './PropertyModalRoot';
import ApplyTodayPopup from '../ApplyTodayPopup/ApplyTodayPopup';

// Types for properties
type PropertyType = {
  id: number;
  name: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  dimensions: string;
  price: number;
  monthlyPrice: number;
  image: string;
  description: string;
  leaseToOwn?: boolean;
  financing?: boolean;
  features?: string[];
  additionalImages?: string[];
  availability?: string;
  virtualTourUrl?: string;
};

// Purchasing options
type PurchaseOption = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const HomesRVs = () => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isApplyPopupOpen, setIsApplyPopupOpen] = useState(false);
  
  const purchaseOptions: PurchaseOption[] = [
    {
      id: 'purchase',
      title: 'Purchase Program',
      description: 'Buy your dream home outright with our competitive financing options.',
      icon: <FaHome />
    },
    {
      id: 'lease-to-own',
      title: 'Lease to Own',
      description: 'Start with a lease and convert payments toward ownership over time.',
      icon: <FaHandshake />
    },
    {
      id: 'financing',
      title: 'Financing Available',
      description: 'Various financing options with competitive rates for qualified buyers.',
      icon: <FaDollarSign />
    }
  ];
  
  // Sample data for properties
  const properties: PropertyType[] = [
    {
      id: 1,
      name: "2 Bed 2 Bath Home",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1008,
      dimensions: "14x72",
      price: 34995,
      monthlyPrice: 895,
      image: "/images/2bed2bath.jpg",
      description: "This home features new premium 100% waterproof flooring throughout, a new HVAC system, and a new water tank.",
      leaseToOwn: true,
      financing: true,
      availability: "Last unit left",
      features: ["New waterproof flooring", "New HVAC", "New water tank", "Energy-efficient appliances", "Open floor plan"],
      additionalImages: ['/images/2bed.jpg', '/images/2bed1.jpg', '/images/2bed2.jpg', '/images/2bed3.jpg'],
    },
    {
      id: 2,
      name: "3 Bed 2 Bath Home",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1216,
      dimensions: "16x76",
      price: 79995,
      monthlyPrice: 1195,
      image: "/images/3Bed-ThePulse.jpg",
      description: "Experience expansive living in this premium 16x76 home, featuring high-end finishes and a design perfect for modern families seeking comfort and style.",
      leaseToOwn: true,
      financing: true,
      availability: "Last unit left",
      features: [
        "Spacious 16x76 layout", 
        "Premium high-end finishes", 
        "Quality craftsmanship", 
        "Stylish & functional design", 
        "Open-concept living", 
        "Well-equipped kitchen",
        "Rheem® Hybrid Heat Pump Water Heater",
        "Lux® Argon Gas Low-E Windows",
        "Insulated Exterior Doors",
        "Additional Insulation",
        "ENERGY STAR® Certified Refrigerator and Dishwasher",
        "Carrier® HVAC Heat Pump or Gas Furnace",
        "LED Lighting",
        "ecobee Smart Thermostat",
        "Solar Ready"
      ],
      additionalImages: ['/images/3BedPulse.jpg', '/images/3BedPulse1.jpg', '/images/3BedPulse2.jpg', '/images/3BedPulse3.jpg'],
      virtualTourUrl: "https://momento360.com/e/uc/4c68f3949e9248d7b384deb250e13eca?utm_campaign=embed&utm_source=other&reset-heading=true&size=large"
    },
    {
      id: 3,
      name: "3 Bed 2 Bath Home",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1152,
      dimensions: "16x72",
      price: 74995,
      monthlyPrice: 1095,
      image: "/images/3Bed-TheLone.jpg",
      description: "Discover modern style and everyday luxury in this 16x72 home, offering a sleek design, comfortable interiors, and attention to detail throughout.",
      leaseToOwn: true,
      financing: true,
      availability: "3 units left",
      features: [
        "Modern 16x72 design", 
        "Comfortable & stylish interiors",
        "Sleek aesthetics", 
        "Open-concept living", 
        "Well-equipped kitchen",
        "Rheem® Hybrid Heat Pump Water Heater",
        "Lux® Argon Gas Low-E Windows",
        "Insulated Exterior Doors",
        "Additional Insulation",
        "ENERGY STAR® Certified Refrigerator and Dishwasher",
        "Carrier® HVAC Heat Pump or Gas Furnace",
        "LED Lighting",
        "ecobee Smart Thermostat",
        "Solar Ready"
      ],
      additionalImages: ['/images/3bedlone.png', '/images/3bedlone1.png', '/images/3bedlone2.png', '/images/3bedlone3.png', '/images/3bedlone4.png'],
      virtualTourUrl: "https://my.matterport.com/show/?m=bo5ofaNrm1C"
    },
    {
      id: 4,
      name: "3 Bed 2 Bath Home",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1024,
      dimensions: "16x64",
      price: 74995,
      monthlyPrice: 1095,
      image: "/images/3Bed-ThePulse2.jpg",
      description: "This 16x64 home perfectly balances family comfort with an efficient layout, featuring stylish finishes and an inviting atmosphere for quality living.",
      leaseToOwn: true,
      financing: true,
      features: ["Family-friendly 16x64 layout", "Inviting living experience", "Efficient & stylish design", "Quality finishes", "Open-concept living", "Well-equipped kitchen"],
      additionalImages: ['/images/3bedlone.png', '/images/3bedlone1.png', '/images/3bedlone2.png', '/images/3bedlone3.png', '/images/3bedlone4.png'],
      virtualTourUrl: "https://my.matterport.com/show/?m=JU537Fb1dRU"
    }
  ];

  // Reset image index when property changes
  const openPropertyModal = (property: PropertyType) => {
    setSelectedProperty(property);
    setCurrentImageIndex(0);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closePropertyModal = () => {
    setSelectedProperty(null);
    // Re-enable body scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  // Scroll functions for the horizontal scrolling
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="homes" className="bg-blue-frost py-16 relative overflow-hidden">
      {/* Decorative background elements - simplified for performance */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full -translate-y-1/3 translate-x-1/3 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-50 rounded-full translate-y-1/2 -translate-x-1/4 opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 bg-blue-gradient text-white text-sm font-semibold rounded-full mb-2">
            Our Properties
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sky-900 mb-3">
            Find Your Perfect <span className="text-sky-600">Home</span>
          </h2>
          <p className="text-lg text-sky-800 max-w-2xl mx-auto">
            Browse our selection of beautifully crafted manufactured homes.
          </p>
        </motion.div>

        {/* Purchase Options - Responsive Layout */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg md:rounded-full shadow-md border border-sky-100 p-3 flex flex-wrap justify-center gap-2 w-full max-w-md md:max-w-2xl">
            {purchaseOptions.map((option) => (
              <div 
                key={option.id}
                className="flex items-center px-3 py-2 rounded-lg md:rounded-full hover:bg-sky-50 transition-all group relative w-full sm:w-auto"
              >
                <div className="bg-blue-gradient text-white p-1.5 rounded-full shadow-sm mr-2 flex-shrink-0">
                  {option.icon}
                </div>
                <span className="font-medium text-sky-800 text-sm">{option.title}</span>
                
                {/* Tooltip on hover - visibility controlled by CSS only */}
                <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white shadow-lg rounded-md p-2 z-10 text-sm text-sky-700 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
                  {option.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Property Horizontal Scroller - Simplified for better performance */}
        <div className="mb-10 relative">
          {/* Navigation buttons */}
          <div className="absolute -inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center z-10 pointer-events-none">
            <button 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-sky-600 hover:text-sky-800 transition-all pointer-events-auto"
              onClick={scrollLeft}
            >
              <FaArrowLeft />
            </button>
            <button 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-sky-600 hover:text-sky-800 transition-all pointer-events-auto"
              onClick={scrollRight}
            >
              <FaArrowRight />
            </button>
          </div>
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-4 md:gap-6 pl-2">
              {properties.map((property) => (
                <div 
                  key={property.id} 
                  className="bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-sky-100 cursor-pointer transform transition-all duration-300 hover:shadow-xl flex-shrink-0 w-[280px] md:w-[340px] snap-start"
                  onClick={() => openPropertyModal(property)}
                >
                  <div className="relative h-48 md:h-52 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${property.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    </div>
                    
                    {/* Property Info Badges (Top Left - for bed/bath/dimensions) */}
                    <div className="absolute top-3 left-3 flex space-x-2">
                        <div className="bg-sky-800/80 text-white px-2 py-1 rounded text-xs md:text-sm font-medium flex items-center">
                          <FaBed className="mr-1" /> {property.bedrooms}
                        </div>
                        <div className="bg-sky-800/80 text-white px-2 py-1 rounded text-xs md:text-sm font-medium flex items-center">
                          <FaBath className="mr-1" /> {property.bathrooms}
                        </div>
                        <div className="bg-sky-800/80 text-white px-2 py-1 rounded text-xs md:text-sm font-medium flex items-center">
                          <FaRuler className="mr-1" /> {property.dimensions}
                        </div>
                    </div>
                    
                    {/* Price badge (Top Right) */}
                    <div className="absolute top-3 right-3 bg-blue-gradient text-white px-3 py-1 rounded-full font-bold shadow-md text-xs md:text-sm">
                      ${property.monthlyPrice}/mo
                    </div>
                    
                    {/* Program Labels & Availability (Now grouped differently) */}
                    {/* Lease to Own and Financing moved to top-left with property info for grouping, availability to bottom right */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-1 mt-8"> {/* Adjusted margin-top to avoid overlap */}
                      {property.leaseToOwn && (
                        <span className="bg-sky-600/90 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                          Lease to Own
                        </span>
                      )}
                      {property.financing && (
                        <span className="bg-sky-600/90 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                          Financing
                        </span>
                      )}
                    </div>

                    {/* Availability Badge (Bottom Right) */}
                    {property.availability && (
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-red-600/90 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                          {property.availability}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 md:p-5">
                    {/* Property name */}
                    <h3 className="text-base md:text-lg font-bold text-sky-800 mb-2">{property.name}</h3>
                    
                    {/* Description with fixed height */}
                    <p className="text-sky-700 text-xs md:text-sm mb-4 line-clamp-2 h-8 md:h-10">{property.description}</p>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      <button 
                        className="bg-blue-gradient text-white py-1.5 md:py-2 px-2 rounded-lg font-medium text-xs md:text-sm flex items-center justify-center shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open('https://calendly.com/northwoodestatesmhc/house-tour', '_blank');
                        }}
                      >
                        <FaCalendarAlt className="mr-1" />
                        Book Showing
                      </button>
                      <button 
                        className="border-2 border-sky-500 hover:bg-sky-50 text-sky-700 py-1.5 md:py-2 px-2 rounded-lg font-medium text-xs md:text-sm flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsApplyPopupOpen(true);
                        }}
                      >
                        <FaFileSignature className="mr-1" />
                        Apply Now
                      </button>
                    </div>
                    
                    {/* View Details link */}
                    <div className="text-center mt-3">
                      <button 
                        className="text-sky-600 hover:text-sky-800 font-medium text-xs md:text-sm inline-flex items-center transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPropertyModal(property);
                        }}
                      >
                        View Details
                        <FaInfoCircle className="ml-1.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Property Detail Modal - Use the extracted component */}
        <PropertyModalRoot 
          selectedProperty={selectedProperty}
          closePropertyModal={closePropertyModal}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          openApplyPopup={() => setIsApplyPopupOpen(true)}
        />
      </div>

      {/* Render the ApplyTodayPopup */}
      <ApplyTodayPopup 
        isOpen={isApplyPopupOpen} 
        onClose={() => setIsApplyPopupOpen(false)} 
        onProceed={() => {
          window.open('https://ewood.twa.rentmanager.com/ApplyNow?propertyID=33&locations=1', '_blank');
        }}
      />
    </section>
  );
};

export default HomesRVs; 
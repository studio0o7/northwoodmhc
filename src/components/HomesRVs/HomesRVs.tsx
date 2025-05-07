'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaDollarSign, FaHome, FaHandshake, FaInfoCircle, FaCalendarAlt, FaPhone, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import PropertyModalRoot from './PropertyModalRoot';

// Types for properties
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
  
  // Sample data for properties - removed RV properties
  const properties: PropertyType[] = [
    {
      id: 1,
      name: 'Model Home',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1200,
      price: 79900,
      monthlyPrice: 599,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Spacious model with high-end finishes, quality craftsmanship, and a design that emphasizes both style and functionality.',
      leaseToOwn: true,
      financing: true,
      features: [
        'Energy-efficient appliances',
        'Central air conditioning',
        'Walk-in closets',
        'Modern kitchen with island',
        'Spacious master bathroom',
        'Front porch'
      ],
      additionalImages: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
        'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      ]
    },
    {
      id: 2,
      name: 'Family Home',
      bedrooms: 4,
      bathrooms: 2,
      sqft: 1400,
      price: 89900,
      monthlyPrice: 699,
      image: 'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Sleek design with modern features, open-concept living area, well-equipped kitchen, and stylish finishes throughout.',
      leaseToOwn: true,
      financing: true,
      features: [
        'Open-concept floor plan',
        'Stainless steel appliances',
        'Luxury vinyl plank flooring',
        'Large living room with vaulted ceiling',
        'Separate laundry room',
        'Extra storage space'
      ],
      additionalImages: [
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
        'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      ]
    },
    {
      id: 3,
      name: 'Compact Home',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 900,
      price: 59900,
      monthlyPrice: 499,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Compact yet comfortable home with efficient layout, perfect for singles or couples.',
      financing: true,
      features: [
        'Energy-efficient windows',
        'Breakfast bar',
        'Durable metal roof',
        'Compact yet functional design',
        'Built-in bookshelves',
        'Garden tub in bathroom'
      ],
      additionalImages: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1531835551805-16d864c8d311?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
        'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80'
      ]
    },
    {
      id: 6,
      name: 'Luxury Model',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1600,
      price: 99900,
      monthlyPrice: 799,
      image: 'https://images.unsplash.com/photo-1494526585095-c41cabfe98bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Premium home with upscale features, spacious rooms, and elegant design touches throughout.',
      leaseToOwn: true,
      financing: true,
      features: [
        'Granite countertops',
        'Hardwood floors',
        'Garden tub in master bath',
        'Crown molding',
        'Recessed lighting',
        'Smart home features'
      ],
      additionalImages: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1550223026-0d6fd780c560?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      ]
    },
    {
      id: 7,
      name: 'Modern Living',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1350,
      price: 84900,
      monthlyPrice: 649,
      image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Contemporary home with clean lines, open floor plan, and stylish finishes perfect for modern living.',
      financing: true,
      features: [
        'Open concept design',
        'Kitchen island with breakfast bar',
        'Large windows for natural light',
        'Built-in shelving',
        'Modern fixtures',
        'Energy efficient appliances'
      ],
      additionalImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      ]
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
                    
                    {/* Property Info Badges */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-between px-4">
                      <div className="flex space-x-2">
                        <div className="bg-sky-800/80 text-white px-2 py-1 rounded text-xs md:text-sm font-medium flex items-center">
                          <FaBed className="mr-1" /> {property.bedrooms}
                        </div>
                        <div className="bg-sky-800/80 text-white px-2 py-1 rounded text-xs md:text-sm font-medium flex items-center">
                          <FaBath className="mr-1" /> {property.bathrooms}
                        </div>
                        <div className="bg-sky-800/80 text-white px-2 py-1 rounded text-xs md:text-sm font-medium flex items-center">
                          <FaRuler className="mr-1" /> {property.sqft}
                        </div>
                      </div>
                    </div>
                    
                    {/* Price badge */}
                    <div className="absolute top-3 right-3 bg-blue-gradient text-white px-3 py-1 rounded-full font-bold shadow-md text-xs md:text-sm">
                      ${property.monthlyPrice}/mo
                    </div>
                    
                    {/* Program Labels */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
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
                          window.location.href = "#apply";
                        }}
                      >
                        <FaCalendarAlt className="mr-1" />
                        Book Showing
                      </button>
                      <button 
                        className="border-2 border-sky-500 hover:bg-sky-50 text-sky-700 py-1.5 md:py-2 px-2 rounded-lg font-medium text-xs md:text-sm flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = "#apply";
                        }}
                      >
                        <FaPhone className="mr-1" />
                        Inquire Now
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
        />
      </div>
    </section>
  );
};

export default HomesRVs; 
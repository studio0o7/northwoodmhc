'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaHome, FaSwimmingPool, FaMapMarkerAlt } from 'react-icons/fa';
import ApplyTodayPopup from '../ApplyTodayPopup/ApplyTodayPopup';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isApplyPopupOpen, setIsApplyPopupOpen] = useState(false);

  // Updated nav items to match page structure
  const navItems = [
    { name: 'New Homes', href: '#homes', icon: <FaHome className="mr-2" /> },
    { name: 'Amenities', href: '#amenities', icon: <FaSwimmingPool className="mr-2" /> },
    { name: 'Neighborhood', href: '#neighborhood', icon: <FaMapMarkerAlt className="mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-sky-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="font-sans text-2xl md:text-3xl font-bold tracking-tight">
              <span className="text-sky-600">Northwood Estates</span> <span className="text-sky-500 text-xl md:text-2xl">MHC</span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-end flex-1">
          {/* Desktop Navigation */}
          <nav className="flex space-x-5 mr-6">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="text-sky-600 hover:text-sky-500 font-medium transition-colors px-1 py-1 border-b-2 border-transparent hover:border-sky-400 flex items-center"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex space-x-3">
            <a 
              href="#contact" 
              className="border border-sky-500 text-sky-500 hover:bg-sky-50 py-1.5 px-3 rounded-lg font-medium transition-all duration-300 text-sm"
            >
              Contact Us
            </a>
            <button 
              onClick={() => setIsApplyPopupOpen(true)}
              className="bg-blue-gradient text-white font-medium py-1.5 px-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-sm"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-sky-600 focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-sky-100">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="text-sky-600 hover:text-sky-500 font-medium py-2 border-b border-sky-100 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
            <div className="flex gap-3 pt-3">
              <a 
                href="#contact" 
                className="flex-1 border border-sky-500 text-sky-500 hover:bg-sky-50 text-center py-2 rounded-lg font-medium text-sm transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
              <button 
                onClick={() => {
                  setIsApplyPopupOpen(true);
                  setIsMenuOpen(false);
                }} 
                className="flex-1 bg-blue-gradient text-white text-center py-2 rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render the ApplyTodayPopup */}
      <ApplyTodayPopup 
        isOpen={isApplyPopupOpen} 
        onClose={() => {
          setIsApplyPopupOpen(false);
        }} 
        onProceed={() => {
          window.open('https://ewood.twa.rentmanager.com/ApplyNow?propertyID=33&locations=1', '_blank');
          setIsMenuOpen(false);
        }}
      />
    </header>
  );
};

export default Header; 
'use client';

import React from 'react';
import { FaGraduationCap, FaPaw, FaTree, FaHome, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const InfoBanner = () => {
  const features = [
    { icon: <FaGraduationCap />, text: "Better School District" },
    { icon: <FaPaw />, text: "Pet Friendly Community" },
    { icon: <FaTree />, text: "Beautiful Green Spaces" },
    { icon: <FaHome />, text: "Quality Manufactured Homes" },
    { icon: <FaMapMarkerAlt />, text: "Prime Location" },
  ];

  return (
    <div className="bg-blue-gradient-dark text-white py-3 overflow-hidden shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Features Scroller */}
          <div className="overflow-x-auto no-scrollbar flex-1 mr-4">
            <div className="flex space-x-10 animate-scroll">
              {features.concat(features).map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center flex-shrink-0"
                >
                  <span className="text-sky-200 mr-2 text-lg">
                    {feature.icon}
                  </span>
                  <span className="whitespace-nowrap text-sm font-medium text-white">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call Button */}
          <a 
            href="tel:4199646639" 
            className="bg-blue-50 hover:bg-white text-sky-700 px-4 py-2 rounded-md flex items-center flex-shrink-0 transition-all duration-300 font-bold text-sm whitespace-nowrap shadow-md hover:shadow-lg blue-glow-hover border border-sky-200"
          >
            <FaPhoneAlt className="mr-2 text-sky-600" />
            Call: (419) 964-6639
          </a>
        </div>
      </div>
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default InfoBanner; 
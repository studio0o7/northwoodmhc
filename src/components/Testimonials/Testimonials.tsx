'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

type TestimonialType = {
  id: number;
  name: string;
  rating: number;
  text: string;
};

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Testimonials data
  const testimonials: TestimonialType[] = [
    {
      id: 1,
      name: "Justin",
      rating: 5,
      text: "Absolutely world class customer service! The office staff was absolutely wonderful. Would recommend to anybody, they're rockstars!"
    },
    {
      id: 2,
      name: "Andranae Vallier",
      rating: 5,
      text: "I moved in two weeks ago and I love it here! Everyone is so nice, the staff in the office always respond very quickly when I call and my neighbors always speak. It really feels like a community here."
    },
    {
      id: 3,
      name: "Liz Frusher",
      rating: 5,
      text: "The community manager is so sweet! She was so patient and helpful. The maintenance staff was so nice showing us around and even driving to the one that was too far for me to walk while carrying my daughter. Very quiet and well maintained. We are looking forward to moving in!"
    },
    {
      id: 4,
      name: "Lesley Zimmerman",
      rating: 5,
      text: "The management team ROCKS! They work so hard with my family and I to get us in and settled. The maintenance staff went above and beyond by showing us 4 different properties as well as answer every question we had. I've had a couple of questionable management issues in the past with renting but these folks are nothing short of amazing. The office staff was out and as soon as they came back they were hitting the floor running with our applications and getting us approved. I am so thankful for this community already."
    },
    {
      id: 5,
      name: "Marco Kelly",
      rating: 5,
      text: "Northwood Estates is by far the best manufactured home community in the area. Whether you're a single, retired, or starting a family they have a place that will fit your needs! The community manager is one of the kindest people I had the pleasure of meeting. They make you feel right at home and are super polite and welcoming! I wouldn't think twice about checking the place out and what they have to offer! The schools are amazing, and people in the community are even better!"
    }
  ];

  // Auto-scrolling effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Set up the animation
    let animationId: number;
    let startTime: number | null = null;
    const duration = 40000; // 40 seconds for one complete cycle
    let isManualScrolling = false;
    let lastScrollPos = 0;
    let scrollTimeout: NodeJS.Timeout;
    
    const animate = (timestamp: number) => {
      if (isManualScrolling) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate scroll position
      const scrollWidth = scrollContainer.scrollWidth / 2; // Just the original items width
      const progress = (elapsed % duration) / duration;
      const scrollPos = scrollWidth * progress;
      
      // Apply scroll - smoothly loop back to start when reaching the end
      scrollContainer.scrollLeft = scrollPos;
      
      // Continue animation
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationId = requestAnimationFrame(animate);
    
    // Detect manual scrolling
    const handleScroll = () => {
      const currentScrollPos = scrollContainer.scrollLeft;
      
      // Detect if user is manually scrolling
      if (Math.abs(currentScrollPos - lastScrollPos) > 5) {
        isManualScrolling = true;
        clearTimeout(scrollTimeout);
        
        // Resume auto-scrolling after a period of inactivity
        scrollTimeout = setTimeout(() => {
          // Reset auto-scroll timer to continue from current position
          startTime = null;
          isManualScrolling = false;
        }, 2000);
      }
      
      lastScrollPos = currentScrollPos;
    };
    
    // Pause on hover
    const handleMouseEnter = () => {
      isManualScrolling = true;
    };
    
    const handleMouseLeave = () => {
      startTime = null;
      isManualScrolling = false;
    };
    
    scrollContainer.addEventListener('scroll', handleScroll);
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(scrollTimeout);
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicated testimonials for infinite scrolling without cloning DOM elements
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-10 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-100 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-100 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 bg-blue-gradient text-white text-sm font-semibold rounded-full mb-2">
            Our Community
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-sky-900">
            What Our <span className="text-sky-600">Residents</span> Say
          </h2>
        </motion.div>

        {/* Auto-scrolling testimonials container */}
        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          
          {/* Scrolling container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide py-6 gap-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`}
                className="testimonial-card flex-shrink-0 w-[300px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-sky-100 p-5 flex flex-col h-[280px]"
              >
                {/* Decorative blue accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-gradient rounded-t-xl"></div>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm mr-0.5" />
                  ))}
                </div>
                
                {/* Quote */}
                <div className="relative flex-grow overflow-y-auto max-h-[170px] pr-1 custom-scrollbar">
                  <FaQuoteLeft className="text-sky-400 text-lg mb-1 opacity-80 flex-shrink-0" />
                  <p className="text-sky-800 text-sm leading-relaxed mb-3">
                    {testimonial.text}
                  </p>
                </div>
                
                {/* Name */}
                <div className="mt-auto pt-3 border-t border-sky-100 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sky-900 text-sm">{testimonial.name}</p>
                  </div>
                  <div className="bg-blue-gradient text-white text-xs py-1 px-2 rounded-full font-medium">
                    <p className="text-white text-xs">Resident</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-8">
          <motion.a 
            href="#homes" 
            className="bg-blue-gradient text-white py-2 px-6 rounded-lg font-medium inline-flex items-center shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View Available Homes
          </motion.a>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #0ea5e9;
          border-radius: 20px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #0ea5e9 #f1f5f9;
        }
      `}</style>
    </section>
  );
};

export default Testimonials; 
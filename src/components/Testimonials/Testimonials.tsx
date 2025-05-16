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
      text: "World-class customer service! The office staff were wonderful. Highly recommend – they're rockstars!"
    },
    {
      id: 2,
      name: "Andranae Vallier",
      rating: 5,
      text: "Moved in two weeks ago and love it! Everyone's nice, office staff respond quickly, and neighbors are friendly. Feels like a real community."
    },
    {
      id: 3,
      name: "Liz Frusher",
      rating: 5,
      text: "The community manager is so sweet, patient, and helpful. Maintenance was great showing us around, even helping with my daughter. Quiet and well-maintained. Looking forward to moving in!"
    },
    {
      id: 4,
      name: "Lesley Zimmerman",
      rating: 5,
      text: "The management team is fantastic! They worked hard to get us settled. Maintenance showed us multiple properties and answered all questions. Past renting issues made me wary, but these folks are amazing. Office staff are efficient and got us approved quickly. So thankful for this community!"
    },
    {
      id: 5,
      name: "Marco Kelly",
      rating: 5,
      text: "Northwood Estates is the best manufactured home community around. Perfect for singles, retirees, or families. The community manager is incredibly kind and welcoming. Don't hesitate to check it out! Great schools and even better people."
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
                className="testimonial-card flex-shrink-0 w-[360px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-sky-100 p-5 flex flex-col h-[280px]"
              >
                {/* Decorative blue accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-gradient rounded-t-xl"></div>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm mr-0.5" />
                  ))}
                </div>
                
                {/* Quote - removed internal scroll */}
                <div className="relative flex-grow pr-1">
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

      {/* Custom scrollbar styles - can be removed since we're no longer using internal scrollbars */}
      <style jsx global>{``}</style>
    </section>
  );
};

export default Testimonials; 
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

interface ApplyTodayPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void; // Callback for when user proceeds
}

const ApplyTodayPopup: React.FC<ApplyTodayPopupProps> = ({ isOpen, onClose, onProceed }) => {
  const acknowledgements = [
    "I confirm that neither I nor any other adult who will reside in the home have had any evictions within the past three (3) years.",
    "I confirm that neither I nor any other adult who will reside in the home have any felony convictions.",
    "I confirm that our combined household income is at least three (3) times the monthly rent.",
    "I confirm that I do not own any pets considered to be of an aggressive breed."
  ];

  const handleProceed = () => {
    onProceed();
    onClose(); // Close the popup after proceeding
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose} // Close on overlay click
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>

            <div className="flex items-center mb-4">
              <FiAlertTriangle className="text-sky-500 mr-3" size={28} />
              <h2 className="text-xl md:text-2xl font-semibold text-sky-800">Application Acknowledgements</h2>
            </div>

            <p className="text-gray-600 mb-6 text-sm">
              Please review and acknowledge the following statements before proceeding with your application.
            </p>

            <ul className="space-y-3 mb-8">
              {acknowledgements.map((statement, index) => (
                <li key={index} className="flex items-start">
                  <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                  <span className="text-gray-700 text-sm">{statement}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleProceed}
                className="w-full sm:w-auto flex-1 bg-blue-gradient text-white font-medium py-2.5 px-6 rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Proceed to Application
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto flex-1 bg-gray-100 text-gray-700 font-medium py-2.5 px-6 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApplyTodayPopup; 
'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropertyDetailModal from './PropertyDetailModal';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaTimes, FaBed, FaBath, FaRuler, FaDollarSign, FaCalendarAlt, FaInfoCircle, FaChevronLeft, FaChevronRight, FaFileSignature, FaExternalLinkAlt } from 'react-icons/fa';

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

type PropertyModalRootProps = {
  selectedProperty: PropertyType | null;
  closePropertyModal: () => void;
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  openApplyPopup: () => void;
};

const PropertyModalRoot: React.FC<PropertyModalRootProps> = ({
  selectedProperty,
  closePropertyModal,
  currentImageIndex,
  setCurrentImageIndex,
  openApplyPopup,
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Create a portal to render the modal at the root level
  return mounted && selectedProperty ? createPortal(
    <PropertyDetailModal
      selectedProperty={selectedProperty}
      closePropertyModal={closePropertyModal}
      currentImageIndex={currentImageIndex}
      setCurrentImageIndex={setCurrentImageIndex}
      openApplyPopup={openApplyPopup}
    />,
    document.body
  ) : null;
};

export default PropertyModalRoot; 
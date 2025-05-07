'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropertyDetailModal from './PropertyDetailModal';

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
};

const PropertyModalRoot: React.FC<PropertyModalRootProps> = ({
  selectedProperty,
  closePropertyModal,
  currentImageIndex,
  setCurrentImageIndex,
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
    />,
    document.body
  ) : null;
};

export default PropertyModalRoot; 
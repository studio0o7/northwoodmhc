import React from 'react';
import Header from '@/components/Header/Header';
import InfoBanner from '@/components/InfoBanner/InfoBanner';
import Hero from '@/components/Hero/Hero';
import Testimonials from '@/components/Testimonials/Testimonials';
import HomesRVs from '@/components/HomesRVs/HomesRVs';
import Amenities from '@/components/Amenities';
import Neighborhood from '@/components/Neighborhood/Neighborhood';
import Application from '@/components/Application/Application';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <InfoBanner />
      <Hero />
      <Testimonials />
      <HomesRVs />
      <Amenities />
      <Neighborhood />
      <Application />
      <Footer />
    </main>
  );
} 
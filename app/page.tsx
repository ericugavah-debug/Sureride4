
'use client';

import HeroSection from './HeroSection';
import BookingSection from './BookingSection';
import FeaturesSection from './FeaturesSection';
import StatsSection from './StatsSection';
import TestimonialsSection from './TestimonialsSection';
import SocialPreview from './SocialPreview';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <BookingSection />
      <SocialPreview />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
    </div>
  );
}

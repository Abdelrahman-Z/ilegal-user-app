import React from 'react';
import type { Metadata } from 'next';
import HeroSection from '@/components/commercial-app/terms-and-conditions/HeroSection';
import TermsContent from '@/components/commercial-app/terms-and-conditions/TermsContent';
import NavigationBar from '@/components/commercial-app/UI/Navbar';
import Footer from '@/components/commercial-app/UI/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions | iLegalWorks',
  description: 'Terms and conditions for using iLegalWorks services. Read our terms of service to understand your rights and responsibilities.',
};

export default function TermsAndConditionsPage() {
  return (
    <main className="relative">
      <NavigationBar/>
      <HeroSection />
      <TermsContent />
      <Footer className='bg-deepBlue'/>
    </main>
  );
}

'use client'

import HeroSection from "@/components/commercial-app/privacy-policy/HeroSection";
import PrivacyContent from "@/components/commercial-app/privacy-policy/PrivacyContent";
import Footer from "@/components/commercial-app/UI/Footer";
import NavigationBar from "@/components/commercial-app/UI/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="relative">
      <NavigationBar />
      <HeroSection />
      <PrivacyContent/>
      <Footer className="bg-deepBlue"/>
    </div>
  );
}

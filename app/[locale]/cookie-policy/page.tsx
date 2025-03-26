'use client'

import CookieContent from "@/components/commercial-app/cookie-policy/CookieContent";
import HeroSection from "@/components/commercial-app/cookie-policy/HeroSection";
import Footer from "@/components/commercial-app/UI/Footer";
import NavigationBar from "@/components/commercial-app/UI/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="relative">
      <NavigationBar />
      <HeroSection/>
      <CookieContent/>
      <Footer className="bg-deepBlue"/>
    </div>
  );
}

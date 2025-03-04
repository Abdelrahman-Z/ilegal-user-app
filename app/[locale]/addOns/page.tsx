'use client'

import AddOnsContent from "@/components/commercial-app/add-ons/AddOnsContent";
import HeroSection from "@/components/commercial-app/add-ons/HeroSection";
import Footer from "@/components/commercial-app/UI/Footer";
import NavigationBar from "@/components/commercial-app/UI/Navbar";

export default function AddOnsPage() {
  return (
    <div className="relative">
      <NavigationBar />
      <HeroSection />
      <AddOnsContent />
      <Footer className="bg-deepBlue"/>
    </div>
  );
}
 
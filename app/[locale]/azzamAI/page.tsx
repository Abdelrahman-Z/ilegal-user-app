'use client'

import NavigationBar from "@/components/commercial-app/UI/Navbar";
import Footer from "@/components/commercial-app/UI/Footer";
import AzzamAIContent from "@/components/commercial-app/azzamAI/AzzamAIContent";
import HeroSection from "@/components/commercial-app/azzamAI/HeroSection";

export default function AzzamAIPage() {
  return (
    <div className="relative">
      <NavigationBar />
      <HeroSection />
      <AzzamAIContent />
      <Footer className="bg-deepBlue"/>
    </div>
  );
}

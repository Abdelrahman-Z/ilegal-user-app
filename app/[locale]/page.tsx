'use client'

import NavigationBar from "@/components/commercial-app/UI/Navbar";
import HeroSection from "@/components/commercial-app/home/HeroSection";
import FeaturesSection from "@/components/commercial-app/home/FeaturesSection";
import ToolsSection from "@/components/commercial-app/home/ToolsSection";
import NewsSection from "@/components/commercial-app/home/NewsSection";
import Footer from "@/components/commercial-app/UI/Footer";

export default function Home() {
  return (
    <div className="relative">
      <NavigationBar />
      <HeroSection />
      <FeaturesSection />
      <ToolsSection />
      <NewsSection />
      <Footer className="bg-deepBlue"/>
    </div>
  );
}

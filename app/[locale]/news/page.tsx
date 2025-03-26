'use client'

import NewsContent from "@/components/commercial-app/news/NewsContent";
import HeroSection from "@/components/commercial-app/news/HeroSection";
import Footer from "@/components/commercial-app/UI/Footer";
import NavigationBar from "@/components/commercial-app/UI/Navbar";

export default function NewsPage() {
  return (
    <div className="relative h-screen">
      <NavigationBar />
      <HeroSection />
      <NewsContent />
      <Footer className="bg-deepBlue absolute bottom-0 left-0 w-full"/>
    </div>
  );
}

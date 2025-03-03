'use client'

import HeroSection from "@/components/commercial-app/aboutUs/HeroSection";
import NavigationBar from "@/components/commercial-app/UI/Navbar";
import TheMissionSection from "@/components/commercial-app/aboutUs/TheMissionSection";
import OurValues from "@/components/commercial-app/aboutUs/OurValues";
import UnderstandIlegal from "@/components/commercial-app/aboutUs/UnderstandIlegal";
import OurTeam from "@/components/commercial-app/aboutUs/OurTeam";
import Footer from "@/components/commercial-app/UI/Footer";

export default function AboutUs() {
  return (
    <div className="relative">
      <NavigationBar />
      <HeroSection />
      <TheMissionSection />
      <OurValues />
      <UnderstandIlegal />
      <OurTeam />
      <Footer className=" bg-deepBlue"/>
    </div>
  );
}

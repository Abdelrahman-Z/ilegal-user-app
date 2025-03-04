'use client'

import NavigationBar from "@/components/commercial-app/UI/Navbar";
import Footer from "@/components/commercial-app/UI/Footer";
import HeroSection from "@/components/commercial-app/document-automation/HeroSection";
import DocumentAutomationContent from "@/components/commercial-app/document-automation/DocumentAutomationContent";
import BilingualTemplateSection from "@/components/commercial-app/document-automation/BilingualTemplateSection";

export default function DocumentAutomationPage() {
  return (
    <div className="relative">
      <NavigationBar />
      <HeroSection />
      <BilingualTemplateSection />
      <DocumentAutomationContent />
      <Footer className="bg-deepBlue"/>
    </div>
  );
}

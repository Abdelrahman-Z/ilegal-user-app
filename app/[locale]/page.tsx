'use client'
import AboutUsSection from "@/components/commercial-app/AboutUsSection";
import Footer from "@/components/commercial-app/Footer";
import HeroCard from "@/components/commercial-app/HeroCard";
import ServicesSection from "@/components/commercial-app/OurServicesSection";
import StayUpdatedSection from "@/components/commercial-app/StayUpdatedSection";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home.hero");

  return (
    <>
      <HeroCard
        centerd
        loginButtton
        heroDescription={t("description")}
        heroTitle={t("title")}
        imagePath="'/images/landing1.svg'"
      />
      <AboutUsSection/>
      <ServicesSection/>
      <StayUpdatedSection/>
      <Footer className="bg-gradient-to-r from-deepBlue to-lightBlue" />
    </>
  );
}

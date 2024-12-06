import AboutUsSection from "@/components/commercial-app/AboutUsSection";
import Footer from "@/components/commercial-app/Footer";
import HeroCard from "@/components/commercial-app/HeroCard";
import ServicesSection from "@/components/commercial-app/OurServicesSection";
import StayUpdatedSection from "@/components/commercial-app/StayUpdatedSection";

export default function Home() {
  return (
    <div className="">
      <HeroCard
        centerd
        loginButtton
        heroDescription="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s."
        heroTitle="Build Your Own Digital Organization"
        imagePath="'/images/landing1.svg'"
      />
      <AboutUsSection/>
      <ServicesSection/>
      <StayUpdatedSection/>
      <Footer/>
    </div>
  );
}

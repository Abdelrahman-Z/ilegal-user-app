
import MoreAboutUS from "@/components/commercial-app/aboutUs/MoreAboutUS";
import OverviewSection from "@/components/commercial-app/aboutUs/Overview";
import Footer from "@/components/commercial-app/Footer";
import HeroCard from "@/components/commercial-app/HeroCard";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("about.hero");

  return (
    <>
      <HeroCard
        heroDescription={t("description")}
        heroTitle={t("title")}
        imagePath="'/images/landing2.svg'"
      />
      <OverviewSection />
      <MoreAboutUS/>
      <OverviewSection />
      <Footer className="bg-gradient-to-r from-deepBlue to-lightBlue" />
    </>
  );
}

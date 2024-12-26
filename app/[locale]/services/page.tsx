import Footer from "@/components/commercial-app/Footer";
import HeroCard from "@/components/commercial-app/HeroCard";
import OurServices from "@/components/commercial-app/services/OurServices";
import { useTranslations } from "next-intl";


export default function Home() {
  const t = useTranslations("services.hero");

  return (
    <>
      <HeroCard
        heroDescription={t("description")}
        heroTitle={t("title")}
        imagePath="'/images/landing5.svg'"
      />
      <OurServices/>
      <Footer className="bg-gradient-to-r from-deepBlue to-lightBlue" />
    </>
  );
}

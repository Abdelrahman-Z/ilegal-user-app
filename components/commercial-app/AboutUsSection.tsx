import React from "react";
import SectionTitle from "./SectionTitle";
import { Button, Divider } from "@heroui/react";
import { useTranslations } from "next-intl";

const AboutUsSection = () => {
  const t = useTranslations("home.aboutUs");

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center w-full p-8 gap-4">
      {/* Left Image Placeholder */}
      <div className="sm:w-1/2 w-full flex justify-center">
        <div className="bg-gray-300 w-80 h-48 rounded-md">
          <img
            src="/images/landing1-aboutus.svg"
            alt="About Us"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
      <Divider
        className="bg-deepBlue h-60 hidden sm:block"
        orientation="vertical"
      />
      {/* Right Content */}
      <div className="sm:w-1/2 w-full">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <SectionTitle title={t("title")} titleStyle="text-deepBlue" dotStyle="bg-deepBlue" lineStyle="bg-deepBlue"/>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">{t("description1")}</p>
        <p className="text-gray-700 mb-6">{t("description2")}</p>

        {/* Learn More Button */}
        <Button className="bg-deepBlue text-white py-2 px-6 rounded-md hover:bg-gray-800">
          {t("learnMore")}
        </Button>
      </div>
    </div>
  );
};

export default AboutUsSection;

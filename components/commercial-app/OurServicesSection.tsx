import React from "react";
import SectionTitle from "./SectionTitle";
import { Divider } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const ServicesSection = () => {
  const t = useTranslations("home.services");

  const services = [
    {
      title: t("items.documentCreation.title"),
      description: t("items.documentCreation.description"),
    },
    {
      title: t("items.documentReview.title"),
      description: t("items.documentReview.description"),
    },
    {
      title: t("items.documentTranslation.title"),
      description: t("items.documentTranslation.description"),
    },
    {
      title: t("items.documentValidation.title"),
      description: t("items.documentValidation.description"),
    },
    {
      title: t("items.documentExtraction.title"),
      description: t("items.documentExtraction.description"),
    },
    {
      title: t("items.documentArchiving.title"),
      description: t("items.documentArchiving.description"),
    },
  ];

  return (
    <div className="p-8 sm:flex gap-10">
      {/* Header */}
        <Divider orientation="vertical" className=" h- bg-[#A5A3A3]  w-1 hidden sm:block" />
      <div>
        <div className="flex items-center justify-center mb-8">
          <SectionTitle title={t("title")} />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#555] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              {/* Placeholder Image */}
              <div className="bg-gray-300 w-20 h-24 rounded-md mb-4 mx-auto"></div>

              {/* Service Title */}
              <h3 className="text-lg font-bold mb-2 text-white">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-white text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
            {t("learnMore")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;

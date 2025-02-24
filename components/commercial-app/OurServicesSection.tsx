import React from "react";
import SectionTitle from "./SectionTitle";
import { Button, Divider } from "@heroui/react";
import { useTranslations } from "next-intl";
import { RiOrganizationChart } from "react-icons/ri";
import { IoDocumentsOutline } from "react-icons/io5";
import { VscCodeOss } from "react-icons/vsc";
import { MdOutlineSummarize } from "react-icons/md";
import { BsTranslate } from "react-icons/bs";

const ServicesSection = () => {
  const t = useTranslations("home.services");

  const services = [
    {
      title: t("items.documentCreation.title"),
      description: t("items.documentCreation.description"),
      icon: <RiOrganizationChart size={40} color="white" />,
    },
    {
      title: t("items.documentReview.title"),
      description: t("items.documentReview.description"),
      icon: <IoDocumentsOutline  size={40} color="white" />,
    },
    {
      title: t("items.documentTranslation.title"),
      description: t("items.documentTranslation.description"),
      icon: <VscCodeOss  size={40} color="white" />,
    },
    {
      title: t("items.documentValidation.title"),
      description: t("items.documentValidation.description"),
      icon: <MdOutlineSummarize  size={40} color="white" />,
    },
    {
      title: t("items.documentExtraction.title"),
      description: t("items.documentExtraction.description"),
      icon: <BsTranslate  size={40} color="white" />,
    },
    {
      title: t("items.documentArchiving.title"),
      description: t("items.documentArchiving.description"),
      icon: <RiOrganizationChart size={40} color="white" />,
    },
  ];

  return (
    <div className="p-8 sm:flex gap-10">
      {/* Header */}
      <Divider
        orientation="vertical"
        className=" h- bg-[#A5A3A3]  w-1 hidden sm:block"
      />
      <div>
        <div className="flex items-center justify-center mb-8">
          <SectionTitle
            titleStyle="text-deepBlue"
            dotStyle="bg-deepBlue"
            lineStyle="bg-deepBlue"
            title={t("title")}
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-deepBlue p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              {/* Placeholder Image */}
              <div className="bg-fuschia_maked w-20 h-24 rounded-md mb-4 mx-auto flex items-center justify-center">
                {service.icon}
              </div>

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
          <Button className="bg-deepBlue text-white py-2 px-6 rounded-md hover:bg-gray-800">
            {t("learnMore")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;

import React from "react";
import SectionTitle from "./SectionTitle";
import { Button, Divider, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const StayUpdatedSection = () => {
  const t = useTranslations("home.stayUpdated");

  return (
    <div className="flex items-center flex-wrap sm:flex-nowrap w-full p-8 gap-8">
      {/* Left Image Placeholder */}
      <div className="sm:w-1/2 w-full flex justify-center">
        <div className="bg-gray-300 w-80 h-48 rounded-md"></div>
      </div>
      <Divider orientation="vertical" className="h-80 hidden sm:block" />

      {/* Right Content */}
      <div className="sm:w-1/2 w-full">
        {/* Header */}
        <SectionTitle title={t("title")} />

        {/* Description */}
        <p className="text-gray-700 mb-4 text-2xl">{t("description1")}</p>
        <p className="text-gray-700 mb-6 text-2xl">{t("description2")}</p>

        {/* Subscription Form */}
        <div className="flex flex-col w-full gap-4 mb-4">
          <Input
            type="email"
            placeholder={t("emailPlaceholder")}
            className="w-full sm:w-full flex-grow p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
          />
          <Button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
            {t("sendButton")}
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-gray-500 text-xs">{t("disclaimer")}</p>
      </div>
    </div>
  );
};

export default StayUpdatedSection;

"use client";

import React from "react";
import SectionTitle from "../SectionTitle";
import { useTranslations } from "next-intl";

const OurServices = () => {
  const t = useTranslations("services.ourServices");

  // List of item keys
  const serviceKeys = ["item-1", "item-2", "item-3", "item-4", "item-5", "item-6"];

  return (
    <div className="bg-gray-100 py-12 px-6 space-y-16">
      {/* Header */}
      <SectionTitle title={t('title')} className="mx-auto" />

      {/* Services Rows */}
      {serviceKeys.map((key, index) => (
        <div
          key={key}
          className={`flex flex-col sm:px-48 border-b-1 border-black pb-16 border-transparent ${
            index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
          } items-center gap-8`}
        >
          {/* Image Section */}
          <div className="sm:w-1/2 w-full">
            <div
              className="bg-gray-300 w-full h-64 rounded-lg items-end justify-center bg-cover bg-center hidden sm:flex"
              style={{ backgroundImage: `url('/images/servicesImage.svg')` }}
            >
              <p className="bg-black/50 text-white text-sm py-2 px-4 rounded-b-lg">
                {t(`items.${key}.title`)}
              </p>
            </div>
          </div>

          {/* Text Section */}
          <div className="sm:w-3/4 w-full text-center sm:text-left">
            <p className="text-gray-800 mb-4 w-full">{t(`items.${key}.description`)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurServices;

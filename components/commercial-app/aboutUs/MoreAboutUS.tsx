'use client';

import { cn } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";

const MoreAboutUS = () => {
  const { locale } = useParams();
  const t = useTranslations("about.moreAboutUs");

  return (
    <div className="bg-gray-100 py-12 px-6 space-y-12 mx-16">
      {/* First Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {/* Text Section */}
        <div className="sm:w-1/2 text-center sm:text-left">
          <p className="text-gray-800 mb-4">{t("row1.text")}</p>
          <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
            {t("row1.buttonText")}
          </button>
        </div>

        {/* Image Section */}
        <div
          className={cn(
            "sm:w-1/2 hidden sm:block sm:-mr-16"
          )}
        >
          <div className="bg-gray-400 w-full h-48 rounded-lg"></div>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-6">
        {/* Text Section */}
        <div className="sm:w-1/2 text-center sm:text-left">
          <p className="text-gray-800 mb-4">{t("row2.text")}</p>
          <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
            {t("row2.buttonText")}
          </button>
        </div>

        {/* Image Section */}
        <div
          className={cn(
            "sm:w-1/2 hidden sm:block sm:-ml-16",
          )}
        >
          <div className="bg-gray-400 w-full h-48 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default MoreAboutUS;

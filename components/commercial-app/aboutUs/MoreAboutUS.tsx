"use client";

import { Button, cn } from "@nextui-org/react";
import React from "react";
import { useTranslations } from "next-intl";

const MoreAboutUS = () => {
  const t = useTranslations("about.moreAboutUs");

  return (
    <div className="bg-gradient-to-b from-deepBlue to-lightBlue py-12 px-6 space-y-12 mx-16 rounded-md">
      {/* First Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {/* Text Section */}
        <div className="sm:w-1/2 text-center sm:text-left">
          <p className="text-white mb-4">{t("row1.text")}</p>
          <Button className="bg-fuschia_maked text-white py-2 px-6 rounded-md hover:bg-gray-800">
            {t("row1.buttonText")}
          </Button>
        </div>

        {/* Image Section */}
        <div className={cn("sm:w-1/2 hidden sm:block sm:-mr-16")}>
          <div className=" w-full h-48 rounded-lg">
            <img
              src="/images/landing2-1.svg"
              alt="landing2"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-6">
        {/* Text Section */}
        <div className="sm:w-1/2 text-center sm:text-left">
          <p className="text-white mb-4">{t("row2.text")}</p>
          <Button className="bg-fuschia_maked text-white py-2 px-6 rounded-md hover:bg-gray-800">
            {t("row2.buttonText")}
          </Button>
        </div>

        {/* Image Section */}
        <div className={cn("sm:w-1/2 hidden sm:block sm:-ml-16")}>
          <div className=" w-full h-48 rounded-lg">
            <img
              src="/images/landing2-2.svg"
              alt="landing2"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreAboutUS;

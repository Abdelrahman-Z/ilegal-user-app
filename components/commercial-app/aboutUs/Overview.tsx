import React from "react";
import SectionTitle from "../SectionTitle";
import { useTranslations } from "next-intl";

const OverviewSection = () => {
  const t = useTranslations("about.overview");

  return (
    <div className="flex flex-col items-center justify-center w-full p-8">
      <div className="border border-solid border-black border-y-transparent px-5">
        <div className="flex w-full items-center justify-center">
          {/* Header */}
          <SectionTitle title={t("title")} titleStyle='text-deepBlue' dotStyle='bg-deepBlue' lineStyle='bg-deepBlue' />
        </div>

        {/* Content */}
        <div className="mt-6 max-w-3xl text-center text-gray-700">
          <p className="mb-4">{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;

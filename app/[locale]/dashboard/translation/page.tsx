"use client";

import { TranslateFile } from "@/components/dashboard/translation/TranslateFile";
import { Static } from "@/components/dashboard/translation/TranslateText";
import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { useTranslations } from "next-intl";


// Yu with stricter string validati

const DashboardPage = () => {
  const t = useTranslations("translation");

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto overflow-auto flex-grow flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{t("name")}</h2>
      </div>
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
      <div className="flex flex-col items-center flex-1">
        <Tabs
          color="primary"
          defaultSelectedKey={"static"}
          aria-label="Dashboard Tabs"
        >
          <Tab key="static" className="w-full flex-1" title={t("titles.text")}>
            <Static />
          </Tab>
          <Tab className="w-full flex-1" key="dynamic" title={t("titles.file")}>
            <TranslateFile />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;

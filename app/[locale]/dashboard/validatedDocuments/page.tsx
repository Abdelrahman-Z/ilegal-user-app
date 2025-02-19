"use client";

import { AddValidatedDocument } from "@/components/dashboard/validatedDocuments/AddValidatedDocument";
import { Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations("validatedDocuments");
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto flex-grow h-fit min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{t("name")}</h2>
        <div className="flex gap-4">
          <AddValidatedDocument />
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
      {/* Documents List */}
      <div className="flex flex-col items-center flex-1">
        <Tabs
          color="primary"
          defaultSelectedKey={"allValidatedDocuments"}
          aria-label="Dashboard Tabs"
        >
          {/* All Validated Documents */}
          <Tab className="w-full flex-1" key="allValidatedDocuments" title={t("allValidatedDocuments.name")}>
          </Tab>

          {/* Add Validated Document */}
          <Tab className="w-full flex-1" key="addValidatedDocument" title={t("addValidatedDocument.title")}>
          </Tab>

          {/* Delete Validated Document */}
          <Tab className="w-full flex-1" key="deleteValidatedDocument" title={t("deleteValidatedDocument.title")}>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

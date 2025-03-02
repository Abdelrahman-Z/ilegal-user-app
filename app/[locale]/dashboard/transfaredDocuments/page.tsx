"use client";

import { AddTransfaredDocument } from "@/components/dashboard/transfaredDocuments/AddTransfaredDocument";
import { AllTransfaredDocuments } from "@/components/dashboard/transfaredDocuments/AllTransfaredDocuments";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("transfaredDocuments");
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto flex-grow h-fit min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{t("name")}</h2>
        <div className="flex gap-4">
          <AddTransfaredDocument />
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
      {/* Documents List */}
      <div className="flex flex-col items-center flex-1">
        <AllTransfaredDocuments />
      </div>
    </div>
  );
}

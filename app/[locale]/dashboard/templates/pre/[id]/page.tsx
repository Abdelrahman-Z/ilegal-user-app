"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetPreConfiguredOneTemplatesQuery } from "@/redux/services/api";
import { useTranslations } from "next-intl";


const Page = () => {
    const t = useTranslations("templates");
  
  const { id } = useParams();
  const { data, error, isLoading } = useGetPreConfiguredOneTemplatesQuery(id?.toString() ?? "");

  if (!id) {
    return <div>{t("error1")}</div>;
  }


  if (isLoading) return <div>{t("loading")}</div>;
  if (error) return <div> {t("error2")} {JSON.stringify(error)}</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg mx-auto p-6 min-h-full h-fit w-full">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
        </div>
        <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
        <div className="text-gray-700 text-base leading-relaxed space-y-4">
          <div
            className="text-gray-700 text-base leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: data.attachmentFileUrl }}
          />
        </div>
      </div>
    </div>
  );
};
export default Page;

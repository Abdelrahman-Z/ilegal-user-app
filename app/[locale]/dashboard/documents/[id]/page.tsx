"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetDocumentQuery } from "@/redux/services/api";
import { ViewDocument } from "@/components/dashboard/documents/ViewDocument";
import { DocumentEditor } from "@/components/dashboard/documents/DocumentEditor";
import { Spinner } from "@heroui/react";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("templates");

  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: documentData,
    error: documentError,
    isLoading: documentLoading,
  } = useGetDocumentQuery(id);

  if (!id) {
    return <div>Error: Invalid or missing UUID.</div>;
  }
  if (documentLoading) return (
    <div className="flex items-center justify-center h-full w-full bg-white ">
      <Spinner size="lg" label={t('loading')} color="primary"/>
    </div>
  );
  if (documentError)
    return <div>Error loading Document: {JSON.stringify(documentError)}</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg mx-auto p-6 w-full flex-1">
      {!isEditing ? (
        <ViewDocument
          documentData={documentData}
          documentLoading={documentLoading}
          documentError={documentError}
          handleEdit={() => setIsEditing(true)}
          isValidated={documentData.isValidated}
        />
      ) : (
          <DocumentEditor
            documentId={id as string}
            documentContent={documentData?.DocumentMetadata[0]?.content}
            onEditingChange={setIsEditing}
          />
      )}
    </div>
  );
};

export default Page;
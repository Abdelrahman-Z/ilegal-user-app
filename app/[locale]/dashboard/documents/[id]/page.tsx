"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetDocumentQuery } from "@/redux/services/api";
import { ViewDocument } from "@/components/dashboard/documents/ViewDocument";
import { DocumentEditor } from "@/components/dashboard/documents/DocumentEditor";
import { TranslationForm } from "@/components/dashboard/documents/TranslationForm";
import { DecoupledEditor } from "ckeditor5";

const Page = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editorInstance, setEditorInstance] = useState<DecoupledEditor | null>(null);

  const {
    data: documentData,
    error: documentError,
    isLoading: documentLoading,
  } = useGetDocumentQuery(id);

  if (!id) {
    return <div>Error: Invalid or missing UUID.</div>;
  }
  if (documentLoading) return <div>Loading...</div>;
  if (documentError)
    return <div>Error loading Document: {JSON.stringify(documentError)}</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg mx-auto p-6 min-h-full h-fit w-full">
      {!isEditing ? (
        <ViewDocument
          documentData={documentData}
          documentLoading={documentLoading}
          documentError={documentError}
          handleEdit={() => setIsEditing(true)}
        />
      ) : (
        <div className="flex">
          <TranslationForm
            editorInstance={editorInstance}
          />
          <DocumentEditor
            editorInstance={editorInstance}
            documentId={id as string}
            setEditorInstance={setEditorInstance}
            documentContent={documentData?.DocumentMetadata[0]?.content}
            onEditingChange={setIsEditing}
          />
        </div>
      )}
    </div>
  );
};

export default Page;

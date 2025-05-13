"use client";
import { Button, Spinner } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TiptapEditor } from "@/components/dashboard/editor/Editor";
import {
  useGetDocumentQuery,
  useGetSignDocumentsQuery,
  useUpdateDocumentMutation,
} from "@/redux/services/api";
import toast from "react-hot-toast";
import { ViewDocument } from "@/components/dashboard/documents/ViewDocument";
import { useTranslations } from "next-intl";
import { useTipTapEditor } from "@/components/dashboard/editor/config";


const Page = () => {
  const t = useTranslations("templates");

  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const editor = useTipTapEditor();

  const {
    data: documentData,
    error: documentError,
    isLoading: documentLoading,
  } = useGetDocumentQuery(id);


  useEffect(() => {
    if (editor && documentData) {
      editor.commands.setContent(documentData?.DocumentMetadata?.[0]?.content)
    }
  }, [documentData , editor])
  
  const [updateDocument] =
    useUpdateDocumentMutation();

  const handleSave = async () => {
    if (editor) {
      const updatedContent = editor.getHTML();
      if (!updatedContent.trim()) {
        toast.error(
          "The document is empty. Please add some content before saving."
        );
        return;
      }
      try {
        const response = await updateDocument({
          id: documentData.id,
          body: { content: updatedContent },
        }).unwrap();
        console.log(response);
        toast.success("Document Updated successfully!");
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(errorMessage);
      }
    }
    setIsEditing(false);
  };

  if (!id) return <div>Error: Invalid or missing UUID.</div>;
  if (documentLoading)
    return (
      <div className="flex items-center justify-center h-full w-full bg-white ">
        <Spinner size="lg" label={t("loading")} color="primary" />
      </div>
    );
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
        <div className="mb-4">
          <div className="flex justify-end mb-4 gap-2">
            <Button
              className="bg-gradient-to-r from-deepBlue to-lightBlue text-white py-2 px-4 rounded-lg shadow"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>

          <div className="flex">
            {/* Document Editor */}
            <div className="w-full">
              <TiptapEditor editor={editor} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

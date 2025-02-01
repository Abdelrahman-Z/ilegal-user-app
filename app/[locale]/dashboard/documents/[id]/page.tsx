"use client";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Editor } from "../../../../../components/dashboard/editor/Editor";
import {
  useGetDocumentQuery,
  useUpdateDocumentMutation,
} from "@/redux/services/api";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";
import { DecoupledEditor } from "ckeditor5";

const Page = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState<string>("");
  const [editorInstance, setEditorInstance] = useState<DecoupledEditor | null>(null);

  const [
    updateDocument,
    { isSuccess: DocumentUpdated, error: UpdateDocumentError },
  ] = useUpdateDocumentMutation();

  const {
    data: documentData,
    error: documentError,
    isLoading: documentLoading,
  } = useGetDocumentQuery(id);

  useEffect(() => {
    if (UpdateDocumentError && isFetchBaseQueryError(UpdateDocumentError)) {
      const errorMessage =
      UpdateDocumentError.data &&
      typeof UpdateDocumentError.data === "object" &&
      "message" in UpdateDocumentError.data
      ? (UpdateDocumentError.data as { message: string }).message
      : "An error occurred while deleting the document.";
      toast.error(errorMessage);
    }
  }, [UpdateDocumentError]);
  
  useEffect(() => {
    if (DocumentUpdated) {
      toast.success("Document Updated successfully!");
    }
  }, [DocumentUpdated]);


  const handleEdit = () => {
    setEditorContent(documentData?.DocumentMetadata?.length ? documentData.DocumentMetadata[0].content : " ");
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (editorInstance) {
      const updatedContent = editorInstance.getData();
      updateDocument({
        id: documentData.id,
        body: {content: updatedContent},
      });
    }
    setIsEditing(false);
  };
  
  if (!id) {
    return <div>Error: Invalid or missing UUID.</div>;
  }
  if (documentLoading) return <div>Loading...</div>;
  if (documentError) return <div>Error loading Document: {JSON.stringify(documentError)}</div>;
  
  return (
    <div className="bg-white shadow-lg rounded-lg mx-auto p-6 min-h-full h-fit w-full">
      {!isEditing ? (
        <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {documentData.name}
          </h2>
          <Button
            className="bg-gradient-to-r from-deepRed to-brightRed  text-white py-2 px-4 rounded-lg shadow"
            onClick={handleEdit}
          >
            Edit Document
          </Button>
        </div>
        <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
        <div className="text-gray-700 text-base leading-relaxed space-y-4">
          <div className="text-gray-700 text-base leading-relaxed space-y-4">
            {documentData?.DocumentMetadata?.[0]?.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: documentData.DocumentMetadata[0].content,
                }}
              />
            ) : (
              <p>No content available</p>
            )}
          </div>
        </div>
      </div>
      ) : (
        <div>
          <Editor setEditor={setEditorInstance} data={editorContent} />
          <div className="flex justify-end mt-4">
            <Button
              className="bg-gradient-to-r from-deepBlue to-lightBlue text-white py-2 px-4 rounded-lg shadow"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              className="ml-2 bg-gray-400 text-white py-2 px-4 rounded-lg shadow"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;

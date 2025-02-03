"use client";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Editor } from "../../../../../components/dashboard/editor/Editor";

import {
  useGetTemplateQuery,
  useUpdateTemplateMutation,
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
    updateTemplate,
    { isSuccess: templateUpdated, error: UpdateTemplateError },
  ] = useUpdateTemplateMutation();
  const { data, error, isLoading } = useGetTemplateQuery(id?.toString());
  
  const handleEdit = () => {
    setEditorContent(data.attachmentUrl || "");
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (editorInstance) {
      const updatedContent = editorInstance.getData();
      updateTemplate({
        id: data.id.toString(),
        body: { attachmentUrl: updatedContent },
      });
    }
    setIsEditing(false);
  };
  // Handle error toast
  useEffect(() => {
    if (UpdateTemplateError && isFetchBaseQueryError(UpdateTemplateError)) {
      const errorMessage =
      UpdateTemplateError.data &&
        typeof UpdateTemplateError.data === "object" &&
        "message" in UpdateTemplateError.data
          ? (UpdateTemplateError.data as { message: string }).message
          : "An error occurred while deleting the template.";
      toast.error(errorMessage);
    }
  }, [UpdateTemplateError]);
  
  useEffect(() => {
    if (templateUpdated) {
      toast.success("Template Updated successfully!");
    }
  }, [templateUpdated]);
  
  if (!id) {
    return <div>Error: Invalid or missing UUID.</div>;
  }
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading template: {JSON.stringify(error)}</div>;
  
  return (
    <div className="bg-white shadow-lg rounded-lg mx-auto p-6 min-h-full h-fit w-full">
      {!isEditing ? (
        <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {data.name}
            </h2>
            <Button
              className="bg-gradient-to-r from-deepRed to-brightRed  text-white py-2 px-4 rounded-lg shadow"
              onClick={handleEdit}
            >
              Edit Template
            </Button>
          </div>
          <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
          <div className="text-gray-700 text-base leading-relaxed space-y-4">
            <div className="text-gray-700 text-base leading-relaxed space-y-4">
              <div
                dangerouslySetInnerHTML={{ __html: data.attachmentUrl }}
              ></div>
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

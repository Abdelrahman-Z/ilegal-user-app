"use client"
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Editor } from "../../../../../components/dashboard/editor/Editor";
import { useGetTemplateQuery, 
          useGetPreConfiguredOneTemplatesQuery,
          useUpdateTemplateMutation, } from "@/redux/services/api";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";
// import { useRouter } from "next/router";
// type Props = {};


const Page = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const pre = searchParams.get("pre");
  const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit mode
  const [editorContent, setEditorContent] = useState<string>(""); // Store editor content
  const [editorInstance, setEditorInstance] = useState<any>(null); // Store CKEditor instance
  const [updateTemplate, { isSuccess:templateUpdated, error:UpdateTemplateError }] = useUpdateTemplateMutation();

  const handleEdit = () => {
    setEditorContent(data.attachmentUrl || ""); // Initialize editor content
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editorInstance) {
      const updatedContent = editorInstance.getData();
      console.log("Updated content:", updatedContent);

      updateTemplate({
        id: data.id.toString(),
        body: {attachmentUrl: updatedContent},
      });
    }
    setIsEditing(false);
  };
 // Handle error toast
 useEffect(() => {
  if (UpdateTemplateError && isFetchBaseQueryError(UpdateTemplateError)) {
    const errorMessage =
      UpdateTemplateError.data && typeof UpdateTemplateError.data === "object" && "message" in UpdateTemplateError.data
        ? (UpdateTemplateError.data as { message: string }).message
        : "An error occurred while deleting the template.";
    toast.error(errorMessage);
  }
}, [UpdateTemplateError]);

useEffect(() => {
  if (templateUpdated) {
    toast.success("Template Deleted successfully!");
  }
  
}, [templateUpdated]);
  if (!id) {
    return <div>Error: Invalid or missing UUID.</div>;
  }

  const {
    data: templateData,
    error: templateError,
    isLoading: isTemplateLoading,
  } = useGetTemplateQuery(id.toString());

  const {
    data: preConfiguredData,
    error: preConfiguredError,
    isLoading: isPreConfiguredLoading,
  } = useGetPreConfiguredOneTemplatesQuery(id.toString());

  // Determine which data to use
  const data = pre == "true" ? preConfiguredData : templateData;
  const error = pre == "true" ? preConfiguredError : templateError;
  const isLoading = pre == "true"  ? isPreConfiguredLoading : isTemplateLoading;
  
    console.log(data);
    console.log(id);
    console.log(pre);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading template: {JSON.stringify(error)}</div>;
  
  return (
    <div className="bg-white shadow-lg rounded-lg mx-auto p-6 min-h-full h-fit w-full">
    {!isEditing ? (
      <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
        {pre == "false" && (
        <Button className="bg-gradient-to-r from-deepRed to-brightRed  text-white py-2 px-4 rounded-lg shadow"
        onClick={handleEdit}>
          Edit Template
        </Button>
        )}
      </div>
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
      <div className="text-gray-700 text-base leading-relaxed space-y-4">
        {data.attachmentFileUrl && (
      <div className="text-gray-700 text-base leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: data.attachmentFileUrl }}
        />
      )}
      {data.attachmentUrl && (
        <div className="text-gray-700 text-base leading-relaxed space-y-4">
        <div dangerouslySetInnerHTML={{ __html: data.attachmentUrl }}>
        </div>
        </div>
      )}
      </div>
      </div>):(
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
      //   <ParentComponent
      //   initialContent={editedContent}
      //   title={`Editing: ${data.name}`}
      //   onSave={handleSave}
      // />

      )

}

      {/* Content */}
      {/* <div className="text-gray-700 text-base leading-relaxed space-y-4">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <p>
          Ipsum passages, and more recently with desktop publishing software
          like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div> */}

export default Page;
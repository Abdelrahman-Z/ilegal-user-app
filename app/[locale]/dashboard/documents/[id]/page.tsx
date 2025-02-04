"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Editor } from "@/components/dashboard/editor/Editor";
import {
  useGetDocumentQuery,
  useUpdateDocumentMutation,
} from "@/redux/services/api";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";
import { DecoupledEditor } from "ckeditor5";
import { ViewDocument } from "@/components/dashboard/documents/ViewDocument";

const Page = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState<string>("");
  const [editorInstance, setEditorInstance] = useState<DecoupledEditor | null>(
    null
  );
  const [tokens, setTokens] = useState<string[]>([]);
  const [replacements, setReplacements] = useState<{ [key: string]: string }>({});


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
  useEffect(() => {
    if (editorInstance) {
      const content = editorInstance.getData();
      const tokenMatches = content.match(/{{(.*?)}}/g);
      if (tokenMatches) {
        const uniqueTokens = [...new Set(tokenMatches.map(t => t.replace(/{{|}}/g, "")))];
        setTokens(uniqueTokens);

        const initialReplacements: { [key: string]: string } = {};
        uniqueTokens.forEach(token => (initialReplacements[token] = ""));
        setReplacements(initialReplacements);
      }
    }
  }, [editorInstance]);

  const handleInputChange = (token: string, value: string) => {
    setReplacements((prev) => ({ ...prev, [token]: value }));
  };

  const translate = () => {
    if (editorInstance) {
      let content = editorInstance.getData();

      tokens.forEach((token) => {
        if (replacements[token]?.trim()) { // Only replace filled inputs
          const placeholder = new RegExp(`{{${token}}}`, "g");
          content = content.replace(placeholder, replacements[token]);
        }
      });
      editorInstance.setData(content);

      setReplacements((prev) => {
        const clearedReplacements = { ...prev };
        tokens.forEach(token => clearedReplacements[token] = "");
        return clearedReplacements;
      });
    }
  };

  const handleEdit = () => {
    setEditorContent(
      documentData?.DocumentMetadata?.length
        ? documentData.DocumentMetadata[0].content
        : " "
    );
    setIsEditing(true);
  };

  const handleSave = () => {
    translate();
    if (editorInstance) {
      const updatedContent = editorInstance.getData();
      updateDocument({
        id: documentData.id,
        body: { content: updatedContent },
      });
    }
    setIsEditing(false);
  };

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
        handleEdit={handleEdit}
      />
      ) : (
        <div className="flex mb-4">
          <form id="createTemplateForm" className="flex flex-col m-5">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Translate Tokens
            </label>
            <div className="justify-center flex flex-col">
            {tokens.map((token) => (
          <div key={token} className="items-center gap-2 mb-2">
            <label>{token}:</label>
            <Input
              type="text"
              value={replacements[token]}
              onChange={(e) => handleInputChange(token, e.target.value)}
              placeholder={`Replace ${token}`}
            />
          </div>
        ))}
              <Button
                onClick={translate}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow"
              >
                Translate
              </Button>
            </div>
            <div className="flex justify-center mt-4 gap-2">
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
          </form>

          <div className="flex flex-col">
            <Editor setEditor={setEditorInstance} data={editorContent} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;

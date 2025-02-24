import { Button } from "@heroui/react";
import { Editor } from "@/components/dashboard/editor/Editor";
import { DecoupledEditor } from "ckeditor5";
import { useUpdateDocumentMutation } from "@/redux/services/api";
import { Dispatch, SetStateAction, useEffect } from "react";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

interface DocumentEditorProps {
  documentId: string;
  setEditorInstance: Dispatch<SetStateAction<DecoupledEditor | null>>;
  documentContent: string;
  onEditingChange: (isEditing: boolean) => void;
  editorInstance: DecoupledEditor | null;
}

export const DocumentEditor = ({
  documentId,
  setEditorInstance,
  documentContent,
  onEditingChange,
  editorInstance
}: DocumentEditorProps) => {
  const [
    updateDocument,
    { error: updateDocumentError },
  ] = useUpdateDocumentMutation();

  useEffect(() => {
    if (updateDocumentError && isFetchBaseQueryError(updateDocumentError)) {
      const errorMessage =
        updateDocumentError.data &&
        typeof updateDocumentError.data === "object" &&
        "message" in updateDocumentError.data
          ? (updateDocumentError.data as { message: string }).message
          : "An error occurred while updating the document.";
      toast.error(errorMessage);
    }
  }, [updateDocumentError]);



  const handleSave = async () => {
    if (editorInstance) {
      const updatedContent = editorInstance?.getData();
      await updateDocument({
        id: documentId,
        body: { content: updatedContent },
      });
      toast.success('Document Updated Successfuly')
      onEditingChange(false);
    }
  };

  return (
    <div className="mb-4 w-full">
      <div className="flex justify-end mb-4 gap-2">
        <Button
          className="bg-gradient-to-r from-deepBlue to-lightBlue text-white py-2 px-4 rounded-lg shadow"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow"
          onClick={() => onEditingChange(false)}
        >
          Cancel
        </Button>
      </div>
      <div className="w-full">
        <Editor setEditor={setEditorInstance} data={documentContent} />
      </div>
    </div>
  );
};

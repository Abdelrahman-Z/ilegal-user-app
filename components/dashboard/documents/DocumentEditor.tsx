import { Button } from "@heroui/react";
import { TiptapEditor } from "@/components/dashboard/editor/Editor";
import { useUpdateDocumentMutation } from "@/redux/services/api";
import { useEffect } from "react";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";
import { useTipTapEditor } from "../editor/config";

interface DocumentEditorProps {
  documentId: string;
  documentContent: string;
  onEditingChange: (isEditing: boolean) => void;
}

export const DocumentEditor = ({
  documentId,
  documentContent,
  onEditingChange,
}: DocumentEditorProps) => {
  const [updateDocument, { error: updateDocumentError }] = useUpdateDocumentMutation();
  const editor = useTipTapEditor(documentContent);

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
    if (editor) {
      try {
        const updatedContent = editor.getHTML();
        await updateDocument({
          id: documentId,
          body: { content: updatedContent },
        });
        toast.success("Document Updated Successfully");
        onEditingChange(false);
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while updating the document.");
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none px-4 py-2">
        <div className="flex justify-end gap-2">
          <Button
            className="bg-gradient-to-r from-deepBlue to-lightBlue text-white py-2 px-4 rounded-lg shadow"
            onPress={handleSave}
          >
            Save
          </Button>
          <Button
            className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow"
            onPress={() => onEditingChange(false)}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <TiptapEditor editor={editor} />
      </div>
    </div>
  );
};

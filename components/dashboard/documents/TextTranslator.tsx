import { Button, Select, SelectItem } from "@nextui-org/react";
import { DecoupledEditor } from "ckeditor5";
import { useState } from "react";
import { useTranslateMutation, useUpdateDocumentMutation } from "@/redux/services/api";
import toast from "react-hot-toast";

interface TextTranslatorProps {
  editorInstance: DecoupledEditor | null;
  defaultLanguage?: string;
}

const languages = [
  { label: "Arabic", value: "ar" },
  { label: "English", value: "en" },
  // Add more languages as needed
];

export const TextTranslator = ({
  editorInstance,
  defaultLanguage, // Default to English if not specified
}: TextTranslatorProps) => {
  const [targetLanguage, setTargetLanguage] = useState("");
  const [translate, { isLoading }] = useTranslateMutation();
  const [
    updateDocument,
  ] = useUpdateDocumentMutation();

  const handleTranslate = async () => {
    if (!editorInstance || !targetLanguage) {
      toast.error("Please select a target language");
      return;
    }

    try {
      const content = editorInstance.getData();
      const response = await translate({
        htmlStrings: content,
        target_lang: targetLanguage,
        original_lang: defaultLanguage === "ARABIC" ? "ar" : "en",
      }).unwrap();

      if (response.text) {
        editorInstance.setData(response.text);
        if (response.target_lang === "ar") {
          const lines = editorInstance.model.document.getRootNames();
          for (const rootName of lines) {
            const root = editorInstance.model.document.getRoot(rootName);
            if (root) {
              editorInstance.model.change((writer) => {
                writer.setSelectionAttribute(
                  "alignment",
                  response.target_lang === "ar" ? "right" : "left"
                );
                writer.setSelection(root, "in");
                editorInstance.execute("alignment", {
                  value: response.target_lang === "ar" ? "right" : "left",
                });
              });
            }
          }
        }
        toast.success("Text translated successfully!");
      }
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Failed to translate text. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Select
        label="Select Target Language"
        placeholder="Choose a language"
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        className="max-w-xs"
      >
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </Select>

      <Button
        className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow"
        onClick={handleTranslate}
        isLoading={isLoading}
        isDisabled={!targetLanguage || isLoading}
      >
        {isLoading ? "Translating..." : "Translate Text"}
      </Button>
    </div>
  );
};

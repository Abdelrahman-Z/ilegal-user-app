import { Button, Select, SelectItem } from "@nextui-org/react";
import { DecoupledEditor } from "ckeditor5";
import { useState } from "react";
import { useTranslateMutation } from "@/redux/services/api";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface TextTranslatorProps {
  editorInstance: DecoupledEditor | null;
}

const languages = [
  { label: "Arabic", value: "ar" },
  { label: "English", value: "en" },
  // Add more languages as needed
];

const schema = yup.object().shape({
  targetLanguage: yup.string().required("Target language is required"),
  defaultLanguage: yup.string().required("Default language is required"),
});

export const TextTranslator = ({ editorInstance }: TextTranslatorProps) => {
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      targetLanguage: "",
      defaultLanguage: "en", // Default to English
    },
  });

  const [translate, { isLoading }] = useTranslateMutation();
  const targetLanguage = watch("targetLanguage");
  const defaultLanguage = watch("defaultLanguage");

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
        original_lang: defaultLanguage === "ar" ? "ar" : "en",
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
        } else {
          const lines = editorInstance.model.document.getRootNames();
          for (const rootName of lines) {
            const root = editorInstance.model.document.getRoot(rootName);
            if (root) {
              editorInstance.model.change((writer) => {
                writer.setSelectionAttribute("alignment", "left");
                writer.setSelection(root, "in");
                editorInstance.execute("alignment", {
                  value: "left",
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
      <Controller
        name="defaultLanguage"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Choose a default language"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            className="max-w-xs"
          >
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <Controller
        name="targetLanguage"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Choose a target language"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            className="max-w-xs"
          >
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <Button
        className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow"
        onClick={handleSubmit(handleTranslate)}
        isLoading={isLoading}
        color="primary"
        isDisabled={!targetLanguage || isLoading}
      >
        {isLoading ? "Translating..." : "Translate Text"}
      </Button>
    </div>
  );
};

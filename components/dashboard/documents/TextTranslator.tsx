import React from "react";
import { Editor } from "@tiptap/react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslateMutation } from "@/redux/services/api";
import { usePathname } from "next/navigation";

// Define available languages
const languages = [
  { label: "Arabic", value: "ar" },
  { label: "English", value: "en" },
  // Add more as needed
];

interface TiptapTextTranslatorPopoverProps {
  editor: Editor | null;
}

export const TiptapTextTranslatorPopover = ({
  editor,
}: TiptapTextTranslatorPopoverProps) => {
  const isDocument = usePathname().includes("documents");

  if (!isDocument || !editor) return null;

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      targetLanguage: "",
      defaultLanguage: "en",
    },
  });

  const [translate] = useTranslateMutation();

  const targetLanguage = watch("targetLanguage");

  const onSubmit = async (data: {
    targetLanguage: string;
    defaultLanguage: string;
  }) => {
    if (!editor || !data.targetLanguage) {
      toast.error("Please select a valid target language.");
      return;
    }

    try {
      const htmlContent = editor.getHTML();

      const response = await translate({
        htmlStrings: htmlContent,
        target_lang: data.targetLanguage,
        original_lang: data.defaultLanguage === "ar" ? "ar" : "en",
      }).unwrap();

      if (response.text) {
        editor.commands.setContent(response.text);

        const isRTL = data.targetLanguage === "ar";
        editor.chain().focus().setTextAlign(isRTL ? "right" : "left").run();

        toast.success("Translation applied successfully!");
      }
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Failed to translate text. Please try again.");
    } finally {
      // Optionally reset form after submission
      reset();
    }
  };

  return (
    <Popover placement="bottom" showArrow>
      <PopoverTrigger>
        <Button className="px-2 py-1 border border-gray-300 text-sm bg-gray-100 text-gray-800 hover:bg-gray-200">Translate</Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-72">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full">
          <h3 className="text-sm font-semibold mb-2">Translate Document</h3>

          {/* Default Language */}
          <Controller
            name="defaultLanguage"
            control={control}
            render={({ field }) => (
              <Select
                label="Default Language"
                selectedKeys={[field.value]}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full"
              >
                {languages.map((lang) => (
                  <SelectItem key={lang.value} textValue={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          {/* Target Language */}
          <Controller
            name="targetLanguage"
            control={control}
            render={({ field }) => (
              <Select
                label="Target Language"
                selectedKeys={[field.value]}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full"
              >
                {languages.map((lang) => (
                  <SelectItem key={lang.value} textValue={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            color="primary"
            isLoading={isSubmitting}
            isDisabled={!targetLanguage || isSubmitting}
            className="w-full mt-2"
          >
            {isSubmitting ? "Translating..." : "Translate Text"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
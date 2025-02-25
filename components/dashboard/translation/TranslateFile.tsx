import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
  Input,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useTranslateFileMutation,
  useTranslateWordFileMutation,
} from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { useTranslations } from "next-intl";

// Update schema to allow PDF, .txt, and Word documents
const schema = yup.object({
  file: yup.mixed<File>().required("File is required"),
  original_lang: yup
    .string()
    .oneOf(["en", "ar"] as const, "Invalid original language selection")
    .required("Original language is required"),
  target_lang: yup
    .string()
    .oneOf(["en", "ar"] as const, "Invalid target language selection")
    .required("Target language is required"),
});

type FileTranslationFormValues = yup.InferType<typeof schema>;

export const TranslateFile = () => {
  const t = useTranslations("translation");
  const [finaleData, setfinaleData] = useState<{
    text: string;
    target_lang: string;
  }>({
    text: "",
    target_lang: ""
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<FileTranslationFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      original_lang: "en",
      target_lang: "ar",
    },
  });

  const [translate, { isLoading, error }] = useTranslateFileMutation();
  // add the translateword endpoint
  const [
    translateWord,
    { isLoading: wordIsLoading, error: wordError },
  ] = useTranslateWordFileMutation();

  const onSubmit = handleSubmit(async (data) => {
    // @ts-expect-error error
    const file: File = data.file?.[0];

    // Determine file extension
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("original_lang", data.original_lang);
    formData.append("target_lang", data.target_lang);

    try {
      let response;

      // Call the appropriate API endpoint based on the file type
      if (fileExtension === "doc" || fileExtension === "docx") {
        response = await translateWord(formData).unwrap();
      } else {
        response = await translate(formData).unwrap();
      }
      setfinaleData(response)

      onClose();
      reset();
    } catch (error) {
      console.error("Error translating file:", error);
    }
  });
  return (
    <>
      <div className="flex justify-between">
        <Button onClick={onOpen} color="primary">
          {t("file.openFile")}
        </Button>
        {finaleData.text && (
          <Button
            onClick={() => navigator.clipboard.writeText(finaleData.text.replace(/<[^>]*>/g, ''))}
            color="secondary"
          >
            Copy To Clipoard
          </Button>
        )}
      </div>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4> {t("file.title")}</h4>
              </ModalHeader>
              <ModalBody>
                <form
                  id="translationForm"
                  onSubmit={onSubmit}
                  className="flex flex-col gap-5"
                >
                  {/* File Upload */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                    {t("file.upload")}
                    </label>
                    <Input
                      type="file"
                      accept=".pdf, .doc, .docx" // Accept PDF and Word files
                      {...register("file")}
                      className={`mt-1 block w-full ${
                        errors.file ? "border-red-500" : ""
                      }`}
                    />
                    {errors.file && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.file.message}
                      </p>
                    )}
                  </div>

                  {/* Original Language Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                    {t("file.original")}
                    </label>
                    <Select
                      label={t("file.label1")}
                      placeholder="Choose the original language"
                      defaultSelectedKeys={["en"]}
                      onSelectionChange={(value) =>
                        setValue(
                          "original_lang",
                          value.currentKey as "en" | "ar"
                        )
                      }
                    >
                      <SelectItem key="en">
                      {t("file.english")}
                      </SelectItem>
                      <SelectItem key="ar">
                      {t("file.arabic")}
                      </SelectItem>
                    </Select>
                    {errors.original_lang && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.original_lang.message}
                      </p>
                    )}
                  </div>

                  {/* Target Language Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                    {t("file.target")}
                    </label>
                    <Select
                      label={t("file.label2")}
                      placeholder="Choose the target language"
                      defaultSelectedKeys={["ar"]}
                      onSelectionChange={(value) =>
                        setValue("target_lang", value.currentKey as "en" | "ar")
                      }
                    >
                      <SelectItem key="en">
                      {t("file.english")}
                      </SelectItem>
                      <SelectItem key="ar">
                      {t("file.arabic")}
                      </SelectItem>
                    </Select>
                    {errors.target_lang && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.target_lang.message}
                      </p>
                    )}
                  </div>
                </form>
              </ModalBody>
              {error && isFetchBaseQueryError(error) && (
                <div className="mt-4">
                  <p className="text-red-500 text-sm">
                    {error.data &&
                    typeof error.data === "object" &&
                    "message" in error.data
                      ? (error.data as { message: string }).message
                      : "An error occurred. Please try again."}
                  </p>
                </div>
              )}
              {wordError && isFetchBaseQueryError(wordError) && (
                <div className="mt-4">
                  <p className="text-red-500 text-sm">
                    {wordError.data &&
                    typeof wordError.data === "object" &&
                    "message" in wordError.data
                      ? (wordError.data as { message: string }).message
                      : "An error occurred. Please try again."}
                  </p>
                </div>
              )}
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    reset();
                  }}
                  isDisabled={isLoading || wordIsLoading}
                >
                  {t("file.close")}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  form="translationForm"
                  isLoading={isLoading || wordIsLoading}
                >
                  {t("file.submit")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {finaleData && (
        <div
          className="mt-5 whitespace-pre-wrap"
          dir={finaleData.target_lang === "ar" ? "rtl" : "ltr"}
          dangerouslySetInnerHTML={{ __html: finaleData.text }}
        ></div>
      )}
    </>
  );
};

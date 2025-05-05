import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Textarea,
  Input,
  ModalFooter,
  useDisclosure,
  ModalContent,
} from "@heroui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSubmitDynamicFormMutation } from "@/redux/services/api";
import Markdown from "markdown-to-jsx";
import { isFetchBaseQueryError } from "@/redux/store";
import { useTranslations } from "next-intl";

export const DynamicComponent = () => {
  const t = useTranslations("summarization");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [file, setFile] = useState<File | null>(null);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      questions: [{ category: "", question: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const [submitDynamicForm, { isLoading, error, data }] =
    useSubmitDynamicFormMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFile(e.target.files?.[0] || null);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Convert questions to dynamic key-value pairs
    const dynamicFields: { [key: string]: string } = {};
    data.questions.forEach(({ category, question }) => {
      dynamicFields[category] = question;
    });

    formData.append("fields", JSON.stringify(dynamicFields));

    try {
      await submitDynamicForm(formData).unwrap();
      onClose();
      reset();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  });

  return (
    <>
      {/* Button to open modal */}
      <Button onClick={onOpen} color="primary">
        {t("dynamic.openModel")}
      </Button>

      {/* Modal */}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4>{t("dynamic.title")}</h4>
              </ModalHeader>
              <ModalBody>
                <form id="dynamicForm" onSubmit={onSubmit}>
                  {/* File Upload */}
                  <Input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileChange}
                  />

                  {/* Questions */}
                  <div className="mt-3">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="mb-3 flex flex-col gap-3 items-center"
                      >
                        <Input
                          placeholder={t("dynamic.category")}
                          {...register(`questions.${index}.category`)}
                        />
                        <Textarea
                          placeholder={t("dynamic.question")}
                          rows={2}
                          {...register(`questions.${index}.question`)}
                        />
                        <Button
                          color="danger"
                          className="w-full"
                          onClick={() => remove(index)}
                        >
                          {t("dynamic.delete")}
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="md"
                      color="primary"
                      onClick={() => append({ category: "", question: "" })}
                    >
                      {t("dynamic.addQuestion")}
                    </Button>
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
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    reset();
                  }}
                >
                  {t("dynamic.close")}
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  form="dynamicForm"
                  color="primary"
                >
                  {t("dynamic.action")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Response Display */}
      <div className="mt-5 whitespace-pre-wrap prose prose-slate max-w-none prose-ul:text-black prose-li:marker:text-black">
        {data && data.data.summary && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800">
              Summary
            </h2>
            <Markdown>{data.data.summary}</Markdown>
          </>
        )}
      </div>
      <div className="mt-5 whitespace-pre-wrap prose prose-slate max-w-none prose-ul:text-black prose-li:marker:text-black">
        {data && <Markdown>{data.data.raw_response}</Markdown>}
      </div>
    </>
  );
};

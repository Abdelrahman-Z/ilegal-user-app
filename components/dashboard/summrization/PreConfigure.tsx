import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useGetQuestionsQuery,
  useSubmitDynamicFormMutation,
} from "@/redux/services/api";
import { formatObjectToMarkdown } from "@/utils";
import Markdown from "markdown-to-jsx";
import { isFetchBaseQueryError } from "@/redux/store";
import { useTranslations } from "next-intl";


// Schema with yup
const schema = yup.object({
  file: yup.mixed<File>().nullable().required("File is required"),
  questions: yup
    .array(
      yup.object({
        key: yup.string().required("Key is required"),
        value: yup.string().required("Value is required"), // Still validated even though it's auto-populated
      })
    )
    .min(1, "At least one question is required"),
});

// Infer the type of the form data
type FormData = yup.InferType<typeof schema>;

export function PreConfigure() {
  const t = useTranslations("summarization");
  const [file, setFile] = useState<File | null>(null);

  const [streamedResponse, setStreamedResponse] = useState<string>(""); // Array to store streamed key-value pairs
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useGetQuestionsQuery({ page: 1, limit: 10 }); // Fetch the first 10 questions

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      file: undefined, // Align with `nullable()` in schema
      questions: [{ key: "", value: "" }], // Start with one question
    },
  });

  // UseFieldArray for dynamic questions
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const [submitDynamicForm, { isLoading, error }] =
    useSubmitDynamicFormMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFile(e.target.files?.[0] || null);
  };
  // Handle form submission
  const onSubmit = handleSubmit(async (data) => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }
    const dynamicFields: { [key: string]: string } = {};
    data.questions?.forEach((el) => {
      dynamicFields[el.key] = el.value;
    });
    const formData = new FormData();
    formData.append("fields", JSON.stringify(dynamicFields));
    formData.append("file", file);
    try {
      const result = await submitDynamicForm(formData).unwrap();
      setStreamedResponse("");

      // Stream the response from the array
      // console.log(formatObjectToPlainText(result.Data))
      const text = formatObjectToMarkdown(result.Data);
      setStreamedResponse(text);
      onClose();
      reset();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  });

  return (
    <>
      <Button color="primary" onClick={onOpen}>
        {t("preConfigure.openForm")}
      </Button>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <form id="dynamicForm" onSubmit={onSubmit}>
              <ModalHeader>{t("preConfigure.title")}</ModalHeader>
              <ModalBody>
                {/* File Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                  {t("preConfigure.upload")}
                  </label>
                  <Input
                    {...register("file")}
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileChange}
                  />
                  {errors.file && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.file.message}
                    </p>
                  )}
                </div>

                {/* Dynamic Questions */}
                {fields.map((field, index) => (
                  <div key={field.id} className="mb-4">
                    <div className="flex gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                        {t("preConfigure.question")}
                        </label>
                        <Select
                          items={data?.data || []}
                          aria-label="key"
                          placeholder={t("preConfigure.key")}
                          onSelectionChange={(key) => {
                            const selectedItem = data?.data.find(
                              (item) => item.id === key.currentKey
                            );

                            if (selectedItem) {
                              setValue(
                                `questions.${index}.key`,
                                selectedItem.key
                              );
                              setValue(
                                `questions.${index}.value`,
                                selectedItem.value
                              );
                            }
                          }}
                        >
                          {(item) => (
                            <SelectItem key={item.id}>{item.key}</SelectItem>
                          )}
                        </Select>
                        {errors.questions?.[index]?.key && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.questions[index]?.key?.message}
                          </p>
                        )}
                      </div>
                      <Button
                        color="danger"
                        onClick={() => remove(index)}
                        className="self-end"
                      >
                        {t("preConfigure.remove")}
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Add New Question Button */}
                <Button
                  color="secondary"
                  onClick={() => append({ key: "", value: "" })}
                  className="mt-4"
                >
                  {t("preConfigure.addQuestion")}
                </Button>
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
                  onClick={() => {
                    onClose();
                  }}
                >
                  {t("preConfigure.close")}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  form="dynamicForm"
                  isLoading={isLoading}
                >
                  {t("preConfigure.submit")}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <div className="mt-5 whitespace-pre-wrap">
        <Markdown>{streamedResponse}</Markdown>
      </div>
    </>
  );
}

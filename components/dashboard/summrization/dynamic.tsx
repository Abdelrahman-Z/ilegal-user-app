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
} from "@nextui-org/react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSubmitDynamicFormMutation } from "@/redux/services/api";
import { formatObjectToMarkdown } from "@/utils";
import Markdown from "markdown-to-jsx";

export const DynamicComponent = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [file, setFile] = useState<File | null>(null);
  const [streamedResponse, setStreamedResponse] = useState<string>(""); // Array to store streamed key-value pairs

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      questions: [{ category: "", question: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const [submitDynamicForm, { isLoading }] = useSubmitDynamicFormMutation();

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
      const result = await submitDynamicForm(formData).unwrap();
      setStreamedResponse('')

      // Stream the response from the array
      // console.log(formatObjectToPlainText(result.Data))
      const text = formatObjectToMarkdown(result.Data);
      const words = text.split(" ");

      let wordIndex = 0;

      const streamSummary = () => {
        if (wordIndex < words.length) {
          setStreamedResponse((prev) => prev + " " + words[wordIndex]);
          wordIndex++;
          setTimeout(streamSummary, 100); // Adjust delay as needed
        }
      };
      onClose();
      streamSummary();
      reset();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  });

  return (
    <div>
      {/* Button to open modal */}
      <Button onClick={onOpen} color="primary">
        Open Dynamic Modal
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4>Upload File and Add Questions</h4>
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
                          placeholder="Category"
                          {...register(`questions.${index}.category`)}
                        />
                        <Textarea
                          placeholder="Question"
                          rows={2}
                          {...register(`questions.${index}.question`)}
                        />
                        <Button
                          color="danger"
                          className="w-full"
                          onClick={() => remove(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="md"
                      color="primary"
                      onClick={() => append({ category: "", question: "" })}
                    >
                      Add Question
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    reset();
                  }}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  form="dynamicForm"
                  color="primary"
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Response Display */}
      <div className="mt-5 whitespace-pre-wrap">
        <Markdown>{streamedResponse}</Markdown>
      </div>
    </div>
  );
};

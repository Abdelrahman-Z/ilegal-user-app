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

export const DynamicComponent = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [file, setFile] = useState<File | null>(null);
  const [streamedResponse, setStreamedResponse] = useState<
    { key: string; value: string }[]
  >([]); // Array to store streamed key-value pairs

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

      // Stream the response from the array
      const categories = Object.keys(result.Data);
      const answers = Object.values(result.Data);
      const array = categories.map((key, index) => ({
        key,
        value: answers[index] as string,
      }));
      onClose()
      setStreamedResponse(array); // Clear previous responses
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
        {streamedResponse.map(({ key, value }, index) => (
          <div key={index} className="mb-2">
            <strong>{key}:</strong>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
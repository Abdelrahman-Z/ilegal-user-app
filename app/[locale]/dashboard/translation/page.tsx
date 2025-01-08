"use client";

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
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslateMutation } from "@/redux/services/api";
import Markdown from "markdown-to-jsx";
import { formatObjectToMarkdown } from "@/utils";

// Yup schema with stricter string validation
const schema = yup.object({
  text: yup.string().required("Text is required"),
  original_lang: yup
    .string()
    .oneOf(
      ["english", "arabic"] as const,
      "Invalid original language selection"
    )
    .required("Original language is required"),
  target_lang: yup
    .string()
    .oneOf(["english", "arabic"] as const, "Invalid target language selection")
    .required("Target language is required"),
});

// Use explicit inferred types from Yup
type TranslationFormValues = yup.InferType<typeof schema>;

const DashboardPage = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [streamedResponse, setStreamedResponse] = useState<string>(""); // Array to store streamed key-value pairs

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TranslationFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      text: "",
      original_lang: "english",
      target_lang: "arabic",
    },
  });

  // RTK Query mutation hook for translation
  const [translate, { isLoading }] = useTranslateMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await translate(data).unwrap();
      setStreamedResponse('')
      const text = formatObjectToMarkdown(response);

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
      alert("Something went wrong while translating. Please try again.");
    }
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto overflow-auto flex-grow flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Translation</h2>
      </div>
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
      <div className="flex flex-col flex-1">
        <Button onClick={onOpen} color="primary">
          Open Translation Form
        </Button>

        {/* Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h4>Translate Text</h4>
                </ModalHeader>
                <ModalBody>
                  <form
                    id="translationForm"
                    onSubmit={onSubmit}
                    className="flex flex-col gap-5"
                  >
                    {/* Textarea for text */}
                    <Controller
                      name="text"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Type or paste your text here..."
                          fullWidth
                          rows={10}
                        />
                      )}
                    />
                    {errors.text && (
                      <p className="text-red-500">{errors.text.message}</p>
                    )}

                    {/* Original language selection */}
                    <Controller
                      name="original_lang"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Select Original Language"
                          placeholder="Choose the original language"
                          isRequired
                        >
                          <SelectItem key="english" value="english">
                            English
                          </SelectItem>
                          <SelectItem key="arabic" value="arabic">
                            Arabic
                          </SelectItem>
                        </Select>
                      )}
                    />
                    {errors.original_lang && (
                      <p className="text-red-500">
                        {errors.original_lang.message}
                      </p>
                    )}

                    {/* Target language selection */}
                    <Controller
                      name="target_lang"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Select Target Language"
                          placeholder="Choose the target language"
                          isRequired
                        >
                          <SelectItem key="english" value="english">
                            English
                          </SelectItem>
                          <SelectItem key="arabic" value="arabic">
                            Arabic
                          </SelectItem>
                        </Select>
                      )}
                    />
                    {errors.target_lang && (
                      <p className="text-red-500">
                        {errors.target_lang.message}
                      </p>
                    )}
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
                    color="primary"
                    form="translationForm"
                    isLoading={isLoading}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className="mt-5 whitespace-pre-wrap">
          <Markdown>{streamedResponse}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

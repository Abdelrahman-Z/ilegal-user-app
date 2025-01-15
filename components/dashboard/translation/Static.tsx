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

type TranslationFormValues = yup.InferType<typeof schema>;

export const Static = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [streamedResponse, setStreamedResponse] = useState<string>(""); // Array to store streamed key-value pairs

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue
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
      setStreamedResponse("");
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
      console.error(error);
    }
  });
  return (
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
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Text
                    </label>
                    <Textarea
                      {...register("text")}
                      placeholder="Type or paste your text here..."
                    //   className="mt-1 block w-full px-3 py-2 border rounded-md"
                      rows={10}
                    />
                    {errors.text && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.text.message}
                      </p>
                    )}
                  </div>

                  {/* Original Language Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Original Language
                    </label>
                    <Select
                      label="Select Original Language"
                      placeholder="Choose the original language"
                      defaultSelectedKeys={['english']}
                      onSelectionChange={(value) =>
                        setValue("original_lang", value.currentKey as "english" | "arabic")
                      }
                    >
                      <SelectItem key="english" value="english">
                        English
                      </SelectItem>
                      <SelectItem key="arabic" value="arabic">
                        Arabic
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
                      Target Language
                    </label>
                    <Select
                      label="Select Target Language"
                      placeholder="Choose the target language"
                      defaultSelectedKeys={['arabic']}
                      onSelectionChange={(value) =>
                        setValue("target_lang", value.currentKey as "english" | "arabic")
                      }
                    >
                      <SelectItem key="english" value="english">
                        English
                      </SelectItem>
                      <SelectItem key="arabic" value="arabic">
                        Arabic
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
  );
};

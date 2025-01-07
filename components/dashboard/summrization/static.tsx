import React, {  useState } from "react";
import Markdown from 'markdown-to-jsx';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Textarea,
    ModalFooter,
    useDisclosure,
    ModalContent,
  } from "@nextui-org/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSummarizeTextMutation } from "@/redux/services/api";
import { formatObjectToMarkdown } from "@/utils";

const schema = yup.object().shape({
  text: yup
    .string()
    .required("Text is required")
    .min(10, "Text must be at least 10 characters"),
});

export const StaticComponent = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [summary, setSummary] = useState("");

  const [summarizeText, { isLoading }] = useSummarizeTextMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setSummary(""); // Clear previous summary
    try {
      const response = await summarizeText(data.text).unwrap();
      const text = formatObjectToMarkdown(response.Data)
      const words = text.split(" ");
      let wordIndex = 0;

      const streamSummary = () => {
        if (wordIndex < words.length) {
          setSummary((prev) => prev + " " + words[wordIndex]);
          wordIndex++;
          setTimeout(streamSummary, 100); // Adjust delay as needed
        }
      };
      streamSummary();
      onClose();
      reset();
    } catch (error) {
      console.error("Error summarizing text:", error);
    }
  })

  return (
    <div className="flex-1">
      {/* Button to open modal */}
      <Button onClick={onOpen} color="primary">
        Open Text Area
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4>Add Text to Summarize</h4>
              </ModalHeader>
              <ModalBody>
                <form id="textForm" onSubmit={onSubmit}>
                  <Textarea
                    placeholder="Type or paste your text here..."
                    fullWidth
                    rows={20}
                    {...register("text")}
                  />
                  {errors.text && (
                    <p style={{ color: "red" }}>{errors.text.message}</p>
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
                {/* Button with `form` attribute */}
                <Button
                  type="submit"
                  color="primary"
                  form="textForm"
                  isLoading={isLoading}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Summary Output */}
      <div className="mt-5 whitespace-pre-wrap">
        {summary && (
          <Markdown>
            {summary}
          </Markdown>
        )}
      </div>
    </div>
  );
};

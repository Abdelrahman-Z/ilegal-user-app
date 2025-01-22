import React, { useState } from "react";
import Markdown from "markdown-to-jsx";

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
import { isFetchBaseQueryError } from "@/redux/store";

const schema = yup.object().shape({
  text: yup
    .string()
    .required("Text is required")
    .min(10, "Text must be at least 10 characters"),
});

export const StaticComponent = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [summary, setSummary] = useState("");

  const [summarizeText, { isLoading, error }] = useSummarizeTextMutation();

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
      console.log("Response Data:", response.Data);

      if (!response.Data || typeof response.Data !== "object") {
        console.error("Invalid response.Data:", response.Data);
        return;
      }

      const text = formatObjectToMarkdown(response.Data);
      setSummary(text);
      onClose();
      reset();
    } catch (error) {
      console.error("Error summarizing text:", error);
    }
  });

  return (
    <div className="flex-1">
      {/* Button to open modal */}
      <Button onClick={onOpen} color="primary">
        Open Text Area
      </Button>

      {/* Modal */}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
      >
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
        {summary && <Markdown>{summary}</Markdown>}
      </div>
    </div>
  );
};

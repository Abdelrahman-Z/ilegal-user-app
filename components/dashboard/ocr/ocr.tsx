import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  ModalFooter,
  useDisclosure,
  ModalContent,
} from "@heroui/react";
import { useOcrMutation } from "@/redux/services/api";
import Markdown from "markdown-to-jsx";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

export const OCRComponent = () => {
  // make sure your locale file has keys:
  // ocr.openModal, ocr.title, ocr.action, ocr.close

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [submitOCR, { isLoading, error, data }] = useOcrMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await submitOCR(formData).unwrap();
      onClose();
    } catch (err) {
      console.error("OCR error:", err);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Extract Text
      </Button>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onCloseInner) => (
            <>
              <ModalHeader>
                <h4>Upload a file for OCR</h4>
              </ModalHeader>
              <ModalBody>
                <form id="ocrForm" onSubmit={handleSubmit}>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                  />
                </form>

                {error && isFetchBaseQueryError(error) && (
                  <p className="text-red-500 mt-4 text-sm">
                    {error.data && typeof error.data === "object" && "message" in error.data
                      ? (error.data as { message: string }).message
                      : "An error occurred. Please try again."}
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onCloseInner();
                    setFile(null);
                  }}
                >
                   Cancel
                </Button>
                <Button
                  type="submit"
                  form="ocrForm"
                  isLoading={isLoading}
                  color="primary"
                >
                  Extract
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {data?.text && (
        <div className="mt-5 prose max-w-none">
          <h2 className="text-xl font-semibold">OCR Result</h2>
          <Markdown>{data.text}</Markdown>
        </div>
      )}
    </>
  );
};

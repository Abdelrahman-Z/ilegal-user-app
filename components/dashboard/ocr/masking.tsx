import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Textarea,
  ModalFooter,
  useDisclosure,
  ModalContent,
} from "@heroui/react";
import { useMaskPIIMutation } from "@/redux/services/api";
import Markdown from "markdown-to-jsx";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

export const MaskingComponent = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [maskPII, { isLoading, error, data }] = useMaskPIIMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Please enter some text to mask.");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);

    try {
      await maskPII(formData).unwrap();
      onClose();
    } catch (err) {
      console.error("Masking error:", err);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Mask PII
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
                <h4>Enter text to mask</h4>
              </ModalHeader>
              <ModalBody>
                <form id="maskForm" onSubmit={handleSubmit}>
                  <Textarea
                    placeholder="Paste your text here…"
                    rows={6}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
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
                    setText("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="maskForm"
                  isLoading={isLoading}
                  color="primary"
                >
                  Mask
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {data?.masked_text && (
        <div className="mt-5 prose max-w-none">
          <h2 className="text-xl font-semibold">Masked Text</h2>
          <Markdown>{data.masked_text}</Markdown>
        </div>
      )}
    </>
  );
};

"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useDeleteTokenMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { MdDelete } from "react-icons/md";
import { useTranslations } from "next-intl";


interface DeleteTokenProps {
  id: string;
  name: string;
}

export const DeleteToken: React.FC<DeleteTokenProps> = ({ id , name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteToken, { isLoading, error }] = useDeleteTokenMutation();

  const handleDelete = async () => {
    try {
      await deleteToken(id).unwrap();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  const t = useTranslations("tokens")
  return (
    <>
      <Button color="danger" onPress={onOpen}>
        <MdDelete />
      </Button>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onClose}
      >
        <ModalContent>
          <ModalHeader>{t("deleteToken.title")}</ModalHeader>
          <ModalBody>
            <p>{t("deleteToken.paragraph1")} {name} {t("deleteToken.paragraph2")}</p>
            {error && isFetchBaseQueryError(error) && (
              <p className="text-red-500 text-sm">
                {error.data &&
                typeof error.data === "object" &&
                "message" in error.data
                  ? (error.data as { message: string }).message
                  : "An error occurred. Please try again."}
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
            {t("deleteToken.cancel")}
            </Button>
            <Button
              color="primary"
              onPress={handleDelete}
              isLoading={isLoading}
            >
              {t("deleteToken.delete")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

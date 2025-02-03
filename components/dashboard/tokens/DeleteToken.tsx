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
} from "@nextui-org/react";
import { useDeleteTokenMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { MdDelete } from "react-icons/md";

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
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this token?</p>
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
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleDelete}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

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
import { useDeleteJurisdictionMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";

interface DeleteJurisdictionModalProps {
  id: string;
}

const DeleteJurisdictionModal: React.FC<DeleteJurisdictionModalProps> = ({
  id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteJurisdiction, { isLoading , error}] = useDeleteJurisdictionMutation();

  const handleDelete = async () => {
    try {
      await deleteJurisdiction(id).unwrap();
      onClose();
    } catch (error) {
      alert("Failed to delete jurisdiction. Please try again.");
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Update
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this jurisdiction?</p>
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

export default DeleteJurisdictionModal;

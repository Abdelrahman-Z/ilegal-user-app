import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useDeleteSignDocumentMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

interface DeleteSignDocumentModalProps {
  id: string;
}

const DeleteSignDocumentModal: React.FC<DeleteSignDocumentModalProps> = ({
  id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteSignDocument, { isLoading, error, isSuccess }] =
    useDeleteSignDocumentMutation();

  const handleDelete = async () => {
    try {
      await deleteSignDocument(id).unwrap();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

   //toast
   useEffect(() => {
    if (error && isFetchBaseQueryError(error)) {
      const errorMessage =
        error.data && typeof error.data === "object" && "message" in error.data
          ? (error.data as { message: string }).message
          : "An error occurred while deleting this signature.";
      toast.error(errorMessage);
    }
    if (isSuccess) {
      toast.success("Signature Deleted successfully!");
      onClose();
    }
  }, [error, isSuccess, onClose]);

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
            <p>Are you sure you want to delete this Signature?</p>
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

export default DeleteSignDocumentModal;

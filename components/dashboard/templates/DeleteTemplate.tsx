import { useDeleteTemplateMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

interface DeleteTemplateProps {
    templateId: string;
  }

export default function DeleteTemplate({ templateId }: DeleteTemplateProps) {

  const [deleteTemplate, { error: deletionError, isSuccess: isDeleted }] =
    useDeleteTemplateMutation();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // Handle error toast
  useEffect(() => {
    if (deletionError && isFetchBaseQueryError(deletionError)) {
      const errorMessage =
        deletionError.data &&
        typeof deletionError.data === "object" &&
        "message" in deletionError.data
          ? (deletionError.data as { message: string }).message
          : "An error occurred while deleting the template.";
      toast.error(errorMessage);
    }
  }, [deletionError]);

  useEffect(() => {
    if (isDeleted) {
      toast.success("Template Deleted successfully!");
    }
  }, [isDeleted]);

  const handleConfirmDelete = async () => {
    try {
      await deleteTemplate(templateId); // Delete the template
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  return (
    <>
      <Button
      onPress={() => {onOpen();}}
      isIconOnly
    //   variant="light"
      >
        <FaTrashAlt className="text-2xl text-red-700" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader>Delete Template</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this template?</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onPress={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={() => {
                onClose();
                handleConfirmDelete();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

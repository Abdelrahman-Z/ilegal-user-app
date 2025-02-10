import { useDeleteDocumentMutation } from "@/redux/services/api";
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
import { MdDelete } from "react-icons/md";
import { useTranslations } from "next-intl";


interface DeleteDocumentProps {
    documentId: string;
  }

export default function DeleteDocument({ documentId }: DeleteDocumentProps) {
  const t = useTranslations("deleteDocument");

  const [deleteDocument, { error: deletionError, isSuccess: isDeleted }] =
    useDeleteDocumentMutation();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // Handle error toast
  useEffect(() => {
    if (deletionError && isFetchBaseQueryError(deletionError)) {
      const errorMessage =
        deletionError.data &&
        typeof deletionError.data === "object" &&
        "message" in deletionError.data
          ? (deletionError.data as { message: string }).message
          : "An error occurred while deleting the document.";
      toast.error(errorMessage);
    }
  }, [deletionError]);

  useEffect(() => {
    if (isDeleted) {
      toast.success("Document Deleted successfully!");
    }
  }, [isDeleted]);

  const handleConfirmDelete = async () => {
    try {
      await deleteDocument(documentId);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <>
      <Button color="danger" isIconOnly onPress={onOpen} className="!p-0">
              <MdDelete />
            </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader>{t("title")}</ModalHeader>
          <ModalBody>
            <p>{t("paragraph")}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onPress={() => {
                onClose();
              }}
            >
              {t("cancel")}
            </Button>
            <Button
              color="danger"
              onPress={() => {
                onClose();
                handleConfirmDelete();
              }}
            >
              {t("delete")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

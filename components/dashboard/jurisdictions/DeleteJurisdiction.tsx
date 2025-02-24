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
import { useDeleteJurisdictionMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { MdDelete } from "react-icons/md";
import { useTranslations } from "next-intl";

interface DeleteJurisdictionModalProps {
  id: string;
}

const DeleteJurisdictionModal: React.FC<DeleteJurisdictionModalProps> = ({
  id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteJurisdiction, { isLoading, error }] =
    useDeleteJurisdictionMutation();

  const handleDelete = async () => {
    try {
      await deleteJurisdiction(id).unwrap();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  const t = useTranslations("jurisdictions");
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
          <ModalHeader>{t("deleteJurisdictions.title")}</ModalHeader>
          <ModalBody>
            <p>{t("deleteJurisdictions.paragraph")}</p>
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
            {t("deleteJurisdictions.cancel")}
            </Button>
            <Button
              color="primary"
              onPress={handleDelete}
              isLoading={isLoading}
            >
              {t("deleteJurisdictions.delete")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteJurisdictionModal;

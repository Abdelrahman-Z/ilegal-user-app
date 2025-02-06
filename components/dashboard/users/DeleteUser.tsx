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
import { useDeleteUserMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { MdDelete } from "react-icons/md";
import { useTranslations } from "next-intl";

interface DeleteUserModalProps {
  id: string;
  userName: string; // For displaying the user's name in the modal
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ id, userName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteUser, { isLoading, error }] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(id).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  const t = useTranslations("users");

  return (
    <>
      {/* Delete Button */}
      <Button color="danger" isIconOnly onPress={onOpen} className="!p-0">
        <MdDelete />
      </Button>

      {/* Confirmation Modal */}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onClose}
      >
        <ModalContent>
          <ModalHeader>{t("deleteUsers.title")}</ModalHeader>
          <ModalBody>
            <p>
            {t("deleteUsers.paragraph1")}<b>{userName}</b>{t("deleteUsers.paragraph2")}
            </p>
          </ModalBody>

          {/* Error Message */}
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
            {/* Cancel Button */}
            <Button color="danger" variant="flat" onPress={onClose}>
            {t("deleteUsers.cancel")}
            </Button>
            {/* Confirm Delete Button */}
            <Button
              color="primary"
              onPress={handleDelete}
              isLoading={isLoading}
            >
             {t("deleteUsers.delete")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteUserModal;

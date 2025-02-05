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
import { useDeleteRoleMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { MdDelete } from "react-icons/md";
import { useTranslations } from "next-intl";

interface DeleteRoleModalProps {
  id: string; // Role ID
  roleName: string; // For displaying the role's name in the modal
}

const DeleteRoleModal: React.FC<DeleteRoleModalProps> = ({ id, roleName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteRole, { isLoading, error }] = useDeleteRoleMutation();

  const handleDelete = async () => {
    try {
      await deleteRole(id).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to delete role:", error);
    }
  };
  const t = useTranslations("roles");

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
          <ModalHeader>{t("deleteRole.title")}</ModalHeader>
          <ModalBody>
            <p>
            {t("deleteRole.paragraph1")} <b>{roleName}</b>{t("deleteRole.paragraph2")}
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
            {t("deleteRole.button1")}
            </Button>
            {/* Confirm Delete Button */}
            <Button
              color="primary"
              onPress={handleDelete}
              isLoading={isLoading}
            >
              {t("deleteRole.button2")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteRoleModal;

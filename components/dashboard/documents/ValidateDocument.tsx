import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import React from "react";
import { GrValidate } from "react-icons/gr";
import { useValidateDocumentMutation } from "@/redux/services/api";
import toast from "react-hot-toast";

interface ValidateDocumentProps {
    documentId: string;
}

export const ValidateDocument: React.FC<ValidateDocumentProps> = ({ documentId }) => {
    const t = useTranslations("ValidateDocument");
    const [validateDocument] = useValidateDocumentMutation();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const handleConfirmValidate = async () => {
        try {
            await validateDocument(documentId);
            toast.success('Document validated successfully!');
        } catch (error) {
            console.log(error)
            toast.error("Error validating document. Please try again.");
        }
    };

    return (
        <>
            <Button color="success" isIconOnly onPress={onOpen} className="!p-0">
                <GrValidate className="text-white" />
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
                            color="success"
                            onPress={() => {
                                onClose();
                                handleConfirmValidate();
                            }}
                        >
                            {t("Validate")}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

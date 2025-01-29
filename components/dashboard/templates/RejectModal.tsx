import { useRejectTemplateMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

interface RejectTemplateProps {
    templateId: string;
  }

export default function RejectModal({ templateId }: RejectTemplateProps) {
  const [rejectReason, setRejectReason] = useState("");
   const [rejectTemplate, {isSuccess: isRejected, error: rejectionError}] = useRejectTemplateMutation();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // Handle error toast
  useEffect(() => {
    if (rejectionError && isFetchBaseQueryError(rejectionError)) {
      const errorMessage =
        rejectionError.data &&
        typeof rejectionError.data === "object" &&
        "message" in rejectionError.data
          ? (rejectionError.data as { message: string }).message
          : "An error occurred while rejecting the template.";
      toast.error(errorMessage);
    }
  }, [rejectionError]);

  useEffect(() => {
    if (isRejected) {
      toast.success("Template Rejected successfully!");
    }
  }, [isRejected]);

  const handleRejectTemplate = async () => {
    try {
      await rejectTemplate({
        id: templateId,
        body: { rejectReason }
      });
  
    } catch (error) {
      console.error("Error rejecting template:", error);
    }
  };

  return (
    <>
      <Button
      onPress={() => {onOpen();}}
      isIconOnly
    //   variant="light"
      >
        <FaTimes style={{ color: "red", fontSize: "24px" }} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader>Reject Template</ModalHeader>
          <ModalBody>
        <Input
          type="text"
          className="h-fit"
          placeholder="Enter rejection reason"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
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
                handleRejectTemplate();
              }}
            >
              Reject
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

import { useRejectDocumentMutation } from "@/redux/services/api";
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
import { LuX } from "react-icons/lu";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";


interface RejectDocumentProps {
    documentId: string;
  }
const schema = yup.object().shape({
  input: yup
    .string()
    .required("reason is required")
});

// Create a type from the Yup schema
type FormData = yup.InferType<typeof schema>;

export default function RejectModal({ documentId }: RejectDocumentProps) {
  const t = useTranslations("rejectDocument");
  const [rejectReason, setRejectReason] = useState("");
   const [rejectDocument, {isSuccess: isRejected, error: rejectionError}] = useRejectDocumentMutation();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  // Handle error toast
  useEffect(() => {
    if (rejectionError && isFetchBaseQueryError(rejectionError)) {
      const errorMessage =
        rejectionError.data &&
        typeof rejectionError.data === "object" &&
        "message" in rejectionError.data
          ? (rejectionError.data as { message: string }).message
          : "An error occurred while rejecting the document.";
      toast.error(errorMessage);
    }
  }, [rejectionError]);

  useEffect(() => {
    if (isRejected) {
      toast.success("Document Rejected successfully!");
      onClose();
    }
  }, [isRejected]);

  const handleRejectDocument : SubmitHandler<FormData> = async () => {
    try {
      await rejectDocument({
        id: documentId,
        body: { rejectReason }
      });
  
    } catch (error) {
      console.error("Error rejecting document:", error);
    }
  };

  return (
    <>
      <Button color="danger" isIconOnly onPress={onOpen} className="!p-0">
        <LuX />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        isDismissable={false}
      >
        <ModalContent>
        <form className="space-y-4" onSubmit={handleSubmit(handleRejectDocument)}>
          <ModalHeader>{t("title")}</ModalHeader>
          <ModalBody>
        <Input
        {...register("input")}
        color={errors.input ? "danger" : "default"}
          type="text"
          className="h-fit"
          placeholder="Enter rejection reason"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
        {errors.input && (
              <p className="text-red-500 text-sm mt-1">
                {errors.input.message}
              </p>
            )}
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
              type="submit"
            >
              {t("reject")}
            </Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

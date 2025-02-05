import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateSignDocumentMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { LuClipboardPen } from "react-icons/lu";
import toast from "react-hot-toast";

interface UpdateSignDocumentModalProps {
  id: string;
  currentName: string;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
});

export const UpdateSignDocument: React.FC<UpdateSignDocumentModalProps> = ({
  id,
  currentName,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateSignature, { isLoading, error, isSuccess }] =
    useUpdateSignDocumentMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: currentName },
  });

  const onSubmit = async (data: { name: string }) => {
    try {
      await updateSignature({ id, name: data.name }).unwrap();
      reset();
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
        : "An error occurred while updating this signature.";
    toast.error(errorMessage);
  }
  if (isSuccess) {
    toast.success("Signature Updated successfully!");
    onClose();
  }
}, [error, isSuccess, onClose]);

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        <LuClipboardPen />
      </Button>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onClose}
      >
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Update Signature</ModalHeader>
            <ModalBody>
              <Input
                {...register("name")}
                label="Signature Name"
                placeholder="Enter new signature name"
                variant="bordered"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />
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
              <Button color="primary" type="submit" isLoading={isLoading}>
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

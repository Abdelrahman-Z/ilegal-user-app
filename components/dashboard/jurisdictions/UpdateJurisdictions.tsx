import React from "react";
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
import { useUpdateJurisdictionMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { LuClipboardPen } from "react-icons/lu";

interface UpdateJurisdictionModalProps {
  id: string;
  currentName: string;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
});

export const UpdateJurisdiction: React.FC<UpdateJurisdictionModalProps> = ({
  id,
  currentName,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateJurisdiction, { isLoading, error }] =
    useUpdateJurisdictionMutation();
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
      await updateJurisdiction({ id, name: data.name }).unwrap();
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        <LuClipboardPen />
      </Button>
      <Modal scrollBehavior="inside" isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Update Jurisdiction</ModalHeader>
            <ModalBody>
              <Input
                {...register("name")}
                label="Jurisdiction Name"
                placeholder="Enter new jurisdiction name"
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

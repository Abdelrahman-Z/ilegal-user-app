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
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateRoleMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { LuClipboardPen } from "react-icons/lu";

interface UpdateRoleModalProps {
  id: string; // Role ID
  currentRoleName: string; // Current role name
}

const schema = yup.object({
  roleName: yup.string().required("Role name is required"),
});

export const UpdateRoleModal: React.FC<UpdateRoleModalProps> = ({
  id,
  currentRoleName,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateRole, { isLoading, error }] = useUpdateRoleMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      roleName: currentRoleName,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateRole({ id, name: data.roleName }).unwrap();
      reset();
      onClose();
    } catch (err) {
      console.error("Error updating role:", err);
    }
  });

  return (
    <>
      {/* Open Modal Button */}
      <Button color="primary" isIconOnly onPress={onOpen}>
        <LuClipboardPen />
      </Button>

      {/* Modal */}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onClose}
      >
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Update Role</ModalHeader>
            <ModalBody>
              {/* Role Name Input */}
              <Controller
                name="roleName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Role Name"
                    placeholder="Enter role name"
                    variant="bordered"
                    isInvalid={!!errors.roleName}
                    errorMessage={errors.roleName?.message}
                  />
                )}
              />
            </ModalBody>

            {/* Error Handling */}
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
                Cancel
              </Button>
              {/* Update Button */}
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

export default UpdateRoleModal;

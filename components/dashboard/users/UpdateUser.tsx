import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateUserMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { LuClipboardPen } from "react-icons/lu";

interface UpdateUserModalProps {
  id: string; // User ID
  currentUserName: string; // Current username
  currentPhone: string; // Current phone number
  src: string;
}

const schema = yup.object({
  userName: yup.string().required("Username is required"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone must contain only numbers")
    .required("Phone is required"),
  file: yup.mixed<File>().required("image is required"),
});

export const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  id,
  currentUserName,
  currentPhone,
  src,
}) => {
    const [imageSrc, setImageSrc] = useState(src)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: currentUserName,
      phone: currentPhone,
      file: undefined, // Changed to `undefined` instead of `null`
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("phone", data.phone);

      if (data.file && data.file instanceof FileList && data.file[0]) {
        formData.append("file", data.file[0]); // Append the file if provided
      }

      await updateUser({ id, formData }).unwrap();
      reset();
      onClose();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  });

  return (
    <>
      {/* Open Modal Button */}
      <Button color="primary" isIconOnly onPress={onOpen}>
        <LuClipboardPen />
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <ModalHeader>Update User</ModalHeader>
            <ModalBody>
              {/* Username Input */}
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Username"
                    placeholder="Enter username"
                    variant="bordered"
                    isInvalid={!!errors.userName}
                    errorMessage={errors.userName?.message}
                  />
                )}
              />
              {/* Phone Input */}
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Phone Number"
                    placeholder="Enter phone number"
                    variant="bordered"
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
                  />
                )}
              />
              {/* File Input */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  <Avatar src={imageSrc} />
                </label>
                <input
                id="image"
                type="file"
                {...register("file", {
                  onChange: (e) => {
                    setImageSrc(URL.createObjectURL(e.target.files[0]));
                  },
                })}
                  className="mt-1 hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
                />
                {errors.file && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.file.message}
                  </p>
                )}
              </div>
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

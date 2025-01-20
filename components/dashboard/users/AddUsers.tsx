"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateUserMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";

// Validation schema using Yup
const schema = yup
  .object({
    userName: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Phone must contain only numbers")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    file: yup.mixed<File>().required("Image is required"),
  })
  .required();

export function AddUser() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createUser, { isLoading, error }] = useCreateUserMutation();

  const onSubmit = handleSubmit(async (data) => {
    // @ts-expect-error  -> error from the YUP resolver
    const file = data.file?.[0];
    try {
      // Create a FormData object
      const formData = new FormData();

      // Append each field to the FormData object
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      formData.append("file", file);
      // Append the file (handling file input as an array)

      // Use the FormData object in the API request
      await createUser(formData).unwrap();

      // Reset form and close modal
      reset();
      onClose();
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add User
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Add User
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  {/* Username Field */}
                  <Input
                    {...register("userName")}
                    label="Username"
                    variant="bordered"
                    isInvalid={!!errors.userName}
                  />
                  {errors.userName && (
                    <p style={{ color: "red", fontSize: "0.875rem" }}>
                      {errors.userName.message}
                    </p>
                  )}

                  {/* Email Field */}
                  <Input
                    {...register("email")}
                    label="Email"
                    variant="bordered"
                    isInvalid={!!errors.email}
                  />
                  {errors.email && (
                    <p style={{ color: "red", fontSize: "0.875rem" }}>
                      {errors.email.message}
                    </p>
                  )}

                  {/* Phone Number Field */}
                  <Input
                    {...register("phone")}
                    label="Phone Number"
                    variant="bordered"
                    isInvalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p style={{ color: "red", fontSize: "0.875rem" }}>
                      {errors.phone.message}
                    </p>
                  )}

                  {/* Password Field */}
                  <Input
                    {...register("password")}
                    type="password"
                    label="Password"
                    variant="bordered"
                    isInvalid={!!errors.password}
                  />
                  {errors.password && (
                    <p style={{ color: "red", fontSize: "0.875rem" }}>
                      {errors.password.message}
                    </p>
                  )}

                  {/* File Upload Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload File
                    </label>
                    <input
                      type="file"
                      {...register("file")}
                      className={`mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer ${
                        errors.file ? "border-red-500" : ""
                      }`}
                    />
                    {errors.file && (
                      <p style={{ color: "red", fontSize: "0.875rem" }}>
                        {errors.file.message}
                      </p>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" isLoading={isLoading}>
                  Submit
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

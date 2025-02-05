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
import { useCreateRoleMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { useTranslations } from "next-intl";


// Validation schema using Yup
const schema = yup
  .object({
    name: yup.string().required("Role name is required"),
  })
  .required();

export function AddRole() {
  const t = useTranslations("roles");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createRole, { isLoading, error }] = useCreateRoleMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Use the API request to create a role
      await createRole({ name: data.name }).unwrap();

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
        {t("addRole.title")}
      </Button>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">
              {t("addRole.title")}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  {/* Role Name Field */}
                  <Input
                    {...register("name")}
                    label={t("addRole.label")}
                    placeholder={t("addRole.placeHolder")}
                    variant="bordered"
                    isInvalid={!!errors.name}
                  />
                  {errors.name && (
                    <p style={{ color: "red", fontSize: "0.875rem" }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                {t("addRole.button1")}
                </Button>
                <Button color="primary" type="submit" isLoading={isLoading}>
                {t("addRole.button2")}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

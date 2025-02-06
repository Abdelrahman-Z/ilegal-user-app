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
import { useCreateJurisdictionMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { useTranslations } from "next-intl";

// Validation schema using Yup
const schema = yup
  .object({
    name: yup.string().required("Name is required"),
  })
  .required();

export function AddJurisdiction() {
  const t = useTranslations("jurisdictions");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createJurisdiction, { isLoading, error }] =
    useCreateJurisdictionMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createJurisdiction({
        ...data,
        imageUrl: "staticImageUrlValue", // Static value
        referenceUrl: "staticReferenceUrlValue", // Static value
      }).unwrap();
      reset();
      onClose();
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        {t("addJurisdictions.create")}
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
              {t("addJurisdictions.title")}
              </ModalHeader>
              <ModalBody>
                <div>
                  <Input
                    {...register("name")}
                    label={t("addJurisdictions.label")}
                    placeholder={t("addJurisdictions.placeHolder")}
                    variant="bordered"
                    isInvalid={!!errors.name}
                  />
                  {errors.name && (
                    <p style={{ color: "red", fontSize: "0.875rem" }}>
                      {errors.name.message}
                    </p>
                  )}
                  {/* Display server-side error */}
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
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                {t("addJurisdictions.close")}
                </Button>
                <Button color="primary" type="submit" isLoading={isLoading}>
                {t("addJurisdictions.submit")}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

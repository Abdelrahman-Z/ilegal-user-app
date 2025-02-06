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
import { useCreateTokenMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { useTranslations } from "next-intl";


const schema = yup
  .object({
    name: yup.string().required("Name is required"),
  })
  .required();

export function AddToken() {
  const t = useTranslations("tokens");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createToken, { isLoading, error }] = useCreateTokenMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createToken(data).unwrap();
      reset();
      onClose();
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <>
      <Button color="primary" onPress={onOpen}               
      className="bg-gradient-to-r from-deepBlue to-lightBlue text-white py-2 px-4 rounded-lg shadow"
      >
        {t("addTokens.create")}
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
              {t("addTokens.create")}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input
                    {...register("name")}
                    label={t("addTokens.label")}
                    placeholder={t("addTokens.placeHolder")}
                    variant="bordered"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
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
                {t("addTokens.close")}
                </Button>
                <Button color="primary" type="submit" isLoading={isLoading}>
                {t("addTokens.submit")}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

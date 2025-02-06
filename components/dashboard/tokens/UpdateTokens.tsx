"use client";
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
import { useUpdateTokenMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { LuClipboardPen } from "react-icons/lu";
import { useTranslations } from "next-intl";


const schema = yup.object({
  keyword: yup.string().required("Keyword is required"),
});

type FormData = yup.InferType<typeof schema>;

interface UpdateTokenProps {
  id: string;
  currentKeyword: string;
}

export const UpdateToken: React.FC<UpdateTokenProps> = ({
  id,
  currentKeyword,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateToken, { isLoading, error }] = useUpdateTokenMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      keyword: currentKeyword,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateToken({
        id,
        keyword: data.keyword,
      }).unwrap();
      onClose();
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  const t = useTranslations("tokens")

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
        onOpenChange={() => {
          reset();
          onClose();
        }}
      >
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>{t("updateTokens.title")}</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <Input
                  {...register("keyword")}
                  label={t("updateTokens.label")}
                  placeholder={t("updateTokens.placeHolder")}
                  variant="bordered"
                  isInvalid={!!errors.keyword}
                  errorMessage={errors.keyword?.message}
                />
              </div>
              {error && isFetchBaseQueryError(error) && (
                <p className="text-red-500 text-sm">
                  {(error.data as { message: string })?.message ||
                    "An error occurred. Please try again."}
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
              {t("updateTokens.cancel")}
              </Button>
              <Button color="primary" type="submit" isLoading={isLoading}>
              {t("updateTokens.update")}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

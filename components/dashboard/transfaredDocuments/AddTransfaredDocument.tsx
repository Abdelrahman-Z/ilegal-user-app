import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { useCreateDocumentTransferMutation, useGetApprovedDocumentsQuery } from "@/redux/services/api"; // Assuming this hook exists
import { Document } from "@/types";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";
import { useTranslations } from "next-intl"; // Importing useTranslations

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  documentId: yup.string().required("Document selection is required"),
});

export const AddTransfaredDocument = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: approvedDocuments } = useGetApprovedDocumentsQuery({}); // Fetch approved documents
  const [createTransfer , { isLoading, error }] = useCreateDocumentTransferMutation();
  const t = useTranslations("transfaredDocuments.addTransfareDocument"); // Using translations

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createTransfer(data).unwrap();
      toast.success(t("success")); // Using translation for success message
      reset();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(t("error")); // Using translation for error message
    }
  });

  useEffect(() => {
    if (error && isFetchBaseQueryError(error)) {
      const errorMessage =
        error.data && typeof error.data === "object" && "message" in error.data
          ? (error.data as { message: string }).message
          : t("error"); // Using translation for error message
      toast.error(errorMessage);
    }
  }, [error]);

  return (
    <>
      <Button onPress={onOpen} color="primary">
        {t("title")} {/* Using translation for button text */}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader>{t("title")}</ModalHeader> {/* Using translation for modal header */}
          <ModalBody>
            <form id="validatedDocumentForm" onSubmit={onSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                  {t("emailLabel")} {/* Using translation for email label */}
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      {...field}
                      placeholder={t("emailPlaceHolder")} // Using translation for email placeholder
                      isInvalid={!!errors.email}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="selectedDocument"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                   {t("label")} {/* Using translation for select document label */}
                </label>
                <Select
                  label={t("label")} // Using translation for select label
                  onSelectionChange={(value) => {
                    const selectedValue = value.currentKey as string;
                    if (selectedValue) {
                      setValue("documentId", selectedValue);
                      clearErrors("documentId");
                    }
                  }}
                  isInvalid={!!errors.documentId}
                  errorMessage={
                    errors.documentId && errors.documentId.message
                  }
                >
                  {approvedDocuments?.data?.map((doc: Document) => (
                    <SelectItem key={doc.id}>
                      {doc.name}
                    </SelectItem>
                  )) || []}
                </Select>
              </div>
            </form>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose();
                  reset();
                }}
              >
                {t("close")} {/* Using translation for cancel button */}
              </Button>
              <Button
                type="submit"
                color="primary"
                form="validatedDocumentForm"
                isLoading={isLoading}
              >
                {t("submit")} {/* Using translation for submit button */}
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

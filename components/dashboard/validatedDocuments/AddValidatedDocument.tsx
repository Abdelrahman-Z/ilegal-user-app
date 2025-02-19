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
} from "@nextui-org/react";
import { useCreateDocumentTransferMutation, useGetApprovedDocumentsQuery } from "@/redux/services/api"; // Assuming this hook exists
import { Document } from "@/types";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  documentId: yup.string().required("Document selection is required"),
});

export const AddValidatedDocument = () => {
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
  const [createTransfer , { isLoading, error }] = useCreateDocumentTransferMutation()
  const onSubmit = handleSubmit(async (data) => {
    // Handle the submission logic here
    console.log("Email:", data.email);
    console.log("Selected Document:", data.documentId);
    await createTransfer(data).unwrap()
    toast.success('Transfare created succssefuly')
    reset();
    onClose();
  });


  useEffect(() => {
    if (error && isFetchBaseQueryError(error)) {
      const errorMessage =
        error.data && typeof error.data === "object" && "message" in error.data
          ? (error.data as { message: string }).message
          : "An error occurred while creating the document.";
      toast.error(errorMessage);
    }
  }, [error]);

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add Validated Document
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader>Add Validated Document</ModalHeader>
          <ModalBody>
            <form id="validatedDocumentForm" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      {...field}
                      placeholder="Enter email"
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
                  Select Approved Document
                </label>
                <Select
                  label={"Approved Documents"}
                  onSelectionChange={(value) => {
                    const selectedValue = value.currentKey as string;
                    if (selectedValue) {
                      setValue("documentId", selectedValue);
                      clearErrors("documentId")
                    }
                  }}
                  isInvalid={!!errors.documentId}
                  errorMessage={
                    errors.documentId && errors.documentId.message
                  }
                >
                  {approvedDocuments?.data?.map((doc: Document) => (
                    <SelectItem key={doc.id} value={doc.id}>
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
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                form="validatedDocumentForm"
                isLoading={isLoading}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

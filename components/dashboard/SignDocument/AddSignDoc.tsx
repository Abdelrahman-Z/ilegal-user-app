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
import { useCreateSignDocumentMutation, useCreateS3Mutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { useEffect } from "react";
import toast from "react-hot-toast";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    image: yup.mixed().required("Image is required"),
  })
  .required();

export function AddSignDocument() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createSignature, { isLoading, error, isSuccess }] =
    useCreateSignDocumentMutation();

  const [createS3, { isLoading: loadings3 }] =
    useCreateS3Mutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createSignature({
        documentSignImageUrl: data.image,
        signName: data.name,
      }).unwrap();
      reset();
      onClose();
    } catch (e) {
      console.error(e);
    }
  });

  const handleImageUpload = async (event:React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      await createS3( formData ).unwrap().then((response) => {
        setValue("image", response.url);
        toast.success("Image uploaded successfully!");
      });
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed.");
    }
  };

//toast
useEffect(() => {
  if (error && isFetchBaseQueryError(error)) {
    const errorMessage =
      error.data && typeof error.data === "object" && "message" in error.data
        ? (error.data as { message: string }).message
        : "An error occurred while creating this signature.";
    toast.error(errorMessage);
  }
  if (isSuccess) {
    toast.success("Signature Created successfully!");
    reset();
    onClose();
  }
}, [error, isSuccess, onClose]);

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Create Signature
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
                Create Signature
              </ModalHeader>
              <ModalBody>
                <div>
                  {/* signature name */}
                  <Input
                    {...register("name")}
                    label="Signature Name"
                    placeholder="Signature Name"
                    variant="bordered"
                    isInvalid={!!errors.name}
                    className="mb-10"
                  />
                  {errors.name && (
                    <p style={{ color: "red", fontSize: "0.875rem" }}>
                      {errors.name.message}
                    </p>
                  )}

                  {/* Image Upload */}
                  <Input
                    type="file"
                    label="Upload Image"
                    variant="bordered"
                    accept="image/*"
                    onChange={handleImageUpload}
                    isInvalid={!!errors.image}
                    errorMessage={errors.image?.message}
                  />
                  {errors.image && (
                    <p style={{ color: "red", fontSize: "0.875rem" }}>
                      {errors.image.message}
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
                  Close
                </Button>
                <Button color="primary" 
                type="submit" 
                isDisabled={loadings3} 
                isLoading={isLoading} 
                >
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

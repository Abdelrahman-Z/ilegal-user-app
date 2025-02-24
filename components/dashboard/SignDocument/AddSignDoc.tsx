"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spinner,
} from "@heroui/react";
import { useDisclosure } from "@heroui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateSignDocumentMutation,
  useCreateS3Mutation,
} from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    image: yup.mixed().required("Image is required"),
  })
  .required();

export function AddSignDocument() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // const [uploadedImage, setUploadedImage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createSignature, { isLoading}] =
    useCreateSignDocumentMutation();

  const [createS3, { isLoading: loadings3 }] = useCreateS3Mutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createSignature({
        documentSignImageUrl: data.image,
        signName: data.name,
      }).unwrap();
      toast.success("Signature Created successfully!");
      reset();
      onClose();
    } catch (e) {
      console.error(e);
    }
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      await createS3(formData)
        .unwrap()
        .then((response) => {
          setValue("image", response.url);
        });
    } catch (error) {
      console.error("Image upload failed", error);
      if (error && isFetchBaseQueryError(error)) {
        const errorMessage =
          error.data && typeof error.data === "object" && "message" in error.data
            ? (error.data as { message: string }).message
            : "An error occurred while creating this signature.";
        toast.error(errorMessage);
      }
    }
  };

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
        onClose={() => {
          reset();
        }}
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
                  <div className="relative w-24 h-24 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="imageUpload"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="imageUpload"
                      className="w-full h-full flex items-center justify-center rounded-lg"
                    >
                      {loadings3 ? (
                        <Spinner color="primary" />
                      ) : (
                        <>
                          {getValues("image") ? (
                            <img
                              src={String(getValues("image"))}
                              alt="Uploaded"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <>
                              {errors.image && (
                                <p
                                  style={{ color: "red", fontSize: "0.875rem" }}
                                >
                                  {errors.image.message}
                                </p>
                              )}
                              <FaCloudUploadAlt className="text-gray-500 text-4xl" />
                            </>
                          )}
                        </>
                      )}
                    </label>
                  </div>
               </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
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

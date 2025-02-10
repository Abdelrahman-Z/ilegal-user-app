import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateS3Mutation, useUpdateSignDocumentMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { LuClipboardPen } from "react-icons/lu";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";

interface UpdateSignDocumentModalProps {
  id: string;
  currentName: string;
  currentimg: string;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  imageUrl: yup.string().required("Image is required"),
});

export const UpdateSignDocument: React.FC<UpdateSignDocumentModalProps> = ({
  id,
  currentName,
  currentimg
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateSignature, { isLoading}] =
    useUpdateSignDocumentMutation();
  const [createS3, { isLoading: loadings3 }] = useCreateS3Mutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: currentName, imageUrl: currentimg },
  });

  const onSubmit = async (data: { name: string, imageUrl: string }) => {
    try {
      await updateSignature({
        id,
        name: data.name,
        imageUrl: data.imageUrl || " ",
      }).unwrap();
      toast.success("Signature Updated successfully!");
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  
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
          setValue("imageUrl", response.url);
        });
    } catch (error) {
      console.error("Image upload failed", error);
      if (error && isFetchBaseQueryError(error)) {
        const errorMessage =
          error.data && typeof error.data === "object" && "message" in error.data
            ? (error.data as { message: string }).message
            : "An error occurred while updating this signature.";
        toast.error(errorMessage);
      }
    }
  };

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
        onOpenChange={onClose}
      >
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Update Signature</ModalHeader>
            <ModalBody>
              <Input
                {...register("name")}
                label="Signature Name"
                placeholder="Enter new signature name"
                variant="bordered"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />
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
                      {getValues("imageUrl") ? (
                        <img
                          src={String(getValues("imageUrl"))}
                          alt="Uploaded"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <>
                          {errors.imageUrl && (
                            <p style={{ color: "red", fontSize: "0.875rem" }}>
                              {errors.imageUrl.message}
                            </p>
                          )}
                          <FaCloudUploadAlt className="text-gray-500 text-4xl" />
                        </>
                      )}
                    </>
                  )}
                </label>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
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

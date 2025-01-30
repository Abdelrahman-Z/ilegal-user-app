import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddTemplateMutation, useGetReviewersTemplatesQuery } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Define the schema for form validation
const schema = yup.object({
  name: yup.string().required("Template name is required"),
  language: yup
    .string()
    .oneOf(["ENGLISH", "ARABIC"], "Invalid language selection")
    .required("Language is required"),
  attachmentUrl: yup.string().required("Attachment URL is required"),
  reviewedById: yup.string().required("Reviewer ID is required"),
});

type TemplateFormValues = yup.InferType<typeof schema>;

export const CreateTemplate = () => {
  const router = useRouter();
  const {locale} = useParams();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [addTemplate, { isLoading, error, isSuccess }] =
    useAddTemplateMutation();

  const { data: reviewerData } = useGetReviewersTemplatesQuery({});

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TemplateFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      language: "ENGLISH",
      attachmentUrl: "<h2>write your template</h2>",
    },
  });

  // Handle error toast
  useEffect(() => {
    if (error && isFetchBaseQueryError(error)) {
      const errorMessage =
        error.data && typeof error.data === "object" && "message" in error.data
          ? (error.data as { message: string }).message
          : "An error occurred while creating the template.";
      toast.error(errorMessage);
    }
  }, [error]);

  // Handle success toast
  useEffect(() => {
    if (isSuccess) {
      toast.success("Template created successfully!");
      onClose();
      reset();
    }
  }, [isSuccess, onClose, reset]);

  const onSubmit = async (data: TemplateFormValues) => {
    try {
      const response = await addTemplate({
        name: data.name,
        language: data.language,
        attachmentUrl: data.attachmentUrl,
        reviewedById: data.reviewedById,
      }).unwrap();
      console.log("Template created successfully!", response);
      router.push(`/${locale}/dashboard/templates/${response.data.id}`);
   } catch (err) {
      console.error("Failed to create template:", err);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Create New Template
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader>Create New Template</ModalHeader>
          <ModalBody>
            <form
              id="createTemplateForm"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Template Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Template Name
                </label>
                <Input
                  type="text"
                  {...register("name")}
                  placeholder="Enter template name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Language
                </label>
                <Select
                  label="Select Template Language"
                  placeholder="Choose a language"
                  defaultSelectedKeys={["ENGLISH"]}
                  onSelectionChange={(value) =>
                    setValue(
                      "language",
                      value.currentKey as "ENGLISH" | "ARABIC"
                    )
                  }
                >
                  <SelectItem key="ENGLISH" value="ENGLISH">
                    English
                  </SelectItem>
                  <SelectItem key="ARABIC" value="ARABIC">
                    Arabic
                  </SelectItem>
                </Select>
                {errors.language && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.language.message}
                  </p>
                )}
              </div>

              {/* Reviewer Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Reviewer
                </label>
                <Select
                  label="Select Reviewer"
                  placeholder="Choose a Reviewer"
                  onSelectionChange={(value) =>
                    setValue("reviewedById", value.currentKey as string)
                  }
                >
                  {reviewerData &&
                    reviewerData.map((reviewer: { id: string; userName: string }) => (
                      <SelectItem key={reviewer.id} value={reviewer.id}>
                        {reviewer.userName}
                      </SelectItem>
                    ))}
                </Select>
                {errors.reviewedById && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.reviewedById.message}
                  </p>
                )}
              </div>
            </form>
          </ModalBody>

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
              color="primary"
              form="createTemplateForm"
              type="submit"
              isLoading={isLoading}
              autoFocus
            >
              Create Template
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

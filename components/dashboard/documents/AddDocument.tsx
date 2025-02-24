import React, { useEffect, useState } from "react";
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
} from "@heroui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateDocumentMutation,
  useGetApprovedTemplatesQuery,
  useGetJurisdictionsQuery,
  useGetPreConfiguredTemplatesQuery,
  useGetReviewersDocumentsQuery,
} from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Document } from "../../../types";
import { useTranslations } from "next-intl";


// Define the schema for form validation
const schema = yup.object({
  name: yup.string().required("Document name is required"),
  jurisdicationId: yup.string().required("Jurisdication Name is required"),
  templateId: yup.string().required("Template Name is required"),
  language: yup
    .string()
    .oneOf(["ENGLISH", "ARABIC"], "Invalid language selection")
    .required("Language is required"),
  reviewedById: yup.string().required("Reviewer ID is required"),
});

type TemplateFormValues = yup.InferType<typeof schema>;

export const CreateDocument = () => {
  const t = useTranslations("addDocument");
  const router = useRouter();
  const { locale } = useParams();
  const [isPreConfigured, setIsPreConfigured] = useState<boolean>(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { data: reviewerData } = useGetReviewersDocumentsQuery({});

  const { data: jurisdictionData } = useGetJurisdictionsQuery({
    page: 1,
    limit: 10,
  });
  const { data: templatesData } = useGetApprovedTemplatesQuery({});
  const { data: pretemplatesData } = useGetPreConfiguredTemplatesQuery({});

  const [createDocument, { isLoading, error, isSuccess }] =
    useCreateDocumentMutation();

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
    },
  });

  // Handle error toast
  useEffect(() => {
    if (error && isFetchBaseQueryError(error)) {
      const errorMessage =
        error.data && typeof error.data === "object" && "message" in error.data
          ? (error.data as { message: string }).message
          : "An error occurred while creating the document.";
      toast.error(errorMessage);
    }
  }, [error]);

  // Handle success toast
  useEffect(() => {
    if (isSuccess) {
      toast.success("Document created successfully!");
      onClose();
      reset();
    }
  }, [isSuccess, onClose, reset]);

  const onSubmit = async (data: TemplateFormValues) => {
    try {
      const response = await createDocument({
        name: data.name,
        jurisdictionId: data.jurisdicationId,
        templateId: data.templateId,
        language: data.language,
        reviewedById: data.reviewedById,
        isPreConfigured: isPreConfigured,
      }).unwrap();
  
      console.log("Document created successfully!", response);
      router.push(`/${locale}/dashboard/documents/${response.id}`);
    } catch (err) {
      console.error("Failed to create document:", err);
    }
  };
  

  return (
    <>
      <Button onPress={onOpen} color="primary">
        {t("buttonName")}
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader>{t("buttonName")}</ModalHeader>
          <ModalBody>
            <form
              id="createTemplateForm"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Document Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                {t("document.name")}
                </label>
                <Input
                  type="text"
                  {...register("name")}
                  placeholder={t("document.placeHolder")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Jurisdiction Name Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                {t("jurisdiction.name")}
                </label>
                <Select
                  label={t("jurisdiction.label")}
                  placeholder={t("jurisdiction.placeHolder")}
                  onSelectionChange={(value) =>
                    setValue("jurisdicationId", value.currentKey as string)
                  }
                >
                  {jurisdictionData?.data?.map(
                    (jurisdiction: { id: string; name: string }) => (
                      <SelectItem key={jurisdiction.id} textValue={jurisdiction.id}>
                        {jurisdiction.name}
                      </SelectItem>
                    )
                  ) || []}
                </Select>
                {errors.jurisdicationId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.jurisdicationId.message}
                  </p>
                )}
              </div>

              {/* Template Name Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                {t("template.name")}
                </label>
                <Select
                  label={t("template.label")}
                  placeholder={t("template.placeHolder")}
                  onSelectionChange={(value) => {
                    const selectedId = value.currentKey as string;
                    const foundInPreTemplates = pretemplatesData?.data.some(
                      (pretemplate: Document) => pretemplate.id === selectedId
                    );
                    setIsPreConfigured(!!foundInPreTemplates); // true if found, false otherwise
                    setValue("templateId", selectedId);
                  }}
                >
                  {templatesData?.data.map(
                    (template: { id: string; name: string }) => (
                      <SelectItem key={template.id} textValue={template.id}>
                        {template.name}
                      </SelectItem>
                    )
                  )}

                  {pretemplatesData?.data.map(
                    (pretemplate: { id: string; name: string }) => (
                      <SelectItem key={pretemplate.id} textValue={pretemplate.id}>
                        {pretemplate.name}
                      </SelectItem>
                    )
                  )}
                </Select>

                {errors.templateId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.templateId.message}
                  </p>
                )}
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                {t("language.name")}
                </label>
                <Select
                  label={t("language.label")}
                  placeholder={t("language.placeHolder")}
                  defaultSelectedKeys={["ENGLISH"]}
                  onSelectionChange={(value) =>
                    setValue(
                      "language",
                      value.currentKey as "ENGLISH" | "ARABIC"
                    )
                  }
                >
                  <SelectItem key="ENGLISH" textValue="ENGLISH">
                  {t("language.english")}
                  </SelectItem>
                  <SelectItem key="ARABIC" textValue="ARABIC">
                  {t("language.arabic")}
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
                {t("selectReviewer.name")}
                </label>
                <Select
                  label={t("selectReviewer.label")}
                  placeholder={t("selectReviewer.placeHolder")}
                  onSelectionChange={(value) =>
                    setValue("reviewedById", value.currentKey as string)
                  }
                >
                  {reviewerData &&
                    reviewerData.map(
                      (reviewer: { id: string; userName: string }) => (
                        <SelectItem key={reviewer.id} textValue={reviewer.id}>
                          {reviewer.userName}
                        </SelectItem>
                      )
                    )}
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
              {t("buttons.cancel")}
            </Button>
            <Button
              color="primary"
              form="createTemplateForm"
              type="submit"
              isLoading={isLoading}
              autoFocus
            >
              {t("buttons.create")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

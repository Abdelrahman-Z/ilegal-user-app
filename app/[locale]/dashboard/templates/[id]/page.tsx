"use client";
import {
  Button,
  ScrollShadow,
  Spinner,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TiptapEditor } from "@/components/dashboard/editor/Editor";
import {
  useGetTemplateQuery,
  useUpdateTemplateMutation,
} from "@/redux/services/api";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";
import { useTranslations } from "next-intl";
import { useTipTapEditor } from "@/components/dashboard/editor/config";


const Page = () => {
  const t = useTranslations("templates");
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [
    updateTemplate,
    { isSuccess: templateUpdated, error: UpdateTemplateError },
  ] = useUpdateTemplateMutation();
  const { data, error, isLoading, isSuccess } = useGetTemplateQuery(
    id?.toString()
  );

  const editor = useTipTapEditor();

  useEffect(() => {
    if (editor && isSuccess) {
      editor.commands.setContent(data?.attachmentUrl || "");
    }
  }, [editor, data?.attachmentUrl]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editor) {
      const updatedContent = editor.getHTML();
      if (!updatedContent.trim()) {
        toast.error(
          "The template is empty. Please add some content before saving."
        );
        return;
      }
      updateTemplate({
        id: data.id.toString(),
        body: { attachmentUrl: updatedContent },
      });
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (UpdateTemplateError && isFetchBaseQueryError(UpdateTemplateError)) {
      const errorMessage =
        UpdateTemplateError.data &&
        typeof UpdateTemplateError.data === "object" &&
        "message" in UpdateTemplateError.data
          ? (UpdateTemplateError.data as { message: string }).message
          : "An error occurred while deleting the template.";
      toast.error(errorMessage);
    }
    if (templateUpdated) {
      toast.success("Template Updated successfully!");
    }
  }, [UpdateTemplateError, templateUpdated]);

  if (!id) {
    return <div>{t("error1")}</div>;
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full w-full bg-white ">
        <Spinner size="lg" label={t("loading")} color="primary" />
      </div>
    );
  if (error)
    return (
      <div>
        {t("error2")}: {JSON.stringify(error)}
      </div>
    );

  return (
    <div className="bg-white shadow-lg rounded-lg mx-auto p-6 min-h-full h-fit w-full">
      {!isEditing ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {data.name}
            </h2>
            <Button
              className="bg-gradient-to-r from-deepRed to-brightRed text-white py-2 px-4 rounded-lg shadow"
              onPress={handleEdit}
            >
              {t("edit")}
            </Button>
          </div>
          <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
          <ScrollShadow className="max-h-[calc(100vh-250px)]">
            <div className="text-gray-700 text-base leading-relaxed space-y-4 prose max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: data.attachmentUrl }}
              ></div>
            </div>
          </ScrollShadow>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button
              className="bg-gradient-to-r from-deepBlue to-lightBlue text-white py-2 px-4 rounded-lg shadow"
              onPress={handleSave}
            >
              {t("save")}
            </Button>
            <Button
              className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow"
              onPress={() => setIsEditing(false)}
            >
              {t("cancel")}
            </Button>
          </div>

          <div className="flex gap-4">
            <TiptapEditor editor={editor} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

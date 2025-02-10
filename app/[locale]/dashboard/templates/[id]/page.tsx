"use client";
import { Button, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Editor } from "@/components/dashboard/editor/Editor";

import {
  useGetTemplateQuery,
  useGetTokensQuery,
  useUpdateTemplateMutation,
} from "@/redux/services/api";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";
import { DecoupledEditor } from "ckeditor5";
import { useTranslations } from "next-intl";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
  token: yup.string().required("Token is required"),
});
type TokenFormValues = yup.InferType<typeof schema>;

const Page = () => {
  const t = useTranslations("templates");
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editorInstance, setEditorInstance] = useState<DecoupledEditor | null>(
    null
  );
  const [
    updateTemplate,
    { isSuccess: templateUpdated, error: UpdateTemplateError },
  ] = useUpdateTemplateMutation();
  const { data, error, isLoading } = useGetTemplateQuery(id?.toString());
  const { data: tokendata } = useGetTokensQuery({
    page: 1,
    limit: 10,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const { setValue, watch } = useForm<TokenFormValues>({
    resolver: yupResolver(schema),
  });

  const selectedToken = watch("token");

  const handleAssign = () => {
    if (editorInstance) {
      editorInstance.model.change((writer) => {
        const position = editorInstance.model.document.selection.getFirstPosition();
        if (position) {
          writer.insertText(`{{${selectedToken}}}`, position);
        }
      });
    }
  };

  const handleSave = () => {
    if (editorInstance) {
      const updatedContent = editorInstance.getData();
      if (!updatedContent.trim()) {
        toast.error("The template is empty. Please add some content before saving.");
        return;
      }
      updateTemplate({
        id: data.id.toString(),
        body: { attachmentUrl: updatedContent},
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

  if (isLoading) return <div>{t("loading")}</div>;
  if (error) return <div>{t("error2")}: {JSON.stringify(error)}</div>;

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
              onClick={handleEdit}
            >
              {t("edit")}
            </Button>
          </div>
          <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
          <div className="text-gray-700 text-base leading-relaxed space-y-4">
            <div
              dangerouslySetInnerHTML={{ __html: data.attachmentUrl }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button
              className="bg-gradient-to-r from-deepBlue to-lightBlue text-white py-2 px-4 rounded-lg shadow"
              onClick={handleSave}
            >
              {t("save")}
            </Button>
            <Button
              className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow"
              onClick={() => setIsEditing(false)}
            >
              {t("cancel")}
            </Button>
          </div>

          <div className="flex gap-4">
            <div className="w-1/3">
              <form id="createTemplateForm" className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Token
                </label>
                <div className="flex flex-col gap-4">
                  <Select
                    label="Select Token"
                    placeholder="Choose a Token"
                    onSelectionChange={(value) => {
                      const selected = tokendata?.data.find(
                        (token: { id: string | undefined }) =>
                          token.id === value.currentKey
                      );
                      if (selected) {
                        setValue("token", selected.keyWord);
                      }
                    }}
                  >
                    {tokendata?.data.map(
                      (token: { id: string; keyWord: string }) => (
                        <SelectItem key={token.id} value={token.keyWord}>
                          {token.keyWord}
                        </SelectItem>
                      )
                    )}
                  </Select>
                  <Button
                    className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow"
                    onClick={handleAssign}
                  >
                    assign
                  </Button>
                </div>
              </form>
            </div>

            <div className="w-2/3">
              <Editor setEditor={setEditorInstance} data={data?.attachmentUrl} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Editor } from "@/components/dashboard/editor/Editor";
import {
  useGetDocumentQuery,
  useUpdateDocumentMutation,
} from "@/redux/services/api";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";
import { DecoupledEditor } from "ckeditor5";
import { ViewDocument } from "@/components/dashboard/documents/ViewDocument";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup.object({
  translations: yup.array().of(
    yup.object({
      token: yup.string().required(),
      value: yup.string().required()
    })
  )
});

type FormValues = yup.InferType<typeof schema>; 


const Page = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editorInstance, setEditorInstance] = useState<DecoupledEditor | null>(
    null
  );


  const [
    updateDocument,
    { error: UpdateDocumentError },
  ] = useUpdateDocumentMutation();

  const {
    data: documentData,
    error: documentError,
    isLoading: documentLoading,
  } = useGetDocumentQuery(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      translations: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "translations",
  });

  useEffect(() => {
    if (UpdateDocumentError && isFetchBaseQueryError(UpdateDocumentError)) {
      const errorMessage =
        UpdateDocumentError.data &&
        typeof UpdateDocumentError.data === "object" &&
        "message" in UpdateDocumentError.data
          ? (UpdateDocumentError.data as { message: string }).message
          : "An error occurred while deleting the document.";
      toast.error(errorMessage);
    }
  }, [UpdateDocumentError]);

  // Update the useEffect that handles tokens
  useEffect(() => {
    if (editorInstance) {
      const content = editorInstance.getData();
      const tokenMatches = content.match(/{{(.*?)}}/g);
      if (tokenMatches) {
        const uniqueTokens = [...new Set(tokenMatches.map(t => t.replace(/{{|}}/g, "")))];

        // Reset form with new tokens
        const initialTranslations = uniqueTokens.map(token => ({
          token,
          value: "",
        }));
        reset({ translations: initialTranslations });
      } else {
        // If no tokens found, clear the tokens and reset form
        reset({ translations: [] });
      }
    }
  }, [editorInstance, reset]);

  // Modified translate function
  const translate = handleSubmit((data) => {
    if (editorInstance) {
      let content = editorInstance.getData();

      data.translations?.forEach(({ token, value }) => {
        if (value?.trim()) {
          const placeholder = new RegExp(`{{${token}}}`, "g");
          content = content.replace(placeholder, value);
        }
      });
      editorInstance.setData(content);
      reset({ translations: data.translations?.map(t => ({ ...t, value: "" })) ?? [] });
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Modified handleSave
  const handleSave = async () => {
    if (editorInstance) {
      const updatedContent = editorInstance.getData();
      if (!updatedContent.trim()) {
        toast.error("The document is empty. Please add some content before saving.");
        return;
      }
      await updateDocument({
        id: documentData.id,
        body: { content: updatedContent},
      });
      toast.success("Document Updated successfully!");
    }
    setIsEditing(false);
  };

  if (!id) {
    return <div>Error: Invalid or missing UUID.</div>;
  }
  if (documentLoading) return <div>Loading...</div>;
  if (documentError)
    return <div>Error loading Document: {JSON.stringify(documentError)}</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg mx-auto p-6 min-h-full h-fit w-full">
      {!isEditing ? (
        <ViewDocument
          documentData={documentData}
          documentLoading={documentLoading}
          documentError={documentError}
          handleEdit={handleEdit}
        />
      ) : (
        <div className="mb-4">
            <div className="flex justify-end mb-4 gap-2">
              <Button
                className="bg-gradient-to-r from-deepBlue to-lightBlue text-white py-2 px-4 rounded-lg shadow"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>

            <div className="flex">

          {fields.length > 0 && (
            <div className="w-1/3">
            <form id="createTemplateForm" className="flex flex-col m-5" onSubmit={translate}>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Translate Tokens
              </label>
              <div className="items-end flex flex-col">
                {fields.map((field, index) => (
                  <div key={field.id} className=" gap-2 w-full">
                    <label>{field.token}:</label>
                    <Input
                      type="text"
                      {...control.register(`translations.${index}.value`, {
                        required: "This field is required",
                      })}
                      placeholder={`Replace ${field.token}`}
                      isInvalid={!!errors.translations?.[index]?.value}
                      errorMessage={errors.translations?.[index]?.value?.message}
                    />
                  </div>
                ))}
                <Button
                  type="submit"
                  className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow mt-4"
                >
                  Translate
                </Button>
              </div>
            </form>
          </div>
          )}

          <div className="w-full">
            <Editor setEditor={setEditorInstance} data={documentData?.DocumentMetadata[0]?.content} />
          </div>
        </div>
        </div>
      )}
    </div>
  );
};
export default Page;
"use client";
import { Button, Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Editor } from "@/components/dashboard/editor/Editor";
import {
  useGetDocumentQuery,
  useGetSignDocumentsQuery,
  useUpdateDocumentMutation,
} from "@/redux/services/api";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";
import { DecoupledEditor } from "ckeditor5";
import { ViewDocument } from "@/components/dashboard/documents/ViewDocument";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

// **Yup Validation Schema**
const schema = yup.object().shape({
  signName: yup.string().required("Please select a signature"),
  imageUrl: yup.string().required(),
});

type FormValues = yup.InferType<typeof schema>;

const Page = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(true);
  const [editorInstance, setEditorInstance] = useState<DecoupledEditor | null>(null);

  const { data: documentData, error: documentError, isLoading: documentLoading } = useGetDocumentQuery(id);
  const { data: signDocuments, isLoading: signLoading, isError: signError } = useGetSignDocumentsQuery({
    page: 1,
    limit: 10,
  });

  const [
    updateDocument,
    { isSuccess: DocumentUpdated, error: UpdateDocumentError },
  ] = useUpdateDocumentMutation();

  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { signName: "", imageUrl: "" },
  });

  const selectedSignName = watch("signName");
  const selectedSignature = signDocuments?.data.find((sig: { id: string }) => sig.id === selectedSignName);

  useEffect(() => {
    if (selectedSignature) {
      setValue("imageUrl", selectedSignature.documentSignImageUrl);
    }
  }, [selectedSignature, setValue]);

  useEffect(() => {
    if (UpdateDocumentError && isFetchBaseQueryError(UpdateDocumentError)) {
      const errorMessage =
        UpdateDocumentError.data &&
        typeof UpdateDocumentError.data === "object" &&
        "message" in UpdateDocumentError.data
          ? (UpdateDocumentError.data as { message: string }).message
          : "An error occurred while updating the document.";
      toast.error(errorMessage);
    }
  }, [UpdateDocumentError]);

  useEffect(() => {
    if (DocumentUpdated) {
      toast.success("Document Updated successfully!");
    }
  }, [DocumentUpdated]);

  const handleSave = () => {
    if (editorInstance) {
      const updatedContent = editorInstance.getData();
      if (!updatedContent.trim()) {
        toast.error("The document is empty. Please add some content before saving.");
        return;
      }
      updateDocument({ id: documentData.id, body: { content: updatedContent } });
    }
    reset();
    setIsEditing(false);
  };

  const handleSign = () => {
    if (editorInstance && selectedSignature) {
      const imageTag = `<img src="${selectedSignature.documentSignImageUrl}" alt="${selectedSignature.signName}" style="width:100px; max-height:100px"/>`;
      editorInstance.model.change(() => {
        const viewFragment = editorInstance.data.processor.toView(imageTag);
        const modelFragment = editorInstance.data.toModel(viewFragment);
        editorInstance.model.insertContent(modelFragment);
      });
      toast.success("Signature added!");
      
    reset();
    }
  };

  if (!id) return <div>Error: Invalid or missing UUID.</div>;
  if (documentLoading) return <div>Loading...</div>;
  if (documentError) return <div>Error loading Document: {JSON.stringify(documentError)}</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg mx-auto p-6 min-h-full h-fit w-full">
      {!isEditing ? (
        <ViewDocument documentData={documentData} documentLoading={documentLoading} documentError={documentError} handleEdit={() => setIsEditing(true)} />
      ) : (
        <div className="mb-4">
          <div className="flex justify-end mb-4 gap-2">
            <Button className="bg-gradient-to-r from-deepBlue to-lightBlue text-white py-2 px-4 rounded-lg shadow" onClick={handleSave}>
              Save
            </Button>
            <Button className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>

          <div className="flex">
            {/* Signature Selection */}
            <div className="w-1/3">
              <div className="m-5">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Signature</label>
                <Controller
                  name="signName"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isLoading={signLoading}
                      isDisabled={signError}
                      placeholder="Choose a signature"
                      onSelectionChange={(value) => field.onChange(value.currentKey)}
                    >
                      {signDocuments?.data.map((sig: { id: string; signName: string }) => (
                        <SelectItem key={sig.id} textValue={sig.id}>
                          {sig.signName}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.signName && <p className="text-red-500 text-xs mt-1">{errors.signName.message}</p>}

                {/* Display Selected Signature Image */}
                {selectedSignature && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Selected Signature:</p>
                    <img src={selectedSignature.documentSignImageUrl} alt={selectedSignature.signName} className="mt-2 max-w-20 max-h-20 border rounded" />
                  </div>
                )}

                <Button onClick={handleSign} className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow mt-4" disabled={!selectedSignature}>
                  Sign Document
                </Button>
              </div>
            </div>

            {/* Document Editor */}
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

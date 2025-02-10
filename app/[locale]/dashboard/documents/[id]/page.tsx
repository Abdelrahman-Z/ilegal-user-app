"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetDocumentQuery } from "@/redux/services/api";
import { ViewDocument } from "@/components/dashboard/documents/ViewDocument";
import { DocumentEditor } from "@/components/dashboard/documents/DocumentEditor";
import { TranslationForm } from "@/components/dashboard/documents/TranslationForm";
import { TextTranslator } from "@/components/dashboard/documents/TextTranslator";
import { DecoupledEditor } from "ckeditor5";
import { Accordion, AccordionItem } from "@nextui-org/react";

const Page = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editorInstance, setEditorInstance] = useState<DecoupledEditor | null>(
    null
  );

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
  const handleSave = () => {
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
          handleEdit={() => setIsEditing(true)}
        />
      ) : (
        <div className="flex">
          <div className="w-1/3">
            <Accordion>
              <AccordionItem
                key="1"
                aria-label="Token Translation"
                title="Token Translation"
                className="px-2"
              >
                <TranslationForm editorInstance={editorInstance} />
              </AccordionItem>

              <AccordionItem
                key="2"
                aria-label="Text Translation"
                title="Text Translation"
                className="px-2"
              >
                <TextTranslator
                  editorInstance={editorInstance}
                />
              </AccordionItem>
            </Accordion>
          </div>
          <DocumentEditor
            editorInstance={editorInstance}
            documentId={id as string}
            setEditorInstance={setEditorInstance}
            documentContent={documentData?.DocumentMetadata[0]?.content}
            onEditingChange={setIsEditing}
          />
        </div>
      )}
    </div>
  );
};

export default Page;

import React from "react";
import { Button } from "@nextui-org/react";

interface DocumentMetadata {
    content: string;
  }
  
  interface DocumentData {
    id: string;
    name: string;
    DocumentMetadata?: DocumentMetadata[];
  }
  
  interface DocumentError {
    message: string;
    status?: number;
  }
  
  interface DocumentViewerProps {
    documentData: DocumentData;
    documentLoading: boolean;
    documentError?: DocumentError | null;
    handleEdit: () => void;
  }

export const ViewDocument: React.FC<DocumentViewerProps> = ({
  documentData,
  documentLoading,
  documentError,
  handleEdit,
}) => {
  if (documentLoading) return <div>Loading...</div>;
  if (documentError)
    return <div>Error loading Document: {JSON.stringify(documentError)}</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {documentData.name}
        </h2>
        <Button
          className="bg-gradient-to-r from-deepRed to-brightRed text-white py-2 px-4 rounded-lg shadow"
          onClick={handleEdit}
        >
          Edit Document
        </Button>
      </div>
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
      <div className="text-gray-700 text-base leading-relaxed space-y-4">
        {documentData?.DocumentMetadata?.[0]?.content ? (
          <div
            dangerouslySetInnerHTML={{
              __html: documentData.DocumentMetadata[0].content,
            }}
          />
        ) : (
          <p>No content available</p>
        )}
      </div>
    </div>
  );
};


"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  Button,
} from "@heroui/react";
import { useGetAllTransferredDocumentsQuery } from "@/redux/services/api"; // Adjust the import based on your API service
import { useTranslations } from "next-intl";
import { Document } from "@/types";
import Link from "next/link";

export const AllTransfaredDocuments = () => {
  const t = useTranslations("transfaredDocuments.allTransferredDocuments");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch all transferred documents with pagination
  const { data, error, isLoading } = useGetAllTransferredDocumentsQuery({
    page,
    limit,
  });

  const handleDownload = async (url: string, fileName: string) => {
    try {
      // Fetch the file
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName; // Set the download filename
      document.body.appendChild(link); // Append to the DOM
      link.click(); // Programmatically click the link to trigger the download
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  if (isLoading) return <p>{t("loading")}</p>;
  if (error) return <p>{t("error")}</p>;

  const documents = data?.data || [];
  const totalPages = data?.metadata?.totalPages || 1;

  return (
    <div className="flex flex-col gap-5 w-full bg-white p-5 rounded-xl h-fit">
      {/* Document Cards */}
      <div className="gap-4 grid">
        {documents.map((document: Document) => (
          <Card
            key={document.id}
            className="flex flex-row bg-gradient-to-r from-deepBlue to-lightBlue justify-between p-2"
          >
            <CardHeader className="w-fit flex-col flex items-start">
              <h4 className="text-white font-medium text-large">
                {document.name}
              </h4>
              <p className="text-white/60 text-tiny">ID: {document.id}</p>
            </CardHeader>

            <div className="flex justify-end items-center gap-2">
              <Button
                as={Link}
                href={document.contentUrl} // URL to view the document
                target="_blank"
                className="bg-white p-2 rounded-xl"
              >
                {t("view")}
              </Button>
              <Button
                onPress={() =>
                  handleDownload(document.contentUrl, "Document.pdf")
                } // Trigger download on button press
                className="bg-white p-2 rounded-xl"
              >
                {t("download")} {/* Replace with your translation or text */}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

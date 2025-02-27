"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  Link,
  Button,
  Spinner,
} from "@heroui/react";
import {
  useGetPendingDocumentsQuery,
  useApproveDocumentMutation,
} from "@/redux/services/api";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";
import DeleteDocument from "./DeleteDocument";
import RejectModal from "./RejectModal";
import {Document} from '../../../types';
import { MdCheck } from "react-icons/md";
import { useTranslations } from "next-intl";

export const Pending = () => {
  const t = useTranslations("pending");
  const path = usePathname();
  const [page, setPage] = useState(1);
  const [searchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const limit = 5;
  const [approvedDocument, {isSuccess: isApproved, error:approvalError}] = useApproveDocumentMutation();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, error, isLoading } = useGetPendingDocumentsQuery({
    page,
    limit,
  });
  
 // Handle error toast
 useEffect(() => {
  if (approvalError && isFetchBaseQueryError(approvalError)) {
    const errorMessage =
      approvalError.data && typeof approvalError.data === "object" && "message" in approvalError.data
        ? (approvalError.data as { message: string }).message
        : "An error occurred while deleting the template.";
    toast.error(errorMessage);
  }
}, [ approvalError]);

// Handle success toast
useEffect(() => {
  if (isApproved) {
    toast.success("Template Approved successfully!");
  }
}, [isApproved]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);
  
  if (isLoading) return (
    <div className="flex items-center justify-center h-full w-full bg-white ">
      <Spinner size="lg" label={t('loading')} color="primary"/>
    </div>
  );;
  if (error) return <p>{t("error")}</p>;

  const documents = data?.data || [];
  const totalPages = data?.metadata?.totalPages || 1;

  return (
    <div className="flex flex-col gap-5 w-full bg-white p-5 rounded-xl">
      <div className="gap-4 grid">
        {documents.map((document: Document) => (
          <Card
            key={document.id}
            className="flex flex-row bg-gradient-to-r from-deepBlue to-lightBlue justify-between p-2"
          >
            <div className="flex items-center">
              <CardHeader className="flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                {t("name")}
                </p>
                <h4 className="text-white font-medium text-small">
                  {document.name}
                </h4>
                <p className="text-tiny text-white/60">
                {t("language")}: {document.language}
                </p>
              </CardHeader>
            </div>

            <CardFooter className="flex justify-end items-center w-fit gap-2">
              {/* APPROVE */}
              <Button isIconOnly color="success" onClick={() => approvedDocument(document.id)} className="!p-0">
                      <MdCheck className="text-white" />
              </Button>
              <RejectModal documentId={document.id} />

              {/* VIEW */}
              <Link
                href={`${path}/${document.id}`}
                className=" bg-white p-2 rounded-xl"
              >
                {t("view")}
              </Link>
              {/* DELETE */}
              <DeleteDocument documentId={document.id} />
        
            </CardFooter>
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


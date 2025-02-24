"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  Pagination,
  Link,
  Spinner,
} from "@heroui/react";
import { useGetRejectedDocumentsQuery } from "@/redux/services/api"; // New hook for rejected documents
import { usePathname } from "next/navigation";
import { Document } from '../../../types';
import { useTranslations } from "next-intl";
import DeleteDocument from "./DeleteDocument";

export const Rejected = () => {
  const t = useTranslations("rejected");
  const path = usePathname();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, error, isLoading } = useGetRejectedDocumentsQuery({
    page,
    limit,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center h-full w-full bg-white ">
      <Spinner size="lg" label={t('loading')} color="primary"/>
    </div>
  );
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
              <Image
                removeWrapper
                alt={`Document ${document.id}`}
                className="w-10 h-10 object-cover rounded-full"
              />
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

            <CardFooter className="flex items-center w-fit gap-2">
              {/* VIEW */}
              <Link
                href={`${path}/${document.id}`}
                className="bg-white p-2 rounded-xl"
              >
                {t("view")}
              </Link>
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

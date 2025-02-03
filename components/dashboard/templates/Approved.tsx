"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  Pagination,
  Link,
} from "@nextui-org/react";
import {
  useGetApprovedTemplatesQuery,
} from "@/redux/services/api";
import { usePathname } from "next/navigation";
import DeleteTemplate from "./DeleteTemplate";
import {Template} from '../../../types';
import { useTranslations } from "next-intl";


export const Approved = () => {
  const t = useTranslations("template");
  const path = usePathname();
  const [page, setPage] = useState(1);
  const [searchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const limit = 5;
 
  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch templates with pagination and search
  const { data, error, isLoading } = useGetApprovedTemplatesQuery({
    page,
    limit,
  });

  // Reset to page 1 when search term changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  if (isLoading) return <p>{t("loading")}</p>;
  if (error) return <p>{t("error")}</p>;

  const templates = data?.data || [];
  const totalPages = data?.metadata?.totalPages || 1;
  

  return (
    <div className="flex flex-col gap-5 w-full bg-white p-5 rounded-xl">
      {/* Template Cards */}
      <div className="gap-4 grid">
        {templates.map((template : Template) => (
          <Card
            key={template.id}
            className="flex flex-row bg-gradient-to-r from-deepBlue to-lightBlue justify-between p-2"
          >
            <div className="flex items-center">
              <Image
                removeWrapper
                alt={`Template ${template.id}`}
                className="w-10 h-10 object-cover rounded-full"
                src={template.imageUrl || "https://via.placeholder.com/300"}
              />
              <CardHeader className="flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                {t("name")}
                </p>
                <h4 className="text-white font-medium text-small">
                  {template.name}
                </h4>
                <p className="text-tiny text-white/60">
                {t("language")}: {template.language}
                </p>
              </CardHeader>
            </div>

            <CardFooter className="flex justify-end items-center w-fit gap-2">
              <Link
                href={`${path}/${template.id}`}
                className=" bg-white p-2 rounded-xl"
              >
                {t("view")}
              </Link>
              <DeleteTemplate templateId={template.id} />
              
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

"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { useGetJurisdictionsQuery } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { UpdateJurisdiction } from "./UpdateJurisdictions";
import DeleteJurisdictionModal from "./DeleteJurisdiction";
import { useTranslations } from "next-intl";


export function AllJurisdictions() {
  const t = useTranslations("jurisdictions");
  const [page, setPage] = React.useState(1);

  // Fetch jurisdictions data using RTK Query
  const { data, isLoading, isError, error } = useGetJurisdictionsQuery({
    page,
    limit: 10,
  });
  const totalPages = data?.metaData?.totalPages || 0;

  if (isError) {
    return (
      <>
        {error && isFetchBaseQueryError(error) && (
          <div className="mt-4">
            <p className="text-red-500 text-sm">
              {error.data &&
              typeof error.data === "object" &&
              "message" in error.data
                ? (error.data as { message: string }).message
                : "An error occurred. Please try again."}
            </p>
          </div>
        )}{" "}
      </>
    );
  }

  return (
    <Table
      aria-label="Jurisdictions Table"
      bottomContent={
        totalPages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="name">{t("allJurisdictions.name")}</TableColumn>
        <TableColumn key="referenceUrl">{t("allJurisdictions.reference")}</TableColumn>
        <TableColumn key="imageUrl">{t("allJurisdictions.image")}</TableColumn>
        <TableColumn key="actions">{t("allJurisdictions.actions")}</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.data ?? []}
        loadingContent={<Spinner />}
        loadingState={isLoading ? "loading" : "idle"}
      >
        {(item) => (
          <TableRow key={item?.id}>
            <TableCell>{item?.name}</TableCell>
            <TableCell>{item?.referenceUrl}</TableCell>
            <TableCell>{item?.imageUrl}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <UpdateJurisdiction id={item.id} currentName={item.name} />
                <DeleteJurisdictionModal id={item.id} />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

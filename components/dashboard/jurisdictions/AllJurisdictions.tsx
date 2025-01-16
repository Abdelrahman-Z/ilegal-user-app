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

export function AllJurisdictions() {
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
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="referenceUrl">Reference URL</TableColumn>
        <TableColumn key="imageUrl">Image URL</TableColumn>
        <TableColumn key="actions">Actions</TableColumn>
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
              <UpdateJurisdiction id={item.id} currentName={item.name}/>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

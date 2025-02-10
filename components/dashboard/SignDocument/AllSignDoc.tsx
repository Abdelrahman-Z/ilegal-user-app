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
  Image
} from "@nextui-org/react";
import { useGetSignDocumentsQuery } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { UpdateSignDocument } from "./UpdateSignDoc";
import DeleteSignDocumentModal from "./DeleteSignDoc";
import { SignDocuments } from "@/types";


export function AllSignDocuments() {
  const [page, setPage] = React.useState(1);

  const { data, isLoading, isError, error } = useGetSignDocumentsQuery({
    page ,
    limit : 10
  });
  const totalPages = data && data.metadata?.totalPages;
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
      aria-label="Sign Document Table"
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
        <TableColumn key="imageUrl">Image</TableColumn>
        <TableColumn key="actions">Actions</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.data ?? []}
        loadingContent={<Spinner />}
        loadingState={isLoading ? "loading" : "idle"}
      >
        {(item: SignDocuments) => (
          <TableRow key={item?.id}>
            <TableCell>{item?.signName}</TableCell>
            <TableCell>
              <Image src={item?.documentSignImageUrl} alt={item?.signName} 
                      className="max-w-20 max-h-20"/>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <UpdateSignDocument id={item?.id} currentName={item?.signName} currentimg={item?.documentSignImageUrl} />
                <DeleteSignDocumentModal id={item?.id} />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

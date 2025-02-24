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
} from "@heroui/react";
import { useGetAllPermissionsQuery } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { useTranslations } from "next-intl";


export function AllPermissions() {
  const t = useTranslations("permissions");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Fetch permissions data using RTK Query
  const { data, isLoading, isError, error } = useGetAllPermissionsQuery({
    page,
    limit,
  });
  interface Permission {
    id: string;
    name: string;
    category: string;
    mainCategory: string;
  }

  const permissions: Permission[] = data?.data || [];
  const totalPages = data?.metaData?.totalPages || 0;

  if (isError) {
    return (
      <div className="mt-4">
        {error && isFetchBaseQueryError(error) && (
          <p className="text-red-500 text-sm">
            {error.data &&
            typeof error.data === "object" &&
            "message" in error.data
              ? (error.data as { message: string }).message
              : "An error occurred. Please try again."}
          </p>
        )}
      </div>
    );
  }

  return (
    <Table
      aria-label="Permissions Table"
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
        <TableColumn key="name">{t("allPermissions.name")}</TableColumn>
        <TableColumn key="category">{t("allPermissions.category")}</TableColumn>
        <TableColumn key="mainCategory">{t("allPermissions.mainCategory")}</TableColumn>
      </TableHeader>
      <TableBody
        items={permissions}
        loadingContent={<Spinner />}
        loadingState={isLoading ? "loading" : "idle"}
      >
        {permissions.map((permission) => (
          <TableRow key={permission.id}>
            <TableCell>{permission.name}</TableCell>
            <TableCell>{permission.category}</TableCell>
            <TableCell>{permission.mainCategory}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

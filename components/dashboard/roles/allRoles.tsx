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
import { useGetRolesQuery } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { Role } from "@/types";
import DeleteRoleModal from "./deleteRole";
import UpdateRoleModal from "./updateRole";
import { AddPermissions } from "./addPermissions";
import { useTranslations } from "next-intl";


export function AllRoles() {
  const t = useTranslations("roles");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Fetch roles data using RTK Query
  const { data, isLoading, isError, error } = useGetRolesQuery({
    page,
    limit,
  });
  const roles = data?.roles || [];
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
      aria-label="Roles Table"
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
        <TableColumn key="name">{t("allRoles.name")}</TableColumn>
        <TableColumn key="actions">{t("allRoles.actions")}</TableColumn>
      </TableHeader>
      <TableBody
        items={roles}
        loadingContent={<Spinner />}
        loadingState={isLoading ? "loading" : "idle"}
      >
        {(item:Role) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {/* Example actions */}
                <UpdateRoleModal id={item.id} currentRoleName={item.name}/>
                <AddPermissions rolePermissions={item.permissions.map((el)=> el.id)} roleId={item.id}/>
                <DeleteRoleModal id={item.id} roleName={item.name}/>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

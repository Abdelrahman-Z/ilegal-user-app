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
  Avatar,
} from "@nextui-org/react";
import { useGetUsersQuery } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { User } from "@/types";
import ToggleUserStatus from "./ToggleUsers";
import DeleteUserModal from "./DeleteUser";
import { UpdateUserModal } from "./UpdateUser";
import { AddRole } from "./AddRole";
import { useTranslations } from "next-intl";

export function AllUsers() {
  const t = useTranslations("users");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Fetch users data using RTK Query
  const { data, isLoading, isError, error } = useGetUsersQuery({
    page,
    limit,
  });
  const users = data?.data || [];
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
    <>
      <Table
        aria-label="Users Table"
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
          <TableColumn key="userName">{t("allUsers.userName")}</TableColumn>
          <TableColumn key="email">{t("allUsers.email")}</TableColumn>
          <TableColumn key="phone">{t("allUsers.phone")}</TableColumn>
          <TableColumn key="isActive">{t("allUsers.status")}</TableColumn>
          <TableColumn key="imageUrl">{t("allUsers.avatar")}</TableColumn>
          <TableColumn key="actions">{t("allUsers.actions")}</TableColumn>
        </TableHeader>
        <TableBody
          items={users}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(item: User) => (
            <TableRow key={item.id}>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>
                <ToggleUserStatus
                  userId={item.id}
                  isActive={item.isActive}
                  key={item.id}
                />
              </TableCell>
              <TableCell>
                <Avatar src={item.imageUrl} alt={item.userName} size="sm" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {/* Add your action buttons for editing and deleting */}
                  <UpdateUserModal
                    id={item.id}
                    currentPhone={item.phone}
                    src={item.imageUrl}
                    currentUserName={item.userName}
                  />
                  <AddRole userId={item.id}/>
                  <DeleteUserModal
                    id={item.id}
                    userName={item.userName}
                  />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

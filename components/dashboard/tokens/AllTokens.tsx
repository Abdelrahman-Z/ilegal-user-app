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
import { useGetTokensQuery } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { UpdateToken } from "./UpdateTokens";
import { DeleteToken } from "./DeleteToken";
import { Token } from "@/types";
import { useTranslations } from "next-intl";

export function AllTokens() {
  const t = useTranslations("tokens");
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isError, error } = useGetTokensQuery({
    page,
    limit: 10,
  });
  React.useEffect(() => {
    if(data?.data) {
      console.log(data.data);
    }
  }, [data]);

  if (isError) {
    return (
      <div className="mt-4">
        <p className="text-red-500 text-sm">
          {(error &&
            isFetchBaseQueryError(error) &&
            "data" in error &&
            (error.data as { message: string }).message) ||
            "An error occurred. Please try again."}
        </p>
      </div>
    );
  }

  return (
    <Table
      aria-label="Tokens Table"
      bottomContent={
        data?.metaData?.totalPages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={data.metaData.totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="name">{t("allTokens.name")}</TableColumn>
        <TableColumn key="actions">{t("allTokens.actions")}</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.data ?? []}
        loadingContent={<Spinner />}
        loadingState={isLoading ? "loading" : "idle"}
      >
        {(item: Token) => (
          <TableRow key={item?.id}>
            <TableCell>{item?.keyWord}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <UpdateToken
                  id={item.id}
                  currentKeyword={item?.keyWord}
                />
                <DeleteToken name={item?.keyWord} id={item.id} />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

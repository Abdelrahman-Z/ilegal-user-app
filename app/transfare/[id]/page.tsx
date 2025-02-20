"use client";
import { usePreviewDocumentQuery } from "@/redux/services/api";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();
  console.log('id' , id)
  const params = useSearchParams();
  const otp = params.get("otp");
  const { data, error, isLoading } = usePreviewDocumentQuery({id ,otp});
  data && console.log(data)
  return <div>page</div>;
};

export default Page;

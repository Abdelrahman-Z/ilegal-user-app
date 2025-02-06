'use client'
import { redirect, useParams } from "next/navigation";

export default function Page () {
  const { locale } = useParams();
  return redirect(`/${locale}/dahsboard/documents`);
};

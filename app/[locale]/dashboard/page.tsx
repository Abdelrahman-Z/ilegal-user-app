'use client'
import { redirect, useParams } from "next/navigation";

export default function DashboardPage() {
  const { locale } = useParams();
  return redirect(`/${locale}/dashboard/templates`);
}

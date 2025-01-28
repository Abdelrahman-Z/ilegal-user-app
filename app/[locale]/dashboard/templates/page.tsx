"use client";

import { CreateTemplate } from "@/components/dashboard/templates/AddTemplate";
import { PreConfiguredTemplates } from "@/components/dashboard/templates/PreConfiguredTemplates";
import { MyTemplates } from "@/components/dashboard/templates/MyTemplates";
import { Pending } from "@/components/dashboard/templates/Pending";
import { Approved } from "@/components/dashboard/templates/Approved";
import { Rejected } from "@/components/dashboard/templates/Rejected";
import { Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const { locale } = useParams();
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto flex-grow h-fit">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Templates</h2>
        <div className="flex gap-4">
          <CreateTemplate />
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
      {/* Template List */}
      <div className="flex flex-col items-center flex-1">
        <Tabs
          color="primary"
          defaultSelectedKey={"preConfigure"}
          aria-label="Dashboard Tabs"
        >
          {/* Pre Configured Templates*/}
          <Tab
            key="preConfigure"
            className="w-full flex-1"
            title="preConfigure"
          >
            <PreConfiguredTemplates />
          </Tab>

          {/* My Templates */}
          <Tab className="w-full flex-1" key="myTemplates" title="my Templates">
            <MyTemplates />
          </Tab>

          {/* Approved Templates*/}
          <Tab className="w-full flex-1" key="Approved" title="Approved">
            <Approved />
          </Tab>

          {/* Pending Templates*/}
          <Tab className="w-full flex-1" key="pinding" title="Pending">
            <Pending />
          </Tab>

          {/* Rejected Templates*/}
          <Tab className="w-full flex-1" key="rejected" title="Rejected">
            <Rejected />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

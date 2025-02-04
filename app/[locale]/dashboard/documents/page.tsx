"use client";

import { CreateDocument } from "@/components/dashboard/documents/AddDocument";
import { MyDocuments } from "@/components/dashboard/documents/MyDocuments";
import { Pending } from "@/components/dashboard/documents/Pending";
import { Approved } from "@/components/dashboard/documents/Approved";
import { Tab, Tabs } from "@nextui-org/react";

export default function Page() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto flex-grow h-fit min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Documents</h2>
        <div className="flex gap-4">
          <CreateDocument />
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
      {/* Documents List */}
      <div className="flex flex-col items-center flex-1">
        <Tabs
          color="primary"
          defaultSelectedKey={"myDocuments"}
          aria-label="Dashboard Tabs"
        >
          {/* My Documents */}
          <Tab className="w-full flex-1" key="myDocuments" title="My Documents">
            <MyDocuments />
          </Tab>

          {/* Approved Documents*/}
          <Tab className="w-full flex-1" key="Approved" title="Approved">
            <Approved />
          </Tab>

          {/* Pending Documents*/}
          <Tab className="w-full flex-1" key="pinding" title="Pending">
            <Pending />
          </Tab>

        </Tabs>
      </div>
    </div>
  );
}
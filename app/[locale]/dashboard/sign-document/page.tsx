"use client";

import { Approved } from "@/components/dashboard/documents/Approved";
import { AddSignDocument } from "@/components/dashboard/SignDocument/AddSignDoc";
import { AllSignDocuments } from "@/components/dashboard/SignDocument/AllSignDoc";
import { Tab, Tabs } from "@nextui-org/react";

export default function Page() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto overflow-auto flex-grow flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Sign Document</h2>
        <AddSignDocument />
      </div>
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>

      <div className="flex flex-col items-center flex-1">
        <Tabs
          color="primary"
          defaultSelectedKey={"signDocuments"}
          aria-label="Dashboard Tabs"
        >
          {/* Sign Documents*/}
          <Tab
            className="w-full flex-1"
            key="signDocuments"
            title="Sign Documents"
          >
            <div className="flex flex-col items-center flex-1">
              <AllSignDocuments />
            </div>
          </Tab>

          {/* Approved Documents*/}
          <Tab
            className="w-full flex-1"
            key="Approved"
            title="Approved Documents"
          >
            <Approved />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

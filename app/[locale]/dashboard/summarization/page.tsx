"use client";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { StaticComponent } from "@/components/dashboard/summrization/static";
import { DynamicComponent } from "@/components/dashboard/summrization/dynamic";
import { AddQuestion } from "@/components/dashboard/summrization/addQuestion";
import { PreConfigure } from "@/components/dashboard/summrization/PreConfigure";

const DashboardPage = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto overflow-auto flex-grow flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Summrization</h2>
      </div>
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
      <div className="flex flex-col items-center flex-1">
        <Tabs
          color="primary"
          defaultSelectedKey={"static"}
          aria-label="Dashboard Tabs"
        >
          <Tab key="static" className="w-full flex-1" title="Static">
            <StaticComponent />
          </Tab>
          <Tab className="w-full flex-1" key="dynamic" title="Dynamic">
            <DynamicComponent />
          </Tab>
          <Tab
            className="w-full flex-1"
            key="preConfigure"
            title="preConfigure"
          >
            <PreConfigure />
          </Tab>
          <Tab className="w-full flex-1" key="addQuestion" title="Add Question">
            <AddQuestion />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;

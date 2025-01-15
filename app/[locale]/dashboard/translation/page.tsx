"use client";

import { Static } from "@/components/dashboard/translation/Static";
import React from "react";

// Yu with stricter string validati

const DashboardPage = () => {
  

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto overflow-auto flex-grow flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Translation</h2>
      </div>
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
      <Static/>
    </div>
  );
};

export default DashboardPage;

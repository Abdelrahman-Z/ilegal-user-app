import React from "react";
import SectionTitle from "./SectionTitle";
import { Button, Divider } from "@nextui-org/react";

const AboutUsSection = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center w-full p-8 gap-4">
      {/* Left Image Placeholder */}
      <div className="sm:w-1/2 w-full flex justify-center">
        <div className="bg-gray-300 w-80 h-48 rounded-md"></div>
      </div>
        <Divider className="bg-black h-60 hidden sm:block" orientation="vertical" />
      {/* Right Content */}
      <div className="sm:w-1/2 w-full">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <SectionTitle title="About Us"/>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">
          iLegal® Solutions® is an innovative one-stop-shop platform for document management.
        </p>
        <p className="text-gray-700 mb-6">
          iLegal® Solutions® is a digital platform that automates document creation, review, translation*, validation, and extraction and can be customized to an organizations specific requirements.
        </p>

        {/* Learn More Button */}
        <Button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
          Learn more...
        </Button>
      </div>
    </div>
  );
};

export default AboutUsSection;

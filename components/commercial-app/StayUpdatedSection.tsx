import React from "react";
import SectionTitle from "./SectionTitle";
import { Button, Divider, Input } from "@nextui-org/react";

const StayUpdatedSection = () => {
  return (
    <div className="flex items-center flex-wrap sm:flex-nowrap w-full p-8 gap-8">
      {/* Left Image Placeholder */}
      <div className="sm:w-1/2 w-full flex justify-center">
        <div className="bg-gray-300 w-80 h-48 rounded-md"></div>
      </div>
        <Divider orientation="vertical" className="h-80 hidden sm:block"/>
      {/* Right Content */}
      <div className="sm:w-1/2 w-full">
        {/* Header */}
        <SectionTitle title="Stay Updated"/> 

        {/* Description */}
        <p className="text-gray-700 mb-4 text-2xl">
          Sign up for periodic updates for the latest on our <br/> new services,
          offers, and customer experience.
        </p>
        <p className="text-gray-700 mb-6 text-2xl">
          Lorem Ipsum is simply dummy text of the printing <br/> and typesetting
          industry.
        </p>

        {/* Subscription Form */}
        <div className="flex flex-col w-full  gap-4 mb-4">
          <Input
            type="email"
            placeholder="Enter your email id..."
            className="w-full sm:w-full flex-grow p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
          />
          <Button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
            Send
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-gray-500 text-xs">
          By providing your email address, you agree to the Privacy Policy and
          Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

export default StayUpdatedSection;

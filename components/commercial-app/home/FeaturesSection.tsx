'use client'

import { Button } from "@heroui/react";
import Image from "next/image";

export const FeaturesSection = () => {
  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
          {/* Left side - Image */}
          <div className="relative h-[400px]">
            <Image
              src="/images/law-books.svg"
              alt="Law Books"
              fill
              className="object-cover rounded-lg shadow-lg"
              style={{
                objectPosition: 'center',
              }}
            />
          </div>

          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 h-full w-[2px] bg-deepBlue transform -translate-x-1/2" />

          {/* Right side - Features */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Features
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <div className="min-w-2 h-2 w-2 rounded-full bg-deepBlue mt-2" />
                <p className="text-gray-700">
                  <span className="font-semibold">Streamline Your Workflow</span>
                  {" "}with the convenience of our all-in-one document automation platform.
                </p>
              </li>

              <li className="flex items-start gap-2">
                <div className="min-w-2 h-2 w-2 rounded-full bg-deepBlue mt-2" />
                <p className="text-gray-700">
                  <span className="font-semibold">Benefit from Arabic and English</span>
                  {" "}with relevant bi-lingual support.
                </p>
              </li>

              <li className="flex items-start gap-2">
                <div className="min-w-2 h-2 w-2 rounded-full bg-deepBlue mt-2" />
                <p className="text-gray-700">
                  <span className="font-semibold">Ensure Security</span>
                  {" "}of your documents with the power of private blockchain technology.
                </p>
              </li>

              <li className="flex items-start gap-2">
                <div className="min-w-2 h-2 w-2 rounded-full bg-deepBlue mt-2" />
                <p className="text-gray-700">
                  <span className="font-semibold">Access Insights Based on Local Regulations,</span>
                  {" "}in real time, through our professional bilingual AI enabled assistant (QazamAI™).
                </p>
              </li>
            </ul>

            <Button
              className="bg-deepBlue text-white w-fit mt-4 px-8"
              size="lg"
            >
              Learn more...
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

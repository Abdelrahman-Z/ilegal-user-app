'use client'

import Image from "next/image";

export const OurValues = () => {
  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Title with decorative elements */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {/* Left decorative line with point */}
          <div className="flex items-center">
            <div className="w-24 h-[2px] bg-[#114B7E]" />
            <div className="w-2 h-2 rounded-full bg-[#114B7E]" />
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-[#114B7E] px-4">Our Values</h2>

          {/* Right decorative line with point */}
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#114B7E]" />
            <div className="w-24 h-[2px] bg-[#114B7E]" />
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-20 relative">
          {/* Connecting Line between sections */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] bg-[#FF4E78]">
            {/* Point at the end of line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-4">
              <div className="w-3 h-3 rounded-full bg-[#FF4E78]" />
            </div>
          </div>

          {/* First Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Text Content */}
            <div className="w-full md:w-1/2">
              <div className="relative pl-6 md:pl-8">
                {/* Vertical Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4E78]" />
                <p className="text-gray-700 leading-relaxed text-lg">
                  Lorem ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>
              </div>
            </div>
            {/* Image */}
            <div className="w-full md:w-1/2 h-[300px] relative">
              <Image
                src="/images/values-1.svg"
                alt="Team discussing legal documents"
                fill
                className="object-cover rounded-lg shadow-lg"
                quality={100}
              />
            </div>
          </div>

          {/* Second Section - Reversed */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
            {/* Image */}
            <div className="w-full md:w-1/2 h-[300px] relative">
              <Image
                src="/images/values-2.svg"
                alt="Team collaborating on legal work"
                fill
                className="object-cover rounded-lg shadow-lg"
                quality={100}
              />
            </div>
            {/* Text Content */}
            <div className="w-full md:w-1/2">
              <div className="relative pr-6 md:pr-8">
                {/* Vertical Line */}
                <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-[#FF4E78]" />
                <p className="text-gray-700 leading-relaxed text-lg text-right">
                  Lorem ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurValues;

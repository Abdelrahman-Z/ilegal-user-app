'use client'

import { Button } from "@heroui/react";

export const OurTeam = () => {
  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Title with decorative elements */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {/* Left decorative line with point */}
          <div className="flex items-center">
            <div className="w-32 h-[2px] bg-[#114B7E]" />
            <div className="w-2 h-2 rounded-full bg-[#114B7E]" />
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-[#114B7E] px-4">Meet our team</h2>

          {/* Right decorative line with point */}
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#114B7E]" />
            <div className="w-32 h-[2px] bg-[#114B7E]" />
          </div>
        </div>

        {/* Content with vertical lines */}
        <div className="relative max-w-4xl mx-auto px-12">
          {/* Left vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#114B7E]" />
          
          {/* Content */}
          <div className="space-y-8 text-center">
            <p className="text-gray-700 leading-relaxed text-lg">
              Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.
            </p>

            {/* Button */}
            <div className="flex justify-center">
              <Button 
                className="bg-[#114B7E] text-white px-12 py-2.5 min-w-[180px] rounded-none hover:bg-[#1A6DBF] transition-colors text-base"
              >
                View the team
              </Button>
            </div>
          </div>

          {/* Right vertical line */}
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#114B7E]" />
        </div>
      </div>
    </div>
  );
};

export default OurTeam;

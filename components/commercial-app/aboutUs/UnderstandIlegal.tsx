'use client'

import Image from "next/image";

export const UnderstandIlegal = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#114B7E] to-[#1A6DBF] py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 relative">
          {/* Left Content */}
          <div className="w-full md:w-1/3">
            {/* Title */}
            <div className="pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Understand
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                iLegal
              </h2>
            </div>
          </div>

          {/* Vertical Line - Repositioned */}
          <div className="hidden md:block absolute left-[33%] top-0 bottom-0 w-[2px] bg-white/80" />

          {/* Right Content - Image/Video Placeholder */}
          <div className="w-full md:w-2/3 relative">
            <div className="aspect-video relative rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm">
              {/* Image */}
              <Image
                src="/images/understand-ilegal.jpg"
                alt="Understanding iLegal"
                fill
                className="object-cover rounded-lg"
                quality={100}
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                  {/* Play Icon */}
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#114B7E] border-b-[12px] border-b-transparent ml-1">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderstandIlegal;

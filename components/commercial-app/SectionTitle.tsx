import { cn } from "@nextui-org/react";
import React from "react";


interface Section {

    title: string
    className?: string;
}
const SectionTitle = ({title , className}: Section) => {
  return (
    <div className={cn("flex items-center justify-center w-96", className)}>
      {/* Left Line */}
      <div className="flex-grow h-[1px] bg-gray-400"></div>

      {/* Left Dot */}
      <div className="w-2 h-2 bg-black rounded-full mx-2"></div>

      {/* Text */}
      <h2 className="text-lg font-bold text-black mx-2">{title}</h2>

      {/* Right Dot */}
      <div className="w-2 h-2 bg-black rounded-full mx-2"></div>

      {/* Right Line */}
      <div className="flex-grow h-[1px] bg-gray-400"></div>
    </div>
  );
};

export default SectionTitle;

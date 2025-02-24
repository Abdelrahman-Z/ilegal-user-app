import { cn } from "@heroui/react";
import React from "react";

interface Section {
  title: string;
  className?: string;
  titleStyle?: string;
  lineStyle?: string;
  dotStyle?: string;
}
const SectionTitle = ({
  title,
  className,
  titleStyle,
  dotStyle,
  lineStyle,
}: Section) => {
  return (
    <div className={cn("flex items-center justify-center w-96", className)}>
      {/* Left Line */}
      <div className={cn("flex-grow h-[1px] bg-gray-400", lineStyle)}></div>

      {/* Left Dot */}
      <div className={cn("w-2 h-2 bg-black rounded-full mx-2", dotStyle)}></div>

      {/* Text */}
      <h2 className={cn("text-lg font-bold text-black mx-2", titleStyle)}>
        {title}
      </h2>

      {/* Right Dot */}
      <div className={cn("w-2 h-2 bg-black rounded-full mx-2", dotStyle)}></div>

      {/* Right Line */}
      <div className={cn("flex-grow h-[1px] bg-gray-400", lineStyle)}></div>
    </div>
  );
};

export default SectionTitle;

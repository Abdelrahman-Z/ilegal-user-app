import React from "react";
import SectionTitle from "../SectionTitle";

const OverviewSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-8">
      <div className=" border border-solid border-black border-y-transparent px-5">
        <div className="flex w-full items-center justify-center">
          {/* Left Vertical Line */}

          {/* Header */}
          <SectionTitle title="Overview" />

          {/* Right Vertical Line */}
        </div>

        {/* Content */}
        <div className="mt-6 max-w-3xl text-center text-gray-700">
          <p className="mb-4">
            Lorem Ipsum has been the industrys standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <p>
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;

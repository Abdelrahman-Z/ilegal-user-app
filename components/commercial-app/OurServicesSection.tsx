import React from "react";
import SectionTitle from "./SectionTitle";
import { Divider } from "@nextui-org/react";

const ServicesSection = () => {
  const services = [
    {
      title: "Document Creation",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      title: "Document Creation",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      title: "Document Creation",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      title: "Document Creation",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      title: "Document Creation",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      title: "Document Creation",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
  ];

  return (
    <div className="p-8 sm:flex gap-10">
      {/* Header */}
        <Divider orientation="vertical" className=" h- bg-[#A5A3A3]  w-1 hidden sm:block" />
      <div>
        <div className="flex items-center justify-center mb-8">
          <SectionTitle title="Our Services" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#555] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              {/* Placeholder Image */}
              <div className="bg-gray-300 w-20 h-24 rounded-md mb-4 mx-auto"></div>

              {/* Service Title */}
              <h3 className="text-lg font-bold mb-2 text-white">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-white text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
            Learn more...
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;

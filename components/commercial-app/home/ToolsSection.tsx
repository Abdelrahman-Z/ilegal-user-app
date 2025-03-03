'use client'

import { Button } from "@heroui/react";

const tools = [
  {
    icon: "/images/ai-assistant-icon.svg",
    title: "AzzamAI® Bilingual Professional Assistant",
    description: "Q&A knowledge extraction and summarization based on local regulations in real time",
    iconBgColor: "bg-[#E91E63]" // Pink background for AI assistant icon
  },
  {
    icon: "/images/document-icon.svg",
    title: "Document Automation",
    description: "Creation, review, translation, e-signature, blockchain validation, & extraction by optical character recognition",
    iconBgColor: "bg-[#E91E63]" // Pink background for document icon
  }
];

export const ToolsSection = () => {
  return (
    <div className="w-full bg-[#114B7E] py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-white text-center mb-20">
          Tools
        </h2>

        {/* Tools Stack */}
        <div className="flex flex-col space-y-16">
          {tools.map((tool, index) => (
            <div key={index} className="flex flex-col items-start">
              {/* Icon and Content Container */}
              <div className="flex items-start gap-6">
                {/* Circular Icon */}
                <div className={`w-14 h-14 rounded-full ${tool.iconBgColor} flex items-center justify-center flex-shrink-0`}>
                  <img
                    src={tool.icon}
                    alt={tool.title}
                    className="w-8 h-8 object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium text-white">
                    {tool.title}
                  </h3>
                  <p className="text-white/90 text-sm font-light mb-4">
                    {tool.description}
                  </p>
                  <Button
                    className="bg-white hover:bg-white/90 text-[#114B7E] w-fit px-6 py-1"
                    size="sm"
                    radius="none"
                  >
                    Learn more...
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;

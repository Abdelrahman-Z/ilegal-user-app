'use client'

import { Button } from "@heroui/react";
import { useTranslations } from 'next-intl';

export const ToolsSection = () => {
  const t = useTranslations('home.toolsSection');

  const tools = [
    {
      icon: "/images/ai-assistant-icon.svg",
      title: t('tools.azzamAI.title'),
      description: t('tools.azzamAI.description'),
      alt: t('tools.azzamAI.alt'),
      iconBgColor: "bg-[#E91E63]" // Pink background for AI assistant icon
    },
    {
      icon: "/images/document-icon.svg",
      title: t('tools.documentAutomation.title'),
      description: t('tools.documentAutomation.description'),
      alt: t('tools.documentAutomation.alt'),
      iconBgColor: "bg-[#E91E63]" // Pink background for document icon
    }
  ];

  return (
    <div className="w-full bg-[#114B7E] py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-white text-center mb-20">
          {t('title')}
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
                    alt={tool.alt}
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
                    {t('learnMore')}
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

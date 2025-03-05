'use client'

import { Button } from "@heroui/react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export const FeaturesSection = () => {
  const t = useTranslations('home.featuresSection');

  const features = [
    {
      key: 'workflow',
      title: t('features.workflow.title'),
      description: t('features.workflow.description')
    },
    {
      key: 'bilingual',
      title: t('features.bilingual.title'),
      description: t('features.bilingual.description')
    },
    {
      key: 'security',
      title: t('features.security.title'),
      description: t('features.security.description')
    },
    {
      key: 'insights',
      title: t('features.insights.title'),
      description: t('features.insights.description')
    }
  ];

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
          {/* Left side - Image */}
          <div className="relative h-[400px]">
            <Image
              src="/images/law-books.svg"
              alt={t('imageAlt')}
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
              {t('title')}
            </h2>

            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature.key} className="flex items-start gap-2">
                  <div className="min-w-2 h-2 w-2 rounded-full bg-deepBlue mt-2" />
                  <p className="text-gray-700">
                    <span className="font-semibold">{feature.title}</span>
                    {" "}{feature.description}
                  </p>
                </li>
              ))}
            </ul>

            <Button
              className="bg-deepBlue text-white w-fit mt-4 px-8"
              size="lg"
            >
              {t('learnMore')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

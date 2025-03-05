'use client'

import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function DocumentAutomationContent() {
  const t = useTranslations('documentAutomation.content.features');

  const features = [
    {
      key: 'bilingualTemplate',
      image: "/images/data-analytics.svg"
    },
    {
      key: 'translation',
      image: "/images/translation.svg"
    },
    {
      key: 'validation',
      image: "/images/contextual-aware.svg"
    },
    {
      key: 'ocr',
      image: "/images/document-flow.svg"
    }
  ];

  return (
    <section className="m-12 px-4 py-10 bg-deepBlue rounded-lg">
      <div className="container mx-auto px-6">
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div key={feature.key} className="mb-16 last:mb-0">
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                  items-start gap-8 md:gap-12`}>
                {/* Content Side */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-semibold text-white">
                      {t(`${feature.key}.title`)}
                    </h3>
                  </div>
                  <p className="text-gray-100 leading-relaxed">
                    {t(`${feature.key}.description`)}
                  </p>
                </div>

                {/* Vertical Line Separator */}
                <div className="hidden md:block w-[2px] bg-brightRed self-stretch mx-4"></div>

                {/* Image Side */}
                <div className="flex-1">
                  <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={feature.image}
                      alt={t(`${feature.key}.alt`)}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
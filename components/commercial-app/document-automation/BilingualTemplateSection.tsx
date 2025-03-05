'use client'

import { useTranslations } from 'next-intl';

export default function BilingualTemplateSection() {
  const t = useTranslations('documentAutomation.bilingualTemplate');

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 border-x-2 border-deepBlue">
        {/* Title with decorative lines */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] flex-1 bg-deepBlue max-w-[200px]"></div>
          <div className="w-2 h-2 rounded-full bg-deepBlue"></div>
          <h2 className="text-2xl font-semibold text-deepBlue text-center">
            {t('title')}
          </h2>
          <div className="w-2 h-2 rounded-full bg-deepBlue"></div>
          <div className="h-[1px] flex-1 bg-deepBlue max-w-[200px]"></div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed text-center">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  );
} 
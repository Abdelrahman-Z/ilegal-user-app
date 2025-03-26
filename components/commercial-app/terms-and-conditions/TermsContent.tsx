import React from "react";
import { useTranslations } from 'next-intl';

const TermsContent: React.FC = () => {
  const t = useTranslations('terms.content');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative gap-12 flex">
      {/* Vertical Line */}
      <div className="w-[4px] bg-deepBlue self-stretch" />

      <div className="prose prose-lg flex-1">
        {/* Title with decorative lines */}
        <div className="flex items-center justify-center mb-12 space-x-4">
          <div className="flex items-center">
            <div className="h-[1px] w-12 bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-deepBlue" />
          </div>
          <h1 className="text-xl font-medium text-gray-800 whitespace-nowrap px-1">
            {t('title')}
          </h1>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-deepBlue" />
            <div className="h-[1px] w-12 bg-gray-300" />
          </div>
        </div>

        <div className="space-y-8">
          <section className="space-y-6">
            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{t('introduction.paragraph1')}</p>
              <p className="text-gray-700 leading-relaxed">{t('introduction.paragraph2')}</p>
              <p className="text-gray-700 leading-relaxed">{t('introduction.paragraph3')}</p>
            </div>

            {/* Definitions */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('definitions.title')}</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex">
                  <span className="font-medium">{t('definitions.ilegalworks.term')}</span>
                  <span>{t('definitions.ilegalworks.definition')}</span>
                </li>
                <li className="flex">
                  <span className="font-medium">{t('definitions.you.term')}</span>
                  <span>{t('definitions.you.definition')}</span>
                </li>
                <li className="flex">
                  <span className="font-medium">{t('definitions.serviceProvider.term')}</span>
                  <span>{t('definitions.serviceProvider.definition')}</span>
                </li>
                <li className="flex">
                  <span className="font-medium">{t('definitions.service.term')}</span>
                  <span>{t('definitions.service.definition')}</span>
                </li>
              </ul>
            </div>

            {/* Note Points */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('notePoints.title')}</h2>
              <p className="text-gray-700 mb-4">{t('notePoints.introduction')}</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>{t('notePoints.point1')}</li>
                <li>{t('notePoints.point2')}</li>
              </ul>
            </div>

            {/* Numbered Sections */}
            <div className="space-y-8">
              {/* Section 1 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.1.title')}</h2>
                <div className="space-y-2 text-gray-700 pl-6">
                  <p>{t('sections.1.content.point1')}</p>
                  <p>{t('sections.1.content.point2')}</p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.2.title')}</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>{t('sections.2.content.intro')}</p>
                  <div className="pl-6 space-y-2">
                    <p>{t('sections.2.content.subpoint1')}</p>
                    <p>{t('sections.2.content.subpoint2')}</p>
                    <p>{t('sections.2.content.subpoint3')}</p>
                  </div>
                  <p>{t('sections.2.content.point2')}</p>
                  <p>{t('sections.2.content.point3')}</p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.3.title')}</h2>
                <div className="space-y-4 text-gray-700">
                  <p>{t('sections.3.content.intro')}</p>
                  <p>{t('sections.3.content.subIntro')}</p>
                  <div className="space-y-4 pl-6">
                    <p>{t('sections.3.content.point1')}</p>
                    <p>{t('sections.3.content.point2')}</p>
                    <p>{t('sections.3.content.point3')}</p>
                    <p>{t('sections.3.content.point4')}</p>
                    <p>{t('sections.3.content.point5')}</p>
                    <p>{t('sections.3.content.point6')}</p>
                    <p>{t('sections.3.content.point7')}</p>
                    <p>{t('sections.3.content.point8')}</p>
                    <p>{t('sections.3.content.point9')}</p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.4.title')}</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>{t('sections.4.content.point1')}</p>
                  <p>{t('sections.4.content.point2')}</p>
                  <p>{t('sections.4.content.point3')}</p>
                  <p>{t('sections.4.content.point4')}</p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.5.title')}</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>{t('sections.5.content.point1')}</p>
                  <p>{t('sections.5.content.point2')}</p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.6.title')}</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>{t('sections.6.content.point1')}</p>
                  <p>{t('sections.6.content.point2')}</p>
                  <p>{t('sections.6.content.point3')}</p>
                  <p>{t('sections.6.content.point4')}</p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.7.title')}</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>{t('sections.7.content.intro')}</p>
                  <div className="pl-6 space-y-2">
                    <p>{t('sections.7.content.subpoint1')}</p>
                    <p>{t('sections.7.content.subpoint2')}</p>
                    <p>{t('sections.7.content.subpoint3')}</p>
                    <p>{t('sections.7.content.subpoint4')}</p>
                    <p>{t('sections.7.content.subpoint5')}</p>
                  </div>
                  <p>{t('sections.7.content.point2')}</p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.8.title')}</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>{t('sections.8.content.point1')}</p>
                  <p>{t('sections.8.content.point2')}</p>
                  <p>{t('sections.8.content.point3')}</p>
                </div>
              </div>

              {/* Section 9 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.9.title')}</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>{t('sections.9.content.point1')}</p>
                  <p>{t('sections.9.content.point2')}</p>
                  <p>{t('sections.9.content.point3')}</p>
                  <p>{t('sections.9.content.point4')}</p>
                </div>
              </div>

              {/* Section 10 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.10.title')}</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>{t('sections.10.content.point1')}</p>
                  <p>{t('sections.10.content.point2')}</p>
                </div>
              </div>

              {/* Section 11 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.11.title')}</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>{t('sections.11.content.point1')}</p>
                  <p>{t('sections.11.content.point2')}</p>
                  <p>{t('sections.11.content.point3')}</p>
                  <p>{t('sections.11.content.point4')}</p>
                </div>
              </div>

              {/* Section 12 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.12.title')}</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>{t('sections.12.content.point1')}</p>
                  <p>{t('sections.12.content.point2')}</p>
                  <p>{t('sections.12.content.point3')}</p>
                </div>
              </div>

              {/* Section 13 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.13.title')}</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>{t('sections.13.content.point1')}</p>
                  <p>{t('sections.13.content.point2')}</p>
                </div>
              </div>

              {/* Section 14 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.14.title')}</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>{t('sections.14.content.point1')}</p>
                  <p>{t('sections.14.content.point2')}</p>
                  <p>{t('sections.14.content.point3')}</p>
                </div>
              </div>

              {/* Section 15 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sections.15.title')}</h2>
                <p className="text-gray-700">{t('sections.15.content')}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsContent;

import React from 'react';
import { useTranslations } from 'next-intl';

const AddOnsContent: React.FC = () => {
  const t = useTranslations('addOns.content');

  const services = [
    'templateCreation',
    'documentCreation',
    'translation',
    'extraction',
    'summarization',
    'qa'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <div className="bg-white px-12 border-l-2 border-r-2 border-solid border-deepBlue">
        {/* Legal Advisory Support Section */}
        <h2 className="text-2xl font-bold mb-4">
          {t('legalAdvisory.title')}
        </h2>
        <p className="text-gray-700 mb-4">
          {t('legalAdvisory.introduction')}
        </p>
        <ul className="list-disc pl-6 mb-4">
          {services.map((service) => (
            <li key={service}>
              {t(`legalAdvisory.services.${service}`)}
            </li>
          ))}
        </ul>

        {/* Legal Disclaimer Section */}
        <h2 className="text-2xl font-bold mb-4">
          {t('disclaimer.title')}
        </h2>
        <p className="text-gray-700 mb-4">
          {t('disclaimer.part1')}
        </p>
        <p className="text-gray-700 mb-4">
          {t('disclaimer.part2')}
        </p>
      </div>
    </div>
  );
};

export default AddOnsContent; 
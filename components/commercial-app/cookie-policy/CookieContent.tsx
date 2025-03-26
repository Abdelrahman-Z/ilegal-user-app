import React from 'react';
import { useTranslations } from 'next-intl';

const CookieContent: React.FC = () => {
  const t = useTranslations('cookie-policy.content');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative flex gap-12">
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

        <div className="space-y-6">
          {/* Introduction */}
          <section className="space-y-4">
            <p className="text-gray-700">
              {t('introduction.text')}
            </p>
          </section>

          {/* What is a cookie? */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{t('whatIsCookie.title')}</h2>
            <p className="text-gray-700">{t('whatIsCookie.description1')}</p>
            <p className="text-gray-700">{t('whatIsCookie.description2')}</p>
            <p className="text-gray-700">{t('whatIsCookie.description3')}</p>
            <p className="text-gray-700">{t('whatIsCookie.description4')}</p>
          </section>

          {/* Types of cookies */}
          <section className="space-y-4">
            <p className="text-gray-700">{t('cookieTypes.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('cookieTypes.categories.necessary')}</li>
              <li>{t('cookieTypes.categories.functionality')}</li>
              <li>{t('cookieTypes.categories.targeting')}</li>
              <li>{t('cookieTypes.categories.performance')}</li>
            </ul>

            <p className="text-gray-700">{t('cookieTypes.sessionInfo')}</p>

            {/* Strictly necessary cookies */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              {t('cookieTypes.strictlyNecessary.title')}
            </h3>
            <p className="text-gray-700">{t('cookieTypes.strictlyNecessary.description')}</p>
            <p className="text-gray-700">{t('cookieTypes.strictlyNecessary.usage')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('cookieTypes.strictlyNecessary.purpose1')}</li>
              <li>{t('cookieTypes.strictlyNecessary.purpose2')}</li>
              <li>{t('cookieTypes.strictlyNecessary.purpose3')}</li>
              <li>{t('cookieTypes.strictlyNecessary.purpose4')}</li>
            </ul>

            {/* Performance Cookies */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              {t('cookieTypes.performance.title')}
            </h3>
            <p className="text-gray-700">{t('cookieTypes.performance.description')}</p>
            <p className="text-gray-700">{t('cookieTypes.performance.usage')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('cookieTypes.performance.purpose1')}</li>
              <li>{t('cookieTypes.performance.purpose2')}</li>
              <li>{t('cookieTypes.performance.purpose3')}</li>
            </ul>

            {/* Functionality cookies */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              {t('cookieTypes.functionality.title')}
            </h3>
            <p className="text-gray-700">{t('cookieTypes.functionality.description')}</p>
            <p className="text-gray-700">{t('cookieTypes.functionality.usage')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('cookieTypes.functionality.purpose1')}</li>
              <li>{t('cookieTypes.functionality.purpose2')}</li>
            </ul>

            {/* Targeting Cookies */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              {t('cookieTypes.targeting.title')}
            </h3>
            <p className="text-gray-700">{t('cookieTypes.targeting.description1')}</p>
            <p className="text-gray-700">{t('cookieTypes.targeting.description2')}</p>
            <p className="text-gray-700">{t('cookieTypes.targeting.usage')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('cookieTypes.targeting.purpose1')}</li>
              <li>{t('cookieTypes.targeting.purpose2')}</li>
              <li>{t('cookieTypes.targeting.purpose3')}</li>
              <li>{t('cookieTypes.targeting.purpose4')}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookieContent;

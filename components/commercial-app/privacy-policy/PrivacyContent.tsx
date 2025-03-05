import React from 'react';
import { useTranslations } from 'next-intl';

const PrivacyContent: React.FC = () => {
  const t = useTranslations('privacy.content');

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
          <h1 className="text-xl font-medium text-gray-800 whitespace-nowrap px-1">{t('title')}</h1>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-deepBlue" />
            <div className="h-[1px] w-12 bg-gray-300" />
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <p className="text-gray-700">{t('introduction.paragraph1')}</p>
            <p className="text-gray-700">{t('introduction.paragraph2')}</p>
            <p className="text-gray-700">{t('introduction.paragraph3')}</p>
            <p className="text-gray-700">{t('introduction.paragraph4')}</p>
            <p className="text-gray-700">{t('introduction.paragraph5')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('definitions.title')}</h2>
            <p className="text-gray-700">
              {t('definitions.ilegalworks')}
              <br /><br />
              {t('definitions.you')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('scope.title')}</h2>
            <p className="text-gray-700">{t('scope.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('warranties.title')}</h2>
            <p className="text-gray-700">
              {t('warranties.paragraph1')}
              <br /><br />
              {t('warranties.paragraph2')}
              <br /><br />
              {t('warranties.paragraph3')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('information.title')}</h2>
            <p className="text-gray-700">{t('information.main')}</p>
            <p className="text-gray-700">{t('information.disclosure.intro')}</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>{t('information.disclosure.point1')}</li>
              <li>{t('information.disclosure.point2')}</li>
              <li>{t('information.disclosure.point3')}</li>
              <li>{t('information.disclosure.point4')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('collection.title')}</h2>
            <p className="text-gray-700">
              {t('collection.paragraph1')}
              <br /><br />
              {t('collection.paragraph2')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('exchange.title')}</h2>
            <p className="text-gray-700">{t('exchange.intro')}</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>{t('exchange.purposes.point1')}</li>
              <li>{t('exchange.purposes.point2')}</li>
            </ul>
            <p className="text-gray-700 mt-4">{t('exchange.consent')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('promotional.title')}</h2>
            <p className="text-gray-700">{t('promotional.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('others.title')}</h2>
            <p className="text-gray-700">{t('others.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('security.title')}</h2>
            <p className="text-gray-700">{t('security.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('copyright.title')}</h2>
            <p className="text-gray-700">
              {t('copyright.paragraph1')}
              <br /><br />
              {t('copyright.paragraph2')}
              <br /><br />
              {t('copyright.paragraph3')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('amendments.title')}</h2>
            <p className="text-gray-700">{t('amendments.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('inquiries.title')}</h2>
            <p className="text-gray-700">{t('inquiries.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t('law.title')}</h2>
            <p className="text-gray-700">{t('law.content')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyContent;

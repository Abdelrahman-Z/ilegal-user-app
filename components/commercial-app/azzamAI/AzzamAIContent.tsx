'use client'

import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function AzzamAIContent() {
  const t = useTranslations('AzzamAI.content');

  const features = [
    {
      key: 'extraction',
      icon: "📄",
      image: "/images/data-analytics.svg"
    },
    {
      key: 'documentReview',
      icon: "📝",
      image: "/images/document-review.svg"
    },
    {
      key: 'bilingualQA',
      icon: "💬",
      image: "/images/bilingual-qa.svg"
    },
    {
      key: 'summarization',
      icon: "📊",
      image: "/images/summarization.svg"
    }
  ];

  return (
    <>
      {/* Features Section */}
      <section className="m-12 px-4 py-10 bg-deepBlue rounded-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">
            {t('mainTitle')}
          </h2>
          
          <div className="space-y-20">
            {features.map((feature, index) => (
              <div key={feature.key} className="mb-16 last:mb-0">
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                    items-start gap-8 md:gap-12`}>
                  {/* Content Side */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{feature.icon}</span>
                      <h3 className="text-2xl font-semibold text-white">
                        {t(`features.${feature.key}.title`)}
                      </h3>
                    </div>
                    <p className="text-gray-100 leading-relaxed">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </div>

                  {/* Vertical Line Separator */}
                  <div className="hidden md:block w-[2px] bg-brightRed self-stretch mx-4"></div>

                  {/* Image Side */}
                  <div className="flex-1">
                    <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-xl">
                      <Image
                        src={feature.image}
                        alt={t(`features.${feature.key}.alt`)}
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

      {/* Call to Action Section */}
      {/* <section className="bg-gradient-to-r from-deepBlue to-lightBlue py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Ready to Experience the Power of AI?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Transform your legal document processing with our advanced AI solutions
          </p>
          <button className="bg-white text-deepBlue hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
            Get Started Now
          </button>
        </div>
      </section> */}
    </>
  );
} 
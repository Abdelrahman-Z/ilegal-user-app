'use client'

import Image from "next/image";
import { useTranslations } from 'next-intl';

export const HeroSection = () => {
  const t = useTranslations('AzzamAI');

  return (
    <div className="relative w-full h-[400px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-hero.svg"
          alt={t('hero.imageAlt')}
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-16 w-full">
        <div className="flex flex-col justify-center gap-6 bg-black/40 p-5 rounded-md">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-white text-lg">
              {t('hero.description')}
            </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 
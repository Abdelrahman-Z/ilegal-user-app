"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

export const HeroSection = () => {
  const t = useTranslations('terms.hero');

  return (
    <div className="relative w-full h-[300px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/privacy-hero.svg"
          alt={t('imageAlt')}
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-16 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-brightRed text-center">
          {t('title')}
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;

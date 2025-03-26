'use client'

import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('documentAutomation');

  return (
    <section className="relative h-[400px]">
      <Image
        src="/images/document-automation.svg"
        alt={t('hero.imageAlt')}
        fill
        className="object-cover"
      />
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full bg-black/50 p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 w-fit">
            {t('hero.title')}
            <div className="w-full h-1 bg-brightRed mb-4"></div>
          </h1>
        </div>
      </div>
    </section>
  );
} 
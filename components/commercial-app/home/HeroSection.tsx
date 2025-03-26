'use client'

import { useTranslations } from 'next-intl';

export const HeroSection = () => {
  const t = useTranslations('home');

  return (
    <div className="relative h-screen w-full flex justify-center items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/homeHero.svg')", // Make sure to add the gavel image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)' // Darkens the image slightly
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 h-fit flex flex-col items-center rounded-xl justify-center text-center py-12 px-4 md:px-6 max-w-4xl mx-auto" style={{background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), rgba(17, 75, 126, 0.60)'}}>
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          {t('hero.title')}
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl font-light">
          {t('hero.description')}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;

'use client'

import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className="relative w-full h-[400px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-hero.svg"
          alt="Add-ons background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-16 w-full">
        <div className="flex justify-between gap-6 bg-black/40 p-5 rounded-md">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Add Ons
          </h1>
          <Link 
            href=" /contact-us" 
            className="bg-brightRed text-white px-8 py-3 rounded-md w-fit hover:bg-red-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 
'use client'

import { Button, Input } from "@heroui/react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export const NewsSection = () => {
  const t = useTranslations('home.newsSection');

  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
          {/* Left side - Form */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {t('title')}
            </h2>

            {/* Email Form */}
            <div className="flex flex-col gap-3">
              <div className="flex">
                <Input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  className="flex-1 bg-[#F5F5F5] border-none text-gray-600 rounded-none h-12"
                  classNames={{
                    input: "bg-[#F5F5F5]",
                    inputWrapper: "bg-[#F5F5F5] hover:bg-[#F5F5F5] rounded-none"
                  }}
                />
                <Button 
                  className="bg-[#114B7E] text-white px-8 min-w-[100px] rounded-none h-12"
                >
                  {t('sendButton')}
                </Button>
              </div>

              {/* Terms Text */}
              <p className="text-xs text-gray-600">
                {t('terms.prefix')}{" "}
                <span className="underline hover:text-gray-800">
                  {t('terms.privacyPolicy')}
                </span>
                {" "}{t('terms.and')}{" "}
                <span className="underline hover:text-gray-800">
                  {t('terms.termsConditions')}
                </span>
                {t('terms.suffix')}
              </p>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 h-[80%] w-[2px] bg-[#114B7E] top-1/2 -translate-y-1/2 transform -translate-x-1/2" />

          {/* Right side - Image */}
          <div className="relative h-[280px] w-full">
            <Image
              src="/images/phone-user.svg"
              alt={t('imageAlt')}
              fill
              className="object-cover rounded-md"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;

'use client';

import { cn } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const { locale } = useParams();
  const t = useTranslations('footer');

  return (
    <footer className={cn("bg-gray-200 text-gray-700 text-sm", className)}>
      {/* Top Disclaimer */}
      <div className="sm:ml-20 text-center sm:text-left py-4 border-b border-gray-300">
        {t('disclaimer')}
      </div>

      {/* Footer Content */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-6 px-8">
        {/* Logo and Company Info */}
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className="bg-gray-400 w-20 h-10 rounded-md flex items-center justify-center">
            <span className="text-white">Logo</span>
          </div>
          <div>
            iLegal® Solutions® {new Date().getFullYear()} {t('allRightsReserved')}
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-6">
          <Link href={`/${locale}/privacy-policy`} className="hover:text-black">
            {t('privacyPolicy')}
          </Link>
          <Link href={`/${locale}/terms-and-conditions`} className="hover:text-black">
            {t('termsAndConditions')}
          </Link>
          <a href="#" className="hover:text-black">
            {t('cookiePolicy')}
          </a>
          <a href="#" className="hover:text-black">
            {t('contactUs')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

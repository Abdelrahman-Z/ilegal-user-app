"use client";

import { cn } from "@heroui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  console.log(className);
  const { locale } = useParams();
  const t = useTranslations("footer");

  return (
    <footer
      className={cn(
        "text-white text-sm",
        className
      )}
    >

      {/* Footer Content */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-6 px-8">
        {/* Logo and Company Info */}
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className=" w-20 h-10 rounded-md flex items-center justify-center">
            <img src="/images/logo.svg" alt="iLegal" />
          </div>
          <div>
            iLegal® Solutions® {new Date().getFullYear()}{" "}
            {t("allRightsReserved")}
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-6">
          <Link href={`/${locale}/privacy-policy`} className="hover:text-black">
            {t("privacyPolicy")}
          </Link>
          <Link
            href={`/${locale}/terms-and-conditions`}
            className="hover:text-black"
          >
            {t("termsAndConditions")}
          </Link>
          <Link href={`/${locale}/cookie-policy`} className="hover:text-black">
            {t("cookiePolicy")}
          </Link>
          <a href="#" className="hover:text-black">
            {t("contactUs")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

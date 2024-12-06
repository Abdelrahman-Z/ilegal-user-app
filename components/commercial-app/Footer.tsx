import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 text-sm">
      {/* Top Disclaimer */}
      <div className="sm:ml-20 text-center sm:text-left py-4 border-b border-gray-300">
        *Powered by iLegal Solutions Limited, a regulated legal consultancy
        firm based in the RAKDAO, UAE, holding license number 07010134.
      </div>

      {/* Footer Content */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-6 px-8">
        {/* Logo and Company Info */}
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className="bg-gray-400 w-20 h-10 rounded-md flex items-center justify-center">
            <span className="text-white">Logo</span>
          </div>
          <div>iLegal® Solutions® 2023 All rights reserved</div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-6">
          <Link href="/privacy-policy" className="text-black">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-black">
            Terms and Conditions
          </Link>
          <a href="#" className="hover:text-black">
            Cookie Policy
          </a>
          <a href="#" className="hover:text-black">
            Contact us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

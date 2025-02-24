'use client'
import { removeToken } from "@/utils";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import React from "react";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";

const Navbar = () => {
  const t = useTranslations("navBar");
  const {locale} = useParams()
  const path = usePathname()
  const signOut = () => {
    removeToken("token");
    window.location.reload();
  };

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en'; // Determine the new locale
    const currentPath = path.split('/').slice(2).join('/'); // Get the path without the locale
    window.location.href = `/${newLocale}/${currentPath}`; // Adjust the path as necessary
  };

  return (
    <div className="bg-deepBlue text-white shadow-md p-4 flex items-center justify-between">
      {/* Greeting */}
      <h1 className="text-lg font-semibold">{t("title")}</h1>

      {/* Search and Notification */}
      <div className="flex items-center space-x-4">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="switch-lang" onPress={switchLanguage}>
              {locale === 'en' ? 'العربية' : 'English'}
            </DropdownItem>
            <DropdownItem key="signout" color="danger" onPress={signOut}>
            {t("signOut")}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;

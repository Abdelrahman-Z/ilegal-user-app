'use client'
import { getToken, removeToken } from "@/utils";
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
import { useGetUserByIdQuery } from "@/redux/services/api";
import {jwtDecode} from "jwt-decode";

const Navbar = () => {
  const t = useTranslations("navBar");
  const { locale } = useParams();
  const path = usePathname();
  
  
  const token = getToken("token");
  let userId = '';

  if (token) {
    const decodedToken = jwtDecode(token) as {
      email: string;
      id: string;
      userName: string;
      tenantId: string;
      isActive: boolean;
      role: string;
      roles: string[];
      permissions: string[];
      iat: number;
      exp: number;
    };
    userId = decodedToken.id;
  }

  const { data: userData } = useGetUserByIdQuery(userId, { skip: !userId });

  const signOut = () => {
    removeToken("token");
    window.location.reload();
  };

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const currentPath = path.split('/').slice(2).join('/');
    window.location.href = `/${newLocale}/${currentPath}`;
  };

  return (
    <div className="bg-deepBlue text-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold">{t("title")} {userData?.userName}</h1>

      <div className="flex items-center space-x-4">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              src={userData?.imageUrl || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
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

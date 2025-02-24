import React from "react";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
const Header = () => {
  const { locale } = useParams();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const t = useTranslations("navbar");

  const menuItems = [
    { name: t("home"), link: `/${locale}/` },
    { name: t("aboutUs"), link: `/${locale}/aboutUs` },
    { name: t("services"), link: `/${locale}/services` },
    { name: t("team"), link: `/${locale}/team` },
    { name: t("pricing"), link: `/${locale}/pricing` },
  ];

  const path = usePathname();

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en"; // Determine the new locale
    const currentPath = path.split("/").slice(2).join("/"); // Get the path without the locale
    window.location.href = `/${newLocale}/${currentPath}`; // Adjust the path as necessary
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: "bg-transparent",
      }}
      isBlurred={false}
    >
      {/* Mobile Navbar */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Mobile Center Content */}
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <img src="/images/logo.svg" className=" w-[200px] h-20" alt="logo" />
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navbar */}
      <NavbarContent className="hidden sm:flex gap-8" justify="start">
        <NavbarBrand className="flex items-center">
          <img src="/images/logo.svg" className=" w-[200px] h-20" alt="logo" />
        </NavbarBrand>
      </NavbarContent>

      {/* Right-Side Button */}
      <NavbarContent justify="end" className="hidden sm:flex">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              href={item.link}
              className="text-white hover:text-fuschia_maked"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Button
            as={Link}
            href={`/${locale}/contactUs`}
            className="bg-gradient-to-r from-deepBlue to-lightBlue text-white hover:bg-gray-800"
          >
            {t("getInTouch")}
          </Button>
          <Button
            as={Link}
            onPress={switchLanguage}
            className="bg-gradient-to-r from-deepBlue to-lightBlue text-white hover:bg-gray-800"
          >
            {locale === "en" ? "العربية" : "English"}
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full hover:text-fuschia_maked"
              color="foreground"
              href={item.link}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <Button
          as={Link}
          onPress={switchLanguage}
          className="bg-gradient-to-r from-deepBlue to-lightBlue text-white hover:bg-gray-800"
        >
          {locale === "en" ? "العربية" : "English"}
        </Button>
        <Button
          as={Link}
          href={`/${locale}/contactUs`}
          className="bg-gradient-to-r from-deepBlue to-lightBlue text-white hover:bg-gray-800"
        >
          {t("getInTouch")}
        </Button>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;

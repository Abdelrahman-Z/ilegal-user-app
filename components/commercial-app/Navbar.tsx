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
} from "@nextui-org/react";
import { useParams } from "next/navigation";
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
          <p className="font-bold text-inherit">Logo</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navbar */}
      <NavbarContent className="hidden sm:flex gap-8" justify="start">
        <NavbarBrand>
          <p className="font-bold text-lg text-inherit">Logo</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Right-Side Button */}
      <NavbarContent justify="end" className="hidden sm:flex">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link href={item.link} className="text-white hover:text-gray-300">
              {item.name}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Button
            as={Link}
            href="#"
            className="bg-black text-white hover:bg-gray-800"
          >
            {t("getInTouch")}
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
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
          href="#"
          className="bg-black text-white hover:bg-gray-800"
        >
          {t("getInTouch")}
        </Button>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;

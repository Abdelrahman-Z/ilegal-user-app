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
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/aboutUs" },
    { name: "Services", link: "/services" },
    { name: "Team", link: "/team" },
    { name: "Pricing", link: "/pricing" },
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
            Get In Touch
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" color="foreground" href={item.link} size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <Button
          as={Link}
          href="#"
          className="bg-black text-white hover:bg-gray-800"
        >
          Get In Touch
        </Button>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;

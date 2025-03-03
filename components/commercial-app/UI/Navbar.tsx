'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Image,
} from "@heroui/react";
import { useParams } from 'next/navigation';

export const NavigationBar = () => {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <Navbar isBordered className="text-white absolute inset-0 h-fit bg-transparent">
      <NavbarBrand>
        <Image src="/images/logo.svg" alt="Legal Works Logo"/> 
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 text-white" justify="end">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white"
                radius="sm"
                variant="light"
              >
                Our Solutions
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Legal Works Solutions"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="document_management"
              description="Secure storage and organization of legal documents"
              className="text-white"
            >
              Document Management
            </DropdownItem>
            <DropdownItem
              key="templates"
              description="Professional templates for legal documents"
              className="text-white"
            >
              Legal Templates
            </DropdownItem>
            <DropdownItem
              key="contract_review"
              description="AI-powered contract analysis and review"
              className="text-white"
            >
              Contract Review
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
          <Link href={`/${locale}/aboutUs`} className="text-white">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={`/${locale}/pricing`} className="text-white">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={`/${locale}/contact`} className="text-white">
            Contact Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={`/${locale}/news`} className="text-white">
            News
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} className="bg-deepBlue text-white" href={`/${locale}/login`} variant="flat">
            Login/Signup
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavigationBar;

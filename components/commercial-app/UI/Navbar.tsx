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
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const NavigationBar = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = params.locale as string;
  const t = useTranslations('navbar');

  const solutions = [
    {
      key: "addOns",
      title: t('solutions.addOns'),
      description: t('solutions.addOnsDesc'),
      href: `/${locale}/addOns`
    },
    {
      key: "azzamAI",
      title: t('solutions.azzamAI'),
      description: t('solutions.azzamAIDesc'),
      href: `/${locale}/azzamAI`
    },
    {
      key: "documentAutomation",
      title: t('solutions.documentAutomation'),
      description: t('solutions.documentAutomationDesc'),
      href: `/${locale}/documentAutomation`
    }
  ];

  // Language switcher handler
  const handleLanguageChange = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const currentPath = pathname;
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Navbar isBordered className="text-white absolute inset-0 h-fit bg-transparent">
      <NavbarBrand as={Link} href={`/${locale}`}>
        <Image src="/images/logo.svg" alt={t('logoAlt')}/> 
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 text-white" justify="end">
        <Dropdown classNames={{
          content: "bg-gradient-to-r from-deepBlue to-lightBlue text-white",
        }}>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white"
                radius="sm"
                variant="light"
              >
                {t('solutions.title')}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label={t('solutions.ariaLabel')}
            itemClasses={{
              description: "text-white",
            }}
          >
            {solutions.map((solution) => (
              <DropdownItem
                key={solution.key}
                description={solution.description}
                href={solution.href}
              >
                {solution.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
          <Link href={`/${locale}/aboutUs`} className="text-white">
            {t('aboutUs')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={`/${locale}/pricing`} className="text-white">
            {t('pricing')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={`/${locale}/contactUs`} className="text-white">
            {t('getInTouch')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={`/${locale}/news`} className="text-white">
            {t('news')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} className="bg-deepBlue text-white" href={`/${locale}/login`} variant="flat">
            {t('loginSignup')}
          </Button>
        </NavbarItem>
        
        {/* Language Switcher Button */}
        <NavbarItem>
          <Button
            onPress={handleLanguageChange}
            className="bg-transparent border-1 border-white text-white"
            variant="bordered"
            size="sm"
          >
            {locale === 'en' ? 'العربية' : 'English'}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavigationBar;

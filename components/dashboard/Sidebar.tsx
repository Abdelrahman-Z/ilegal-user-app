"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { FaFileAlt, FaCog, FaPen, FaCoins } from "react-icons/fa";
import { BsShieldFillCheck, BsTranslate } from "react-icons/bs";
import { AiFillSignature } from "react-icons/ai";
import { GiInjustice } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi2";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MdOutlineDocumentScanner } from "react-icons/md";

const navLinks = [
  {
    name: "Documents",
    icon: <FaFileAlt className="text-2xl" />,
    path: "/dashboard/documents",
  },
  {
    name: "Tokens",
    icon: <FaCoins className="text-xl" />,
    path: "/dashboard/tokens",
  },
  {
    name: "Templates",
    icon: <FaPen className="text-2xl" />,
    path: "/dashboard/templates",
  },
  {
    name: "Summarization",
    icon: <FaCog className="text-2xl" />,
    path: "/dashboard/summarization",
  },
  {
    name: "Translation",
    icon: <BsTranslate className="text-2xl" />,
    path: "/dashboard/translation",
  },
  {
    name: "Sign Document",
    icon: <AiFillSignature className="text-2xl" />,
    path: "/dashboard/sign-document",
  },
  {
    name: "Jurisdiction",
    icon: <GiInjustice className="text-2xl" />,
    path: "/dashboard/jurisdiction",
  },
  {
    name: "Users",
    icon: <FaUser className="text-2xl" />,
    path: "/dashboard/users",
  },
  {
    name: "Roles",
    icon: <BsShieldFillCheck className="text-2xl" />,
    path: "/dashboard/roles",
  },
  {
    name: "Permissions",
    icon: <HiOutlineKey className="text-2xl" />,
    path: "/dashboard/permissions",
  },
  {
    name: "ValidatedDocuments",
    icon: <MdOutlineDocumentScanner className="text-2xl" />,
    path: "/dashboard/validatedDocuments",
  },
];

const Sidebar = () => {
  const { locale } = useParams();
  const t = useTranslations("sideBar");
  return (
    <aside className="w-60 h-full space-y-1 text-white justify-between bg-gradient-to-b from-deepBlue to-lightBlue px-10">
      <div>
        <Image
          src="/images/logo.svg"
          alt="logo"
          className="w-32 h-20"
          width={32}
          height={32}
        />
      </div>
      <nav className="flex flex-col items-start justify-start w-full overflow-y-auto gap-5 scrollbar-default">
        {navLinks.map((link, index) => (
          <Button
            key={index}
            startContent={link.icon}
            className="bg-transparent text-white hover:text-gray-300 p-0 w-full justify-start"
            as={Link}
            href={`/${locale}${link.path}`}
          >
            {t(link.name)}
          </Button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

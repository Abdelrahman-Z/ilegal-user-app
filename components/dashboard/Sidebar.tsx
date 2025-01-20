"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { FaFileAlt, FaCog, FaPen } from "react-icons/fa";
// import { RiOrganizationChart } from "react-icons/ri";
import { BsShieldFillCheck, BsTranslate } from "react-icons/bs";
import { AiFillSignature } from "react-icons/ai";
import { GiInjustice } from "react-icons/gi";
import { FaUser } from "react-icons/fa";

const navLinks = [
  // {
  //   name: "Home",
  //   icon: <FaHome className="text-2xl" />,
  //   path: "/dashboard",
  // },
  // {
  //   name: "Tenants",
  //   icon: <RiOrganizationChart className="text-2xl" />,
  //   path: "/dashboard/tenants",
  // },
  {
    name: "Documents",
    icon: <FaFileAlt className="text-2xl" />,
    path: "/dashboard/documents",
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
];

const Sidebar = () => {
  const { locale } = useParams();
  return (
    <aside className="w-fit h-full flex flex-col items-center py-4 space-y-8 text-white justify-between bg-gradient-to-b from-deepBlue to-lightBlue">
      <div className="text-lg font-bold">
        <img src="/images/logo.svg" alt="logo" className="w-8 h-8" />
      </div>
      <nav className="flex flex-col items-center space-y-10">
        {navLinks.map((link, index) => (
          <Button
            key={index}
            startContent={link.icon}
            className="bg-transparent text-white hover:text-gray-300"
            as={Link}
            href={`/${locale}${link.path}`}
          >
            {link.name}
          </Button>
        ))}
      </nav>
      <div></div>
    </aside>
  );
};

export default Sidebar;

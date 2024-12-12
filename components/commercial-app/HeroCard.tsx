"use client";

import React from "react";
import Header from "./Navbar";
import { Button, cn } from "@nextui-org/react";
import { useTranslations } from "next-intl";

interface Hero {
  centerd?: boolean;
  loginButtton?: boolean;
  heroTitle: string;
  heroDescription: string;
  imagePath: string;
}

const App = ({
  centerd,
  loginButtton,
  heroTitle,
  heroDescription,
  imagePath,
}: Hero) => {
  const t = useTranslations("home.hero");

  return (
    <div
      className={cn("min-h-screen bg-cover bg-center text-white w-full")}
      style={{ backgroundImage: `url(${imagePath})` }} // Set dynamic background image
    >
      <Header />

      <div
        className={cn(
          "p-6 rounded-lg text-center flex flex-col  mx-auto gap-6 my-56 ",
          centerd ? "items-center w-3/4" : " w-fit"
        )}
      >
        <h1 className={cn("text-6xl font-bold mb-4" , !centerd && 'sm:text-left')} >{heroTitle}</h1>
        <p className={cn("text-gray-300 mb-6", !centerd && 'sm:text-left')}>{heroDescription}</p>
        {loginButtton && (
          <Button className="bg-black hover:bg-gray-800 text-white py-2 px-6 rounded-md w-fit">
            {t("loginButton")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default App;

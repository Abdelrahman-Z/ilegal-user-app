"use client";

import Footer from "@/components/commercial-app/Footer";
import Header from "@/components/commercial-app/Navbar";
import { Button, cn } from "@nextui-org/react";
import React from "react";
import { useTranslations } from "next-intl"; 

const Page = () => {
  const t = useTranslations("pricing");

  const plans = [
    {
      title: t("basic.title"),
      description: t("basic.description"),
      price: t("basic.price"),
      button: t("basic.button"),
      onContinue: () => alert("Selected Basic Plan"),
    },
    {
      title: t("premium.title"),
      description: t("premium.description"),
      price: t("premium.price"),
      button: t("premium.button"),
      onContinue: () => alert("Selected Premium Plan"),
    },
  ];

  return (
    <div
      className={cn("min-h-screen bg-cover bg-center text-white w-full flex flex-col justify-between")}
      style={{ backgroundImage: `url(/images/landing7.svg)` }} // Set dynamic background image
    >
      <Header />
      <div className="flex flex-col items-center p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-10 w-3/4 sm:pl-10 sm:border-l border-white">
          {t("hero.title1")} <br /> {t("hero.title2")}
        </h1>

        {/* Pricing Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {plans.map((plan, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-6">
              {/* Content */}
              <div className="mt-2 flex flex-col gap-3">
                <div className={cn("flex items-center justify-center w-full")}>
                  <div className="flex-grow h-[1px] bg-white"></div>
                  <div className="w-2 h-2 bg-white rounded-full mx-2"></div>
                  <h2 className="text-lg font-bold text-white mx-2">{plan.title}</h2>
                  <div className="w-2 h-2 bg-white rounded-full mx-2"></div>
                  <div className="flex-grow h-[1px] bg-white"></div>
                </div>
                <p className="text-sm text-center mt-2">{plan.description}</p>
                <p className="text-3xl font-bold mt-6">{plan.price}</p>
                <Button
                  className="mt-6 px-8 py-2 bg-white text-black rounded-lg mx-auto"
                  onClick={plan.onContinue}
                >
                 {plan.button}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer className="!bg-transparent !text-white w-full !pr-10" />
    </div>
  );
};

export default Page;

"use client";

import Footer from "@/components/commercial-app/Footer";
import Header from "@/components/commercial-app/Navbar";
import { Button, cn } from "@nextui-org/react";
import React from "react";

const plans = [
  {
    title: "Basic Plan",
    description:
      "A basic plan suitable for small businesses and individuals starting out.",
    price: "9.99",
    onContinue: () => alert("Selected Basic Plan"),
  },
  {
    title: "Premium Plan",
    description:
      "A premium plan for established businesses that require advanced features.",
    price: "19.99",
    onContinue: () => alert("Selected Premium Plan"),
  },
];

const page = () => {
  return (
    <div
      className={cn("min-h-screen bg-cover bg-center text-white w-full flex flex-col justify-between")}
      style={{ backgroundImage: `url(/images/landing7.svg)` }} // Set dynamic background image
    >
      <Header />
      <div className="flex flex-col items-center p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold  mb-10 w-3/4 sm:pl-10 sm:border-l border-white">Choose Your <br/> Pricing Plan</h1>

        {/* Pricing Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-6"
            >

              {/* Content */}
              <div className="mt-2 flex flex-col gap-3">
                <div className={cn("flex items-center justify-center w-full")}>
                  {/* Left Line */}
                  <div className="flex-grow h-[1px] bg-white"></div>

                  {/* Left Dot */}
                  <div className="w-2 h-2 bg-white rounded-full mx-2"></div>

                  {/* Text */}
                  <h2 className="text-lg font-bold text-white mx-2">
                    {plan.title}
                  </h2>

                  {/* Right Dot */}
                  <div className="w-2 h-2 bg-white rounded-full mx-2"></div>

                  {/* Right Line */}
                  <div className="flex-grow h-[1px] bg-white"></div>
                </div>
                <p className="text-sm  text-center mt-2">{plan.description}</p>
                <p className="text-3xl font-bold  mt-6">${plan.price}</p>
                <Button
                  className="mt-6 px-8 py-2 bg-white text-black rounded-lg mx-auto"
                  onClick={plan.onContinue}
                >
                  Continue
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

export default page;

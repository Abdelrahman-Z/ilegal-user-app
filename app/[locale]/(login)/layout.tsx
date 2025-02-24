"use client";
import Footer from "@/components/commercial-app/Footer";
import Header from "@/components/commercial-app/Navbar";
import { cn } from "@heroui/react";
import React from "react";

const page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "min-h-screen bg-cover bg-center text-white w-full flex flex-col justify-between"
      )}
      style={{ backgroundImage: `url(/images/landing7.svg)` }} // Set dynamic background image
    >
      <Header />
      {children}
      <Footer className="!bg-transparent !text-white w-full !pr-10" />
    </div>
  );
};

export default page;

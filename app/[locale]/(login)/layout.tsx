"use client";
import Footer from "@/components/commercial-app/UI/Footer";
import NavigationBar from "@/components/commercial-app/UI/Navbar";
import { cn } from "@heroui/react";
import React from "react";

const page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "min-h-screen bg-cover bg-center text-white w-full flex flex-col justify-between"
      )}
      style={{ backgroundImage: `url(/images/loginPages.svg)` }} // Set dynamic background image
    >
      <NavigationBar />
      <div/>
      {children}
      <Footer className="!bg-transparent !text-white w-full !pr-10" />
    </div>
  );
};

export default page;

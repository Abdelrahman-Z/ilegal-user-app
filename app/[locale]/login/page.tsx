"use client";
import Footer from "@/components/commercial-app/Footer";
import Header from "@/components/commercial-app/Navbar";
import { Button, cn, Input } from "@nextui-org/react";
import React from "react";

const page = () => {
  return (
    <div
      className={cn("min-h-screen bg-cover bg-center text-white w-full flex flex-col justify-between")}
      style={{ backgroundImage: `url(/images/landing7.svg)` }} // Set dynamic background image
    >
      <Header />
      <div className="flex items-center justify-center">
        <div className="bg-black text-white rounded-lg shadow-lg p-8 w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign in Form</h2>
          <form className="space-y-4">
            {/* Username/ID Input */}
            <div>
              <Input
                label="Username or ID"
                type="text"
                id="username"
                name="username"
                variant="underlined"
                classNames={{
                    label: 'text-white',
                }}
                color="primary"
              />
            </div>
            {/* Password Input */}
            <div>
              
              <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                variant="underlined"
                color="primary"
                classNames={{
                    label: 'text-white',
                }}
              />
            </div>
            {/* Continue Button */}
            <div>
              <Button
                type="submit"
                className="w-full bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition"
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer className="!bg-transparent !text-white w-full !pr-10" />
    </div>
  );
};

export default page;

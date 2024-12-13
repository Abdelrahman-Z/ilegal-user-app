"use client";
import Footer from "@/components/commercial-app/Footer";
import Header from "@/components/commercial-app/Navbar";
import { Button, cn, Input } from "@nextui-org/react";
import React from "react";

const page = () => {
  return (
    <div
      className={cn(
        "min-h-screen bg-cover bg-center text-white w-full flex flex-col justify-between"
      )}
      style={{ backgroundImage: `url(/images/landing7.svg)` }} // Set dynamic background image
    >
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 max-w-5xl w-full mx-auto">
        {/* Left Content */}
        <div className="text-white space-y-6">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p>
            Lorem Ipsum has been the industrys standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <p>
            Lorem Ipsum has been the industrys standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <div className="flex space-x-4">
            {/* Social Media Icons */}
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-black text-white rounded-lg shadow-lg p-8 w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Form</h2>
          <form className="space-y-4">
            {/* Name Input */}
            <div>
              <Input
                label="Name"
                type="text"
                id="name"
                name="name"
                variant="underlined"
                classNames={{
                  label: "text-white",
                }}
                color="primary"
              />
            </div>
            {/* Email Input */}
            <div>
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                variant="underlined"
                classNames={{
                  label: "text-white",
                }}
                color="primary"
              />
            </div>
            {/* Message Input */}
            <div>
              <Input
                label="Message"
                type="text"
                id="message"
                name="message"
                variant="underlined"
                classNames={{
                  label: "text-white",
                }}
                color="primary"
              />
            </div>
            {/* Send Button */}
            <div>
              <Button
                type="submit"
                className="w-full bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition"
              >
                Send
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

"use client";
import Footer from "@/components/commercial-app/UI/Footer";
import Navbar from "@/components/commercial-app/UI/Navbar";
import { Button, cn, Input, Textarea } from "@heroui/react";
import React from "react";
import { useTranslations } from "next-intl";


const Page = () => {
  const t = useTranslations("contactUs")
  return (
    <div
      className={cn(
        "min-h-screen bg-cover bg-center text-white w-full flex flex-col justify-between"
      )}
      style={{ backgroundImage: `url(/images/loginPages.svg)` }} // Set dynamic background image
    >
      <Navbar />
      <div/>
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
          <h2 className="text-2xl font-bold mb-6 text-center text-deepBlue">
          {t("form.title")}
          </h2>
          <form className="space-y-4">
            {/* Name Input */}
            <div>
              <Input
                label={t("form.name")}
                type="text"
                id="name"
                name="name"
                variant="underlined"
                classNames={{
                  label: "text-deepBlue",
                  input: "text-deepBlue",
                }}
                color="primary"
              />
            </div>
            {/* Email Input */}
            <div>
              <Input
                label={t("form.email")}
                type="email"
                id="email"
                name="email" 
                variant="underlined"
                classNames={{
                  label: "text-deepBlue",
                  input: "text-deepBlue",
                }}
                color="primary"
              />
            </div>
            {/* Message Input */}
            <div>
              <Textarea
                label={t("form.message")}
                type="text"
                id="message"
                name="message"
                variant="underlined"
                classNames={{
                  label: "text-deepBlue",
                  input: "text-deepBlue",
                }}
                color="primary"
              />
            </div>
            {/* Send Button */}
            <div>
              <Button
                type="submit"
                className="w-full bg-deepBlue text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition"
              >
                {t("form.button")}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer className="!bg-transparent !text-white w-full !pr-10" />
    </div>
  );
};

export default Page;

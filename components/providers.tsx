"use client";

import { NextUIProvider } from "@nextui-org/react";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import React, { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode; // Typing for children
  messages?: AbstractIntlMessages; // Typing for messages
  locale?: string; // Typing for locale
}

const Providers: React.FC<ProvidersProps> = ({ children, messages , locale}) => {
  return (
    <NextUIProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>
    </NextUIProvider>
  );  
};

export default Providers;

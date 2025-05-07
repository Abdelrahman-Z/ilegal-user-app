"use client";

import store from "@/redux/store";
import { HeroUIProvider } from "@heroui/react";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: ReactNode; // Typing for children
  messages?: AbstractIntlMessages; // Typing for messages
  locale?: string; // Typing for locale
}

const Providers: React.FC<ProvidersProps> = ({
  children,
  messages,
  locale,
}) => {
  return (
    <Provider store={store}>
      <HeroUIProvider>
        <NextIntlClientProvider timeZone="UTC" locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </HeroUIProvider>
    </Provider>
  );
};

export default Providers;

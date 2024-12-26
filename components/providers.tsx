"use client";

import store from "@/redux/store";
import { NextUIProvider } from "@nextui-org/react";
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
      <NextUIProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </NextUIProvider>
    </Provider>
  );
};

export default Providers;

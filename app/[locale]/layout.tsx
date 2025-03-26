import { getMessages } from "next-intl/server";
import "../globals.css";
import Providers from "@/components/providers";
import { Toaster } from "react-hot-toast";
import { use } from "react";

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  // Fetch translations for the detected locale
  const messages = use(getMessages());

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="antialiased">
        <Providers locale={locale} messages={messages}>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}

import { getMessages } from "next-intl/server";
import "../globals.css";
import Providers from "@/components/providers";
import { Toaster } from "react-hot-toast";

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {


  // Fetch translations for the detected locale
  const messages = await getMessages();

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

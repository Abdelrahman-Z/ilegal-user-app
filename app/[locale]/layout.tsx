import { getMessages } from "next-intl/server";
import "../globals.css";
import Providers from "@/components/providers";
import { Toaster } from "react-hot-toast";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use headers to detect locale
  const headers = new Headers();
  const acceptLanguage = headers.get("accept-language") || "en";
  const locale = acceptLanguage.split(",")[0] || "en"; // Default to English if not specified

  // Fetch translations for the detected locale
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="antialiased">
        <Providers locale={locale} messages={messages}>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}

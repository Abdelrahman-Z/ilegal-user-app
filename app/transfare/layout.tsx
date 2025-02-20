'use client'
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="antialiased">
        <Provider store={store}>
          {children}
          <Toaster position="bottom-right" />
        </Provider>
      </body>
    </html>
  );
}

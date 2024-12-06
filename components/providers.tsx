"use client";

import { NextUIProvider } from "@nextui-org/react";
import React, { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode; // Typing for children
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;

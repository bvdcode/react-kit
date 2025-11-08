import React from "react";
import type { ReactKitProps } from "./types";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./components/AppLayout";
import { ThemeContextProvider } from "./contexts/ThemeContext";

export const AppShell: React.FC<ReactKitProps> = (props) => {
  return (
    <ThemeContextProvider>
      <AppLayout {...props} />
    </ThemeContextProvider>
  );
};

export default AppShell;

import React from "react";
import type { ReactKitProps } from "./types";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./components/AppLayout";

export const AppShell: React.FC<ReactKitProps> = (props) => {
  return <AppLayout {...props} />;
};

export default AppShell;

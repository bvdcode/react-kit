import React from "react";
import { useAuthStore } from "../store/authStore";
import LoginPage from "./LoginPage";
import type { ReactKitProps } from "../types";

type Props = React.PropsWithChildren<{
  appProps: ReactKitProps;
}>;

const ProtectedContent: React.FC<Props> = ({ children, appProps }) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const refreshToken = useAuthStore((s) => s.refreshToken);

  // If no tokens - show login page
  if (!accessToken && !refreshToken) {
    return <LoginPage appProps={appProps} />;
  }

  return <>{children}</>;
};

export default ProtectedContent;

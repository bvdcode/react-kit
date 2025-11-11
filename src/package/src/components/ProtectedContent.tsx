import React from "react";
import { useAuthStore } from "../store/authStore";
import LoginPage from "./LoginPage";

type Props = React.PropsWithChildren;

const ProtectedContent: React.FC<Props> = ({ children }) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const refreshToken = useAuthStore((s) => s.refreshToken);

  // If no tokens - show login page
  if (!accessToken && !refreshToken) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default ProtectedContent;

import "./i18n";
import { ApiService } from "./api";
import React, { useEffect } from "react";
import type { ReactKitProps } from "./types";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./components/AppLayout";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "./store/authStore";
import { ConfirmProvider } from "material-ui-confirm";
import { ThemeContextProvider } from "./contexts/ThemeContext";

export const AppShell: React.FC<ReactKitProps> = (props) => {
  const setApiService = useAuthStore((s) => s.setApiService);

  useEffect(() => {
    if (props.authConfig) {
      const apiService = new ApiService(props);
      setApiService(apiService);
    }
  }, [props, setApiService]);

  return (
    <ThemeContextProvider>
      <ConfirmProvider>
        <AppLayout {...props} />
      </ConfirmProvider>
    </ThemeContextProvider>
  );
};

export default AppShell;

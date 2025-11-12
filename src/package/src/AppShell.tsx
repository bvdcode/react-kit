import "./i18n";
import i18n from "./i18n";
import { ApiService } from "./api";
import { Box } from "@mui/material";
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

  useEffect(() => {
    if (props.translations) {
      Object.entries(props.translations).forEach(([language, namespaces]) => {
        Object.entries(namespaces).forEach(([namespace, translations]) => {
          i18n.addResourceBundle(language, namespace, translations, true, true);
        });
      });
    }
  }, [props.translations]);

  return (
    <ThemeContextProvider>
      <ConfirmProvider>
        <Box position="absolute" top={0} left={0} height="100%" width="100%">
          <AppLayout {...props} />
        </Box>
      </ConfirmProvider>
    </ThemeContextProvider>
  );
};

export default AppShell;

import { Box, Alert, AlertTitle } from "@mui/material";
import { ReactKitProps } from "../types";
import { FunctionComponent } from "react";
import FaviconManager from "./FaviconManager";
import defaultLogoUrl from "../assets/default-logo.svg";
import { NavigationBar, NotFound, ProtectedContent } from ".";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AppLayout: FunctionComponent<ReactKitProps> = (props) => {
  const { t } = useTranslation();

  if (!props.pages || props.pages.length === 0) {
    return (
      <BrowserRouter basename={props.basename}>
        <FaviconManager faviconUrl={props.logoUrl ?? defaultLogoUrl} />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
          p={3}
        >
          <Alert severity="warning" sx={{ maxWidth: 600 }}>
            <AlertTitle>{t("errors.noPagesTitle")}</AlertTitle>
            <span
              dangerouslySetInnerHTML={{
                __html: t("errors.noPagesDescription"),
              }}
            />
          </Alert>
        </Box>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter basename={props.basename}>
      <FaviconManager faviconUrl={props.logoUrl ?? defaultLogoUrl} />
      <ProtectedContent appProps={props}>
        <Routes>
          <Route
            element={
              <Box
                display="flex"
                width="100%"
                height="100%"
                flexDirection="column"
              >
                <NavigationBar {...props} />
                <Box component="main" sx={{ flex: 1, overflow: "auto", p: 3 }}>
                  <Routes>
                    {props.pages.map((page) => (
                      <Route
                        key={page.route}
                        path={page.route}
                        element={page.component}
                      />
                    ))}
                  </Routes>
                </Box>
              </Box>
            }
          >
            {props.pages.map((page) => (
              <Route
                key={page.route}
                path={page.route}
                element={page.component}
              />
            ))}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ProtectedContent>
    </BrowserRouter>
  );
};

export default AppLayout;

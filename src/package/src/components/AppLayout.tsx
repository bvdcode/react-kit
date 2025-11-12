import { Box } from "@mui/material";
import { ReactKitProps } from "../types";
import { FunctionComponent } from "react";
import FaviconManager from "./FaviconManager";
import defaultLogoUrl from "../assets/default-logo.svg";
import { NavigationBar, NotFound, ProtectedContent } from ".";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppLayout: FunctionComponent<ReactKitProps> = (props) => {
  const hasPages = Array.isArray(props.pages) && props.pages.length > 0;

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
                  {hasPages ? (
                    <Routes>
                      {props.pages.map((page) => (
                        <Route
                          key={page.route}
                          path={page.route}
                          element={page.component}
                        />
                      ))}
                    </Routes>
                  ) : (
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "text.secondary",
                      }}
                    >
                      <Box sx={{ textAlign: "center" }}>
                        <h2>Pages are not configured</h2>
                        <div>
                          You didn't add any pages to the application. Add
                          entries to the <code>pages</code> prop of the
                          AppShell to display routes.
                        </div>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            }
          >
            {hasPages &&
              props.pages.map((page) => (
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

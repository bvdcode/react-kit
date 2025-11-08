import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { ReactKitProps } from "../types";
import NavigationBar from "./NavigationBar";
import ProtectedContent from "./ProtectedContent";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppLayout: FunctionComponent<ReactKitProps> = (props) => {
  return (
    <BrowserRouter basename={props.basename}>
      <Box display="flex" width="100%" height="100%" flexDirection="column">
        <NavigationBar {...props} />

        <Box component="main" sx={{ flex: 1, overflow: "auto", p: 3 }}>
          <Routes>
            {props.pages.map((page) => {
              const element = page.protected ? (
                <ProtectedContent>{page.component}</ProtectedContent>
              ) : (
                page.component
              );
              return (
                <Route key={page.route} path={page.route} element={element} />
              );
            })}
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default AppLayout;

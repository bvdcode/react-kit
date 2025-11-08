import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import ProtectedContent from "./ProtectedContent";
import { ReactKitProps } from "../types";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppLayout: FunctionComponent<ReactKitProps> = (props) => {
  return (
    <Box display="flex" width="100%" height="100%" bgcolor="red">
      <Box component="nav">{props.appName}</Box>
      <Box component="main">
        <BrowserRouter basename={props.basename}>
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
        </BrowserRouter>
      </Box>
    </Box>
  );
};

export default AppLayout;

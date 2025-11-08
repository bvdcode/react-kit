import React from "react";
import "react-toastify/dist/ReactToastify.css";
import type { ReactKitProps, ReactKitPage } from "./types";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const AppShell: React.FC<ReactKitProps> = ({
  pages,
  basename,
  isAuthenticated = false,
  redirectPath = "/login",
  notFoundElement = <div>Not found</div>,
  layout,
}) => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {pages.map((page) => {
          const element =
            page.protected && !isAuthenticated ? (
              <Navigate to={redirectPath} replace />
            ) : (
              <page.component />
            );
          return <Route key={page.route} path={page.route} element={element} />;
        })}
        <Route path="*" element={notFoundElement} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppShell;

import React from "react";
import type { ReactKitProps, ReactKitPage } from "../types";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function DefaultLayout({
  pages,
  children,
}: {
  pages: ReactKitPage[];
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav
        style={{
          width: 240,
          background: "#111",
          color: "#fff",
          padding: "1rem",
        }}
      >
        <h3 style={{ marginTop: 0 }}>App</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {pages.map((p) => (
            <li key={p.route} style={{ marginBottom: 8 }}>
              <a
                href={p.route}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                {p.icon && <span>{p.icon}</span>}
                <span>{p.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <main style={{ flex: 1, padding: "1.5rem" }}>{children}</main>
    </div>
  );
}

export const RouterKit: React.FC<ReactKitProps> = ({
  pages,
  basename,
  isAuthenticated = false,
  redirectPath = "/login",
  notFoundElement = <div>Not found</div>,
  layout,
}) => {
  const layoutRenderer =
    layout ||
    ((children: React.ReactNode) => (
      <DefaultLayout pages={pages}>{children}</DefaultLayout>
    ));

  return (
    <BrowserRouter basename={basename}>
      {layoutRenderer(
        <Routes>
          {pages.map((page) => {
            const element =
              page.protected && !isAuthenticated ? (
                <Navigate to={redirectPath} replace />
              ) : (
                <page.component />
              );
            return (
              <Route key={page.route} path={page.route} element={element} />
            );
          })}
          <Route path="*" element={notFoundElement} />
        </Routes>,
        pages,
      )}
    </BrowserRouter>
  );
};

export default RouterKit;

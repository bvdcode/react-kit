import React from "react";
import { createRoot } from "react-dom/client";
import { AppShell } from "@bvdcode/react-kit/AppShell";

createRoot(document.getElementById("root")!).render(
  <div style={{ height: "100vh", width: "100vw", backgroundColor: "blue" }}>
    <AppShell
      pages={[
        {
          route: "/",
          component: <div>Home Page</div>,
        },
        {
          route: "/about",
          component: <div>About Page</div>,
        },
      ]}
      appName={"React Kit"}
      navigationPosition={"top"}
    />
  </div>,
);

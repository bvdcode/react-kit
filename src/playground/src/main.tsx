import { createRoot } from "react-dom/client";
import { AppShell } from "../../package/src/AppShell";

createRoot(document.getElementById("root")!).render(
  <div style={{ height: "100vh", width: "100vw" }}>
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

import { createRoot } from "react-dom/client";
import { AppShell } from "@bvdcode/react-kit/AppShell";

createRoot(document.getElementById("root")!).render(
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundColor: "green",
    }}
  >
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

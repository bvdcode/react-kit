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
      backgroundColor: "pink",
    }}
  >
    <AppShell
      pages={[
        {
          route: "/",
          name: "Home",
          component: <div>Home Page Content</div>,
          icon: <div>🏠</div>,
        },
        {
          route: "/about",
          name: "About",
          component: <div>About Page Content</div>,
          icon: <div>ℹ️</div>,
        },
        {
          route: "/about2",
          name: "About2",
          component: <div>About2 Page Content</div>,
          icon: <div>ℹ️</div>,
        },
        {
          route: "/about3",
          name: "About3",
          component: <div>About3 Page Content</div>,
          icon: <div>ℹ️</div>,
        },
        {
          route: "/protected",
          name: "Protected",
          component: <div>Protected Page Content</div>,
          protected: true,
          icon: <div>🔒</div>,
        },
      ]}
      appName="React Kit"
      navigationPosition="top"
    />
  </div>,
);

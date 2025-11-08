import { useState } from "react";
import { createRoot } from "react-dom/client";
import { AppShell } from "@bvdcode/react-kit/AppShell";
import { Button, ButtonGroup, Box } from "@mui/material";

const App = () => {
  const [navigationPosition, setNavigationPosition] = useState<"top" | "side">(
    "top",
  );

  const SettingsPage = () => (
    <Box>
      <h2>Settings</h2>
      <p>Switch navigation layout:</p>
      <ButtonGroup variant="contained">
        <Button
          onClick={() => setNavigationPosition("top")}
          color={navigationPosition === "top" ? "primary" : "inherit"}
        >
          Top Navigation
        </Button>
        <Button
          onClick={() => setNavigationPosition("side")}
          color={navigationPosition === "side" ? "primary" : "inherit"}
        >
          Side Navigation
        </Button>
      </ButtonGroup>
    </Box>
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <AppShell
        logoUrl={"https://reactjs.org/logo-og.png"}
        navigationPosition={navigationPosition}
        appName="React Kit"
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
            route: "/contact",
            name: "Contact",
            component: <div>Contact Page Content</div>,
            icon: <div>📞</div>,
          },
          {
            route: "/work",
            name: "Work",
            component: <div>Work Page Content</div>,
            icon: <div>💼</div>,
          },
          {
            route: "/blog",
            name: "Blog",
            component: <div>Blog Page Content</div>,
            icon: <div>📝</div>,
          },
          {
            route: "/settings",
            name: "Settings",
            component: <SettingsPage />,
            icon: <div>⚙️</div>,
          },
          {
            route: "/protected",
            name: "Protected",
            component: <div>Protected Page Content</div>,
            protected: true,
            icon: <div>🔒</div>,
          },
        ]}
      />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);

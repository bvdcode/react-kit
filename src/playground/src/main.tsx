import { createRoot } from "react-dom/client";
import { AppShell } from "@bvdcode/react-kit/AppShell";

const App = () => {
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
        appName="React Kit"
        pages={[
          {
            route: "/",
            name: "Home",
            component: (
              <div>
                Home Page Content <a href="/dawdaw">no</a>
              </div>
            ),
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
            component: <div>Settings Page Content</div>,
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

import { createRoot } from "react-dom/client";
import { AppShell } from "../../package/src/AppShell";

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
        appName="React Kit"
        authConfig={{
          login: async (credentials) => {
            if (credentials.username === "pigland@belov.us") {
              return {
                accessToken: "fake-access-token",
                refreshToken: "fake-refresh-token",
              };
            } else {
              throw new Error("Invalid username or password");
            }
          },
          getUserInfo(axiosInstance) {
            return Promise.resolve({
              id: "1",
              username: "pigland@belov.us",
              displayName: "Mr. Pig",
              avatarUrl:
                "https://cdn.vectorstock.com/i/500p/97/68/account-avatar-dark-mode-glyph-ui-icon-vector-44429768.jpg",
            });
          },
          onRefreshToken(refreshToken) {
            alert("Refreshing token: " + refreshToken);
            return Promise.resolve({
              accessToken: "new-fake-access-token",
              refreshToken: "new-fake-refresh-token",
            });
          },
        }}
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
            icon: <div>🔒</div>,
          },
        ]}
      />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);

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
            const url = "http://localhost:5182/api/v1/auth/login";
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            });
            if (!response.ok) {
              throw new Error("Login failed");
            }
            return response.json();
          },
          getUserInfo: async (axiosInstance) => {
            const url = "http://localhost:5182/api/v1/users/me";
            const response = await fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!response.ok) {
              throw new Error("Failed to fetch user info");
            }
            return response.json();
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
            route: "/files",
            name: "Files",
            component: <div>Files Page Content</div>,
            icon: <div>📁</div>,
          },
        ]}
      />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);

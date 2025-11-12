import { createRoot } from "react-dom/client";
import { AppShell } from "../../package/src/AppShell";
import type { UserInfo, TokenPair } from "../../package/src/types";

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
          login: async (credentials, axiosInstance) => {
            const response = await axiosInstance.post<TokenPair>(
              "http://localhost:5182/api/v1/auth/login",
              credentials,
            );
            return response.data;
          },
          getUserInfo: async (axiosInstance) => {
            const response = await axiosInstance.get<UserInfo>(
              "http://localhost:5182/api/v1/users/me",
            );
            return response.data;
          },
          onRefreshToken: async (refreshToken, axiosInstance) => {
            const response = await axiosInstance.post<TokenPair>(
              "http://localhost:5182/api/v1/auth/refresh",
              { refreshToken },
            );
            return response.data;
          },
          onLogout: async (refreshToken, axiosInstance) => {
            if (refreshToken) {
              await axiosInstance.post(
                "http://localhost:5182/api/v1/auth/revoke",
                { refreshToken },
              );
            }
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

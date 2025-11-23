import { Box } from "@mui/material";
import { createRoot } from "react-dom/client";
import enTranslations from "./locales/en.json";
import ruTranslations from "./locales/ru.json";
import { HomePage } from "./components/HomePage";
import { AppShell } from "../../package/src/AppShell";
import type { UserInfo, TokenPair } from "../../package/src/types";

const App = () => {
  return (
    <div>
      <AppShell
        appName="React Kit"
        translations={{
          en: enTranslations,
          ru: ruTranslations,
        }}
        authConfig={{
          usernamePattern: /^[a-zA-Z0-9._-]+$/,
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
          refreshToken: async (refreshToken, axiosInstance) => {
            const response = await axiosInstance.post<TokenPair>(
              "http://localhost:5182/api/v1/auth/refresh",
              { refreshToken },
            );
            return response.data;
          },
          logout: async (refreshToken, axiosInstance) => {
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
            component: <HomePage />,
            icon: <div>🏠</div>,
          },
          {
            route: "/long",
            name: "Long Content",
            component: (
              <div>
                {Array.from({ length: 100 }, (_, i) => (
                  <p key={i}>This is line {i + 1} of long content.</p>
                ))}
              </div>
            ),
            icon: <div>🏠</div>,
          },
          {
            route: "/files",
            name: "Files",
            component: (
              <Box display="flex" width="100%" height="100%" bgcolor="red">
                Test
              </Box>
            ),
            icon: <div>📁</div>,
          },
        ]}
      />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);

import type { ReactNode } from "react";
import type { AxiosInstance } from "axios";

export type ReactKitProps = {
  appName: string;
  logoUrl?: string;
  baseURL?: string;
  basename?: string;
  pages: ReactKitPage[];
  authConfig?: AuthConfig;
};

export type ReactKitPage = {
  route: string;
  name?: string;
  icon?: ReactNode;
  component: ReactNode;
  protected?: boolean;
};

export type ThemeMode = "light" | "dark";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
}

export interface AuthConfig {
  onLogin?: (
    credentials: LoginCredentials,
  ) => Promise<TokenPair>;
  onRefreshToken?: (refreshToken: string) => Promise<TokenPair>;
  onGetUserInfo?: (axiosInstance: AxiosInstance) => Promise<UserInfo>;
  onLogout?: () => Promise<void> | void;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

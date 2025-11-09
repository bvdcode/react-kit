import type { ReactNode } from "react";
import type { AxiosInstance } from "axios";

export type ReactKitPage = {
  route: string;
  name?: string;
  icon?: ReactNode;
  component: ReactNode;
  protected?: boolean;
};

export type ReactKitProps = {
  appName: string;
  logoUrl?: string;
  basename?: string;
  pages: ReactKitPage[];
};

export type ThemeMode = "light" | "dark";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthConfig {
  baseURL: string;
  tokenStorageKey?: string;
  onLogin?: (
    axiosInstance: AxiosInstance,
    credentials: LoginCredentials,
  ) => Promise<TokenPair>;
  onRefreshToken?: (refreshToken: string) => Promise<TokenPair>;
  onGetUserInfo?: (axiosInstance: AxiosInstance) => Promise<UserInfo>;
  onLogout?: () => Promise<void> | void;
  onUnauthorized?: () => void;
}

export interface LoginCredentials {
  username?: string;
  email?: string;
  password: string;
}

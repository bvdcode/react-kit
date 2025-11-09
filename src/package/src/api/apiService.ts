import type {
  UserInfo,
  TokenPair,
  AuthConfig,
  LoginCredentials,
} from "../types";
import type { AxiosInstance } from "axios";
import { AuthenticatedAxiosInstance } from "./axiosInstance";

export class ApiService {
  private authAxios: AuthenticatedAxiosInstance;
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
    this.authAxios = new AuthenticatedAxiosInstance(config);
  }

  /**
   * Get axios instance for external code usage
   */
  public getAxios(): AxiosInstance {
    return this.authAxios.getAxiosInstance();
  }

  /**
   * Login - external code must provide a handler
   */
  public async login(credentials: LoginCredentials): Promise<TokenPair> {
    if (!this.config.onLogin) {
      throw new Error("onLogin handler is not configured");
    }

    const tokens = await this.config.onLogin(this.getAxios(), credentials);
    this.authAxios.setTokens(tokens);
    return tokens;
  }

  /**
   * Get user info - external code must provide a handler
   */
  public async getUserInfo(): Promise<UserInfo> {
    if (!this.config.onGetUserInfo) {
      throw new Error("onGetUserInfo handler is not configured");
    }

    return await this.config.onGetUserInfo(this.getAxios());
  }

  /**
   * Logout - clears tokens and calls the handler
   */
  public async logout(): Promise<void> {
    this.authAxios.clearTokens();

    if (this.config.onLogout) {
      await this.config.onLogout();
    }
  }

  /**
   * Check if there are active tokens
   */
  public isAuthenticated(): boolean {
    return this.authAxios.hasTokens();
  }

  /**
   * Get access token
   */
  public getAccessToken(): string | null {
    return this.authAxios.getAccessToken();
  }
}

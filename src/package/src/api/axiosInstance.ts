import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import type { ReactKitProps, TokenPair } from "../types";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });
  failedQueue = [];
};

export class AuthenticatedAxiosInstance {
  private axiosInstance: AxiosInstance;
  private props: ReactKitProps;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(props: ReactKitProps) {
    this.props = props;
    this.axiosInstance = axios.create({
      baseURL: props.baseURL,
    });

    this.setupInterceptors();
    this.loadTokensFromStorage();
  }

  private loadTokensFromStorage() {
    const storageKey = this.props.authConfig?.tokenStorageKey || "auth_tokens";
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const tokens = JSON.parse(stored) as TokenPair;
        this.setTokens(tokens);
      }
    } catch (error) {
      console.error("Failed to load tokens from storage:", error);
    }
  }

  private saveTokensToStorage(tokens: TokenPair) {
    const storageKey = this.config.tokenStorageKey || "auth_tokens";
    try {
      localStorage.setItem(storageKey, JSON.stringify(tokens));
    } catch (error) {
      console.error("Failed to save tokens to storage:", error);
    }
  }

  private clearTokensFromStorage() {
    const storageKey = this.config.tokenStorageKey || "auth_tokens";
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("Failed to clear tokens from storage:", error);
    }
  }

  private setupInterceptors() {
    // Request interceptor - add token to every request
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor - handle 401 error
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // If 401 error and not a retry request
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            // If refresh is already in progress, queue the request
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                return this.axiosInstance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          if (!this.refreshToken) {
            // No refresh token - logout
            isRefreshing = false;
            processQueue(new Error("No refresh token available"), null);
            this.handleUnauthorized();
            return Promise.reject(error);
          }

          try {
            // Try to refresh the token
            if (!this.config.onRefreshToken) {
              throw new Error("onRefreshToken handler is not configured");
            }

            const tokens = await this.config.onRefreshToken(this.refreshToken);
            this.setTokens(tokens);
            this.saveTokensToStorage(tokens);

            // Process all queued requests
            processQueue(null, tokens.accessToken);

            // Retry the original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
            }
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // Refresh token failed - logout
            processQueue(refreshError, null);
            this.handleUnauthorized();
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  private handleUnauthorized() {
    this.clearTokens();
    this.clearTokensFromStorage();

    if (this.config.onUnauthorized) {
      this.config.onUnauthorized();
    }

    if (this.config.onLogout) {
      const result = this.config.onLogout();
      if (result instanceof Promise) {
        result.catch((err: unknown) => {
          console.error("Logout handler failed:", err);
        });
      }
    }
  }

  public setTokens(tokens: TokenPair) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }

  public clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  public hasTokens(): boolean {
    return !!(this.accessToken && this.refreshToken);
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }
}

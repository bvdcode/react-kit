import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import type { ReactKitProps, TokenPair } from "../types";
import { useAuthStore } from "../store/authStore";

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

  constructor(props: ReactKitProps) {
    this.props = props;
    this.axiosInstance = axios.create({
      baseURL: props.baseURL,
    });

    this.setupInterceptors();
    this.restoreAccessTokenFromStore();
  }

  private restoreAccessTokenFromStore(): void {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      this.accessToken = accessToken;
    }
  }

  public getRefreshToken(): string | null {
    return useAuthStore.getState().getRefreshToken();
  }

  private setTokensInStore(tokens: TokenPair): void {
    useAuthStore.getState().setRefreshToken(tokens.refreshToken);
    useAuthStore.getState().setAccessToken(tokens.accessToken);
  }

  private clearTokensInStore(): void {
    useAuthStore.getState().clearTokens();
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

          const refreshToken = this.getRefreshToken();
          if (!refreshToken) {
            // No refresh token - logout
            isRefreshing = false;
            processQueue(new Error("No refresh token available"), null);
            this.handleUnauthorized();
            return Promise.reject(error);
          }

          try {
            // Try to refresh the token
            if (!this.props.authConfig?.refreshToken) {
              throw new Error("onRefreshToken handler is not configured");
            }

            const tokens = await this.props.authConfig.refreshToken(
              refreshToken,
              this.axiosInstance,
            );
            this.accessToken = tokens.accessToken;
            this.setTokensInStore(tokens);

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
    const refreshToken = this.getRefreshToken();

    if (this.props.authConfig?.logout) {
      const result = this.props.authConfig.logout(
        refreshToken,
        this.axiosInstance,
      );
      if (result instanceof Promise) {
        result.catch((err: unknown) => {
          console.error("Logout handler failed:", err);
        });
      }
    }

    this.accessToken = null;
    this.clearTokensInStore();
  }

  public setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  public setTokens(tokens: TokenPair): void {
    this.accessToken = tokens.accessToken;
    this.setTokensInStore(tokens);
  }

  public clearTokens(): void {
    this.accessToken = null;
    this.clearTokensInStore();
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  public hasTokens(): boolean {
    return !!(this.accessToken && this.getRefreshToken());
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginCredentials, TokenPair } from "../types";

interface AuthStore {
  refreshToken: string | null;
  accessToken: string | null;
  apiService: any | null;
  
  setApiService: (service: any) => void;
  setRefreshToken: (token: string) => void;
  setAccessToken: (token: string) => void;
  getRefreshToken: () => string | null;
  clearTokens: () => void;
  
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      refreshToken: null,
      accessToken: null,
      apiService: null,
      
      setApiService: (service: any) => set({ apiService: service }),
      
      setRefreshToken: (token: string) => set({ refreshToken: token }),
      
      setAccessToken: (token: string) => set({ accessToken: token }),
      
      getRefreshToken: () => get().refreshToken,
      
      clearTokens: () => set({ refreshToken: null, accessToken: null }),
      
      login: async (credentials: LoginCredentials) => {
        const { apiService } = get();
        if (!apiService) {
          throw new Error("API service is not initialized");
        }
        
        const tokens: TokenPair = await apiService.login(credentials);
        
        // Save refresh token to store (persisted)
        set({ refreshToken: tokens.refreshToken });
        
        // Save access token to memory only
        set({ accessToken: tokens.accessToken });
      },
      
      logout: async () => {
        const { apiService } = get();
        if (apiService) {
          await apiService.logout();
        }
        set({ refreshToken: null, accessToken: null });
      },
    }),
    {
      name: "react-kit-auth",
      partialize: (state) => ({ 
        refreshToken: state.refreshToken 
      }),
    },
  ),
);

import { create } from "zustand";

interface AuthStore {
  refreshToken: string | null;
  setRefreshToken: (token: string) => void;
  getRefreshToken: () => string | null;
  clearRefreshToken: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  refreshToken: null,
  setRefreshToken: (token: string) => set(() => ({ refreshToken: token })),
  getRefreshToken: () => get().refreshToken,
  clearRefreshToken: () => set(() => ({ refreshToken: null })),
}));

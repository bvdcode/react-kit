import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  refreshToken: string | null;
  setRefreshToken: (token: string) => void;
  getRefreshToken: () => string | null;
  clearRefreshToken: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      refreshToken: null,
      setRefreshToken: (token: string) => set(() => ({ refreshToken: token })),
      getRefreshToken: () => get().refreshToken,
      clearRefreshToken: () => set(() => ({ refreshToken: null })),
    }),
    {
      name: "react-kit-auth",
    },
  ),
);

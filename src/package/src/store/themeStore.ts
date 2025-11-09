import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark";

interface ThemeStore {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "dark",
      toggleTheme: () =>
        set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
    }),
    {
      name: "react-kit-theme",
    }
  )
);

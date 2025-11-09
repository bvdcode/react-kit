import { darkTheme } from "../themes/darkTheme";
import { lightTheme } from "../themes/lightTheme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createContext, useContext, useMemo, ReactNode } from "react";
import { useThemeStore } from "../store/themeStore";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeContextProvider");
  }
  return context;
};

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const mode = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode],
  );

  const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

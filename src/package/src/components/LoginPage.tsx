import {
  Box,
  Card,
  Stack,
  Alert,
  Avatar,
  Button,
  TextField,
  Typography,
  CardContent,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from "react-i18next";
import { AuthError, ReactKitProps } from "../types";
import defaultLogoUrl from "../assets/default-logo.svg";

type Props = {
  appProps: ReactKitProps;
};

const LoginPage: React.FC<Props> = ({ appProps }) => {
  const { t } = useTranslation();
  const login = useAuthStore((s) => s.login);
  const apiService = useAuthStore((s) => s.apiService);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check if onLogin handler is configured
  const isConfigError = !apiService;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ username, password });
      // No need to navigate - ProtectedContent will re-render
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("login.unknownError"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3} alignItems="center">
            <Avatar
              src={appProps.logoUrl ?? defaultLogoUrl}
              alt={appProps.appName}
              sx={{ width: 80, height: 80 }}
            />
            <Typography variant="h5" component="div" fontWeight="bold">
              {appProps.appName}
            </Typography>
          </Stack>

          {isConfigError && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {t("login.configError")}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Stack spacing={2}>
              <TextField
                label={t("login.username")}
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading || isConfigError}
                autoFocus
                autoComplete="username"
                required
              />
              <TextField
                label={t("login.password")}
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || isConfigError}
                autoComplete="current-password"
                required
                slotProps={{
                  input: {
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading || isConfigError}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("login.signIn")
                )}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;

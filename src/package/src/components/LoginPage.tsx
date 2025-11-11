import {
  Box,
  Card,
  Alert,
  Button,
  TextField,
  Typography,
  CardContent,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from "react-i18next";
import { AuthError } from "../types";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const login = useAuthStore((s) => s.login);
  const apiService = useAuthStore((s) => s.apiService);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {t("login.title")}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            align="center"
            sx={{ mb: 3 }}
          >
            {t("login.subtitle")}
          </Typography>

          {isConfigError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {t("login.configError")}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label={t("login.username")}
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading || isConfigError}
              autoFocus
              autoComplete="username"
              required
            />
            <TextField
              label={t("login.password")}
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || isConfigError}
              autoComplete="current-password"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading || isConfigError}
              sx={{ mt: 3 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("login.signIn")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;

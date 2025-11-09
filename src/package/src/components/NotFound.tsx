import React from "react";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            py: 8,
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              height: 120,
              borderRadius: "50%",
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.05)",
              mb: 4,
            }}
          >
            <SearchOffIcon
              sx={{
                fontSize: 64,
                color: theme.palette.primary.main,
                opacity: 0.8,
              }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "4rem", sm: "6rem", md: "8rem" },
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 2,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "text.primary",
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 4,
              maxWidth: 500,
              mx: "auto",
            }}
          >
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              boxShadow: theme.shadows[4],
              "&:hover": {
                boxShadow: theme.shadows[8],
              },
            }}
          >
            Go Back Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;

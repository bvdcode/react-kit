import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation("myApp");

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        {t("home.title")}
      </Typography>
      <Typography variant="body1">{t("home.description")}</Typography>
      <Typography variant="h5" sx={{ mt: 3 }}>
        {t("greeting", { name: "User" })}
      </Typography>
    </Box>
  );
}

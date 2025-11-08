import {
  Box,
  Tab,
  Tabs,
  Avatar,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import { ReactKitProps } from "../types";
import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationBar: FunctionComponent<ReactKitProps> = ({
  pages,
  logoUrl,
  appName,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = pages.findIndex(
    (page) => page.route === location.pathname,
  );

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          gap: 2,
          userSelect: "none",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          <Avatar src={logoUrl} alt={appName} />
          <Typography
            variant="h6"
            component="div"
            noWrap
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            {appName}
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", minWidth: 0, px: 1 }}
        >
          <Tabs
            value={currentTab !== -1 ? currentTab : false}
            textColor="inherit"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            onChange={(_, value) => {
              if (value !== false) {
                navigate(pages[value].route);
              }
            }}
          >
            {pages.map((page) => (
              <Tab key={page.route} label={page.name} />
            ))}
          </Tabs>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

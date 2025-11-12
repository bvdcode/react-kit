import {
  Box,
  Tab,
  Tabs,
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { Logout, LightMode, DarkMode } from "@mui/icons-material";
import { ThemeToggle } from ".";
import { ReactKitProps } from "../types";
import { FunctionComponent, useState, useEffect } from "react";
import defaultLogoUrl from "../assets/default-logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const NavigationBar: FunctionComponent<ReactKitProps> = ({
  pages,
  logoUrl,
  appName,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const logout = useAuthStore((s) => s.logout);
  const apiService = useAuthStore((s) => s.apiService);
  const mode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [userInfo, setUserInfo] = useState<{
    displayName: string;
    username: string;
    avatarUrl?: string;
  } | null>(null);

  const currentTab = pages.findIndex(
    (page) => page.route === location.pathname,
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (apiService) {
        try {
          const info = await apiService.getUserInfo();
          setUserInfo(info);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    };
    fetchUserInfo();
  }, [apiService]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handlePopoverClose();
    await logout();
  };

  // Language switching handled by LanguageSwitcher component

  const open = Boolean(anchorEl);

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
          <Avatar src={logoUrl ?? defaultLogoUrl} alt={appName} />
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
          <IconButton
            onMouseEnter={handlePopoverOpen}
            onClick={handlePopoverOpen}
            sx={{ p: 0 }}
          >
            <Avatar
              src={userInfo?.avatarUrl}
              alt={userInfo?.displayName || "User"}
            >
              {userInfo?.displayName?.[0]?.toUpperCase() || "U"}
            </Avatar>
          </IconButton>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                onMouseLeave: handlePopoverClose,
                sx: { mt: 1 },
              },
            }}
          >
            <Box sx={{ p: 2, minWidth: 250 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {userInfo?.displayName || "User"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {!userInfo?.username.includes("@") && "@"}
                {userInfo?.username || "username"}
              </Typography>
            </Box>
            <Divider />
            <List dense>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  {mode === "dark" ? <LightMode /> : <DarkMode />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    mode === "dark"
                      ? t("navigation.lightMode")
                      : t("navigation.darkMode")
                  }
                />
              </ListItemButton>
              <LanguageSwitcher />
              <Divider />
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={t("navigation.logout")} />
              </ListItemButton>
            </List>
          </Popover>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

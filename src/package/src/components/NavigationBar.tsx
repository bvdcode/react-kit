import {
  Box,
  Tab,
  Tabs,
  List,
  Avatar,
  AppBar,
  Drawer,
  Toolbar,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import { ReactKitProps } from "../types";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment, FunctionComponent, useState } from "react";

const NavigationBar: FunctionComponent<ReactKitProps> = ({
  pages,
  logoUrl,
  appName,
  navigationPosition,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (navigationPosition === "top") {
    const currentTab = pages.findIndex(
      (page) => page.route === location.pathname,
    );

    return (
      <AppBar position="static">
        <Toolbar
          sx={{ gap: 2, userSelect: "none", justifyContent: "space-between" }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", flexShrink: 0, minWidth: 0 }}
          >
            <Avatar src={logoUrl} alt={appName} />
            <Typography variant="h6" component="div" noWrap>
              {appName}
            </Typography>
          </Box>
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
          <Box sx={{ flexShrink: 0 }}>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  const handlePageNavigation = (route: string) => {
    navigate(route);
    setMobileOpen(false);
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            {logoUrl && <Avatar src={logoUrl} alt={appName} />}
            <MenuIcon />
            <Typography variant="h6" noWrap component="div">
              {appName}
            </Typography>
          </Box>
          <Box>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          padding={2}
          gap={2}
          sx={{ cursor: "pointer", userSelect: "none" }}
        >
          {logoUrl && <Avatar src={logoUrl} alt={appName} />}
          <Typography variant="h6" noWrap component="div">
            {appName}
          </Typography>
        </Box>
        <List>
          {pages.map((page) => {
            const isActive = location.pathname === page.route;
            return (
              <ListItem key={page.route} disablePadding>
                <ListItemButton
                  selected={isActive}
                  onClick={() => handlePageNavigation(page.route)}
                >
                  {page.icon && <ListItemIcon>{page.icon}</ListItemIcon>}
                  <ListItemText primary={page.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Fragment>
  );
};

export default NavigationBar;

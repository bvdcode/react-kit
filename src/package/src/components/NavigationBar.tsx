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
import { ReactKitProps } from "../types";
import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationBar: FunctionComponent<ReactKitProps> = ({
  pages,
  logoUrl,
  appName,
  navigationPosition,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (navigationPosition === "top") {
    const currentTab = pages.findIndex(
      (page) => page.route === location.pathname,
    );

    return (
      <AppBar position="static">
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            <Avatar src={logoUrl} alt={appName} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexShrink: 0, mr: 1 }}
            >
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
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <Drawer variant="permanent" anchor="left">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          {appName}
        </Typography>
      </Toolbar>
      <List>
        {pages.map((page) => {
          const isActive = location.pathname === page.route;
          return (
            <ListItem key={page.route} disablePadding>
              <ListItemButton
                selected={isActive}
                onClick={() => navigate(page.route)}
              >
                {page.icon && <ListItemIcon>{page.icon}</ListItemIcon>}
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default NavigationBar;

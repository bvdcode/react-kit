import {
  Tab,
  Tabs,
  List,
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
import { Link, useLocation } from "react-router-dom";

const NavigationBar: FunctionComponent<ReactKitProps> = ({
  pages,
  navigationPosition,
  appName,
}) => {
  const location = useLocation();

  if (navigationPosition === "top") {
    const currentTab = pages.findIndex(
      (page) => page.route === location.pathname,
    );

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexShrink: 0, mr: 2 }}
          >
            {appName}
          </Typography>
          <Tabs
            value={currentTab !== -1 ? currentTab : false}
            textColor="inherit"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {pages.map((page) => (
              <Tab
                key={page.route}
                label={page.name}
                component={Link}
                to={page.route}
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <Drawer variant="permanent" anchor="left">
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {appName}
        </Typography>
      </Toolbar>
      <List>
        {pages.map((page) => {
          const isActive = location.pathname === page.route;
          return (
            <ListItem key={page.route} disablePadding>
              <ListItemButton
                component={Link}
                to={page.route}
                selected={isActive}
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

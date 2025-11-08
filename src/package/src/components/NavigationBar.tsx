import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ReactKitPage } from "../types";
import { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";

type NavigationBarProps = {
  pages: ReactKitPage[];
  orientation: "horizontal" | "vertical";
  appName: string;
};

const NavigationBar: FunctionComponent<NavigationBarProps> = ({
  pages,
  orientation,
  appName,
}) => {
  const location = useLocation();
  const isVertical = orientation === "vertical";

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: isVertical ? "stretch" : "center",
        gap: 2,
        p: 2,
        bgcolor: "background.paper",
        borderRight: isVertical ? 1 : 0,
        borderBottom: isVertical ? 0 : 1,
        borderColor: "divider",
        minWidth: isVertical ? 240 : "auto",
        width: isVertical ? 240 : "100%",
      }}
    >
      <Box
        sx={{
          fontWeight: 700,
          fontSize: isVertical ? "1.25rem" : "1.5rem",
          mb: isVertical ? 2 : 0,
          mr: isVertical ? 0 : 3,
        }}
      >
        {appName}
      </Box>

      <List
        sx={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          gap: isVertical ? 0 : 1,
          p: 0,
          flex: 1,
        }}
      >
        {pages.map((page) => {
          const isActive = location.pathname === page.route;

          return (
            <ListItem
              key={page.route}
              disablePadding
              sx={{
                width: isVertical ? "100%" : "auto",
              }}
            >
              <ListItemButton
                component={Link}
                to={page.route}
                selected={isActive}
                sx={{
                  borderRadius: 1,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  },
                }}
              >
                {page.icon && (
                  <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                    {page.icon}
                  </ListItemIcon>
                )}
                {page.name && (
                  <ListItemText
                    primary={page.name}
                    primaryTypographyProps={{
                      fontSize: isVertical ? "0.875rem" : "1rem",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default NavigationBar;

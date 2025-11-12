import { Box, AppBar, Toolbar } from "@mui/material";
import { ReactKitProps } from "../types";
import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Branding from "./Branding";
import NavTabs from "./NavTabs";
import UserMenu from "./UserMenu";

const NavigationBar: FunctionComponent<ReactKitProps> = ({
  pages,
  logoUrl,
  appName,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

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
        <Branding
          appName={appName}
          logoUrl={logoUrl}
          onClick={() => navigate("/")}
        />
        <NavTabs
          pages={pages}
          currentPath={location.pathname}
          onNavigate={(route: string) => navigate(route)}
        />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

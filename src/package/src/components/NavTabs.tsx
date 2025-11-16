import { isValidElement } from "react";
import type { ReactKitPage } from "../types";
import { Box, Tabs, Tab, Tooltip } from "@mui/material";

export type NavTabsProps = {
  pages: ReactKitPage[];
  currentPath: string;
  onNavigate: (route: string) => void;
};

export default function NavTabs({
  pages,
  currentPath,
  onNavigate,
}: NavTabsProps) {
  const currentIndex = pages.findIndex((p) => p.route === currentPath);
  if (!pages || pages.length <= 1) {
    return <Box sx={{ minWidth: 0 }} />;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", minWidth: 0 }}>
      <Tabs
        value={currentIndex !== -1 ? currentIndex : false}
        textColor="inherit"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        onChange={(_, value) => {
          if (value !== false) {
            const page = pages[value];
            onNavigate(page.url ?? page.route);
          }
        }}
      >
        {pages.map((page) => {
          const iconEl = isValidElement(page.icon) ? page.icon : undefined;
          const labelText = page.name || page.route;

          return (
            <Tab
              key={page.route}
              aria-label={labelText}
              label={!iconEl ? labelText : undefined}
              icon={
                iconEl && (
                  <Tooltip title={labelText} arrow>
                    {iconEl}
                  </Tooltip>
                )
              }
              sx={{ minWidth: 40, px: 1 }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}

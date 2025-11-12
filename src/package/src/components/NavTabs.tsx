import { Box, Tabs, Tab } from "@mui/material";
import type { ReactKitPage } from "../types";

export type NavTabsProps = {
  pages: ReactKitPage[];
  currentPath: string;
  onNavigate: (route: string) => void;
};

export default function NavTabs({ pages, currentPath, onNavigate }: NavTabsProps) {
  const currentIndex = pages.findIndex((p) => p.route === currentPath);
  return (
    <Box sx={{ display: "flex", justifyContent: "center", minWidth: 0, px: 1 }}>
      <Tabs
        value={currentIndex !== -1 ? currentIndex : false}
        textColor="inherit"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        onChange={(_, value) => {
          if (value !== false) {
            onNavigate(pages[value].route);
          }
        }}
      >
        {pages.map((page) => (
          <Tab key={page.route} label={page.name} />
        ))}
      </Tabs>
    </Box>
  );
}

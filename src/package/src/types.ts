import type { ReactNode } from "react";

export type ReactKitPage = {
  route: string;
  name?: string;
  icon?: ReactNode;
  component: Element;
  protected?: boolean;
};

export type ReactKitProps = {
  appName: string;
  basename?: string;
  pages: ReactKitPage[];
  navigationPosition: "top" | "side";
};

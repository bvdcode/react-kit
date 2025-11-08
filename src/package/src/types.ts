import type { ReactNode } from "react";

export type ReactKitPage = {
  route: string;
  name?: string;
  icon?: ReactNode;
  component: ReactNode;
  protected?: boolean;
};

export type ReactKitProps = {
  appName: string;
  logoUrl?: string;
  basename?: string;
  pages: ReactKitPage[];
};

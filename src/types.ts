import type { ComponentType, ReactNode } from "react";

export type ReactKitPage = {
  route: string;
  name?: string;
  icon?: ReactNode;
  protected?: boolean;
  component: ComponentType;
};

export type ReactKitProps = {
  pages: ReactKitPage[];
  basename?: string;
  isAuthenticated?: boolean;
  redirectPath?: string;
  notFoundElement?: ReactNode;
  layout?: (children: ReactNode, pages: ReactKitPage[]) => ReactNode;
};

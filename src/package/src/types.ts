import type { ReactNode } from "react";

export type ReactKitPage = {
  route: string;
  name?: string;
  icon?: ReactNode;
  protected?: boolean;
  component: Element;
};

export type ReactKitProps = {
  basename?: string;
  redirectPath?: string;
  pages: ReactKitPage[];
  isAuthenticated?: boolean;
  notFoundElement?: ReactNode;
  layout?: (children: ReactNode, pages: ReactKitPage[]) => ReactNode;
};

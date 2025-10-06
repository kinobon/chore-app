import React from "react";
import { AppBar } from "./ui/AppBar";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  showAppBar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  title,
  children,
  showAppBar = true,
}) => {
  return (
    <div className="flex flex-col h-screen">
      {showAppBar && <AppBar title={title} />}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20">{children}</div>
    </div>
  );
};

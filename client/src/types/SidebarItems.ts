import type React from "react";

export interface SidebarItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

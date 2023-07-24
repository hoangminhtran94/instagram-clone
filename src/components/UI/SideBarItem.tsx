"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import type { FC, ReactNode } from "react";
interface SideBarItemProps {
  href: string;
  className?: string;
  children: ReactNode;
}
const SideBarItem: FC<SideBarItemProps> = ({ href, className, children }) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={`p-4 ${
        path === href && "font-bold"
      } hover:bg-slate-100 rounded-lg transition-all text-lg cursor-pointer ${className}`}
    >
      {children}
    </Link>
  );
};

export default SideBarItem;

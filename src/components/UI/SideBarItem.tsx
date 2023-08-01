"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import SideBarIcon from "./SideBarIcon";
import type { FC, ReactNode, MouseEventHandler } from "react";
import SideBarImage from "./SidebarImage";
interface SideBarItemProps {
  href?: string;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  activeIcon?: ReactNode;
  variant?:
    | "home"
    | "search"
    | "explore"
    | "reels"
    | "messages"
    | "notifications"
    | "create"
    | "profile";
  onClick?: MouseEventHandler;
  image?: { src: string; alt: string };
}
const SideBarItem: FC<SideBarItemProps> = ({
  href,
  className,
  children,
  icon,
  variant,
  activeIcon,
  onClick,
  image,
}) => {
  const path = usePathname();
  if (!href) {
    return (
      <button
        className={`p-4 hover:sidebar-item hover:bg-slate-100 rounded-lg transition-all text-base cursor-pointer flex gap-3 ${className}`}
        onClick={onClick}
      >
        {icon && <SideBarIcon icon={icon} />}

        {children}
      </button>
    );
  }
  return (
    <Link
      href={href}
      className={`p-4 ${
        path === href && "font-bold"
      } hover:bg-slate-100 hover:sidebar-item rounded-lg transition-all text-base cursor-pointer flex items-center gap-3 ${className}`}
    >
      {icon && variant && (
        <SideBarIcon active={path === href} icon={icon} className={variant} />
      )}
      {icon && !activeIcon && !variant && <SideBarIcon icon={icon} />}
      {icon && activeIcon && (
        <SideBarIcon
          active={path === href}
          icon={path === href ? activeIcon : icon}
        />
      )}
      {!icon && image && <SideBarImage src={image.src} alt={image.alt} />}
      {children}
    </Link>
  );
};

export default SideBarItem;

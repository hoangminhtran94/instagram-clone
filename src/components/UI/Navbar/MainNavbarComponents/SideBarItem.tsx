import Link from "next/link";
import SideBarIcon from "./SideBarIcon";
import type { FC, ReactNode, MouseEventHandler } from "react";
import SideBarImage from "./SidebarImage";
import { forwardRef } from "react";
interface SideBarItemProps {
  href?: string;
  btnActive?: boolean;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  activeIcon?: ReactNode;
  path?: string;
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
const SideBarItem = forwardRef<any, SideBarItemProps>(
  (
    {
      href,
      className,
      children,
      icon,
      variant,
      activeIcon,
      onClick,
      btnActive = false,
      image,
      path,
    },
    ref
  ) => {
    if (!href) {
      return (
        <button
          ref={ref}
          className={`p-4 hover:sidebar-item hover:bg-slate-100 rounded-lg transition-all text-base cursor-pointer flex gap-3 ${className}`}
          onClick={onClick}
        >
          {icon && activeIcon && (
            <SideBarIcon
              active={btnActive}
              icon={btnActive ? activeIcon : icon}
            />
          )}
          {icon && !activeIcon && (
            <SideBarIcon active={btnActive} icon={icon} className={variant} />
          )}

          {children}
        </button>
      );
    }
    return (
      <Link
        ref={ref}
        href={href}
        onClick={onClick}
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
  }
);

export default SideBarItem;

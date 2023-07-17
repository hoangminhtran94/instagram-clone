import Link from "next/link";
import type { FC, ReactNode } from "react";
interface SideBarItemProps {
  href: string;
  className?: string;
  children: ReactNode;
}
const SideBarItem: FC<SideBarItemProps> = ({ href, className, children }) => {
  return (
    <Link
      href={href}
      className={`p-4 hover:bg-slate-100 rounded-lg transition-all text-lg cursor-pointer ${className}`}
    >
      {children}
    </Link>
  );
};

export default SideBarItem;

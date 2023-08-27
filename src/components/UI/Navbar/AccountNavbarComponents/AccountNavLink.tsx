"use client";
import Link from "next/link";
import { LinkProps } from "next/link";
import { ComponentPropsWithoutRef, FC } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
const AccountNavLink: FC<LinkProps & ComponentPropsWithoutRef<"a">> = ({
  children,
  className,
  href,
  ...props
}) => {
  const path = useSelectedLayoutSegment();
  const active = path === href;
  return (
    <Link
      href={href}
      className={`px-4 py-3 text-sm transition-all ${
        active && "bg-gray-100"
      } hover:font-bold  rounded-lg ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default AccountNavLink;

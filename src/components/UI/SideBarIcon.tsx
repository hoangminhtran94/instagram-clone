import { FC, ReactNode } from "react";

interface SideBarIconProps {
  active?: boolean;
  icon: ReactNode;
  className?: string;
}
const SideBarIcon: FC<SideBarIconProps> = ({
  active = false,
  icon,
  className = "",
}) => {
  return <div className={`${className} ${active ? "active" : ""}`}>{icon}</div>;
};

export default SideBarIcon;

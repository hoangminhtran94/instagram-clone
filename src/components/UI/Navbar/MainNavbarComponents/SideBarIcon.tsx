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
  return (
    <div
      className={`${className} ${
        active ? "active" : ""
      } w-8 flex justify-center`}
    >
      {icon}
    </div>
  );
};

export default SideBarIcon;

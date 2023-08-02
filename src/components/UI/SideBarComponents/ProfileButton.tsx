import { FC } from "react";
import SideBarItem from "./SideBarItem";

interface ProfileButtonProps {
  path: string;
  secondaryMode: boolean;
  href: string;
}
const ProfileButton: FC<ProfileButtonProps> = ({
  path,
  secondaryMode,
  href,
}) => {
  return (
    <SideBarItem
      image={{
        src: "https://images.unsplash.com/photo-1690151711465-2bfe4e69f241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80",
        alt: "profileImage",
      }}
      href={href}
      path={path}
    >
      {!secondaryMode && "Profile"}
    </SideBarItem>
  );
};

export default ProfileButton;

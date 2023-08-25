import { FC } from "react";
import SideBarItem from "./SideBarItem";
import { LoginUser } from "@/models/user.models";

interface ProfileButtonProps {
  path: string;
  secondaryMode: boolean;
  user: LoginUser;
}
const ProfileButton: FC<ProfileButtonProps> = ({
  path,
  secondaryMode,
  user,
}) => {
  return (
    <SideBarItem
      image={{
        src: user.currentProfileImage
          ? user.currentProfileImage
          : "/images/default-avatar.jpg",
        alt: "profileImage",
      }}
      href={`/${user.id}`}
      path={path}
    >
      {!secondaryMode && "Profile"}
    </SideBarItem>
  );
};

export default ProfileButton;

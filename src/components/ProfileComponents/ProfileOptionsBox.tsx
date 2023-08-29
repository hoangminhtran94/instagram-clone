import { FC, MouseEventHandler } from "react";
import OptionBox, { OptionButton } from "../UI/OptionBox";
import { useAuthContext } from "@/context/authContext";
const ProfileOptionsBox: FC<{
  onCancel: MouseEventHandler;
  yourProfile: boolean;
}> = ({ onCancel, yourProfile }) => {
  const authContext = useAuthContext();
  const YOUR_PROFILE_OPTIONS: OptionButton[] = [
    {
      label: "Apps and Websites",
      action: (e) => {},
    },
    {
      label: "QR Code",
      action: (e) => {},
    },
    {
      label: "Notifications",
      action: (e) => {},
    },
    {
      label: "Settings and privacy",
      action: (e) => {},
    },
    {
      label: "Share to...",
      action: (e) => {},
    },
    {
      label: "Supervision",
      action: (e) => {},
    },
    {
      label: "Logout",
      action: (e) => {
        authContext.logout();
        onCancel(e);
      },
    },
  ];
  const OTHER_PROFILE_OPTIONS: OptionButton[] = [
    {
      label: "Block",
      textRed: true,
      action: (e) => {},
    },
    {
      label: "Restrict",
      textRed: true,
      action: (e) => {},
    },
    {
      label: "Report",
      textRed: true,
      action: (e) => {},
    },
    {
      label: "About this account",
      action: (e) => {},
    },
  ];
  return (
    <OptionBox
      buttons={yourProfile ? YOUR_PROFILE_OPTIONS : OTHER_PROFILE_OPTIONS}
      onCancel={onCancel}
    />
  );
};

export default ProfileOptionsBox;

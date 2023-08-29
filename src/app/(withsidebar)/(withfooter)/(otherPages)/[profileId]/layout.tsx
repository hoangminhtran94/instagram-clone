import ProfileSummary from "@/components/ProfileComponents/ProfileSummary";
import ProfileTabs from "@/components/ProfileComponents/ProfileTabs";
import { FC, ReactNode } from "react";

const ProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-[calc(630px+319px)] mx-auto mt-4">
      <div className="flex flex-col">
        <ProfileSummary />
        <ProfileTabs />
        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;

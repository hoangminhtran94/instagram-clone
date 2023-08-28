"use client";

import { UserProfile } from "@/models/user.models";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import Spinner from "../UI/Spinner/Spinner";

const ProfileSummary = () => {
  const { profileId } = useParams();
  const { data: userData, isLoading } = useQuery<UserProfile>({
    queryKey: ["user-profile", profileId],
    queryFn: async () => {
      const res = await fetch("/api/users/" + profileId);
      if (!res.ok) {
        return null;
      }
      return await res.json();
    },
  });
  if (isLoading) {
    return (
      <div className="h-[500px]">
        <Spinner />
      </div>
    );
  }
  if (!userData) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="flex gap-[80px] items-center p-10 pt-2 ">
      <ProfileImage
        image={userData.currentProfileImage ?? "/images/default-avatar.jpg"}
      />
      <ProfileInfo user={userData} />
    </div>
  );
};

export default ProfileSummary;

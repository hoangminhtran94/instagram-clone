"use client";
import { useState } from "react";
import ProfileNoContents from "./ProfileNoContents";
import ProfileInfo from "./ProfileInfo";
import ProfileImage from "./ProfileImage";
import ProfileTabs from "./ProfileTabs";
import ViewPosts from "./ViewPosts";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../UI/Spinner/Spinner";
import { UserProfile } from "@/models/user.models";
const ProfileMainPage = () => {
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
  const [currentTab, setCurrentTab] = useState(0);
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
  console.log(userData.youAreFollower)
  return (
    <div className="flex flex-col">
      <div className="flex gap-[80px] items-center p-10 pt-2 ">
        <ProfileImage
          image={userData.currentProfileImage ?? "/images/default-avatar.jpg"}
        />
        <ProfileInfo
          user={userData}
        />
      </div>
      <ProfileTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex justify-center">
        {currentTab === 0 && <ViewPosts posts={userData.posts} />}
        {currentTab === 1 && (
          <div className="flex flex-col w-full items-center">
            <div className="flex justify-between w-full">
              <p className="text-xs">{`Only you can see what you've saved`}</p>
              <button className="text-sm font-semibold text-blue-400 hover:text-slate-700">
                + New collection
              </button>
            </div>
            <ProfileNoContents
              src="/images/no-saved.png"
              alt="no-saved"
              header="Save"
              body="Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved."
            />
          </div>
        )}
        {currentTab === 2 && (
          <ProfileNoContents
            src="/images/no-tags.png"
            alt="no-tags"
            header="Photos of you"
            body="When people tag you in photos, they'll appear here."
          />
        )}
      </div>
    </div>
  );
};
export default ProfileMainPage;

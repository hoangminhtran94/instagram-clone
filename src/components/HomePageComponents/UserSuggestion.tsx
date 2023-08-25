"use client";
import { UserSummary } from "@/models/user.models";
import { FC } from "react";
import Image from "next/image";
import { useTransition } from "react";
import { followAction } from "@/actions/action";

const UserSuggestion: FC<{ user: UserSummary }> = ({ user }) => {
  const [loading, startTransition] = useTransition();
  return (
    <div className="flex gap-3">
      <div>
        <Image
          width={32}
          height={32}
          src={
            user.currentProfileImage
              ? user.currentProfileImage
              : "/images/default-avatar.jpg"
          }
          alt="profile-image"
          className=" w-8 h-8 rounded-full object-cover bg-center"
        />
      </div>
      <div className="flex-1">
        <p className="font-bold">{user.username}</p>
        <p className="">Suggested for you</p>
      </div>
      <button
        className="px-3 text-blue-400 font-bold"
        onClick={() => {
          startTransition(async () => {
            await followAction(user.id);
          });
        }}
      >
        Follow
      </button>
    </div>
  );
};

export default UserSuggestion;

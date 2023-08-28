"use client";
import { UserSummary } from "@/models/user.models";
import { FC } from "react";
import Image from "next/image";
import { queryClient } from "@/context/ReactQueryContext";
import { useMutation } from "@tanstack/react-query";
const UserSuggestion: FC<{ user: UserSummary }> = ({ user }) => {
  const { mutate, isLoading, error, isError } = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch("/api/users/following", {
        method: "POST",
        body: JSON.stringify({ followingId: userId }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something wrong happened");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestion"] });
    },
  });
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
        className="px-3 link-primary-light"
        onClick={() => {
          mutate(user.id);
        }}
      >
        Follow
      </button>
    </div>
  );
};

export default UserSuggestion;

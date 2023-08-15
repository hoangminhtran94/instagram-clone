import { prisma } from "@/lib/prisma";
import { Tag, PostImage } from "@prisma/client";
import { cookies } from "next/headers";
import { FC, ReactNode } from "react";
import jwt from "jsonwebtoken";
import ProfileContextProvider from "@/context/ProfileContext";

export interface UserData {
  yourProfile: boolean;
  saved: {
    id: string;
    ownerId: string;
    postId: string | null;
    reelPostId: string | null;
  }[];
  username: string;
  fullName: string;
  currentProfileImage: string;
  posts: {
    id: string;
    _count: {
      likes: number;
      comments: number;
    };
    images: PostImage[];
  }[];
  taggedPosts: Tag[];
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
}

const getUserData = async (profileId: string): Promise<UserData | null> => {
  const jwt_token = cookies().get("jwt_token")?.value;
  const secret = process.env.JWT_SECRET;
  let yourProfile = false;
  if (jwt_token && secret) {
    const verifiedToken = jwt.verify(jwt_token, secret) as { userId: string };
    yourProfile = verifiedToken.userId === profileId;
  }
  let user;
  try {
    user = await prisma.user.findFirstOrThrow({
      select: {
        username: true,
        fullName: true,
        currentProfileImage: true,
        posts: {
          select: {
            images: true,
            id: true,
            _count: { select: { likes: true, comments: true } },
          },
        },
        saved: true,
        taggedPosts: true,
        _count: { select: { posts: true, followers: true, following: true } },
      },
      where: { id: profileId },
    });
    return { ...user, yourProfile };
  } catch (error) {
    return null;
  }
};

const ProfileLayout: FC<{
  children: ReactNode;
  params: { profileId: string };
}> = async ({ children, params }) => {
  const profileId = params.profileId;
  const userData = await getUserData(profileId);
  return (
    <ProfileContextProvider user={userData}>{children}</ProfileContextProvider>
  );
};

export default ProfileLayout;

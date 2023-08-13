import ProfileMainPage from "@/components/UI/ProfileComponents/ProfileMainPage";
import { prisma } from "@/lib/prisma";
import { PostImage, Tag } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import ProfileContextProvider from "@/context/ProfileContext";

export interface UserData {
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

const getUserData = async (): Promise<UserData | null> => {
  const jwt_token = cookies().get("jwt_token")?.value;
  const secret = process.env.JWT_SECRET;

  if (jwt_token && secret) {
    const verifiedToken = jwt.verify(jwt_token, secret) as { userId: string };
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
        where: { id: verifiedToken.userId },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  return null;
};

const Profile = async () => {
  const userData = await getUserData();

  return (
    <ProfileContextProvider user={userData}>
      <div className="w-[calc(630px+319px)] mx-auto mt-4">
        <ProfileMainPage />
      </div>
    </ProfileContextProvider>
  );
};

export default Profile;

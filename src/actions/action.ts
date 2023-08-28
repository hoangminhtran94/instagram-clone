"use server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ExplorePost, PostComment } from "@/models/post.models";
import httpError from "http-errors";
import {
  changeCommentCountHandler,
  changeLikeCountHandler,
} from "./firebase.service";
export interface NewCommentDto {
  message: string;
  postId: string;
}
import { sampleSize } from "lodash";
import { UserSearchResult } from "@/models/user.models";
const splitArray = <T>(arr: T[], chunkSize: number): T[][] => {
  let result = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    let chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
};

export const getUserFromToken = () => {
  const token = cookies().get("jwt_token")?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) {
    return null;
  }
  let decoded;
  try {
    decoded = jwt.verify(token, secret);
    const userId = (decoded as { [key: string]: string }).userId;
    return userId;
  } catch (error) {
    return null;
  }
};
export const getUserDataFromToken = async () => {
  const userId = getUserFromToken();
  if (userId) {
    try {
      return await prisma.user.findFirstOrThrow({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          currentProfileImage: true,
          email: true,
          fullName: true,
        },
      });
    } catch (error) {
      return null;
    }
  }
  return null;
};

export const addNewComment = async (data: NewCommentDto) => {
  let newComment: PostComment | null;
  const userId = getUserFromToken();
  if (!userId) {
    return { error: "Unauthenticated" };
  }
  try {
    newComment = await prisma.comment.create({
      data: {
        message: data.message,
        post: { connect: { id: data.postId } },
        owner: { connect: { id: userId } },
      },
      select: {
        id: true,
        message: true,
        createdAt: true,
        _count: {
          select: { likes: true, replies: true },
        },
        owner: {
          select: {
            id: true,
            currentProfileImage: true,
            username: true,
            fullName: true,
            posts: {
              take: 3,
              select: { images: { take: 1, select: { src: true } } },
            },
            _count: {
              select: { posts: true, followers: true, following: true },
            },
          },
        },
      },
    });
    await changeCommentCountHandler(data.postId, 1);
  } catch (error) {
    return { error: "Something wrong happened" };
  }
  return newComment;
};

export const addNewLike = async (postId: string) => {
  const userId = getUserFromToken();
  if (!userId) {
    return { error: "Unauthenticated" };
  }
  try {
    await prisma.$transaction(async (ctx) => {
      const like = await ctx.like.create({
        data: {
          owner: { connect: { id: userId } },
          post: { connect: { id: postId } },
        },
        select: {
          id: true,
          owner: {
            select: {
              id: true,
              username: true,
              fullName: true,
              currentProfileImage: true,
              posts: {
                take: 3,
                select: {
                  images: { take: 1, select: { src: true } },
                },
              },
              _count: {
                select: { posts: true, followers: true, following: true },
              },
            },
          },
        },
      });
      return like;
    });
    await changeLikeCountHandler(postId, 1);
  } catch (error) {
    throw error;
  }
};

export const unLike = async (postId: string) => {
  const userId = getUserFromToken();
  if (!userId) {
    return { error: "Unauthenticated" };
  }
  try {
    await prisma.$transaction(async (ctx) => {
      const like = await ctx.like.findFirstOrThrow({
        where: { ownerId: userId, postId: postId },
      });
      await ctx.like.delete({
        where: { id: like.id },
      });
    });
    await changeLikeCountHandler(postId, -1);
  } catch (error) {
    throw error;
  }
};

export const getSuggestion = async () => {
  const userId = getUserFromToken();
  if (!userId) {
    return { error: "Unauthenticated" };
  }
  const followings = await prisma.follow.findMany({
    where: { followerId: userId },
  });

  const condition =
    followings.length > 0 ? followings.map((flw) => flw.followingId) : [];

  const users = await prisma.user.findMany({
    where: {
      id: { notIn: [userId, ...condition] },
    },
    select: {
      id: true,
      currentProfileImage: true,
      username: true,
      fullName: true,
      posts: {
        take: 3,
        select: { images: { take: 1, select: { src: true } } },
      },
      _count: {
        select: { posts: true, followers: true, following: true },
      },
    },
  });
  return sampleSize(users, 3);
};
export const getExploreImages = async () => {
  const userId = getUserFromToken();

  if (!userId) {
    return [];
  }
  const posts = await prisma.post.findMany({
    take: 20,
    where: { ownerId: { not: userId } },
    select: {
      id: true,
      images: { take: 1 },
      _count: { select: { images: true, likes: true, comments: true } },
    },
  });
  return splitArray<ExplorePost>(posts, 5);
};

export const followAction = async (followingId: string) => {
  const userId = getUserFromToken();
  if (!userId) {
    return { error: "Unauthenticated" };
  }
  try {
    await prisma.$transaction(async (ctx) => {
      const checkedFollow = await ctx.follow.findFirst({
        where: { followerId: userId, followingId },
      });
      if (checkedFollow) {
        return null;
      }
      await ctx.follow.create({
        data: {
          follower: { connect: { id: userId } },
          following: { connect: { id: followingId } },
        },
      });
    });
  } catch (error) {
    throw error;
  }
};

export const getStories = async () => {
  const userId = getUserFromToken();
  if (!userId) {
    return { error: "Unauthenticated" };
  }
  const followings = await prisma.follow.findMany({
    where: { follower: { id: userId } },
    select: {
      following: {
        select: {
          id: true,
          username: true,
          currentProfileImage: true,
          _count: {
            select: {
              stories: {
                where: {
                  createdAt: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
                },
              },
            },
          },
        },
      },
    },
  });
  if (followings.length > 0) {
    return followings
      .filter((data) => data.following._count.stories > 0)
      .map((data) => data.following);
  }
  return [];
};

export const searchUsers = async (formData: FormData) => {
  const userId = getUserFromToken();
  if (!userId) {
    return { error: "Unauthenticated" };
  }
  const query = formData.get("search-query") as unknown as string;
  if (!query) {
    return [];
  }
  try {
    return await prisma.user.findMany({
      where: {
        id: { not: userId },
        OR: [
          { username: { contains: query } },
          { fullName: { contains: query } },
        ],
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        currentProfileImage: true,
      },
    });
  } catch (error) {
    return [];
  }
};

export const changeProfileImage = async (formData: FormData) => {
  const user = await getUserDataFromToken();
  if (!user) {
    return { error: "Unauthenticated" };
  }

  const file = formData.get("profile-image") as unknown as File;
  if (!file) {
    return { error: "Upload failed" };
  }

  const arrayBuffer = await file.arrayBuffer();
  const data = Buffer.from(arrayBuffer);
  const filePath = path.join("public", "upload", "profile-image", file.name);
  const savedFilePath = "/upload/profile-image/" + file.name;
  try {
    fs.writeFileSync(filePath, data);
    if (user.currentProfileImage) {
      fs.unlinkSync("public/" + user.currentProfileImage);
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { currentProfileImage: savedFilePath },
    });
    return { currentProfileImage: savedFilePath };
  } catch (error) {
    fs.unlinkSync(filePath);
    return { error: "Upload failed" };
  }
};

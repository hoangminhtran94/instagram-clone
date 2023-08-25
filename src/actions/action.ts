"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { ExplorePost, PostComment } from "@/models/post.models";
import {
  changeCommentCountHandler,
  changeLikeCountHandler,
} from "./firebase.service";
export interface NewCommentDto {
  message: string;
  postId: string;
}
import { sampleSize } from "lodash";
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

export const addNewComment = async (data: NewCommentDto) => {
  let newComment: PostComment | null;
  const userId = getUserFromToken();
  if (!userId) {
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 403 }
    );
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
    return NextResponse.json(
      { meesage: "Something wrong happenende" },
      { status: 500 }
    );
  }
  return newComment;
};

export const addNewLike = async (postId: string) => {
  const userId = getUserFromToken();
  if (!userId) {
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 403 }
    );
  }
  try {
    await prisma.$transaction(async (ctx) => {
      const like = await ctx.like.create({
        data: {
          owner: { connect: { id: userId } },
          post: { connect: { id: postId } },
        },
      });
      return like;
    });
    await changeLikeCountHandler(postId, 1);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { meesage: "Something wrong happenende" },
      { status: 500 }
    );
  }
};

export const unLike = async (postId: string) => {
  const userId = getUserFromToken();
  if (!userId) {
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 403 }
    );
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
    console.log(error);
    return NextResponse.json(
      { meesage: "Something wrong happenende" },
      { status: 500 }
    );
  }
};

export const getSuggestion = async () => {
  const userId = getUserFromToken();
  if (!userId) {
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 403 }
    );
  }
  const users = await prisma.user.findMany({
    where: {
      id: { not: userId },
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
  const posts = await prisma.post.findMany({
    take: 20,
    select: {
      id: true,
      images: { take: 1 },
      _count: { select: { images: true, likes: true, comments: true } },
    },
  });
  return splitArray<ExplorePost>(posts, 5);
};

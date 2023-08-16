"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { PostComment } from "@/app/(withsidebar)/p/[postId]/page";
export interface NewCommentDto {
  message: string;
  postId: string;
}

export const addNewComment = async (data: NewCommentDto) => {
  let newComment: PostComment | null;
  const token = cookies().get("jwt_token")?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) {
    return NextResponse.json(
      { meesage: "Authentication failed" },
      { status: 403 }
    );
  }
  const decoded = jwt.verify(token, secret);
  const userId = (decoded as { [key: string]: string }).userId;
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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { meesage: "Something wrong happenende" },
      { status: 500 }
    );
  }
  return newComment;
};

"use server";

import { prisma } from "@/lib/prisma";
import { Comment } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export interface NewCommentDto {
  message: string;
  postId: string;
}

export const addNewComment = async (data: NewCommentDto) => {
  let newComment: Comment | null;
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

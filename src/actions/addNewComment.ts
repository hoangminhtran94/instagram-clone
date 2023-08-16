"use server";
import { prisma } from "@/lib/prisma";
import { Comment } from "@prisma/client";
export interface NewCommentDto {
  message: string;
  postId: string;
  ownerId: string;
}

const addNewComment = async (data: NewCommentDto) => {
  let newComment: Comment | null;
  try {
    newComment = await prisma.comment.create({
      data: {
        message: data.message,
        post: { connect: { id: data.postId } },
        owner: { connect: { id: data.ownerId } },
      },
    });
  } catch (error) {
    console.log(error);
    newComment = null;
  }
  return newComment;
};

export default addNewComment;

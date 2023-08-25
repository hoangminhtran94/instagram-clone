import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PostLike } from "@/models/post.models";
import { addNewLike, unLike } from "@/actions/action";

export const GET = async (
  req: NextRequest,
  context: { params: { postId: string } }
) => {
  let likes: PostLike[];

  try {
    likes = await prisma.like.findMany({
      where: { postId: context.params.postId },
      select: {
        id: true,
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
    return NextResponse.json(likes, { status: 200 });
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
};

export const POST = async (
  req: NextRequest,
  context: { params: { postId: string } }
) => {
  try {
    await addNewLike(context.params.postId);
    return NextResponse.json({ message: "Liked" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed, try again" }, { status: 500 });
  }
};
export const DELETE = async (
  req: NextRequest,
  context: { params: { postId: string } }
) => {
  try {
    await unLike(context.params.postId);
    return NextResponse.json({ message: "unLiked" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed, try again" }, { status: 500 });
  }
};

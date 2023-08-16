import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PostComment } from "@/app/(withsidebar)/p/[postId]/page";

export const GET = async (
  req: NextRequest,
  context: { params: { postId: string } }
) => {
  let comments: PostComment[];

  try {
    comments = await prisma.comment.findMany({
      take: 20,
      where: { postId: context.params.postId },
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
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
};

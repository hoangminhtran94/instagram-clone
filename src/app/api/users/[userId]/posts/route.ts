import { getUserFromToken } from "@/actions/action";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { userId: string } }
) => {
  const targetUserId = context.params.userId;
  const currentUserId = getUserFromToken();
  const yourProfile = targetUserId === currentUserId;

  let posts = [];
  try {
    posts = await prisma.post.findMany({
      where: { ownerId: targetUserId },
      select: {
        images: true,
        id: true,
        _count: { select: { likes: true, comments: true } },
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
};

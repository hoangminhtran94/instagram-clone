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

  let user;
  try {
    user = await prisma.user.findFirstOrThrow({
      select: {
        username: true,
        fullName: true,
        currentProfileImage: true,
        followers: {
          where: { followerId: currentUserId! },
          select: { id: true },
        },
        _count: { select: { posts: true, followers: true, following: true } },
      },
      where: { id: targetUserId },
    });
    const { followers, ...rest } = user;

    return NextResponse.json(
      { ...rest, youAreFollower: followers.length > 0, yourProfile },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};

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

  let tagged;
  try {
    tagged = await prisma.tag.findMany({
      where: { ownerId: targetUserId },
    });

    return NextResponse.json(tagged, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};

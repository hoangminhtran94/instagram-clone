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
  if (!yourProfile) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  let saved;
  try {
    saved = await prisma.saved.findMany({ where: { ownerId: targetUserId } });

    return NextResponse.json(saved, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};

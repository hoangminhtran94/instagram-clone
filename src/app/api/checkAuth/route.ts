import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { id: data.userId },
    });

    NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 403 });
  }
};

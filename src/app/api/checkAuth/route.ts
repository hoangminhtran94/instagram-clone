import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const token = data?.token;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) {
    return NextResponse.json(
      { meesage: "Authentication failed" },
      { status: 403 }
    );
  }
  try {
    const decoded = jwt.verify(token, secret);

    const userId = (decoded as { [key: string]: string }).userId;
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: { id: userId },
      });
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ user: null }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ meesage: "Error" }, { status: 403 });
  }
};

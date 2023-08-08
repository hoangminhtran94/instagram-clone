import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (error) {
      throw error;
    }

    const userId = (decoded as { [key: string]: string }).userId;

    const user = await prisma.user.findFirstOrThrow({
      where: { id: userId },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    cookies().delete("jwt_token");
    return NextResponse.json({ meesage: "Error" }, { status: 403 });
  }
};

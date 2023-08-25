import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginUser } from "@/models/user.models";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const secret = process.env.JWT_SECRET;
  const data = Object.fromEntries(formData) as unknown as {
    password: string;
    emailOrUsername: string;
  };
  let user: User;
  try {
    user = await prisma.user.findFirstOrThrow({
      where: {
        OR: [
          { email: data.emailOrUsername },
          { username: data.emailOrUsername },
        ],
      },
    });
    const checkPassword = bcrypt.compareSync(data.password, user.password);
    if (!checkPassword) {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 403 }
      );
    }
    const returnUser: LoginUser = {
      username: user.username,
      id: user.id,
      currentProfileImage: user.currentProfileImage,
      email: user.email,
      fullName: user.fullName,
    };
    const token = jwt.sign({ userId: user.id }, secret!, { expiresIn: "12h" });
    return NextResponse.json({ user: returnUser, token }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something wrong happened" },
      { status: 500 }
    );
  }
};

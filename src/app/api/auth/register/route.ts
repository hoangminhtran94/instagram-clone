import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  console.log(formData);
  const data = Object.fromEntries(formData) as unknown as User;
  const hashedPassword = bcrypt.hashSync(data.password, 8);
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "Something wrong happened" },
      { status: 500 }
    );
  }

  try {
    const user = await prisma.user.create({
      select: { username: true, id: true, fullName: true, email: true },
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        fullName: data.fullName,
      },
    });
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "12h" });
    return NextResponse.json({ user, token }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something wrong happened" },
      { status: 500 }
    );
  }
};

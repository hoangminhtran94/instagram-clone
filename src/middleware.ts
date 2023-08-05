import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) {
    return NextResponse.json(
      { meesage: "Authentication failed" },
      { status: 403 }
    );
  }
  jwt.verify(
    token,
    secret,
    { algorithms: ["HS512"] },
    async (error, decoded) => {
      if (error) {
        return NextResponse.json({ meesage: "Error" }, { status: 403 });
      } else {
        const userId = (decoded as { [key: string]: string }).userId;
        try {
          const user = await fetch("http:localhost:3000/api/checkAuth", {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: { "Content-Type": "application/json" },
          });
          if (!user) {
            return NextResponse.json(
              { message: "Authentication failed" },
              { status: 403 }
            );
          }
          (req as any).user = user;
        } catch (error) {
          return NextResponse.json({ messages: "Authentication failed" });
        }
      }
    }
  );

  return NextResponse.next();
};

export const config = {
  matcher: "/api/post",
};

"use server";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import httpError, { HttpError } from "http-errors";
import { RequestHandler } from "next/dist/server/next";
import { NextRequest, NextResponse } from "next/server";
export const checkAuth = async (
  req: NextRequest,
  params: unknown,
  next: (params?: HttpError) => void
) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) {
    return next(httpError(403, "Authentication failed"));
  }
  jwt.verify(
    token,
    secret,
    { algorithms: ["HS512"] },
    async (error, decoded) => {
      if (error) {
        return next(httpError(403, "Authentication failed"));
      } else {
        const userId = (decoded as { [key: string]: string }).userId;
        try {
          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });
          (req as any).user = user;
        } catch (error) {
          return next(httpError(403, "Authentication failed"));
        }
      }
    }
  );
  next();
};

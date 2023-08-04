"use server";
import { prisma } from "@/lib/prisma";
import { checkAuth } from "@/lib/auth.middleware";
import { createEdgeRouter } from "next-connect";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { HttpError } from "http-errors";

const router = createEdgeRouter<NextRequest, { params?: unknown }>();

router.use(checkAuth);
router.post(async (req) => {});

export async function GET(request: NextRequest, ctx: { params?: unknown }) {
  return router.run(request, ctx);
}

export async function POST(request: NextRequest, ctx: { params?: unknown }) {
  return router.run(request, ctx);
}

export default router.handler({
  onError(err, req, ctx) {
    const error = err as HttpError;
    NextResponse.json({ message: error });
  },
});

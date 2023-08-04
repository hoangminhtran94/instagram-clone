"use server";
import { prisma } from "@/lib/prisma";
import { checkAuth } from "@/lib/auth.middleware";
import { createEdgeRouter } from "next-connect";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { HttpError } from "http-errors";
import { writeFile } from "fs/promises";
import { Post, Location, User, PostImage } from "@prisma/client";
const router = createEdgeRouter<NextRequest, { params?: unknown }>();

interface ImagesData {
  imageDescription: string;
  filename: string;
  src: string;
}
router.use(checkAuth);
router.post(async (req) => {
  const formdata = await req.formData();
  const files: File[] | null = formdata.getAll(
    "postImages"
  ) as unknown as File[];
  let imageData: ImagesData[] = formdata.getAll(
    "postImageData"
  ) as unknown as ImagesData[];

  if (files.length > 0) {
    try {
      files.forEach(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const path = "/public/upload/" + file.name;
        await writeFile(path, buffer);
        const index = imageData.findIndex((img) => img.filename === file.name);
        const currentImageData = imageData[index];
        imageData[index] = { ...currentImageData, src: path };
      });
    } catch (error) {
      console.log(error);
    }
  }
  const data = Object.fromEntries(formdata) as unknown as Post &
    Location &
    PostImage;
  const user = (req as any).user as User;
  try {
    await prisma.$transaction(async (ctx) => {
      const post = await ctx.post.create({
        data: {
          content: data.content,
          owner: { connect: { id: user.id } },
        },
      });
      if (data.lat && data.long) {
        try {
          await ctx.location.create({
            data: {
              locationDescription: data.locationDescription,
              lat: data.lat,
              long: data.long,
              posts: { connect: { id: post.id } },
            },
          });
        } catch (error) {
          throw error;
        }
      }
      if (imageData.length > 0) {
        try {
          imageData.forEach(async (img) => {
            await ctx.postImage.create({
              data: {
                imageDescription: img.imageDescription,
                src: img.src,
                owner: { connect: { id: user.id } },
                post: { connect: { id: post.id } },
              },
            });
          });
        } catch (error) {
          throw error;
        }
      }
      return post;
    });
    return NextResponse.json({ message: "Created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
});

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

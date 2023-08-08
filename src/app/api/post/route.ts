import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { Post, Location, User, PostImage } from "@prisma/client";

interface ImagesData {
  alt: string;
  filename: string;
  src: string;
}

export async function POST(req: NextRequest) {
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
      return NextResponse.json({ message: "Error" }, { status: 403 });
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
          caption: data.caption,
          owner: { connect: { id: user.id } },
        },
      });
      if (data.lat && data.long) {
        try {
          await ctx.location.create({
            data: {
              address: data.address,
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
                alt: img.alt,
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
}

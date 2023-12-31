import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { Post, Location, PostImage } from "@prisma/client";
import jwt from "jsonwebtoken";
import { createPostRecordHandler } from "@/actions/firebase.service";
import path from "path";
import { extractHashtags } from "@/lib/utils-functions-server";
interface ImagesData {
  alt: string;
  filename: string;
  src?: string;
}

const secret = process.env.JWT_SECRET;
export async function POST(req: NextRequest) {
  const jwt_token = req.cookies.get("jwt_token")?.value;
  if (!jwt_token) {
    return NextResponse.json({ messages: "Authentication failed" });
  }

  const decoded = jwt.verify(jwt_token, secret!);

  const userId = (decoded as { [key: string]: string }).userId;
  const formdata = await req.formData();

  const files: Blob[] | null = formdata.getAll(
    "postImages"
  ) as unknown as Blob[];

  const imageDataRaw: string[] = formdata.getAll(
    "postImageData"
  ) as unknown as string[];
  let imageData = imageDataRaw.map((rawData) =>
    JSON.parse(rawData)
  ) as ImagesData[];

  if (files.length > 0) {
    try {
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Construct the correct file path using the appropriate separator
        const filePath = path.join("public", "upload", file.name);

        // Perform the file write operation
        await writeFile(filePath, buffer);

        // Update the imageData array
        const index = imageData.findIndex((img) => img.filename === file.name);
        if (index !== -1) {
          const currentImageData = imageData[index];
          imageData[index] = {
            ...currentImageData,
            src: "/upload/" + file.name,
          };
        }
      }
    } catch (error) {
      return NextResponse.json({ message: "Error" }, { status: 500 });
    }
  }

  const data = Object.fromEntries(formdata) as unknown as Post &
    Location &
    PostImage;

  const caption = data.caption;
  const hashtags = extractHashtags(caption);
  let createOrConnectHashTags: {
    where: { message: string };
    create: { message: string };
  }[];
  if (hashtags.length > 0) {
    createOrConnectHashTags = hashtags.map((tag) => ({
      where: { message: tag },
      create: { message: tag },
    }));
  }

  try {
    const newPost = await prisma.$transaction(async (ctx) => {
      const post = await ctx.post.create({
        data: {
          caption: data.caption,
          owner: { connect: { id: userId } },
          images:
            imageData.length > 0
              ? {
                  createMany: {
                    data: imageData.map((imgData) => ({
                      alt: imgData.alt,
                      src: imgData.src!,
                      ownerId: userId,
                    })),
                  },
                }
              : undefined,
          hashTags: { connectOrCreate: createOrConnectHashTags },
        },
        include: {
          owner: {
            select: {
              username: true,
              currentProfileImage: true,
              id: true,
              _count: {
                select: {
                  followers: true,
                  following: true,
                  posts: true,
                },
              },
            },
          },
          images: true,
          likes: { where: { post: { hideLikeView: false } } },
          comments: { where: { post: { turnOffComment: false } } },
        },
      });
      if (data.address) {
        try {
          await ctx.location.create({
            data: {
              address: data.address,
              lat: data.lat ?? undefined,
              long: data.long ?? undefined,
              posts: { connect: { id: post.id } },
            },
          });
        } catch (error) {
          throw error;
        }
      }

      return post;
    });
    try {
      await createPostRecordHandler(newPost.id);
    } catch (error) {}
    return NextResponse.json(newPost, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export const GET = async (
  req: NextRequest,
  context: { searchParams: { page: number } }
) => {
  const page = new URL(req.url).searchParams.get("page") ?? 1;

  let postsIds = [];
  try {
    postsIds = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: +page * 5,
      skip: (+page - 1) * 5,
      select: { id: true },
    });

    return NextResponse.json(
      postsIds.map((idObj) => idObj.id),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
};

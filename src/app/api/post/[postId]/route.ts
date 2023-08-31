import { getUserFromToken } from "@/actions/action";
import { onGetPostRecord } from "@/actions/firebase.service";
import { modifiedPrisma, prisma } from "@/lib/prisma";
import { PostRecord } from "@/repository/firebase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { postId: string } }
) => {
  const postId = context.params.postId;
  const userId = getUserFromToken();
  let post;
  try {
    post = await prisma.post.findFirstOrThrow({
      where: { id: postId },
      select: {
        id: true,
        images: true,
        tags: true,
        caption: true,
        createdAt: true,
        likes: {
          take: 1,
          select: {
            id: true,
            owner: {
              select: {
                id: true,
                username: true,
                fullName: true,
                currentProfileImage: true,
                posts: {
                  take: 3,
                  select: {
                    images: { take: 1, select: { src: true } },
                  },
                },
                _count: {
                  select: { posts: true, followers: true, following: true },
                },
              },
            },
          },
        },
        owner: {
          select: {
            id: true,
            currentProfileImage: true,
            username: true,
            fullName: true,
            posts: {
              take: 3,
              select: { images: { take: 1, select: { src: true } } },
            },
            _count: {
              select: { posts: true, followers: true, following: true },
            },
          },
        },
      },
    });

    const postRecord = await onGetPostRecord(post.id);
    const postRecordData = postRecord.data() as unknown as PostRecord;
    const checked = await modifiedPrisma.post.checkYourPostAndLike(
      post.id,
      userId
    );

    return NextResponse.json(
      {
        ...post,
        _count: {
          likes: postRecordData.like_count,
          comments: postRecordData.comment_count,
        },
        ...checked,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, { status: 500 });
  }
};

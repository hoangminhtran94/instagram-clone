import PostDetailModal from "@/components/UI/PostDetailsComponents/PostDetailsModal";
import { FC } from "react";
import { prisma } from "@/lib/prisma";
import { PostImage, Tag } from "@prisma/client";

interface Props {
  params: {
    postId: string;
  };
}
export interface PostDetail {
  caption: string;
  createdAt: Date;
  owner: {
    username: string;
    currentProfileImage: string;
  };
  images: PostImage[];
  comments: {
    message: string;
    createdAt: Date;
    owner: {
      currentProfileImage: string;
      username: string;
    };
  }[];
  tags: Tag[];
}

const getPostDetail = async (id: string): Promise<PostDetail | null> => {
  try {
    const post = await prisma.post.findFirstOrThrow({
      where: { id },
      select: {
        images: true,
        tags: true,
        caption: true,
        createdAt: true,
        comments: {
          take: 20,
          select: {
            message: true,
            createdAt: true,
            owner: { select: { currentProfileImage: true, username: true } },
            _count: { select: { replies: true, likes: true } },
          },
        },
        owner: { select: { currentProfileImage: true, username: true } },
      },
    });
    return post;
  } catch (error) {
    return null;
  }
};

const PostDetail: FC<Props> = async ({ params }) => {
  const post = await getPostDetail(params.postId);
  return (
    <div>
      <PostDetailModal post={post} />
    </div>
  );
};

export default PostDetail;

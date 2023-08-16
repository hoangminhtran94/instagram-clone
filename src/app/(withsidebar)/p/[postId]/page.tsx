import PostDetailModal from "@/components/PostDetailsComponents/PostDetailsModal";
import { FC } from "react";
import { prisma } from "@/lib/prisma";
import { PostImage, Tag } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
interface Props {
  params: {
    postId: string;
  };
}

export interface PostLike {
  owner: {
    id: string;
    username: string;
    fullName: string;
    currentProfileImage: string;
    posts: {
      images: {
        src: string;
      }[];
    }[];
    _count: {
      posts: number;
      followers: number;
      following: number;
    };
  };
}
export interface PostComment {
  id: string;
  createdAt: Date;
  owner: {
    id: string;
    _count: {
      posts: number;
      followers: number;
      following: number;
    };
    username: string;
    fullName: string;
    currentProfileImage: string;
    posts: {
      images: {
        src: string;
      }[];
    }[];
  };
  message: string;
  _count: {
    likes: number;
    replies: number;
  };
}
export interface PostDetail {
  id: string;
  yourPost: boolean;
  caption: string;
  createdAt: Date;
  owner: {
    id: string;
    username: string;
    currentProfileImage: string;
  };
  likes: PostLike[];
  images: PostImage[];
  tags: Tag[];
  _count: {
    likes: number;
  };
}

const getPostDetail = async (id: string): Promise<PostDetail | null> => {
  const jwt_token = cookies().get("jwt_token")?.value;
  const secret = process.env.JWT_SECRET;

  try {
    const post = await prisma.post.findFirstOrThrow({
      where: { id },
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
          select: { id: true, currentProfileImage: true, username: true },
        },
        _count: { select: { likes: true } },
      },
    });
    let yourPost = false;
    if (jwt_token && secret) {
      const verifiedToken = jwt.verify(jwt_token, secret) as { userId: string };
      yourPost = verifiedToken.userId === post.owner.id;
    }
    return { ...post, yourPost };
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

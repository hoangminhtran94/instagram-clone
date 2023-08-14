import PostDetailModal from "@/components/UI/PostDetailsComponents/PostDetailsModal";
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
    currentProfileImage: string;
    posts: {
      id: string;
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
  message: string;
  createdAt: Date;
  owner: {
    currentProfileImage: string;
    username: string;
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
  comments: PostComment[];
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
            owner: {
              select: {
                id: true,
                username: true,
                currentProfileImage: true,
                posts: {
                  take: 3,
                  select: {
                    id: true,
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
        comments: {
          take: 20,
          select: {
            message: true,
            createdAt: true,
            owner: { select: { currentProfileImage: true, username: true } },
            _count: { select: { replies: true, likes: true } },
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

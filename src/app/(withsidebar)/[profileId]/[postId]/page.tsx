import PostDetailModal from "@/components/UI/PostDetailsComponents/PostDetailsModal";
import { FC } from "react";
import { prisma } from "@/lib/prisma";
import { PostImage, Tag } from "@prisma/client";

interface Props {
  params: {
    postId: string;
  };
}

export interface PostLike {
  owner: {
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
  caption: string;
  createdAt: Date;
  owner: {
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
  try {
    const post = await prisma.post.findFirstOrThrow({
      where: { id },
      select: {
        images: true,
        tags: true,
        caption: true,
        createdAt: true,
        likes: {
          take: 1,
          select: {
            owner: {
              select: {
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
        owner: { select: { currentProfileImage: true, username: true } },
        _count: { select: { likes: true } },
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

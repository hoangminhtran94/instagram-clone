import PostDetailModal from "@/components/PostDetailsComponents/PostDetailsModal";
import { FC } from "react";
import { prisma } from "@/lib/prisma";
import { PostDetail } from "@/models/post.models";
import { getUserFromToken } from "@/actions/action";
interface Props {
  params: {
    postId: string;
  };
}

const getPostDetail = async (id: string): Promise<PostDetail | null> => {
  const userId = getUserFromToken();

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
        _count: { select: { likes: true} },
      },
    });
    let yourPost = false;
    let youLikeThis = false;
    if (userId) {
      youLikeThis =
        (await prisma.like.findFirst({
          where: { ownerId: userId, postId: post.id },
        })) !== null;
      yourPost = userId === post.owner.id;
    }
    return { ...post, yourPost, youLikeThis };
  } catch (error) {
    return null;
  }
};

const PostModal: FC<Props> = async ({ params }) => {
  const post = await getPostDetail(params.postId);
  console.log(post);
  return (
    <div>
      <PostDetailModal post={post} />
    </div>
  );
};

export default PostModal;

import { getUserFromToken } from "@/actions/action";
import { onGetPostRecord } from "@/actions/firebase.service";
import SideBar from "@/components/SideBarComponents/Sidebar";
import RootContextProvider from "@/context/RootContext";
import { prisma, modifiedPrisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/verifytoken";
import { PostDetail } from "@/models/post.models";
import { PostRecord } from "@/repository/firebase";

const getPosts = async (): Promise<PostDetail[]> => {
  const userId = getUserFromToken();
  let posts = [];
  try {
    posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
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

    const returnPosts = await Promise.all(
      posts.map(async (post) => {
        const postRecord = await onGetPostRecord(post.id);
        const postRecordData = postRecord.data() as unknown as PostRecord;
        const checked = await modifiedPrisma.post.checkYourPostAndLike(
          post.id,
          userId
        );
        return {
          ...post,
          _count: {
            likes: postRecordData.like_count,
            comments: postRecordData.comment_count,
          },
          ...checked,
        };
      })
    );

    return returnPosts;
  } catch (error) {
    return [];
  }
};

const WithSideBarLayout = async ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  await verifyToken({ redirectIf: "unauthenticated", path: "/accounts/login" });
  const posts = await getPosts();
  return (
    <RootContextProvider posts={posts}>
      <SideBar />
      <main className="mx-auto w-[calc(100vw-350px)] ml-[350px]">
        {children}
      </main>
      {modal}
    </RootContextProvider>
  );
};

export default WithSideBarLayout;

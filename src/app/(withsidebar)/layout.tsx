import SideBar from "@/components/SideBarComponents/Sidebar";
import RootContextProvider from "@/context/RootContext";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/verifytoken";
import { Like, Post, PostImage, Comment } from "@prisma/client";

const getPosts = async (): Promise<
  (Post & {
    owner: any;
    images: PostImage[];
    likes?: Like[];
    comments?: Comment[];
  })[]
> => {
  let posts = [];
  try {
    posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
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
    return posts;
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

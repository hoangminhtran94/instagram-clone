import Posts from "@/components/UI/Posts";
import TopReels from "@/components/TopReels";
import SideSuggestion from "@/components/UI/SideSuggestion";
import SideFooter from "@/components/UI/SideFooter";
import { Comment, Like, Post, PostImage } from "@prisma/client";
import { prisma } from "@/lib/prisma";

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

export default async function HomePage() {
  const posts = await getPosts();
  console.log(posts);
  return (
    <div className="w-[calc(630px+319px)] mx-auto mt-4 ">
      <TopReels />
      <div className="flex">
        <div className="w-[630px]">
          <Posts posts={posts} />
        </div>
        <div className="w-[319px]">
          <SideSuggestion />
          <SideFooter />
        </div>
      </div>
    </div>
  );
}

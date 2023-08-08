import Posts from "@/components/UI/Posts";
import TopReels from "@/components/TopReels";
import SideSuggestion from "@/components/UI/SideSuggestion";
import SideFooter from "@/components/UI/SideFooter";
import { Post, PostImage } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { User } from "@/models/auth.models";

export default async function HomePage() {
  let posts: (Post & { owner: any; images: PostImage[] })[] = [];

  try {
    posts = await prisma.post.findMany({
      include: {
        owner: {
          select: { username: true, currentProfileImage: true, id: true },
        },
        images: true,
      },
    });
  } catch (error) {
    throw error;
  }

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

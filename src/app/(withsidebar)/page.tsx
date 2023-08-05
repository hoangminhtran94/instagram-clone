import Posts from "@/components/UI/Posts";
import TopReels from "@/components/TopReels";
import SideSuggestion from "@/components/UI/SideSuggestion";
import SideFooter from "@/components/UI/SideFooter";

export default async function HomePage() {
  const posts = [{ id: 1 }, { id: 2 }, { id: 3 }];

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

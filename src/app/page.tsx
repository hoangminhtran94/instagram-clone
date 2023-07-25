import Posts from "@/components/UI/Posts";
import TopReels from "@/components/TopReels";

export default async function HomePage() {
  const posts = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <div className="w-[630px] mx-auto mt-4 ">
      <TopReels />
      <Posts posts={posts} />
    </div>
  );
}

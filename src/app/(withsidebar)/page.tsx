import Posts from "@/components/UI/Posts";
import TopReels from "@/components/TopReels";
import SideSuggestion from "@/components/UI/SideSuggestion";
import SideFooter from "@/components/UI/SideFooter";

export default async function HomePage() {
  return (
    <div className="w-[calc(630px+319px)] mx-auto mt-4 ">
      <TopReels />
      <div className="flex">
        <div className="w-[630px]">
          <Posts />
        </div>
        <div className="w-[319px]">
          <SideSuggestion />
          <SideFooter />
        </div>
      </div>
    </div>
  );
}

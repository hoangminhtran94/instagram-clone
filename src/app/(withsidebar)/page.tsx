import Posts from "@/components/HomePageComponents/Posts";
import TopReels from "@/components/HomePageComponents/TopReels";
import SideSuggestion from "@/components/HomePageComponents/SideSuggestion";
import SideFooter from "@/components/HomePageComponents/SideFooter";

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

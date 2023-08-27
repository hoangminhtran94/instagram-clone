import Posts from "@/components/HomePageComponents/Posts";
import StoryReels from "@/components/HomePageComponents/StoryReels";
import SideSuggestion from "@/components/HomePageComponents/SideSuggestion";
import SideFooter from "@/components/HomePageComponents/SideFooter";

export default async function HomePage() {
  return (
    <div className="w-[calc(630px+319px)] mx-auto mt-4 ">
      <div className="flex">
        <div className="w-[630px]">
      <StoryReels />
          <Posts />
        </div>
        <div className="w-[319px] pt-[30px]">
          <SideSuggestion />
          <SideFooter />
        </div>
      </div>
    </div>
  );
}

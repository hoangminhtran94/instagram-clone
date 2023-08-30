import { getExploreImages, getHashTags } from "@/actions/action";
import ExploreImages from "@/components/ExploreComponents/ExploreImages";
import ExploreTags from "@/components/ExploreComponents/ExploreTag";
import Spinner from "@/components/UI/Spinner/Spinner";
import { Suspense } from "react";

const ExplorePage = async () => {
  const exploreImages = await getExploreImages();
  const hashTags = await getHashTags();
  return (
    <div className="w-[975px] mx-auto px-4 py-5">
      <ExploreTags tags={hashTags} />
      <Suspense
        fallback={
          <div className="h-[500px]">
            <Spinner />
          </div>
        }
      >
        <div className="mt-5">
          {exploreImages.map((imageGroup, index) => (
            <ExploreImages
              key={index}
              posts={imageGroup}
              odd={index % 2 === 0}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default ExplorePage;

//Tag - HashTag
//Search by content
//Infinite scroll

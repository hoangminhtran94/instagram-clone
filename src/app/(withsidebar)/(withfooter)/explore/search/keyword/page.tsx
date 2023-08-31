import {
  getExploreImages,
  getExploreImagesByHashTag,
  getHashTags,
} from "@/actions/action";
import ExploreImages from "@/components/ExploreComponents/ExploreImages";
import ExploreTags from "@/components/ExploreComponents/ExploreTag";
import Spinner from "@/components/UI/Spinner/Spinner";
import { FC, Suspense } from "react";

const SearchByHashTag: FC<{ searchParams: any }> = async ({ searchParams }) => {
  const exploreImages = searchParams
    ? await getExploreImagesByHashTag(searchParams.q)
    : [];

  return (
    <div className="w-[975px] mx-auto px-4 py-5">
      <div className="text-lg">{searchParams?.q}</div>
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

export default SearchByHashTag;

//Tag - HashTag
//Search by content
//Infinite scroll

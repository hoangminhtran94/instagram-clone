import ExploreImages from "@/components/UI/ExploreComponents/ExploreImages";
import ExploreTags from "@/components/UI/ExploreComponents/ExploreTag";
const ExplorePage = () => {
  return (
    <div className="w-[975px] mx-auto px-4 py-5">
      <ExploreTags />
      <div className="mt-5">
        <ExploreImages odd={true} />
        <ExploreImages odd={false} />
        <ExploreImages odd={true} />
      </div>
    </div>
  );
};

export default ExplorePage;

//Tag - HashTag
//Search by content
//Infinite scroll

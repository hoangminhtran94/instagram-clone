"use client"
import { StoryUser } from "@/models/story.models";
import StoryReelItem from "../StoryReelComponents/StoryReelItem";
import StoryReelsLoading from "../UI/LoadingComponents/StoryReelsLoading";
import { useQuery } from "@tanstack/react-query";
const StoryReels = () => {
  const {data,isLoading} = useQuery<StoryUser[]>({
    queryKey:["top-reels"],
    queryFn:async ()=>{
    const res =  await fetch("/api/stories");
      if(!res.ok) {
        throw Error("Something wrong happened, please try again")
      }
      return await res.json()
    }
  })
  if(isLoading) {
    return <StoryReelsLoading />
  }
  if(!data || data.length ===0) {
    return <></>
  }
  return (
    <div className="py-4 flex gap-3">
      {data.map(user=><StoryReelItem user={user}/>)}
    </div>
  );
};
export default StoryReels;

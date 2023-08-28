"use client";
import ViewPosts from "./ViewPosts";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../UI/Spinner/Spinner";
import { ExplorePost } from "@/models/post.models";
const ProfilePosts = () => {
  const { profileId } = useParams();
  const { data: posts, isLoading } = useQuery<ExplorePost[]>({
    queryKey: ["user-posts", profileId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${profileId}/posts`);
      if (!res.ok) {
        return null;
      }
      return await res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="h-[500px]">
        <Spinner />
      </div>
    );
  }
  if (!posts) {
    return <div>Something went wrong</div>;
  }
  return <ViewPosts posts={posts} />;
};
export default ProfilePosts;

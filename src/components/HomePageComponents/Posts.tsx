"use client";
import { FC } from "react";
import Post from "../PostComponents/Post";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../UI/Spinner/Spinner";
const Posts: FC = () => {
  const { data, isLoading } = useQuery<string[]>({
    queryKey: ["home-page-posts"],
    queryFn: async ({ signal }) => {
      try {
        const response = await fetch("/api/post", {
          signal,
        });
        return await response.json();
      } catch (error) {
        throw error;
      }
    },
  });
  // const { posts } = useRootContext();
  return (
    <div className="w-[470px] mx-auto flex flex-col gap-5">
      {isLoading && (
        <div className="h-[500px]">
          <Spinner />{" "}
        </div>
      )}
      {data?.map((id) => (
        <Post id={id} key={id} />
      ))}
    </div>
  );
};
export default Posts;

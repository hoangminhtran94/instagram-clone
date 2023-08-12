"use client";
import { FC } from "react";
import Post from "./Post";
import { useHomePageContext } from "@/context/homeContext";

const Posts: FC = () => {
  const { posts } = useHomePageContext();
  return (
    <div className="w-[470px] mx-auto flex flex-col gap-5">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};
export default Posts;

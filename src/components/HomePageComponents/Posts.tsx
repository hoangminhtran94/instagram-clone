"use client";
import { FC } from "react";
import Post from "../PostComponents/Post";
import { useRootContext } from "@/context/RootContext";

const Posts: FC = () => {
  const { posts } = useRootContext();
  return (
    <div className="w-[470px] mx-auto flex flex-col gap-5">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};
export default Posts;

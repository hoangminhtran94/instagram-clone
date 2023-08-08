import { FC } from "react";
import Post from "./Post";
import type { Post as PostType, User } from "@prisma/client";
import { PostProps } from "./Post";

interface PostsProps {
  posts: PostProps[];
}

const Posts: FC<PostsProps> = ({ posts }) => {
  return (
    <div className="w-[470px] mx-auto flex flex-col gap-5">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};
export default Posts;

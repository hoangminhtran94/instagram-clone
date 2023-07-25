import { FC } from "react";
import Post from "./Post";
interface PostsProps {
  posts: any[];
}

const Posts: FC<PostsProps> = ({ posts }) => {
  return (
    <div className="w-[470px] mx-auto flex flex-col gap-5">
      {posts.map((post) => (
        <Post key={post.id} />
      ))}
    </div>
  );
};
export default Posts;

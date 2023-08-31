import { PostDetail } from "@/models/post.models";
import { FC } from "react";
import CommentProfileImg from "./CommentProfileImg";
import CommentFirstLine from "./CommentFirstLine";
import CommentSecondLine from "./CommentSecondLine";

const PostCaption: FC<{ post: PostDetail }> = ({ post }) => {
  return (
    <div className="flex gap-4">
      <CommentProfileImg user={post.owner} />

      <div className=" flex flex-col mt-[6px] flex-1  gap-[2px]">
        <CommentFirstLine owner={post.owner} message={post.caption} />
        <CommentSecondLine forCaption={{ createdAt: post.createdAt }} />
      </div>
    </div>
  );
};

export default PostCaption;

import { PostDetail } from "@/models/post.models";
import { FC } from "react";
import Image from "next/image";
import CommentProfileImg from "./CommentProfileImg";
import CommentFirstLine from "./CommentFirstLine";
import CommentSecondLine from "./CommentSecondLine";
const PostHeader: FC<{ post: PostDetail }> = ({ post }) => {
  return (
    <div className="border-b p-4 flex gap-4">
      <CommentProfileImg user={post.owner} />

      <CommentFirstLine owner={post.owner} />
      <span className="flex items-center justify-center">
        <svg
          aria-label="More options"
          color="rgb(0, 0, 0)"
          fill="rgb(0, 0, 0)"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="6" cy="12" r="1.5"></circle>
          <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
      </span>
    </div>
  );
};
export default PostHeader;

import { FC, useState } from "react";
import { timeAgoOrDayAgo } from "@/lib/timeCalculation";
import PostComment from "./PostComment";
import { usePostCommentContext } from "@/context/PostDetailCommentContext";
const CommentSecondLine: FC<{ comment: PostComment }> = ({ comment }) => {
  const { setReplyTo } = usePostCommentContext();
  return (
    <div className="flex gap-2 items-center">
      <p className="text-xxs">{timeAgoOrDayAgo(comment.createdAt)}</p>
      {comment._count.likes > 0 && <p className="text-xxs">0 likes</p>}
      <span
        className="text-xs cursor-pointer"
        onClick={() => {
          setReplyTo(comment.owner);
        }}
      >
        Reply
      </span>
    </div>
  );
};

export default CommentSecondLine;

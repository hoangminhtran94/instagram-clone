import { FC, useState } from "react";
import { timeAgoOrDayAgo } from "@/lib/timeCalculation";
import PostComment from "./PostComment";

const CommentSecondLine: FC<{ comment: PostComment }> = ({ comment }) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-xxs">{timeAgoOrDayAgo(comment.createdAt)}</p>
      {comment._count.likes > 0 && <p className="text-xxs">0 likes</p>}
      <span className="text-xs cursor-pointer">Reply</span>
    </div>
  );
};

export default CommentSecondLine;

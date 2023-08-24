import { FC } from "react";
import { timeAgoOrDayAgo } from "@/lib/timeCalculation";
import { PostComment } from "@/models/post.models";
import { usePostCommentContext } from "@/context/PostDetailCommentContext";
import { useAuthContext } from "@/context/authContext";
const CommentSecondLine: FC<{
  comment?: PostComment;
  forCaption?: { createdAt: Date };
}> = ({ comment, forCaption }) => {
  const { setReplyTo } = usePostCommentContext();
  const { user } = useAuthContext();
  if (comment) {
    return (
      <div className="flex gap-2 items-center">
        <p className="text-xxs">{timeAgoOrDayAgo(comment.createdAt)}</p>
        {comment._count.likes > 0 && <p className="text-xxs">0 likes</p>}
        {user?.id !== comment.owner.id && (
          <span
            className="text-xs cursor-pointer"
            onClick={() => {
              setReplyTo(comment.owner);
            }}
          >
            Reply
          </span>
        )}
      </div>
    );
  }
  if (forCaption) {
    return (
      <div className="flex gap-2 items-center">
        <p className="text-xxs">{timeAgoOrDayAgo(forCaption.createdAt)}</p>
      </div>
    );
  }
};

export default CommentSecondLine;

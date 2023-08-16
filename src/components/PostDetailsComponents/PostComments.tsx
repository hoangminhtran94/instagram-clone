import { FC } from "react";
import Spinner from "../UI/Spinner/Spinner";
import PostComment from "./PostComment";
import { usePostCommentContext } from "@/context/PostDetailCommentContext";
interface PostCommentsProps {
  postId: string;
}
const PostComments: FC<PostCommentsProps> = ({ postId }) => {
  const { comments, loading } = usePostCommentContext();

  if (loading) {
    return <Spinner />;
  }
  if (comments.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h5>No comments yet</h5>
        <p className="text-xs">Start the conversation</p>
      </div>
    );
  }
  return (
    <div className=" flex-1 flex flex-col gap-2 w-full max-h-full">
      {comments.map((comment) => (
        <PostComment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default PostComments;

import { FC } from "react";
import Spinner from "../UI/Spinner/Spinner";
import PostComment from "./PostComment";
import { useQuery } from "@tanstack/react-query";
import { PostComment as TypePostComment } from "@/models/post.models";
interface PostCommentsProps {
  postId: string;
}
const PostComments: FC<PostCommentsProps> = ({ postId }) => {
  const { data: comments, isLoading } = useQuery<TypePostComment[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/comment/${postId}`);
        if (!response.ok) {
          throw new Error("Something wrong happened");
        }
        return await response.json();
      } catch (error) {
        throw error;
      }
    },
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (!comments) {
    return <></>;
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
    <div className=" flex-1 flex flex-col gap-6 w-full max-h-full">
      {comments.map((comment) => (
        <PostComment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default PostComments;

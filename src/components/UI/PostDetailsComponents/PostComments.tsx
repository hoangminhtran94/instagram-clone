import { FC, useEffect, useState } from "react";
import { PostComment } from "@/app/(withsidebar)/p/[postId]/page";

interface PostCommentsProps {
  postId: string;
}
const PostComments: FC<PostCommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comment/${postId}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setComments([]);
      }
    };
    fetchComments();
  }, [postId]);
  if (comments.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h5>No comments yet</h5>
        <p className="text-xs">Start the conversation</p>
      </div>
    );
  }
  return (
    <div className=" flex-1 flex w-full">
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostComments;

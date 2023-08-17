import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { PostComment } from "@/models/post.models";
import { UserSummary } from "@/models/user.models";
interface PostCommentContextState {
  replyTo: UserSummary | null;
  comments: PostComment[];
  setComments: Dispatch<SetStateAction<PostComment[]>>;
  loading: boolean;
  setReplyTo: Dispatch<SetStateAction<UserSummary | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
const PostCommentContext = createContext<PostCommentContextState>({
  comments: [],
  replyTo: null,
  setReplyTo: () => {},
  setComments: () => {},
  loading: false,
  setLoading: () => {},
});

const PostCommentContextProvider: FC<{
  children: ReactNode;
  postId: string;
}> = ({ children, postId }) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyTo, setReplyTo] = useState<UserSummary | null>(null);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comment/${postId}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setComments([]);
      }
      setLoading(false);
    };
    fetchComments();
  }, [postId]);

  return (
    <PostCommentContext.Provider
      value={{
        replyTo,
        setReplyTo,
        comments,
        setComments,
        loading,
        setLoading,
      }}
    >
      {children}
    </PostCommentContext.Provider>
  );
};

export default PostCommentContextProvider;

export const usePostCommentContext = () => useContext(PostCommentContext);

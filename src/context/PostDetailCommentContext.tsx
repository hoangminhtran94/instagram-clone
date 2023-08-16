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
interface PostCommentContextState {
  comments: PostComment[];
  setComments: Dispatch<SetStateAction<PostComment[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
const PostCommentContext = createContext<PostCommentContextState>({
  comments: [],
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

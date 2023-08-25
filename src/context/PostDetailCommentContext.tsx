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
  setReplyTo: Dispatch<SetStateAction<UserSummary | null>>;
}
const PostCommentContext = createContext<PostCommentContextState>({
  replyTo: null,
  setReplyTo: () => {},
});

const PostCommentContextProvider: FC<{
  children: ReactNode;
  postId: string;
}> = ({ children, postId }) => {
  const [replyTo, setReplyTo] = useState<UserSummary | null>(null);

  return (
    <PostCommentContext.Provider
      value={{
        replyTo,
        setReplyTo,
      }}
    >
      {children}
    </PostCommentContext.Provider>
  );
};

export default PostCommentContextProvider;

export const usePostCommentContext = () => useContext(PostCommentContext);

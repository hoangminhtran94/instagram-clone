"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { PostProps } from "@/components/PostComponents/Post";

interface RootContextProps {
  posts: PostProps[];
  setPosts: Dispatch<SetStateAction<PostProps[]>>;
  addNewPost: (post: PostProps) => void;
}
const RootContext = createContext<RootContextProps>({
  posts: [],
  setPosts: () => {},
  addNewPost: () => {},
});

const HomePageContextProvider = ({
  children,
  posts,
}: {
  children: ReactNode;
  posts: PostProps[];
}) => {
  const [allPosts, setAllPosts] = useState<PostProps[]>(posts);
  const addNewPostHandler = (post: PostProps) => {
    setAllPosts((prev) => [post, ...prev]);
  };
  return (
    <RootContext.Provider
      value={{
        posts: allPosts,
        setPosts: setAllPosts,
        addNewPost: addNewPostHandler,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default HomePageContextProvider;
export const useRootContext = () => useContext(RootContext);

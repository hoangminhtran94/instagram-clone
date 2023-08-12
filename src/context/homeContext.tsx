"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { PostProps } from "@/components/UI/Post";

interface HomePageContextProps {
  posts: PostProps[];
  setPosts: Dispatch<SetStateAction<PostProps[]>>;
  addNewPost: (post: PostProps) => void;
}
const HomePageContext = createContext<HomePageContextProps>({
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
    console.log(post);
    setAllPosts((prev) => [post, ...prev]);
  };
  return (
    <HomePageContext.Provider
      value={{
        posts: allPosts,
        setPosts: setAllPosts,
        addNewPost: addNewPostHandler,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};

export default HomePageContextProvider;
export const useHomePageContext = () => useContext(HomePageContext);

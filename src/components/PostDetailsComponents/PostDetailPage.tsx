"use client";
import { FC } from "react";
import PostDetail from "@/app/(withsidebar)/p/[postId]/page";
import PostDetailSideBar from "./PostDetailSidebar";
import PostDetailsImages from "./PostDetailsImages";
import PostCommentContextProvider from "@/context/PostDetailCommentContext";

const PostDetailPage: FC<{ post: PostDetail | null }> = ({ post }) => {
  return (
    <div className="h-[600px] flex items-center justify-center border  ">
      <div className="bg-white z-50 overflow-hidden w-fit h-full  rounded-sm ">
        {!post ? (
          <div>Something wrong happened </div>
        ) : (
          <div className="flex h-full">
            <PostDetailsImages images={post.images} />
            <PostCommentContextProvider postId={post.id}>
              <PostDetailSideBar post={post} />
            </PostCommentContextProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;

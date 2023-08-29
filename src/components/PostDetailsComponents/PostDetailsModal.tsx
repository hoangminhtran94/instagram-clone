"use client";
import { FC } from "react";
import { Backdrop } from "../UI/Modal/Modal";
import { useRouter } from "next/navigation";
import PostDetail from "@/app/(withsidebar)/(withfooter)/(otherPages)/p/[postId]/page";
import PostDetailSideBar from "./PostDetailSidebar";
import PostDetailsImages from "./PostDetailsImages";
import PostCommentContextProvider from "@/context/PostDetailCommentContext";

const PostDetailModal: FC<{ post: PostDetail | null }> = ({ post }) => {
  const router = useRouter();
  return (
    <Backdrop
      onCancel={() => {
        router.back();
      }}
    >
      <div className="w-[calc(100%-128px)] h-[90%] mx-auto flex items-center justify-center">
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
    </Backdrop>
  );
};

export default PostDetailModal;

"use client";
import { FC } from "react";
import { Backdrop } from "../Modal/Modal";
import { useRouter } from "next/navigation";
import { PostDetail } from "@/app/(withsidebar)/p/[postId]/page";
import PostDetailSideBar from "./PostDetailSidebar";
import PostDetailsImages from "./PostDetailsImages";

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
              <PostDetailSideBar post={post} />
            </div>
          )}
        </div>
      </div>
    </Backdrop>
  );
};

export default PostDetailModal;

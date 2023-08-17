import Image from "next/image";
import PostDetailsLikes from "./PostDetailsLikes";
import PostDate from "./PostDate";
import PostDetailsCommentInput from "./PostDetailsCommentInput";
import PostAction from "../PostComponents/PostActions";
import { FC } from "react";
import { PostDetail } from "@/models/post.models";
import PostComments from "./PostComments";
import PostCaption from "./PostCaption";
import PostHeader from "./PostHeader";
const PostDetailSideBar: FC<{ post: PostDetail }> = ({ post }) => {
  return (
    <div className="flex flex-col max-w-[500px] min-w-[500px]">
      <PostHeader post={post} />
      <div className="border-b p-4 flex flex-1 flex-col items-start gap-4">
        <PostCaption post={post} />
        <PostComments postId={post.id} />
      </div>
      <PostAction height={22} className="px-4" />
      <PostDetailsLikes
        counts={post._count.likes}
        like={post.likes[0]}
        onLike={() => {}}
      />
      <PostDate createdDate={post.createdAt} />
      <PostDetailsCommentInput postId={post.id} />
    </div>
  );
};
export default PostDetailSideBar;

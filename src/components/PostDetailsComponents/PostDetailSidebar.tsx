import Image from "next/image";
import PostDetailsLikes from "./PostDetailsLikes";
import PostDate from "./PostDate";
import PostDetailsCommentInput from "./PostDetailsCommentInput";
import PostAction from "../PostComponents/PostActions";
import { FC } from "react";
import { PostDetail } from "@/app/(withsidebar)/p/[postId]/page";
import PostComments from "./PostComments";
const PostDetailSideBar: FC<{ post: PostDetail }> = ({ post }) => {
  return (
    <div className="flex flex-col max-w-[500px] min-w-[405px]">
      <div className="border-b p-4 flex gap-4">
        <div className="w-[32px] h-[32px]">
          <Image
            src={
              post.owner.currentProfileImage
                ? post.owner.currentProfileImage
                : "/images/default-avatar.jpg"
            }
            width={48}
            height={48}
            className=" w-full h-full rounded-full"
            alt={`${post.owner.username}-profile`}
          />
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <p className=" font-semibold text-xs">{post.owner.username}</p>
        </div>
        <span className="flex items-center justify-center">
          <svg
            aria-label="More options"
            color="rgb(0, 0, 0)"
            fill="rgb(0, 0, 0)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
          </svg>
        </span>
      </div>
      <div className="border-b p-4 flex flex-1 flex-col items-start gap-4">
        <div className="flex gap-4">
          <div className="w-[32px] h-[32px]">
            <Image
              src={
                post.owner.currentProfileImage
                  ? post.owner.currentProfileImage
                  : "/images/default-avatar.jpg"
              }
              width={48}
              height={48}
              className=" w-full h-full rounded-full"
              alt={`${post.owner.username}-profile`}
            />
          </div>

          <div className="flex gap-2 items-center">
            <p className=" font-semibold text-xs">{post.owner.username}</p>
            <p className="text-xs"> {post.caption}</p>
          </div>
        </div>
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

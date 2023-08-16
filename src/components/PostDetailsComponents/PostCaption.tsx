import { PostDetail } from "@/app/(withsidebar)/p/[postId]/page";
import { timeAgoOrDayAgo } from "@/lib/timeCalculation";
import Image from "next/image";
import { FC } from "react";
const PostCaption: FC<{ post: PostDetail }> = ({ post }) => {
  return (
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
      <div className=" flex flex-col mt-[6px]">
        <div className="flex gap-2">
          <p className=" font-semibold text-xs">{post.owner.username}</p>
          <p className="text-xs"> {post.caption}</p>
        </div>
        <p className="text-xxs">{timeAgoOrDayAgo(post.createdAt)}</p>
      </div>
    </div>
  );
};

export default PostCaption;

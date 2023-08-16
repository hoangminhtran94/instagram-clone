import { PostComment } from "@/app/(withsidebar)/p/[postId]/page";
import { FC } from "react";
import Image from "next/image";
import { timeAgoOrDayAgo } from "@/lib/timeCalculation";

const PostComment: FC<{ comment: PostComment }> = ({ comment }) => {
  return (
    <div className="flex gap-4 w-full h-fit">
      <div className="w-[32px] h-[32px]">
        <Image
          src={
            comment.owner.currentProfileImage
              ? comment.owner.currentProfileImage
              : "/images/default-avatar.jpg"
          }
          width={48}
          height={48}
          className=" w-full h-full rounded-full"
          alt={`${comment.owner.username}-profile`}
        />
      </div>

      <div className=" flex flex-col mt-[6px] flex-1  gap-[2px]">
        <div className="flex gap-2 ">
          <p className=" font-semibold text-xs">{comment.owner.username}</p>
          <p className="text-xs"> {comment.message}</p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-xxs">{timeAgoOrDayAgo(comment.createdAt)}</p>
          {comment._count.likes > 0 && <p className="text-xxs">0 likes</p>}
          <span className="text-xs cursor-pointer">Reply</span>
        </div>
      </div>
      <div className="flex items-center">
        <svg
          aria-label="Like"
          color="rgb(38, 38, 38)"
          fill="rgb(38, 38, 38)"
          height="12"
          role="img"
          viewBox="0 0 24 24"
          width="12"
        >
          <title>Like</title>
          <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
        </svg>
      </div>
    </div>
  );
};
export default PostComment;
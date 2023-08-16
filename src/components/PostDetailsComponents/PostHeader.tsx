import { PostDetail } from "@/models/post.models";
import { FC } from "react";
import Image from "next/image";
const PostHeader: FC<{ post: PostDetail }> = ({ post }) => {
  return (
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
  );
};
export default PostHeader;

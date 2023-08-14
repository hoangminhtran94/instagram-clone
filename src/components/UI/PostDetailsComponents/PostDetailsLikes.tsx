import { PostLike } from "@/app/(withsidebar)/p/[postId]/page";
import { FC, MouseEventHandler } from "react";
import Image from "next/image";

const PostDetailsLikes: FC<{
  like: PostLike;
  counts: number;
  onLike: MouseEventHandler;
}> = ({ like, counts, onLike }) => {
  if (counts === 0) {
    return (
      <div className="text-xs px-4">
        Be the first to
        <span
          className=" ml-1 cursor-pointer font-semibold hover:text-gray-500"
          onClick={onLike}
        >
          like this
        </span>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className=" w-5 h-5">
        <Image
          src={
            like.owner.currentProfileImage
              ? like.owner.currentProfileImage
              : "/images/default-avatar.jpg"
          }
          className="w-full h-full rounded-full"
          width={60}
          height={60}
          alt={`${like.owner.username}-profile`}
        />
      </div>
      Liked by
      <span className="font-semibold">{like.owner.username}</span>
      {counts > 1 && <span>{`and ${counts} others`}</span>}
    </div>
  );
};

export default PostDetailsLikes;

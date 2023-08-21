import { PostLike } from "@/models/post.models";
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
    <div className="text-xs px-4">
      Liked by
      <span className="font-semibold ml-1">{like.owner.username}</span>
      {counts > 1 && <span>{`and ${counts} others`}</span>}
    </div>
  );
};

export default PostDetailsLikes;

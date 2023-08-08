import { Like } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const PostLikes: FC<{ likes: Like[]; postId: string }> = ({
  likes,
  postId,
}) => {
  return (
    <div className="py-1 text-sm">
      {likes.length === 0 ? (
        <div>
          Be the first to{" "}
          <button className="font-bold cursor-pointer">like this</button>
        </div>
      ) : (
        <div>
          Liked by{" "}
          <a className="font-bold" href="#">
            Minh Hoang Tran
          </a>{" "}
          and{" "}
          <Link href={`/p/${postId}`} className="font-bold cursor-pointer">
            others
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostLikes;

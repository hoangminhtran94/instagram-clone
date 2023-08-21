import { PostLike } from "@/models/post.models";
import { Like } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const PostLikes: FC<{ like: PostLike; postId: string; likeCount: number }> = ({
  like,
  postId,
  likeCount,
}) => {
  return (
    <div className="py-1 text-sm">
      {likeCount === 0 ? (
        <div>
          Be the first to{" "}
          <button className="font-bold cursor-pointer">like this</button>
        </div>
      ) : (
        <div>
          Liked by{" "}
          <Link className="font-bold" href={`/${like.owner.id}`}>
            {like.owner.username}
          </Link>{" "}
          {likeCount > 1 && (
            <>
              <span className="mx-1">and</span>
              <Link href={`/p/${postId}`} className="font-bold cursor-pointer">
                others
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostLikes;

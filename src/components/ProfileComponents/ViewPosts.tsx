import { FC } from "react";
import ProfileNoContents from "./ProfileNoContents";
import Image from "../ExploreComponents/ExploreImage";
import Link from "next/link";
import { ExplorePost } from "@/models/post.models";
export interface ViewPostsProps {
  posts: ExplorePost[];
}
const ViewPosts: FC<ViewPostsProps> = ({ posts }) => {
  return (
    <div className="w-full mt-4">
      {posts.length === 0 ? (
        <ProfileNoContents
          src="/images/no-post.png"
          alt="no-post"
          header="Share Photos"
          body=" When you share photos, they will appear on your profile"
          action={() => {}}
          actionLabel="Share your first photo"
        />
      ) : (
        <div className=" grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <Link href={`p/${post.id}`} className="w-full" key={post.id}>
              <Image
                fill
                postId={post.id}
                src={post.images[0].src}
                commentCount={post._count.comments}
                likeCount={post._count.likes}
                alt={post.images[0].alt}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPosts;

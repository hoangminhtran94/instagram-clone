import { ExplorePost } from "@/models/post.models";
import ExploreImage from "./ExploreImage";
import { FC } from "react";
import Link from "next/link";
interface ExploreImagesProps {
  posts: ExplorePost[];
  odd: boolean;
}

const ExploreImages: FC<ExploreImagesProps> = ({ odd = true, posts }) => {
  const renderImageGroup = () => {
    return posts.map((post, index) => {
      if (index === 0 || index === 2) {
        const condition = index === 0 ? odd : !odd;
        return (
          <Link
            href={`p/${post.id}`}
            key={post.id}
            className={condition ? "row-span-1" : "row-span-2"}
          >
            <ExploreImage
              fill
              postId={post.id}
              containerClass={!odd ? "!pb-[calc(200%+4px)]" : ""}
              className="object-cover"
              src={post.images[0].src}
              alt="anImage"
            />
          </Link>
        );
      }
      return (
        <Link href={`p/${post.id}`} key={post.id} className="row-span-1">
          <ExploreImage
            className="object-cover"
            fill
            postId={post.id}
            src={post.images[0].src}
            alt="anImage"
          />
        </Link>
      );
    });
  };
  return (
    <div className="w-full mb-1">
      <div className="grid grid-cols-3 gap-1">{renderImageGroup()}</div>
    </div>
  );
};

export default ExploreImages;

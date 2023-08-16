import Image from "next/image";

import { FC } from "react";
import { PostImage } from "@prisma/client";
const PostImages: FC<{ images: PostImage[] }> = ({ images }) => {
  return (
    <div className="w-full relative pb-[100%]">
      <Image
        fill
        className="object-cover rounded-md shadow-sm"
        src={images[0].src}
        alt={images[0].alt}
      />
    </div>
  );
};

export default PostImages;

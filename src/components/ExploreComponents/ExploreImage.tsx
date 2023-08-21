"use client";
import Image from "next/image";
import { ImageProps } from "next/image";
import { FC, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { fireStore } from "@/firebase.config";
import { PostRecord } from "@/repository/firebase";
interface ExploreImageProps {
  postId?: string;
  containerClass?: string;
  commentCount?: number;
  likeCount?: number;
}
const ExploreImage: FC<ExploreImageProps & ImageProps> = ({
  containerClass,
  src,
  alt,
  postId,
  commentCount = 0,
  likeCount,
  ...otherProps
}) => {
  const [likes, setLikes] = useState(likeCount);
  useEffect(() => {
    if (postId) {
      const unsub = onSnapshot(doc(fireStore, "Posts", postId), (doc) => {
        const data = doc.data() as unknown as PostRecord;
        setLikes(data.like_count);
      });

      return () => {
        unsub();
      };
    }
  }, [postId]);
  return (
    <div
      className={`relative pb-[100%] cursor-pointer group ${containerClass}`}
    >
      <Image src={src} alt={alt} {...otherProps} />

      <div className=" group-hover:flex absolute top-0 right-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-10 text-white hidden items-center justify-center gap-10 text-sm">
        {!!likes && likes > 0 && (
          <div className="flex gap-2 ">
            <svg
              width="21"
              viewBox="0 0 33 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.8024 14.59C28.8024 18.38 20.2224 24.96 17.1324 27.26C16.8093 27.5032 16.4168 27.6364 16.0124 27.64C15.6075 27.6393 15.2141 27.5058 14.8924 27.26C11.8024 24.96 3.24239 18.38 1.21239 14.59C0.0137136 12.3603 -0.310302 9.76373 0.303671 7.30784C0.917644 4.85194 2.42547 2.71331 4.5324 1.31002C5.87176 0.458388 7.42521 0.00413587 9.0124 1.39846e-05C10.3813 0.0181791 11.727 0.355831 12.9423 0.986052C14.1576 1.61627 15.2089 2.52164 16.0124 3.63002C16.8143 2.51993 17.8652 1.61328 19.0809 0.982871C20.2965 0.352458 21.6431 0.0158303 23.0124 1.39846e-05C24.6131 -0.00290633 26.1813 0.451604 27.5324 1.31002C29.6327 2.71938 31.1318 4.86146 31.7365 7.31742C32.3412 9.77338 32.0082 12.3666 30.8024 14.59V14.59Z"
                fill="white"
              />
            </svg>

            <span>{likes}</span>
          </div>
        )}
        <div className="flex gap-2 ">
          <svg
            width="21"
            height="17"
            viewBox="0 0 21 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.1791 12.1874C19.3242 10.9204 20 9.35936 20 7.67094C20 3.4344 15.7454 0 10.497 0C5.24865 0 0.994019 3.4344 0.994019 7.67094C0.994019 11.9075 5.24865 15.3419 10.497 15.3419C11.9504 15.3419 13.3276 15.0785 14.5593 14.6077L20.4395 16.5795L18.1791 12.1874Z"
              fill="white"
            />
          </svg>
          <span>{commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ExploreImage;

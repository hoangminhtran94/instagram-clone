"use client";
import Image from "next/image";
import { ImageProps } from "next/image";
import { FC, useState } from "react";

interface ExploreImageProps {
  containerClass?: string;
}
const ExploreImage: FC<ExploreImageProps & ImageProps> = ({
  containerClass,
  src,
  alt,
  ...otherProps
}) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      className={`relative pb-[100%] cursor-pointer ${containerClass}`}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <Image src={src} alt={alt} {...otherProps} />
      {isHovering && (
        <div className=" absolute top-0 right-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-10 text-white flex items-center justify-center gap-2 text-sm">
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
          0
        </div>
      )}
    </div>
  );
};

export default ExploreImage;

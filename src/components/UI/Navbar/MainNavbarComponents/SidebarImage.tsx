import Image from "next/image";
import { FC } from "react";

interface SideBarImageProps {
  src: string;
  alt: string;
}
const SideBarImage: FC<SideBarImageProps> = ({ src, alt }) => {
  return (
    <div className="w-8 h-8 relative ">
      <Image src={src} alt={alt} fill className=" rounded-full object-cover" />
    </div>
  );
};

export default SideBarImage;

import { StoryUser } from "@/models/story.models";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
const StoryReelItem:FC<{user:StoryUser}> = ({user}) => {
  return (
    <Link href={"#"} className="flex flex-col items-center  gap-3">
      <Image
        width={80}
        height={80}
        className=" w-14 h-14 rounded-full object-cover shadow-sm "
        src={user.currentProfileImage?user.currentProfileImage:"/images/default-avatar.jpg"}
        alt={"random-image"}
      />

      <p className="text-sm">{user.username}</p>
    </Link>
  );
};
export default StoryReelItem;

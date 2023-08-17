import { FC, useState } from "react";
import UserSummaryBox from "../UI/UserSummaryBox/UserSummaryBox";
import Image from "next/image";
import { UserSummary } from "@/models/user.models";
const CommentProfileImg: FC<{ user: UserSummary }> = ({ user }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      className="w-[32px] h-[32px] cursor-pointer relative"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <Image
        src={
          user.currentProfileImage
            ? user.currentProfileImage
            : "/images/default-avatar.jpg"
        }
        width={48}
        height={48}
        className=" w-full h-full rounded-full"
        alt={`${user.username}-profile`}
      />
      <UserSummaryBox hovering={hovering} user={user} />
    </div>
  );
};

export default CommentProfileImg;

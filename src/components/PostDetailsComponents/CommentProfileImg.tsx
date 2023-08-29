import { FC, useRef } from "react";
import UserSummaryBox from "../UI/UserSummaryBox";
import Image from "next/image";
import { UserSummary } from "@/models/user.models";
import useShowUserSummary from "@/hooks/useShowUserSummary";
const CommentProfileImg: FC<{ user: UserSummary }> = ({ user }) => {
  const { hovering, mouseEnterHandler, mouseLeaveHandler } =
    useShowUserSummary();

  return (
    <div
      className="w-[32px] h-[32px]  relative"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <Image
        src={
          user.currentProfileImage
            ? user.currentProfileImage
            : "/images/default-avatar.jpg"
        }
        width={48}
        height={48}
        className=" w-full h-full rounded-full cursor-pointer"
        alt={`${user.username}-profile`}
      />
      <UserSummaryBox hovering={hovering} user={user} />
    </div>
  );
};

export default CommentProfileImg;

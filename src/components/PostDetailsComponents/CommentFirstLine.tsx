import { UserSummary } from "@/models/user.models";
import { FC } from "react";
import UserSummaryBox from "../UI/UserSummaryBox/UserSummaryBox";
import useShowUserSummary from "@/hooks/useShowUserSummary";
import Link from "next/link";
const CommentFirstLine: FC<{ user: UserSummary; message?: string }> = ({
  user,
  message,
}) => {
  const { hovering, mouseEnterHandler, mouseLeaveHandler } =
    useShowUserSummary();

  return (
    <div className="flex gap-2 items-center flex-1">
      <div
        className="relative"
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <Link
          href={`/${user.id}`}
          className=" font-semibold text-xs cursor-pointer flex items-center hover:opacity-50"
        >
          {user.username}
        </Link>
        <UserSummaryBox hovering={hovering} user={user} />
      </div>
      {message && <p className="text-xs"> {message}</p>}
    </div>
  );
};

export default CommentFirstLine;

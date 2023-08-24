import { UserSummary } from "@/models/user.models";
import { FC } from "react";
import UserSummaryBox from "../UI/UserSummaryBox/UserSummaryBox";
import useShowUserSummary from "@/hooks/useShowUserSummary";
import Link from "next/link";
const CommentFirstLine: FC<{ owner: UserSummary; message?: string }> = ({
  owner,
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
          href={`/${owner?.id}`}
          className=" font-semibold text-xs cursor-pointer flex items-center hover:opacity-50"
        >
          {owner?.username}
        </Link>
        <UserSummaryBox hovering={hovering} user={owner} />
      </div>
      {message && <p className="text-xs"> {message}</p>}
    </div>
  );
};

export default CommentFirstLine;

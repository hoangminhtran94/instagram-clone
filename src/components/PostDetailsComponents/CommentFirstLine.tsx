import { UserSummary } from "@/models/user.models";
import { FC } from "react";
import UserSummaryBox from "../UI/UserSummaryBox/UserSummaryBox";
import useShowUserSummary from "@/hooks/useShowUserSummary";
import Link from "next/link";
import HoverWrapper from "../UI/UsernameWrapper/UsernameWrapper";
const CommentFirstLine: FC<{ owner: UserSummary; message?: string }> = ({
  owner,
  message,
}) => {
  return (
    <div className="flex gap-2 items-center flex-1">
      <HoverWrapper user={owner}>
        <Link
          href={`/${owner?.id}`}
          className=" font-semibold text-xs cursor-pointer flex items-center hover:opacity-50"
        >
          {owner?.username}
        </Link>
      </HoverWrapper>
      {message && <p className="text-xs"> {message}</p>}
    </div>
  );
};

export default CommentFirstLine;

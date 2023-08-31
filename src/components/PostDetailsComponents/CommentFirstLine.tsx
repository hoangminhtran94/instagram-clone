import { UserSummary } from "@/models/user.models";
import { FC } from "react";
import Link from "next/link";
import HoverWrapper from "../UI/UsernameWrapper";
import { includeHashTags } from "@/lib/utils-functions-client";
const CommentFirstLine: FC<{ owner: UserSummary; message: string }> = ({
  owner,
  message = "",
}) => {
  const mappedCaption = includeHashTags(message);
  return (
    <div className="flex gap-2 items-center flex-1 text-xs">
      <HoverWrapper user={owner}>
        <Link
          href={`/${owner?.id}`}
          className=" font-semibold text-xs cursor-pointer flex items-center hover:opacity-50"
        >
          {owner?.username}
        </Link>
      </HoverWrapper>
      {message && <div className="text-xs">{mappedCaption}</div>}
    </div>
  );
};

export default CommentFirstLine;

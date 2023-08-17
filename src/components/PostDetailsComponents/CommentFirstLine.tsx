import { UserSummary } from "@/models/user.models";
import { FC, useState } from "react";
import UserSummaryBox from "../UI/UserSummaryBox/UserSummaryBox";

const CommentFirstLine: FC<{ user: UserSummary; message: string }> = ({
  user,
  message,
}) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="flex gap-2 relative">
      <p
        className=" font-semibold text-xs cursor-pointer"
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      >
        {user.username}
      </p>
      <p className="text-xs"> {message}</p>
      <UserSummaryBox hovering={hovering} user={user} />
    </div>
  );
};

export default CommentFirstLine;

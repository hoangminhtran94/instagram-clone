import { UserSummary } from "@/models/user.models";
import { User } from "@prisma/client";
import { FC } from "react";

const PostContent: FC<{ caption: string; creator: UserSummary }> = ({
  caption,
  creator,
}) => {
  return (
    <div className="py-1 text-sm">
      <span className="mr-1 font-bold">{creator.username}</span>
      {caption.slice(0, 200)}
      {caption.length > 201 && (
        <>
          ...
          <br />
          <span className=" text-slate-500">more</span>
        </>
      )}
    </div>
  );
};

export default PostContent;

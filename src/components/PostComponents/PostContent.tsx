import { UserSummary } from "@/models/user.models";
import HoverWrapper from "../UI/UsernameWrapper";
import { FC } from "react";

const PostContent: FC<{ caption: string; creator: UserSummary }> = ({
  caption,
  creator,
}) => {
  return (
    <div className="py-1 text-sm">
      <HoverWrapper user={creator} className="mr-1 font-bold inline">
        {creator.username}
      </HoverWrapper>
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

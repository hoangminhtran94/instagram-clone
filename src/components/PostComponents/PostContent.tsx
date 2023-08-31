import { UserSummary } from "@/models/user.models";
import HoverWrapper from "../UI/UsernameWrapper";
import { FC } from "react";
import { includeHashTags } from "@/lib/utils-functions-client";

const PostContent: FC<{ caption: string; creator: UserSummary }> = ({
  caption,
  creator,
}) => {
  const mappedCaption = includeHashTags(caption);
  return (
    <div className="py-1 text-sm">
      <HoverWrapper user={creator} className="mr-1 font-bold inline">
        {creator.username}
      </HoverWrapper>
      {mappedCaption}
    </div>
  );
};

export default PostContent;

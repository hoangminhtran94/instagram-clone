import { HashTag } from "@prisma/client";
import { FC } from "react";

const ExploreTag: FC<{ tag: HashTag }> = ({ tag }) => {
  return (
    <div className="bg-slate-200 hover:bg-slate-300 px-4 py-1 rounded-md">
      <p>{tag.message}</p>
    </div>
  );
};

export default ExploreTag;

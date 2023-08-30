import { FC } from "react";
import ExploreTag from "./ExploreTags";
import { HashTag } from "@prisma/client";
const ExploreTags: FC<{ tags: HashTag[] }> = ({ tags }) => {
  return (
    <div className="flex gap-3 flex-wrap text-sm font-semibold">
      {tags.map((tag) => (
        <ExploreTag key={tag.id} tag={tag} />
      ))}
    </div>
  );
};

export default ExploreTags;

import { HashTag } from "@prisma/client";
import { FC } from "react";
import Link from "next/link";
const ExploreTag: FC<{ tag: HashTag }> = ({ tag }) => {
  return (
    <Link
      href={`/explore/search/keyword/?q=${tag.message}`}
      className="bg-slate-200 hover:bg-slate-300 px-4 py-1 rounded-md"
    >
      <p>{tag.message}</p>
    </Link>
  );
};

export default ExploreTag;

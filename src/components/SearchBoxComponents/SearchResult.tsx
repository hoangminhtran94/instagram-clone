import { UserSearchResult } from "@/models/user.models";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
const SearchResult: FC<{ result: UserSearchResult }> = ({ result }) => {
  return (
    <Link
      href={`/${result.id}`}
      className=" flex gap-4 hover:bg-gray-50 py-2 px-6 rounded-sm"
    >
      <div>
        <Image
          className="w-[43px] h-[43px] border rounded-full"
          width={80}
          height={80}
          alt={`profile-${result.username}`}
          src={
            result.currentProfileImage
              ? result.currentProfileImage
              : "/images/default-avatar.jpg"
          }
        />
      </div>
      <div className="flex flex-col text-xs justify-center ">
        <p className="font-semibold">{result.username}</p>
        <p className="font-light opacity-70">{result.fullName}</p>
      </div>
    </Link>
  );
};
export default SearchResult;

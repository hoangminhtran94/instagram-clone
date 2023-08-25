import Link from "next/link";
import Image from "next/image";
import { getSuggestion } from "@/actions/action";
import UserSuggestion from "./UserSuggestion";
import { UserSummary } from "@/models/user.models";
const SideSuggestion = async () => {
  const suggestions = (await getSuggestion()) as UserSummary[];

  return (
    <div className="w-full flex flex-col gap-5 text-xs">
      <div className="flex gap-3">
        <p className=" text-slate-500  font-bold flex-1">Suggested for you</p>
        <Link className="px-3 font-bold" href={"#"}>
          See all
        </Link>
      </div>
      {suggestions.map((user) => (
        <UserSuggestion key={user.id} user={user} />
      ))}
    </div>
  );
};

export default SideSuggestion;

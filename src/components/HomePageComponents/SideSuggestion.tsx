"use client";
import Link from "next/link";
import { getSuggestion } from "@/actions/action";
import UserSuggestion from "./UserSuggestion";
import { UserSummary } from "@/models/user.models";
import { useQuery } from "@tanstack/react-query";
const SideSuggestion = () => {
  const { data, isError, isLoading, error } = useQuery<UserSummary[]>({
    queryKey: ["suggestion"],
    queryFn: async () => {
      const response = await fetch("/api/users/suggestion");
      if (!response.ok) {
        throw Error("Failed to fetch");
      }
      const suggesstion = await response.json();
      return suggesstion;
    },
  });

  return (
    <div className="w-full flex flex-col gap-5 text-xs">
      <div className="flex gap-3">
        <p className=" text-slate-500  font-bold flex-1">Suggested for you</p>
        <Link className="px-3 font-bold" href={"#"}>
          See all
        </Link>
      </div>
      {data?.map((user: any) => (
        <UserSuggestion key={user.id} user={user} />
      ))}
    </div>
  );
};

export default SideSuggestion;

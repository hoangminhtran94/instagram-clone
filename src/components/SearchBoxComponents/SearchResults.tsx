import { UserSearchResult } from "@/models/user.models";
import { FC } from "react";
import SearchResult from "./SearchResult";

const SearchResults: FC<{ searchResults: UserSearchResult[] }> = ({
  searchResults,
}) => {
  if (searchResults.length > 0) {
    return (
      <div className="flex-1 flex flex-col overflow-y-auto">
        {searchResults.map((result) => (
          <SearchResult key={result.id} result={result} />
        ))}
      </div>
    );
  }
  return <></>;
};

export default SearchResults;

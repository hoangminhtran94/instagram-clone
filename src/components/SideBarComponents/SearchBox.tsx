import { motion } from "framer-motion";
import { forwardRef, useState, useEffect } from "react";
import { useRef } from "react";
import { searchUsers } from "@/actions/action";
import { debounce } from "lodash";
import { UserSearchResult } from "@/models/user.models";
import Image from "next/image";
import SearchResults from "../SearchBoxComponents/SearchResults";
import SearchBoxInput from "../UI/SearchBoxInput";
interface SearchBoxProps {}

const SearchBox = forwardRef<HTMLDivElement>((props: SearchBoxProps, ref) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const submitHandler = async (formData: FormData) => {
    const data = (await searchUsers(formData)) as UserSearchResult[];
    setSearchResults(data);
  };
  const searchHandler = debounce(() => {
    formRef.current?.requestSubmit();
  }, 500);
  return (
    <motion.div
      ref={ref}
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -500, opacity: 0, zIndex: -10 }}
      className="fixed left-[100px]  w-[400px] flex flex-col gap-7 h-full top-0  rounded-r-xl bg-white shadow-right-lg border py-6"
    >
      <h4 className="font-semibold px-6">Search</h4>
      <form className="px-6" ref={formRef} action={submitHandler}>
        <SearchBoxInput
          className="input-search"
          name="search-query"
          placeholder="Search"
          onChange={() => {
            searchHandler();
          }}
        />
      </form>
      <SearchResults searchResults={searchResults} />
      {searchResults.length === 0 && (
        <div className="flex-1 flex flex-col px-6">
          <p className="font-semibold">Recent</p>
          <div className="flex-1 flex items-center justify-center">
            <p>No recent searches.</p>
          </div>
        </div>
      )}
    </motion.div>
  );
});

export default SearchBox;

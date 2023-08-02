import { motion } from "framer-motion";
import { FC } from "react";

interface SearchBoxProps {}

const SearchBox: FC<SearchBoxProps> = () => {
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -500, opacity: 0, zIndex: -10 }}
      className="fixed left-[100px]  w-[400px] flex flex-col gap-7 h-full top-0  rounded-r-xl bg-white shadow-right-lg border p-6"
    >
      <h4 className="font-semibold">Search</h4>
      <form>
        <input className="input-search" placeholder="Search" />
      </form>
      <div className="flex-1 flex flex-col">
        <p className="font-semibold">Recent</p>
        <div className="flex-1 flex items-center justify-center">
          <p>No recent searches.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBox;

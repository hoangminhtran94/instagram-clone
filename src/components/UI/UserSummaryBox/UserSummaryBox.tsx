import { FC } from "react";
import { UserSummary } from "./../../../models/user.models";
import { AnimatePresence, motion } from "framer-motion";

const UserSummaryBox: FC<{ className?: string; hovering: boolean }> = ({
  className,
  hovering,
}) => {
  return (
    <AnimatePresence>
      {hovering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-[calc(100%+10px)] drop-shadow-2xl rounded-md bg-white  w-[300px] h-[300px] z-50"
        ></motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserSummaryBox;

"use client";
import { motion } from "framer-motion";
const TopReelsLoading = () => {
  return (
    <div className="py-4 flex gap-3">
      {new Array(8).map((_, index) => (
        <motion.div
          className="w-[80px] h-[80px] rounded-full bg-slate-200 border-slate-300"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, delay: index * 0.2 }}
          key={index}
        />
      ))}
    </div>
  );
};

export default TopReelsLoading;

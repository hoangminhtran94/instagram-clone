"use client";
import { motion } from "framer-motion";
const StoryReelsLoading = () => {
  const array = new Array(8).fill("");
  return (
    <div className="py-4 flex gap-2">
      {array.map((_, index) => (
        <motion.div
          className="w-[60px] h-[60px] rounded-full bg-gray-100 border-gray-200 border "
          animate={{ opacity: [0.25, 1] }}
          transition={{
            ease:"circInOut",
            repeat: Infinity,
            delay: index * 0.2,
            duration: 1.6,
          }}
          key={index}
        />
      ))}
    </div>
  );
};

export default StoryReelsLoading;

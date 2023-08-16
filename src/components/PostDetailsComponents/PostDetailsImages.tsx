import { PostImage } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { v4 } from "uuid";

type Mode = "next" | "prev";

const variants = {
  initial: (mode: Mode) =>
    mode === "next"
      ? { transform: "translateX(100%)" }
      : { transform: "translateX(-100%)" },

  animate: { transform: "translateX(0)" },
  exit: (mode: Mode) =>
    mode === "next"
      ? { transform: "translateX(-100%)" }
      : { transform: "translateX(100%)" },
};

const PostDetailsImages: FC<{ images: PostImage[] }> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("next");
  const nextImageHandler = () => {
    setMode("next");
    setIndex((prev) => {
      return prev + 1;
    });
  };
  const previousImageHandler = () => {
    setMode("prev");
    setIndex((prev) => {
      return prev - 1;
    });
  };

  return (
    <div className="aspect-square h-full max-h-[1420px] max-w-[1420px] relative overflow-hidden ">
      {images.length > 1 && (
        <>
          {index !== 0 && (
            <div className="absolute h-full left-3 flex items-center justify-center z-20 ">
              <Image
                onClick={previousImageHandler}
                src={"/images/left-arrow.png"}
                alt="left-arrow"
                width={60}
                height={60}
                className=" w-[30px] h-[30px] cursor-pointer"
              />
            </div>
          )}
          {index !== images.length - 1 && (
            <div className=" absolute  h-full right-3 flex items-center justify-center z-20">
              <Image
                onClick={nextImageHandler}
                src={"/images/right-arrow.png"}
                alt="left-arrow"
                width={60}
                height={60}
                className=" w-[30px] h-[30px]  cursor-pointer"
              />
            </div>
          )}
        </>
      )}
      <AnimatePresence custom={mode} mode="sync" initial={false}>
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={mode}
          transition={{ duration: 0.5 }}
          className=" absolute top-0 right-0 w-full h-full"
          key={index}
        >
          <Image
            className=" pointer-events-none select-none"
            width={1420}
            height={1420}
            src={images[index].src}
            alt={images[index].alt ?? v4()}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PostDetailsImages;

"use client";
import { FC, useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
const VideoPlayer: FC = () => {
  const [start, setStart] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bottomRef);
  useEffect(() => {
    if (inView) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [inView]);
  useEffect(() => {
    if (start) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [start]);
  return (
    <div className="flex flex-col">
      <div className="w-[600px] min-h-[80vh] h-[80vh] snap-start snap-always relative">
        <div
          className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center cursor-pointer"
          onClick={() => {
            setStart((prev) => !prev);
          }}
        >
          <AnimatePresence initial={false}>
            {start && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="p-5 bg-[rgba(0,0,0,0.5)] rounded-full "
              >
                <svg
                  aria-label="Play button icon"
                  color="rgb(255, 255, 255)"
                  fill="rgb(255, 255, 255)"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Play button icon</title>
                  <path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z"></path>
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <video
          ref={videoRef}
          className="w-full h-full object-contain drop-shadow-2xl rounded-md bg-black"
          loop
        >
          <source src="/upload/videos/1.mp4" type="video/mp4"></source>
        </video>
      </div>
      <div ref={bottomRef} className="h-10"></div>
    </div>
  );
};

export default VideoPlayer;

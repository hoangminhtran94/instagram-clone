"use client";
import { FC, useRef, useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
const VideoPlayer: FC<{ children?: ReactNode }> = ({ children }) => {
  const [start, setStart] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bottomRef);
  useEffect(() => {
    setStart(!inView);
  }, [inView]);
  useEffect(() => {
    if (start) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [start]);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);
  return (
    <div className="flex flex-col">
      <div className="w-[600px] min-h-[80vh] h-[80vh] snap-start snap-always relative">
        <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center cursor-pointer">
          <div
            className="absolute top-0 left-0 w-full h-full"
            onClick={() => {
              setStart((prev) => !prev);
            }}
          ></div>
          <span
            className="absolute top-2 right-2 p-2 rounded-full bg-[rgba(255,255,255,0.3)]"
            onClick={() => {
              setMuted((prev) => !prev);
            }}
          >
            {muted ? (
              <svg
                aria-label="Audio is muted"
                color="rgb(255, 255, 255)"
                fill="rgb(255, 255, 255)"
                height="14"
                role="img"
                viewBox="0 0 48 48"
                width="14"
              >
                <title>Audio is muted</title>
                <path
                  clip-rule="evenodd"
                  d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                aria-label="Audio is playing"
                color="rgb(255, 255, 255)"
                fill="rgb(255, 255, 255)"
                height="14"
                role="img"
                viewBox="0 0 24 24"
                width="14"
              >
                <title>Audio is playing</title>
                <path d="M16.636 7.028a1.5 1.5 0 10-2.395 1.807 5.365 5.365 0 011.103 3.17 5.378 5.378 0 01-1.105 3.176 1.5 1.5 0 102.395 1.806 8.396 8.396 0 001.71-4.981 8.39 8.39 0 00-1.708-4.978zm3.73-2.332A1.5 1.5 0 1018.04 6.59 8.823 8.823 0 0120 12.007a8.798 8.798 0 01-1.96 5.415 1.5 1.5 0 002.326 1.894 11.672 11.672 0 002.635-7.31 11.682 11.682 0 00-2.635-7.31zm-8.963-3.613a1.001 1.001 0 00-1.082.187L5.265 6H2a1 1 0 00-1 1v10.003a1 1 0 001 1h3.265l5.01 4.682.02.021a1 1 0 001.704-.814L12.005 2a1 1 0 00-.602-.917z"></path>
              </svg>
            )}
          </span>
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
        {children}
        <div ref={bottomRef} className="h-5 absolute top-1/2 w-full -z-10 " />
      </div>
    </div>
  );
};

export default VideoPlayer;

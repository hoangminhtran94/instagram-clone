import VideoPlayer from "@/components/UI/VideoPlayer/VideoPlayer";
const Reels = () => {
  return (
    <div className="flex flex-col gap-10  items-center max-h-screen  snap-y snap-mandatory overflow-scroll pt-5 scroll-pt-5  hide-scroll-bar ">
      <VideoPlayer />
      <VideoPlayer />
      <VideoPlayer />
      <VideoPlayer />
    </div>
  );
};

export default Reels;

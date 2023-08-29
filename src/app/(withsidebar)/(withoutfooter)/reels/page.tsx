import VideoPlayer from "@/components/UI/VideoPlayer/VideoPlayer";
import ReelVideoPlayer from "@/components/ReelsComponents/ReelVideoPlayer";
const Reels = () => {
  return (
    <div className="flex flex-col gap-10  items-center max-h-screen  snap-y snap-mandatory overflow-scroll pt-5 scroll-pt-5  hide-scroll-bar ">
      <ReelVideoPlayer />
      <ReelVideoPlayer />
      <ReelVideoPlayer />
      <ReelVideoPlayer />
    </div>
  );
};

export default Reels;

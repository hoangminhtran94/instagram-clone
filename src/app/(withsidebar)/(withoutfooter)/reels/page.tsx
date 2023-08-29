import VideoPlayer from "@/components/UI/VideoPlayer/VideoPlayer";
const Reels = () => {
  return (
    <div className="flex flex-col  items-center max-h-screen  snap-y snap-mandatory overflow-scroll pt-10 scroll-pt-10  hide-scroll-bar ">
      <VideoPlayer />
      <VideoPlayer />
      <VideoPlayer />
      <VideoPlayer />
    </div>
  );
};

export default Reels;

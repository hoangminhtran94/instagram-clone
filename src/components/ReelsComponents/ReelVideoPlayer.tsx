import Image from "next/image";
import VideoPlayer from "../UI/VideoPlayer/VideoPlayer";
const ReelVideoPlayer = () => {
  return (
    <div className="flex">
      <VideoPlayer>
        <div className="absolute bottom-0 items-start w-full py-4 px-6  flex flex-col gap-2 text-xs text-white select-none ">
          <div className="flex gap-3 font-semibold  items-center">
            <div className=" w-8 h-8 ">
              <Image
                width={64}
                height={64}
                alt="image"
                className="rounded-full w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1692891089922-d08b5d1c2bcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
              />
            </div>
            <div>hihi123em</div>
            <div>Follow</div>
          </div>
          <div>Random message</div>
          <div className="flex items-center gap-2">
            <span>
              <svg
                aria-label="Audio image"
                color="rgb(255, 255, 255)"
                fill="rgb(255, 255, 255)"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <title>Audio image</title>
                <path d="M21.002 16.972V2.044a.999.999 0 0 0-.36-.769 1.012 1.012 0 0 0-.823-.214L6.816 3.479A1 1 0 0 0 6 4.462v10.864A3.75 3.75 0 1 0 9 19V9.56l9.003-1.675v5.442A3.75 3.75 0 1 0 21.005 17c0-.01-.003-.02-.003-.029Z"></path>
              </svg>
            </span>
            A random toon
          </div>
        </div>
      </VideoPlayer>
      <div className="px-6 flex flex-col justify-end text-xxs gap-5">
        <div className="flex flex-col items-center">
          <svg
            aria-label="Like"
            color="rgb(38, 38, 38)"
            fill="rgb(38, 38, 38)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Like</title>
            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
          </svg>
          Likes
        </div>
        <div className="flex flex-col items-center">
          <svg
            aria-label="Comment"
            color="rgb(38, 38, 38)"
            fill="rgb(38, 38, 38)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Comment</title>
            <path
              d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
            ></path>
          </svg>
          1,506
        </div>
        <div className="flex flex-col items-center">
          <svg
            aria-label="Direct"
            color="rgb(38, 38, 38)"
            fill="rgb(38, 38, 38)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Direct</title>
            <line
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
              x1="22"
              x2="9.218"
              y1="3"
              y2="10.083"
            ></line>
            <polygon
              fill="none"
              points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
            ></polygon>
          </svg>
        </div>
        <div className="flex flex-col items-center">
          <svg
            aria-label="Save"
            color="rgb(0, 0, 0)"
            fill="rgb(0, 0, 0)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Save</title>
            <polygon
              fill="none"
              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            ></polygon>
          </svg>
        </div>
        <div className="flex flex-col items-center">
          <svg
            aria-label="More"
            color="rgb(38, 38, 38)"
            fill="rgb(38, 38, 38)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>More</title>
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
          </svg>
        </div>
        <div className="flex flex-col items-center">
          <div className=" w-6 h-6 ">
            <Image
              width={64}
              height={64}
              alt="image"
              className="rounded w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1692891089922-d08b5d1c2bcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelVideoPlayer;

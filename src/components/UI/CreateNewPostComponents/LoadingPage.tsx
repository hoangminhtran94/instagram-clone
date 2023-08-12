import { FC } from "react";
import Image from "next/image";
const LoadingPage: FC<{ uploading: boolean }> = ({ uploading = true }) => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center gap-4">
      <Image
        width={96}
        height={96}
        className={`w-[96px] h-[96px] ${uploading ? "animate-spin" : ""} `}
        alt="loading"
        src={uploading ? "/images/spinner.png" : "/images/success.gif"}
      />
      {!uploading && <p className="text-lg">Your post has been shared.</p>}
    </div>
  );
};

export default LoadingPage;

import { FC, useState } from "react";
import CropImage from "./CropImage";
import { useCreatePostContext } from "@/context/createPostContext";
const CropImagePage: FC = () => {
  const { imageFiles } = useCreatePostContext();
  const [currentImage, setCurrentImage] = useState(0);

  const nextHandler = () => {
    setCurrentImage((prev) => {
      if (prev === imageFiles.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };
  const prevHandler = () => {
    setCurrentImage((prev) => {
      if (prev === 0) {
        return imageFiles.length - 1;
      }
      return prev - 1;
    });
  };
  return (
    <div className="w-full pb-[calc(100%-45px)] relative ">
      {imageFiles.length > 1 && (
        <>
          {" "}
          <button
            className="absolute select-none top-[calc(50%-8px)] right-3  z-10 cursor-pointer p-2 rounded-full bg-[rgba(0,0,0,0.4)]"
            onClick={nextHandler}
          >
            <svg
              aria-label="Right chevron"
              color="rgb(255, 255, 255)"
              fill="rgb(255, 255, 255)"
              height="16"
              role="img"
              viewBox="0 0 24 24"
              width="16"
            >
              <polyline
                fill="none"
                points="8 3 17.004 12 8 21"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polyline>
            </svg>
          </button>
          <button
            className="absolute select-none top-[calc(50%-8px)] left-3  z-10 cursor-pointer p-2 rounded-full bg-[rgba(0,0,0,0.4)]"
            onClick={prevHandler}
          >
            <svg
              aria-label="Left chevron"
              color="rgb(255, 255, 255)"
              fill="rgb(255, 255, 255)"
              height="16"
              role="img"
              viewBox="0 0 24 24"
              width="16"
            >
              <polyline
                fill="none"
                points="16.502 3 7.498 12 16.502 21"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polyline>
            </svg>
          </button>
        </>
      )}
      {imageFiles.map((file, index) => (
        <div
          key={file.name}
          className={`absolute top-0 right-0 h-full w-full ${
            currentImage !== index && "hidden"
          }`}
        >
          <CropImage file={file} index={index} />
        </div>
      ))}
    </div>
  );
};

export default CropImagePage;

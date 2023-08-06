import { FC, useState } from "react";
import ImageFilter from "./ImageFilter";
const FilterImageCarousel: FC<{
  canvasImages: HTMLCanvasElement[];
  filterImages: string[];
  setFilteredImages: (prev: any) => void;
}> = ({ canvasImages, setFilteredImages, filterImages }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const nextHandler = () => {
    setCurrentImage((prev) => {
      if (prev === canvasImages.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };
  const prevHandler = () => {
    setCurrentImage((prev) => {
      if (prev === 0) {
        return canvasImages.length - 1;
      }
      return prev - 1;
    });
  };
  return (
    <div className="w-full pb-[calc(100%-245px)] relative ">
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
      {canvasImages.map((canvas, index) => (
        <div
          key={index}
          className={`absolute top-0 right-0 h-full w-full ${
            currentImage !== index && "hidden"
          }`}
        >
          <ImageFilter
            filteredImage={filterImages[index]}
            canvasImage={canvas}
            index={index}
            setFilteredImages={setFilteredImages}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterImageCarousel;

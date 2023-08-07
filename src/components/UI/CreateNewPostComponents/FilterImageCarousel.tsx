import { FC, useState } from "react";
import ImageFilter from "./ImageFilter";
const FilterImageCarousel: FC<{
  canvasImages: HTMLCanvasElement[];
  filterImages: string[];
  setFilteredImages: (prev: any) => void;
}> = ({ canvasImages, setFilteredImages, filterImages }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const disableNavigation = canvasImages.length === 1;
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
    <div className="w-full flex-1  ">
      {canvasImages.map((canvas, index) => (
        <div
          key={index}
          className={` h-full w-full ${currentImage !== index && "hidden"}`}
        >
          <ImageFilter
            disableNavigation={disableNavigation}
            onNext={nextHandler}
            onPrevious={prevHandler}
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

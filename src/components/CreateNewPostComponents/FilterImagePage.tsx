import { FC, useState } from "react";
import ImageFilter from "./ImageFilter";
import { useCreatePostContext } from "@/context/createPostContext";
const FilterImagePage: FC<{}> = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { croppedImages } = useCreatePostContext();
  const disableNavigation = croppedImages.length === 1;
  const nextHandler = () => {
    setCurrentImage((prev) => {
      if (prev === croppedImages?.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };
  const prevHandler = () => {
    setCurrentImage((prev) => {
      if (prev === 0) {
        return croppedImages?.length - 1;
      }
      return prev - 1;
    });
  };
  return (
    <div className="w-full flex-1  ">
      {croppedImages.map((canvas, index) => (
        <div
          key={index}
          className={` h-full w-full ${currentImage !== index && "hidden"}`}
        >
          <ImageFilter
            disableNavigation={disableNavigation}
            onNext={nextHandler}
            onPrevious={prevHandler}
            canvasImage={canvas}
            index={index}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterImagePage;

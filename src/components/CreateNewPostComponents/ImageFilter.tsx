import { FC, useCallback, useEffect, useMemo } from "react";
import ImageFilterSidebar from "./ImageFilterSidebar";
import { useCreatePostContext } from "@/context/createPostContext";
import { applyFilterToCanvas } from "@/lib/imageFilter";
const ImageFilter: FC<{
  disableNavigation: boolean;
  canvasImage: HTMLCanvasElement;
  index: number;
  onNext: () => void;
  onPrevious: () => void;
}> = ({
  canvasImage,
  index,
  onNext,
  onPrevious,
  disableNavigation = false,
}) => {
  const { setFilteredImages, filteredImages } = useCreatePostContext();
  const canvas = useMemo(() => canvasImage, [canvasImage]);

  const editCanvasColor = useCallback(
    (filter: string) => {
      const editedCanvas = applyFilterToCanvas(canvas, filter);
      setFilteredImages((prev) => {
        const copied = [...prev];
        copied[index] = { img: editedCanvas.toDataURL(), alt: "" };
        return copied;
      });
    },
    [canvas, index, setFilteredImages]
  );

  if (!filteredImages[index]) {
    return <div>Loading</div>;
  }
  return (
    <div className="flex">
      <div className="w-[755px] relative">
        {disableNavigation ? (
          <></>
        ) : (
          <>
            {" "}
            <button
              className="absolute select-none top-[calc(50%-8px)] right-3  z-10 cursor-pointer p-2 rounded-full bg-[rgba(0,0,0,0.4)]"
              onClick={onNext}
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
              onClick={onPrevious}
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

        <img
          src={filteredImages[index].img}
          className="w-full h-full object-cover pointer-events-none"
          alt="image"
        />
      </div>

      <ImageFilterSidebar
        onChangeFilter={(filter) => {
          editCanvasColor(filter);
        }}
      />
    </div>
  );
};

export default ImageFilter;

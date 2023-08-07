import Image from "next/image";
import { FC, useState, useCallback, useEffect, useMemo } from "react";
import ImageFilterSidebar from "./ImageFilterSidebar";

const ImageFilter: FC<{
  filteredImage: string;
  disableNavigation: boolean;
  canvasImage: HTMLCanvasElement;
  index: number;
  onNext: () => void;
  onPrevious: () => void;
  setFilteredImages: (cb: any) => void;
}> = ({
  canvasImage,
  setFilteredImages,
  index,
  filteredImage,
  onNext,
  onPrevious,
  disableNavigation = false,
}) => {
  const [filter, setFilter] = useState("blur(0px)");

  const canvas = useMemo(() => canvasImage, [canvasImage]);

  const applyFilterToCanvas = useCallback(
    async (canvasElement: HTMLCanvasElement, selectedFilter: string) => {
      const newCanvas = document.createElement("canvas");
      newCanvas.width = canvasElement.width;
      newCanvas.height = canvasElement.height;

      const ctx = newCanvas.getContext("2d");
      if (ctx) {
        ctx.filter = selectedFilter;
        ctx.drawImage(canvasElement, 0, 0);
      }

      return newCanvas;
    },
    []
  );

  const saveChanges = useCallback(
    async (canvasEdited: HTMLCanvasElement) => {
      const blob = await new Promise<Blob | null>((resolve) => {
        canvasEdited.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      });
      if (blob) {
        setFilteredImages((prev: any) => {
          const copied = [...prev];
          copied[index] = canvasEdited.toDataURL();
          return copied;
        });
      }
    },
    [index]
  );

  const editCanvasColor = useCallback(async () => {
    const editedCanvas = await applyFilterToCanvas(canvas, filter);
    return editedCanvas;
  }, [applyFilterToCanvas, canvas, filter]);
  useEffect(() => {
    editCanvasColor().then((canvasEdited) => {
      saveChanges(canvasEdited);
    });
  }, [editCanvasColor, saveChanges]);

  if (!filteredImage) {
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
          src={filteredImage}
          className="w-full h-full object-cover pointer-events-none"
          alt="image"
        />
      </div>

      <ImageFilterSidebar setCurrentFilter={setFilter} />
    </div>
  );
};

export default ImageFilter;

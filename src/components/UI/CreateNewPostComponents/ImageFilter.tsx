import Image from "next/image";
import { FC, useState, useCallback, useEffect, useMemo } from "react";
import ImageFilterSidebar from "./ImageFilterSidebar";

const ImageFilter: FC<{
  filteredImage: string;
  canvasImage: HTMLCanvasElement;
  index: number;
  setFilteredImages: (cb: any) => void;
}> = ({ canvasImage, setFilteredImages, index, filteredImage }) => {
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
      <div className="w-[755px]">
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

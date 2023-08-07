import { useMemo, useState } from "react";
import { FC } from "react";
import ImageFilter from "./ImageFilter";
import CropImageCarousel from "./CropImageCarousel";
import FilterImageCarousel from "./FilterImageCarousel";
const PostImageEditor: FC<{
  files: File[];
  currentEditPage: number;
  croppedImages:HTMLCanvasElement[],
  filteredImages:string[]
  setCroppedImages:(img:any)=>void
  setFilteredImages:(filtered:any)=>void
}> = ({ files, currentEditPage,croppedImages,filteredImages,setCroppedImages,setFilteredImages }) => {


  return (
    <div className="flex-1 flex items-center justify-center relative">
      {currentEditPage === 0 && (
        <CropImageCarousel setCroppedImages={setCroppedImages} files={files} />
      )}
      {currentEditPage === 1 && (
        <FilterImageCarousel
          canvasImages={croppedImages}
          filterImages={filteredImages}
          setFilteredImages={setFilteredImages}
        />
      )}
    </div>
  );
};

export default PostImageEditor;

//Test componets
// <div className="w-[300px] h-[300px] fixed right-0 left-0 bg-white">
// {newFile && (
//   <img className="w-full h-full" src={newFile} alt="imgage" />
// )}
// </div>
// <div className="w-[300px] h-[300px] fixed right-0 top-0 bg-white">
// <button
//   onClick={() => {
//     const canvas = editCanvasColor("blur(4px)");
//     saveChanges(canvas);
//   }}
// >
//   Edit
// </button>
// <button
//   onClick={() => {
//     const canvas = editCanvasColor("blur(0px)");
//     saveChanges(canvas);
//   }}
// >
//   Edit
// </button>
// <button
//   onClick={() => {
//     const canvas = editCanvasColor(
//       "contrast(1.4) sepia(1) drop-shadow(-9px 9px 3px #e81)"
//     );
//     saveChanges(canvas);
//   }}
// >
//   Edit
// </button>
// </div>

import { FC } from "react";
import CropImagePage from "./CropImagePage";
import FilterImagePage from "./FilterImagePage";
const PostImageEditor: FC<{
  currentEditPage: number;
}> = ({ currentEditPage }) => {
  return (
    <div className="flex-1 flex items-center justify-center relative">
      {currentEditPage === 0 && <CropImagePage />}
      {currentEditPage === 1 && <FilterImagePage />}
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

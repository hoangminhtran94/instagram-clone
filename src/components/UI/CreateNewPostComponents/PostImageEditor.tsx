import { useMemo, useState } from "react";
import { FC } from "react";
import AvatarEditor from "react-avatar-editor";
import { useRef } from "react";
import CropImageCarousel from "./CropImageCarousel";

const PostImageEditor: FC<{ files: File[] }> = ({ files }) => {
  const ref = useRef<AvatarEditor>(null);
  const images = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files]
  );

  const [newFile, setNewFile] = useState<string>("");
  const [filter, setFilter] = useState("");

  function editCanvasColor(filter: string) {
    const canvas = document.getElementsByClassName(
      "this-canvas"
    )[0] as unknown as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");
    setFilter(filter);

    if (ctx && canvas) {
      ctx.filter = filter;
    }
    return canvas;
  }
  const saveChanges = async (canvas: HTMLCanvasElement) => {
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas?.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });

    if (blob) {
      setNewFile(canvas.toDataURL());
    }
  };
  return (
    <div className="flex-1 flex items-center justify-center relative">
      <CropImageCarousel files={files} />
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

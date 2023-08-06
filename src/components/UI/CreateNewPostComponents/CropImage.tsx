import { useMemo, useState } from "react";
import { FC } from "react";
import AvatarEditor from "react-avatar-editor";

const CropImage: FC<{ file: File; index: number }> = ({ file, index }) => {
  const image = useMemo(() => URL.createObjectURL(file), [file]);
  //Base64 img url
  const [croppedImage, setCroppedImage] = useState<string>("");

  function getCroppedCanvasImage() {
    const canvas = document.getElementsByClassName(
      `editing-canvas-${index}`
    )[0] as unknown as HTMLCanvasElement;
    setCroppedImage(canvas.toDataURL());
  }
  return (
    <AvatarEditor
      onMouseUp={() => getCroppedCanvasImage()}
      width={500}
      height={500}
      image={image}
      className={`editing-canvas-${index} !w-full !h-full`}
      border={0}
      color={[255, 255, 255, 0.6]} // RGBA
      scale={1}
      rotate={0}
    />
  );
};

export default CropImage;

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

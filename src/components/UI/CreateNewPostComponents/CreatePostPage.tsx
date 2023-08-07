import { FC, useState } from "react";

import PostImage from "./PostImage";
import { useCreatePostContext } from "@/context/createPostContext";
import CreatePostSideBar from "./CreatePostSideBar";
const CreatePostPage: FC = () => {
  const { filteredImages } = useCreatePostContext();
  const [currentImage, setCurrentImage] = useState(0);
  const disableNavigation = filteredImages.length === 1;
  const nextHandler = () => {
    setCurrentImage((prev) => {
      if (prev === filteredImages.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };
  const prevHandler = () => {
    setCurrentImage((prev) => {
      if (prev === 0) {
        return filteredImages.length - 1;
      }
      return prev - 1;
    });
  };
  return (
    <div className="w-full flex-1 flex">
      <div className="w-full flex-1  ">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className={` h-full w-full ${currentImage !== index && "hidden"}`}
          >
            <PostImage
              disableNavigation={disableNavigation}
              onNext={nextHandler}
              onPrevious={prevHandler}
              postImage={image}
            />
          </div>
        ))}
      </div>
      <CreatePostSideBar />
    </div>
  );
};

export default CreatePostPage;

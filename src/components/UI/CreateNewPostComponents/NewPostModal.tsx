"use client";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import NewPostFileUpload from "./NewPostFileUpload";
import PostImageEditor from "./PostImageEditor";
import { FC, MouseEventHandler } from "react";
import NewPostModalHeader from "./NewPostModalHeader";
import { useGlobalModalContext } from "@/context/globalModalContext";
import CancelNewPostModal from "./CancelNewPostModal";
interface CreateNewPostModalProps {
  onCancel: MouseEventHandler;
}
const NewPostModal: FC<CreateNewPostModalProps> = ({ onCancel }) => {
  const globalModalContext = useGlobalModalContext();

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [currentEditPage, setCurrentEditPage] = useState(0);
  const [croppedImages, setCroppedImages] = useState<HTMLCanvasElement[]>([]);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);

  useEffect(() => {
    setCroppedImages(new Array(imageFiles.length));
    setFilteredImages(new Array(imageFiles.length));
  }, [imageFiles]);

  const noImage = imageFiles.length === 0;
  const croppingImage = !noImage && currentEditPage === 0;
  const editingImage = !noImage && currentEditPage === 1;
  const creatingPost = currentEditPage === 2;

  const nextPageHandler = () => {
    setCurrentEditPage((prev) => prev + 1);
  };
  const cancelCreationHandler = (discardAction: () => void) => {
    globalModalContext.toggleModal({
      body: (
        <CancelNewPostModal
          onCancel={() => {
            globalModalContext.closeModal();
          }}
          onDiscard={() => {
            discardAction();
            globalModalContext.closeModal();
          }}
        />
      ),
      className: "rounded-lg",
      onCancel: () => {
        globalModalContext.closeModal();
      },
    });
  };
  const previousPageHandler = () => {
    if (currentEditPage === 0) {
      return cancelCreationHandler(() => {
        setImageFiles([]);
      });
    }
    setCurrentEditPage((prev) => prev - 1);
  };
  return (
    <Modal
      className="rounded-xl flex overflow-hidden"
      onCancel={(e) => {
        if (croppingImage || editingImage) {
          return cancelCreationHandler(() => {
            onCancel(e);
          });
        }
      }}
    >
      <div
        className={`${
          currentEditPage === 1 && imageFiles.length > 0
            ? "w-[1100px] pb-[calc(100%-300px)] "
            : "w-[800px] pb-[100%] "
        } relative`}
      >
        <div className=" absolute top-0 right-0 w-full h-full flex flex-col">
          <NewPostModalHeader
            noImage={noImage}
            croppingImage={croppingImage}
            editingImage={editingImage}
            onNextPage={nextPageHandler}
            onPreviousPage={previousPageHandler}
          />
          {noImage && <NewPostFileUpload setImageFiles={setImageFiles} />}
          {(croppingImage || editingImage) && (
            <PostImageEditor
              setCroppedImages={setCroppedImages}
              setFilteredImages={setFilteredImages}
              croppedImages={croppedImages}
              filteredImages={filteredImages}
              files={imageFiles}
              currentEditPage={currentEditPage}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default NewPostModal;

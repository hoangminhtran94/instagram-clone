"use client";
import Modal from "../Modal/Modal";
import { useState } from "react";
import NewPostFileUpload from "./NewPostFileUpload";
import PostImageEditor from "./PostImageEditor";
import { FC, MouseEventHandler } from "react";
import NewPostHeader from "./NewPostHeader";
import { useGlobalModalContext } from "@/context/globalModalContext";
import CancelNewPostModal from "./CancelNewPostModal";
import { useCreatePostContext } from "./../../../context/createPostContext";
import CreatePostPage from "./CreatePostPage";
interface CreateNewPostModalProps {
  onCancel: MouseEventHandler;
}
const NewPostModal: FC<CreateNewPostModalProps> = ({ onCancel }) => {
  const globalModalContext = useGlobalModalContext();
  const [currentEditPage, setCurrentEditPage] = useState(0);
  const { imageFiles, setImageFiles, saveCroppedImages } =
    useCreatePostContext();

  const noImage = imageFiles.length === 0;
  const croppingImage = !noImage && currentEditPage === 0;
  const editingImage = !noImage && currentEditPage === 1;
  const creatingPost = !noImage && currentEditPage === 2;

  const nextPageHandler = () => {
    if (croppingImage) {
      saveCroppedImages();
    }
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
          editingImage || creatingPost
            ? "w-[1100px] pb-[calc(100%-300px)] "
            : "w-[800px] pb-[100%] "
        } relative`}
      >
        <div className=" absolute top-0 right-0 w-full h-full flex flex-col">
          <NewPostHeader
            noImage={noImage}
            creatingPost={creatingPost}
            croppingImage={croppingImage}
            editingImage={editingImage}
            onNextPage={nextPageHandler}
            onPreviousPage={previousPageHandler}
          />
          {noImage && <NewPostFileUpload />}
          {(croppingImage || editingImage) && (
            <PostImageEditor currentEditPage={currentEditPage} />
          )}
          {creatingPost && <CreatePostPage />}
        </div>
      </div>
    </Modal>
  );
};

export default NewPostModal;

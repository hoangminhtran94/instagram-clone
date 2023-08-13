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
import { v4 } from "uuid";
import LoadingPage from "./LoadingPage";
import { useRootContext } from "@/context/RootContext";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
  "image/bmp": "bmp",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/tiff": "tif",
};
interface CreateNewPostModalProps {
  onCancel: MouseEventHandler;
}
const NewPostModal: FC<CreateNewPostModalProps> = ({ onCancel }) => {
  const globalModalContext = useGlobalModalContext();
  const [currentEditPage, setCurrentEditPage] = useState(0);
  const [uploading, setUploading] = useState(false);
  const {
    imageFiles,
    setImageFiles,
    saveCroppedImages,
    filteredImages,
    caption,
  } = useCreatePostContext();
  const { addNewPost } = useRootContext();

  const noImage = imageFiles.length === 0;
  const croppingImage = !noImage && currentEditPage === 0;
  const editingImage = !noImage && currentEditPage === 1;
  const creatingPost = !noImage && currentEditPage === 2;
  const loadingPage = !noImage && currentEditPage === 3;

  const nextPageHandler = async () => {
    if (!loadingPage) {
      setCurrentEditPage((prev) => prev + 1);
    }

    if (croppingImage) {
      saveCroppedImages();
    }
    if (creatingPost) {
      setUploading(true);
      try {
        const promises: Promise<Blob>[] = [];
        filteredImages.forEach((img) =>
          promises.push(fetch(img.img).then((res) => res.blob()))
        );
        const blobs = await Promise.all(promises);
        const formData = new FormData();
        blobs.forEach((blob, index) => {
          const filename = `${v4()}.${MIME_TYPES[blob.type as "image/png"]}`;
          formData.append("postImages", blob, filename);
          formData.append(
            "postImageData",
            JSON.stringify({ alt: filteredImages[index].alt, filename })
          );
        });

        formData.append("caption", caption);
        const res = await fetch("/api/post", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const newPost = await res.json();
          addNewPost(newPost);
        }

        setUploading(false);
      } catch (error) {
        console.log(error);
      }
    }
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
        onCancel(e);
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
            uploading={uploading}
            creatingPost={creatingPost}
            croppingImage={croppingImage}
            editingImage={editingImage}
            onNextPage={nextPageHandler}
            loadingPage={loadingPage}
            onPreviousPage={previousPageHandler}
          />
          {noImage && <NewPostFileUpload />}
          {(croppingImage || editingImage) && (
            <PostImageEditor currentEditPage={currentEditPage} />
          )}
          {creatingPost && <CreatePostPage />}
          {loadingPage && <LoadingPage uploading={uploading} />}
        </div>
      </div>
    </Modal>
  );
};

export default NewPostModal;

"use client";
import Modal from "../Modal/Modal";
import { useState } from "react";
import PostFirstPage from "./PostFirstPage";
import PostImageEditor from "./PostImageEditor";
import { FC, MouseEventHandler } from "react";
import ImageFilterSidebar from "./ImageFilterSidebar";
interface CreateNewPostModalProps {
  onCancel: MouseEventHandler;
}
const CreateNewPostModal: FC<CreateNewPostModalProps> = ({ onCancel }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [currentEditPage, setCurrentEditPage] = useState(0);
  const sendPost = async () => {};

  return (
    <Modal
      className="rounded-xl flex overflow-hidden "
      width={"auto"}
      height="auto"
      onCancel={onCancel}
    >
      <div
        className={`${
          currentEditPage === 1 && imageFiles.length > 0
            ? "w-[1000px] pb-[calc(100%-200px)] "
            : "w-[800px] pb-[100%] "
        } relative`}
      >
        <div className=" absolute top-0 right-0 w-full h-full flex flex-col">
          {imageFiles.length === 0 && (
            <div className="text-center p-3 border-b border-b-slate-200 text-sm font-semibold">
              Create new post
            </div>
          )}
          {imageFiles.length > 0 && (
            <div className="text-center relative p-3 border-b  border-b-slate-200 text-sm font-semibold">
              {currentEditPage === 0 && "Crop"}
              {currentEditPage === 1 && "Edit"}
              <button
                className="absolute left-3"
                onClick={() => {
                  setCurrentEditPage((prev) => prev - 1);
                }}
              >
                <svg
                  aria-label="Back"
                  color="rgb(0, 0, 0)"
                  fill="rgb(0, 0, 0)"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Back</title>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="2.909"
                    x2="22.001"
                    y1="12.004"
                    y2="12.004"
                  ></line>
                  <polyline
                    fill="none"
                    points="9.276 4.726 2.001 12.004 9.276 19.274"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></polyline>
                </svg>
              </button>
              <button
                className="absolute right-3"
                onClick={() => {
                  setCurrentEditPage((prev) => prev + 1);
                }}
              >
                Next
              </button>
            </div>
          )}
          {imageFiles.length === 0 && (
            <PostFirstPage
              onChange={(e) => {
                const filelist = e.target.files;
                const files: File[] = [];
                if (filelist) {
                  for (let i = 0; i < filelist.length; i++) {
                    const file = filelist.item(i);
                    if (file) {
                      files.push(file);
                    }
                  }
                  setImageFiles(files);
                }
              }}
            />
          )}
          {imageFiles.length > 0 && (
            <PostImageEditor
              files={imageFiles}
              currentEditPage={currentEditPage}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateNewPostModal;

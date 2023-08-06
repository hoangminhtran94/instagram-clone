"use client";
import Modal from "../Modal/Modal";
import { useState } from "react";
import PostFirstPage from "./PostFirstPage";
import PostImageEditor from "./PostImageEditor";
import { FC, MouseEventHandler } from "react";
interface CreateNewPostModalProps {
  onCancel: MouseEventHandler;
}
const CreateNewPostModal: FC<CreateNewPostModalProps> = ({ onCancel }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const sendPost = async () => {};

  return (
    <Modal
      className="rounded-xl"
      width="35vw"
      height="auto"
      onCancel={onCancel}
    >
      <div className="w-full pb-[100%] relative">
        <div className=" absolute top-0 right-0 w-full h-full flex flex-col">
          <div className="text-center p-3 border-b border-b-slate-200 text-sm font-semibold">
            Create new post
          </div>
          {currentPage === 0 && (
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
                  setCurrentPage(1);
                }
              }}
            />
          )}
          {currentPage === 1 && <PostImageEditor files={imageFiles} />}
        </div>
      </div>
    </Modal>
  );
};

export default CreateNewPostModal;

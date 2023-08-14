"use client";
import Link from "next/link";
import { useState, useEffect, useRef, FC } from "react";
import EmojiPicker from "emoji-picker-react";
import { Comment } from "@prisma/client";
const PostComment: FC<{
  comments:
    | Comment[]
    | {
        message: string;
        createdAt: Date;
        owner: {
          currentProfileImage: string;
          username: string;
        };
      }[];
}> = ({ comments }) => {
  const [value, setValue] = useState("");
  const [toggleEmoji, setToggleEmoji] = useState(false);

  return (
    <div className="flex flex-col gap-3 py-1 text-sm">
      <Link href="#">
        {comments.length === 0 ? "No comments" : "View all 10 comments"}
      </Link>
      <div className="flex ">
        <textarea
          value={value}
          className="flex-1 resize-none outline-none"
          placeholder="Add a comment..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <div className="flex h-fit items-center">
          <button className={`px-3 ${!value && "hidden"}`}>Post</button>
          <div className="px-2 cursor-pointer relative">
            <svg
              onClick={() => {
                setToggleEmoji((prev) => !prev);
              }}
              aria-label="Emoji"
              color="rgb(115, 115, 115)"
              fill="rgb(115, 115, 115)"
              height="13"
              role="img"
              viewBox="0 0 24 24"
              width="13"
            >
              <title>Emoji</title>
              <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
            </svg>
            {toggleEmoji && (
              <div className="absolute bottom-full left-[110%] bg-white z-10">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setValue((prev) => prev + e.emoji);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComment;

"use client";
import Link from "next/link";
import { useState, FC, useRef } from "react";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { addNewComment } from "@/actions/action";
import { PostComment } from "@/models/post.models";
import Comment from "../PostDetailsComponents/PostComment";
const PostComment: FC<{
  commentCount: number;
  postId: string;
}> = ({ commentCount, postId }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [comment, setComment] = useState<PostComment | null>(null);

  return (
    <div className="flex flex-col gap-3 py-1 text-sm">
      <Link href={`p/${postId}`}>
        {commentCount === 0
          ? "No comments"
          : `View all ${commentCount} comments`}
      </Link>
      {comment && <Comment comment={comment} />}
      <form
        className="flex"
        action={async (e) => {
          try {
            const res = (await addNewComment({
              message: input,
              postId,
            })) as PostComment;
            if (res) {
              setComment((prev) => res);
            }
          } catch (error) {
            console.log(error);
          }
          setInput("");
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          className="flex-1 resize-none outline-none"
          placeholder="Add a comment..."
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div className="flex h-[20px] items-center">
          <button
            className={`text-[#1da1f2] hover:text-[#85d0ff] text-sm font-semibold ${
              !input && "hidden"
            }`}
          >
            Post
          </button>
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
                  searchDisabled
                  skinTonesDisabled
                  emojiStyle={EmojiStyle.NATIVE}
                  previewConfig={{ showPreview: false }}
                  onEmojiClick={(e) => {
                    inputRef.current?.focus();
                    setInput((prev) => prev + e.emoji);
                    setToggleEmoji(false);
                  }}
                  width={300}
                  height={300}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostComment;

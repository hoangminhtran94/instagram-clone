import useClickOutside from "@/hooks/useClickoutside";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useRef, useState } from "react";

const PostDetailsCommentInput = () => {
  const emojiRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [toggleEmoji, setToggleEmoji] = useState(false);

  useClickOutside(emojiRef, () => {
    setToggleEmoji(false);
  });
  return (
    <div className="flex px-4 py-3 items-center gap-4 w-full border-t">
      <div ref={emojiRef} className=" relative">
        <svg
          className="cursor-pointer"
          onClick={() => {
            setToggleEmoji((prev) => !prev);
          }}
          aria-label="Emoji"
          color="rgb(0, 0, 0)"
          fill="rgb(0, 0, 0)"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Emoji</title>
          <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
        </svg>
        {toggleEmoji === true && (
          <div className="absolute bottom-[120%] left-0 z-10">
            <EmojiPicker
              searchDisabled
              skinTonesDisabled
              emojiStyle={EmojiStyle.NATIVE}
              previewConfig={{ showPreview: false }}
              onEmojiClick={(e) => {
                inputRef.current?.focus();
                setToggleEmoji(false);
              }}
              width={300}
              height={300}
            />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        className="flex-1 outline-none text-xs h-[24px]"
        placeholder="Add a comment.."
      />
    </div>
  );
};

export default PostDetailsCommentInput;

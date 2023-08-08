import Image from "next/image";
import { FC } from "react";
import { useState } from "react";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import useClickOutside from "@/hooks/useClickoutside";
import { useAuthContext } from "@/context/authContext";
import { useCreatePostContext } from "@/context/createPostContext";
import { useRef } from "react";
const CreatePostSideBar: FC<{}> = ({}) => {
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [toggleAccessibility, setToggleAccessibility] = useState(false);
  const [toggleAdvancedSettings, setToggleAdvancedSettings] = useState(false);
  const {
    setFilteredImages,
    filteredImages,
    setHideLikeView,
    setTurnOffComment,
    hideLikeView,
    turnOffComment,
    setCaption,
    caption,
  } = useCreatePostContext();
  const { user } = useAuthContext();
  const textBoxRef = useRef<HTMLTextAreaElement>(null);
  const [enteredCaption, setEnteredCaption] = useState(caption);
  const emojiRef = useRef<HTMLDivElement>(null);
  useClickOutside(emojiRef, () => {
    setToggleEmoji(false);
  });
  return (
    <div
      className="flex-1 
     max-h-[755px] overflow-y-scroll flex flex-col text-sm"
    >
      <div className="py-3">
        <div className="px-4 flex gap-3 items-center font-semibold text-sm">
          <div className="w-[28px] h-[28px]">
            <Image
              width={44}
              height={44}
              alt={user?.username ?? "Not available"}
              className="w-full h-full object-contain"
              src={
                user?.currentProfileImage
                  ? user?.currentProfileImage
                  : "/images/default-avatar.jpg"
              }
            />
          </div>
          {user?.username}
        </div>
      </div>

      <div className="">
        <textarea
          ref={textBoxRef}
          value={enteredCaption}
          onChange={(e) => {
            setEnteredCaption(e.target.value);
          }}
          onBlur={(e) => {
            setCaption(e.target.value);
          }}
          rows={10}
          maxLength={2200}
          className="resize-none w-full outline-none placeholder:font-light px-4"
          placeholder="Write a caption..."
        />
      </div>
      <div className="flex justify-between items-center py-3 px-4 border-b text-xs">
        <div ref={emojiRef} className="relative">
          <svg
            onClick={() => {
              setToggleEmoji((prev) => !prev);
            }}
            className="cursor-pointer"
            aria-label="Emoji"
            color="rgb(115, 115, 115)"
            fill="rgb(115, 115, 115)"
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
          >
            <title>Emoji</title>
            <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
          </svg>
          {toggleEmoji && (
            <div className="absolute top-[110%] left-1/2 z-10">
              <EmojiPicker
                searchDisabled
                skinTonesDisabled
                emojiStyle={EmojiStyle.NATIVE}
                previewConfig={{ showPreview: false }}
                onEmojiClick={(e) => {
                  setEnteredCaption((prev) => prev + e.emoji);
                  textBoxRef.current?.focus();
                  setToggleEmoji(false);
                }}
                width={300}
                height={300}
              />
            </div>
          )}
        </div>
        <p className="opacity-40">{caption.length}/2200</p>
      </div>

      <div className="border-b">
        <input
          className="px-4 py-3 w-full outline-none placeholder:font-light"
          placeholder="Location"
        />
      </div>
      <div className="px-4 py-3 border-b">
        <div
          className="flex justify-between select-none cursor-pointer"
          onClick={() => {
            setToggleAccessibility((prev) => !prev);
          }}
        >
          Accessibility
          <span className={toggleAccessibility ? "" : "rotate-180"}>
            <svg
              aria-label="Down chevron icon"
              color="rgb(0, 0, 0)"
              fill="rgb(0, 0, 0)"
              height="16"
              role="img"
              viewBox="0 0 24 24"
              width="16"
            >
              <title>Down chevron icon</title>
              <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
            </svg>
          </span>
        </div>
        {toggleAccessibility && (
          <div className="py-3 flex-col gap-2 flex">
            <p className="text-xs opacity-60">
              Alt text describes your photos for people with visual impairments.
              Alt text will be automatically created for your photos or you can
              choose to write your own.
            </p>
            <div className="flex flex-col gap-2">
              {filteredImages.map((image, index) => (
                <div className="flex gap-2" key={Math.random()}>
                  <div className="w-[44px] h-[44px] overflow-hidden">
                    {" "}
                    <Image
                      src={image.img}
                      width={44}
                      height={44}
                      alt={`image${index}`}
                    />{" "}
                  </div>
                  <input
                    className="flex-1 border border-slate-200 focus:border-slate-400  rounded-md p-2 outline-none placeholder:font-light"
                    placeholder="Write alt text..."
                    defaultValue={image.alt}
                    onBlur={(e) => {
                      setFilteredImages((prev) => {
                        const copied = [...prev];
                        copied[index].alt = e.target.value;
                        return copied;
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="px-4 py-3">
        <div
          className="flex justify-between select-none cursor-pointer"
          onClick={() => {
            setToggleAdvancedSettings((prev) => !prev);
          }}
        >
          Advanced settings
          <span className={toggleAdvancedSettings ? "" : "rotate-180"}>
            <svg
              aria-label="Down chevron icon"
              color="rgb(0, 0, 0)"
              fill="rgb(0, 0, 0)"
              height="16"
              role="img"
              viewBox="0 0 24 24"
              width="16"
            >
              <title>Down chevron icon</title>
              <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
            </svg>
          </span>
        </div>
        {toggleAdvancedSettings && (
          <div className="py-3 flex-col gap-2 flex">
            <div className="flex flex-col gap-2">
              <div>
                <label className="relative flex justify-between items-center mb-5 cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    defaultChecked={hideLikeView}
                    onChange={(e) => {
                      setHideLikeView(e.target.checked);
                    }}
                    className="sr-only peer"
                  />
                  <span className="mr-3 text-base font-light text-gray-900 dark:text-gray-300">
                    Hide like and view counts on this post
                  </span>
                  <div className="w-11 min-w-[2.75rem] h-6 relative bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                <p className=" text-xs  opacity-60">
                  {`Only you will see the total number of likes and views on this post. You can change this later by going to the ··· menu at the top of the post. To hide like counts on other people's posts, go to your account settings.`}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label className="relative flex justify-between items-center mb-5 cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    defaultChecked={turnOffComment}
                    onChange={(e) => {
                      setTurnOffComment(e.target.checked);
                    }}
                  />
                  <span className="mr-3 text-base font-light text-gray-900 dark:text-gray-300">
                    Turn off commenting
                  </span>
                  <div className="w-11 min-w-[2.75rem] h-6 relative bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                <p className=" text-xs  opacity-60">
                  {`You can change this later by going to the ··· menu at the top of your post.`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostSideBar;

import OptionBox, { OptionButton } from "@/components/UI/OptionBox/OptionBox";
import { useAuthContext } from "@/context/authContext";
import { FC, useRef, useState } from "react";
import { useGlobalModalContext } from "@/context/globalModalContext";
import Image from "next/image";
import { changeProfileImage } from "@/actions/action";
import { NextResponse } from "next/server";
const ChangePhotoOptionsBox: FC<{}> = () => {
  const authContext = useAuthContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const modalContext = useGlobalModalContext();
  const formRef = useRef<HTMLFormElement>(null);
  const CHANGE_PHOTO_OPTIONS: OptionButton[] = [
    {
      label: "Upload Photo",
      textBlue: true,
      action: (e) => {
        inputRef.current?.click();
      },
    },
    {
      label: "Manage sync settings",
      action: (e) => {},
    },
    {
      label: "Remove Current Photo",
      textRed: true,
      action: (e) => {},
    },
  ];
  const CONFIRM_OPTIONS: OptionButton[] = [
    {
      label: "OK",
      textBlue: true,
      action: (e) => {
        formRef.current?.requestSubmit();
      },
    },
  ];
  const topContent = !file ? (
    <div className="flex flex-col items-center py-5 ">
      <div className=" w-14 h-14 ">
        <Image
          width={56}
          height={56}
          className="w-full h-full rounded-full object-cover"
          alt="profile-image"
          src={
            authContext.user?.currentProfileImage
              ? authContext.user?.currentProfileImage
              : "/images/default-avatar.jpg"
          }
        />
      </div>
      <div className="text-lg mt-2">Synced profile photo</div>
      <div className="text-xs">Instaclone</div>
    </div>
  ) : (
    <div className="flex flex-col items-center py-5 px-8 ">
      <div className="text-lg text-center">
        {`Your profile picture for ${authContext.user?.fullName} will be updated on
        Instaclone.`}
      </div>
      <div className="text-xs mt-2 text-center">Do you want to proceed?</div>
    </div>
  );
  return (
    <OptionBox
      buttons={!file ? CHANGE_PHOTO_OPTIONS : CONFIRM_OPTIONS}
      onCancel={() => {
        modalContext.closeModal();
      }}
    >
      <>
        <form
          action={async (formData) => {
            const data = await changeProfileImage(formData);
            if (data.currentProfileImage) {
              authContext.setUser((prev) => {
                if (prev) {
                  return {
                    ...prev,
                    currentProfileImage: data.currentProfileImage,
                  };
                }
                return prev;
              });
            }
          }}
          ref={formRef}
          className="hidden"
        >
          <input
            ref={inputRef}
            name="profile-image"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
            multiple={false}
            accept=".jpg,.jpeg,.png,.avif,.webp"
            className="hidden"
          />
        </form>
        {topContent}
      </>
    </OptionBox>
  );
};

export default ChangePhotoOptionsBox;

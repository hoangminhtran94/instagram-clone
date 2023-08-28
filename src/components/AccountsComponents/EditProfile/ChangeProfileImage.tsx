"use client";
import Image from "next/image";
import { useAuthContext } from "@/context/authContext";
const ChangeProfileImage = () => {
  const authContext = useAuthContext();

  return (
    <div className="grid grid-cols-4  gap-7 text-sm mt-10">
      <div className="flex col-span-1 justify-end">
        <div className=" w-[38px] h-[38px]">
          <Image
            width={80}
            height={80}
            className="rounded-full"
            alt="Profile-image"
            src={
              authContext.user?.currentProfileImage
                ? authContext.user?.currentProfileImage
                : "/images/default-avatar.jpg"
            }
          />
        </div>
      </div>
      <div className="col-span-3 flex flex-col  ">
        <div>{authContext.user?.username}</div>
        <div>
          <button>Change profile photo</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfileImage;

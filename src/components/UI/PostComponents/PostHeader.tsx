import { User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { timeAgoOrDayAgo } from "@/lib/timeCalculation";
const PostHeader: FC<{ creator: User; createdDate: Date }> = ({
  creator,
  createdDate,
}) => {
  return (
    <div className="flex justify-between items-center px-2 py-3 text-xs">
      <div className="flex items-center gap-2">
        <div>
          <Image
            width={44}
            height={44}
            src={
              creator.currentProfileImage
                ? creator.currentProfileImage
                : "/images/default-avatar.jpg"
            }
            alt="profile-image"
            className=" w-8 h-8 rounded-full object-cover bg-center"
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <p className="font-bold">{creator.username}</p>
              <svg
                aria-label="Verified"
                color="rgb(0, 149, 246)"
                fill="rgb(0, 149, 246)"
                height="12"
                role="img"
                viewBox="0 0 40 40"
                width="12"
              >
                <title>Verified</title>
                <path
                  d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span>•</span>
              <span>{timeAgoOrDayAgo(createdDate)}</span>
            </div>
            <p className="">{creator.fullName}</p>
          </div>
        </div>
      </div>
      <div>
        <svg
          aria-label="More options"
          color="rgb(0, 0, 0)"
          fill="rgb(0, 0, 0)"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="6" cy="12" r="1.5"></circle>
          <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
      </div>
    </div>
  );
};
export default PostHeader;

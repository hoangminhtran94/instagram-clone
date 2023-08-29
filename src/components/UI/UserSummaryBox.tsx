import { UserSummary } from "../../models/user.models";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { forwardRef } from "react";
import { useAuthContext } from "@/context/authContext";

interface UserSummaryBoxProps {
  className?: string;
  hovering: boolean;
  user: UserSummary;
}

const UserSummaryBox = forwardRef<HTMLDivElement, UserSummaryBoxProps>(
  ({ className, hovering, user }, ref) => {
    const { user: loginUser } = useAuthContext();
    return (
      <AnimatePresence>
        {hovering && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-[calc(100%+10px)] py-4 drop-shadow-2xl flex flex-col gap-4 rounded-md bg-white  w-[360px] min-h-[300px] z-50"
          >
            <div className="flex px-4 items-center gap-4">
              <div className=" w-[60px] h-[60px]">
                <Image
                  src={
                    user.currentProfileImage
                      ? user.currentProfileImage
                      : "/images/default-avatar.jpg"
                  }
                  alt="profile-picture"
                  width={120}
                  height={120}
                  className="w-full h-full rounded-full"
                />
              </div>
              <div>
                <p className="text-xs font-semibold">{user.username} </p>
                <p className="text-xs">{user.fullName} </p>
              </div>
            </div>
            <div className=" px-8 flex justify-between">
              <div className="flex flex-col items-center">
                <div className="text-sm font-bold">{user._count.posts}</div>
                <div className="text-xs">posts</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-sm font-bold">{user._count.followers}</div>
                <div className="text-xs">followers</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-sm font-bold">{user._count.following}</div>
                <div className="text-xs">following</div>
              </div>
            </div>
            <div className=" h-[120px] grid grid-cols-3">
              {user.posts.map((post, index) => (
                <div key={index} className=" h-full w-full aspect-square">
                  <Image
                    alt={`profile-post-${index}`}
                    src={post.images[0].src}
                    width={800}
                    height={800}
                  />
                </div>
              ))}
            </div>
            <div className="px-4">
              {loginUser?.id === user.id ? (
                <button className="btn-grey w-full flex justify-center ">
                  Edit profile
                </button>
              ) : (
                <button className="btn-primary-light w-full flex gap-2">
                  <svg
                    aria-label=""
                    color="rgb(255, 255, 255)"
                    fill="rgb(255, 255, 255)"
                    height="20"
                    role="img"
                    viewBox="0 0 24 24"
                    width="20"
                  >
                    <title></title>
                    <path
                      d="M19.006 8.252a3.5 3.5 0 1 1-3.499-3.5 3.5 3.5 0 0 1 3.5 3.5Z"
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M22 19.5v-.447a4.05 4.05 0 0 0-4.05-4.049h-4.906a4.05 4.05 0 0 0-4.049 4.049v.447"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                      x1="5.001"
                      x2="5.001"
                      y1="7.998"
                      y2="14.003"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                      x1="8.004"
                      x2="2.003"
                      y1="11"
                      y2="11"
                    ></line>
                  </svg>
                  Follow
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
UserSummaryBox.displayName = "UserSummaryBox";

export default UserSummaryBox;

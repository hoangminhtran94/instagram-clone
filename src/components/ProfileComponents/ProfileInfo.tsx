import { UserProfile } from "@/models/user.models";
import { FC } from "react";
import OptionButtonWrapper from "../UI/OptionButtonWrapper";
import ProfileOptionsBox from "./ProfileOptionsBox";
import { useGlobalModalContext } from "@/context/globalModalContext";
import Link from "next/link";
const ProfileInfo: FC<{
  user: UserProfile;
}> = ({ user }) => {
  const globalModalContext = useGlobalModalContext();
  let profileButton;
  let optionIcon;
  if (user.yourProfile) {
    profileButton = (
      <Link href="/accounts/edit" className="btn-grey">
        Edit Profile
      </Link>
    );
    optionIcon = (
      <svg
        aria-label="Options"
        color="rgb(0, 0, 0)"
        fill="rgb(0, 0, 0)"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Options</title>
        <circle
          cx="12"
          cy="12"
          fill="none"
          r="8.635"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
        <path
          d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>
    );
  } else {
    optionIcon = (
      <svg
        aria-label="Options"
        color="rgb(0, 0, 0)"
        fill="rgb(0, 0, 0)"
        height="32"
        role="img"
        viewBox="0 0 24 24"
        width="32"
      >
        <title>Options</title>
        <circle cx="12" cy="12" r="1.5"></circle>
        <circle cx="6" cy="12" r="1.5"></circle>
        <circle cx="18" cy="12" r="1.5"></circle>
      </svg>
    );

    if (user.youAreFollower) {
      profileButton = <button className="btn-grey">Following</button>;
    } else {
      profileButton = <button className="btn-grey">Follow</button>;
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-5 items-center">
        <p className="text-lg-">{user.username}</p> {profileButton}
        <OptionButtonWrapper
          optionBox={
            <ProfileOptionsBox
              yourProfile={user.yourProfile}
              onCancel={() => {
                globalModalContext.closeModal();
              }}
            />
          }
        >
          {optionIcon}
        </OptionButtonWrapper>
      </div>
      <div className="flex gap-5 text-sm">
        <p>
          <strong>{user._count.posts}</strong> posts{" "}
        </p>
        <p>
          <strong>{user._count.followers}</strong> followers{" "}
        </p>
        <p>
          <strong>{user._count.following}</strong> followings{" "}
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold">{user.fullName}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;

"use client";
import Image from "next/image";
import { useState } from "react";
import ProfileNoContents from "@/components/UI/ProfileComponents/ProfileNoContents";
const Profile = () => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <div className="w-[calc(630px+319px)] mx-auto mt-4">
      <div className="flex gap-[80px] items-center justify-center p-10 ">
        <div className="w-[150px] h-[150px]">
          <Image
            width={300}
            height={300}
            alt="profile-picture"
            src={
              "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            }
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-5 items-center">
            <p className="text-lg-">hoangtran94</p>{" "}
            <button className="btn-grey">Edit Profile</button>
            <div>
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></circle>
                <path
                  d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex gap-5 text-sm">
            <p>
              <strong>0</strong> posts{" "}
            </p>
            <p>
              <strong>0</strong> followers{" "}
            </p>
            <p>
              <strong>2</strong> followings{" "}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Minh Hoang Tran</p>
            <p className="text-sm">Status</p>
          </div>
        </div>
      </div>
      <div className=" border-t">
        <div className="flex gap-10 justify-center">
          <button
            onClick={() => {
              setCurrentTab(0);
            }}
            className={`post-tab  ${currentTab === 0 && "active"}`}
          >
            <svg
              aria-label=""
              color="rgb(0, 0, 0)"
              fill="rgb(0, 0, 0)"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <rect
                fill="none"
                height="18"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                width="18"
                x="3"
                y="3"
              ></rect>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="9.015"
                x2="9.015"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="14.985"
                x2="14.985"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="21"
                x2="3"
                y1="9.015"
                y2="9.015"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="21"
                x2="3"
                y1="14.985"
                y2="14.985"
              ></line>
            </svg>
            POSTS
          </button>
          <button
            onClick={() => {
              setCurrentTab(1);
            }}
            className={`post-tab ${currentTab === 1 && "active"}`}
          >
            <svg
              aria-label=""
              color="rgb(115, 115, 115)"
              fill="rgb(115, 115, 115)"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <polygon
                fill="none"
                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></polygon>
            </svg>
            SAVED
          </button>
          <button
            onClick={() => {
              setCurrentTab(2);
            }}
            className={`post-tab ${currentTab === 2 && "active"}`}
          >
            <svg
              aria-label=""
              color="rgb(115, 115, 115)"
              fill="rgb(115, 115, 115)"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <path
                d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
              <path
                d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
              <circle
                cx="12.072"
                cy="11.075"
                fill="none"
                r="3.556"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></circle>
            </svg>
            TAGGED
          </button>
        </div>
        <div className="flex justify-center">
          {currentTab === 0 && (
            <ProfileNoContents
              src="/images/no-post.png"
              alt="no-post"
              header="Share Photos"
              body=" When you share photos, they will appear on your profile"
              action={() => {}}
              actionLabel="Share your first photo"
            />
          )}
          {currentTab === 1 && (
            <div className="flex flex-col w-full items-center">
              <div className="flex justify-between w-full">
                <p className="text-xs">{`Only you can see what you've saved`}</p>
                <button className="text-sm">+ New collection</button>
              </div>
              <ProfileNoContents
                src="/images/no-saved.png"
                alt="no-saved"
                header="Save"
                body="Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved."
              />
            </div>
          )}
          {currentTab === 2 && (
            <ProfileNoContents
              src="/images/no-tags.png"
              alt="no-tags"
              header="Photos of you"
              body="When people tag you in photos, they'll appear here."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

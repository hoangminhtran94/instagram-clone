"use client";

import { AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import SideBarDropdown from "./SideBarDropdown";
import CreatePostButton from "./CreatePostButton";
import SearchButton from "./SearchButton";
import { useState } from "react";
import { usePathname, useParams } from "next/navigation";
import ViewNotificationsButton from "./ViewNotificationsButton";
import HomeButton from "./HomeButton";
import ExploreButton from "./ExploreButton";
import ReelsButton from "./ReelsButton";
import ChatButton from "./ChatButton";
import SearchBox from "./SearchBox";
import NotificationBox from "./NotificationBox";
import ProfileButton from "./ProfileButton";
import { useAuthContext } from "@/context/authContext";
const SideBar = () => {
  const { user } = useAuthContext();
  const [searching, setSearching] = useState(false);
  const [viewNotifications, setViewNotifications] = useState(false);
  const path = usePathname();

  const secondaryMode = searching || viewNotifications;

  const toggleFirstMode = () => {
    setSearching(false);
    setViewNotifications(false);
  };
  return (
    <>
      <div
        className={` ${
          !secondaryMode ? "w-[350px]" : "w-fit items-center"
        } z-20  fixed box-border left-0 top-0 border-r bg-white border-slate-300 flex flex-col p-5 h-screen`}
      >
        <Logo secondaryMode={secondaryMode} />
        <div
          className={`flex z-5 flex-col gap-2 flex-1 ${
            secondaryMode && "items-center"
          }`}
        >
          <HomeButton
            secondaryMode={secondaryMode}
            onClick={secondaryMode ? toggleFirstMode : undefined}
            path={path}
          />
          <SearchButton
            secondaryMode={secondaryMode}
            active={searching}
            onClick={() => {
              setSearching(true);
              if (viewNotifications) {
                setViewNotifications(false);
              }
            }}
          />
          <ExploreButton
            secondaryMode={secondaryMode}
            onClick={secondaryMode ? toggleFirstMode : undefined}
            path={path}
          />
          <ReelsButton
            secondaryMode={secondaryMode}
            onClick={secondaryMode ? toggleFirstMode : undefined}
            path={path}
          />
          <ChatButton
            secondaryMode={secondaryMode}
            onClick={secondaryMode ? toggleFirstMode : undefined}
            path={path}
          />

          <ViewNotificationsButton
            secondaryMode={secondaryMode}
            onClick={() => {
              setViewNotifications(true);
              if (searching) {
                setSearching(false);
              }
            }}
            active={viewNotifications}
          />
          <CreatePostButton secondaryMode={secondaryMode} />
          {user && <ProfileButton
            user={user}
            path={path}
            secondaryMode={secondaryMode}
          />}
        </div>
        <SideBarDropdown secondaryMode={secondaryMode} />
      </div>
      <AnimatePresence mode="sync">
        {searching && <SearchBox key={"search"} />}
        {viewNotifications && <NotificationBox key={"notification"} />}
      </AnimatePresence>
    </>
  );
};

export default SideBar;

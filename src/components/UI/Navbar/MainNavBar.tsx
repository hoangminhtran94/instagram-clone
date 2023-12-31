"use client";

import { AnimatePresence } from "framer-motion";
import Logo from "./MainNavbarComponents/Logo";
import SideBarDropdown from "./MainNavbarComponents/SideBarDropdown";
import CreatePostButton from "./MainNavbarComponents/CreatePostButton";
import SearchButton from "./MainNavbarComponents/SearchButton";
import { useEffect, useRef, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import ViewNotificationsButton from "./MainNavbarComponents/ViewNotificationsButton";
import HomeButton from "./MainNavbarComponents/HomeButton";
import ExploreButton from "./MainNavbarComponents/ExploreButton";
import ReelsButton from "./MainNavbarComponents/ReelsButton";
import ChatButton from "./MainNavbarComponents/ChatButton";
import SearchBox from "./MainNavbarComponents/SearchBox";
import NotificationBox from "./MainNavbarComponents/NotificationBox";
import ProfileButton from "./MainNavbarComponents/ProfileButton";
import { useAuthContext } from "@/context/authContext";
import useClickOutside from "@/hooks/useClickoutside";

const MainNavBar = () => {
  const { user } = useAuthContext();
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const sideBarRef = useRef<HTMLDivElement>(null);
  useClickOutside([searchBoxRef, sideBarRef], () => {
    setSearching(false);
  });

  const [searching, setSearching] = useState(false);
  const [viewNotifications, setViewNotifications] = useState(false);
  const path = usePathname();
  useEffect(() => {
    if (path) {
      setSearching(false);
      setViewNotifications(false);
    }
  }, [path]);
  const secondaryMode = searching || viewNotifications;

  const toggleFirstMode = () => {
    setSearching(false);
    setViewNotifications(false);
  };
  return (
    <>
      <div
        ref={sideBarRef}
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
          {user && (
            <ProfileButton
              user={user}
              path={path}
              secondaryMode={secondaryMode}
            />
          )}
        </div>
        <SideBarDropdown secondaryMode={secondaryMode} />
      </div>
      <AnimatePresence mode="sync">
        {searching && <SearchBox ref={searchBoxRef} key={"search"} />}
        {viewNotifications && <NotificationBox key={"notification"} />}
      </AnimatePresence>
    </>
  );
};

export default MainNavBar;

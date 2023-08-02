"use client";
import SideBarItem from "./SideBarItem";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import SideBarDropdown from "./SideBarDropdown";
import CreatePostButton from "./CreatePostButton";
import SearchButton from "./SearchButton";
import { useState } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ViewNotificationsButton from "./ViewNotificationsButton";
import HomeButton from "./HomeButton";
import ExploreButton from "./ExploreButton";
import ReelsButton from "./ReelsButton";
import ChatButton from "./ChatButton";

const SideBar = () => {
  const [searching, setSearching] = useState(false);
  const [viewNotifications, setViewNotifications] = useState(false);
  const path = usePathname();
  const secondaryMode = searching || viewNotifications;
  const toggleFirstMode = () => {
    setSearching(false);
    setViewNotifications(false);
  };
  return (
    <div
      className={` ${
        !secondaryMode ? "w-[350px]" : "w-fit items-center"
      }  fixed box-border left-0 top-0 border-r border-slate-300 flex flex-col p-5 h-screen`}
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
        <SideBarItem
          image={{
            src: "https://images.unsplash.com/photo-1690151711465-2bfe4e69f241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80",
            alt: "profileImage",
          }}
          href="/#"
          path={path}
        >
          {!secondaryMode && "Profile"}
        </SideBarItem>
      </div>
      <SideBarDropdown secondaryMode={secondaryMode} />
      <AnimatePresence mode="sync">
        {searching && (
          <motion.div
            key={"search"}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -500, opacity: 0, z: -20 }}
            transition={{ duration: 0.3 }}
            className="-z-10 w-[400px] h-full top-0 absolute left-full bg-white shadow-right-lg border-l "
          ></motion.div>
        )}
        {viewNotifications && (
          <motion.div
            key={"view"}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -500, opacity: 0, z: -20 }}
            transition={{ duration: 0.3 }}
            className="-z-10 w-[500px] h-full top-0 absolute left-full bg-white shadow-right-lg border-l "
          ></motion.div>
        )}
      </AnimatePresence>
      {/* <AnimatePresence mode="wait">
        
      </AnimatePresence> */}
    </div>
  );
};

export default SideBar;

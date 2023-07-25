import SideBarItem from "./SideBarItem";
import Logo from "./Logo";
import SideBarDropdown from "./SideBarDropdown";

const SideBar = () => {
  return (
    <div className="w-[350px] fixed left-0 top-0 border-r border-slate-300 flex flex-col p-5 h-screen">
      <Logo />
      <div className="flex flex-col gap-2 flex-1">
        <SideBarItem href="/">Home</SideBarItem>
        <SideBarItem href="/search">Search</SideBarItem>
        <SideBarItem href="/explore">Explore</SideBarItem>
        <SideBarItem href="/reels">Reels</SideBarItem>
        <SideBarItem href="/direct/message">Messages</SideBarItem>
        <SideBarItem href="/notification">Notifications</SideBarItem>
        <SideBarItem href="/#">Create</SideBarItem>
        <SideBarItem href="/#">Profile</SideBarItem>
      </div>
      <SideBarDropdown />
    </div>
  );
};

export default SideBar;

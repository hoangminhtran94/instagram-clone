import SideBarItem from "./SideBarItem";
import Logo from "./Logo";
import SideBarDropdown from "./SideBarDropdown";

const SideBar = () => {
  return (
    <div className="w-[500px] border-r border-slate-300 flex flex-col p-5 h-screen">
      <Logo />
      <div className="flex flex-col gap-2 flex-1">
        <SideBarItem href="/">Home</SideBarItem>
        <SideBarItem href="/">Search</SideBarItem>
        <SideBarItem href="/">Explore</SideBarItem>
        <SideBarItem href="/">Reels</SideBarItem>
        <SideBarItem href="/">Messages</SideBarItem>
        <SideBarItem href="/">Notifications</SideBarItem>
        <SideBarItem href="/">Create</SideBarItem>
        <SideBarItem href="/">Profile</SideBarItem>
      </div>
      <SideBarDropdown />
    </div>
  );
};

export default SideBar;

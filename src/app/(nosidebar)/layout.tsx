import SideBar from "@/components/UI/SideBarComponents/Sidebar";

const NoSideBarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="w-screen min-h-screen flex items-center justify-center">
        {children}
      </main>
    </>
  );
};

export default NoSideBarLayout;

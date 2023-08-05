import SideBar from "@/components/UI/SideBarComponents/Sidebar";

const WithSideBarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideBar />
      <main className="mx-auto w-[calc(100vw-350px)] ml-[350px]">
        {children}
      </main>
    </>
  );
};

export default WithSideBarLayout;

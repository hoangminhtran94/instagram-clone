import SideBar from "@/components/SideBarComponents/Sidebar";
import { verifyToken } from "@/lib/verifytoken";

const WithSideBarLayout = async ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  await verifyToken({ redirectIf: "unauthenticated", path: "/accounts/login" });

  return (
    <>
      <SideBar />
      <main className="mx-auto w-[calc(100vw-350px)] ml-[350px]">
        {children}
      </main>
      {modal}
    </>
  );
};

export default WithSideBarLayout;

import SideBar from "@/components/UI/SideBarComponents/Sidebar";
import { verifyToken } from "@/lib/verifytoken";
const WithSideBarLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await verifyToken({ redirectIf: "unauthenticated", path: "/accounts/login" });
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

import MainFooter from "@/components/UI/Footer/MainFooter";
import MainNavBar from "@/components/UI/Navbar/MainNavBar";

const WithSideBarLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <MainNavBar />
      <main className=" flex flex-col mx-auto w-[calc(100vw-350px)] min-h-screen ml-[350px]">
        {children}
        <MainFooter />
      </main>
    </>
  );
};

export default WithSideBarLayout;

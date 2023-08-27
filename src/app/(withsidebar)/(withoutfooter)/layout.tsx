import MainNavBar from "@/components/UI/Navbar/MainNavBar";

const WithSideBarLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <MainNavBar />
      <main className="mx-auto w-[calc(100vw-350px)] ml-[350px]">
        {children}
      </main>
    </>
  );
};

export default WithSideBarLayout;

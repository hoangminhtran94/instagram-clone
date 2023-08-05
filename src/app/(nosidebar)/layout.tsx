import { verifyToken } from "@/lib/verifytoken";

const NoSideBarLayout = async ({ children }: { children: React.ReactNode }) => {
  await verifyToken({ redirectIf: "authenticated", path: "/" });
  return (
    <>
      <main className="w-screen min-h-screen flex items-center justify-center">
        {children}
      </main>
    </>
  );
};

export default NoSideBarLayout;

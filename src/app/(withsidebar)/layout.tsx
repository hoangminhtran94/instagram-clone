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
      {children}
      {modal}
    </>
  );
};

export default WithSideBarLayout;

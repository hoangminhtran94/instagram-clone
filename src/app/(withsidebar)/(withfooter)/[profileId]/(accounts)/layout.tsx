import { FC, ReactNode } from "react";
import AccountNavbar from "@/components/UI/Navbar/AccountNavbar";
const AccountLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-1">
      <AccountNavbar />
      <main className=" mt-14 px-10"> {children}</main>
    </div>
  );
};

export default AccountLayout;

import { FC, ReactNode } from "react";
import AccountNavbar from "@/components/UI/Navbar/AccountNavbar";
const AccountLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <AccountNavbar />
      <div> {children}</div>
    </div>
  );
};

export default AccountLayout;

import useShowUserSummary from "@/hooks/useShowUserSummary";
import { ComponentPropsWithoutRef, FC } from "react";
import UserSummaryBox from "../UserSummaryBox/UserSummaryBox";
import { UserSummary } from "@/models/user.models";
import Link from "next/link";

const UsernameWrapper: FC<
  ComponentPropsWithoutRef<"div"> & { user: UserSummary }
> = ({ className, children, user, ...props }) => {
  const { hovering, mouseEnterHandler, mouseLeaveHandler } =
    useShowUserSummary();

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      {...props}
    >
      <Link className="font-bold text-xs " href={"/" + user.id}>
        {children}
      </Link>
      <UserSummaryBox hovering={hovering} user={user} />
    </div>
  );
};
export default UsernameWrapper;

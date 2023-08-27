import useShowUserSummary from "@/hooks/useShowUserSummary";
import { ComponentPropsWithoutRef, FC } from "react";
import UserSummaryBox from "../UserSummaryBox/UserSummaryBox";
import { UserSummary } from "@/models/user.models";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UsernameWrapper: FC<
  ComponentPropsWithoutRef<"div"> & { user: UserSummary }
> = ({ className, children, user, ...props }) => {
  const router = useRouter();
  const { hovering, mouseEnterHandler, mouseLeaveHandler } =
    useShowUserSummary();

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      {...props}
    >
      <div
        className="font-bold text-xs "
        onClick={() => {
          router.push("/" + user.id);
        }}
      >
        {children}
      </div>
      <UserSummaryBox hovering={hovering} user={user} />
    </div>
  );
};
export default UsernameWrapper;

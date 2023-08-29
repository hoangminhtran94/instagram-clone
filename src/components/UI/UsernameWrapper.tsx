import useShowUserSummary from "@/hooks/useShowUserSummary";
import { ComponentPropsWithoutRef, FC } from "react";
import UserSummaryBox from "./UserSummaryBox";
import { UserSummary } from "@/models/user.models";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const UsernameWrapper: FC<
  ComponentPropsWithoutRef<"div"> & { user: UserSummary }
> = ({ className, children, user, ...props }) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { hovering, mouseEnterHandler, mouseLeaveHandler } =
    useShowUserSummary();

  return (
    <div
      className={`cursor-pointer ${className}`}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      {...props}
    >
      <div
        ref={ref}
        className="font-bold text-xs inline "
        onClick={() => {
          router.push("/" + user.id);
        }}
      >
        {children}
      </div>
      <UserSummaryBox parentRef={ref} hovering={hovering} user={user} />
    </div>
  );
};
export default UsernameWrapper;

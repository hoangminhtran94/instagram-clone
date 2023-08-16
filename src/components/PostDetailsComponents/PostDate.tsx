import { timeAgoOrDayAgo } from "@/lib/timeCalculation";
import { FC } from "react";

const PostDate: FC<{ createdDate: Date }> = ({ createdDate }) => {
  return (
    <p className="text-xxs font-light px-4 pb-3">
      {timeAgoOrDayAgo(createdDate, {
        daysText: "DAYS AGO",
        hoursText: "HOURS AGO",
      })}
    </p>
  );
};

export default PostDate;

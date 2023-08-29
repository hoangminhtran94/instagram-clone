import { FC, MouseEventHandler } from "react";
import { OptionButton } from "../UI/OptionBox";
import OptionBox from "../UI/OptionBox";
import { useRouter } from "next/navigation";
const PostOptionsBox: FC<{
  postId: string;
  onCancel: MouseEventHandler;
  creatorId: string;
}> = ({ postId, onCancel, creatorId }) => {
  const router = useRouter();
  const OPTIONBUTTONS: OptionButton[] = [
    {
      label: "Report",
      action: (e) => {},
      textRed: true,
    },
    {
      label: "Unfollow",
      action: (e) => {},
      textRed: true,
    },
    {
      label: "Add to favorites",
      action: (e) => {},
    },
    {
      label: "Go to post",
      action: (e) => {
        router.push("/p/" + postId);
        onCancel(e);
      },
    },
    {
      label: "Share to...",
      action: (e) => {},
    },
    {
      label: "Copy Link",
      action: (e) => {},
    },
    {
      label: "About this account",
      action: (e) => {
        router.push("/" + creatorId);
        onCancel(e);
      },
    },
  ];
  return <OptionBox buttons={OPTIONBUTTONS} onCancel={onCancel} />;
};
export default PostOptionsBox;

import Image from "next/image";
import { FC, MouseEventHandler } from "react";

interface ProfileNoContentsProps {
  src: string;
  alt: string;
  className?: string;
  action?: MouseEventHandler;
  actionLabel?: string;
  header: string;
  body: string;
}
const ProfileNoContents: FC<ProfileNoContentsProps> = ({
  src,
  alt,
  className,
  action,
  actionLabel,
  header,
  body,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-20 max-w-[400px] ">
      <div
        className={`w-[62px] h-[62px] ${action ? "cursor-pointer" : ""} `}
        onClick={action}
      >
        <Image
          src={src}
          alt={alt}
          width={124}
          height={124}
          className="object-contain"
        />
      </div>
      <h2 className="font-extrabold">{header}</h2>
      <p className="text-sm text-center">{body}</p>
      {action && (
        <button onClick={action} className="text-sm">
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default ProfileNoContents;

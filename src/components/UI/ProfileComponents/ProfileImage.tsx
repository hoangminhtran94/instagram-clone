import Image from "next/image";
import { FC } from "react";
const ProfileImage: FC<{ image: string }> = ({ image }) => {
  return (
    <div className="w-[150px] h-[150px]">
      <Image
        width={300}
        height={300}
        alt="profile-picture"
        src={image ? image : "/images/default-avatar.jpg"}
        className="h-full w-full rounded-full object-cover"
      />
    </div>
  );
};

export default ProfileImage;

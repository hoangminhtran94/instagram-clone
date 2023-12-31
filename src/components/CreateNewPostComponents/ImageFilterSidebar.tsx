import Image from "next/image";
import { FC } from "react";
const ImageFilterSidebar: FC<{ onChangeFilter: (filter: string) => void }> = ({
  onChangeFilter,
}) => {
  return (
    <div className="flex-1 grid grid-cols-3 p-5 gap-4 h-fit text-xs">
      <div
        className="w-full flex flex-col gap-2 items-center"
        onClick={() =>
          onChangeFilter("sepia(.2) brightness(1.15) saturate(1.4)")
        }
      >
        <div className="w-[88px] h-[88px] ">
          <Image
            className="pointer-events-none"
            src="/images/Aden.jpg"
            alt="aden"
            width={88}
            height={88}
          />
        </div>
        <p>Eden</p>
      </div>
      <div
        className="w-full flex flex-col gap-2 items-center"
        onClick={() =>
          onChangeFilter("brightness(1.4) contrast(.95) saturate(0) sepia(.35)")
        }
      >
        <div className="w-[88px] h-[88px]">
          <Image
            className="pointer-events-none"
            src="/images/Moon.jpg"
            alt="aden"
            width={88}
            height={88}
          />
        </div>
        <p>Moon</p>
      </div>
      <div
        className="w-full flex flex-col gap-2 items-center"
        onClick={() => onChangeFilter("blur(0px)")}
      >
        <div className="w-[88px] h-[88px]">
          <Image
            className="pointer-events-none"
            src="/images/Normal.jpg"
            alt="aden"
            width={88}
            height={88}
          />
        </div>
        <p>Normal</p>
      </div>
    </div>
  );
};

export default ImageFilterSidebar;

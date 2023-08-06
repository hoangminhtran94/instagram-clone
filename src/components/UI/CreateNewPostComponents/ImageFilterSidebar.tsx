import Image from "next/image";
import { FC } from "react";
const ImageFilterSidebar: FC<{ setCurrentFilter: (cb: any) => void }> = ({
  setCurrentFilter,
}) => {
  return (
    <div className="w-[200px] grid grid-cols-2 p-5 gap-5 h-fit">
      <div
        className="w-full flex flex-col gap-5"
        onClick={() =>
          setCurrentFilter("sepia(.2) brightness(1.15) saturate(1.4)")
        }
      >
        <div className="w-[88px] h-[88px]">
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
        className="w-full flex flex-col gap-5"
        onClick={() =>
          setCurrentFilter(
            "brightness(1.4) contrast(.95) saturate(0) sepia(.35)"
          )
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
        className="w-full flex flex-col gap-5"
        onClick={() => setCurrentFilter("blur(0px)")}
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

import Image from "next/image";
import { FC } from "react";
const ImageFilterSidebar: FC<{}> = ({}) => {
  return (
    <div className="flex-1 max-h-full overflow-y-scroll  p-5 flex flex-col h-fit text-xs">
      <div>Image</div>
      <div>
        <textarea className="resize-none" />
      </div>
      <div>
        <input placeholder="Location" />
      </div>
      <div>Accessibility</div>
      <div>Advanced settings</div>
    </div>
  );
};

export default ImageFilterSidebar;

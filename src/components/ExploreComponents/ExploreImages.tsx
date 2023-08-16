import ExploreImage from "./ExploreImage";
import { FC } from "react";
interface ExploreImagesProps {
  odd: boolean;
}
const ExploreImages: FC<ExploreImagesProps> = ({ odd = true }) => {
  return (
    <div className="w-full mb-1">
      <div className="grid grid-cols-3 gap-1">
        <div className={odd ? "row-span-1" : "row-span-2"}>
          <ExploreImage
            fill
            containerClass={!odd ? "!pb-[calc(200%+4px)]" : ""}
            className="object-cover"
            src="https://images.unsplash.com/photo-1690151711465-2bfe4e69f241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80"
            alt="anImage"
          />
        </div>
        <div className="row-span-1">
          <ExploreImage
            className="object-cover"
            fill
            src="https://images.unsplash.com/photo-1690151711465-2bfe4e69f241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80"
            alt="anImage"
          />
        </div>

        <div className={!odd ? "row-span-1" : "row-span-2"}>
          <ExploreImage
            className="object-cover "
            containerClass={odd ? "!pb-[calc(200%+4px)]" : ""}
            fill
            src="https://images.unsplash.com/photo-1690151711465-2bfe4e69f241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80"
            alt="anImage"
          />
        </div>
        <div className="row-span-1">
          <ExploreImage
            className="object-cover"
            fill
            src="https://images.unsplash.com/photo-1690151711465-2bfe4e69f241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80"
            alt="anImage"
          />
        </div>
        <div className="row-span-1">
          <ExploreImage
            className="object-cover"
            fill
            src="https://images.unsplash.com/photo-1690151711465-2bfe4e69f241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80"
            alt="anImage"
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreImages;

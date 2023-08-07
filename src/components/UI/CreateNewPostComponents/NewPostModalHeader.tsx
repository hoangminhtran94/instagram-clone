import { FC } from "react";
interface NewPostModalHeaderProps {
  noImage: boolean;
  croppingImage: boolean;
  editingImage: boolean;
  onNextPage: () => any;
  onPreviousPage: () => any;
}
const NewPostModalHeader: FC<NewPostModalHeaderProps> = ({
  noImage,
  croppingImage,
  editingImage,
  onNextPage,
  onPreviousPage,
}) => {
  if (noImage) {
    return (
      <div className="text-center p-3 border-b border-b-slate-200 text-sm font-semibold">
        Create new post
      </div>
    );
  }

  return (
    <div className="text-center relative p-3 border-b  border-b-slate-200 text-sm font-semibold">
      {croppingImage && "Crop"}
      {editingImage && "Edit"}
      <button className="absolute left-3" onClick={onPreviousPage}>
        <svg
          aria-label="Back"
          color="rgb(0, 0, 0)"
          fill="rgb(0, 0, 0)"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Back</title>
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="2.909"
            x2="22.001"
            y1="12.004"
            y2="12.004"
          ></line>
          <polyline
            fill="none"
            points="9.276 4.726 2.001 12.004 9.276 19.274"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></polyline>
        </svg>
      </button>
      <button className="absolute right-3" onClick={onNextPage}>
        Next
      </button>
    </div>
  );
};

export default NewPostModalHeader;

import { FC, MouseEventHandler } from "react";

const CancelNewPostModal: FC<{
  onDiscard: MouseEventHandler;
  onCancel: MouseEventHandler;
}> = ({ onDiscard, onCancel }) => {
  return (
    <div className="w-[400px] h-[200px] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h5 className="font-normal text-[16px]">Discard posts?</h5>
        <p className="text-sm">{`If you leave, your edits won't be saved.`}</p>
      </div>
      <div className="flex flex-col">
        <button
          onClick={onDiscard}
          className="p-3 text-sm font-bold text-red-500 text-center border-t active:bg-gray-100"
        >
          Discard
        </button>
        <button
          onClick={onCancel}
          className="p-3 text-sm text-center border-t active:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CancelNewPostModal;

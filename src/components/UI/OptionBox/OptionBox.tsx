import { FC, MouseEventHandler } from "react";

export interface OptionButton {
  label: string;
  action: MouseEventHandler;
  textRed?: boolean;
}

const OptionBox: FC<{
  onCancel: MouseEventHandler;
  buttons: OptionButton[];
}> = ({ onCancel, buttons }) => {
  return (
    <div className="w-[400px]  flex flex-col">
      <div className="flex flex-col">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={btn.action}
            className={`p-3 text-sm ${
              btn.textRed && "text-red-500 font-bold"
            } text-center border-t active:bg-gray-100`}
          >
            {btn.label}
          </button>
        ))}

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

export default OptionBox;

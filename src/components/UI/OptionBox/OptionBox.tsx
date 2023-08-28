import { FC, MouseEventHandler, ReactNode } from "react";

export interface OptionButton {
  label: string;
  action: MouseEventHandler;
  textRed?: boolean;
  textBlue?: boolean;
}

const OptionBox: FC<{
  onCancel: MouseEventHandler;
  children?: ReactNode;
  buttons: OptionButton[];
}> = ({ onCancel, buttons, children }) => {
  return (
    <div className="w-[400px]  flex flex-col">
      <div className="flex flex-col">
        {children}
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={btn.action}
            className={`p-3 text-sm ${
              btn.textRed && "text-red-500 font-bold"
            } ${
              btn.textBlue && "text-blue-500 font-bold"
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

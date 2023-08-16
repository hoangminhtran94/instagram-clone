import { FC } from "react";

const Spinner: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`flex-1 w-full h-full flex items-center justify-center ${className}`}
    >
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;

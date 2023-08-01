"use-client";
import { FC, MouseEventHandler, ReactNode } from "react";
import { createPortal } from "react-dom";
interface BackdropProps {
  children: ReactNode;
  onCancel?: MouseEventHandler;
}
interface ModalProps {
  children?: ReactNode;
  width?: string;
  height?: string;
  className?: string;
  onCancel?: MouseEventHandler;
}
const Backdrop: FC<BackdropProps> = ({ children, onCancel }) => {
  return (
    <div className="w-screen flex items-center justify-center h-screen fixed top-0 right-0 bg-[rgba(0,0,0,0.6)] z-50">
      <div
        onClick={onCancel}
        className=" absolute top-0 right-0 w-full h-full"
      />
      {children}
    </div>
  );
};

const Modal: FC<ModalProps> = ({
  children,
  className,
  onCancel,
  width = "500px",
  height = "500px",
}) => {
  return (
    <>
      {createPortal(
        <Backdrop onCancel={onCancel}>
          <div
            style={{ width, height }}
            className={` bg-white z-50 ${className}`}
          >
            {children}
          </div>
        </Backdrop>,
        document.getElementById("modal-hook") as Element
      )}
    </>
  );
};

export default Modal;

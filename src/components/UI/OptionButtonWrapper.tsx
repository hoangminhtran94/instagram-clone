import { useGlobalModalContext } from "@/context/globalModalContext";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";

const OptionButtonWrapper: FC<
  { optionBox: ReactNode } & ComponentPropsWithoutRef<"div">
> = ({ optionBox, className, children, ...props }) => {
  const globalModalContext = useGlobalModalContext();
  const showModalHandler = () => {
    globalModalContext.toggleModal({
      body: optionBox,
      className: "rounded-lg",
      onCancel: () => {
        globalModalContext.closeModal();
      },
    });
  };
  return (
    <div
      className={`cursor-pointer hover:opacity-50 ${className}`}
      onClick={showModalHandler}
    >
      {children}
    </div>
  );
};

export default OptionButtonWrapper;

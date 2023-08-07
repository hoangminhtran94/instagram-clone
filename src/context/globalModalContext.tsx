"use client";

import {
  FC,
  MouseEventHandler,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface SetupModalProps {
  body: ReactNode;
  className?: string;
  onCancel?: MouseEventHandler;
}
const GlobalModalContext = createContext<{
  toggle: boolean;
  modalSetup: SetupModalProps | null;
  toggleModal: (modalSetup: SetupModalProps) => void;
  closeModal: () => void;
}>({
  toggle: false,
  modalSetup: null,
  toggleModal: (args) => {},
  closeModal: () => {},
});

const GlobalModalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toggle, setToggle] = useState(false);
  const [modalSetup, setModalSetup] = useState<SetupModalProps | null>(null);
  const toggleModalHandler = (args: SetupModalProps) => {
    setModalSetup(args);
    setToggle(true);
  };
  const closeModalHandler = () => {
    setModalSetup(null);
    setToggle(false);
  };
  return (
    <GlobalModalContext.Provider
      value={{
        modalSetup,
        toggle,
        toggleModal: toggleModalHandler,
        closeModal: closeModalHandler,
      }}
    >
      {children}
    </GlobalModalContext.Provider>
  );
};

export const useGlobalModalContext = () => useContext(GlobalModalContext);
export default GlobalModalContextProvider;

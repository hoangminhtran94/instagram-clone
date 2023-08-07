"use client";
import Modal from "./Modal";
import { useGlobalModalContext } from "@/context/globalModalContext";

const GlobalModal = () => {
  const context = useGlobalModalContext();
  if (context.toggle && context.modalSetup) {
    return (
      <Modal
        className={context.modalSetup.className}
        rootElement="modal-hook-global"
        onCancel={context.modalSetup.onCancel}
      >
        {context.modalSetup.body}
      </Modal>
    );
  }
  return <></>;
};
export default GlobalModal;

import { motion } from "framer-motion";
import { FC } from "react";

interface NotificationBoxProps {}

const NotificationBox: FC<NotificationBoxProps> = () => {
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -500, opacity: 0, zIndex: -10 }}
      className="fixed left-[100px]  w-[400px] flex flex-col gap-7 h-full top-0  rounded-r-xl bg-white shadow-right-lg border p-6"
    >
      <h4 className="px-6">Notifications</h4>
      <div className="flex flex-col border-b gap-3 py-2 mt-3">
        <p className="font-semibold px-6">This month</p>
        <div className="flex flex-col">
          <div className="px-6 py-4 hover:bg-gray-100">Something</div>
          <div className="px-6 py-4 hover:bg-gray-100">Something</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-3  py-2 mt-3">
        <p className="font-semibold px-6">Earlier</p>
        <div className="flex flex-col gap-2">
          <div className="px-6 py-4">Something</div>
          <div className="px-6 py-4">Something</div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationBox;

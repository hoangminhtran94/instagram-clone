import { Dispatch, FC, SetStateAction, useState } from "react";

const ManageAccessTabs: FC<{
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}> = ({ currentTab, setCurrentTab }) => {
  return (
    <div className=" grid grid-cols-3  text-sm">
      <div
        className={`text-center leading-10 border-b  ${
          currentTab === 0 && "border-slate-600"
        } cursor-pointer`}
        onClick={() => {
          setCurrentTab(0);
        }}
      >
        Active
      </div>
      <div
        className={`text-center leading-10 border-b ${
          currentTab === 1 && "border-slate-600"
        }  cursor-pointer`}
        onClick={() => {
          setCurrentTab(1);
        }}
      >
        Expire
      </div>
      <div
        className={`text-center leading-10 border-b ${
          currentTab === 2 && "border-slate-600"
        }  cursor-pointer`}
        onClick={() => {
          setCurrentTab(2);
        }}
      >
        Removed
      </div>
    </div>
  );
};
export default ManageAccessTabs;

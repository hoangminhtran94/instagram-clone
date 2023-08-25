import { FC } from "react";
import SideBarItem from "./SideBarItem";
import { useState } from "react";
import MoreDropdown from "../UI/MoreDropdown/MoreDropdown";
interface SideBarDropdownProps {
  secondaryMode: boolean;
}

const SideBarDropdown: FC<SideBarDropdownProps> = ({ secondaryMode }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative">
      <SideBarItem
        onClick={() => {
          setToggle((prev) => !prev);
        }}
        className={`${secondaryMode ? "w-fit" : ""} `}
        icon={
          <svg
            aria-label="Settings"
            color="rgb(0, 0, 0)"
            fill="rgb(0, 0, 0)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="3"
              x2="21"
              y1="4"
              y2="4"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="3"
              x2="21"
              y1="12"
              y2="12"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="3"
              x2="21"
              y1="20"
              y2="20"
            ></line>
          </svg>
        }
      >
        {!secondaryMode ? "More" : ""}
      </SideBarItem>
      {toggle && <MoreDropdown />}
    </div>
  );
};

export default SideBarDropdown;

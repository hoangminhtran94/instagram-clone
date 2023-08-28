import { FC, useRef } from "react";
import SideBarItem from "./SideBarItem";
import { useState } from "react";
import MoreDropdown from "../../MoreDropdown/MoreDropdown";
import useClickOutside from "@/hooks/useClickoutside";
interface SideBarDropdownProps {
  secondaryMode: boolean;
}

const SideBarDropdown: FC<SideBarDropdownProps> = ({ secondaryMode }) => {
  const [toggle, setToggle] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    setToggle(false);
  });
  return (
    <div className="relative" ref={ref}>
      <SideBarItem
        onClick={() => {
          setToggle((prev) => !prev);
        }}
        className={`${secondaryMode ? "w-fit" : "w-full"} `}
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

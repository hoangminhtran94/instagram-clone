import SideBarItem from "./SideBarItem";
import { MouseEventHandler } from "react";
import { forwardRef } from "react";
interface SearchButtonProps {
  active: boolean;
  onClick: MouseEventHandler;
  secondaryMode: boolean;
}
const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(
  ({ active, onClick, secondaryMode }, ref) => {
    return (
      <>
        <SideBarItem
          ref={ref}
          className={active ? "w-fit outline outline-1 outline-slate-200" : ""}
          onClick={onClick}
          btnActive={active}
          icon={
            <svg
              aria-label="Search"
              color="rgb(0, 0, 0)"
              fill="rgb(0, 0, 0)"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="16.511"
                x2="22"
                y1="16.511"
                y2="22"
              ></line>
            </svg>
          }
          variant="search"
        >
          {!active && !secondaryMode ? "Search" : ""}
        </SideBarItem>
      </>
    );
  }
);

export default SearchButton;

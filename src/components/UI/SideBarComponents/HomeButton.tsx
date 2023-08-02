import SideBarItem from "./SideBarItem";
import { FC, MouseEventHandler } from "react";

interface HomeButtonProps {
  secondaryMode: boolean;
  onClick?: MouseEventHandler;
  path: string;
}

const HomeButton: FC<HomeButtonProps> = ({ secondaryMode, onClick, path }) => {
  return (
    <SideBarItem
      className={secondaryMode ? "w-fit " : ""}
      href="/"
      onClick={onClick}
      path={secondaryMode ? "#" : path}
      icon={
        <svg
          aria-label="Home"
          color="rgb(0, 0, 0)"
          fill="rgb(0, 0, 0)"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
            fill="none"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
        </svg>
      }
      variant="home"
    >
      {secondaryMode ? "" : "Home"}
    </SideBarItem>
  );
};

export default HomeButton;

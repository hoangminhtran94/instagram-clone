import { useState, useEffect, useRef, MouseEvent, RefObject } from "react";

const useShowUserSummary = () => {
  const [hovering, setHovering] = useState(false);
  let timeoutRef = useRef<NodeJS.Timeout | null>(null);
  let leaveTimeout = useRef<NodeJS.Timeout | null>(null);
  const mouseEnterHandler = () => {
    console.log("in-");
    timeoutRef.current = setTimeout(() => {
      setHovering(true);
    }, 500);
    if (hovering) {
      if (leaveTimeout.current) {
        clearTimeout(leaveTimeout.current);
      }
    }
  };

  const mouseLeaveHandler = (e: MouseEvent) => {
    if (hovering) {
      leaveTimeout.current = setTimeout(() => {
        setHovering(false);
      }, 500);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return { hovering, mouseEnterHandler, mouseLeaveHandler };
};

export default useShowUserSummary;

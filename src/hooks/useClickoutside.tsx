"use client";

import { RefObject, useEffect } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, action: () => void) => {
  useEffect(() => {
    const eventClickHandler = (e: Event) => {
      if (!ref.current?.contains(e.target as HTMLElement)) {
        action();
      }
    };

    document.addEventListener("click", eventClickHandler);
  }, []);
};
export default useClickOutside;
